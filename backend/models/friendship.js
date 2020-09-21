const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FriendSchema = new Schema({
    userid: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    friends: [{
        type: Schema.Types.ObjectId,
        ref: "Users"
    }]
})

module.exports = mongoose.model("Friends", FriendSchema);