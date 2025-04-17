const mongoose=require("mongoose");

const courseSchema=new mongoose.Schema({
    courseName:{
        type:String,
        trim:true,
    },
    courseDescription:{
        type:String,
        trim:true,
    },
//User is the model name of the schema in the User.js file
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User", 
        required:true
     },
    whatYouWillLearn:{
        type:String
    },
    courseContent:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Section"
    },
    ratingAndReviews:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"RatingAndReview"
    },
    price:{
        type:Number
    },
    thumbnail:{
        type:String,
    },
    category:{//maybe there should be a tag
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    studentsEnrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }],
})
module.exports=mongoose.model("Course",courseSchema);