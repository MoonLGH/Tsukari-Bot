const fs = require("fs")
import {
    Message
} from "discord.js"
const config = require("../default.js")
import { handleCommand,search,Vars } from "./handleutil"

export async function getCommand(msg: Message, command: String, args: Array < any > , prefix: string){
    let getcmd = null
    if(search(command,Vars.forwardable)){
        let folder = command
        command = args.shift()
        getcmd = await handleCommand(command,folder)
    }
    return getcmd
}
