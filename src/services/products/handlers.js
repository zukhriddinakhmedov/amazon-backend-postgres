import pool from "../../database/connect.js"

const getAllProducts = async (req,res,next) => {

    try {
        const products = await pool.query("SELECT * FROM products")
        res.send(products.rows)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const getProductById = async (req,res,next) => {
    try {
        const products = await pool.query("SELECT * FROM products WHERE id=$1",
        [req.params.id]
        )
        if(products.rows.length === 0) {
            res.status(400).send("Product is not found")
        }else{
            res.send(products.rows[0])
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}
const createProduct = async (req,res,next) => {
    try {
        const {name, description, brand, image_url, price, category} = req.body
        const products = await pool.query(
            "INSERT INTO products(name, description, brand, image_url, price, category) VALUES($1,$2,$3,$4,$5,$6) RETURNING*;",
            [name, description, brand, image_url, price, category]
            )
            res.send(products.rows[0])
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const updateProductById = async (req,res,next) => {
    try {
        const {name, description, brand, image_url, price, category} = req.body
        const products = await pool.query(
            "UPDATE products SET name=$1,description=$2,brand=$3,image_url=$4,price=$5,category=$6 WHERE id=$7 RETURNING *;",
            [name, description, brand, image_url, price, category, req.params.id]
        )
        res.send(products.rows[0])
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const deleteProductById = async (req,res,next) => {
    try {
        await pool.query("DELETE FROM products WHERE id=$1", [req.params.id])
        res.status(204).send()
    } catch (error) {
        res.status(400).send(error.message)
    }

}

const productsHandler = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProductById,
    deleteProductById,
}

export default productsHandler