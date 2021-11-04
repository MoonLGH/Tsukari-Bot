/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Express from "express";
import env from "dotenv";
import DJS from "../../Discord/index";
env.config();

const router = Express.Router();

declare module "express-session" {
  interface Session {
    user: {
      accessToken: string,
      tokenType: string,
      isowner?: boolean
    };
  }
}

async function GETMe(token:string, type:string) {
  try {
    const fetchthings = await fetch("https://discord.com/api/users/@me", {
      headers: {
        authorization: `${type} ${token}`,
      },
    });

    if (fetchthings.status === 200) {
      return (await fetchthings.json());
    }
  } catch (err) {
    return false;
  }
}

async function checkowner(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
  if (!req.session.user) return res.redirect("/dashboard/login");
  const userme = await GETMe(req.session.user.accessToken, req.session.user.tokenType);
  if (!req.session.user.isowner || (userme && userme.id !== (await import("../../Discord/default")).ownerid)) return res.redirect("/dashboard/error?message=お前は私のご主人様ではない！");
  res.locals.user = userme;
  next();
}

router.get("/", checkowner, function(req:Express.Request, res:Express.Response, next?:Express.NextFunction) {
  const {user} = res.locals;
  const djsGuilds = DJS.client.guilds.cache.map((guild) => ({name: guild.name, id: guild.id, icon: guild.iconURL()}));
  res.render("owner/index", {user, djsGuilds});
});

export = router
