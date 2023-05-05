import "reflect-metadata";
import { DataSource } from "typeorm";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { TaskResolver } from "./resolvers";
import { buildSchema } from "type-graphql";
import entities from "./entities";

require("dotenv").config();

async function main() {
    const source = new DataSource({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        synchronize: true,
        logging: true,
        entities,
    });
    await source.initialize().then(()=> {
        console.log("Database has connected!")
    });
    const schema = await buildSchema({
        resolvers: [TaskResolver],
        validate: {forbidUnknownValues: false}
    });
    const server = new ApolloServer({ schema });
    const { url } = await startStandaloneServer(server, { listen: { port: 8000 } });
    console.log("Server has started!");
}

main();