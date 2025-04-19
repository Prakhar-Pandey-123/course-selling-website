const SubSection=require("../models/SubSection");
const Section=require("../models/Section");
const {uploadImageToCloudinary}=require("../utils/imageUploader");
require("dotenv").config();
//create subsection which is bascially a video
exports.createSubSection=async function(req,res){
    try {
//fetch data from req body(sectionid in which the subsection need to be inserted)
        const{sectionId,title,timeDuration,description}=req.body
//extract the video from file
const video=req.files.videoFile;
        //validate data
        if(!sectionId|| !title || !timeDuration || !description)
            return res.status(400).json({
        success:false,
        message:"all fields are required"
    })
//upload video to cloudinary we can upload videos too
const uploadDetails=await uploadImageToCloudinary(video,process.env.FOLDER_NAME)
//create a subsection
const subSectionDetails=await SubSection.create({
    title:title,
    timeDuration,
    description,
    videoUrl:uploadDetails.secure_url
})
//update the section with this subsection object id
const updatedSection=await Section.findByIdAndUpdate(sectionId,
    {
//{_id:sectionId}= sending this is wrong as findbyid expects a direct id not an object 
        $push:{
            subSection:subSectionDetails._id
        },
    },{new:true}
).populate("subSection");
//return response    
return res.status(200).json({
    success:true,
    message:"sub section created successfully",
    updatedSection,
})
} catch (error) {
    return res.status(500).json({
        success:false,
        message:"sub section can't be created",
        error:error.message
    })      
    }
}
//hw:updateSubSection
exports.updatedSubSection=async function(req,res){
    try{
        //get data
        const {subSectionId,sectionId,newtitle}=req.body;
        //validate data
        if(!subSectionId || !sectionId || !newtitle){
           return res.status(400).json({
            success:false,
            message:"we need all the fields"
           })
        }

       const updatedSubSection= await SubSection.findByIdAndUpdate(subSectionId,{
            title:newtitle,
        },{new:true})
        if(!updatedSubSection)
        {
            return res.status(500).json({
                success:true,
                message:"cannot updated the subsection"
            })
        }
        return res.status(200).json({
            success:true,
            message:"updated the subsection",
            updatedSubSection,
        })

    }
    catch(e){
        return res.status(500).json({
            success:false,
            message:"internal error can't update the section",
        })
    }
}
//hw:deleteSubSection
exports.deletedSubSection=async function(req,res){
    
}