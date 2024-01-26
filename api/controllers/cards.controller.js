
const { sendResponse,generateId } = require("../functions/util");
const { execQuery } = require("../config/db");
const mysql = require('mysql2')


exports.findOne = async (req, res) => {
  let query = "Select * from user_card where id= ? "
  const search_query = mysql.format(query,[req.params.id_card])
  const results= await execQuery(search_query)
  
  return sendResponse(res, 200, "DATA_SUCCESS", results);
};


exports.getCardCount = async (req, res) => {
  const id_user = req.params.id_user;
  let query = "SELECT COUNT(*) as cardCount FROM user_card WHERE id_user=?";
  const search_query = mysql.format(query, [id_user]);
  const results = await execQuery(search_query);
  return sendResponse(res, 200, "DATA_SUCCESS", results[0].cardCount);
};
  
  

exports.createOne = async (req,res,user) => {
  const card_date = new Date();
  const image = req.file || ""
  const data=req.body
  let query = 'INSERT INTO user_card ( `rnd_id`,`full_name`, `email`, `phone_number`, `fonction` , `societe`, `website`, `theme`, `photo`, `youtube`, `linkedin`, `instagram`, `facebook`, `adresse`, `naissance`, `twitter`, `reddit`, `whatsapp`, `pinterrest`, `tiktok`, `card_name`, `status`, `card_date`,`id_user`)'+
                                            ' VALUES ("000000", ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [data.full_name, data.email, data.phone_number, data.fonction, data.societe, data.website, data.theme,image.filename,data.youtube, data.linkedin, data.instagram,data.facebook, data.adresse, data.naissance, data.twitter, data.reddit, data.whatsapp, data.pinterrest, data.tiktok, data.card_name, data.status, card_date, data.id_user];
  let search_query = mysql.format(query,values)
 
  let results=await execQuery(search_query) 
  const rndId=generateId(results.insertId)

  query = 'UPDATE user_card set rnd_id=? where id=?';
  search_query = mysql.format(query,[rndId,results.insertId])
  await execQuery(search_query)
  data.rndId=rndId
  data.insertId=results.insertId

  const updateCountQuery = 'UPDATE users SET card_count = card_count + 1 WHERE id = ?';
  await execQuery(mysql.format(updateCountQuery, [data.id_user]));

  //l ajout des heures d trvl

  const daysOfWeek = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
  try {
    for (const day of daysOfWeek) {
      const bsHoursQuery = 'INSERT INTO bs_hours (day, start_time, end_time, id_card, id_user, status) VALUES (?, ?, ?, ?, ?, ?)';
      const bsHoursValues = [day, '00:00', '00:15', results.insertId, data.id_user, 0];
      const bsHoursSearchQuery = mysql.format(bsHoursQuery, bsHoursValues);
      await execQuery(bsHoursSearchQuery);
    }
  } catch (error) {
    console.error('Error creating bs_hours records:', error);
    return sendResponse(res, 500, 'ERROR_CREATING_BS_HOURS', null);
  }


  return sendResponse(res, 200, "DATA_SUCCESS", data);
};


exports.findAll = async (req, res) => {
  const id_user=req.params.id_user
  let query = "Select * from user_card where id_user=?"
  const search_query = mysql.format(query,[id_user])
  console.log(search_query)
  const results=await execQuery(search_query)
  return sendResponse(res, 200, "DATA_SUCCESS", results);

  };
  

exports.updateOne =async  (req, res) => {
  const naissance = new Date().toISOString().slice(0, 10);
  const photo = req.file || ""

  const data=req.body
  const query = 'UPDATE user_card SET `full_name`=?, `email`=?, `phone_number`=?, `fonction`=?, `societe`=?, `website`=?, `theme`=?, `youtube`=?, `linkedin`=?, `instagram`=?, `adresse`=?, `naissance`=?, `twitter`=?, `reddit`=?, `whatsapp`=?, `pinterrest`=?, `tiktok`=?, `card_name`=?, `status`=?, `facebook`=? where id=?'
  const values = [data.full_name, data.email, data.phone_number,data.fonction, data.societe, data.website, data.theme, data.youtube, data.linkedin, data.instagram, data.adresse, naissance, data.twitter, data.reddit, data.whatsapp, data.pinterrest, data.tiktok, data.card_name, data.status, data.facebook,req.params.id_card];
  
  
  const search_query = mysql.format(query,values)
  console.log(search_query)
  const results=await execQuery(search_query)
  return sendResponse(res, 200, "DATA_SUCCESS", results);
};

  
exports.RemoveOne = async (req, res) => {
  const userId = req.params.id_user;
  const cardId = req.params.id_card
  let response={}

  // Supprimer les srvc associés vc cartes
  let query = "DELETE from services where id_card= ? ";
  const deleteServicesQuery = mysql.format(query, [cardId]);
  await execQuery(deleteServicesQuery);

  // Supprimer des cartes
  query = "DELETE from user_card where  id= ? "
  let search_query = mysql.format(query,[cardId])
  let results=await execQuery(search_query)

  const updateCountQuery = 'UPDATE users SET card_count = card_count - 1 WHERE id = ?';
  await execQuery(mysql.format(updateCountQuery, [userId]));

  console.log(response)
  return sendResponse(res, 200, "DATA_SUCCESS", response);
};

