

export class ViewHandler {
    public static displayFarmersList(farms: any) {
        if(!farms) throw new Error('No farms in db.');
        let farmList: string[]= [];
        for(let i = 0; i < farms.length; i++) {
             farmList.push(farms[i].name);
        }
        return farmList;
    }

    public static displayWorkersList() {

    }

    public static displayAvgTempList() {

    }
}