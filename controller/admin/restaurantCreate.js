const createError = require("http-errors");
const restaurant = require("../../model/restaurantCreate");
const restaurantSchema = require("../../model/restaurantCreate");
// const newOTP = require("otp-generator");
// const SECRET = "demo@1234";
const { genToken } = require("../../middleware/jwt");

exports.registerRestaurant = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (await restaurantSchema.findOne({ email: email }))
      return next(createError(400, "already exists, please login"));

    const registeringRestaurant = new restaurantSchema({
      email,
      password,
    });

    const registeredRestaurant = await registeringRestaurant.save();
    const token = await genToken({
      id: registeredRestaurant._id,
      role: registeredRestaurant.role,
    });

console.log(token)

    if (registeredRestaurant && token) {
      return res.status(201).json({
        token,
        registeredRestaurant,
      });
    } else {
      return next(createError(400, "cannot register the restaurant"));
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errorname: error.name,
      message: error.message,
    });
  }
};

exports.restaurantLogin = async (req, res, next) => {
  try {
    console.log("hit restaurant login");
    const { email, password } = req.body;

    if (!email || !password)
      return next(createError(400, "please provide email and password"));

    const restaurant = await restaurantSchema.findOne({ email: email }).select("+password");
    console.log(restaurant);

    if (!restaurant)
      return next(createError(400, "No restaurant exists with the provided email"));

    if (!(await restaurant.checkPassword(password, restaurant.password)))
      return next(createError(400, "Incorrect email or password"));

    const token = await genToken({ id: restaurant._id, role: restaurant.role });

    console.log(token)

    if (!token) return next(createError(400, "cannot generate the token"));

    return res.status(200).json({
    tokrn:  token,
     r :  restaurant._id
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errorname: error.name,
      message: error.message,
    });
  }
};


exports.updateLocationOfRestaurant = async (req,res,next) => {
  try {
      console.log('hit upload location of restaurant');
      const {latLng} = req.body;

      const updatedRestaurant = await restaurantSchema.findByIdAndUpdate(req.user,{
          location:{
              type: 'Point',
              coordinates: latLng
          }
      },{new: true});

      if(!updatedRestaurant) return next(createError(400,'cannot add the location'));

      return res.status(200).json({updatedRestaurant});

  } catch (error) {
      console.log(error);
      return res.status(500).json({
          errorname: error.name,
          message: error.message
      })
  }
}

exports.me = async (req,res,next) => {
  try {
      console.log('hit get current restaurant');

      const restaurant = await restaurantSchema.findById(req.user);

      return res.status(200).json({restaurant});

  } catch (error) {
      console.log(error);
      return res.status(500).json({
          errorname: error.name,
          message: error.message
      })
  }
}

exports.updateMeRestaurant = async (req,res,next) => {
  try {
      console.log('hit restaurant update profile (updateMeRestaurant)');

      const { name, email, address, tagline, contact ,profile ,restaurantMenu} = req.body;

     // const { profile, menu } = req.files;

     // if (!profile || !menu) return next(createError(400, 'please provide profile and the menu image'));

      // const profilePath = `${profile[0].destination}/${profile[0].filename}`;
      // const menuPath = `${menu[0].destination}/${menu[0].filename}`;

      const updatedRestaurant = await restaurantSchema.findByIdAndUpdate(req.user,{
          name, email, address, contact, tagline, profile , restaurantMenu/* profile: profilePath, restaurantMenu: menuPath*/
      },{new: true});

      if(!updatedRestaurant) return next(createError(400,'cannot update the data of restaurant'));

      return res.status(200).json({updatedRestaurant});

  } catch (error) {
      console.log(error);
      return res.status(500).json({
          errorname: error.name,
          message: error.message
      })
  }
}

exports.deleteByRestaurant = async (req,res,next) => {
    try {
        console.log('hit delete category by id');
        const { categoryId } = req.params;

        const deletedCategory = await restaurantSchema.findOneAndDelete({_id:categoryId});

        if(!deletedCategory) return next(createError(400,'cannot delete the category'));

        return res.status(200).json({message:' deletion successfull'});

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorname: error.name,
            message: error.message
        })
    }
}