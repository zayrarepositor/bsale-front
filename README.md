### Prueba Técnica

<h1 align="center">Tienda BSale</h1>

# Requerimientos: 

➔ Construir una tienda online.

➔ Utilizar la base de datos (mysql) dada.

➔ Desplegar productos agrupados por la categoría a la que pertenecen.

➔ Generar por separado backend (API REST) y frontend (aplicación que la
consuma).

➔ Agregar un buscador, el cual tiene que estar implementado a nivel de servidor, mediante una Api Rest cuyo lenguaje y framework puede ser de libre elección. Es decir, los datos de productos deben llegar filtrados al cliente.

➔ Disponibilizar la aplicación en un hosting.

# Desarrollo:

➔ La aplicación del servidor se desarrolló con NodeJs y Express. Se documentó con Swagger. Se deployó en Railway.

➔ La aplicación del cliente se desarrolló con VanillaJs, Jquery y Boopstrap4. Se deployó en Netlity.

<h2 align="center">Api Rest (Backend)</h2>

# Petición HTTP - Endpoints:

  * GET /
  
  Ruta Pagina principal de entrada y Page Not Found 404: 
  
  URL: 
  
      https://bsale-server.up.railway.app/
      
  Estructura JSON:
      
      {
      "msg":"404 Page",
      "project":"Bsale - Test",
      "author":"Zayra Velasco",
      "description":"rest api (incomplete) for bsale store with node, express & mysql",
      "version":"1.0.0",
      "doc":"https://bsale-server.up.railway.app/api-docs/"
      }
  
  * GET /products 
  
  Obtiene todos los productos de la base de datos: 
  
  URL: 
  
      https://bsale-server.up.railway.app/products 
      
  Estructura JSON:
      
      {
      "message":"all products ",
      "data":
        [
          {
            "id":5,
            "category":1,
            "name":"ENERGETICA MR BIG",
            "url_image":"https://dojiw2m9tvv09.cloudfront.net/11132/product/misterbig3308256.jpg",
            "price":1490,
            "discount":20
          }
        ]
      }
  
  Acepta las siguientes queries (opcionales):
  
  Category: 
  
  Debe ser el id de la categoria (número entero)
      
  * GET  /products?category=2 
      
  Name: 
  
  Texto que forme parte del nombre de uno o varios productos (texto)
      
  * GET  /products?name=carmen
      
  Page: 
  
  Número de página de la respuesta (número entero). Por defecto 1.
      
  * GET  /products?page=1
      
  Size: 
  
  Filas o entradas por pagina (número entero). Por defecto 100.
      
  * GET  /products?size=5
      
  Order: 
  
  Dirección del ordenamiento de las entradas. Puede ser asc or desc (No es sensible a mayúsculas o minúsculas). Usa el id del producto como criterio de ordenamiento. Por defecto es ASC (ascendente).
      
  * GET  /products?order=desc
      
  Ejemplo de una URL para obtener la primera pagina con 5 filas (productos) de todos los productos que contengan "carmen" en su nombre y pertenezcan a la categoria 2, ordenados por su id en forma descendente:
  
      https://bsale-server.up.railway.app/products?name=carmen&category=2&page=1&size=5&order=desc    
  
  * GET /api-docs
  
  Documentación con Swagger.
  
  URL:
  
      https://bsale-server.up.railway.app/api-docs
      
## Snips

<p align="center">GET endpoint sin queries</p>

![get](https://user-images.githubusercontent.com/95602965/195794597-cc259d6d-5976-4dde-9023-30ccb5b355a9.png)

<p align="center">GET endpoint con queries</p>

![getqueries](https://user-images.githubusercontent.com/95602965/195794602-8304811f-1838-4db2-9332-9bab145fad1b.png)

<p align="center">Respuesta cuando se ingresa una texto en la query category que acepta números enteros</p>

![validations](https://user-images.githubusercontent.com/95602965/195794606-fd7cee76-8f3d-40e3-9831-dbb7aaf608b9.png)

<p align="center">Respuesta cuando no hay registros en la pagina solicitada</p>

![validations2](https://user-images.githubusercontent.com/95602965/195794612-794c2e5b-958f-4735-9ccd-f049dea7c616.png)

<p align="center">Respuesta cuando no se encuentra categoría con el id ingresado</p>

![validations3](https://user-images.githubusercontent.com/95602965/195794615-0352ea7e-3055-4087-9750-3bee85234990.png)

<p align="center">Documentation Swagger</p>

![doc1](https://user-images.githubusercontent.com/95602965/195952800-1db94f89-17ee-4b68-b5b6-60d731578e63.png)
![doc2](https://user-images.githubusercontent.com/95602965/195952802-5eae980a-e017-4566-85c4-40f012f56d21.png)


# Deploy:

  Railway. URL:
  
      https://bsale-server.up.railway.app/products

<h2 align="center">Cliente (Frontend)</h2>

# Estructura de la página:

  * Header:
    - Banner top: BS store - bebidas y snacks
    - Contenedor:
      - Bsale logo.
      - Search Bar: Permite obtener producto(s) filtrando por coincidencia con el nombre del producto.
      - Icono carrito de compra.
    - Menú de categorías: Permite obtener producto(s) filtrando por id de categoría.

  * Sección de Productos:
    - Card del Producto: Contiene un badge con el descuento y un badge "oferta" si hay descuento en el producto, la imagen del producto si hay o una imgen predefinida, el nombre del producto, el precio final y el precio sin el descuento, si hay descuento.

  * Footer
    - Datos de Bsale
    - Datos de Zayra
    - Banner bottom

# Funcionalidad:

  Al montarse la página se hace una petición GET al endpoint /products del servidor, se obtienen y se renderizan todos los productos que hay en la base de datos agrupados por categorías y ordenados según el id de las categorías en dirección ascendente.

  Al hacer clic en el botón BUSCAR de la barra de búsqueda se hace una validación del valor ingresado en el input. La validación incluye:

    - Que el valor del input no sea un string vacío.
    - Que la extensión de valor del input no sea mayor a 20 caracteres.
    - Que el valor ingresado en el input sólo contenga letras y espacios.

  Una vez que la validación se supera de manera exitosa, se hace una petición GET al endpoint /products?name={valor del input} del servidor y se obtiene y se renderizan el/los productos que contienen en su nombre el valor del input. No se realiza una búsqueda exacta ni sensible a minúsculas y mayusculas. Si no se obtienen productos coincidentes con la solicitud, se recibe una error 404 y se renderiza una alerta informado al usuario que no se encontraron coincidencias.
  
  Si no se supera la validación, se renderiza un texto (rojo) informando al usuario y el borde del input se pinta de rojo. Este comportamiento es dinámico. En cuanto se supera la validación, se revierte.

  En el menu de categorías se despliegan los nombres de las categorías que están envueltos en enlaces. Al hacer clic sobre cada categoría, se hace una petición GET al endpoint /products?category={id de la categoría} del servidor, se obtienen y se renderizan todos los productos que pertenezcan a la categoría con el id ingresado.

# Deploy:

  Netlify. URL:
  
      https://storebsale.netlify.app/

## Snips

<p align="center"></p>

![1](https://user-images.githubusercontent.com/95602965/197380381-7ea52b0a-831a-4715-982c-7c2667d2f70b.png)

<h2 align="center">---------------- ENGLISH ----------------</h2>

# Frontend

💻 It is a apiweb for bsale challenge. It is part of a full stack challenge.

* Structure: HTML and javascript
* Style: Bootstrap
* Functionality: show products filtered (by category or name) or not (default) 

## Deployment 

* Front (Netlify): <a href="https://storebsale.netlify.app/">BS store</a>
* Back (Railway): <a href="https://bsale-server.up.railway.app/products">Apirest</a>
* Documentation: <a href="https://bsale-server.up.railway.app/api-docs">Apirest doc</a>

## Contact info

* Zayra Velasco ☞ <a href="https://www.linkedin.com/in/zayra-velasco">linkedIn</a> / <a href="mailto:zayra.contacto@gmail.com">email</a>

Good Life! ( ͡~ ͜ʖ ͡°)
