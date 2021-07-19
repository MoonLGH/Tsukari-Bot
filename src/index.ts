// Process Enviroment detector
require("dotenv").config("../")
const config = require("./default.js")

// Making the Bot Variable
const D = require("discord.js")
const client = new D.Client({intents: D.Intents.ALL})

//Renewing Console.log So It would also log into an channel

client.on('ready', async () => {
    const oldLog = console.log;
    console.log = m => {
      logToDiscord(m);
      oldLog(m);
    }
})

function logToDiscord(m:any){
    client.channels.cache.get(config.botconsole).send(`Console Log: ${m}`)
}

// Bot Listener

client.on("ready",async()=>{
    require("./util/ready.ts").ready(client)
})
client.on("message",async(msg:any)=>{
    let prefix:any = undefined
    if(msg.channel.id === config.botconsole) return /* returning all console channel message, cause in the development time it's so annoying */
    if(process.env.TESTPREFIX){
        if(msg.content.toLowerCase().startsWith(process.env.TESTPREFIX.toLowerCase())){
        prefix = process.env.TESTPREFIX
        }
    }
    if(prefix === undefined){
        prefix = config.defaultprefixes.find((p:string) => msg.content.toLowerCase().startsWith(p.toLowerCase())) 
    }
    try{
        if (prefix === undefined || !msg.content.toLowerCase().startsWith(prefix.toLowerCase())) return
        const args = msg.content.slice(prefix.length).split(/ +/)
        const command = args.shift().toLowerCase()
        require("./util/handler.ts").handler(msg, command, args, prefix,D)
    }catch(err){
        require("./util/error.ts").execute(err,msg,D)
    }
})

// Login to bot
client.login(process.env.TOKEN)