# Taller de Desarrollo Avanzado de Aplicaciones Web
## Tarea Práctica N° 1

**Alumno:** Felipe Sánchez Arnés</br>
**Carrera:** Ingeniería Civil en Informática

### 💬 Enunciado
A usted como futuro ingeniero de la Universidad del Bío-Bío se le ha encomendado la siguiente misión:

Una persona amante de los animales quiere contratarlo para desarrollar un **"Tinder para perros online"**. La idea de esta persona es que, al abrir la página se cargue una foto de un perro, el cual podrá ser **aceptado o rechazado**. Los perros aceptados se copiarán en una lista a la derecha y los rechazados en una lista a la izquierda. Una vez aceptado o rechazado, la página cargará la foto de un nuevo perro.

Para fines prácticos, a usted se le ha encargado la misión de crear una pequeña maqueta (mientras mas completa mejor) donde podrá demostrar la idea y complementar con el cliente.

Como **funcionalidad minima** se pedirá:

- Crear una funcion que consuma la API https://dog.ceo/dog-api/ con fotos de perros aleatorios.
- Crear una funcion que genere de forma automática un string de 6 caracteres que sirva para nombrar al perro candidato (da igual si son sólo letras al azar, el perro debe tener un nombre).
- Dividir la pantalla en 3 partes, donde se tendrán las columnas para la lista de perros rechazados, el candidato y la lista con los perros aceptados.
- Crear 2 botones: uno para aceptar y otro para rechazar al perro candidato.
- Mostrar la foto de los perros en ambas listas y en el cuadro principal (la API entrega la URL).
- Usar un hook para deshabilitar temporalmente los botones de aceptar/rechazar mientras se carga una nueva imagen.
- Usar un hook para mostrar un mensaje de "*Cargando...*" mientras se solicita un nuevo perro.
- Crear un botón para arrepentirse, que permita por cada perro aceptado o rechazado moverlo a la lista contraria y quitarlo de la original.

**Personalizar la parte visual sumará puntos en base a la complejidad del desarrollo (máximo +1 punto).**