// Making Variable
const config = require("./default.js")
import D from "discord.js"

const client = new D.Client({intents: config.intents,partials:config.partials})

function login(Token:string){
    client.login(Token)
    require("./util/handler/EventHandler.ts").setup(client)
}

export default{
    login,
    client
}