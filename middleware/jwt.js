
const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const User = require('../model/userCreate');
const Restaurant = require('../model/restaurantCreate');
const Admin = require('../model/adminCreate');

exports.genToken = async (userId) => {
    try {
        // userId : object containing _id and the role

        const token = jwt.sign(userId, process.env.JWT_SECRET, { expiresIn: '15d' });
        return token;
    } catch (error) {
        console.log(error);
    }
}

exports.userAuthMiddleware = async (req, res, next) => {
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            const token = req.headers.authorization.split(' ')[1];
            console.log(token)
            const {id: userId} = jwt.verify(token, process.env.JWT_SECRET);
            console.log(userId)
            const currentUser = await User.findOne({
                _id: userId,
                role: 'user'
            });
           console.log(currentUser)
            if (currentUser) {
                req.user = userId;

                next();
            } else {
                return next(createError(400, 'Unauthorized access'))
            }

        } else {
            return next(createError(400, 'token not provided'))
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            errorMessage: error.message
        })
    }
}




exports.adminAuthMiddleware = async (req, res, next) => {
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            const token = req.headers.authorization.split(' ')[1];
            

            const { id: adminId } = jwt.verify(token, process.env.JWT_SECRET);
            console.log(adminId);
            const currentAdmin = await Admin.findOne({
                _id: adminId,
                role: 'admin'
            });

           console.log(currentAdmin)
            if (currentAdmin) {
                req.user = adminId;
                next();
            } else {
                return next(createError(400, 'Unauthorized access'))
            }

        } else {
            return next(createError(400, 'token not provided'))
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            errorMessage: error.message
        })
    }
}


exports.restaurantAuthMiddleware = async (req, res, next) => {
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            const token = req.headers.authorization.split(' ')[1];
            console.log(token)

            const { id:restaurantId } = jwt.verify(token, process.env.JWT_SECRET);
            console.log(restaurantId)

            const currentRestaurant = await Restaurant.findOne({
                _id: restaurantId,
              //  role: 'restaurant'
            });
  console.log(currentRestaurant)
            if (currentRestaurant) {
                req.user = restaurantId;

                next();
            } else {
                return next(createError(400, 'Unauthorized access'))
            }

        } else {
            return next(createError(400, 'token not provided'))
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            errorMessage: error.message
        })
    }
}