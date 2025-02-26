"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Input, Checkbox, FormControlLabel } from "@mui/material";
import {
  useForm,
  SubmitHandler,
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";
import * as yup from "yup";

interface FormData {
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  gender?: string;
}

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(100, "Password must be less than 100 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  isAdmin: yup.boolean().optional(),
  gender: yup.string().optional(),
});

const NestedInput = () => {
  const { control, register } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="name"
        render={({ field }) => <Input {...field} />}
      />
      <Controller
        control={control}
        name="isAdmin"
        render={({ field }) => (
          <FormControlLabel
            control={<Checkbox {...field} />}
            label="Is Admin"
          />
        )}
      />
      <input {...register("gender")} />
    </>
  );
};

const ReactHookForm = () => {
  const methods = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      isAdmin: false,
    },
    resolver: yupResolver(schema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <NestedInput />
        <p className="text-red-500">{errors.name?.message}</p>
        <input type="email" {...register("email")} />
        <p className="text-red-500">{errors.email?.message}</p>
        <input type="password" {...register("password")} />
        <p className="text-red-500">{errors.password?.message}</p>
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
};

export default ReactHookForm;
