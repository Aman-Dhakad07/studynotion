import "./App.css";
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import Signup from "./Pages/Signup.jsx";
import {Route,Routes} from "react-router-dom"
import {useState } from "react";
import Navbar from "./components/common/Navbar.jsx";
import ForgotPassword from "./Pages/ForgotPassword.jsx";
import UpdatePassword from "./Pages/UpdatePassword.jsx";
import VerifyEmail from "./Pages/VerifyEmail.jsx";
import PrivateRoute from "./components/core/Auth/PrivateRoute.jsx";
import OpenRoute from "./components/core/Auth/OpenRoute.jsx"
import About from "./Pages/About.jsx";
import MyProfile from "./components/core/Dashboard/MyProfile.jsx";
import Contact from "./Pages/Contact.jsx"
import Error from  "./Pages/Error.jsx"
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses.jsx";
import Cart from "./components/core/Dashboard/Cart/index.jsx"
import Setting from "./components/core/Dashboard/Settings/index.jsx"
import AddCourse from './components/core/Dashboard/AddCourse/index.jsx'
import Catalog from "./Pages/Catalog.jsx";
import ViewCourse from "./Pages/ViewCourse.jsx";


import { ACCOUNT_TYPE } from "./utils/constants.js"
import { useSelector } from "react-redux"
import MyCourses from "./components/core/Dashboard/MyCourses.jsx";
import EditCourse from "./components/core/Dashboard/EditCourse/index.js";
import CourseDetails from "./Pages/CourseDetails.jsx";
import VideoDetails from "./components/core/ViewCourse/VideoDetails.jsx";
import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor.jsx";

function App() {
const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const dispatch = useDispatch()
  // const navigate = useNavigate()
  const { user } = useSelector((state) => state.profile)

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inte">
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home isLoggedIn= {isLoggedIn}/> }  />
      <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
      <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn}/>} />
      <Route path="/forgot-password"  element={<ForgotPassword  setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="/update-password/:id"  element={<UpdatePassword  setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="/verify-email"  element={ <OpenRoute> <VerifyEmail />  </OpenRoute>} />
      <Route path="/about"  element={ <OpenRoute> <About />  </OpenRoute>} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/catalog/:catalogName" element={<Catalog/> }  />
      <Route path="/courses/:courseId" element={<CourseDetails/> }  />


  

     <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          {/* Route for all users */}
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="dashboard/settings"  element ={  <Setting/> } />  
         
          {
           user?.accountType === ACCOUNT_TYPE.STUDENT && (
          <>
          <Route path="dashboard/enrolled-courses" element={<EnrolledCourses/>}   />
          <Route path="dashboard/cart" element={<Cart/>} />
           </>
           )
          }

          {
           user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
          <>
          <Route path="dashboard/add-course" element={<AddCourse/>} />
          <Route path="dashboard/my-courses" element={<MyCourses/>} />
          <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
          <Route path="dashboard/instructor" element={<Instructor/>}   />


           </>
           )
          }

         
        </Route>
        

        <Route element= {
            <PrivateRoute>
            <ViewCourse/>
          </PrivateRoute>
        }>
        {
          user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route 
                path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails/>}
              />
            </>
          )
        }
        </Route>

 {/* Add this nested route inside your Dashboard route */}
        <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses />} />

    <Route path="*" element={<Error/>}/>
    </Routes>
    
    </div>
  );
}

export default App;


// "server":"cd server1 && npm run dev",
// "dev": "concurrently -n \"client,server1\" -c\"bgBlue,bgYellow\" \"npm start\" \"npm run server1\""






