// Making Variable
import D from "discord.js"
import config from "./default"
import { setup } from "./util/handler/EventHandler"
const client = new D.Client({intents: (config.intents as D.IntentsString[]),partials:(config.partials as D.PartialTypes[])})

function login(Token:string){
    client.login(Token)
    setup(client)
}

export default{
    login,
    client
}