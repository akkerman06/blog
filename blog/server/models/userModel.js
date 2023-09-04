import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {type: String, default: ''},
    password: {type: String, default: ''},
    avatar: {
        type: String,
        default:
          "https://res.cloudinary.com/daggokgzh/image/upload/v1636607285/artist_hxqtia.png",
    },
    saved: [
        {
          type: mongoose.Types.ObjectId,
          ref: "user",
        },
    ],
})

export default mongoose.model('User',userSchema)