const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true, //will remove whitespace from username if someone has typed it
        minlength:3
    },
},{
    timestamps:true,
})

const user=mongoose.model('User',userSchema);

module.exports=user;