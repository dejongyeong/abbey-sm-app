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
        const results = await getOilAvailability(req); // get data
        res.status(200).json(results);
      } catch (error) {
        res.status(500).json({
          message: 'Error fetching oil status data',
        });
      }
    }
  } else {
    res.setHeader('Allow', 'GET');
    res.status(405).json({ message: 'Method not allowed' });
  }
}

async function getOilAvailability(req: NextApiRequest) {
  const { start, end, machine_serial }: any = req.query;

  const query = `from(bucket: ${escape.quoted(INFLUX_CONFIG.bucket)})
        |> range(start: ${start}, stop: ${end})
        |> filter(fn: (r) => r._measurement == "Vaccuumpump_oil_status")
        |> filter(fn: (r) => r._field == "oil_status" )
        |> filter(fn: (r) => r.machine_serial == "${escape.tag(
          machine_serial
        )}")
        |> last()
        |> map(fn: (r) => ({
          dateTime: r._time,
          value: r._value,
          category: "Oil Status"})
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
