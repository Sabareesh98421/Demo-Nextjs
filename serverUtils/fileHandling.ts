import fs from "fs/promises";
import path from "path";

export class FilesHandling{
    private readonly  dataFilePath:string
    constructor(fileName:string) {
        this.dataFilePath=path.join(process.cwd(), "data", fileName);
    }
    async  ensureDataFile<T>(InitialData?:T) {
        try {
            await fs.access(this.dataFilePath);
        } catch {
            // File doesn't exist, create it
            const dirPath = path.dirname(this.dataFilePath);
            await fs.mkdir(dirPath, { recursive: true });
            await fs.writeFile(this.dataFilePath, JSON.stringify(InitialData, null, 2));
        }
    }
    async  writeDataJson<T>(data:T){

        await fs.writeFile(this.dataFilePath, JSON.stringify(data, null, 2))
    }
    async readDataJson<T>():Promise<T>{

        const fileData = await fs.readFile(this.dataFilePath, "utf-8")

        return JSON.parse(fileData)
    }
    
}







 