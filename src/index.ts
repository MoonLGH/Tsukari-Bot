// import modules
import Djs from "./Discord/index"
import DB from "./MongoDB/db"
import Website from "./Website/app"
import env from "dotenv"

// dotenv configuration
env.config()

DB.connect(process.env.MongoDB_URL!)
Djs.login(process.env.Token!)
Website.start()