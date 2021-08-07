import { Client, Message, Guild } from "discord.js";
require("dotenv").config("../../../");
const fs = require("fs");

async function addpublic(client: Client,msg:Message) {
  await console.log("Loading Slash Commands");
  const commandFiles = fs
    .readdirSync("./src/slash/")
    .filter((file: any) => file.endsWith(".ts"));
  
    const sendmsg = await msg.channel.send("Loading...")
    let commands = []
    for (const file of commandFiles) {
    const command = require(`../../slash/${file}`);
    await console.log(`Slash Loading: ${file}`);
      
    commands.push({
      name: command.name,
      description: command.description,
      options: command.options || [],
    });
    sendmsg.edit(`${sendmsg.content}\n${commands.map(cmd => cmd.name).join("\n")} Loaded`)
  }

  await client.application?.commands.set(commands)

  await msg.channel.send("Loaded All Slash Command to Public")
  await console.log("Loaded All Slash Commands - Public");
}

async function addhere(client: Client,msg:Message) {
  await console.log("Loading Slash Commands");
  const commandFiles = fs
    .readdirSync("./src/slash/")
    .filter((file: any) => file.endsWith(".ts"));
  const sendmsg = await msg.channel.send("Loading...")
  let commands = []
  for (const file of commandFiles) {
    const command = require(`../../slash/${file}`);
    await console.log(`Slash Loading: ${file}`);
  
    commands.push({
      name: command.name,
      description: command.description,
      options: command.options || [],
    });
    sendmsg.edit(`${sendmsg.content}\n${commands.map(cmd => cmd.name).join("\n")} \n Loaded`)
  }

  await client.guilds.cache.get((msg.guild as Guild)?.id)?.commands.set(commands);
  
  await msg.channel.send("Loaded All Slash Command to this server")
  await console.log("Loaded All Slash Commands");
}

export { addpublic,addhere }