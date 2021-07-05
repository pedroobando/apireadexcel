const chalk = require('chalk');
// const mariadb = require('mariadb');
const sql = require('mssql');

const sqlConfig = {
  user: 'sa',
  password: `123456`,
  database: 'SAPROD',
  server: 'ADMARIA\\SQLTORNIAMERICA',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

// const dataServer = {
//   host: '192.168.10.115',
//   port: '3306',
//   user: 'root',
//   password: '123456',
//   database: 'topadministrativo',
// };

// const dataLocalhost = {
//   host: '127.0.0.1',
//   port: '3306',
//   user: 'root',
//   password: 'c9817803#',
//   database: 'topadministrativo',
// };

// const pool = mariadb.createPool(dataLocalhost);

const getConnection = async () => {
  try {
    console.log(chalk.cyanBright(`Conectando a SERVIDOR MariaDb Ip: ${sqlConfig.server} \n`));
    return await sql.connect(sqlConfig);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getConnection };
