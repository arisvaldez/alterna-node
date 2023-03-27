import "reflect-metadata";
import { DataSource } from "typeorm";
import { Personaje } from "./src/models/personaje.entity";

export const AppDataSource = new DataSource({
    type: "mssql",
    host: "localhost",
    port: 1433,
    username: "sa",
    password: "Sa123456",
    database: "backendalterna",
    entities: [ Personaje],
    synchronize: true,
    logging: false,
    options: { encrypt: false },
});

AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
    })
    .catch((error) => console.log(error))