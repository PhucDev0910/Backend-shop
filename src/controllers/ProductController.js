const ProductService = require("../serviecs/ProductService");

//createProduct
const createProduct = async (req, res) => {
  try {
    const { name, image, type, countInStock, price, rating, discount } =
      req.body;
    if (
      !name ||
      !image ||
      !type ||
      !countInStock ||
      !price ||
      !rating ||
      !discount
    ) {
      return res.status(200).json({
        status: "ERR",
        message: "Dữ liệu đầu vào là bắt buộc",
      });
    }
    const response = await ProductService.createProduct(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

//updateProduct

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const data = req.body;
    if (!productId) {
      return res.status(200).json({
        status: "ERR",
        message: "ID sản phẩm là bắt buộc",
      });
    }
    const response = await ProductService.updateProduct(productId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

//deleteProduct
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(200).json({
        status: "ERR",
        message: "ID sản phẩm là bắt buộc",
      });
    }
    const response = await ProductService.deleteProduct(productId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

//getAllType
const getAllType = async (req, res) => {
  try {
    const response = await ProductService.getAllType();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

//getDetailsProduct
const getDetailsProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(200).json({
        status: "ERR",
        message: "ID sản phẩm là bắt buộc",
      });
    }
    const response = await ProductService.getDetailsProduct(productId);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(404).json({
      message: e,
    });
  }
};

//getAllProduct
const getAllProduct = async (req, res) => {
  try {
    const { limit, page, sort, filter } = req.query;
    const response = await ProductService.getAllProduct(
      Number(limit) || null,
      Number(page) || 0,
      sort,
      filter
    );
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

//delete many
const deleteMany = async (req, res) => {
    try {
        const ids = req.body.ids
        if (!ids) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The ids is required'
            })
        }
        const response = await ProductService.deleteManyProduct(ids)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

/*const getAllProduct = async (req,res) => {
    try {
        const response = await ProductService.getAllProduct()
        return res.status(200).json(response)
    }catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}*/

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllType,
  getDetailsProduct,
  getAllProduct,
  deleteMany
};
