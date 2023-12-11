const socketClient = io();
const form = document.getElementById("Form agregar producto");
const inputTitle = document.getElementById("title");
const inputDescription = document.getElementById("description");
const inputStatus = document.getElementById("status");
const inputPrice = document.getElementById("price");
const inputCode = document.getElementById("code");
const inputStock = document.getElementById("stock");
const inputCategory = document.getElementById("category");
const inputThumbnails = document.getElementById("thumbnails");
const formDelete = document.getElementById("Form delete product");
const inputIdDelete = document.getElementById("idDelete");
const inputTitleDelete = document.getElementById("titleDelete");



const listaDeProductosActualizados = (products) => {
  let divRealTimeProduct = document.getElementById("divRealTimeProduct");

  let html = "";

  products.forEach((product) => {
    html += `
             
              <h3>titulo: ${product.title}</h3>
              <p>descripcion: ${product.description}</p>
              <p>precio: ${product.price}</p>
              <p>codigo: ${product.code}</p>
              <p>categoria: ${product.category}</p>
              <p>stock: ${product.stock}</p>
              <p>thumbnails: ${product.thumbnails}</p>
              <p>id: ${product.id}</p>
              <br></br>
      
          `;
    divRealTimeProduct.innerHTML = html;
  });
};


socketClient.on("productsInitial", (products) => {
  listaDeProductosActualizados(products);
});

form.onsubmit = (e) => {
  e.preventDefault();

  const title = inputTitle.value;
  const description = inputDescription.value;
  const status = inputStatus.value;
  const price = inputPrice.value;
  const code = inputCode.value;
  const stock = inputStock.value;
  const thumbnails = inputThumbnails.value;

  socketClient.emit("addProduct", {
    title,
    description,
    status,
    price,
    code,
    stock,
    thumbnails,
  });

};

socketClient.on("productUpdate", (products) => {
  listaDeProductosActualizados(products);
});



formDelete.onsubmit = (e) => {
  e.preventDefault();

  const titleDelete = inputTitleDelete.value;
  const idDelete = inputIdDelete.value;

  socketClient.emit("deleteProduct", idDelete);

};

socketClient.on("productDelete", (products) => {
  listaDeProductosActualizados(products);
});



