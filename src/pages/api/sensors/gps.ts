import { INFLUX_CONFIG } from '@/config/constant';
import { NextApiRequest, NextApiResponse } from 'next';
import { FluxTableMetaData, escape } from '@influxdata/influxdb-client';
import { checkUserSessionApi } from '@/services/auth/check-session-api';
import influxDbClient from '@/lib/influxdb/client';
import { convertTimezone } from '@/utils/convert-timezone';

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
        const results = await getGPS(req);
        res.status(200).json(results);
      } catch (error) {
        res.status(500).json({
          message: 'Error fetching GPS data',
        });
      }
    }
  } else {
    res.setHeader('Allow', 'GET');
    res.status(405).json({ message: 'Method not allowed' });
  }
}

async function getGPS(req: NextApiRequest) {
  const { start, end, machine_serial }: any = req.query;

  const query = `from(bucket: ${escape.quoted(INFLUX_CONFIG.bucket)}) 
    |> range(start: ${start}, stop: ${end}) 
    |> filter(fn: (r) => r._measurement == "GPS")
    |> filter(fn: (r) => r._field == "wgs84_lon" or r._field == "wgs84_lat")
    |> filter(fn: (r) => r.machine_serial == "${escape.tag(machine_serial)}")
    |> pivot(rowKey: ["_time"], columnKey: ["_field"], valueColumn: "_value")
    |> filter(fn: (r) => exists r["wgs84_lat"] and exists r["wgs84_lon"])
    |> sort(columns:["_time"], desc:true)
    |> map(fn: (r) => ({latitude: r["wgs84_lat"], 
                        longitude: r["wgs84_lon"], 
                        dateTime: r["_time"]})
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

          const data = { dt: dt, lat: o.latitude, lon: o.longitude };
          results.push(data);
        },
        error: (error) => {
          reject(error);
        },
        complete: async () => {
          // remove null lat and lon value
          const filtered = results.filter(
            (coord: any) => coord.lat !== 'n/a' && coord.lon !== 'n/a'
          );
          resolve(filtered);
        },
      });
    } catch (error) {
      reject(error);
    }
  });
}

//   from(bucket: "demo")
//   |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
//   |> filter(fn: (r) => r._measurement == "GPS")
//   |> filter(fn: (r) => r._field == "wgs84_lon" or r._field == "wgs84_lat")
//   |> filter(fn: (r) => r.machine_serial == "T100")
//   |> pivot(rowKey: ["_time"], columnKey: ["_field"], valueColumn: "_value")
//   |> sort(columns:["_time"], desc:true)
//   |> map(fn: (r) => ({machine_serial: r["machine_serial"],
//                       latitude: r["wgs84_lat"],
//                       longitude: r["wgs84_lon"],
//                       time: r["_time"]}))
