import mongoose from "mongoose";
import guildscheme from "./scheme/GuildScheme";
import dotenv from "dotenv";
dotenv.config();

async function connect() {
  mongoose.connect(process.env.MongoDB_URL!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log("Connected to MongoDB");
  }).catch((err) => {
    console.log("Unable to connect to MongoDB Database.\nError: " + err);
  });
  await console.log("==========");
}


async function fetchGuild(id:string) {
  let guildDB = await guildscheme.findOne({id});

  if (!guildDB) {
    guildDB = new guildscheme({
      id,
      registeredAt: Date.now(),
    });
    await guildDB.save().catch((err) => console.log(err));
  }

  return guildDB;
}

export = {connect, fetchGuild}
