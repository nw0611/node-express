import express from 'express';
import pg from 'pg';
const { Pool } = pg

const app = express();
const PROJECT_PORT = 3000;

// PostgreSQL接続情報を設定
const pool = new Pool({
  user: 'your_username',
  host: 'your_host',
  database: 'your_database',
  password: 'your_password',
  port: 5432 // ポート番号はデフォルトの5432に設定
});

app.listen(PROJECT_PORT, () => {
  console.log(`サーバーがポート${PROJECT_PORT}で起動しました。`);
});

// view engineにejsを登録
app.set('view engine', 'ejs');

// 表示画面のルーティング
app.get('/', function(req, res, next) {
  // renderメソッドで任意のテンプレートを表示させる
  res.render("index", {});
})

// data
var photoList = [
  {
      id: "001",
      name: "photo001.jpg",
      type: "jpg",
      dataUrl: "https://picsum.photos/300/200"
  },{
      id: "002",
      name: "photo002.jpg",
      type: "jpg",
      dataUrl: "https://picsum.photos/300/200"
  }
]

// データベースからデータを取得する例
app.get('/api/users', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM users');
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// 写真リストを取得するAPI
app.get("/api/photo/list", function(req, res, next){
  res.json(photoList);
});

// 特定のIDの写真情報を表示
app.get("/api/photo/:photoId", function(req, res, next){
  console.log('req', req)
  var photo;
  for (var i = 0; i < photoList.length; i++){
      console.log('index', i)
      if (photoList[i].id == req.params.photoId){
          var photo = photoList[i];
      }
  }
  res.json(photo);
});

