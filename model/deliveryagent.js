const mongoose = require('mongoose');

const deliveryAgentSchema = new mongoose.Schema({
    restaurantId:{
        type: mongoose.Types.ObjectId,
        ref: 'Restaurant',
      //  required: true
    },
    discountPercent : {
        type: Number,
        //required: true,
        min: 0,
        max: 80
    },
    name:{
        type: String
    },
    address:{
        type: String,
    },
    phone:{
        type: String,
    },
    email:{
        type: String,
    },
    isAvailable:{
        type:Boolean
    },
    currentOrder:{
        type:String
    },
},{
    timestamps: true
})

module.exports = mongoose.model('deliveryAgent',deliveryAgentSchema);
