/**
 * Created by jonah on 11/15/2015.
 */

ProductsRepo = (function() {
    "use strict";

    var async = require('async');
    var User = require('./user');
    var Product = require('./product');

    var cloudinary = require('cloudinary');
    cloudinary.config({cloud_name: 'swoppr', api_key: '574615225534372', api_secret: 'mNUyKP0jlRPHTgGs_yUeiTod5dw'});

    //alle images van producten uit de cloud verwijderen
    /*cloudinary.api.delete_resources_by_tag('product',
     function(result){
     console.log(result);
     });*/

    var getProductById = function(req, res, id) {
        User
            .findOne({"products._id": id})
            .exec(function(err, userWithProducts) {
                if (err || !userWithProducts) {
                    res.json({"error": "productId niet gevonden"});
                    return ;
                }

                var product = userWithProducts.products.id(id);
                res.json({"ok": product});
            });
    };

    var getProductByIdUser = function(req, res, id) {
        User
            .findOne({"products._id": id})
            .exec(function (err, userWithProducts) {
                if (err || !userWithProducts) {
                    res.json({"error": "productId niet gevonden"});
                    return;
                }

                var product = userWithProducts.products.id(id);
                product = product.toObject();

                userWithProducts = userWithProducts.toObject();
                delete userWithProducts.products;
                userWithProducts.product = product;

                res.json({"ok": userWithProducts});
            });
    };

    var addProductWithPictureUser = function(req, res) {
        User
            .findOne({_id: req.body.userId}, function (err, user) {
                if (err || !user) {
                    res.json({"error": "userId niet gevonden"});
                    return;
                }

                if (req.files) {
                    var file = req.files.file;
                    cloudinary.uploader.upload(file.path, function (result) {
                        if (result) {
                            var entry = new Product({
                                productName: req.body.productName,
                                pricePerDay: req.body.pricePerDay,
                                description: req.body.description,
                                url: result.secure_url,
                                publicid: result.public_id,
                                place: req.body.place,
                                longitude: req.body.longitude,
                                latitude: req.body.latitude
                            });

                            addProduct(res, user, entry);

                        } else {
                            res.json({"error": "Afbeelding uploaden mislukt"});
                        }
                    }, {tags: "product", height: 250, crop: 'fit'});

                    req.files = null;
                    //product toevoegen zonder file
                } else {

                    var entry = new Product({
                        productName: req.body.productName,
                        pricePerDay: req.body.pricePerDay,
                        description: req.body.description,
                        place: req.body.place,
                        longitude: req.body.longitude,
                        latitude: req.body.latitude
                    });

                    addProduct(res, user, entry);
                }
        });
    };

    function addProduct(res, user, entry) {
        user.products.push(entry);

        user.save(function(err) {
            if (err) {
                res.json({"error": "Product toevoegen aan gebruiker mislukt"});
            } else {
                res.json({"ok": entry});
            }
        });
    }


    var editProductWithPictureUser = function(req, res) {
        User
            .findOne({"products._id": req.body.productId}, function (err, userWithProduct) {
                if (err || !userWithProduct) {
                    res.json({"error": "productId niet gevonden"});
                    return;
                }

                if (req.files) {
                    //eerst nog afbeelding verwijdern
                    //als er een public id is --> overwriten, anders nieuwe uploaden

                    var file = req.files.file;
                    if (req.body.publicid) {
                        cloudinary.uploader.upload(file.path, function (result) {
                            if (result) {
                                userWithProduct = setUserWithProduct(req, result, userWithProduct);
                                editProduct(req, res, userWithProduct);
                            } else {
                                res.json({"error": "Afbeelding uploaden mislukt"});
                            }
                        }, {tags: "product", height: 250, crop: 'fit', public_id: req.body.publicid, overwrite: true});
                    } else {
                        cloudinary.uploader.upload(file.path, function (result) {
                            if (result) {
                                userWithProduct = setUserWithProduct(req, result, userWithProduct);
                                editProduct(req, res, userWithProduct);
                            } else {
                                res.json({"error": "Afbeelding uploaden mislukt"});
                            }
                        }, {tags: "product", height: 250, crop: 'fit'});
                    }

                    req.files = null;
                    //product toevoegen zonder file
                } else {
                    var productId = req.body.productId;

                    if (req.body.url) userWithProduct.products.id(productId).url = req.body.url;
                    if (req.body.publicid) userWithProduct.products.id(productId).publicid = req.body.publicid;
                    if (req.body.productName) userWithProduct.products.id(productId).productName = req.body.productName;
                    if (req.body.pricePerDay) userWithProduct.products.id(productId).pricePerDay = req.body.pricePerDay;
                    if (req.body.description) userWithProduct.products.id(productId).description = req.body.description;
                    if (req.body.place) userWithProduct.products.id(productId).place = req.body.place;
                    if (req.body.longitude) userWithProduct.products.id(productId).longitude = req.body.longitude;
                    if (req.body.latitude) userWithProduct.products.id(productId).latitude = req.body.latitude;

                    editProduct(req, res, userWithProduct);
                }
        });
    };

    function editProduct(req, res, userWithProduct) {
        userWithProduct.save(function(err) {
            if (err) {
                res.json({"error": "Product bewerken van gebruiker mislukt"});
            } else {
                res.json({"ok": userWithProduct.products.id(req.body.productId)._id});
            }
        });
    }

    function setUserWithProduct(req, result, userWithProduct) {
        var productId = req.body.productId;

        userWithProduct.products.id(productId).url = result.secure_url;
        userWithProduct.products.id(productId).publicid = result.public_id;
        if (req.body.productName) userWithProduct.products.id(productId).productName = req.body.productName;
        if (req.body.pricePerDay) userWithProduct.products.id(productId).pricePerDay = req.body.pricePerDay;
        if (req.body.description) userWithProduct.products.id(productId).description = req.body.description;
        if (req.body.place) userWithProduct.products.id(productId).place = req.body.place;
        if (req.body.longitude) userWithProduct.products.id(productId).longitude = req.body.longitude;
        if (req.body.latitude) userWithProduct.products.id(productId).latitude = req.body.latitude;

        return userWithProduct;
    }

    var getAllProducts = function(req, res) {
        User
            .find()
            .exec(function (err, users) {
                if (err || !users) {
                    res.json({"error": "Geen users gevonden"});
                    return;
                }

                var products = [];

                async.each(users, iteratorUsers, function (err) {
                    //na ophalen van alle users
                    if (err) {
                        res.json({"error": "Ophalen users mislukt"});
                    }

                    res.json({"ok": products});
                });

                function iteratorUsers(user, callback) {

                    var userid = user._id;

                    async.each(user.products, iteratorProducts, function (err) {

                        //na ophalen alle producten van de user
                        if (err) {
                            callback("Fout bij bij overlopen user", "getUsers");
                        }

                        callback(null, "getUsers");
                    });

                    function iteratorProducts(product, callback2) {
                        if (err || !product) {
                            callback2("Fout bij overlopen producten users", "getProductsOfUser");
                        }

                        product = product.toObject();
                        product.userId = userid;

                        products.push(product);
                        callback2(null, "getProductsUser");
                    }
                }
        });
    };

    var softDeleteProduct = function(req, res, id) {
        User
            .findOne({"products._id": id})
            .exec(function (err, userWithProduct) {

                if (err || !userWithProduct) {
                    res.json({"error": "productId niet gevonden"});
                    return;
                }

                userWithProduct.products.id(id).isDeleted = true;

                userWithProduct.save(function (err) {
                    if (err) {
                        res.json({"error": "Fout bij soft deleten product"});
                    }

                    res.json({"ok": id});
                });
            });
    };

    return {
        model: Product,
        getProductById: getProductById,
        getProductByIdUser: getProductByIdUser,
        addProductWithPictureUser: addProductWithPictureUser,
        editProductWithPictureUser: editProductWithPictureUser,
        getAllProducts: getAllProducts,
        softDeleteProduct: softDeleteProduct
    }
})();

module.exports = ProductsRepo;