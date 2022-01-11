const koa = require('koa');
const app = new koa();

const hostname = 'localhost';
const port = 3000;

app.use(async ctx => {
  ctx.body = '<h2>Welcome to Koa Server</h2>';
});

app.listen(port, () => {
  console.log(`Koa server running on http://localhost:${port}`)
});


/*
  Way to start Hapi server
  (i) node server-koa.js: Changes won't be reflected on the fly
  (ii) Install nodemon and run nodemon server-koa.js
*/
