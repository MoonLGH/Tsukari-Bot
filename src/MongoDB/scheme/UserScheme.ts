import mongoose from "mongoose"

interface UserSchema extends mongoose.Document {
    id: string,
    username:string,
    accessToken:string,
    tokenType:string
}
// accessToken is came from dashboard api login and only be used for authenticating to discord api for the dashboard api login.
// accessToken is not used for anything else.
// accessToken is cleared every 5 hours and everytime you log out of the dashboard.
export = mongoose.model<UserSchema>("User", new mongoose.Schema({
    id: {
        type: String
    }, //ID of the guild
    username: {
        type: String
    },
    accessToken: {
        type: String,
    },
    tokenType:{
        type:String
    },
    sessionID:{
        type:String
    },
    created:{
        type:Date,
        default:Date.now
    }
}));