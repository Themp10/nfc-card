
const { sendResponse,generateId } = require("../functions/util");
const { execQuery } = require("../config/db");
const mysql = require('mysql2')
const nodemailer = require('nodemailer');



const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'smart21card@gmail.com',
    pass: 'sm@rtcard23',
  },
});

exports.sendOrderConfirmationEmail = async (orderId, userEmail) => {
  try {
    const mailOptions = {
      from: 'smart21card@gmail.com',
      to: userEmail,
      subject: 'Confirmation de commande',
      text: `Your order ${orderId} has been successfully placed.`,
    };

    await transporter.sendMail(mailOptions);
    return 'Email sent successfully';
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('An error occurred while sending the email');
  }
};



exports.findOne = async (req, res) => {
  let query = "Select * from commandes where id_card= ? "
  const search_query = mysql.format(query,[req.params.id_card])
  const results=await execQuery(search_query)
  return sendResponse(res, 200, "DATA_SUCCESS", results);

  };

  

exports.createOne = async (req,res,user) => {
    const data=req.body
    //check if exists
    let query = "Select * from commandes where id_card= ? "
    let search_query = mysql.format(query,[data.id_card])
    let results=await execQuery(search_query)

    if(results.length!=0){
        return sendResponse(res, 200, "ALL READY ORDERED", {});
    }
    
    const card_date = new Date();

    query = 'INSERT INTO commandes ( `id_card`, `id_user`,`date`) VALUES (?, ?, ?)';
    const values = [data.id_card,data.id_user,card_date];
    search_query = mysql.format(query,values)
    results=await execQuery(search_query) 


    query = 'UPDATE user_card set `order`=1 where id=?';
    search_query = mysql.format(query,[data.id_card])
    await execQuery(search_query)

    return sendResponse(res, 200, "COMMANDE CREE AVEC SUCCES");
  };

exports.findAll = async (req, res) => {
  const id_user=req.params.id_user
  let query = "SELECT u.card_name,u.theme,u.card_date,s.status "+
              "FROM commandes AS c,user_card AS u,status AS s "+
              "WHERE u.id=c.id_card AND c.id_user=? AND c.status=s.id_status"
  const search_query = mysql.format(query,[id_user])
  console.log(search_query)
  const results=await execQuery(search_query)
  return sendResponse(res, 200, "DATA_SUCCESS", results);

  };
  

exports.updateOne =async  (req, res) => {
  const naissance = new Date().toISOString().slice(0, 10);
  const data=req.body
  const query = 'UPDATE user_card SET `full_name`=?, `email`=?, `phone_number`=?, `fonction`=?, `societe`=?, `website`=?, `theme`=?, `photo`=?, `youtube`=?, `linkedin`=?, `instagram`=?, `adresse`=?, `naissance`=?, `twitter`=?, `reddit`=?, `whatsapp`=?, `pinterrest`=?, `tiktok`=?, `card_name`=?, `status`=?, `facebook`=? where id=?'
  const values = [data.full_name, data.email, data.phone_number,data.fonction, data.societe, data.website, data.theme, data.photo,data.youtube, data.linkedin, data.instagram, data.adresse, naissance, data.twitter, data.reddit, data.whatsapp, data.pinterrest, data.tiktok, data.card_name, data.status, data.facebook,req.params.id_card];
  const search_query = mysql.format(query,values)
  console.log(search_query)
  const results=await execQuery(search_query)
  return sendResponse(res, 200, "DATA_SUCCESS", results);

  };

  
exports.RemoveOne = async (req, res) => {

  let query = "DELETE from user_card where  id= ? "
  const search_query = mysql.format(query,[req.params.id_card])
  const results=await execQuery(search_query)
  return sendResponse(res, 200, "DATA_SUCCESS", results);


  };