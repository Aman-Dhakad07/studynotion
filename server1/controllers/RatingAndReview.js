const RatingAndReview  =  require("../models/RatingAndReview");
const Course = require("../models/Course");


//createRating
exports.createRating = async(req, res) => {
    try{
       // get user id
           const userId  = req.user.id;

    //fetch data from req body
    const {rating, review, courseId} = req.body;

    //check if user is enrolled or not
    const courseDetails = await Course.findOne(
                                      {_id:courseId,
                                         studentsEnrolled:{$eleMatch: {$eq:userId}},
                                      });
                                   
     //check if user already reiewed the course
     const alreadyRegistered = await RatingAndReview.findOne({
        user:userId,
        course:courseId,
     })
   
     if(alreadyRegistered){
        return res.status(404).json({
            success:false,
            message:"Student is already regisered in this course",
        })
     }

    // create rating review
    const ratingAndReview = await RatingAndReview.create({
                                          rating,review,
                                          user:userId,
                                          course:courseId,
                                          });

     //update the course with this rating/Review
      const updateCourseDetails  = await Course.findByIdAndUpdate(courseId,
                                     {
                                        $push: {
                                            ratingAndReview: ratingAndReview,
                                        }
                                     },
                                     {new:true});

        console.log(updateCourseDetails);

           //return response
           return res.status(200).json({
            success:true,
            message:"Rating and Review created Successfully"
           })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Cannot create Review "
        })

    }
}
   




//getAverageRating
exports.getAverageRating = async (req, res) => {
          try{

             // get courseID 
      const courseId = req.body.courseId;

      //calculate average rating
      const result  = await RatingAndReview.aggregate([
           {
            $match:{
                course:new mongoose.Types.ObjectId(courseId),
             },
           },
           {
            $group:{
                _id:null,
                averageRating:{$avg: "$rating"},
            }
           }
      ])


      //return rating
      if(result.length > 0){
        return res.status(200).json({
            success:false,
            averageRating: result(0).averageRating,
        })
      }


      // if no rating/Review exists
      return res.status(200).json({
        success:true,
        message:"Average Rating is 0,no ratings given till now"
      })

          }catch(error){
 return res.status(500).json({
        success:false,
        message:error.message,

          });


}
     


}



//getAllRatingAndReviews 
exports.getAllRating  = async (req, res) => {
    try{
     const allReviews  = await RatingAndReview.find({})
                                               .sort({rating:"desc"})
                                               .populate({
                                                path:"user",
                                                select:"firstName lastName email image",
                                               })
                                                .populate({
                                                    path:"course",
                                                    select:"courseName",
                                                }).exec();

                        return res.status(200).json({
                            success:true,
                            message:"All reviews fetched sucessfully",
                            data:allReviews,
                        });      

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })

    }
}