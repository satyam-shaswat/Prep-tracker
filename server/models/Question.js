const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  title: String,
  difficulty: String,
  topic: String,
  status: String,
  strategy: String, 
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Question", questionSchema);