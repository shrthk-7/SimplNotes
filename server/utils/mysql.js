const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

const query = async (queryString, paramArr) => {
  if (!paramArr) paramArr = [];

  return new Promise((resolve, reject) => {
    connection.query(queryString, paramArr, (err, results) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(JSON.parse(JSON.stringify(results)));
      }
    });
  });
};

const initDB = async () => {
  await query(
    `CREATE TABLE IF NOT EXISTS User (
		user_id INT AUTO_INCREMENT PRIMARY KEY,
		username VARCHAR(50) NOT NULL UNIQUE,
		password VARCHAR(255) NOT NULL
	)`,
    []
  );

  await query(
    `CREATE TABLE IF NOT EXISTS Note (
  	note_id INT AUTO_INCREMENT PRIMARY KEY,
  	heading TEXT NOT NULL,
  	body TEXT,
  	backgroundColor VARCHAR(20) DEFAULT 'var(--teal-950)',
  	color VARCHAR(20) DEFAULT 'var(--teal-50)',
  	user_id INT NOT NULL,

  	FOREIGN KEY (user_id) REFERENCES User(user_id)
  		ON DELETE CASCADE
  )`,
    []
  );
};

const connectDB = async () => {
  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        initDB().then(() => {
          resolve();
        });
      }
    });
  });
};

const disconnectDB = async () => {
  return new Promise((resolve, reject) => {
    connection.end((err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

module.exports = { query, connectDB, disconnectDB };
