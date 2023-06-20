import { REDIS_CONFIG } from '@/config/constant';
import { createClient } from 'redis';

const redisClient = createClient({
  password: REDIS_CONFIG.password,
  socket: {
    host: REDIS_CONFIG.host,
    port: Number(REDIS_CONFIG.port),
  },
});

export default redisClient;
