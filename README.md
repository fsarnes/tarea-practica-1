# Taller de Desarrollo Avanzado de Aplicaciones Web

**Alumno:** Felipe Sánchez Arnés  
**Carrera:** Ingeniería Civil en Informática

## Ambiente de Desarrollo

| Nombre | Versión | Documentación |
| ------ | ------- | ------------- |
| Node.js | 18.15.0 | [Node.js Docs](https://nodejs.org/en/docs) |
| Material UI | 5.12.0 | [Material UI Docs](https://mui.com/material-ui/getting-started/overview/) |
| Material Icons | 5.11.16 | [Material Icons Docs](https://mui.com/material-ui/material-icons/) |
| Axios | 1.3.5 | [Axios Docs](https://axios-http.com/docs/intro) |
| Dog-names | 2.1.0 | [Dog-names Docs](https://github.com/sindresorhus/dog-names) |
| React | 18.2.0 | [React Docs](https://react.dev/learn) |
| React DOM | 18.2.0 | [React DOM Docs](https://react.dev/reference/react-dom) |
| React Query | 3.39.3 | [React Query Docs](https://tanstack.com/query/v4/docs/react/overview) |

## Tarea Práctica N° 1

_**Código fuente:** [Ver último commit](https://github.com/fsarnes/tinder-perros/tree/2c5106ed5373d18f6ca1496c3102f5676800c1ff)_  
_**Sitio Web:** [Ver DEMO](https://tinder-perros-tarea1.netlify.app/)_

![image](https://user-images.githubusercontent.com/59930505/234180842-2db5b3ea-5a76-4e13-a095-466be81f7a11.png)

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

## Tarea Práctica N° 2

_**Código fuente:** [Ver último commit](https://github.com/fsarnes/tinder-perros/tree/3399a01ae53d679d457fcdb5ee5149d3395ec8bc)_  
_**Sitio Web:** [Ver DEMO](https://tinder-perros-tarea2.netlify.app/)_

![image](https://user-images.githubusercontent.com/59930505/234513714-f0b399dd-1eac-4d97-9e9c-575214e082c4.png)

### 💬 Enunciado

Usted ya presentó la maqueta del Tinder para perros. El cliente, medianamente conforme, solicitó algunas mejoras que deberán implementarse para la próxima reunión que tendrán.

- **Reordenar columnas.** Para una funcionalidad más próxima, el cliente solicita que el orden de las columnas cambie. Esto quedaría así: de izquierda a derecha, primero debería estar el perro candidato; en la columna central, los perros aceptados y, en la columna de la derecha, los perros rechazados.
- **Implementación de React Query.** El cliente leyó en internet que podría servirle a su Tinder para hacer la carga de información de sus canes. La utilidad que debe aplicar con esta libreria es poder utilizar las funciones "isLoading", "refetch", "isRefetching" y demás para activar o desactivar mensajes de carga, entre otras funciones que le parecieron interesantes.
- **Implementación de loaders.** El cliente solicita que no se muestre un mensaje de que la información se está cargando, sino que use un loader. Material UI cuenta con 2 tipos de loader: Linear Progress y Circular Progress. Esto se debe mostrar al momento en que la información se esté cargando y ocultarse cuando esté listo.
- **Incluir una breve descripción del perro candidato.** Esta parte, al igual que el nombramiento del perro, puede ser un texto aleatorio. Se puede utilizar un relleno Lorem Ipsum para cada uno. No necesariamente debe ser un texto con lógica.
- **Descripcion oculta en las columnas de aceptados o rechazados.** La descripción del perro deberá permanecer oculta hasta que se presione un botón. Al realizar dicha acción, se debe desplegar la información oculta.
- **Botones y tooltips.** Los botones deberán ser iconButtons, es decir, deberán ser sólo un icono sin texto visible. Para saber de qué trata cada botón, deberá implementar un tooltip que se debe desplegar cuando se pase el puntero sobre el botón.
- **Adaptabilidad.** Se debe tener un control del movimiento de las columnas en cada caso, contemplando la idea de que se puedan ver en distintos dispositivos con diversas resoluciones. Las columnas siempre serán 3. Cuando la pantalla se achique, la aplicación debe ajustar el tamaño de las columnas hasta el punto en que si la pantalla es muy pequeña, se debe ordenar las columnas de tal forma que el perro candidato se muestre en una fila, y las columnas de "aceptado" y "rechazado" se vean juntas en la fila inferior.
- **Columnas scrollables.** Las columnas de aceptados o rechazados se deben poder scrollear de forma independiente. Esto para no perder el focus del postulante en caso de que se quiera bajar a ver un perro aceptado o rechazado.
- **Ordenamiento.** Los perros se deben ordenar de tal forma que el primero en la lista sea el último que se añadió a ella.

**El sistema además deberá cumplir con todos los puntos de la Tarea Práctica N° 1.**