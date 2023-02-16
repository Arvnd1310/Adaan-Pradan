const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const User_S=new Schema(
    {
        email:{
            type:String,
        },
        password:{
            type:String,
        }
    },
    {timestamps:true},
);
User=mongoose.model('users',User_S)

const clg=new Schema(
    {
        name:{
            type:String,
            lowercase:true,
        },
        subjects:{
            type:Array,
            default:[]
        },
        address:{
            add:{type:String,lowercase:true},
            city:{type:String,lowercase:true}
        },
        price:{
            type:Number,
        }
    },
    {timestamps:true},
)

createUser=async(req,res)=>{
    const body=req.body
    if(!body){
        return res.status(400).json({
            success:false,
            error:"You must be a user"
        })
    }
    const user=new User(body)

    if(!user){
        return res.status(400).json({success:false,error:err})
    }

    user
        .save()
        .then(()=>{
            return res.status(201).json({
                succes:true,
                id:user._id,
                message:'User create'
            })
        })
        .catch(error=>{
            return res.status(400).json({
                error,
                message:'User not created'
            })
        })
}

getUserByEmailPassword=async(req,res)=>{
    await User.findOne({_id:req.params.id},(err,user)=>{
        if(err){
            return res.status(401).json({success:false,error:err})
        }
        if(!user){
            return res.status(404).json({succes:false,error:"User Not Found"})
        }
        return res.status(200).json({succes:true,data:user})
    }).catch(err=>console.log(err));
}

module.exports={createUser,getUserByEmailPassword}