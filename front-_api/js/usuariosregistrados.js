document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = "http://localhost:8080/apimovies/usuarios";
    const table = document.querySelector("table");
  
    // Fetch users and display them in the table
    function fetchAndDisplayUsers() {
      fetch(apiUrl)
        .then((response) => response.json())
        .then((users) => {
          users.forEach((user) => {
            const row = document.createElement("tr");
  
            const nameCell = document.createElement("td");
            nameCell.textContent = user.nombre;
            row.appendChild(nameCell);
  
            const surnameCell = document.createElement("td");
            surnameCell.textContent = user.apellido;
            row.appendChild(surnameCell);
  
            const emailCell = document.createElement("td");
            emailCell.textContent = user.email;
            row.appendChild(emailCell);
  
            const deleteCell = document.createElement("td");
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Eliminar";
            deleteButton.className="enviar";
            deleteButton.addEventListener("click", function () {
                deleteUser(user.id_usuario, row); // Call deleteUser function with user ID and row
            });
            deleteCell.appendChild(deleteButton);
            row.appendChild(deleteCell);

            table.appendChild(row);
          });
        })
        .catch((error) => console.error("Error fetching users:", error));
    }
  
    // Fetch users when the page loads
    fetchAndDisplayUsers();
  
    // Handle form submission
    const form = document.getElementById("usuariosregistrados");
    form.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const formData = {
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        email: document.getElementById("email").value,
        clave: document.getElementById("contrasena").value,
      };
  
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      let isValid = true;
  
      if (!formData.nombre) {
        document.getElementById("errornombre").textContent = "Nombre es requerido";
        isValid = false;
      } else {
        document.getElementById("errornombre").textContent = "";
      }
  
      if (!formData.apellido) {
        document.getElementById("errorapellido").textContent = "Apellido es requerido";
        isValid = false;
      } else {
        document.getElementById("errorapellido").textContent = "";
      }
  
      if (!formData.email) {
        document.getElementById("erroremail").textContent = "E-mail es requerido";
        isValid = false;
      } else if (!emailRegex.test(formData.email)) {
        document.getElementById("erroremail").textContent = "El campo requiere un mail valido";
        isValid = false;
      } else {
        document.getElementById("erroremail").textContent = "";
      }
  
      if (!formData.clave) {
        document.getElementById("errorcontrasena").textContent = "Contraseña es requerida";
        isValid = false;
      } else if (formData.clave.length < 4 || formData.clave.length > 16) {
        document.getElementById("errorcontrasena").textContent = "El campo debe contener entre 4 y 16 caracteres";
        isValid = false;
      } else {
        document.getElementById("errorcontrasena").textContent = "";
      }
  
      if (isValid) {
        fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Error adding user");
            }
          })
          .then((id) => {
            console.log("User added with ID:", id);
            // Clear form
            form.reset();
            // Clear the table except the header row
            table.querySelectorAll("tr:not(:first-child)").forEach((row) => row.remove());
            // Fetch and display users again to include the new user
            fetchAndDisplayUsers();
          })
          .catch((error) => console.error("Error adding user:", error));
      }
    });


    function deleteUser(id, row) {
        fetch(`${apiUrl}/${id}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (response.ok) {
                    // Remove the row from the table
                    row.remove();
                    console.log("User deleted with ID:", id);
                } else {
                    throw new Error("Error deleting user");
                }
            })
            .catch((error) => console.error("Error deleting user:", error));
    }


});


  