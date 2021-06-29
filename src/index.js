const chalk = require('chalk');
const pool = require('./database');
const { readExcel } = require('./readexcel');

const actualizarBDAsync = async (tableName, data) => {
  const conn = await pool.getConnection();

  try {
    let query2 = '';
    let rowsfind = '';
    let contadorUpdate = 0;
    let contadorInsert = 0;

    let util01 = 1;
    let vPrecio01 = 0;
    let util02 = 1.5;
    let vPrecio02 = 0;

    for (const xrow of data) {
      rowsfind = await conn.query(
        `SELECT CODPRO, DESCRIP1 FROM ${tableName} where CODPRO='${xrow.Codigo}' `
      );
      vPrecio01 = xrow.Costo * util01 + xrow.Costo;
      vPrecio02 = xrow.Costo * util02 + xrow.Costo;
      if (rowsfind[0] !== undefined) {
        query2 = `UPDATE ${tableName} SET COSTOACT=${xrow.Costo}, COSTOPRO=${xrow.Costo}, EXISTENCIA=${xrow.Existencia}, PRECIO1=${vPrecio01}, PRECIO2=${vPrecio02}, PRECIO3=${vPrecio01}, UTILPRECIO1=50, UTILPRECIO2=60, UTILPRECIO3=50  WHERE CODPRO='${xrow.Codigo}'`;
        const consulta = await conn.query(query2);
        console.log(chalk.blueBright(`[ACTUALIZADO] => Codigo ${xrow.Codigo} - ${xrow.Descrip1}`));
        contadorUpdate++;
      } else {
        const query2 = `INSERT INTO ${tableName}(CODPRO, DESCRIP1, CODFABRICANTE, GRUPOINV, COSTOACT, COSTOPRO, EXISTENCIA, PRECIO1, PRECIO2, PRECIO3, UTILPRECIO1, UTILPRECIO2, UTILPRECIO3) VALUE ('${xrow.Codigo}','${xrow.Descrip1}','${xrow.CodFabricante}','${xrow.GrupoInv}',${xrow.Costo}, ${xrow.Costo},${xrow.Existencia},${vPrecio01},${vPrecio02},${vPrecio01},50,60,50)`;
        const consulta = await conn.query(query2);
        console.log(chalk.yellowBright(`[INSERTADO] => Codigo ${xrow.Codigo} - ${xrow.Descrip1}`));
        contadorInsert++;
      }
    }
    return { contadorUpdate, contadorInsert };
  } catch (error) {
    console.log(error);
    throw new Error('Error Controlado');
  }
};

const data = readExcel();
actualizarBDAsync('ivproser', data)
  .then((resp) => {
    console.log(chalk.yellowBright(`\nInsertados ${resp.contadorInsert} registros`));
    console.log(chalk.blueBright(`Actualizados ${resp.contadorUpdate} registros`));
    console.log(chalk.cyanBright('\n\nEl proceso a terminado...'));
  })
  .catch((error) => {
    console.log(
      chalk.redBright('\n\nSe presento un error no controlado. ') +
        chalk.yellowBright('Favor Notificar a Sr. Luis Hernandez')
    );
  })
  .finally(() => {
    console.log(
      chalk.cyanBright(
        '\nPresione la tecla ' + chalk.redBright.underline.bold('[CRTL]+[C]') + ', para salir.'
      )
    );
  });
