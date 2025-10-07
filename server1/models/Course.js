const mongoose  = require("mongoose");


const courseSchema = new mongoose.Schema({

   courseName:{
   type:String,
   required:true,
   },

   courseDescription:{
   type:String,
   },

   instructor:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"User",

   },

   whatYouWillLearn:{
   type:String,
   },

   courseContent:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Section",
    }
   ],

   ratingAndReviews:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"RatingAndReview",
    }
   ],

   price:{
  type:Number,
   },
   
   thumbnail:{
     type:String,
   },

 tag: {
    type: [String],
    required: true,
    // ref:"Tag",
  },

   category:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Category",
   }],

   studentsEnrolled:[
    {
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"User",
    }
   ],
   
   instructions: {
    type:[String],
   },

   status: {
    type:String,
    enum:["Draft", "Published"],
   },

 courseContent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
    },
  ],
  createdAt:{
    type:Date,
    default:Date.now
  },

});

module.exports = mongoose.model("Course",courseSchema )
