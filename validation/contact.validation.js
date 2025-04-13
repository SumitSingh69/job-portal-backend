import { z } from "zod";


export const ContactBaseSchema = z.object({
  fullName: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters")
    .trim(),
  
  email: z.string()
    .email("Please provide a valid email address")
    .toLowerCase()
    .trim(),
  
  subject: z.string()
    .min(2, "Subject must be at least 2 characters")
    .max(200, "Subject cannot exceed 200 characters")
    .trim()
    .optional()
    .default("General Inquiry"),
  
  message: z.string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message cannot exceed 2000 characters")
    .trim()
});


export const ContactClientSchema = ContactBaseSchema;


export const ContactServerSchema = ContactBaseSchema.extend({
  ipAddress: z.string().optional()
});
