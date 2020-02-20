const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const Project = require("./project");

const userSchema = new mongoose.Schema(
  {
    accessToken: {
      type: String
    },
    email: {
      lowercase: true,
      required: true,
      trim: true,
      type: String,
      unique: true,
      validate: value => {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid.");
        }
      }
    },
    gitHubLogin: {
      type: String
    },
    gitHubPublicRepoCount: {
      type: Number
    },
    name: {
      required: true,
      trim: true,
      type: String
    },
    password: {
      minlength: 7,
      required: true,
      trim: true,
      type: String,
      validate: value => {
        // * Password should contain:
        // * 1. At least 1 uppercase letter
        // * 2. At least 1 lowercase letter
        // * 3. At least 1 letter
        // * 4. At least 1 number
        // * 5. At least 1 special character

        if (value.toLowerCase().includes("password")) {
          throw new Error(`Password can't contain the string "password".`);
        }

        if (validator.isLowercase(value)) {
          return handleError(
            "Password should contain at least 1 uppercase letter."
          );
        }

        if (validator.isUppercase(value)) {
          throw new Error(
            "Password should contain at least 1 lowercase letter."
          );
        }

        if (validator.isNumeric(value)) {
          throw new Error(
            "Password must contain at least 1 uppercase letter and 1 lowercase letter."
          );
        }

        if (value.split("").every(char => isNaN(Number(char)))) {
          throw new Error("Password should contain at least 1 number.");
        }

        if (validator.isAlphanumeric(value)) {
          throw new Error(
            "Password should contain at least 1 special character."
          );
        }
      }
    },
    tokens: [
      {
        token: {
          required: true,
          type: String
        }
      }
    ]
  },
  { timestamps: true }
);

userSchema.virtual("projects", {
  ref: "Project",
  localField: "_id",
  foreignField: "owner"
});

userSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user.id.toString() }, process.env.JWT_SECRET);

  user.tokens = user.tokens.concat({ token });

  await user.save();

  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Unable to log in.");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to log in.");
  }

  return user;
};

userSchema.pre("save", async function(next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

userSchema.pre("remove", async function(next) {
  const user = this;
  await Project.deleteMany({ owner: user._id });
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
