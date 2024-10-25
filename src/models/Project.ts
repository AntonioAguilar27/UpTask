import mongoose, { Schema, Document, Types } from "mongoose";
import { ITask } from './Task';

export interface IProject extends Document {
    name: string;
    clientName: string;
    description: string;
    tasks: Types.ObjectId[]; // Array de ObjectId
}

const ProjectSchema: Schema = new Schema({
    projectName: {
        type: String,
        required: true,
        trim: true,
    },
    clientName: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    tasks: [
        {
            type: Types.ObjectId,
            ref: 'Task',
        },
    ],
}, { timestamps: true });

const Project = mongoose.model<IProject>('Project', ProjectSchema);
export default Project;
