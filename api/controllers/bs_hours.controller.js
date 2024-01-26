
const { sendResponse,generateId } = require("../functions/util");
const { execQuery } = require("../config/db");
const mysql = require('mysql2')


exports.findOne = async (req, res) => {
  let query = "Select * from bs_hours where id_card= ? "
  const search_query = mysql.format(query,[req.params.id_card])
  const results= await execQuery(search_query)
  
  return sendResponse(res, 200, "DATA_SUCCESS", results);
};



exports.updateOne = async (req, res) => {
    const data = req.body;
  
    try {
      for (const entry of data) {
        const updateQuery = `
          UPDATE bs_hours
          SET start_time=?, end_time=?, status=?
          WHERE day=? AND id_card=?
        `;
        const updateValues = [entry.start_time, entry.end_time, entry.status || 0, entry.day, req.params.id_card];
        await execQuery(mysql.format(updateQuery, updateValues));
      }
  
      const responseData = { results: 'Data successfully updated' };
      return sendResponse(res, 200, 'HOURS_UPDATED', responseData);
    } catch (error) {
      console.error('Error updating hours:', error);
      return sendResponse(res, 500, 'ERROR_UPDATING_HOURS', null);
    }
  };
   