const Tag = require("../models/category");
const User = require("../models/User");
const Course = require("../models/Course");
const {uploadImageToCloudinary} = require("../utils/imageUploader");
const Section = require("../models/Section");
const SubSection  = require("../models/SubSection")

const Category = require("../models/category")
// Add this import at the top of the file
const { convertSecondsToDuration } = require("../utils/secToDuration");
const CourseProgress = require("../models/CourseProgress"); // <-- ADD THIS LINE

//createCoursehandller function
exports.createCourse = async (req,res) => {

//      try{
//         //fetch data
//         const {courseName, courseDescription, whatYouWillLearn, price, tag, status, category} = req.body;

//          // Get thumbnail image from request files
//           const thumbnail = req.files.thumbnailImage
//           // console.log(thumbnail);

//        //validation
//        if(!courseName ||  !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail){
//         return res.status(400).json({
//             success:false,
//             message:"All fields are required",
//         });
//        }
//        //check for instructor
//        const userId = req.user.id;
//        const instructorDetails = await User.findById(userId);
//        console.log("Instructor Details: ",instructorDetails);

//        if(!instructorDetails){
//         return res.status(404).json({
//             success:false,
//             message:"Innstructor Details not found",
//         });
//        }

// //  // ✅ **FIX: Validate the Category ID**
// //     // (Assuming your Category model is named 'Category')
// //     const categoryDetails = await Category.findById(category);
// //     if (!categoryDetails) {
// //         return res.status(404).json({
// //             success: false,
// //             message: "Category Details not found",
// //         });
// //     }


//     //check given tag is valid or not
//     const tagDetails = await Tag.findById(tag);
//     if(!tagDetails){
//           return res.status(404).json({
//             success:false,
//             message:"Tag Details not found",
//         });
//     }

//     //upload image to cloudinary
//     // thumbnail
//     const thumbnailImage = await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);

//     //create an entry for new course
//     const newCourse = await Course.create({
//         courseName,
//         courseDescription,
//         instructor:instructorDetails._id,
//         whatYouWillLearn:whatYouWillLearn,
//         price,
//         tag:tagDetails._id,
//         thumbnail:thumbnailImage.secure_url,
//         category,
//         status,
        
//     })
//     //add the new course to the schema of instructor
//     await User.findByIdAndUpdate(
//     {_id: instructorDetails._id},
//     {
//         $push:{
//             courses:newCourse._id,
//         }
//     },
//     {new:true},
//     );

//     //Update the tag ka schema -> H.W.
//     //TODO : HW 

//     //return response
//      return res.status(200).json({
//             success:true,
//             message:"Course created successfully",
//             data:newCourse,
//      });


//      }catch(error){
//         console.log(error);
//         return res.status(500).json({
//             success:false,
//             message:"Cannot upload image to cloude",
//             error:error.message,
            
//         })
//      }

















 try {
    // Get user ID from request object
    const userId = req.user.id

    // Get all required fields from request body
    let {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag=[],
      category,
      status,
      instructions=[],
    } = req.body
    // Get thumbnail image from request files
    const thumbnail = req.files.thumbnailImage

    // Convert the tag and instructions from stringified Array to Array
    // const tag = JSON.parse(_tag)
    // const instructions = JSON.parse(_instructions)

    console.log("tag", tag)
    console.log("instructions", instructions)

    // Check if any of the required fields are missing
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag.length ||
      !thumbnail ||
      !category ||
      !instructions.length
    ) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Mandatory",
      })
    }
    if (!status || status === undefined) {
      status = "Draft"
    }
    // Check if the user is an instructor
    const instructorDetails = await User.findById(userId, {
      accountType: "Instructor",
    })

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor Details Not Found",
      })
    }

    // Check if the tag given is valid
    const categoryDetails = await Category.findById(category)
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category Details Not Found",
      })
    }
    // Upload the Thumbnail to Cloudinary
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    )
    console.log(thumbnailImage)
    // Create a new course with the given details
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn: whatYouWillLearn,
      price,
      tag,
      category: categoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
      status: status,
      instructions,
    })

    // Add the new course to the User Schema of the Instructor
    await User.findByIdAndUpdate(
      {
        _id: instructorDetails._id,
      },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    )
    // Add the new course to the Categories
    const categoryDetails2 = await Category.findByIdAndUpdate(
      { _id: category },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    )
    console.log("HEREEEEEEEE", categoryDetails2)
    // Return the new course and a success message
    res.status(200).json({
      success: true,
      data: newCourse,
      message: "Course Created Successfully",
    })
  } catch (error) {
    // Handle any errors that occur during the creation of the course
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: error.message,
    })
  }






}







   //getAllCourses handler function 
exports.getAllCourses = async (req,res) => {
    try{  
    const courses = await Course.find();

    //return response
    return res.status(200).json({
        success:true,
        count:courses.length,
        data:courses,
    })
}catch(error){
    console.log(error);
    return res.status(500).json({
        success:false,
        message:"Server Error ,cannot get all courses , please try again",

    });
}
}

    //getCourseDetails handler function 
   exports.getCourseDetails  =async (req, res) => {
    try{
        //get id
        const {courseId} = req.body;
        //find course details
        const courseDetails = await Course.findOne(
                                          {_id:courseId})
                                          .populate(
                                            {
                                                path:"instructor",
                                                populate:{
                                                       path:"additionalDetails",
                                                },
                                            }
                                        )
                                        .populate("category")
                                        // .populate("ratingAndReviews")
                                        .populate({
                                            path:"courseContent",
                                            populate:{
                                                path:"subSection",
                                                select:"videoUrl",
                                            },
                                        })
                                        .exec();

    // // ✅ LOG 3: See what the database returned
    // console.log("DATABASE found this result ->", courseDetails);

        //Validation 
        if(!courseDetails ){
            return res.status(400).json({
                success:false,
                message:`Could not find the course with id:  ${courseId} `,
            });
        }

        //return response
        return res.status(200).json({
            success:true,
            message:"Course Details fethed successfully",
            data:{
              courseDetails:courseDetails
            },
        })
      

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Cannot fetch course data",
            error:error.message,
        })
    }
   }


  //get full coourse details
  exports.getFullCourseDetails = async (req, res) => {
  try {
     console.log("--- STEP 1: Controller reached ---");
    const { courseId } = req.body
    const userId = req.user.id
     console.log("--- STEP 2: Body and User ID:", { courseId, userId });

    console.log("--- STEP 3: Executing Course.findOne query ---");
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()
console.log("--- STEP 4: Course.findOne query successful ---");

    let courseProgressCount = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    })
     
    console.log("--- STEP 5: CourseProgress.findOne query successful ---");
    console.log("courseProgressCount : ", courseProgressCount)

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }

    // if (courseDetails.status === "Draft") {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Accessing a draft course is forbidden`,
    //   });
    // }



    let totalDurationInSeconds = 0;

    console.log("--- STEP 6: Starting duration calculation ---");
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      });
    
    })
      console.log("--- STEP 7: Duration calculation complete ---");

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
    console.log("--- STEP 8: All checks passed. Sending final response. ---");

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideos
          ? courseProgressCount?.completedVideos
          : [],
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}


// Get a list of Course for a given Instructor
exports.getInstructorCourses = async (req, res) => {
  try {

    // ✅ ADD THIS LINE EXACTLY AS IT IS
    console.log("--- GET INSTRUCTOR COURSES CONTROLLER REACHED ---");

    // Get the instructor ID from the authenticated user or request body
    const instructorId = req.user.id

    // Find all courses belonging to the instructor
    const instructorCourses = await Course.find({
      instructor: instructorId,
    }).sort({ createdAt: -1 })

    // Return the instructor's courses
    res.status(200).json({
      success: true,
      data: instructorCourses,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    })
  }
}


// Delete the Course
exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body

    // Find the course
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }

    // Unenroll students from the course
    const studentsEnrolled = course.studentsEnrolled
    for (const studentId of studentsEnrolled) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      })
    }

    // Delete sections and sub-sections
    const courseSections = course.courseContent
    for (const sectionId of courseSections) {
      // Delete sub-sections of the section
      const section = await Section.findById(sectionId)
      if (section) {
        const subSections = section.subSection
        for (const subSectionId of subSections) {
          await SubSection.findByIdAndDelete(subSectionId)
        }
      }

      // Delete the section
      await Section.findByIdAndDelete(sectionId)
    }

    // Delete the course
    await Course.findByIdAndDelete(courseId)

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}



// Edit Course Details
exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.body
    const updates = {...req.body};
    const course = await Course.findById(courseId)

    if (!course) {
      return res.status(404).json({ error: "Course not found" })
    }

    // If Thumbnail Image is found, update it
    if (req.files) {
      console.log("thumbnail update")
      const thumbnail = req.files.thumbnailImage
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      )
      course.thumbnail = thumbnailImage.secure_url
    }

    // Update only the fields that are present in the request body
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        if (key === "tag" || key === "instructions") {
          course[key] = JSON.parse(updates[key])
        } else {
          course[key] = updates[key]
        }
      }
    }

    await course.save()

    const updatedCourse = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    res.json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}





// ✅ ADD THIS NEW CONTROLLER FUNCTION
exports.enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    // Find the course and enroll the student
    const enrolledCourse = await Course.findOneAndUpdate(
      { _id: courseId },
      { $push: { studentsEnrolled: userId } },
      { new: true }
    );

    if (!enrolledCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Find the student and add the course to their list of enrolled courses
    await User.findByIdAndUpdate(
      userId,
      { $push: { courses: courseId } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Enrolled in course successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to enroll in course",
    });
  }
};