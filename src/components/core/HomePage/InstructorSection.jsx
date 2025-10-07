// import React from 'react'
// import InstructorImage from "../../../assets/Images/Instructor.png"
// import CTAButton from "../HomePage/Button"
// import HighlightText from '../HomePage/HighlightText'
// import { FaArrowRight } from 'react-icons/fa'

// const InstructorSection = () => {
//   return (
//     <div>

//         <div  className='flex flex-row gap-20 items-center'>
        
//          <div className=' w-[50%] '>
//             <img 
//             src={InstructorImage} />
//          </div>

//          <div className='w-[50%] flex flex-col gap-10'>
//             <div className='text-4xl font-semibold w-[50%]'>
//                 Become an 
//                 <HighlightText text={"Instructor"}/>
//             </div>
//             <p className='font-medium text-[16px] w-[80%] text-richblack-300'>
//                 Instructor from around the world teach milliions of students on studyNotion.
//                 We provide the tools and skills to teach what you love.
            
//             </p>

//             <div className='w-fit'>
//             <CTAButton active={true} linkto={"/signup"}>
//                     <div className='flex flex-row  gap-2 items-center'>
//                     Start teaching Today 
//                      <FaArrowRight/>
//                      </div>
                   
//                 </CTAButton>
//                 </div>

//          </div>
//          </div>


//     </div>
//   )
// }

// export default InstructorSection
















import React from 'react'
import CTAButton from "../../../components/core/HomePage/Button";
import { FaArrowRight } from "react-icons/fa";
import Instructor from "../../../assets/Images/Instructor.png";
import HighlightText from './HighlightText';

const InstructorSection = () => {
  return (
    <div>
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-[50%]">
            <img
              src={Instructor}
              alt=""
              className="shadow-white shadow-[-20px_-20px_0_0]"
            />
          </div>
          <div className="lg:w-[50%] flex gap-10 flex-col">
            <h1 className="lg:w-[50%] text-4xl font-semibold ">
              Become an
              <HighlightText text={"instructor"} />
            </h1>

            <p className="font-medium text-[16px] text-justify w-[90%] text-richblack-300">
              Instructors from around the world teach millions of students on
              StudyNotion. We provide the tools and skills to teach what you
              love.
            </p>

            <div className="w-fit">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-3">
                  Start Teaching Today
                  <FaArrowRight />
                </div>
              </CTAButton>
            </div>
          </div>
        </div>
    </div>
  )
}

export default InstructorSection