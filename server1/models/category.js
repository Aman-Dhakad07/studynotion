const mongoose  = require("mongoose");

//name ,description, course


const categorySchema  = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        trim:true,
    },
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
     }],
});
module.exports = mongoose.model("Category", categorySchema)