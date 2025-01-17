import * as z from "zod";

// Validation schema
export const reservationSchema = z.object({
    date: z
      .string()
      .min(1, "Date is required")
      .refine((date) => {
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectedDate >= today;
      }, "Please select a future date"),
    time: z.string().min(1, "Time is required"),
    guests: z
      .string()
      .transform((val) => parseInt(val, 10))
      .refine(
        (val) => val >= 1 && val <= 8,
        "Number of guests must be between 1 and 8"
      ),
    occasion: z.string().optional(),
    seating: z.enum(["indoor", "outdoor"], {
      errorMap: () => ({ message: "Please select a seating preference" }),
    }),
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be less than 50 characters"),
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    specialRequests: z.string().optional(),
  });