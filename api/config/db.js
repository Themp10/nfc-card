const mysql = require('mysql2')

exports.execQuery = (query) => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "nfc_card" ,
    })
    connection.connect((err) => {
      if (err) {
        reject(err);
        return;
      }
      connection.query(query, (err, rows, fields,) => {
        if (err) {
          reject(err);
          return;
        }
        connection.end();
        if (rows.length==1){
          resolve(rows[0]);
        }else{
          resolve(rows);
        }
        
      });
    });
  });
};
