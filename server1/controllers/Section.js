const Section=  require("../models/Section");
const Course  = require("../models/Course");
const SubSection = require("../models/SubSection");



//Create section ka handler
// to create Section 
exports.createSection = async (req, res) => {
    try{

     //fetch data
     const {sectionName, courseId} = req.body;

     //validate data
     if(!courseId || !sectionName){
        return res.status(400).json({
            success:false,
            message:"All Fields are required"
        });
     }
     // create Section
     const newSection = await Section.create({sectionName});

     //update course with section objectID
     const updateCourseDetails = await Course.findByIdAndUpdate(
                                            courseId, {
                                                $push:{
                                                    courseContent: newSection._id,
                                                },
                                            },
                                           {new:true})
                                           .populate({
                                            path: "courseContent",
                                            populate:{
                                                path:"subSection",
                                            },
                                        }).exec();


      //return response
      return res.status(200).json({
        success:true,
        message:"Section created Successfully",
        updateCourseDetails,
      })


    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Cannot Create Section ,please try again",
            error:error.message,
        })
    }
}


  //Update section ka handler

      //To Update Section 
exports.updateSection = async (req,res)  => {
    try{
 
     //fetch data
     const {sectionName, sectionId , courseId} = req.body;

     //validate data
     if(!sectionName || !sectionId){
        return res.status(400).json({
            success:false,
            message:"All Fields are required"
        })
     }
     //update data
     const section  = await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true});

     const course = await Course.findById(courseId)
                                 .populate({
                                    path:"courseContent",
                                    populate:{
                                        path:"subSection",
                                    },
                                 })
                                 .exec()
      console.log(course);
     //return res
     return res.status(200).json({
        success:true,
        message:"Section Updated Successfully", section,
        data:course,
     })



    } catch(error){
            console.log(error);
            return res.status(500).json({
                success:false,
                message:"Cannot Update Section ,Please try again",
                error:error.message,
            })
        }

}




//Delete section ka handler

//To delete the section 
exports.deleteSection = async(req,res) => {
 
     try {
    const { sectionId, courseId } = req.body
    await Course.findByIdAndUpdate(courseId, {
      $pull: {
        courseContent: sectionId,
      },
    })
    const section = await Section.findById(sectionId)
    console.log(sectionId, courseId)
    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      })
    }
    // Delete the associated subsections
    await SubSection.deleteMany({ _id: { $in: section.subSection } })

    await Section.findByIdAndDelete(sectionId)

    // find the updated course and return it
    const course = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    res.status(200).json({
      success: true,
      message: "Section deleted",
      data: course,
    })
  } catch (error) {
    console.error("Error deleting section:", error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }


  

}
 