const redis = require("redis");

const redisClient = redis.createClient({
  port: 6379,
  host: "localhost",
});

redisClient.connect().catch(console.error);

module.exports = redisClient;
