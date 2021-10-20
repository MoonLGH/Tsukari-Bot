import * as Express from "express"

var router = Express.Router();

/* GET home page. */
router.get('/', function(req:Express.Request, res:Express.Response, next?:Function) {

  res.render("index",{message:req.query.msg,title:req.query.title});

  if(next){
    // next(req,res);
  }
});

export default router