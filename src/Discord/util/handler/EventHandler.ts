import fs from "fs";
import {Client} from "discord.js";
export async function setup(client: Client) {
  const eventFiles = fs
      .readdirSync("./src/Discord/events")
      .filter((file) => file.endsWith(".ts"));

  for (const file of eventFiles) {
    const event = await import(`../../events/${file}`);
    if (event.once) {
      // eslint-disable-next-line
			client.once(event.name, (...args: any) => event.execute(...args, client));
    } else {
      // eslint-disable-next-line
			client.on(event.name, (...args: any) => event.execute(...args, client));
    }
  }
}
