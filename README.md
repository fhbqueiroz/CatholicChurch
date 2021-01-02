# CatholicChurch

Simple CRUD using: body-parser, cls-hooked, cors, dotenv, express, express-rate-limit, express-slow-down, faker-br, helmet, mysql2, nodemon, sequelize.

```
npm install --save
```

## ORM Sequelize with MySQL

```
npm install --save sequelize
npm install --save-dev sequelize-cli
```

## Migration

```
npx sequelize-cli init
npx sequelize-cli model:generate --name Saints --attributes name:string,date:DATEONLY,resume:string,active:boolean
npx sequelize-cli db:migrate
```

## Seeds ***automatically insert values*** 

```
npx sequelize-cli seed:generate --name demo-saints
npx sequelize-cli db:seed:all
```
