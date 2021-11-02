import {Router} from "express"

import productsHandler from "./handlers.js"

const router = Router()

router.get("/", productsHandler.getAllProducts)

router.post("/", productsHandler.createProduct)

router
.route("/:product_id")
.get(productsHandler.getProductById)
.put(productsHandler.updateProductById)
.delete(productsHandler.deleteProductById)

router.get("/:product_id/reviews", productsHandler.getAllReviews)
router.post("/:product_id/reviews", productsHandler.createReview)
router.delete("/:product_id/reviews/:review_id", productsHandler.deleteReview)
router.put("/:product_id/reviews/:review_id", productsHandler.updateReview)

export default router