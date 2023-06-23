import { INFLUX_CONFIG, SENSOR_INTERVAL } from '@/config/constant';
import { NextApiRequest, NextApiResponse } from 'next';
import { FluxTableMetaData, escape } from '@influxdata/influxdb-client';
import influxDbClient from '@/lib/influxdb/client';
import { convertTimezone } from '@/utils/convert-timezone';
import { sendEvent } from '@/services/sensors/send-event';
import { handleError } from '@/services/sensors/handle-error';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no'); // Disable response buffering for Vercel

    getVacuumTempData(req, res); // get data
  } else {
    res.setHeader('Allow', 'GET');
    res.status(405).json({ message: 'Method not allowed' });
  }
}

async function getVacuumTempData(req: NextApiRequest, res: NextApiResponse) {
  const { start, end, machine_serial }: any = req.query;

  const query = `from(bucket: ${escape.quoted(INFLUX_CONFIG.bucket)}) 
      |> range(start: ${start}, stop: ${end}) 
      |> filter(fn: (r) => r._measurement == "Vaccuumpump_temperature")
      |> filter(fn: (r) => r._field == "temperature" )
      |> filter(fn: (r) => r.machine_serial == "${escape.tag(machine_serial)}")
      |> map(fn: (r) => ({
        dateTime: r._time,
        value: r._value,
        category: "Temperature"})
    )`;

  queryData(query, req, res);
}

async function queryData(
  query: string,
  req: NextApiRequest,
  res: NextApiResponse
) {
  querying(query, res);
  const interval = setInterval(querying, SENSOR_INTERVAL.vacuumTemp); // Schedule the next query after the interval

  // Close the SSE connection when the client disconnects
  req.on('close', () => {
    clearInterval(interval);
    res.end();
  });
}

const querying = async (query: string, res: NextApiResponse) => {
  try {
    influxDbClient.queryRows(query, {
      next: (row: string[], tableMeta: FluxTableMetaData) => {
        const o = tableMeta.toObject(row);
        const dt = convertTimezone(o.dateTime);

        const data = { dt: dt, value: o.value, category: o.category };
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
