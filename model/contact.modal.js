import mongoose from "mongoose";


const contactUsSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name cannot exceed 100 characters"]
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      trim: true,
      lowercase: true,
      validate: {
        validator: function(v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: props => `${props.value} is not a valid email address`
      }
    },
    subject: {
      type: String,
      trim: true,
      default: "General Inquiry",
      maxlength: [200, "Subject cannot exceed 200 characters"]
    },
    message: {
      type: String,
      required: [true, "Message content is required"],
      trim: true,
      minlength: [10, "Message must be at least 10 characters"],
      maxlength: [2000, "Message cannot exceed 2000 characters"]
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "resolved"],
      default: "pending"
    },
    ipAddress: {
      type: String,
      trim: true
    },
    isRead: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true } 
);

contactUsSchema.statics.findUnread = function() {
  return this.find({ isRead: false }).sort({ createdAt: -1 });
};


contactUsSchema.methods.markAsRead = function() {
  this.isRead = true;
  return this.save();
};


const ContactUs = mongoose.model("ContactUs", contactUsSchema);

export default ContactUs;