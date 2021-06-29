const mariadb = require('mariadb');

const dataServer = {
  host: '192.168.10.115',
  port: '3306',
  user: 'root',
  password: '123456',
  database: 'topadministrativo',
};

const dataLocalhost = {
  host: '127.0.0.1',
  port: '3306',
  user: 'root',
  password: 'c9817803#',
  database: 'topadministrativo',
};

const pool = mariadb.createPool(dataLocalhost);

const getConnection = async () => {
  try {
    console.log(
      `Conectando a SERVIDOR MariaDb Ip: ${dataServer.host} / ${dataServer.port}`
    );
    return await pool.getConnection();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getConnection };
