import { model, models, Schema } from "mongoose";

export interface IUser extends Document {
    clerkId: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    photo: string;
    planId: number;
    creditBalance: number
}

const UserSchema = new Schema({
    clerkId: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    photo: {type: String, required: true},
    firstName: {type: String},
    lastName: {type: String},
    planId: {type: Number, default: 1},
    creditBalance: {type: Number, default: 5},
})


const User = models?.User || model('User', UserSchema)

export default User