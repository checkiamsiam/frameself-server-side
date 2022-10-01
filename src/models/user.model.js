const mongoose = require("mongoose");
const validator = require("validator");
const beforeSaveUser = require("../middleware/beforeSaveUser");
const { ObjectId } = mongoose.Schema.Types;

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "must be require"],
      trim: true,
      minLength : [3 , "it must be between 3 to 30 characters"] , 
      maxLength : [30 , "it must be between 3 to 30 characters"]
    },
    lastName: {
      type: String,
      required: [true, "must be require"],
      trim: true,
      minLength : [3 , "it must be between 3 to 30 characters"] , 
      maxLength : [30 , "it must be between 3 to 30 characters"]
    },
    username: {
      type: String,
      trim: true,
      unique: true ,
      lowercase : true ,
    },
    email: {
      type: String,
      unique : true , 
      validate: [validator.isEmail, "provide a valid email"],
      lowercase : true ,
    },
    password: {
      type: String,
      required: true,
      minLength : [8 , "password must be 8 character"]
    },
    profilePhoto: {
      type: String,
      default: "https://simgbb.com/avatar/72JS4g8c8nch.jpg",
      validate: [validator.isURL , "provide a valid profile url"],
    },
    coverPhoto: {
      type: String,
      default: "https://simgbb.com/avatar/72JS4g8c8nch.jpg",
      validate: [validator.isURL , "provide a valid profile url"],
    },
    gender: {
      type: String,
      trim: true,
      required: [true, "gender required"],
      enum: {
        values: ["male", "female", "transgender"],
        message: "gender can't be {VALUE} . must be male/female/transgender",
      },
    },
    birthYear: {
      type: Number,
      trim: true,
      required: [true, "birth year require"],
      validate: {
        validator: (value) => {
          const date = new Date();
          const validYear = date.getFullYear() - 18;
          if (value <= validYear && value > 0) {
            return true;
          } else {
            return false;
          }
        },
        message: "birth year can't be {VALUE}",
      },
    },
    birthMonth: {
      type: Number,
      trim: true,
      required: [true, "birth month require"],
      min: [1, "not a valid month number"],
      max: [12, "not a valid month number"],
    },
    birthDay: {
      type: Number,
      required: [true, "birth day required"],
      trim: true,
      min: [1, "not a valid day number"],
      max: [31, "not a valid day number"],
    },
    verified: {
      type: Boolean,
      default: false,
    },
    friends: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    followers: {
      type: Array,
      default: [],
    },
    friedRequests: {
      type: Array,
      default: [],
    },
    search: [
      {
        user: {
          type: ObjectId,
          ref: "User",
        },
      },
    ],
    details: {
      bio: {
        type: String,
      },
      otherName: {
        type: String,
      },
      jobs: {
        type: String,
      },
      workplace: {
        type: String,
      },
      highSchool: {
        type: String,
      },
      college: {
        type: String,
      },
      currentCity: {
        type: String,
      },
      homeCity: {
        type: String,
      },
      relationship: {
        type: String,
        trim: true,
        enum: {
          values: ["single", "in a relationship", "married", "engaged", "divorced"],
          message: "relationship status can't be {VALUE} . must be single/in a relationship/married/engaged/divorced",
        },
      },
      instagram: {
        type: String,
      },
    },
    savedPost: [
      {
        post: {
          type: ObjectId,
          ref: "Post",
        },
        savedAt: {
          type: Date,
          default: new Date(),
        },
      },
    ],
  },

  { timestamp: true }
);

userSchema.pre('save', beforeSaveUser);


const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
