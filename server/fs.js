import fs from "fs"

export const getAllProducts = () => fs.readFileSync("./products.json" , "utf8")

export const changeJson = (array) => {
    fs.writeFileSync("./producs.json", JSON.stringify(array));
}