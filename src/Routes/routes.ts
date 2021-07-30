import { Router } from "express";
import { FarmController } from '../Controllers/FarmController';

class Routes {
    router: Router;
    constructor() {
        this.router = Router();
        this.createRoutes();
    }

    createRoutes() {
        this.router.get("/", FarmController.getFarms);
    }
}

const routes = new Routes();
export default routes;