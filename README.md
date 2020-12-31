
# Deno REST - Un Boilerplate para RESTful APIs en Deno

<img  src="https://res.cloudinary.com/practicaldev/image/fetch/s--0kRPEzqJ--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/lzyaemujz884m4tggslk.png"  alt="logo" />


Este es un proyecto Boilerplate para crear Deno RESTful API usando oak y deno_mongo, basado estrictamente en este https://github.com/vicky-gonsalves/deno_rest pero con algunas adecuaciones, dependencias actualizadas, cleanclode aplicado y entre otras mejoras adheridas comentadas abajo basada y mantenida con la experiencia de los colaboradores del Staff de @ionic-dominicana.


### Características

✔️ Estructura del proyecto basada en Model, Controller, Service y Helpers.

✔️ Cliente MongoDB.

✔️ Autenticación JWT

✔️ Autorización de Usuario

✔️ CORS

✔️ Administración de environment usando .env

✔️ Configuración Prettier por defecto incluída

✔️ Configuración Firebase por defecto incluída

✔️ Configuración Docker por defecto incluída

✔️ Configuración ESLint por defecto incluída

✔️ Organización de imports/exports basado en etiquetas

✔️ Principio DRY aplicado

✔️ Validación de Requests

✔️ Control de errores

✔️ Database seeding

✔️ Roles y Permisos de Usuario

✔️ Password Encryption usando AES

✔️ Integración con Denon



### Bibliotecas usadas



-  [x]  [Oak](https://deno.land/x/oak) - Un framework middleware para Servicios net en Deno's

-  [x]  [deno_mongo](https://deno.land/x/mongo) - Controlador MongoDB para Deno

-  [x]  [cors](https://deno.land/x/cors) - Deno.js CORS middleware

-  [x]  [djwt](https://deno.land/x/djwt) - Para crear  JSON Web Tokens en Deno. Basado en especificaciones JWT y JWS.

-  [x]  [yup](https://github.com/jquense/yup) - Constructor de Scheme para value parsing y validaciones.

-  [x]  [god_crypto](https://deno.land/x/god_crypto) - Cifra las contraseñas en AES para guardarlas en la colección de la base de datos.



## Getting Started

### Instalar / Actualizar

**Usando Deno:**

```

deno upgrade --version 1.6.1

```




**Con Shell:**

```

curl -fsSL https://deno.land/x/install/install.sh | sh -s v1.6.1

```




**With PowerShell:**

```

$v="1.6.1"; iwr https://deno.land/x/install/install.ps1 -useb | iex

```




Clona reste repositorio para tú máquina local

```

git clone https://github.com/ionic-dominicana/deno-dominicana.git

```



**Estructura del proyecto**

```

.

├── .env/

│ ├── .env.example

│ ├── .env.development // git ignored

│ ├── .env.production // git ignored

│ └── .env.test // git ignored

├── config/

│ ├── config.ts

│ └── roles.ts

├── controllers/

│ ├── auth.controller.ts

│ └── user.controller.ts

├── data/

│ └── users.json

├── db/

│ └── db.ts

├── helpers/

│ ├── hash.helper.ts

│ └── jwt.helper.ts

├── middlewares/

│ ├── auth.middleware.ts

│ ├── errorHandler.middleware.ts

│ ├── logger.middleware.ts

│ └── validate.middleware.ts

├── models/

│ ├── token.model.ts

│ └── user.model.ts

├── routers/

│ ├── auth.router.ts

│ ├── default.router.ts

│ ├── index.ts

│ └── user.router.ts

├── services/

│ ├── auth.service.ts

│ ├── token.service.ts

│ └── user.service.ts

├── types/

│ └── types.interface.ts

├── validations/

│ ├── auth.validation.ts

│ └── user.validation.ts

├── .gitignore

├── app.ts

├── denon.json

├── deps.ts

├── lock.json

├── LICENSE

├── lock_update.sh

├── README.md

├── reload_deps.sh

├── seed.ts

└── tsconfig.json

```



## Setup

### Configura environments

Revisar el archivo `.env/.env.example` y cree el archivo requerido  `.env` file basada en tus necesidades.

Por ejemplo: Para el entorno de desarrollo, cree un archivo `.env.development` bajo el directorio `.env`

Para el entorno de prueba, cree un archivo `.env.test` bajo el directorio `.env` y agrega las variables necesarias.



### Instalar denon

Si es su primera ejecución, por favor instalar `denon` desde [https://deno.land/x/denon](https://deno.land/x/denon)



### Instalar dependencias

Para instalar dependencias, ejecute el siguiente comando en su terminal:

**Nota: La ruta de la terminal debe ser la ruta raíz del directorio del proyecto**

```

deno cache --reload --unstable --lock-write --lock=lock.json ./deps.ts

```

**Ó:**

Ejecutar el archivo `reload_deps.sh` desde el directorio del proyecto.



Esto descargará automáticamente todas las dependencias y actualizará el archivo `lock.json`



### SEED Database

Si necesita inicializar (ejecutar migraciones) la base de datos inicialmente,

Simplemente habilitar `SEED=true` en su archivo `.env`

Puede agregar o editar cualquier archivo semilla en el directorio `data` . Se proporciona un ejemplo básico de archivo del seed en `data/users.json`



### Controlar manualmente el archivo seed individual

La lógica para controlar el seed se encuentra en `seed.ts` donde puede agregar varios archivos semilla de la siguiente manera:

```

const seedCollections: Array<Record<string, boolean>> = [

{ users: true }, // collection_name: boolean

{ posts: true },

{ comments: false},

...

...

```

**Nota:** el nombre del archivo debe estar en el patrón `collection_name.json`



### EECUTAR

En la raíz de su proyecto, abra la terminal y ejecute el siguiente comando para ejecutar el proyecto:

```

denon start

```



## Roles y Permisos de Usuario

Los roles de usuario se guardan en el archivo `config/roles.ts` como:
```

export const roles = ["user", "admin"];

```

y Permisos son guardados como:

```

roleRights.set(roles[0], [
	"getMe"
]);

roleRights.set(roles[1], [
    "getMe",
    "getUsers",
    "manageUsers"
]);

```

Puede agregar/editar roles y derechos según sus necesidades.



## Rutas API

Todas las rutas se almacenan en el directorio `routers`

Below is the example of `/api/users` route.

A continuación se muestra el ejemplo de la ruta `/api/users`.

Esta ruta está protegida por JWT.

En *user.router.ts*:

```

...

/** JWT protected route */

router.post("/api/users", // route
    auth("manageUsers"), // Auth Guard based on djwt
    validate(createUserValidation), // Yup based validation
    UserController.create, // Controller Function
);

...

...

```

Rutas protegidas Non-JWT:

```

router.post(

"/api/auth/login",

validate(loginValidation), // Yup based validation

AuthController.login,

);

```



## Modelos

Todos los modelos están bajo el directorio `models`

Ejemplo de Modelo User:

```

import db from "../db/db.ts";

export interface UserSchema {
    _id?: string;

    name: string;

    email: string;

    password: string;

    role: string;

    isDisabled: boolean;

    createdAt?: Date;

    updatedAt?: Date;
}



export const User = db.getDatabase.collection<UserSchema>("users");

```

## Controladores

Controladores son guardados bajo el directorio `controllers`

Ejemplo del Controlador User:


```

...

class UserController {

/**

    * Create User function * @param request

    * @param response

    * @returns Promise<void>
*/
public static async create({ request, response }: RouterContext): Promise<void> {
    const body = request.body();
    let { name, email, password, role, isDisabled } = await body.value;
    log.debug("Creating user");
    response.body = await UserService.createUser({ name, email, password,   role: role || roles[0], isDisabled: typeof isDisabled === "boolean" ? isDisabled : false});
}

...

...

```



## Servicios


Todos los servicios bajo el directorio `services`

Ejemplo del Servicio User:

```

class UserService {

/**
    * Create user Service * @param options
    * @returns Promise<ObjectId | Error> Returns Mongo Id of user document
*/
public static async createUser(options: CreateUserStructure): Promise<ObjectId | Error> {

const { name, email, password, role, isDisabled } = options;

const hashedPassword = await HashHelper.encrypt(password);

const createdAt = new Date();

const user: ObjectId = await User.insertOne({ name, email, password: hashedPassword, role, isDisabled, createdAt });

if (!user) {
    log.error("Could not create user");
    return throwError({
        status: Status.BadRequest,
        name: "BadRequest",
        path: "user",
        param: "user",
        message: `Could not create user`,
        type: "BadRequest"
    });
}

return user;

}

...

...



```



## Actualizando `lock.json`

En la terminal de su proyecto, ejecute el siguiente comando para actualizar el archivo `lock.json` con las últimas dependencias:

```

deno cache --lock=lock.json --lock-write --unstable ./deps.ts

```

**Ó:**

Simplemente ejecutar el archivo `lock_update.sh`



## Known Issues

- N/A



## Contribution

¡Todos los aportes son bienvenidos, comenzando por los Pull Requests! 🥰

## LICENCIA

MIT