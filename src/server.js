import express from "express"
import productsRouter from "./services/products/routes.js"
import createDefaultTables from "./database/create-tables.js"

const server = express()

const {PORT} = process.env
server.use(express.json())
server.use("/products", productsRouter)

server.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`)
    await createDefaultTables()
})

server.on("error", console.log)