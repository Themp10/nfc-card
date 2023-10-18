
const { sendResponse } = require("../functions/util");
const { execQuery } = require("../config/db");
const mysql = require('mysql2')
var bcrypt = require("bcryptjs");
const crypto = require('crypto');
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'smart21card@gmail.com',
    pass: 'rwxr vqbm ftlp hiyf ',
  },
});



transporter.verify((error, success) => {
  if(error) {
    console.log(error)
  } else {
    console.log("Wotking")
    console.log(success)
  }
})





exports.findOne = async (req, res) => {

    let query = "Select * from users where id= ? "
    const search_query = mysql.format(query,[req.params.id_user])
    const results=await execQuery(search_query)
    return sendResponse(res, 200, "DATA_SUCCESS", results);
  
    };


exports.createOne = async (req, res) => {
      const data = req.body.data;
    
      let query =
        'INSERT INTO users (`fullname`,`email`, `password`,`image`, `isEmailVerified`, `verificationToken`)'+
        ' VALUES (?,?,?,?,?,?)';
      let hashed_password = bcrypt.hashSync(data.password, 8);
      const verificationToken = crypto.randomBytes(20).toString('hex');
      const values = [data.fullname, data.email, hashed_password, data.image, 0, verificationToken];
    
      try {
        await execQuery(mysql.format(query, values));
    
        const mailOptions = {
          from: 'smart21card@gmail.com',
          to: data.email,
          subject: 'Email Verification',
          // text: `Suivez ce lien pour vérifier votre email: http://ouss.sytes.net:5001/verify/${verificationToken}`,
          html: ` <p> Veuillez cliquer sur le boutton au dessous pour vérifier votre email  <br/>
                    <button> <a href='http://ouss.sytes.net:5001/verify/${verificationToken}'> Vérifier </a> </button>
                  </p> `
        };
    
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
    
        return sendResponse(res, 200, 'Vous êtes inscrit avec succès, veuillez vérifier votre email');
      } catch (error) {

        if (error.code === 'ER_DUP_ENTRY') {
          return sendResponse(res, 400, 'Email already exists');
        } else {
          console.error(error);
          return sendResponse(res, 500, 'Err lors de la création d\'utilisateur.');
        }
      }
};
    
    
  exports.findAll = (req, res) => {
   
  };

  exports.updateOne = async (req, res) => {
    const data=req.body.data
    const id_user = req.params.id_user;

    let query = 'UPDATE users set `fullname`=?,`email`=?,`image`=? where id=?';
    // const hashed_password = bcrypt.hashSync(newPassword, 8)
    const values = [data.fullname, data.email, data.image, id_user];
    let search_query = mysql.format(query,values)
    let results=await execQuery(search_query) 
    return sendResponse(res, 200, "DATA_SUCCESS", results);
  };



  exports.verifyEmail = async (req, res) => {

    console.log('verifyEmail r route appelée');
    
    const verificationToken = req.query.verificationToken;
    console.log(verificationToken)
  
    const updateQuery = 'UPDATE users SET isEmailVerified = 1 WHERE verificationToken = ?';
    const updateValues = [verificationToken];

    try {
      const user = await execQuery('SELECT * FROM users WHERE verificationToken = ?', [verificationToken]);

      if (!user || user.length === 0) {
        return sendResponse(res, 404, 'Utilisateur non trouvé.');
      }

      await execQuery(mysql.format(updateQuery, updateValues));

      return sendResponse(res, 200, 'Vérification avec succès');
    } catch (error) {
      console.error('Error verifying email:', error);
      return sendResponse(res, 500, 'Error verifying email.');
    }
  };


 



  exports.RemoveOne = (req, res) => {


  };