
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please add a name"]
        },
        email: {
            type: String,
            required: [true, "Please add an email"],
            unique: true,
            trim:true,
            match: [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "Please enter a valid e-mail address"
            ]
        },
        password: {
            type: String,
            required: [true, "Please add a password"],
            minLength: [6, "Password must be at least 6 characters"],
            //maxLength: [23, "Password must be at most 23 characters"],
        },
        photo: {
            type: String,
            required: [false, "Please add a profile picture"],
            default: ""
        },
        phone: {
            type: String,
            default: "+91"
        },
        bio: {
            type: String,
            maxLength: [255, "Bio must not be more than 255 characters"],
            default: "bio"
        }
    },
    {
        timestamps: true,
    }
);
userSchema.pre("save", async function(next){
   if(!this.isModified("password")) {
    return next();
   }
     //encrypt the password
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(this.password, salt);
   this.password = hashedPassword;

   next();
   
})
const User = mongoose.model('User', userSchema);
module.exports = User;