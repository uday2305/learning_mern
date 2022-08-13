const jwt = require('jsonwebtoken');
const userModel = require('../model/user');
const productModel = require('../model/product');
const orderModel = require('../model/order');
const config = require('../config');
const cryptoProvider = require('../providers/cryptoProvider');

exports.validateLogin = async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.body.email }).exec();
        if (user != null && cryptoProvider.comparePassword(req.body.password, user.password)) {
            const token = jwt.sign({ _id: user._id }, config.secret)
            let response = { 'status': 'success', 'message': 'user logged in successfully', 'accessToken': token };
            res.status(200).json(response);
        }
        else {
            res.status(404).json(`no matching user exists with those details`)
        }
    }
    catch (ex) {
        res.status(500).json({ 'status': 'failure', 'message':  "exception while validating Login - Bad Request : " + ex });
    }
};
exports.register = async (req, res) => {
    try {
        var hashedPassword = cryptoProvider.encryptPassword(req.body.password);
        req.body.password = hashedPassword;
        await userModel.create(req.body);
        res.status(200).json({ 'status': 'success', 'message': 'user created successfully' });
    }
    catch (ex) {
        res.status(400).json({'status': 'failure', 'message': "exception while insertion - Bad Request : " + ex });
    }
};
exports.getProfile = async (req, res) => {
    try {
        const projection = { firstName: 1, lastName: 1, email: 1, profileImage: 1, "address.streetAddress": 1, "address.city": 1, "address.state": 1, "address.zipcode": 1 };
        let user = await userModel.findOne({ _id: req.loggedUser._id }, projection).lean();
        res.status(200).json({ 'status': 'success', 'profile': user });
    }
    catch (ex) {
        res.status(500).json({ 'status': 'failure', 'message':  "exception while retrieving the products : " + ex });
    }
};

exports.patchUserAddress = async (req, res) => {
    try {
        await userModel.updateOne({ _id: req.loggedUser._id }, { address: req.body.profile.address }).exec() != null
        res.status(200).json({ 'status': 'success', 'message': 'profile modified successfully' });
    }
    catch (ex) {
        res.status(500).json({ 'status': 'failure', 'message':  "exception while retrieving the products : " + ex });
    }
};
exports.patchUserImage = async (req, res) => {
    try {
        await userModel.updateOne({ _id: req.loggedUser._id }, { profileImage: req.body.profile.image }).exec() != null
        res.status(200).json({ 'status': 'success', 'message': 'profile image updated successfully' });
    }
    catch (ex) {
        res.status(500).json({ 'status': 'failure', 'message':  "exception while retrieving the products : " + ex });
    }
};
exports.deleteUserImage = async (req, res) => {
    try {
        await userModel.updateOne({ _id: req.loggedUser._id }, { profileImage: "" }).exec() != null
        res.status(200).json({ 'status': 'success', 'message': 'profile image deleted successfully' });
    }
    catch (ex) {
        res.status(500).json({ 'status': 'failure', 'message': "exception while retrieving the products : " + ex });
    }
};

exports.getHomePageBanners = async (req, res) => {
    try {
        let productList = await productModel.aggregate([
            {
              '$sort': {
                'createdOn': -1
              }
            }, {
              '$limit': 3
            }, {
              '$project': {
                '_id': 0, 
                'image': 1, 
                'name': 1
              }
            }
          ]);
        res.status(200).json({ 'status': 'success', 'products': productList });
    }
    catch (ex) {
        res.status(500).json({ 'status': 'failure', 'message':  "exception while retrieving the products : " + ex });
    }
};

exports.getHomePageCategories = async (req, res) => {
    try {
        let productList = await productModel.aggregate([
            {
              '$group': {
                '_id': '$category'
              }
            }, {
              '$sample': {
                'size': 3
              }
            }
          ]);

          productList.forEach(function(obj){
            obj.name = obj._id 
            delete obj._id
          });
          
        res.status(200).json({ 'status': 'success', 'categories': productList });
    }
    catch (ex) {
        res.status(500).json({ 'status': 'failure', 'message': "exception while retrieving the products : " + ex });
    }
};

exports.getHomePageProducts = async (req, res) => {
    try {
        let productList = await productModel.aggregate([
            {
              '$sample': {
                'size': 8
              }
            }
          ]);
        res.status(200).json({ 'status': 'success', 'products': productList });
    }
    catch (ex) {
        res.status(500).json({ 'status': 'failure', 'message':  "exception while retrieving the products : " + ex });
    }
};

exports.getProducts = async (req, res) => {
    try {
        let productList = await productModel.find().lean();
        res.status(200).json({ 'status': 'success', 'products': productList });
    }
    catch (ex) {
        res.status(500).json({ 'status': 'failure', 'message': "exception while retrieving the products : " + ex });
    }
};

exports.getProductsById = async (req, res) => {
    try {
        let product = await productModel.findOne({ _id: req.params.id }).lean();
        res.status(200).json({ 'status': 'success', 'product': product });
    }
    catch (ex) {
        res.status(500).json({ 'status': 'failure', 'message':  "exception while adding the product : " + ex });
    }
};

exports.addProduct = async (req, res) => {
    try {
        await productModel.create(req.body);
        res.status(200).json({ 'status': 'success', 'message': 'product added successfully' });
    }
    catch (ex) {
        res.status(500).json({ 'status': 'failure', 'message':  "exception while adding the product : " + ex });
    }
};

exports.editProduct = async (req, res) => {
    try {
        await productModel.updateOne({ _id: req.params.id }, { $set: req.body.product }, { new: true });
        res.status(200).json({ 'status': 'success', 'message': 'product modified successfully' });
    }
    catch (ex) {
        res.status(500).json({ 'status': 'failure', 'message':  "exception while modifying the product : " + ex });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        await productModel.deleteOne({ _id: req.params.id });
        res.status(200).json({ 'status': 'success', 'message': 'product deleted successfully' });
    }
    catch (ex) {
        res.status(500).json({ 'status': 'failure', 'message':  "exception while deleting the product : " + ex });
    }
};

exports.checkOut = async (req, res) => {
    try {
        let order= {};
        order.cart = req.body.cart;

       if(req.loggedUser!=null){
            order.user = req.loggedUser._id;
        } else{
            var hashedPassword = cryptoProvider.encryptPassword(req.body.user.password);
            req.body.user.password = hashedPassword;
            let user = await userModel.create(req.body.user);
            order.user = user._id;
        }
        orderList = await orderModel.create(order);
        res.status(200).json({ 'status': 'success', 'message':'order placed successfully' });
    }
    catch (ex) {
        res.status(500).json({ 'status': 'failure', 'message':  "exception while checking out the order : " + ex });
    }
};
exports.getOrders = async (req, res) => {
    try {
        var orderList = null;

        if(req.loggedUser.isAdmin){
            orderList = await orderModel.find().lean();    
        } else{
            orderList = await orderModel.find({user:req.loggedUser._id}).lean();
        }
        res.status(200).json({ 'status': 'success', 'orders': orderList });
    }
    catch (ex) {
        res.status(500).json({ 'status': 'failure', 'message':  "exception while retrieving the orders : " + ex });
    }
};

exports.editOrder = async (req, res) => {
    try {
        await orderModel.updateOne({ _id: req.params.id }, { $set: req.body.orders }, { new: true });
        res.status(200).json({ 'status': 'success', 'message': 'order modified successfully' });
    }
    catch (ex) {
        res.status(500).json({ 'status': 'failure', 'message':  "exception while modifying the order : " + ex });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        let deletionResponse = await orderModel.deleteOne({ _id: req.params.id });
        if(deletionResponse.deletedCount === 1){
            res.status(200).json({ 'status': 'success', 'message': 'order deleted successfully' });
        }
        else{
            res.status(404).json({ 'status': 'failure', 'message':  'failure', 'message': 'No order exists to delete' });
        }
        
    }
    catch (ex) {
        res.status(500).json({ 'status': 'failure', 'message':  "exception while deleting the order : " + ex });
    }
};

exports.checkAuthorization = async (req, res, next) => {
    try {
        let authHeader = req.headers.authorization
        if (authHeader != undefined) {
            const token = jwt.verify(authHeader, config.secret);
            if (token && token._id) {
                let loggedUser = await userModel.findOne({ _id: token._id }).exec();
                if (loggedUser != null) {
                    req.loggedUser = loggedUser
                    next();
                } else {
                    res.status(401).json({ 'status': "UnAuthorized" });
                }
            }
            else {
                res.status(401).json({ 'status': "UnAuthorized" });
            }
        }
        else {
            res.status(401).json({ 'status': "UnAuthorized" });
        }
    } catch (ex) {
        res.status(401).json({ 'status': "UnAuthorized" });
    }
};
exports.checkIsAdmin = async (req, res, next) => {
    try {
        if (req.loggedUser.isAdmin) {
            next();
        }
        else {
            res.status(401).json({ 'status': "UnAuthorized" });
        }
    } catch (ex) {
        res.status(401).json({ 'status': "UnAuthorized" });
    }
};

exports.checkLoggedIn = async (req, res, next) => {
    try {
        let authHeader = req.headers.authorization
        if (authHeader != undefined) {
            const token = jwt.verify(authHeader, config.secret);
            if (token && token._id) {
                let loggedUser = await userModel.findOne({ _id: token._id }).exec();
                if (loggedUser != null) {
                    req.loggedUser = loggedUser
                    next();
                } else {
                    res.status(401).json({ 'status': "UnAuthorized" });
                }
            }
            else {
                res.status(401).json({ 'status': "UnAuthorized" });
            }
        }
        else {
            req.loggedUser = null;
            next();
        }
    } catch (ex) {
        res.status(401).json({ 'status': "UnAuthorized" });
    }
};