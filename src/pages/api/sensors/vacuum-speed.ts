import { INFLUX_CONFIG } from '@/config/constant';
import influxDbClient from '@/lib/influxdb/client';
import { convertTimezone } from '@/utils/convert-timezone';
import { FluxTableMetaData, escape } from '@influxdata/influxdb-client';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'GET') {
      await getVacuumSpeedData(req, res);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function getVacuumSpeedData(req: NextApiRequest, res: NextApiResponse) {
  // TODO: simplify field into one param
  const { start, end, measurement, field_max, field_avg, machine_serial }: any =
    req.query;

  try {
    const query = `from(bucket: ${escape.quoted(INFLUX_CONFIG.bucket)}) 
    |> range(start: ${escape.quoted(start)}, stop: ${escape.quoted(end)}) 
    |> filter(fn: (r) => r._measurement == ${escape.measurement(measurement)})
    |> filter(fn: (r) => r.field == ${escape.tag(field_max)} 
                      or r.field == ${escape.tag(field_avg)})
    |> filter(fn: (r) => r.machine_serial == ${escape.tag(machine_serial)})
    |> pivot(rowKey: ["_time"], columnKey: ["_field"], valueColumn: "_value")
    |> map(fn: (r) => ({
        dateTime: r._time,
        vacuumRpmAvg: r.vacuum_rpm_avg,
        vacuumRpmMax: r.vacuum_rpm_max})
    )`;

    const { vacuum_rpm_max, vacuum_rpm_avg }: any = await queryData(query);
    res.status(200).json({ vacuum_rpm_max, vacuum_rpm_avg });
  } catch (error) {
    throw error;
  }
}

async function queryData(query: string) {
  return new Promise((resolve, reject) => {
    const vacuumRpmMax: any[] = [];
    const vacuumRpmAvg: any[] = [];

    influxDbClient.queryRows(query, {
      next: (row: string[], tableMeta: FluxTableMetaData) => {
        const o = tableMeta.toObject(row);
        const dt = convertTimezone(o.dateTime);
        vacuumRpmMax.push({ dt: dt, value: o.vacuumRpmMax }); // rpm max
        vacuumRpmAvg.push({ dt: dt, value: o.vacuumRpmAvg }); // rpm avg
      },
      error: (error: Error) => {
        reject(error);
      },
      complete: () => {
        resolve({ vacuum_rpm_max: vacuumRpmMax, vacuum_rpm_avg: vacuumRpmAvg });
      },
    });
  });
}
