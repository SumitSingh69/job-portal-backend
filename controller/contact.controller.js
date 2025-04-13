import { HTTPSTATUS } from "../config/https.config.js";
import ContactUs from "../model/contact.modal.js";
import {
  ContactClientSchema,
  ContactServerSchema,
} from "../validation/contact.validation.js";


const getClientIP = (req) => {
    const forwarded = req.headers["x-forwarded-for"];
    if (forwarded) {
      const ips = forwarded.split(",");
      return ips[0].trim(); // the first one is the actual client IP
    }
    return req.socket?.remoteAddress || req.ip || "0.0.0.0";
  };
  

export const CreateContactMessage = async (req, res) => {
  try {
    const ip = getClientIP(req)
    console.log(ip)

    const validationResult = ContactClientSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(HTTPSTATUS.BAD_REQUEST).json({
        success: false,
        message: "Validation Error",
        error: validationResult.error.errors.map((e) => ({
          path: e.path.join("."),
          message: e.message,
        })),
      });
    }

    const ContactDetail = {
      ...validationResult.data,
      ipAddress: ip,
    };

    const serverValidation = ContactServerSchema.safeParse(ContactDetail);
    if (!serverValidation.success) {
        return res.status(HTTPSTATUS.BAD_REQUEST).json({
          success: false,
          message: "Validation Error in serverside",
          error: serverValidation.error.errors.map((e) => ({
            path: e.path.join("."),
            message: e.message,
          })),
        });
      }
      

    const newContact = new ContactUs(serverValidation.data);
    const savedContact = await newContact.save();

    return res.status(HTTPSTATUS.OK).json({
      success: true,
      message: "Your message has been received. Thank you for contacting us!",
      data: {
        id: savedContact._id,
        createdAt: savedContact.createdAt,
      },
    });
  } catch (error) {
    return res.status(HTTPSTATUS.BAD_REQUEST).json({
      success: false,
      message: "Unable to submit your message. Please try again later.",
      error : error?.message
    });
  }
};
