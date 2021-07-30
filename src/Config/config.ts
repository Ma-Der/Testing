import express, { Express } from 'express';
import routes from '../Routes/routes';
import path from 'path';
import { port } from './envVariables';

export const initializeServer = (): Express => {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    app.set("view engine", "ejs");
    app.set("views", path.resolve() + '/src/Views');

    app.use(express.static(path.resolve() + '/src/Public'));
    app.use("/", routes.router);

    startServer(app);
    return app;
}

const startServer = (server: Express) => {
    server.listen(port, () => {
        console.log(`Server lift off on port ${port}`);
    })
}