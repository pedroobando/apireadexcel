const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: '127.0.0.1',
  port: '3306',
  user: 'root',
  password: 'c9817803#',
  database: 'mydatabase',
});

const getConnection = async () => {
  try {
    return await pool.getConnection();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getConnection };
