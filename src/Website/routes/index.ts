/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Express from "express"
import DJS from "../../Discord/index"
import * as vars from "../../Discord/util/others/globalVar"
import { countsUptime } from "../helpers/timeformat"
import { commands,slashes } from "../../Discord/util/others/globalVar"
import {makeArrayOfPermission} from "../helpers/permission"
import env from "dotenv"
env.config()

const router = Express.Router();

/* GET home page. */
router.get('/', function(req:Express.Request, res:Express.Response, next?:Express.NextFunction) {

  const commands = `${vars.commands.size} Text Commands`
  const slash = `${vars.slashes.size} Slash Commands`
  res.render("index/index",{guildSize:DJS.client.guilds.cache.size,uptime:countsUptime((DJS.client.uptime as number)),commandSize:commands,slashSize:slash,imgsrc:DJS.client.user!.displayAvatarURL({format:"png",dynamic:true})});

});

router.get('/invite', function(req:Express.Request, res:Express.Response, next?:Express.NextFunction) {

  res.render("index/invite",{Permissions:makeArrayOfPermission(),imgsrc:DJS.client.user!.displayAvatarURL({format:"png",dynamic:true}),perms:req.query.perms||null,guildID:req.query.guildID||null});

});

// redirect all http requests to https

router.get('/commands', function(req:Express.Request, res:Express.Response, next?:Express.NextFunction) {

  let type = req.query.type
  const search = req.query.q
  if(!type) type = "text"
  res.render("index/commands",{type,search,commands,slashes})

});
export = router