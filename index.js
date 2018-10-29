// Instanciamos un nuevo objeto.
const xhttp = new XMLHttpRequest();

// Creamos una funcion que es la que va a ejecutar el pedido
const pedirData = idPeople => {
  // Definimos la url a la cual le vamos a pedir la data
  const url = `https://swapi.co/api/people/${idPeople}/`;

  // Le asignamos al metodo onreadystatechange una funcion la cual va a traer la informacion
  xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      // Respuesta que nos da el servidor
      console.log(xhttp.responseText);
      mostrarData(xhttp.responseText);
    }
  };

  // Iniciamos la peticion de datos.
  xhttp.open("GET", url, true);
  xhttp.send();
};

window.onload = function() {
  let aceptar = document.getElementById("planeta");

  aceptar.addEventListener("keypress", function(e) {
    var key = e.which || e.keyCode;
    if (key === 13) {
      let contenido = aceptar.value;
      return pedirData(contenido);
    }
  });
};

function mostrarData(contenido) {
  let info = document.getElementById("info");
  let testing = JSON.parse(contenido);
  info.innerHTML = "<a>" + "Name:&nbsp;" + testing.name + "<br/>" + "</a>";
  var uri = testing.homeworld;
  var res = encodeURI(uri);
  fetch(res)
    .then(function(response) {
      return response.text();
    })
    .then(function(myJson) {
      var json = JSON.parse(myJson);
      info.innerHTML += "<a>" + "Homeworld:&nbsp;" + json.name + "</a>";
    });
  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  };
  info.innerHTML +=
    "<a>" +
    "Eye Color:&nbsp;" +
    testing.eye_color.capitalize() +
    "<br/>" + "</a>";
}
