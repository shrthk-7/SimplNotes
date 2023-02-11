const mongoose = require("mongoose");
const app = require("./app");

mongoose.set("strictQuery", true);
mongoose
  .connect("mongodb://127.0.0.1:27017/notes")
  .then(() => console.log("Connection Estd"))
  .catch(() => console.log("Connecting Failed"));

const PORT = 5000;
app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log(`Listening on ${PORT}`);
});
