const Role = require("../models/role")
const User = require("../models/user")

exports.createRole = async(req,res)=>{
    const role = await Role.create(req.body)
    res.json(role)
}

exports.getAllRoles = async(req,res)=>{
    const roles = await Role.find({deleted:false})
    res.json(roles)
}

exports.getRoleById = async(req,res)=>{
    const role = await Role.findById(req.params.id)
    res.json(role)
}

exports.updateRole = async(req,res)=>{
    const role = await Role.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )

    res.json(role)
}

exports.deleteRole = async(req,res)=>{
    await Role.findByIdAndUpdate(
        req.params.id,
        {deleted:true}
    )

    res.json({message:"Role deleted"})
}

exports.getUsersByRole = async(req,res)=>{

    const users = await User.find({
        role:req.params.id,
        deleted:false
    })

    res.json(users)
}