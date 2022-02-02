// import modules
import Djs from "./Discord/index";
import env from "dotenv";

// dotenv configuration
env.config();

Djs.client.start(process.env.Token!);
