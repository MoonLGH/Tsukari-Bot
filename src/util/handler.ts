import {
    Message
} from "discord.js"
const forward = require("./forwardedhandler.ts")
import { handleCommand } from "./handleutil"

export async function handler(msg: Message, command: String, args: Array < any > , prefix: string) {
    let getcmd: any = await forward.getCommand(msg,command,args,prefix)
    if(!getcmd) {
        getcmd = await handleCommand(command)
    }
    if (getcmd) {
        if (getcmd.alias) {
            return require(`../commands/${getcmd.folder}/${getcmd.file}`).execute(msg, command, args, prefix, getcmd.alias)
        }
        require(`../commands/${getcmd.folder}/${getcmd.file}`).execute(msg, command, args, prefix)
    }
}
