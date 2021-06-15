const express = require('express');

const app = express();
app.use(express.json());

const pool = require('./database');
const { readExcel } = require('./readexcel');

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.get('/products', async (req, res) => {
  const cnn = await pool.getConnection();
  const query = 'select * from products';
  const rows = await cnn.query(query);
  res.status(200).json(rows);
});

app.post('/new-product', async (req, res) => {
  console.log(req.body);

  const { name, price } = req.body;

  //Get connection
  const conn = await pool.getConnection();

  // create a new query
  const query = 'INSERT INTO products(price,name) VALUE (?,?)';

  //excecutin the query
  const result = await conn.query(query, [price, name]);

  // respond to the client
  res.status(200).json(result);
});

app.post('/productexcel', async (req, res) => {
  const data = readExcel();
  // console.log(data);
  //Get connection
  const conn = await pool.getConnection();

  // create a new query
  const query = 'INSERT INTO products(price,name) VALUE (?,?)';

  //excecutin the query
  data.forEach(async (xrow) => {
    await conn.query(query, [xrow.numero, xrow.nombre]);
  });

  // const result =
  // respond to the client
  res.status(200).json(data);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at:${port}`);
});
