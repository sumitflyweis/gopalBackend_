const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
//const multer = require("multer");
const app = express();
const bodyparser = require("body-parser");

const serverless = require("serverless-http");


const dotenv = require('dotenv');
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("Db conneted succesfully");
  })
  .catch((err) => {
    console.log(err);
  });

  app.get("/home",(req, res) => {
    res.status(200).send({msg:"Working App"});
  });







/// restaurant routes require




/*
   Require Routes End
*/



/*
    Use Routes
*/
//  const userCreateRoutes = require('./route/user/user.create');
//  const getRestaurantByUser = require('./route/user/getRestaurantCreate')
//  const bookingRoutes = require('./route/user/booking')
//  const paymentRoute = require('./route/user/payment')
//  const coupenRoute = require('./route/user/coupen')
//  const cancellationPolicyRoute = require('./route/user/cancellationPolicy')
//  const bookingCateringServicesRoute = require('./route/user/bookingOfCateringServices')
//  const paymentOfCateringServiceRoute = require('./route/user/paymentOfCateringServices')
//  const notificationUserRoute = require ('./route/user/notification')
//  const reviewRoute = require('./route/user/review')


/// user routes use
app.use('/api', require('./route/user/user.create'));
app.use('/api',require('./route/user/getRestaurantCreate'))
app.use('/api',require('./route/user/booking'))
app.use('/api',require('./route/user/payment'))
app.use('/api',require('./route/user/coupen'))
app.use('/api',require('./route/user/cancellationPolicy'))
app.use('/api',require('./route/user/bookingOfCateringServices'))
app.use('/api',require('./route/user/paymentOfCateringServices'))
app.use('/api',require ('./route/user/notification'))
app.use('/api',require('./route/user/review'))




/// admin routes require
// const adminAuthRoutes = require('./route/admin/adminCreate');
// const paymentAdminRoute = require('./route/admin/payment')
// const coupenAdminRoute = require('./route/admin/coupen')
// const cancellationAdminRoute = require('./route/admin/cancellationPolicy')
// const booking = require('./route/admin/booking')
// const bookingCateringServicesAdminRoute = require('./route/admin/bookingOfCateringServices')
// const paymentOfCateringServiceAdminRoute = require('./route/admin/paymentOfCateringServices')
// const notificationAdminRoute = require('./route/admin/notification')
// const restaurantCreate = require("./route/admin/restaurantCreate")
// const userCreate = require("./route/admin/userCreate")
// const deliveryAgents = require ('./route/admin/deliveryAgents')
// const privacy = require('./route/admin/privacy')
// const aboutus  = require('./route/admin/aboutus')
//const subscription = require('./route/admin/subscription')
//const reviewAdminRoute = require('./route/admin/review')
//const bookingAdminRoutes = require('./route/admin/booking')
// const adminPlanTypeRoute = require('./routes/admin/PlanType.js/PlanType')



/// admin routes use
app.use('/api', require('./route/admin/adminCreate'));
app.use('/api',require('./route/admin/payment'))
app.use('/api',require('./route/admin/coupen'))
app.use('/api',require('./route/admin/cancellationPolicy'))
app.use('/api',require('./route/admin/booking'))
app.use('/api',require('./route/admin/bookingOfCateringServices'))
app.use('/api',require('./route/admin/paymentOfCateringServices'))
app.use('/api',require('./route/admin/notification'))
app.use('/api',require("./route/admin/restaurantCreate"))
app.use('/api',require("./route/admin/userCreate"))
app.use('/api', require ('./route/admin/deliveryAgents'))
app.use('/api',require('./route/admin/privacy'))
app.use('/api',require('./route/admin/aboutus'))
//app.use('/api',subscription)
//app.use('/api',reviewAdminRoute)
//app.use('/api',bookingAdminRoutes)


// const restaurantRoutes = require('./route/restaurant/restaurantCreate');
// const restaurantBannerRoutes = require('./route/restaurant/restaurantBanner');
// const planTypeRoutes =  require('./route/restaurant/restaurantPlanType')
// const mealRoute = require('./route/restaurant/restaurantMeal')
// const dishesRoute = require('./route/restaurant/dishes')
// const paymentRestaurantRoute  = require('./route/restaurant/payment')
// const coupenRestaurantRoute = require('./route/restaurant/coupen')
// const cancellationRestaurantRoute = require('./route/restaurant/cancellationPolicy')
// const bookingCateringServicesRestaurantRoute = require('./route/restaurant/bookingOfCateringServices')
// const paymentOfCateringServicesRestaurantRoute = require('./route/restaurant/paymentOfCateringServices')
// const notificationRestaurantRoute = require('./route/restaurant/notification')
// //const reviewRestaurantRoute = require("./route/restaurant/review")
// const bookingRestaurantRoutes = require('./route/restaurant/booking')



// /// restaurant routes use
app.use('/api', require('./route/restaurant/restaurantCreate'));
app.use('/api',require('./route/restaurant/restaurantBanner'))
app.use('/api',require('./route/restaurant/restaurantPlanType'))
app.use('/api',require('./route/restaurant/restaurantMeal'))
app.use('/api',require('./route/restaurant/dishes'))
app.use('/api',require('./route/restaurant/payment'))
app.use('/api',require('./route/restaurant/coupen'))
app.use('/api',require('./route/restaurant/cancellationPolicy'))
app.use('/api',require('./route/restaurant/bookingOfCateringServices'))
app.use('/api',require('./route/restaurant/paymentOfCateringServices'))
app.use('/api',require('./route/restaurant/notification'))
//app.use('/api',reviewRestaurantRoute)
app.use('/api',require('./route/restaurant/booking'))




  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
  
  module.exports = {
    handler: serverless(app),
  };


// const app = require('./app');

