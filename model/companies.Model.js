import mongoose from "mongoose";

const companiesSchema = new mongoose.Schema(
  {
    // Basic Information
    name: {
      type: String,
      required: true,
      index: true,
    },
    industry: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    // Company Details
    companyType: {
      type: String,
      required: true,
    },
    founder: {
      type: String,
      required: true,
    },
    founded: {
      type: Date,
      required: true,
    },

    // Location
    location: {
      type: String,
      required: true,
    },
    headquarter: {
      type: [String],
      required: true,
    },

    // Contact Information
    contact_email: {
      type: String,
      required: true,
      unique: true,
    },
    contact_phone: {
      type: String,
      required: true,
      match: [/^\+?[1-9]\d{1,14}$/, "Please provide a valid phone number"],
    },

    // Media
    website: {
      type: String,
      required: true,
      unique: true,
    },
    logo: {
      type: String,
      required: true,
    },

    // Company Size
    size: {
      type: String,
      required: true,
      enum: ["small", "medium", "large"],
    },

    // Created By (Reference to User who created this company)
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      required: true,
      default: "active",
      enum: ["active", "inactive"],
    },
  },
  { timestamps: true }
);

companiesSchema.index({ id: 1 }, { unique: true, sparse: true });

companiesSchema.index({ name: 1, website: 1 }, { unique: true });

const Companies = mongoose.model("Companies", companiesSchema);
export default Companies;
