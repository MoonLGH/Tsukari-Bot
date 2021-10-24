
import mongoose from "mongoose"

async function connect(Url:string){

    const db = await mongoose.connect(Url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })



}

export = { connect }