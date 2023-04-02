const keys = require('./keys');
const redis = require('redis');

(async () => {
  const redisClient = redis.createClient({
    url: `redis://${keys.redisHost}:${keys.redisPort}`,
  });

  redisClient.on('error', (error) => console.log(`Redis Client Error`, error));

  const subscription = redisClient.duplicate();

  await redisClient.connect();
  await subscription.connect();

  function fibonacci(index) {
    if (index < 2) return 1;
    return fibonacci(index - 1) + fibonacci(index - 2);
  }

  await subscription.subscribe('fibIndex', async (message, channel) => {
    await redisClient.hSet('values', message, fibonacci(parseInt(message)));
  });
})();
