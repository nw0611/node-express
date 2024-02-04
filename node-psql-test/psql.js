import pg from 'pg';

const { Client } = pg
const client = new Client({
  user: "nw",
  host: "127.0.0.1",
  database: "nodedb",
  password: "&naoki0611",
  port: 5432,
});
client.connect();
const result = await client.query("SELECT NOW()").then((res) => {
  console.log('then', res)
  return res
});
console.log('result', result)
client.end();

export default result