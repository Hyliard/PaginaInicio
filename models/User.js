const mongoose = require("mongoose");
require("dotenv").config(); // Cargar variables de entorno

// Cadena de conexión de MongoDB Atlas (desde .env)
const mongoURI = process.env.MONGO_URI;

// Conectar a MongoDB Atlas usando la URI desde el archivo .env
mongoose.connect(mongoURI)
  .then(() => console.log("Conectado a MongoDB Atlas"))
  .catch((err) => console.error("Error conectando a MongoDB Atlas:", err));

// Definir el esquema del usuario
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Crear el modelo de usuario
const User = mongoose.model("User", userSchema);

// Exportar el modelo de usuario
module.exports = User;
