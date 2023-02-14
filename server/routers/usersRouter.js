const UserControllers = require("../controllers/UserControllers")
const express = require('express')
const router = express.Router()

router.get('/products',UserControllers.getAllProducts)
router.get('/new',UserControllers.getNewProducts)
router.get('/:productId',UserControllers.getProductsDetail)

module.exports = router