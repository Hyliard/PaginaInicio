Hyliard - Plataforma de Inicio de Sesión y Registro
¡Bienvenido a Hyliard! Este proyecto es una plataforma de inicio de sesión y registro desarrollada con Node.js, Express, MongoDB Atlas y JWT para la autenticación. El objetivo es proporcionar una base sólida para aplicaciones que requieran autenticación de usuarios.

Tabla de Contenidos

Características
Requisitos
Instalación
Configuración
Ejecución
Estructura del Proyecto
Contribución
Licencia
Características

Registro de Usuarios: Los usuarios pueden registrarse proporcionando su nombre, correo electrónico y contraseña.
Inicio de Sesión: Los usuarios pueden iniciar sesión con su correo electrónico y contraseña.
Autenticación con JWT: Uso de JSON Web Tokens (JWT) para manejar la autenticación de usuarios.
Dashboard: Los usuarios autenticados pueden acceder a un dashboard personalizado.
Protección de Rutas: Las rutas protegidas solo son accesibles para usuarios autenticados.
Requisitos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

Node.js (v18 o superior)
MongoDB Atlas (para la base de datos en la nube)
Git (opcional, para el control de versiones)
Instalación

Sigue estos pasos para configurar el proyecto en tu máquina local:

Clona el repositorio:
bash

git clone https://github.com/tu-usuario/Paginainicio.git
cd hyliard
Instala las dependencias:
bash

npm install
Configuración

Configura MongoDB Atlas:
Crea un clúster en MongoDB Atlas.
Obtén la cadena de conexión (MONGO_URI).
Configura las Variables de Entorno:
Crea un archivo .env en la raíz del proyecto.
Agrega las siguientes variables:
env

MONGO_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/hyliard?retryWrites=true&w=majority&appName=ClusterHyliard
JWT_SECRET=tu_clave_secreta
Ejecución

Para ejecutar el servidor en modo de desarrollo:

bash

node server.js
El servidor estará disponible en: http://localhost:3000.

Estructura del Proyecto


/hyliard
│
├── public/                  # Archivos estáticos (HTML, CSS, JS)
│   ├── index.html           # Página de inicio de sesión
│   ├── register.html        # Página de registro
│   ├── dashboard.html       # Dashboard de usuario
│   ├── styles.css           # Estilos CSS
│   └── scripts.js           # Lógica del cliente
│
├── models/                  # Modelos de MongoDB
│   └── User.js              # Modelo de usuario
│
├── server.js                # Servidor principal
├── package.json             # Dependencias y scripts
├── .env                     # Variables de entorno
└── README.md                # Este archivo
Contribución

¡Las contribuciones son bienvenidas! Si deseas mejorar este proyecto, sigue estos pasos:

Haz un fork del repositorio.
Crea una rama para tu feature o corrección:
bash

git checkout -b nombre-de-tu-rama
Realiza tus cambios y haz commit:
bash

git commit -m "Descripción de tus cambios"
Envía tus cambios:
bash

git push origin nombre-de-tu-rama
Abre un Pull Request en GitHub.
Licencia

Este proyecto está bajo la licencia MIT. Para más detalles, consulta el archivo LICENSE.

Contacto

Si tienes alguna pregunta o sugerencia, no dudes en contactarme:

Nombre: Luis Martínez
Correo: luisgerardomartinezh@gmail.com
GitHub: Hyliard
¡Gracias por visitar Hyliard! Esperamos que este proyecto te sea útil. 😊

Notas Adicionales

Este proyecto es una base para aplicaciones que requieren autenticación. Puedes expandirlo agregando más funcionalidades, como roles de usuario, recuperación de contraseña, etc.
Asegúrate de mantener tus claves y contraseñas seguras. Nunca subas archivos .env a GitHub.
¡Esperamos que disfrutes usando Hyliard! 🚀
