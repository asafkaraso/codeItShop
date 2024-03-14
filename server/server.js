import express from "express"
import mongoose from "mongoose"
import { dirname } from "path";
import { fileURLToPath } from "url";

import cors from "cors"
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { DB_CLUSTER, DB_NAME, DB_PASS, DB_USERNAME, port } from "./config/config.js";




const app = express()
app.use(express.json())

app.use(cors())
app.use(express.static("Client/dist"))

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    src: {type:String, required:true},
    price: {type :Number, required:true},
    
    dateCreated: { type: Date, default: Date.now() }
})
export const Product = mongoose.model("Product", productSchema)

//GET
//get all todos from json
app.get('/', async (req, res) => {
    try {
        const allProducts = await Product.find({})
        if (allProducts.length === 0 || !allProducts) {
            return res.status(204).send({ message: "no product found" })

        }
        return res.status(200).send(allProducts)
    } catch (e) {
        return res.status(500).send({ message: e.message })

    }

})



//Get
//get  A todo by id from params
app.get(`/product/:id`, async (req, res) => {
    try {
        const id = req.params.id
        const product = await Product.findOne({ _id: id })
        if (!product) {
            return res.status(404).send({ message: "no product found" })
        }
        return res.status(200).send(product)
    } catch (e) {
        return res.status(500).send({ message: e.message })
    }
})

//POST
// create product
app.post(`/createProduct`, async (req, res) => {
    try {

        const productForm = { ...req.body }
        const product = new Product(productForm)
        await product.save()
        res.status(200).send(product)
    } catch (e) {
        return res.status(500).send({ message: e.message })
    }

})

//PUT
//updating
app.post(`/updatedProduct/:id`, async (req, res) => {
    const productAllowedUpdates = ["price", "size"]
    const updates = Object.keys(req.body)
    const isValidOperation = updates.every((update) =>
        productAllowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({ message: "invalid updates" })
    }

    try {
        const id = req.params.id;
        const product = await Product.findOne({ _id: id });

        if (!product) {
            return res.status(404).send({ message: "user does not exist" });
        }

        updates.forEach((update) => (product[update] = req.body[update]));
        await product.save();
        return res.status(200).send(product);
    } catch (e) {
        return res.status(500).send({ message: e.message });
    }
})
app.get("*", (req, res) => {
    console.log(__dirname);
    res.sendFile(__dirname + "/Client/dist/index.html");
  });
app.listen(port, async () => {
    try {
      await mongoose.connect(`mongodb+srv://${DB_USERNAME}:${DB_PASS}@${DB_CLUSTER}/${DB_NAME}`);
      console.log(`Example app listening on port ${port}`);
    } catch (e) {
      console.log(e);
    }
  });
