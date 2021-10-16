const fs = require("fs")
import { CommandInteraction } from "discord.js"
import { isGeneratorFunction } from "util/types"
import {commands, slashes} from "./globalVar"
import {slash as slashInterface} from "./typing"

let Vars = {
    nofolder: ["slash", "owner", "anime"],
    forwardable: ["owner", "anime"]
}

async function handleCommand(command: any, folder? : string) {
    let cmd
    if (folder) {
        cmd = await getCommand(command, folder)
    } else {
        cmd = await getCommand(command)
    }
    return cmd
}

function search(item: String, arr: Array < String > ) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === item) {
            return true;
        }
    }
    return null;
}

function loadSlashCommand() {
    const commandFiles = fs
        .readdirSync("./src/SlashCommands")
        .filter((file: any) => file.endsWith(".ts"));

    let arr:Array<slashInterface> = []
    for (const file of commandFiles) {
        const command = require(`../../SlashCommands/${file}`);

        arr.push({
            name:command.name,
            file:file,
            filepath: `../../SlashCommands/${file}`,
            options:command.options||[],
            interaction:command.interaction
        })
    }
    return arr;
}

async function loadTextCommand() {
    const commandFiles = fs.readdirSync('./src/TextCommands', {
        withFileTypes: true
    }).filter((dirent: any) => dirent.isDirectory()).map((dirent: any) => dirent.name)

    let arr = []
    for (const folder of commandFiles) {
        for (const file of fs.readdirSync('./src/TextCommands/' + folder).filter((file: any) => file.endsWith('.ts'))) {
            const cmd = require(`../../TextCommands/${folder}/${file}`)
            let other = {
                permission : cmd.permission || [],
                guildOnly : cmd.guildOnly || false,
                DMOnly : cmd.DMOnly || false
            }
            arr.push({
                name: cmd.name,
                file:file,
                folder: folder,
                alias: cmd.alias || [],
                other : other,
                filepath : `../../TextCommands/${folder}/${file}`,
            })
            
        }
    }
    return arr
}

async function getCommand(command:string,folder?:string){
    let cmd
    if(folder){
        cmd = commands.find(cmd => cmd.folder === folder && (cmd.name === command || cmd.alias.includes(command)))
    }else{
        cmd = commands.find(cmd => cmd.name === command || cmd.alias.includes(command))
    }

    if(!cmd){
        cmd = null
    }
    return cmd
}

async function getSlash(interaction:CommandInteraction){
    let cmd = slashes.find(s => s.name === interaction.commandName)

    if(cmd) return cmd

    return null
}

export {
    search,
    handleCommand,
    Vars,
    loadSlashCommand,
    loadTextCommand,
    getSlash
}