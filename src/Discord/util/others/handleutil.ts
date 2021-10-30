import { CommandInteraction } from "discord.js"
import {commands, slashes} from "./globalVar"
import {slash as slashInterface} from "./typing"
import fs from "fs"

const Vars = {
    nofolder: ["slash", "owner"],
    forwardable: ["owner"]
}

async function handleCommand(command:string , folder? : string) {
    let cmd
    if (folder) {
        cmd = await getCommand(command, folder)
    } else {
        cmd = await getCommand(command)
    }
    return cmd
}

function search(item: string, arr: string[] ) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === item) {
            return true;
        }
    }
    return null;
}

async function loadSlashCommand() {
    const commandFiles = fs
        .readdirSync("./src/Discord/SlashCommands")
        .filter((file:string) => file.endsWith(".ts"));

    const arr:Array<slashInterface> = []
    for (const file of commandFiles) {
        const command = await import(`../../SlashCommands/${file}`);

        arr.push({
            name:command.name,
            file:file,
            filepath: `../../SlashCommands/${file}`,
            options:command.options||[],
            description:command.description,
            interaction:command.interaction
        })
    }
    return arr;
}

async function loadTextCommand() {
    const commandFiles = fs.readdirSync('./src/Discord/TextCommands', {
        withFileTypes: true
    }).filter((dirent) => dirent.isDirectory()).map((dirent) => dirent.name)

    const arr = []
    for (const folder of commandFiles) {
        for (const file of fs.readdirSync('./src/Discord/TextCommands/' + folder).filter((file) => file.endsWith('.ts'))) {
            const cmd = await import(`../../TextCommands/${folder}/${file}`)
            const other = {
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
                description: cmd.description
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
    const cmd = slashes.find(s => s.name === interaction.commandName)

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