document.addEventListener("DOMContentLoaded", () => {
  const pintForm = document.getElementById("pintForm");
  const ambInputs = document.getElementById("ambInputs");
  const output = document.getElementById("output");
  const clearBtn = document.getElementById("clearBtn");

  // Obtener historial almacenado en localStorage
  const historial = JSON.parse(localStorage.getItem("historial")) || [];

  pintForm.addEventListener("submit", function (e) {
    e.preventDefault();
    output.innerHTML = "";

    const numambs = parseInt(document.getElementById("numambs").value);
    let totallitros = {};

    for (let i = 1; i <= numambs; i++) {
      const ambDiv = document.createElement("div");
      ambDiv.classList.add("mt-3");
      ambDiv.innerHTML = `
        <h4>Ambiente ${i}</h4>
        <div class="form-group">
          <label for="ambName${i}">Nombre del Ambiente:</label>
          <input type="text" class="form-control" id="ambName${i}" required>
        </div>
        <div class="form-group">
          <label for="ambColor${i}">Color:</label>
          <input type="text" class="form-control" id="ambColor${i}" required>
        </div>
        <div class="form-group">
          <label for="ambArea${i}">Metros Cuadrados:</label>
          <input type="number" class="form-control" id="ambArea${i}" required>
        </div>
        <div class="form-group">
          <label for="ambmanos${i}">Cantidad de Manos:</label>
          <input type="number" class="form-control" id="ambmanos${i}" required>
        </div>
      `;

      ambInputs.appendChild(ambDiv);
    }

    const calcBtn = document.createElement("button");
    calcBtn.type = "button";
    calcBtn.classList.add("btn", "btn-primary");
    calcBtn.textContent = "Calcular Resultado";
    ambInputs.appendChild(calcBtn);

    calcBtn.addEventListener("click", function () {
      for (let i = 1; i <= numambs; i++) {
        const ambArea = parseFloat(document.getElementById(`ambArea${i}`).value);
        const ambmanos = parseFloat(document.getElementById(`ambmanos${i}`).value);
        const ambColor = document.getElementById(`ambColor${i}`).value;

        const litros = ambArea * ambmanos * 0.11;
        if (totallitros[ambColor]) {
          totallitros[ambColor] += litros;
        } else {
          totallitros[ambColor] = litros;
        }
      }

      output.innerHTML = "<h2>Resultados:</h2>";
      for (const color in totallitros) {
        output.innerHTML += `<p>Color: ${color}, Litros de Pintura: ${totallitros[color].toFixed(2)}</p>`;
      }
    

      // Almacenar el resultado en el historial
      const historialItem = {
        date: new Date().toLocaleString(),
        results: totallitros
      };

      historial.unshift(historialItem); // Agregar al inicio del historial
      if (historial.length > 10) {
        historial.pop(); // Mantener solo los últimos 10 resultados
      }

      localStorage.setItem("historial", JSON.stringify(historial));
    });
  });

  clearBtn.addEventListener("click", function () {
    ambInputs.innerHTML = "";
    output.innerHTML = "";
    pintForm.reset();
  });
});


// Realizar una solicitud fetch para obtener datos de colores del Json
fetch('./Json/colores.json')
  .then(response => response.json())
  .then(info => {
    // Llamada a la función para mostrar los colores en el DOM del index como ofertas del mes
    MostrarColors(info);
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Función para mostrar los colores en el DOM
function MostrarColors(colors) {
  const colorsList = document.getElementById('colorsList');
  colors.forEach(color => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <h4>${color.color}</h4>
      <p>Código de color: ${color.codigo_color}</p>
      <p>Precio por Litro: ${color.precio}</p>
      <hr/>
    `;
    colorsList.appendChild(listItem);
  });
}

