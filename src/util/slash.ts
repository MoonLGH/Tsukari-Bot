import {
    Client,CommandInteraction,ButtonInteraction
} from "discord.js"
require("dotenv").config("../../")
const fs = require("fs")

export async function add(client: Client) {
    const commandFiles = fs.readdirSync('./commands/slash/').filter((file: any) => file.endsWith('.ts'));
    for (const file of commandFiles) {
        const command = require(`../commands/slash/${file}`);
        console.log(`Loading ${file}`)
        if (process.env ?.devbot) {
            await client.guilds.cache.get("860163849479389184") ?.commands.create({
                name: command.name,
                description: command.description,
                options: command.options || []
            })
        } else {
            await client.application ?.commands.create({
                name: command.name,
                description: command.description,
                options: command.options || []
            });
        }
    }
	createinteractionevent(client)
}


async function createinteractionevent(client:Client) {
	client.on('interactionCreate', async (interaction:any) => {
		if (interaction.isCommand()) {
			interaction.author = interaction.user
			const cmd = await searchcommand(interaction)
			if (cmd) {
				await cmd.interaction(interaction, client)
			}
		} else if (interaction.isButton()) {
			const btn = await searchbutton(interaction)
			if (btn) {
				await btn.interaction(interaction)
			}
		}
	});
}

function searchcommand(interaction:CommandInteraction) {
	const commandFiles = fs.readdirSync('../commands/slash').filter((file:any) => file.endsWith('.ts'));

	for (const file of commandFiles) {
		const command = require(`../commands/slash/${file}`);
		if (command.name === interaction.commandName) {
			return command
		}
	}
	return false
}


function searchbutton(interaction:ButtonInteraction) {
	const commandFiles = fs.readdirSync('../commands/slash').filter((file:any) => file.endsWith('.ts'));

	for (const file of commandFiles) {
		const command = require(`../commands/slash/${file}`);
		if (!command.buttons) return null
		for (const btn of command.buttons) {
			if (btn.name === interaction.customId) {
				return btn
			}
		}

	}
	return false
}