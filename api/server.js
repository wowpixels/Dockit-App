// require services
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// connect to mongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/mern-dockit", {
    useNewUrlparser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to My MongoDB"))
  .catch(console.error);

// required from Dockit.js
const Dockit = require("./models/Dockit");

// get dockit itmes
app.get("/dockits", async (req, res) => {
  const dockits = await Dockit.find();

  res.json(dockits);
});

// create a new dockit item and save it
app.post("/dockit/new", (req, res) => {
  const dockit = new Dockit({
    text: req.body.text,
  });

  dockit.save();

  res.json(dockit);
});

// delete a dockit item
app.delete("/dockit/delete/:id", async (req, res) => {
  const result = await Dockit.findByIdAndDelete(req.params.id);

  res.json(result);
});

// complete a dockit item
app.get("/dockit/complete/:id", async (req, res) => {
  const dockit = await Dockit.findById(req.params.id);

  dockit.complete = !dockit.complete;

  dockit.save();

  res.json(dockit);
});

// listen to server on port 3001
app.listen(3001, () => console.log("Server started on port 3001"));
