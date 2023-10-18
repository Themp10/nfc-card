

sendResponse =  (res,status,message="",data={}) =>{
    console.log("Response: ",{
        message: message,
        data:data
      })
       return res.status(200).send({
          message: message,
          data:data
        });


  }


 generateId =  (id) => {
    const car="0123456789abcdefghijk"
    let newstr=""
    for (let i = 0; i < 10; i++) {
      let currentChar = car[Math.floor(Math.random() * car.length)];
      newstr+=currentChar
    }
    return newstr+"-"+id;
  }

module.exports = {
    sendResponse,generateId
};