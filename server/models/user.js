import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema( {
    username: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },

    role: {
        type:String, 
        default:"Employee"
    },

    Name:String, 
    Address:String,
    PhoneNumber:String,

    EmploymentHistory: [
        {
            department:String,
            position:String,
            period:String,
            startDate:Date,
            endDate:Date
        }
    ]

    
})

const User = mongoose.model("User", userSchema)
export default User;