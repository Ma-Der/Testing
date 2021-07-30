import { Request, Response } from 'express';
import { FarmHandler } from '../Handlers/FarmHandler';

export class FarmController {
    public static async getFarms(req: Request, res: Response){
        try {
            const farms = await FarmHandler.getFarms();
            const workers = await FarmHandler.getWorkers();
            const avgTemp = await FarmHandler.getAvgWorkerTemperature();
            const worker = workers.flat();
            return res.render('index', {
            test: {
                farms: farms, 
                workers: worker, 
                avgTemp: avgTemp
            }
                });
        }
        catch(err) {
            return res.status(400).json(err.message);
        }

    }
}