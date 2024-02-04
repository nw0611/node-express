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

// 追加
// client.query({
//   text: "INSERT INTO member VALUES ($1, $2)",
//   values: ['4', "山田四郎"],
// }).then((res) => {
//   console.log('add client res', res)
// })

// 削除
// client.query({
//   text: "DELETE FROM member WHERE id = $1",
//   values: [4],
// }).then((res) => {
//   console.log('add client res', res)
// }).catch((e) => {
//   console.error('error', e)
// })

// 取得
const result = await client.query("SELECT * FROM member").then((res) => {
  console.log('then', res)
  return res.rows;
});
console.log('result', result)
client.end()

export default result