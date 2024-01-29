
const { sendResponse } = require("../functions/util");

reqFormatMiddleware = (req, res,next) => {
    console.log("!!!=============Nouvelle requete===========!!!")
    console.log("Méthode : "  ,req.method)
    console.log("Chemin  : "  ,req.path)
    console.log("Body    : "  ,req.body)
    console.log("headers  : "  ,req.headers)
    switch(req.method) {
        case "GET":

          break;
        case "POST":
          break;
        case "PATCH":
          break;
        case "DELETE":
            console.log("req params",req.params)
        break;

        default:
        return sendResponse(res,404,"METHOD_NOT_AUTHORISED",{})
      } 
      next()
    
};

module.exports = reqFormatMiddleware;