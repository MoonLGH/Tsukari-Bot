import * as Express from "express"
import DJS from "../../Discord/index"
import * as vars from "../../Discord/util/others/globalVar"
import { countsUptime } from "../helpers/timeformat"
import { commands,slashes } from "../../Discord/util/others/globalVar"
import {slash} from "../../Discord/util/others/typing"
import {makeArrayOfPermission} from "../helpers/permission"
import { Interface } from "readline"

var router = Express.Router();

/* GET home page. */
router.get('/', function(req:Express.Request, res:Express.Response, next?:Function) {

  let commands = `${vars.commands.size} Text Commands`
  let slash = `${vars.slashes.size} Slash Commands`
  res.render("index",{guildSize:DJS.client.guilds.cache.size,uptime:countsUptime(DJS.client.uptime),commandSize:commands,slashSize:slash,imgsrc:DJS.client.user.displayAvatarURL({format:"png",dynamic:true})});

});

router.get('/invite', function(req:Express.Request, res:Express.Response, next?:Function) {

  res.render("invite",{Permissions:makeArrayOfPermission(),imgsrc:DJS.client.user.displayAvatarURL({format:"png",dynamic:true})});

});

router.get('/commands', function(req:Express.Request, res:Express.Response, next?:Function) {

  let type = req.query.type
  let search = req.query.q
  if(!type) type = "text"
  res.render("commands",{type,search,commands,slashes})

});
export = router