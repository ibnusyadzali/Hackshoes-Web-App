const AdminControllers = require("../controllers/AdminControllers");
const express = require("express");
const router = express.Router();
const authentication = require("../middleware/authentication");

router.post("/login", AdminControllers.login);
router.post("/register", authentication, AdminControllers.register);
router.get("/products", authentication, AdminControllers.getAllProducts);
router.get("/categories", authentication, AdminControllers.getAllCategories);
router.post("/addCategory", authentication, AdminControllers.addCategory);
router.post("/add", authentication, AdminControllers.addProduct);
router.get("/:productId", authentication, AdminControllers.getProductsDetail);
router.put("/:productId", authentication, AdminControllers.editProduct);
router.delete("/category/:categoryId", authentication, AdminControllers.deleteCategory);
router.delete("/product/:productId", authentication, AdminControllers.deleteProduct);

module.exports = router;
