const app = require("./app");

const { connectDB, disconnectDB } = require("./utils/mysql");
connectDB()
  .then(() => {
    console.log("Database connection successful");
  })
  .catch(() => {
    console.log("Database connection failed");
    process.exit(1);
  });

const PORT = 5000;
app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log(`Listening on ${PORT}`);
});

process.addListener("SIGINT", async () => {
  console.log("Exiting....");
  console.log("Disconnecting DB...");
  await disconnectDB();
  console.log("Exited successfully");
});
