const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // Asegúrate de tener bcryptjs instalado
const jwt = require("jsonwebtoken");
require("dotenv").config(); // Cargar las variables de entorno desde .env

const app = express();
const port = 3000;

// Conectar a MongoDB Atlas usando la URI desde el archivo .env
const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI)
  .then(() => console.log("Conectado a MongoDB Atlas"))
  .catch((err) => console.error("Error conectando a MongoDB Atlas:", err));

// Middleware para parsear JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (HTML, CSS, JS)
app.use(express.static("public"));

// Definición del esquema de usuario
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Modelo de usuario
const User = mongoose.model("User", userSchema);

// Middleware para verificar el token JWT
function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "Acceso no autorizado" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token inválido" });
    req.user = user;
    next();
  });
}

// Ruta protegida del dashboard
app.get("/dashboard", authenticateToken, (req, res) => {
  res.sendFile(__dirname + "/public/dashboard.html");
});

// Ruta para manejar el registro de usuario
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "El usuario ya existe" });

    // Hashear la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario
    const newUser = new User({ name, email, password: hashedPassword });

    // Guardar el usuario en la base de datos
    await newUser.save();

    // Respuesta al cliente
    res.json({ message: "Registro exitoso", data: { name, email } });
  } catch (err) {
    console.error("Error guardando el usuario:", err);
    res.status(500).json({ message: "Error al registrar el usuario", error: err });
  }
});

// Ruta para manejar el login de usuario
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Usuario no encontrado" });

    // Comparar la contraseña proporcionada con la almacenada
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: "Contraseña incorrecta" });

    // Generar un token JWT
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Inicio de sesión exitoso", token });
  } catch (error) {
    console.error("Error iniciando sesión:", error);
    res.status(500).json({ message: "Error iniciando sesión" });
  }
});

// Ruta para obtener la información del usuario (requiere autenticación)
app.get("/user", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    res.json({ name: user.name, email: user.email });
  } catch (error) {
    console.error("Error obteniendo datos del usuario:", error);
    res.status(500).json({ message: "Error obteniendo datos del usuario" });
  }
});


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});


