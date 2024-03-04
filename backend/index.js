const express = require("express");
const cors = require("cors");
const installRoutes = require("./app/routes/routes");

const app = express();

var corsOptions = { origin: "http://localhost:5173" };

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync()
  .then(() => {
    console.log("Conexão com a base de dados foi estabelecida!");
  })
  .catch((err) => {
    console.log("Falha ao se conectar com a base de dados: " + err.message);
  });

installRoutes(app)
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


