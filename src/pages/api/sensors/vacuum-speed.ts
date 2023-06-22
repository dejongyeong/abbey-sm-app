import { INFLUX_CONFIG, SENSOR_INTERVAL } from '@/config/constant';
import influxDbClient from '@/lib/influxdb/client';
import { handleError } from '@/services/sensors/handle-error';
import { sendEvent } from '@/services/sensors/send-event';
import { convertTimezone } from '@/utils/convert-timezone';
import { FluxTableMetaData, escape } from '@influxdata/influxdb-client';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no'); // Disable response buffering for Vercel

    getVacuumSpeedData(req, res); // get data
  } else {
    res.setHeader('Allow', 'GET');
    res.status(405).json({ message: 'Method not allowed' });
  }
}

async function getVacuumSpeedData(req: NextApiRequest, res: NextApiResponse) {
  const { start, end, measurement, field_max, field_avg, machine_serial }: any =
    req.query;

  const query = `from(bucket: ${escape.quoted(INFLUX_CONFIG.bucket)}) 
    |> range(start: ${start}, stop: ${end}) 
    |> filter(fn: (r) => r._measurement == "${escape.measurement(measurement)}")
    |> filter(fn: (r) => r._field == "${escape.tag(field_max)}" 
                      or r._field == "${escape.tag(field_avg)}")
    |> filter(fn: (r) => r.machine_serial == "${escape.tag(machine_serial)}")
    |> pivot(rowKey: ["_time"], columnKey: ["_field"], valueColumn: "_value")
    |> map(fn: (r) => ({
        dateTime: r._time,
        vacuumRpmAvg: r.vacuum_rpm_avg,
        vacuumRpmMax: r.vacuum_rpm_max})
    )`;

  queryData(query, req, res);
}

async function queryData(
  query: string,
  req: NextApiRequest,
  res: NextApiResponse
) {
  querying(query, res);
  setInterval(querying, SENSOR_INTERVAL.vacuumSpeed); // Schedule the next query after the interval
}

const querying = async (query: string, res: NextApiResponse) => {
  try {
    influxDbClient.queryRows(query, {
      next: (row: string[], tableMeta: FluxTableMetaData) => {
        const o = tableMeta.toObject(row);
        const dt = o.dateTime ? convertTimezone(o.dateTime) : o.dateTime;

        const data = {
          dt: dt,
          vacuum_rpm_max: o.vacuumRpmMax,
          vacuum_rpm_avg: o.vacuumRpmAvg,
        };
        sendEvent(data, res);
      },
      error: (error) => {
        handleError(error, res);
      },
      complete: () => {},
    });
  } catch (error) {
    handleError(error, res);
  }
};
