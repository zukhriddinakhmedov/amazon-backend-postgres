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
        const products = await pool.query("SELECT * FROM products WHERE product_id=$1",
        [req.params.product_id]
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
            "UPDATE products SET name=$1,description=$2,brand=$3,image_url=$4,price=$5,category=$6 WHERE product_id=$7 RETURNING *;",
            [name, description, brand, image_url, price, category, req.params.product_id]
        )
        res.send(products.rows[0])
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const deleteProductById = async (req,res,next) => {
    try {
        await pool.query("DELETE FROM products WHERE product_id=$1", [req.params.product_id])
        res.status(204).send()
    } catch (error) {
        res.status(400).send(error.message)
    }

}

const getAllReviews = async(req,res,next) => {
    try {
        const reviews = await pool.query("SELECT * FROM reviews")
        res.send(reviews)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const createReview = async (req,res,next) => {
    try {
        const {comment, rate} = req.body
        const reviews = await pool.query("INSERT INTO reviews(comment ,rate) VALUES($1, $2) RETURNING *;",
        [comment, rate]
        )
        res.send(reviews.rows[0])
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const deleteReview = async (req,res,next) => {
    try {
        await pool.query("DELETE FROM reviews WHERE review_id=$1", [req.params.review_id])
        res.status(204).send()
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const updateReview = async (req,res,next) => {
    try {
        const {comment, rate} = req.body
        const reviews = await pool.query("UPDATE reviews SET comment=$1, rate=$2 WHERE review_id=$3) RETURNING *;",
        [comment, rate]
        )
        res.send(reviews.rows[0])
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
    getAllReviews,
    createReview,
    deleteReview,
    updateReview
}


export default productsHandler