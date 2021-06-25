const chalk = require('chalk');
const pool = require('./database');
const { readExcel } = require('./readexcel');

const actualizarbasedatos = async () => {
  const tableName = 'productos';
  const data = readExcel();
  const conn = await pool.getConnection();

  try {
    let query2 = '';
    let rowsfind = '';
    let contadorUpdate = 0;
    let contadorInsert = 0;
    data.forEach(async (xrow) => {
      //query2 = `UPDATE ivproser SET COSTOACT=${xrow.Costo}, EXISTENCIA=${xrow.Existencia}, PRECIO1=${xrow.Precio1}, PRECIO2=${xrow.Precio2}, PRECIO3=${xrow.Precio1}  WHERE CODPRO='${xrow.Codigo}'`;
      // `SELECT 1 as val, codigo,NOMBRE FROM productos where codigo='${xrow.codigo}'`
      rowsfind = await conn.query(
        `SELECT codigo, nombre FROM ${tableName} where codigo='${xrow.codigo}' `
      );

      if (rowsfind[0] !== undefined) {
        // console.log('codigo existe ' + rowsfind[0].codigo);
        query2 = `UPDATE ${tableName} SET precio=${xrow.precio}, existencia=${
          xrow.existencia
        }, costo=${xrow.precio * 1.2}  WHERE codigo='${xrow.codigo}'`;
        const consulta = await conn.query(query2);
        console.log(
          chalk.blueBright(`[ACTUALIZADO] => Codigo ${xrow.codigo} - ${xrow.nombre}`)
        );
        contadorUpdate++;
      } else {
        const query2 = `INSERT INTO ${tableName}(codigo, nombre, precio, existencia,costo) VALUE ('${
          xrow.codigo
        }','${xrow.nombre}',${xrow.precio},${xrow.existencia},${xrow.precio * 1.2})`;
        const consulta = await conn.query(query2);
        console.log(
          chalk.yellowBright(`[INSERTADO] => Codigo ${xrow.codigo} - ${xrow.nombre}`)
        );
        contadorInsert++;
      }
    });
    setTimeout(() => {
      console.log(chalk.yellowBright(`\nInsertados ${contadorInsert} registros`));
      console.log(chalk.blueBright(`Actualizados ${contadorUpdate} registros`));
      console.log(chalk.cyanBright('\n\nEl proceso a terminado...'));

      console.log(
        chalk.cyanBright(
          'Presione la tecla ' +
            chalk.redBright.underline.bold('[CRTL]+[C]') +
            ', para salir.'
        )
      );
    }, 2000);
  } catch (error) {
    console.log(error);
    return;
  }
};

const ingresarproductos = async () => {
  const data = readExcel();
  const conn = await pool.getConnection();

  try {
    let query2 = '';
    data.forEach(async (xrow) => {
      query2 = `UPDATE ivproser SET COSTOACT=${xrow.Costo}, EXISTENCIA=${xrow.Existencia}, PRECIO1=${xrow.Precio1}, PRECIO2=${xrow.Precio2}, PRECIO3=${xrow.Precio1}  WHERE CODPRO='${xrow.Codigo}'`;
      query2 = `UPDATE ivproser SET COSTOACT=${xrow.Costo}, EXISTENCIA=${xrow.Existencia}, PRECIO1=${xrow.Precio1}, PRECIO2=${xrow.Precio2}, PRECIO3=${xrow.Precio1}  WHERE CODPRO='${xrow.Codigo}'`;
      console.log(query2);
      await conn.query(query2);
    });
  } catch (error) {
    console.log(error);
    return;
  }
  console.log('Ok..');
};

actualizarbasedatos();

// app.post('/productexcel', async (req, res) => {
//   const data = readExcel();
//   // console.log(data);
//   //Get connection
//   const conn = await pool.getConnection();

//   // create a new query
//   const query = 'INSERT INTO products(price,name) VALUE (?,?)';

//   //excecutin the query
//   data.forEach(async (xrow) => {
//     await conn.query(query, [xrow.numero, xrow.nombre]);
//   });

//   // const result =
//   // respond to the client
//   res.status(200).json(data);
// });

// const port = 3000;
// app.listen(port, () => {
//   console.log(`Server running at:${port}`);
// });
