const keys = require('./keys');

// Express App Setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Postgres Client Setup
const { Pool } = require('pg');

const pgClient = new Pool({
  user: keys.pgUser,
  password: keys.pgPassword,
  host: keys.pgHost,
  port: keys.pgPort,
  database: keys.pgDatabase,
});

pgClient.on('error', () => console.log('Lost PG connection'));
pgClient
  .query('CREATE TABLE IF NOT EXISTS values (number INT)')
  .catch((error) => console.log(error));

// Redis Client Setup
const redis = require('redis');
const redisClient = redis.createClient({
  url: `redis://${keys.redisHost}:${keys.redisPort}`,
});

redisClient.on('error', (error) => console.log(`Redis Client Error`, error));

(async () => {
  await redisClient.connect();
})();

// Express route handlers
app.get('/', (req, res) => res.send('Hello, this is Dat Gia Truong'));

app.get('/values/all', async (req, res) => {
  const values = await pgClient.query('SELECT * from values');
  res.send(values.rows);
});

app.get('/values/current', async (req, res) => {
  const values = await redisClient.hGetAll('values');
  res.send(values);
});

app.post('/values', async (req, res) => {
  const index = req.body.index;
  if (!index) {
    return res.status(400).send('Index is required');
  }

  if (parseInt(index) > 40) {
    return res.status(422).send('Index too high');
  }

  await redisClient.hSet('values', index, 'Nothing yet!');
  await redisClient.publish('fibIndex', String(index));
  await pgClient.query('INSERT INTO values(number) VALUES($1)', [index]);

  res.send({ working: true });
});

app.listen(5001, () => console.log('Listening at port 5001'));
