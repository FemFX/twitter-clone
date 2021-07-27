import { model, Schema } from "mongoose";

const UserSchema = new Schema({
  email: {
    unique: true,
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  username: {
    unique: true,
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
  confirm_hash: {
    type: String,
    required: true,
  },
  about: {
    type: String,
  },
  website: {
    type: String,
  },
}, { timestamps: true });

UserSchema.set("toJSON", {
  transform: (_: any, obj: any) => {
    delete obj.password;
    delete obj.confirm_hash;
    return obj;
  },
});

export const UserModel = model("User", UserSchema);
