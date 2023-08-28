document.addEventListener("DOMContentLoaded", () => {
  const historialList = document.getElementById("historialList");
  const clearHistoryBtn = document.getElementById("clearHistoryBtn");

  // Obtener historial almacenado en localStorage
  const historial = JSON.parse(localStorage.getItem("historial")) || [];

  for (const historialItem of historial) {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <p><strong>Fecha y Hora:</strong> ${historialItem.date}</p>
      <ul>
        ${Object.keys(historialItem.results).map(color => `<li><strong>Color:</strong> ${color}, <strong>Litros de Pintura:</strong> ${historialItem.results[color].toFixed(2)}</li>`).join("")}
      </ul>
    `;
    historialList.appendChild(listItem);
  }

  clearHistoryBtn.addEventListener("click", function () {
    localStorage.removeItem("historial");
    historialList.innerHTML = "";
  });
});
