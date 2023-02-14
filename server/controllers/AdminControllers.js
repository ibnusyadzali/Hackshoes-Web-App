const { User, Product, Category, Image, sequelize } = require("../models/index");
const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");

class AdminControllers {
  static async login(req, res, next) {
    try {
      let { email, password } = req.body;

      if (!email || !password) {
        throw { name: `Email or Password is required` };
      }
      let user = await User.findOne({ where: { email } });
      if (!user) {
        throw { name: `Data Not Found` };
      }

      let compared = comparePassword(password, user.password);
      if (!compared) {
        throw { name: `Invalid Email/Password` };
      }

      let payload = {
        id: user.id,
      };

      let access_token = createToken(payload);
      res.status(200).json({ access_token, username: user.username, email: user.email, role: user.role });
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      let { username, email, password, phoneNumber, address } = req.body;
      let data = await User.create({ username, email, password, role: "admin", phoneNumber, address });
      res.status(201).json({ message: `Thank you ${data.username}, your account has been created` });
    } catch (error) {
      next(error);
    }
  }

  static async getAllProducts(req, res, next) {
    try {
      const allProduct = await Product.findAll({
        include: [
          {
            model: Image,
            attributes: {
              exclude: ["productId", "createdAt", "updatedAt"],
            },
          },
          {
            model: Category,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: User,
            attributes: {
              exclude: ["createdAt", "updatedAt", "password", "phoneNumber", "address"],
            },
          },
        ],
        order: [["id", "DESC"]],
      });
      res.status(200).json(allProduct);
    } catch (error) {
      next(error);
    }
  }

  static async getAllCategories(req, res, next) {
    try {
      const allCategory = await Category.findAll();
      res.status(200).json(allCategory);
    } catch (error) {
      next(error);
    }
  }

  static async addProduct(req, res, next) {
    let t = await sequelize.transaction();
    try {
      let authorId = req.user.id;
      let { name, description, price, mainImg, categoryId, additionalImages } = req.body;
      let slug = name.toLowerCase().split(" ").join("-");

      //ini create product
      const newProduct = await Product.create({ name, slug, description, price, stockStatus: "New", mainImg, categoryId, authorId }, { transaction: t });

      const dataImages = additionalImages.map((el) => {
        return { productId: newProduct.id, imgUrl: el };
      });
      //create Images
      const newImages = await Image.bulkCreate(dataImages, { transaction: t });
      await t.commit();
      res.status(201).json({ newProduct, newImages });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  static async getProductsDetail(req, res, next) {
    try {
      const productId = req.params.productId;
      const data = await Product.findOne({
        where: { id: productId },
        include: {
          model: Image,
          attributes: {
            exclude: ["productId", "createdAt", "updatedAt"],
          },
        },
      });
      if (!data) {
        throw { name: "Data not found" };
      }
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async editProduct(req, res, next) {
    let t = await sequelize.transaction();
    try {
      let authorId = req.user.id;
      let productId = req.params.productId;
      let { name, description, price, mainImg, categoryId, stockStatus, additionalImages } = req.body;
      let slug = name.toLowerCase().split(" ").join("-");
      let findProduct = await Product.findOne({
        where: { id: productId },
        include: {
          model: Image,
        },
      }, { transaction: t });

      if (!findProduct) {
        throw { name: `Data not found` };
      } else {
        await Product.update({ id: findProduct.id, name, slug, description, price, stockStatus, mainImg, categoryId, authorId }, { where: { id: productId } }, { transaction: t });

        const arrOfImagesId = findProduct.Images.map((el) => {
          return { id: el.id, productId: el.productId };
        });
        additionalImages.forEach((el, i) => {
          arrOfImagesId[i].imgUrl = el;
        });
        await Image.bulkCreate(arrOfImagesId, { updateOnDuplicate: ["imgUrl"] }, { transaction: t });
        await t.commit();
        res.status(201).json({ message: `Success to update detail on product ${findProduct.name}` });
      }
    } catch (error) {
      console.log(error)
      await t.rollback();
      next(error);
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      let productId = req.params.productId;
      let findProduct = await Product.findOne({ where: { id: productId } });
      await Product.destroy({ where: { id: productId } });
      if (!findProduct) {
        throw { name: `Data not found` };
      } else {
        res.status(200).json({ message: `Success to delete product ${findProduct.name}` });
      }
    } catch (error) {
      next(error);
    }
  }

  static async addCategory(req, res, next) {
    let t = await sequelize.transaction();
    try {
      let { name } = req.body;
      const newCategory = await Category.create({ name}, { transaction: t });
      await t.commit();
      res.status(201).json({newCategory});
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }
  
  static async deleteCategory(req, res, next) {
    try {
      let categoryId = req.params.categoryId;
      let findCategory = await Category.findOne({ where: { id: categoryId } });
      await Category.destroy({ where: { id: categoryId } });
      if (!findCategory) {
        throw { name: `Data not found` };
      } else {
        res.status(200).json({ message: `Success to delete product ${findCategory.name}` });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AdminControllers;
