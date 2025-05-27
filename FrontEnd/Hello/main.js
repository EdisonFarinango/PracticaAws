let pingButton = document.querySelector('#pingButton');
pingButton.addEventListener('click', getPingFromWebService);

function getPingFromWebService() {
  const url = 'http://18.188.8.202:3000/ping';
  fetch(url)
    .then((response) => response.json()) // Convertimos la respuesta en JSON
    .then((data) => {
      // Mostramos el mensaje en el div con id 'message'
      const messageDiv = document.querySelector('#message');
      messageDiv.textContent = data.message || 'Sin mensaje recibido';
    })
    .catch((error) => {
      console.error('Error al obtener el ping:', error);
      const messageDiv = document.querySelector('#message');
      messageDiv.textContent = 'Error al conectar con el servidor';
    });
}
