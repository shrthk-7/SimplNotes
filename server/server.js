const app = require("./app");

const PORT = 5000;
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Listening on ${PORT}`);
});
