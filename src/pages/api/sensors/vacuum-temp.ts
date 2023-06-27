import { INFLUX_CONFIG } from '@/config/constant';
import { NextApiRequest, NextApiResponse } from 'next';
import { FluxTableMetaData, escape } from '@influxdata/influxdb-client';
import influxDbClient from '@/lib/influxdb/client';
import { convertTimezone } from '@/utils/convert-timezone';
import { checkUserSessionApi } from '@/services/auth/check-session-api';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const session = await checkUserSessionApi(req, res);

    if (!session) {
      res
        .status(401)
        .json({ message: 'No active session or is not authenticated' });
    } else {
      try {
        const results = await getVacuumTempData(req); // get data
        res.status(200).json(results);
        res.status(200).json(results);
      } catch (error) {
        res.status(500).json({
          message: 'Error fetching vacuum temperature data',
        });
      }
    }
  } else {
    res.setHeader('Allow', 'GET');
    res.status(405).json({ message: 'Method not allowed' });
  }
}

async function getVacuumTempData(req: NextApiRequest) {
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

          const data = { dt: dt, value: o.value, category: o.category };
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

/******************  Example    ******************/

// export default async function handler(
//     req: NextApiRequest,
//     res: NextApiResponse
//   ) {
//     if (req.method === 'GET') {
//       res.setHeader('Content-Type', 'text/event-stream');
//       res.setHeader('Cache-Control', 'no-cache');
//       res.setHeader('Connection', 'keep-alive');
//       res.setHeader('X-Accel-Buffering', 'no'); // Disable response buffering for Vercel

//       getVacuumTempData(req, res); // get data
//     } else {
//       res.setHeader('Allow', 'GET');
//       res.status(405).json({ message: 'Method not allowed' });
//     }
//   }

//   async function getVacuumTempData(req: NextApiRequest, res: NextApiResponse) {
//     const { start, end, machine_serial }: any = req.query;

//     const query = `from(bucket: ${escape.quoted(INFLUX_CONFIG.bucket)})
//         |> range(start: ${start}, stop: ${end})
//         |> filter(fn: (r) => r._measurement == "Vaccuumpump_temperature")
//         |> filter(fn: (r) => r._field == "temperature" )
//         |> filter(fn: (r) => r.machine_serial == "${escape.tag(machine_serial)}")
//         |> map(fn: (r) => ({
//           dateTime: r._time,
//           value: r._value,
//           category: "Temperature"})
//       )`;

//     queryData(query, res);
//   }

// async function queryData(query: string, res: NextApiResponse) {
//   try {
//     const results: any[] = [];
//     influxDbClient.queryRows(query, {
//       next: (row: string[], tableMeta: FluxTableMetaData) => {
//         const o = tableMeta.toObject(row);
//         const dt = convertTimezone(o.dateTime);

//         const data = { dt: dt, value: o.value, category: o.category };
//         results.push(data);
//       },
//       error: (error) => {
//         res.status(500).json({ message: (error as Error).message });
//       },
//       complete: () => {
//         pusherServer.trigger('sensor', 'vacuum-temp', results);
//         res.status(200).json(results);
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ message: (error as Error).message });
//   }
// }
