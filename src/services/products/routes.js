import {Router} from "express"

import productsHandler from "./handlers.js"

const router = Router()

router.get("/", productsHandler.getAllProducts)
router.post("/", productsHandler.createProduct)

router
.route("/:id")
.get(productsHandler.getProductById)
.put(productsHandler.updateProductById)
.delete(productsHandler.deleteProductById)

export default router