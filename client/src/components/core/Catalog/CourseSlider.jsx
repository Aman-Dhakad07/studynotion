// import React from 'react'
// // core version + navigation, pagination modules:
// import { Navigation, Pagination } from 'swiper/modules';
// // import Swiper and modules styles
// import 'swiper/css';
// import 'swiper/css/free-mode';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import {FreeMode} from 'swiper'
// import {Swiper, SwiperSlide } from "swiper/react";

// import Course_Card from './Course_Card';

// const CourseSlider = ({Courses}) => {
//   return (
//     <div>
//       {
//         Courses?.length ? (
//             <Swiper
//             slidesPerView={1}
//             loop={true}>
//          {
//             Courses?.map((course, index) => (
//                 <SwiperSlide key={index}>
//                     <Course_Card course={course} Height={"h-[250px]"} />
//                 </SwiperSlide>
//             ))
//          }
//             </Swiper>
//         ) : (
//             <p> No Course Found</p>
//         )
//       }
//     </div>
//   )
// }

// export default CourseSlider















// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { FreeMode, Pagination } from 'swiper/modules';

import React from "react"
import CourseCard from "./Course_Card"

function CourseSlider({ Courses }) {
  return (
    <>
      {Courses?.length ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          loop={true}
          modules={[FreeMode, Pagination]}
          breakpoints={{
            1024: {
              slidesPerView: 3,
            },
          }}
          className="max-h-[30rem]"
        >
          {Courses?.map((course, i) => (
            <SwiperSlide key={i}>
              <CourseCard course={course} Height={"h-[250px]"} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-richblack-5">No Course Found</p>
      )}
    </>
  )
}

export default CourseSlider