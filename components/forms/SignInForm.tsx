"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import CustomInput from "../backoffice/CustomInput";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../Button";
import { z } from "zod";
import Link from "next/link";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
// import { login } from "@/actions/authActions"
import { useState } from "react";

export const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "minimum of 6 characters!"),
});

export default function SignInForm({
  message,
  role,
}: {
  message: string | undefined;
  role: string | undefined;
}) {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email:
        role === "admin"
          ? "admin@gmail.com"
          : role === "user"
          ? "johndoe@gmail.com"
          : "",
      password: role ? "111111" : "",
    },
  });

  const onSubmit = async (data: FieldValues) => {
    try {
      setLoading(true);
      // await login(data);
      setLoading(false);
      reset();
      // toast.success("Sign in successful");
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        className="flex items-center gap-2 font-semibold"
        onClick={() => router.back()}
      >
        <ChevronLeft /> <span>Back</span>
      </button>
      <div className="grid place-items-center mt-1">
        <motion.form
          initial={{
            y: 30,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit(onSubmit)}
          className="md:shadow md:border md:p-10 mt-4 md:mt-10 rounded-3xl max-md:w-full md:min-w-[500px]"
        >
          <div className="text-center">
            <h1 className="font-semibold text-lg ">Welcome Back!</h1>
            <p className="text-gray-500">
              We missed you! Please fill in your details.
            </p>
          </div>
          <div className="mt-6 md:mt-10 flex flex-col gap-3">
            <CustomInput
              label="Email"
              name="email"
              placeholder="Enter your email"
              register={register}
              errors={errors}
            />
            <CustomInput
              label="Password"
              name="password"
              placeholder="Enter your password"
              register={register}
              errors={errors}
              type="password"
            />
            {message && (
              <p className="text-center text-red-600 mt-3">{message}</p>
            )}
            <Button
              disabled={loading}
              className="mt-4 bg-secondary bg-rose-600 border-secondary py-3 text-white"
              solid
              loading={loading}
              label={loading ? "Signing in..." : "Sign in"}
            />
          </div>
          <div className="mt-6 text-center text-gray-500">
            Dont have an account ?{" "}
            <Link
              className="font-semibold   text-rose-600"
              href="/signup"
            >
              Sign up
            </Link>
          </div>
        </motion.form>
      </div>
    </>
  );
}
