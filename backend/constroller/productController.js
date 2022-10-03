//importing models
const productModel = require("../model/productModel")

//importing error handlers
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const ApiFeatures = require("../utils/features");
const cloudinary = require("cloudinary");



//create product by admin
const createProduct = catchAsyncErrors(async (req, res) => {


    let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  
    req.body.images = imagesLinks;
    //adding userid to input body
    req.body.user = req.user.id

    console.log(req.user);

    const product = await productModel.create(req.body)
    res.status(201).send({
        status: 'success',
        new_product: product
    })
})


//get all products
const getAllProducts = catchAsyncErrors(async (req, res) => {

    const resultPerPage = 8;
    const productCount = await productModel.countDocuments()

    const apiFeatures = new ApiFeatures(productModel.find(), req.query).search().filter().pagination(resultPerPage)

    const products = await apiFeatures.query
    res.status(201).send({ status: "sucsess", products: products, productCount })
})


// get one product

const getProduct = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params
    const product = await productModel.findById(id)

    if (!product) {
        return next(new ErrorHandler("product not found", 404))
    }
    res.status(201).send({ status: "sucsess", product: product })
})

//update product by admin

const updateProduct = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params
    const product = await productModel.findById(id)

    if (!product) {
        return next(new ErrorHandler("product not found", 404))
    }


    //  Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }
    const uppdatedProduct = await productModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
    res.send(uppdatedProduct)
})

//delete product 
const deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params
    console.log(id);

    const product = await productModel.findById(id)
    console.log(product);

    if (!product) {
        return next(new ErrorHandler("product not found", 404))
    }



    // Deleting Images From Cloudinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

    await product.remove()

    res.send({ status: "sucsess", message: "product deleted" })
})




// Create New Review or Update the review
const createProductReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment } = req.body;
    console.log(req.body);
    console.log(req.params);

    const { productId } = req.params

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };

    const product = await productModel.findById(productId);
    console.log(product);

    const isReviewed = product.reviews.find((rev) => rev.user.toString() === req.user._id.toString());

    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString())
                (rev.rating = rating), (rev.comment = comment);
        });
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    let sum = 0;

    product.reviews.forEach((rev) => {
        sum += rev.rating;
    });

    product.ratings = sum / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
    });
});



// Get all Reviews of a product
const getProductReviews = catchAsyncErrors(async (req, res, next) => {
    

    const product = await productModel.findById(req.params.productId);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews,
    });
});

// Delete Review
const deleteReview = catchAsyncErrors(async (req, res, next) => {
    const {productId}=req.params
    const product = await productModel.findById(productId);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }
console.log(product);
    const reviews = product.reviews.filter(
        (rev) => rev._id.toString() ==productId.toString()
    );

    // console.log(reviews);
    let sum = 0;

    reviews.forEach((rev) => {
        sum += rev.rating;
    });

    let ratings = 0;

    if (reviews.length === 0) {
        ratings = 0;
    } else {
        ratings = sum / reviews.length;
    }

    const numOfReviews = reviews.length;

    await productModel.findByIdAndUpdate(
        productId,
        {
            reviews,
            ratings,
            numOfReviews,
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
    );

    res.status(200).json({
        success: true,
    });
});

module.exports = {

    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    createProductReview,
    getProductReviews,
    deleteReview


}