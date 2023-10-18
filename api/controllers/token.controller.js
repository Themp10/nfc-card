const { execQuery } = require("../config/db");
const mysql = require('mysql2')
const { sendResponse } = require("../functions/util");

exports.createToken = async (data) => {
  
    let query = 'INSERT INTO tokens ( `id_user`,`token`, `expiration`)'+
                                              ' VALUES (?, ?, ?)';
    const values = [data.id_user, data.token, data.expiration];
    let search_query = mysql.format(query,values)
    let results=await execQuery(search_query) 
    return results

  };

  exports.findToken = async (userId) => {
    
    let query = "Select * from tokens where id_user= ? "
    const search_query = mysql.format(query,[userId])
    const results=await execQuery(search_query)
    return results;

  };

  exports.findOne= async (userId) => {
    
    let query = "Select * from tokens where id_user= ? "
    const search_query = mysql.format(query,[userId])
    const results=await execQuery(search_query)
    return sendResponse(res, 200, "DATA_SUCCESS", results);

  };
  exports.removeToken = async (userId) => {
  
    let query = "DELETE from tokens where id_user= ? "
    const search_query = mysql.format(query,[userId])
    const results=await execQuery(search_query)
    return results;
  };
