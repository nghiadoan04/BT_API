const User = require("../models/user")

exports.createUser = async(req,res)=>{
    try{
        const user = await User.create(req.body)
        res.json(user)
    }catch(err){
        res.status(500).json(err)
    }
}

exports.getAllUsers = async(req,res)=>{
    try{

        const keyword = req.query.username

        let filter = {deleted:false}

        if(keyword){
            filter.username = {$regex:keyword,$options:"i"}
        }

        const users = await User.find(filter).populate("role")

        res.json(users)

    }catch(err){
        res.status(500).json(err)
    }
}

exports.getUserById = async(req,res)=>{
    try{

        const user = await User.findById(req.params.id).populate("role")

        res.json(user)

    }catch(err){
        res.status(500).json(err)
    }
}

exports.updateUser = async(req,res)=>{
    try{

        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        )

        res.json(user)

    }catch(err){
        res.status(500).json(err)
    }
}

exports.deleteUser = async(req,res)=>{
    try{

        await User.findByIdAndUpdate(
            req.params.id,
            {deleted:true}
        )

        res.json({message:"User deleted"})

    }catch(err){
        res.status(500).json(err)
    }
}

exports.enableUser = async(req,res)=>{
    const {email,username} = req.body

    const user = await User.findOne({email,username})

    if(!user){
        return res.status(404).json({message:"User not found"})
    }

    user.status = true
    await user.save()

    res.json(user)
}

exports.disableUser = async(req,res)=>{
    const {email,username} = req.body

    const user = await User.findOne({email,username})

    if(!user){
        return res.status(404).json({message:"User not found"})
    }

    user.status = false
    await user.save()

    res.json(user)
}