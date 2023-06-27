import { INFLUX_CONFIG } from '@/config/constant';
import influxDbClient from '@/lib/influxdb/client';
import { convertTimezone } from '@/utils/convert-timezone';
import { FluxTableMetaData, escape } from '@influxdata/influxdb-client';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const results = await getVacuumSpeedData(req);
    res.status(200).json(results);
  } else {
    res.setHeader('Allow', 'GET');
    res.status(405).json({ message: 'Method not allowed' });
  }
}

async function getVacuumSpeedData(req: NextApiRequest) {
  const { start, end, measurement, field_max, field_avg, machine_serial }: any =
    req.query;

  const query = `from(bucket: ${escape.quoted(INFLUX_CONFIG.bucket)}) 
    |> range(start: ${start}, stop: ${end}) 
    |> filter(fn: (r) => r._measurement == "${escape.measurement(measurement)}")
    |> filter(fn: (r) => r._field == "${escape.tag(field_max)}" 
                      or r._field == "${escape.tag(field_avg)}")
    |> filter(fn: (r) => r.machine_serial == "${escape.tag(machine_serial)}")
    |> map(fn: (r) => ({
        dateTime: r._time,
        value: float(v: r._value),
        category: r._field})
    )`;

  return await queryData(query);
}

async function queryData(query: string) {
  return new Promise(async (resolve, reject) => {
    try {
      const results: any[] = [];
      influxDbClient.queryRows(query, {
        next: (row: string[], tableMeta: FluxTableMetaData) => {
          const o = tableMeta.toObject(row);
          const dt = convertTimezone(o.dateTime);

          const data = {
            dt: dt,
            value: o.value,
            category:
              o.category === 'vacuum_rpm_max' ? 'RPM Max' : 'RPM Average',
          };
          results.push(data);
        },
        error: (error) => {
          reject(error);
        },
        complete: async () => {
          resolve(results);
        },
      });
    } catch (error) {
      reject(error);
    }
  });
}
