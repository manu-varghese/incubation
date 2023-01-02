const asyncHandler = require("express-async-handler");
const { trusted, Types } = require("mongoose");
const AdminModel = require("../models/admin");
const Application = require("../models/application");
const Slots = require("../models/slot");
const User = require('../models/user')
const { generateAdminToken } = require("../utils/generateToken");

const adminLogin = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const Admin = await AdminModel.findOne({ email: email });
    if (!Admin) {
      res.json("Admin not found");
    } else {
      if (Admin.password !== password) {
        res.json("Please check your password");
      } else {
        let id = Admin._id;
        let tokenGenereted = await generateAdminToken(id);
        res.cookie("adminToken", tokenGenereted).json({
          id: Admin._id,
          email: Admin.email,
          token: tokenGenereted,
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(error?.status).json(error.message);
  }
});

const getCompanies = asyncHandler(async (req, res) => {
  try {
    const data = await Application.aggregate([
      {
        $match: {
          isApproved: false,
        },
      },
    ]);
    // console.log(data);
    res.json(data);
  } catch (error) {
    res.status(error.status).json(error.message);
  }
});

const applicationApprove = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const data = await Application.findByIdAndUpdate(
      { _id: id },
      { isApproved: true }
    );
    res.json({ status: true });
  } catch (error) {
    res.status(error.status).json(error.message);
  }
});

const getAllCompanies = asyncHandler(async(req,res)=>{
  try {
    const companyData = await Application.find()
    res.json(companyData)
  } catch (error) {
    res.status(error.status).json(error.message)
  }
})

const getApprovedCompanies = asyncHandler(async(req,res)=>{
  try {
    const approvedData = await Application.find({isApproved:true,isBooked:false})
    res.json(approvedData)
  } catch (error) {
    res.status(error.status).json(error.message)
  }
})

const bookSlot = asyncHandler(async(req,res)=>{
  try {
    const {slotName,company,position, isAlloted,id} = req.body;
    console.log(slotName,company,position,isAlloted,id);
    let hi = await Application.updateOne({company_name:company},{$set:{isBooked:true}})
    console.log(hi);
    const slotBooked = await Slots.updateOne({},{$set:{[`${slotName}.${position}.company`]:company,[`${slotName}.${position}.isAlloted`]:isAlloted}})
    res.json({status:true})
  } catch (error) {
    res.status(error.status).json(error.message)
  }
})

const getSlots = asyncHandler(async(req,res)=>{
  try {
    const getSlots = await Slots.find()
    res.json(getSlots)
  } catch (error) {
    res.status(error.status).json(error.message)
  }
})

const blockUser = asyncHandler(async(req,res)=>{
  try {
    let id = req.params.id
    await User.findByIdAndUpdate({_id:Types.ObjectId(id)},{isBlocked:true})
    res.json({status:true})
  } catch (error) {
    res.status(error.status).json(error.message)
  }
})
const unblockUser = asyncHandler(async(req,res)=>{
  try {
    let id = req.params.id
    await User.findByIdAndUpdate({_id:Types.ObjectId(id)},{isBlocked:false})
    res.json({status:true})
  } catch (error) {
    res.status(error.status).json(error.message)
  }
})

module.exports = { adminLogin, getCompanies, applicationApprove ,getAllCompanies,getApprovedCompanies ,bookSlot,getSlots,blockUser,unblockUser};


