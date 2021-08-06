import axios from 'axios';
import { accessToken } from '../Config/envVariables';

export class FarmHandler {
    private static baseUrl = 'https://api2.hiveos.farm/api/v2';
    
    public static async getFarms() {

        return axios(`${this.baseUrl}/farms`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
        .then(response => {
            return response.data.data;
        })
        .catch(err => {
            throw new Error(err.message);
        });
    }

    public static async getWorkers() {
        const farms = await this.getFarms();

        const workers = farms.map((farm) => {
             return axios(`${this.baseUrl}/farms/${farm.id}/workers`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            .then(response => { 
                return response.data.data;
             })
             .catch(err => { throw new Error(err.message) })
        })

        return Promise.all(workers)
            .then(response => response)
            .catch(err => err.message)
    } 

    public static async getAvgWorkerTemperature() {
        const farmsWorkers = await this.getWorkers();
        
        const workers = farmsWorkers.flat();

        const avgTemp = workers.map(worker => { 
            if(worker.miners_stats) {
                return { avg: worker.miners_stats.hashrates.map(stat => {
                    return this.average(stat.temps);
                }), farmId: worker.farm_id }
            } else { 
                return {avg: 'no stats', farmId: worker.farm_id}
            }
            
        })
        return avgTemp;
    }

    private static average(temperatureArr: number[]): number {
        return temperatureArr.reduce((acc: number, temperature: number, index: number, arr: Array<number>) => {
            return acc + temperature/arr.length
        }, 0);
    }
}
