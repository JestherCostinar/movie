document.getElementById('movieForm').addEventListener('submit', async function (event) {
  event.preventDefault();

  const formData = new FormData(this);
  const postData = {};
  formData.forEach((value, key) => postData[key] = value);

  try {
    const response = await fetch('http://localhost:3000/api/movies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();
    alert(responseData.message);
    this.reset();
    closeModal(); // Call your close modal function here
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
});

function closeModal() {
  // Use data-dismiss="modal" to close the modal
  document.getElementById('movieModal').click();
}

function movie() {
  window.location.href = "https://play.google.com/store/movies/details/Elemental?id=dT6MlLDIUC0.P";
}


let products = null;
// get datas from file json
fetch('http://localhost:3000/api/tools')
  .then(response => response.json())
  .then(data => {
    products = data;
    showDetail();
  })

let listProduct = document.querySelector('.listProduct');
let productId = new URLSearchParams(window.location.search).get('id');

(products.filter(value => value.id != productId)).forEach(product => {
  let newProduct = document.createElement('a');
  newProduct.href = '/detail.html?id=' + product.id;
  newProduct.classList.add('item');
  newProduct.innerHTML =
    `<img src="images/${product.image}" alt="">
            <h2>${product.name}</h2>
            <div class="price">$${product.price}</div>`;
  listProduct.appendChild(newProduct);
});