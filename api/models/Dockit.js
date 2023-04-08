// require mongo schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create a new schema with text, complete and timestamp parameters
const DockitSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  complete: {
    type: Boolean,
    default: false,
  },
  timestamp: {
    type: String,
    default: Date.now(),
  },
});

// create the model
const Dockit = mongoose.model("Dockit", DockitSchema);

// export the module and reuse in server.js
module.exports = Dockit;
