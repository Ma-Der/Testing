import { Request, Response } from 'express';
import { FarmHandler } from '../Handlers/FarmHandler';
import { ViewHandler } from '../Handlers/ViewHandler';

export class FarmController {
    public static async getFarms(req: Request, res: Response){
        try {
            const farms = await FarmHandler.getFarms();
            const workers = await FarmHandler.getWorkers();
            const avgTemp = await FarmHandler.getAvgWorkerTemperature();
            const farmsListDisplay = ViewHandler.displayFarmersList(farms.flat());
            console.log(farmsListDisplay)

            return res.render('index', {farms: farmsListDisplay});
        }
        catch(err) {
            return res.status(400).json(err.message);
        }

    }
}