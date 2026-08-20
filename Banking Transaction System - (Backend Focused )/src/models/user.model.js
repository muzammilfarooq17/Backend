const mongoose = require('mongoose');
const bcrypt = require('bcrypt')


const userSchema = new mongoose.Schema({
    email:{
        type:String,
        require:[true,"Email is Required For Ceating an Account"],
        trim:true,
        lowercase:true,
        match:[/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"Invalid Email Address"],
        unique:[true,"Email Already Exists"],
    },
    name:{
        type:String,
        require:[true,"Name Is Required For Creating an Account"],
    },
    password:{
        type:String,
        require:[true,"Password Is Required For Creating an Account"],
        minlenght:[6,"Password Should Contain 6 Or More Character"],
        select:false,
    },
},{
    timestamps:true
})

userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        return next()
    }

    const hash = await bcrypt.hash(this.password,10)
    this.password = hash;

    return next()

})

userSchema.method.comparePassword = async function(password){
    return await bcrypt.compare(password , this.password)
}


const userModel = mongoose.model("user",userSchema)


module.exports = userModel;