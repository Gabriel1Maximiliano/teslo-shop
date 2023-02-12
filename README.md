# teslo Shop app

Para correr localmente, se nocesita la base de datos

```
docker-compose up -d

```
* El -d Significa __detached__

* Mongo URL Local:
```
mongodb://localhost:27017/tesloDb

```

## Configuar las variables de entorno

Renombra el archivo __.env.template__ a __.env__

## Llenar la base de datos con la información de prueba

llamar: 
```
http://localhost:3000/api/seed

```