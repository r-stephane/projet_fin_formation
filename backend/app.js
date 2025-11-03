require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRouter = require('./routers/userRouter');

const app = express();
const PORT = process.env.PORT || 8000;

// Connexion MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/hotel';
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log(" Connecté à la base de données"))
  .catch((err) => {
    console.error(" Erreur de connexion à la base de données:", err);
    process.exit(1);
  });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger des requêtes
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// Routes
app.use('/', userRouter);

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(` Serveur démarré sur le port ${PORT}`);
});

module.exports = app;