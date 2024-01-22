
const { sendResponse } = require("../functions/util");
const { execQuery } = require("../config/db");
const mysql = require('mysql2')
var bcrypt = require("bcryptjs");
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const fs = require('fs').promises;


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
        let sqlresulat=await execQuery(mysql.format(query, values));
        let newToken=sqlresulat.insertId+"-"+verificationToken
        const mailOptions = {
          from: 'smart21card@gmail.com',
          to: data.email,
          subject: 'Email Verification',
          html: ` <p> Veuillez cliquer sur le boutton au dessous pour vérifier votre email  <br/>
                    <button> <a href='http://localhost:5001/verify/${newToken}'> Vérifier </a> </button>
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

    const image = req.file
    

    let query = 'UPDATE users set `fullname`=?,`image`=? where id=?';
    const values = [data.fullname, image.filename , id_user];
    let search_query = mysql.format(query,values)
    let results=await execQuery(search_query) 
    return sendResponse(res, 200, "DATA_SUCCESS", results); 
  };




  exports.verifyEmail = async (req, res) => {
    const verificationToken = req.params.verificationToken;


    console.log(verificationToken)
    let token=verificationToken.split("-");
  
    const updateQuery = 'UPDATE users SET isEmailVerified = 1 WHERE id = ? and verificationToken = ? ';
    let search_query = mysql.format(updateQuery,[token[0],token[1]])
    console.log(search_query)
    let results=await execQuery(search_query) 
    console.log(results)
    try {


      return sendResponse(res, 200, 'Vérification avec succès');
    } catch (error) {
      console.error('Error verifying email:', error);
      return sendResponse(res, 500, 'Error verifying email.');
    }
  };


  exports.RemoveOne = (req, res) => {


  };