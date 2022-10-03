const socket = io.connect();
const formChat = document.getElementById('formChat')

function addMessage(e) {
  const mensaje = {
    author: document.getElementById("username").value,
    text: document.getElementById("texto").value,
    date: new Date().toLocaleString()
  };
  socket.emit("nuevoMensaje", mensaje);
  formChat.reset();
  return false;
}

function addProduct(e) {
  const producto = {
    title: document.getElementById("title").value,
    price: document.getElementById("price").value,
    thumbnail: document.getElementById("thumbnail").value
  };
  socket.emit("nuevoProducto", producto);
  return false;
}

function makeHTML(mensajes) {
    return mensajes.map((elem, index) => {
        return `<div class="d-inline-flex ">
              <strong class="text-primary">${elem.author}:</strong>
              <p class="text-muted mx-3">${elem.date}</p>
              <em class="text-success fw-2">${elem.text}</em> 
              </div>`;
      })
      .join(" ");
  }
  function makeHTMLProductos(arrayProductos) {
    if (arrayProductos.length > 0) {
      return arrayProductos.map((elem, index) => {
          return `<tr >
                    <td>${index+1}</td>
                    <td>${elem.title}</td>
                    <td>$ ${elem.price}</td>
                    <td><img class="images" src="${elem.thumbnail}" width="250px" height="200px"></td>
                  </tr>`
                ;
        })
       ;
      
    } else {
     return ` <div class="m-5">
                 <h3>No products added</h3>
              </div>`
    }
  }
  
  function render(data) {
    const html = makeHTML(data);
    document.getElementById("mensajes").innerHTML = html;
  }
  function renderProductos(data) {
    const htmlProductos = makeHTMLProductos(data)
    document.getElementById("trProductos").innerHTML = htmlProductos;
  }
  

//   Escucha los mensajes del servidor     //
  socket.on("mensajes", (mensajes) => {
    render(mensajes);
  });
  socket.on("productos", (arrayProductos) => {
    renderProductos(arrayProductos)
  });
  
  