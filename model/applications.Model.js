import mongoose from "mongoose";

const applicationsSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: String,
    required: true,
  },
  jobId: {
    type: String,
    required: true,
  },
  applicationDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["submited", "reject", "shortlist", "hired"],
  },
});

const Applications = mongoose.model("Applications", applicationsSchema);
export default Applications;