
const { sendResponse,generateId } = require("../functions/util");
const { execQuery } = require("../config/db");
const mysql = require('mysql2')



exports.findOne = async (req, res) => {
  const cardId = req.params.id_card
  let query = "Select * from services where id_card= ? "
  const search_query = mysql.format(query,[cardId])
  const results=await execQuery(search_query)
  return sendResponse(res, 200, "DATA_SUCCESS", results);

  };

  exports.countServices = async (req, res) => {
    try {
      const id_user = req.params.id_user;
      const query = 'SELECT COUNT(*) as count FROM services WHERE id_user = ?';
      const results = await db.query(query, [id_user]);
      return res.json({ count: results[0].count });
    } catch (error) {
      console.error('Error fetching services count:', error);
      return res.status(500).json({ error: 'INTERNAL_SERVER_ERROR' });
    }
  }

  

exports.createOne = async (req,res) => {
    const data=req.body
    const image = req.file || ""

    try {
      const query = 'INSERT INTO services (id_card, id_user, name, description, image) VALUES (?, ?, ?, ?, ?)';
      const values = [data.id_card, data.id_user, data.name, data.description, image.filename];
      const search_query = mysql.format(query, values);
      const results = await execQuery(search_query);
      return sendResponse(res, 200, 'SERVICE_CREATED', results);
    } catch (error) {
      console.error('Error creating service:', error);
      return sendResponse(res, 500, 'ERROR_CREATING_SERVICE', null);
    }
  };

exports.findAll = async (req, res) => {
  const id_user=req.params.id_user
  let query = "Select * from services where id_user=?"
  const search_query = mysql.format(query,[id_user])
  console.log(search_query)
  const results=await execQuery(search_query)
  return sendResponse(res, 200, "DATA_SUCCESS", results);

  };
  

exports.updateOne =async  (req, res) => {
  const serviceId = req.params.id_service
  const data=req.body
  const query = 'UPDATE services SET `name`=?, `description`=? where id=?'
  const values = [data.name, data.description, serviceId];
  const search_query = mysql.format(query,values)
  console.log(search_query)
  const results=await execQuery(search_query)
  return sendResponse(res, 200, "DATA_SUCCESS", results);

  };

  
exports.RemoveOne = async (req, res) => {

  let query = "DELETE from services where  id= ? "
  const search_query = mysql.format(query,[req.params.id_card])
  const results=await execQuery(search_query)
  return sendResponse(res, 200, "DATA_SUCCESS", results);


  };