
const { sendResponse,generateId } = require("../functions/util");
const { execQuery } = require("../config/db");
const mysql = require('mysql2')



exports.findOne = async (req, res) => {
  const cardId = req.params.id_card
  let query = "Select * from galerie where id_card= ? "
  const search_query = mysql.format(query,[cardId])
  const results=await execQuery(search_query)
  return sendResponse(res, 200, "DATA_SUCCESS", results);

  };


exports.createOne = async (req,res) => {
    const data=req.body
    const image = req.file || ""

    try {
      const query = 'INSERT INTO galerie (image, id_card, id_user) VALUES (?, ?, ?)';
      const values = [image.filename, data.id_card, data.id_user ];
      const search_query = mysql.format(query, values);
      const results = await execQuery(search_query);
      const responseData = { id_user: data.id_user, results };
      
      return sendResponse(res, 200, 'GALERIE_CREATED', responseData);
    } catch (error) {
      console.error('Error creating galerie:', error);
      return sendResponse(res, 500, 'ERROR_CREATING_GALERIE', null);
    }
  };

exports.findAll = async (req, res) => {
  const id_user=req.params.id_user
  let query = "Select * from galerie where id_user=?"
  const search_query = mysql.format(query,[id_user])
  console.log(search_query)
  const results=await execQuery(search_query)
  return sendResponse(res, 200, "DATA_SUCCESS", results);

  };
  

  
exports.RemoveOne = async (req, res) => {
  const id_user = req.params.id_user;
  const id_card = req.params.id_card;
  console.log('req.galerieee', id_user);

  let query = "DELETE from galerie where id= ? "
  const search_query = mysql.format(query,[id_card])
  const results=await execQuery(search_query)
  return sendResponse(res, 200, "DATA_SUCCESS", results);
};