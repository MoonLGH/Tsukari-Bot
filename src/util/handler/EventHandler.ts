import fs from "fs";
import { Client } from "discord.js";
export function setup(client: Client) {
	const eventFiles = fs
		.readdirSync("./src/Events")
		.filter((file) => file.endsWith(".ts"));

	for (const file of eventFiles) {
		const event = require(`../../Events/${file}`);
		if (event.once) {
			client.once(event.name, (...args: any) => event.execute(...args, client));
		} else {
			client.on(event.name, (...args: any) => event.execute(...args, client));
		}
	}
}
