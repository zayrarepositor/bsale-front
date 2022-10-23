// Api server url
const url = 'https://bsale-server.up.railway.app/products';

// Capture DOM elements and store them in variables. Variables: form(form tag), search bar input(input tag), validation message(small tag) and alert container (div tag)
const form = document.querySelector('#form');
const searchInput = document.querySelector('#search-input-b');
const validationMsg = document.querySelector('#search-msg');
const alertDiv = document.querySelector('#alert-div');

// DOMContentLoaded event, which is fired as soon as the page DOM has been loaded, without waiting for resources to finish loading, is the moment to execute getProducts function and get all products and then, render them with fillProductsInCards function
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Axios GET request to the apirest
    const products = await getProducts();
    // Render product cards in the window
    await fillProductsInCards(products);
  } catch (error) {
    console.log('Error', error);
  }
});

// Request to the apirest to get all products from db
const getProducts = async () => {
  try {
    // Axios GET request to the apirest
    const { data } = await axios.get(url);
    return data.data;
  } catch (error) {
    console.log('Error', error);
  }
};

// Display products received from api rest request
const fillProductsInCards = async (products) => {
  // Clean previous product card divs
  $('.product-card').remove();

  // Select product-container div
  const contenedor = document.querySelector('#product-container');

  // Iterate products array and create product-card div for each product
  products.forEach(({ name, url_image, price, discount }) => {
    // Create a div
    const cardDiv = document.createElement('div');

    // Div classes
    const cardDivClasses = [
      'col-lg-3',
      'col-md-4',
      'col-sm-6',
      'mb-4',
      'product-card',
    ];

    // Add classes to card div
    cardDiv.classList.add(...cardDivClasses);

    // Insert HTML content inside of product card div: discount div, image and product details div
    cardDiv.innerHTML = `<div class="card h-100">
                            <!-- Discount badge-->
                            ${
                              discount > 0
                                ? `<h5><span class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem"> ${discount}%</span></h5>
                                <h5> <span class="badge bg-primary text-white position-absolute" style="top: 0.5rem; left: 0.5rem"> oferta</span></h5>
                            <!-- Product image-->`
                                : ''
                            }
                            <img class="card-img-top" src="${
                              url_image == '' || url_image == null
                                ? `https://www.cuestalibros.com/content/images/thumbs/default-image_550.png`
                                : url_image
                            }" alt="..." />
                            <!-- Product details-->
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <!-- Product name-->
                                    <h5 class="fw-bolder">${name}</h5>
                                    <!-- Product price-->
                                    ${
                                      discount > 0
                                        ? ` <span class="text-muted text-decoration-line-through">$${
                                            ((100 - discount) * price) / 100
                                          }</span>
                                          <span class="ex-price">$${price}</span>`
                                        : `<span class="text-muted text-decoration-line-through">$${price}</span>`
                                    }
                                </div>
                            </div>`;
    // Insert each product-card div into product-container div
    contenedor.appendChild(cardDiv);
  });
};

/* Search Bar Functions */

// Add submit functionality to search bar (form tag)
form.addEventListener('submit', async (e) => {
  // Prevent to send input value automatically
  e.preventDefault();
  // Validation function
  validateInput();
  // Evaluate if validationMsg is empty
  if (validationMsg.textContent === '') {
    // Request to the apirest to get products from db filtered by query name (using validated value from search-input input)
    await searchProducts();
    // Clean form input
    form.reset();
  }
  // If validationMsg is not empty, return
  return;
});

// Validate input field value
const validateInput = () => {
  // Regular expression to validate that input value has not numbers or special symbols
  var regExp = /^[a-zA-Z ]*$/;

  // Sanitizing input
  const inputValue = searchInput.value.trim();

  // Evaluate if input value is a empty string
  if (!inputValue) {
    // Prevent request with a empty string
    // Set validation message
    setValidationMsg('Ingresar texto para la búsqueda');
    return;
  }

  // Evaluate if input value length is upper than 20
  if (inputValue.length > 20) {
    // Length input value restriction for security
    // Setvalidation message
    setValidationMsg('El texto debe tener menos de 20 caracteres');
    return;
  }

  // Evaluate if input value has only letters and spaces
  if (!inputValue.match(regExp)) {
    // Restricting input value exclusively to letters (an spaces) avoids SQL injection
    // Set validation message
    setValidationMsg('El texto debe incluir solamente letras');
    return;
  }

  // If input value passes validation successfully, cleanValidationMsg function will be executed
  cleanValidationMsg();
};

// Set validation message and input appearance if input value is not a valid value
const setValidationMsg = (text) => {
  // Add input red border
  searchInput.classList.add('border-danger');
  // Set validation message (small tag) as parameter text passed
  validationMsg.innerHTML = text;
};

// Clean validation message when inputh value is right
const cleanValidationMsg = () => {
  // Remove input red border
  searchInput.classList.remove('border-danger');
  // Set validation message (small tag) as a empty string to allow a possible request
  validationMsg.innerHTML = '';
};

// Request to the apirest to get products from db filtered by query name (using validated value from search-input input)
const searchProducts = async () => {
  // Sanitizing input
  const inputValue = searchInput.value.trim();

  try {
    // Axios GET request to the apirest
    const { data } = await axios.get(`${url}?name=${inputValue}`);
    // Render product cards in the window
    await fillProductsInCards(data.data);
  } catch (error) {
    // Evaluate if error.response.data is 'products not found'. It could be an apirest respond (404 error) when search value doesn't match with any product name
    if (error.response.data === 'products not found') {
      // Create an alert div
      const alert = document.createElement('div');

      // Add alert classes to alert div
      alert.classList.add('alert', 'alert-danger', 'alert-dismissible', 'mt-3');

      // Insert HTML content inside alert div
      alert.innerHTML = `<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><small>No se encontraron productos</small>`;

      // Functionality to alert "close button"
      $('.close').click(function () {
        alert.alert('close');
      });

      // Insert alert into alert div
      alertDiv.appendChild(alert);
    }
  }
};

/* NavBar Functions */

// Render all products from db after user request. It is used by nav link onclick in the navbar menu
const getAllProducts = async () => {
  try {
    // Axios GET request to the apirest
    const data = await getProducts();
    // Render product cards in the window
    await fillProductsInCards(data);
  } catch (error) {
    console.log('Error', error);
  }
};

// Apirest request for products filtered by category
const getProductsByCategory = async (category) => {
  try {
    // Axios GET request to the apirest
    const { data } = await axios.get(`${url}?category=${category}`);
    // Render product cards in the window
    await fillProductsInCards(data.data);
  } catch (error) {
    console.log('Error', error);
  }
};
