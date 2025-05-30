# 📚 Herramientas

## API de Gestión de Libros

Esta **API RESTful** permite gestionar una colección de libros con operaciones CRUD: obtener, crear, actualizar, eliminar y filtrar libros.

---

### 🚦 Endpoints

#### 1. `GET /libros`

- Devuelve todos los libros disponibles en formato **JSON**.
- Permite filtrar por autor usando el parámetro `autor` en la URL.

<details>
<summary>Ejemplo de respuesta</summary>

```json
[
    {
        "id": 1,
        "titulo": "Cien Años de Soledad",
        "autor": "Gabriel García Márquez"
    },
    {
        "id": 2,
        "titulo": "Don Quijote de la Mancha",
        "autor": "Miguel de Cervantes"
    }
]
```
</details>

---

#### 2. `GET /libros/:id`

- Devuelve un libro específico identificado por su **ID**.
- Si el libro no existe, responde con error **404**.

**Ejemplo de solicitud:**  
Obtener el libro con `id=2`

<details>
<summary>Respuesta (200 OK)</summary>

```json
{
    "id": 2,
    "titulo": "Don Quijote de la Mancha",
    "autor": "Miguel de Cervantes"
}
```
</details>

<details>
<summary>Respuesta (404 Not Found)</summary>

```json
{
    "mensaje": "Libro no encontrado"
}
```
</details>

---

#### 3. `POST /libros`

- Crea un nuevo libro.
- Requiere los campos `titulo` y `autor` en el cuerpo de la solicitud.
- Si falta algún campo, responde con error **400**.

**Ejemplo de solicitud:**

```json
{
    "titulo": "El Principito",
    "autor": "Antoine de Saint-Exupéry"
}
```

<details>
<summary>Respuesta (201 Created)</summary>

```json
{
    "id": 4,
    "titulo": "El Principito",
    "autor": "Antoine de Saint-Exupéry"
}
```
</details>

<details>
<summary>Respuesta (400 Bad Request)</summary>

```json
{
    "mensaje": "Faltan datos: título y autor son requeridos"
}
```
</details>

---

#### 4. `PUT /libros/:id`

- Actualiza un libro existente por su **ID**.
- Requiere `titulo` y `autor` en el cuerpo de la solicitud.
- Si el libro no existe, responde con error **404**.

**Ejemplo de solicitud:**  
Actualizar libro con `id=3`

```json
{
    "titulo": "La Sombra del Viento - Edición Actualizada",
    "autor": "Carlos Ruiz Zafón"
}
```

<details>
<summary>Respuesta (200 OK)</summary>

```json
{
    "id": 3,
    "titulo": "La Sombra del Viento - Edición Actualizada",
    "autor": "Carlos Ruiz Zafón"
}
```
</details>

<details>
<summary>Respuesta (404 Not Found)</summary>

```json
{
    "mensaje": "Libro no encontrado"
}
```
</details>

---

#### 5. `DELETE /libros/:id`

- Elimina un libro por su **ID**.
- Si el libro no existe, responde con error **404**.

**Ejemplo de solicitud:**  
Eliminar libro con `id=2`

<details>
<summary>Respuesta (200 OK)</summary>

```json
{
    "mensaje": "Libro eliminado",
    "libro": {
        "id": 2,
        "titulo": "Don Quijote de la Mancha",
        "autor": "Miguel de Cervantes"
    }
}
```
</details>

<details>
<summary>Respuesta (404 Not Found)</summary>

```json
{
    "mensaje": "Libro no encontrado"
}
```
</details>

---

#### 6. `GET /libros?autor=<nombre>`

- Filtra los libros por nombre de autor (consulta insensible a mayúsculas).
- Devuelve los libros cuyo autor contenga el texto especificado.

---

> ℹ️ **Nota:** Todos los endpoints devuelven respuestas en formato JSON.



## Comandos Docker

# Actualiza la lista de paquetes disponibles en Ubuntu
sudo apt update

# Instala paquetes necesarios para usar repositorios HTTPS y otras utilidades
sudo apt install apt-transport-https ca-certificates curl software-properties-common

# Descarga y añade la clave GPG oficial de Docker para verificar paquetes
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

# Añade el repositorio oficial de Docker para Ubuntu Focal (20.04)
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"

# Verifica la política de instalación para el paquete docker-ce (Docker Community Edition)
apt-cache policy docker-ce

# Instala Docker Community Edition
sudo apt install docker-ce

# Verifica el estado del servicio Docker para asegurarse que está activo y corriendo
sudo systemctl status docker

## Crear el archivo Dockerfile para la imagen Docker

# Usa la imagen oficial de Node.js basada en Alpine Linux, versión 20.10.0
FROM node:20.10.0-alpine3.18

# Define el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instala las dependencias Node.js
RUN npm i

# Copia el archivo principal de la app al contenedor
COPY index.js ./

# Expone el puerto 3000 para que sea accesible fuera del contenedor
EXPOSE 3000

# Comando para iniciar la aplicación Node.js dentro del contenedor
CMD ["node", "index.js"]

## Finalmente, para construir y correr el contenedor Docker

# Construye la imagen Docker y la etiqueta como "node-hello"
docker build -t node-hello .

# Ejecuta el contenedor en segundo plano, mapea el puerto 3000, lo nombra "hello" y reinicia automáticamente en caso de fallo
sudo docker run -d -p 3000:3000 --name hello --restart on-failure node-hello:latest
