import { InferSchemaType, model, Schema } from "mongoose";


const UserSchema = new Schema(
    {
        name: { type: String, required: true },
        matches: { type: [{
            won: Boolean,
            turns: Number,
            timePlayed: Date,
        }]}
    },
    { timestamps: true },
)


type Note = InferSchemaType<typeof UserSchema>;

export default model<Note>("User", UserSchema);