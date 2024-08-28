// Selección de elementos del DOM
const inputText = document.querySelector(".encriptador__input");
const outputSection = document.querySelector(".encriptador__output-section");
const encryptButton = document.querySelector(".encriptador__button--primary");
const decryptButton = document.querySelector(".encriptador__button--secondary");
const copyButton = document.querySelector(".encriptador__button--copy");

// Inicializa la sección de salida sin el botón de copiar
outputSection.innerHTML = `
    <div class="encriptador__output-content">
        <img src="./img/muñeco.svg" alt="Ningún mensaje encontrado" class="encriptador__output-image">
        <h2 class="encriptador__output-title">Ningún mensaje fue encontrado</h2>
        <p class="encriptador__output-description">Ingresa el texto que desees encriptar o desencriptar.</p>
    </div>
`;

// Función para encriptar el texto
function encrypt(text) {
  return text
    .replace(/e/g, "enter")
    .replace(/i/g, "imes")
    .replace(/a/g, "ai")
    .replace(/o/g, "ober")
    .replace(/u/g, "ufat");
}

// Función para desencriptar el texto
function decrypt(text) {
  return text
    .replace(/enter/g, "e")
    .replace(/imes/g, "i")
    .replace(/ai/g, "a")
    .replace(/ober/g, "o")
    .replace(/ufat/g, "u");
}

// Función para actualizar la sección de salida
function updateOutputSection(text) {
  if (text) {
    // Inserta el texto encriptado/desencriptado y el botón de copiar si hay texto
    outputSection.innerHTML = `
            <div class="encriptador__output-content">
                <p class="encriptador__output-text">${text}</p>
            </div>
            <button class="encriptador__button encriptador__button--copy">Copiar</button>
        `;
    document
      .querySelector(".encriptador__button--copy")
      .addEventListener("click", copyToClipboard);
  } else {
    // Restablece la sección a su estado inicial si no hay texto
    outputSection.innerHTML = `
            <div class="encriptador__output-content">
                <img src="./img/muñeco.svg" alt="Ningún mensaje encontrado" class="encriptador__output-image">
                <h2 class="encriptador__output-title">Ningún mensaje fue encontrado</h2>
                <p class="encriptador__output-description">Ingresa el texto que desees encriptar o desencriptar.</p>
            </div>
        `;
  }
}

// Función para copiar el texto al portapapeles
function copyToClipboard() {
  const outputText = document.querySelector(".encriptador__output-text");
  navigator.clipboard
    .writeText(outputText.textContent)
    .then(() => alert("Texto copiado al portapapeles"))
    .catch((err) => console.error("Error al copiar el texto: ", err));
}

// Función para validar el texto de entrada
function validateInput(text) {
  return /^[a-z\s]*$/.test(text);
}

// Event listeners para los botones
encryptButton.addEventListener("click", () => {
  const text = inputText.value.trim();
  if (validateInput(text)) {
    updateOutputSection(encrypt(text));
  } else {
    alert("Por favor, ingrese solo letras minúsculas sin acentos.");
  }
});

decryptButton.addEventListener("click", () => {
  const text = inputText.value.trim();
  if (validateInput(text)) {
    updateOutputSection(decrypt(text));
  } else {
    alert("Por favor, ingrese solo letras minúsculas sin acentos.");
  }
});

// Event listener para limpiar el área de salida cuando se modifica el input
inputText.addEventListener("input", () => {
  outputSection.innerHTML = `
        <div class="encriptador__output-content">
            <img src="./img/muñeco.svg" alt="Ningún mensaje encontrado" class="encriptador__output-image">
            <h2 class="encriptador__output-title">Ningún mensaje fue encontrado</h2>
            <p class="encriptador__output-description">Ingresa el texto que desees encriptar o desencriptar.</p>
        </div>
    `;
});
