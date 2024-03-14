import fs from 'fs';
import {Product} from '../server.js'


const resetDB = async () => {
    try{
        await Product.deleteMany({})
        const ProductsFromJSON = JSON.parse(fs.readFileSync('products.json', 'utf8'))
        const productsInDB = await Product.insertMany(ProductsFromJSON)
        console.log(productsInDB)

    } catch(e){
        console.log(e)
    }
}

resetDB()