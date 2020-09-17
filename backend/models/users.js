const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tweets: [{
        type: Schema.Types.ObjectId,
        ref: "Tweets"
    }]
})

module.exports = mongoose.model("Users", UserSchema);