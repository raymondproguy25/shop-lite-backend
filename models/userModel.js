import mongoose from "mongoose";
import bcrypt from"bcryptjs";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  phone: {
    type: Number,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  location: {
    type: String,
    required: true
  } 
}, { timestams: true });

userSchema.pre('save' async function (next) {
 if (!this.isModified('password')) {
  return next();
   const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, salt);
   next();
 }
});

userSchema.methods.matchPassword = async function (enterdPassword) {
  return await bcrypt.compare(enterdPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
