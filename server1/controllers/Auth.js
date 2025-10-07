const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenetator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt  = require("jsonwebtoken");
const Profile = require("../models/Profile");
const { sendVerificatioEmail } = require("../models/OTP"); 

 
/////////////////////////////////////////////////////////////////////////////////////////////////
exports.sendOTP = async (req, res) => {
  try {
    const email  = req.body.email;
    console.log("📩 Email received from request:", email);

    // Check if user is already present
    // Find user with provided email
    const checkUserPresent = await User.findOne({ email })
    // to be used in case of signup

    // If user found with provided email
    if (checkUserPresent) {
      // Return 401 Unauthorized status code with error message
      return res.status(401).json({
        success: false,
        message: `User is Already Registered`,
      })
    }

    var otp = otpGenetator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    })
    const result = await OTP.findOne({ otp: otp })
    console.log("Result is Generate OTP Func")
    console.log("OTP", otp)
    console.log("Result", result)
    while (result) {
      otp = otpGenetator.generate(6, {
        upperCaseAlphabets: false,
      })
    }
    const otpPayload = { email, otp }
    const otpBody = await OTP.create(otpPayload)
    console.log("OTP Body", otpBody)
    res.status(200).json({
      success: true,
      message: `OTP Sent Successfully`,
      otp,
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ success: false, error: error.message })
  }
}



//signup
exports.signUp = async (req,res) => {
  try{
       //fetch data from request body
       const { firstName,
               lastName,
               email,
               password,
               confirmPassword,
               accountType,
               contactNumber,
               otp
              } = req.body;

       //validte kro data ki
       if(!firstName || !lastName || !email || !password ||
        !confirmPassword || !otp) {
          return res.status(403).json({
            success:false,
            message:"All fields are required",
          })
        }

       // check both password ,confirmPassword or match both are same
       if(password !== confirmPassword) {
        return res.status(400).json({
          success:false,
          message:"Please Enter Same password in both password fields"
        })
       }


       //check user already exists or not
       const existingUser = await User.findOne({email});
       if(existingUser){
        return res.status(400).json({
          success:false,
          message:"User already rigistered from this email"
        })
       }


       //  find most recent otp stored for the user
       const recentOTP = await OTP.findOne({email}).sort({createdAt:-1}).limit(1);
       console.log(recentOTP);

       //validate otp
      if(recentOTP.length === 0  || otp !== recentOTP.otp ){
        //OTP not found
        return res.status(400).json({
          success:false,
          message:"Invalid OTP"
        });
      } 
    //   else if(otp !== recentOTP[0].otp) {
    //   // Invalid OTP
    //   return res.status(400).json({
    //     success: false,
    //     message: "The OTP is not valid",
    //   })
    // }

       //hash password
       const hashedPassword = await bcrypt.hash(password, 10);
       
       //create passsword in database

       const profileDetails = await Profile.create({
        gender:null,
        dateOfBirth:null,
        abour:null,
        contactNumber:null,
       })


       const user = await User.create({
        firstName, lastName,
         email, contactNumber, 
         password:hashedPassword, accountType,
          additionalDetails:profileDetails._id,
          image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,

       })
       //return response
         return res.status(200).json({
          success:true,
          message:"User is Registered Successfuly",
          user,
         })

  }catch(error){
   console.log(error);
   return res.status(500).json({
    success:false,
    message:"Something went wrong in Signing Up,please try again "
   })
  }
}




//login

exports.login = async (req,res) => {
  try{
 //fetch data from request body
 const {email,password} = req.body;

   //validate data
   if(!email || !password){
    return res.status(401).json({
      success:false,
      message:"All fields are required , pleasee try again",
    });
   }

   //check if user exists or  not
   const user = await User.findOne({email});
   if(!user){
    return res.status(401).json({
      success:false, 
      message:"User is not Registered with Us ,please SignUp first"
    })
   }

   //generate JWT, after password matching
    if(await bcrypt.compare(password,  user.password)){
      const payload  = {
        email:user.email,
        id:user._id,
        accountType:user.accountType,
      }
    

    const token = jwt.sign(payload, process.env.JWT_SECRET,{
      expiresIn:"24h",
    }
    );
     
    //  if(await bcrypt.compare(password, user.password)){
    //   const token =jwt.sign(
    //     {email:user.email, id:user._id, accountType:user.accountType},
    //     process.env.JWT_SECRET,
    //     {
    //       expiresIn:"24h",
    //     }
    //   );
      // save token to user document in database
      // user.token=token,
      // user.password=password,
     

   //create cookie and send response
    const options = {
    expires: new Date(Date.now() + 3*24*60*60*1000),
    httpOnly:true,
   }
   res.cookie("token", token, options).status(200).json({
    success:true,
    token,
    user,
    message:"Logged in  successfully",
   })

  }else{
    return res.status(401).json({
      success:false,
      message:"Password is Incorrect"
    })
  }
 
  }catch(error){
    console.log(error);
    return res.status(500).json({
      success:false,
      message:"Login Failure , please try again"
    })
  }
}
  



// H.W.

// Controller for Changing Password
exports.changePassword = async (req, res) => {
  try {
    // Get user data from req.user
    const userDetails = await User.findById(req.user.id)

    // Get old password, new password, and confirm new password from req.body
    const { oldPassword, newPassword } = req.body

    // Validate old password
    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    )
    if (!isPasswordMatch) {
      // If old password does not match, return a 401 (Unauthorized) error
      return res
        .status(401)
        .json({ success: false, message: "The password is incorrect" })
    }

    // Update password
    const encryptedPassword = await bcrypt.hash(newPassword, 10)
    const updatedUserDetails = await User.findByIdAndUpdate(
      req.user.id,
      { password: encryptedPassword },
      { new: true }
    )

    // Send notification email
    try {
      const emailResponse = await mailSender(
        updatedUserDetails.email,
        "Password for your account has been updated",
        passwordUpdated(
          updatedUserDetails.email,
          `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
        )
      )
      console.log("Email sent successfully:", emailResponse.response)
    } catch (error) {
      // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
      console.error("Error occurred while sending email:", error)
      return res.status(500).json({
        success: false,
        message: "Error occurred while sending email",
        error: error.message,
      })
    }

    // Return success response
    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" })
  } catch (error) {
    // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
    console.error("Error occurred while updating password:", error)
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating password",
      error: error.message,
    })
  }
}






























