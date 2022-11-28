export default class System {

    static delay(ms: number) : Promise<number>
    {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}