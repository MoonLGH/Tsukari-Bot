const fs = require("fs")
import {
    Message
} from "discord.js"
const config = require("../default.js")


export async function getCommand(msg: Message, command: String, args: Array < any > , prefix: string){

    if(command === "owner"){
        command = args.shift()
        let getcmd:any = await getOwnerCommand(command)

        getcmd.isForwarded = true
        return getcmd
    }else if(command === "anime"){
        command = args.shift()

    }else{


    }

}

function getOwnerCommand(command: any) {
    let folder = "owner"
    for (const file of fs.readdirSync('./src/commands/' + folder).filter((file: any) => file.endsWith('.ts'))) {
        const cmd = require(`../commands/${folder}/${file}`)
        if (cmd.alias) {
            const check: any = CheckForAlias(command, cmd)
            if (check) {
                return {
                    file: file,
                    folder: folder,
                    alias: check.alias
                }
            }
        }
        if (cmd.name === command || file === command) {
            return {
                file: file,
                folder: folder
            }
        }
    }
    return null
}

function CheckForAlias(command: string, cmd: any) {
    let alias = null
    cmd.alias.forEach((cmds: any) => {
        if (cmds === command) {
            alias = {
                cmd: cmd,
                alias: cmds
            }
        }
    });
    return alias
}