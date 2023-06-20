import { INFLUX_CONFIG } from '@/config/constant';
import { InfluxDB } from '@influxdata/influxdb-client';

const influxDbClient = new InfluxDB({
  url: INFLUX_CONFIG.url ?? '',
  token: INFLUX_CONFIG.token ?? '',
});

export default influxDbClient;
