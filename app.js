import express from 'express';
import pg from 'pg';

import createError from 'http-errors';
import { fileURLToPath } from 'url';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
// page
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';

const app = express();
// const PROJECT_PORT = 3010;

// ESモジュールで __dirname をエミュレートし、ファイルの絶対パスを変数化
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log('__filename', __filename)
console.log('__dirname', __dirname)

/*
* view engineにejsを登録
*/ 
// viewsのルートを指定
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*
* route
*/
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// 仮data
// const server = app.listen(PROJECT_PORT, () => {
//   console.log(`サーバーがポート${server.address().port}で起動しました。`);
// });

// const photoList = [
//   {
//     id: "001",
//     name: "photo001.jpg",
//     type: "jpg",
//     dataUrl: "https://picsum.photos/300/200"
//   },{
//     id: "002",
//     name: "photo002.jpg",
//     type: "jpg",
//     dataUrl: "https://picsum.photos/300/200"
//   }
// ]

/*
* API
*/
// 写真リストを取得するAPI
// app.get("/api/photo/list", (req, res, next) => {
//   res.json(photoList);
// });

// 特定のIDの写真情報を表示
// app.get("/api/photo/:photoId", (req, res, next) => {
//   console.log('req', req)
//   var photo;
//   for (var i = 0; i < photoList.length; i++){
//       console.log('index', i)
//       if (photoList[i].id == req.params.photoId){
//           var photo = photoList[i];
//       }
//   }
//   res.json(photo);
// });

export default app;