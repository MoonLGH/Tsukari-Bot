const fs = require("fs")
import {
    Message,CommandInteraction
} from "discord.js"

let Vars = {
    nofolder: ["slash", "owner", "anime"],
    forwardable: ["owner", "anime"]
}

async function handleCommand(command: any, folder? : String) {
    let cmd
    if (folder) {
        cmd = await handleFiles(command, folder)
    } else {
        cmd = await handleFolder(command)
    }
    return cmd
}

async function handleFolder(command: any) {
    const commandFiles = fs.readdirSync('./src/TextCommands', {
        withFileTypes: true
    }).filter((dirent: any) => dirent.isDirectory()).map((dirent: any) => dirent.name)
    for (const folder of commandFiles) {
        if (!search(folder, Vars.nofolder)) {
            let cmd = await handleFiles(command, folder)

            if (cmd) {
                return cmd
            }
        }
    }
}

function handleFiles(command: any, folder: any) {
    for (const file of fs.readdirSync('./src/TextCommands/' + folder).filter((file: any) => file.endsWith('.ts'))) {
        const cmd = require(`../../TextCommands/${folder}/${file}`)
        let other = {
            permission : cmd.permission || [],
            guildOnly : cmd.guildOnly || false,
            DMOnly : cmd.DMOnly || false
        }
        if (cmd.alias) {
            const check: any = CheckForAlias(command, cmd)
            if (check) {
                return {
                    file: file,
                    folder: folder,
                    alias: check.alias,
                    other : other
                }
            }
        }
        if (cmd.name === command || file === command) {
            return {
                file: file,
                folder: folder,
                other : other
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

function search(item: String, arr: Array < String > ) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === item) {
            return true;
        }
    }
    return null;
}

function searchcommand(interaction: CommandInteraction) {
    const commandFiles = fs
        .readdirSync("./src/SlashCommands")
        .filter((file: any) => file.endsWith(".ts"));

    for (const file of commandFiles) {
        const command = require(`../../SlashCommands/${file}`);
        if (command.name === interaction.commandName) {
            return command;
        }
    }
    return false;
}

export {
    search,
    handleCommand,
    Vars,
    searchcommand
}