/**
 * Created by jonah on 11/15/2015.
 */
//var mongoose = require( 'mongoose' );
var swoppr = require('../schemas/swoppr.schema.js');
var async = require('async');

var cloudinary = require('cloudinary');
cloudinary.config({cloud_name: 'swoppr', api_key: '574615225534372', api_secret: 'mNUyKP0jlRPHTgGs_yUeiTod5dw'});

//alle images van producten uit de cloud verwijderen
/*cloudinary.api.delete_resources_by_tag('product',
    function(result){
        console.log(result);
});*/

module.exports.getProductById = function(req, res, id) {
    swoppr.userModel.findOne({"products._id": id})
        .exec(function(err, userWithProducts) {
            if (err || !userWithProducts) {
                res.json({"error": "productId niet gevonden"});
                return ;
            }

            var product = userWithProducts.products.id(id);
            res.json(product);
        });
};

module.exports.getProductByIdUser = function(req, res, id) {
    swoppr.userModel
        .findOne({"products._id": id})
        .exec(function(err, userWithProducts) {
            if (err || !userWithProducts) {
                res.json({"error": "productId niet gevonden"});
                return ;
            }

            var product = userWithProducts.products.id(id);
            product = product.toObject();

            userWithProducts = userWithProducts.toObject();
            delete userWithProducts.products;
            userWithProducts.product = product;

            res.json(userWithProducts);
        });
};

module.exports.addProductWithPictureUser = function(req, res) {
    swoppr.userModel.findOne({_id: req.body.userId}, function(err, user) {
        if (err || !user) {
            res.json({"error": "userId niet gevonden"});
            return ;
        }

        if (req.files) {
            var file = req.files.file;
            cloudinary.uploader.upload(file.path, function(result) {
                if (result) {
                    var entry = new swoppr.productModel({
                        productName: req.body.productName,
                        pricePerDay: req.body.pricePerDay,
                        description: req.body.description,
                        url: result.secure_url,
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

            var entry = new swoppr.productModel({
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

module.exports.getAllProducts = function(req, res) {
    swoppr.userModel.find().exec(function(err, users) {

        if(err || !users) {
            res.json({"error": "Geen users gevonden"});
            return ;
        }

        var products = [];

        async.each(users, iteratorUsers, function(err) {
            //na ophalen van alle users
            if (err) {
                res.json({"error": "Ophalen users mislukt"});
            }

            res.json(products);
        });

        function iteratorUsers(user, callback) {

            var userid = user._id;

            async.each(user.products, iteratorProducts, function(err) {

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

/*module.exports.editProductUser = function(req, res) {
    swoppr.userModel.findOne({"products._id": req.body.id}).exec(function(err, userWithProduct) {

        if (err || !userWithProduct) {
            res.json({"error": "productId niet gevonden"});
            return ;
        }

        if (req.body.pricePerDay) userWithProduct.products.id(req.body.id).pricePerDay = req.body.pricePerDay;
        if (req.body.productName) userWithProduct.products.id(req.body.id).productName = req.body.productName;

        userWithProduct.save(function(err) {
            if (err) {
                res.json({"error": "Fout bij opslaan product van de gebruiker"});
            }

            res.json({"ok": "Product gewijzigd"});
        });
    });
};*/

module.exports.softDeleteProduct = function(req, res, id) {
    swoppr.userModel.findOne({"products._id": id})
        .exec(function(err, userWithProduct) {

        if (err || !userWithProduct) {
            res.json({"error": "productId niet gevonden"});
            return ;
        }

        userWithProduct.products.id(id).isDeleted = true;

        userWithProduct.save(function(err) {
            if (err) {
                res.json({"error": "Fout bij soft deleten product"});
            }

            res.json({"ok": id});
        });
    });
};

/*module.exports.removeProductUser = function(req, res, id) {
    swoppr.userModel.findOne({"products._id": id}).exec(function(err, userWithProduct) {
        if (err || !userWithProduct) {
            res.json({"error": "productId niet gevonden"});
            return ;
        }

        userWithProduct.products.id(id).remove();

        userWithProduct.save(function(err) {
            if (err) {
                res.json({"error": "Fout bij verwijderen product van de gebruiker"});
            }

            res.json({"ok": "Product verwijderd"});
        });

    });
};*/