// ====== LIB ======
const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
// ====== INNER IMPORTS ======

// ====== CONFIGURATION ======

const app = express();
const SERVER_PORT = config.get("server.port");
const DB_URL = `${config.get("db.host")}:${config.get("db.port")}/${config.get(
  "db.name"
)}`;

const startServer = async () => {
  try {
    await mongoose.connect(DB_URL);

    app.listen(SERVER_PORT, () => console.log("Server starting ..."));
  } catch (err) {
    console.log(err);
  }
};

startServer();

// ====== ROUTES ======
