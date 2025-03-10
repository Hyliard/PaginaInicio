document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.querySelector(".register-form");

    registerForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita que el formulario se envíe automáticamente

        // Obtener los valores de los campos
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirm-password").value.trim();

        // Validaciones
        if (name === "" || email === "" || password === "" || confirmPassword === "") {
            alert("Por favor, completa todos los campos.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden. Inténtalo de nuevo.");
            return;
        }

        if (password.length < 6) {
            alert("La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        // Enviar datos al servidor
        fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        })
            .then((response) => response.json())
            .then((data) => {
                alert(data.message);
                registerForm.reset();
                // Redirigir al inicio de sesión
                window.location.href = "index.html";
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("Hubo un error al registrar. Inténtalo de nuevo.");
            });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector(".login-form");

    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        try {
            const response = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                // Guardar el token en localStorage
                localStorage.setItem("token", data.token);
                console.log("Token guardado:", data.token); // Depuración

                // Redirigir al dashboard
                window.location.href = "/dashboard";
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Error iniciando sesión:", error);
            alert("Error iniciando sesión");
        }
    });
});