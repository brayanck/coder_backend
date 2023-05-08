const fs = require("fs");

 class ProductManager {
    constructor(path) {
        
        this.path = path;
    }
    writeFile = async(data)=>{
        try{
        await fs.promises.writeFile(this.path,JSON.stringify(data,null,2),"utf-8")
        }catch(err){
            console.log(err)
        } 
        
    }
    getArrays= async()=> {
        try {
            let readProduct = await fs.promises.readFile(this.path, "utf-8");
            return JSON.parse(readProduct);

        } catch(err) {
            console.log(err)
        }

    }
    
}
module.exports = ProductManager;
