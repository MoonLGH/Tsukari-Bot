import {Client, Message, Guild} from "discord.js";
import dotenv from "dotenv";
dotenv.config();
import fs from "fs";

async function addpublic(client: Client, msg:Message) {
  console.log("Loading Slash Commands");
  const commandFiles = fs
      .readdirSync("./src/Discord/SlashCommands/")
      .filter((file) => file.endsWith(".ts"));

  let sendmsg = await msg.channel.send("Loading...");
  const commands = [];
  for (const file of commandFiles) {
    const command = await import(`../../SlashCommands/${file}`);
    console.log(`Slash Loading: ${file}`);

    if (!command.name || !command.description) {
      sendmsg = await sendmsg.edit(`${sendmsg.content}\n${file} Failed to load`);
    } else {
      commands.push({
        name: command.name,
        description: command.description,
        options: command.options || [],
      });
      // sendmsg.edit(`${sendmsg.content}\n${commands.map(cmd => cmd.name).join("\n")} Loaded`)
      sendmsg = await sendmsg.edit(`${sendmsg.content}\n${command.name} Loaded`);
    }
  }

  await client.application?.commands.set(commands);

  await msg.channel.send("Loaded All Slash Command to Public");
  console.log("Loaded All Slash Commands - Public");
}

async function addhere(client: Client, msg:Message) {
  console.log("Loading Slash Commands");
  const commandFiles = fs
      .readdirSync("./src/Discord/SlashCommands/")
      .filter((file) => file.endsWith(".ts"));
  let sendmsg = await msg.channel.send("Loading...");
  const commands = [];
  for (const file of commandFiles) {
    const command = await import(`../../SlashCommands/${file}`);
    console.log(`Slash Loading: ${file}`);

    if (!command.name || !command.description) {
      sendmsg = await sendmsg.edit(`${sendmsg.content}\n${file} Failed to load`);
    } else {
      commands.push({
        name: command.name,
        description: command.description,
        options: command.options || [],
      });
      sendmsg = await sendmsg.edit(`${sendmsg.content}\n${command.name} Loaded`);
      // sendmsg.edit(`${sendmsg.content}\n${commands.map(cmd => cmd.name).join("\n")} Loaded`)
    }
  }

  await client.guilds.cache.get((msg.guild as Guild)?.id)?.commands.set(commands);

  await msg.channel.send("Loaded All Slash Command to this server");
  console.log("Loaded All Slash Commands");
}

export {addpublic, addhere};
