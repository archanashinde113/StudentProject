const express = require("express");
const cors = require("cors");
const app = express();
var cron = require('node-cron');
const shell = require('shelljs');
var corsOptions = {
  origin: "http://localhost:8081"
};


// cron.schedule('*/10 * * * * *', () => {
//   console.log('running a task every second');
//   if(shell.exec("dir").code !==0){
//     console.log("something went wrong");

    
//   }
// });

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to StudentDB application." });
});
// set port, listen for requests
require("./app/routes/Student.routes")(app);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const db = require("./app/models");

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });



  