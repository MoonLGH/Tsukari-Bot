const fs = require("fs")
import {
    Message
} from "discord.js"
let owner = false
const config = require("../default.js")

export async function handler(msg: Message, command: String, args: Array < any > , prefix: string) {
    if(command === "owner"){
        if(msg.author.id !== config.ownerid) return msg.reply("You are not authorized to use this command")
        command = args.shift();
        owner = true
    }
    let getcmd:any = await getCommand(command)
    if(owner === true){
        getcmd = await getOwnerCommand(command)
    }
    if(getcmd){
        if(getcmd.alias){
        return require(`../commands/${getcmd.folder}/${getcmd.file}`).execute(msg,command,args,prefix,getcmd.alias)
        }
        require(`../commands/${getcmd.folder}/${getcmd.file}`).execute(msg,command,args,prefix)
    }
}

function getCommand(command:any) {
    const commandFiles = fs.readdirSync('./commands',{ withFileTypes: true }).filter((dirent:any) => dirent.isDirectory()).map((dirent:any) => dirent.name)

    for (const folder of commandFiles) {
        if(folder === "owner") return null
        for (const file of fs.readdirSync('./commands/'+folder).filter((file:any) => file.endsWith('.ts'))){
            const cmd = require(`../commands/${folder}/${file}`)
            if(cmd.alias){
                const check:any = CheckForAlias(command,cmd)
                
                if(check){
                    return {file:file,folder:folder,alias:check.alias}
                }
            }
            if(cmd.name === command || file === command){
                return {file:file,folder:folder}
            }
        }
    }
    return null
}
function getOwnerCommand(command:any) {
    let folder = "owner"
    for (const file of fs.readdirSync('./commands/'+folder).filter((file:any) => file.endsWith('.ts'))){
        const cmd = require(`../commands/${folder}/${file}`)
        if(cmd.alias){
            const check:any = CheckForAlias(command,cmd)
            if(check){
                return {file:file,folder:folder,alias:check.alias}
            }
        }
        if(cmd.name === command || file === command){
            return {file:file,folder:folder}
        }
    }
    return null
}

function CheckForAlias(command:string,cmd:any) {
    let alias = null
    cmd.alias.forEach((cmds:any) => {
        if(cmds === command) {
            alias = { cmd:cmd,alias:cmds }
        }
    });
    return alias
}