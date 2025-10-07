// Import the required modules
const express = require("express")
const router = express.Router()

// Import the Controllers

// Course Controllers Import
const {
  createCourse,
  getAllCourses,
  getCourseDetails,
  getFullCourseDetails,
  editCourse,
  getInstructorCourses,
  deleteCourse,
  enrollCourse,
} = require("../controllers/Course")

// Tags Controllers Import

// Categories Controllers Import
const {
  showAllcategory,
  createCategory,
  categoryPageDetails,
} = require("../controllers/Category")

// Sections Controllers Import
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section")

// Sub-Sections Controllers Import
const {
  createsubSection,
  updateSubSection,
  deleteSubsection,
} = require("../controllers/Subsection")

// Rating Controllers Import
const {
  createRating,
  getAverageRating,
  getAllRating,
} = require("../controllers/RatingAndReview")
const {
  updateCourseProgress,
  getProgressPercentage,
} = require("../controllers/courseProgress")
// Importing Middlewares
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// Courses can Only be Created by Instructors
router.post("/createCourse", auth, isInstructor, createCourse)

// Edit Course routes
router.post("/editCourse", auth, isInstructor, editCourse)

//Add a Section to a Course
router.post("/addSection", auth, isInstructor, createSection)

// Update a Section
router.post("/updateSection", auth, isInstructor, updateSection)

// Delete a Section
router.delete("/deleteSection", auth, isInstructor, deleteSection)

// Edit Sub Section
router.post("/updateSubSection", auth, isInstructor, updateSubSection)

// Delete Sub Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubsection)

// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, createsubSection)

// Get all Courses Under a Specific Instructor
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)

// Get all Registered Courses
router.get("/getAllCourses", getAllCourses)

// Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails)

// Get Details for a Specific Courses
router.post("/getFullCourseDetails", auth, getFullCourseDetails)

// To Update Course Progress
router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress)

// To get Course Progress
router.post("/getProgressPercentage", auth, isStudent, getProgressPercentage)

// Delete a Course
router.delete("/deleteCourse", deleteCourse)

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// TODO: Put IsAdmin Middleware here
router.post("/createCategory", auth, isAdmin, createCategory)
router.get("/showAllcategory", showAllcategory)
router.post("/getCategoryPageDetails", categoryPageDetails)

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", auth, isStudent, createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRating)  // Changed from /getRating to /getReviews
router.get("/getRating", getAllRating);  // Keep old route for backward compatibility



// 2.  ADD THIS NEW ROUTE DEFINITION
router.post("/enrollCourse", auth, isStudent, enrollCourse);

module.exports = router