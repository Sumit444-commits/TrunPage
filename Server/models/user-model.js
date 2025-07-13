import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile_url: {
    type: String,
    default:
      "https://st5.depositphotos.com/93148482/79102/i/450/depositphotos_791023232-stock-photo-book-character-clip-art-cute.jpg",
  },
  sales: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sale",
    },
  ],
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.generateToken = async function (next) {
  try {
    const token = jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_TOKEN_SECERT,
      { expiresIn: "1h" }
    );
    return token;
  } catch (error) {
    console.log("error in user model: ", error);

    next(error);
  }
};

userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) {
    next();
  }
  try {
    const saltRound = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(user.password, saltRound);

    user.password = hashed_password;
  } catch (error) {
    console.log("error failed to hash the password");
  }
});

userSchema.methods.comparePassword = async function (passwod) {
  try {
    return await bcrypt.compare(passwod, this.password);
  } catch (error) {
    console.log("error from me", error);
  }
};

export const User = new mongoose.model("User", userSchema);
