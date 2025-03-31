import mongoose from "mongoose";

const jobsSchema = new mongoose.Schema({
  // Employer ID (Reference to an Employer or Company)
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  
  // Job Title and Description
  title: {
    type: String,
    required: true,
    index: true,
  },
  description: {
    type: String,
    required: true,
  },
    
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Companies",
    required: true,
    index: true,
  },
  
  // Date job was posted
  postedDate: {
    type: Date,
    required: true,
    default: Date.now,
    index: true,
  },
  
  // Location (Object with city, state, country)
  location: {
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
      index: true,
    },
    jobType: {
      type: String,
      required: true,
      enum: ["remote", "onsite"],
      index: true,
    },
  },
  
  // Job Requirements
  requirement: {
    type: [String],
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
    
  // Application Deadline
  applicationDeadline: {
    type: Date,
    required: true,
    index: true,
  },
  
  // Salary Range
  min_salary: {
    type: Number,
    required: true,
    min: 0,
    validate: {
      validator: function (value) {
        return value <= this.max_salary;
      },
      message: "Min salary cannot be greater than max salary",
    },
    index: true,
  },
  max_salary: {
    type: Number,
    required: true,
    min: 0,
    index: true,
  },
    
  openings: {
    type: Number,
    required: true,
    min: 1,
    index: true,
  },
  
  applicants: {
    type: Number,
    required: true,
    default: 0,
    index: true
  },
    
  status: {
    type: String,
    required: true,
    default: "open",
    enum: ["open", "closed"],
    index: true,
  },
  
  // Job seekers who have applied to this job
  applicants_list: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobSeeker",
    default: [],
    index: true
  }],
  
  isDelete: {
    type: String,
    required: true,
    default: "No",
    enum: ['No', "Yes"],
    index: true
  }
}, { timestamps: true });

jobsSchema.index({ "location.city": 1, "location.state": 1 }); // For location-based searches
jobsSchema.index({ status: 1, applicationDeadline: 1 }); // For finding open jobs before deadline
jobsSchema.index({ status: 1, min_salary: 1, max_salary: 1 }); // For salary-based filtering of active jobs
jobsSchema.index({ createdBy: 1, status: 1 }); // For recruiters viewing their own job postings

jobsSchema.index({ title: "text", description: "text" });

const Jobs = mongoose.model("Jobs", jobsSchema);
export default Jobs;