const User = require("../models/User");
const Profile = require("../models/Profile");
require("dotenv").config();
const {uploadImageToCloudinary} = require("../utils/imageUploader")
const CourseProgress = require("../models/CourseProgress");
const { convertSecondsToDuration } = require("../utils/secToDuration"); // <-- ADD THIS LINE

//we will directly update the profile instead of creating one because there is already 
// a  duplicate profile is created , so we only have to take user's data and insert in that profile

exports.updateProfile = async(req, res) => {
    try{
     //get data
     const {dateOfBirth="", about="", contactNumber="", gender=""} = req.body;

       //get userId
       const id = req.user.id;

       //validation
       if( !dateOfBirth || !contactNumber ||  !gender ){
        return res.status(400).json({
            success:false,
            message:"All fields are required",
        })
       }
       //find profile
       const userDetails = await User.findById(id);
       const profileId = userDetails.additionalDetails();
       const profileDetails  = await Profile.findById(profileId);

       //update profile
       profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
       profileDetails.contactNumber = contactNumber;
       profileDetails.gender = gender;

       //return response
       return res.status(200).json({
        sucess:false,
        message:"Profile Updated SUccessfully",
       })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong, please try again"
        })
    }
}
    

 //Delete account ka handler 
exports.deleteProfile = async(req, res) => {
     try{
         //get id
         const id  = req.user.id;

       //validate
       const  userDetails  = await User.findById(id);
       if(!userDetails){
        return res.status(400).json({
            success:false,
            message:"user details are required"
        })
       }

       //delete  Profile
       await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});

      //TODO: HW -> un-enroll user from all enrolled courses
       //delete user
       await User.findByIdAndDelete({_id:id});

       //return response
       return res.status(200).json({
        success:true,
        message:"Profile deleted Successfullly"
       })




     }catch(error){
        console.log(error);
        return res.staus(200).json({
            success:false,
            message:"Error while deleting account , please try again "
        })
     }
 }
      


//getAllUser ka handler function
exports.getAllUser = async (req,res) => {
    try{
          //get id
          const id  = req.user.id;

          if(!id){
            return res.status(400).json({
                success:false,
                message:"Id is Required to get the user details"
            })
          }
        // validate and get user details
        const userDetails = await User.findById(id)
                                .populate("additionalDetails")
                                .exec();

        //return response
        return res.status(200).json({
              success:true,
              message:"Details of User are: ",
              userDetails,
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Cannot get the details of all users",
        })
    }
}
      

//////////////////////////////////////
exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture
    const userId = req.user.id
    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    )
    console.log(image)
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    )
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      error:error,
    })
  }
}

exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id
    let userDetails = await User.findOne({
      _id: userId,
    })
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .exec()
    userDetails = userDetails.toObject()
    var SubsectionLength = 0
    for (var i = 0; i < userDetails.courses.length; i++) {
      let totalDurationInSeconds = 0
      SubsectionLength = 0
      for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
        totalDurationInSeconds += userDetails.courses[i].courseContent[
          j
        ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
        userDetails.courses[i].totalDuration = convertSecondsToDuration(
          totalDurationInSeconds
        )
        SubsectionLength +=
          userDetails.courses[i].courseContent[j].subSection.length
      }
      let courseProgressCount = await CourseProgress.findOne({
        courseID: userDetails.courses[i]._id,
        userId: userId,
      })
      courseProgressCount = courseProgressCount?.completedVideos.length
      if (SubsectionLength === 0) {
        userDetails.courses[i].progressPercentage = 100
      } else {
        // To make it up to 2 decimal point
        const multiplier = Math.pow(10, 2)
        userDetails.courses[i].progressPercentage =
          Math.round(
            (courseProgressCount / SubsectionLength) * 100 * multiplier
          ) / multiplier
      }
    }

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      })
    }
    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.instructorDashboard = async (req, res) => {
  const Course = require("../models/Course"); // <--ADDING THIS LINE 

  try {

      console.log("--- STEP 1: instructorDashboard controller reached ---");
    console.log("--- STEP 2: Finding courses for instructor ID:");


    const courseDetails = await Course.find({ instructor: req.user.id });

     console.log("--- STEP 3: Courses found. Starting data mapping... ---");

    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = course.studentsEnrolled.length
      const totalAmountGenerated = totalStudentsEnrolled * course.price

      // Create a new object with the additional fields
      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        // Include other course properties as needed
        totalStudentsEnrolled,
        totalAmountGenerated,
      }

      return courseDataWithStats
    })

    res.status(200).json({ courses: courseData })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}



















// exports.instructorDashboard = async (req, res) => {
//   try {
//     const courseDetails = await Course.find({ instructor: req.user.id })

//     const courseData = courseDetails.map((course) => {
//       const totalStudentsEnrolled = course.studentsEnroled.length
//       const totalAmountGenerated = totalStudentsEnrolled * course.price

//       // Create a new object with the additional fields
//       const courseDataWithStats = {
//         _id: course._id,
//         courseName: course.courseName,
//         courseDescription: course.courseDescription,
//         // Include other course properties as needed
//         totalStudentsEnrolled,
//         totalAmountGenerated,
//       }

//       return courseDataWithStats
//     })

//     res.status(200).json({ courses: courseData })
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ message: "Server Error" })
//   }
// }
