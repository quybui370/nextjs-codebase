import { z } from "zod";

export async function submitLoginAction(prevState: any, formData: FormData) {
  const schema = z.object({
    name: z.string().nonempty({
      message: "Name is required",
    }),
    email: z.string().email({
      message: "Invalid email address",
    }),
    password: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters long",
      })
      .max(100, {
        message: "Password must be less than 100 characters long",
      })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        }
      ),
  });

  const validatedFields = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  console.log(name, email, password);

  return {
    errors: {
      name: [],
      email: [],
      password: [],
    },
  };
}
