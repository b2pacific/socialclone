const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FriendSchema = new Schema({
    userid: {
        type: Schema.Types.ObjectId,
        required: true
    },
    friends: [{
        type: Schema.Types.ObjectId
    }]
})

module.exports = mongoose.model("Friends", FriendSchema);