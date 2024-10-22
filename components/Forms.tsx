"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

// Creating the sign-in form schema
const signinFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3).max(20),
});

type SigninFormSchemaType = z.infer<typeof signinFormSchema>;

// Creating the sign-up form schema
const signupFormSchema = z
  .object({
    email: z.string().email(),
    username: z.string().min(2).max(20),
    password: z.string().min(3).max(20),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignupFormSchemaType = z.infer<typeof signupFormSchema>;

export default function Forms() {
  // Sign-in form handling
  const signinForm = useForm<SigninFormSchemaType>({
    resolver: zodResolver(signinFormSchema),
  });

  // Sign-up form handling
  const signupForm = useForm<SignupFormSchemaType>({
    resolver: zodResolver(signupFormSchema),
  });

  const onSubmitSignin = (data: SigninFormSchemaType) => {
    console.log("Sign-in data", data); // Handle sign-in data
  };

  const onSubmitSignup = (data: SignupFormSchemaType) => {
    console.log("Sign-up data", data); // Handle sign-up data
  };

  const [isActive, setIsActive] = useState("signin");

  const handleFormClick = (authForm: string) => {
    setIsActive(authForm);
  };

  return (
    <div>
      {isActive === "signin" ? (
        <Form {...signinForm}>
          <form
            onSubmit={signinForm.handleSubmit(onSubmitSignin)}
            className="space-y-5 w-[400px] border-slate-200 rounded-lg border-[0.01px] flex flex-col justify-center items-center p-4"
          >
            <div className="gap-1 flex flex-col justify-center items-center tracking-wider">
              <h3 className="text-base font-semibold tracking-wider">
                Welcome back!
              </h3>
              <p className="text-sm tracking-wide text-slate-500">
                We missed you! Please enter your details.
              </p>
            </div>

            <FormField
              control={signinForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="w-[300px]"
                      placeholder="example@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={signinForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      className="w-[300px]"
                      type="password"
                      placeholder="********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-[300px]" type="submit">
              Sign in
            </Button>

            <h5 className="text-sm">
              Don't have an account?{" "}
              <Link
                onClick={() => handleFormClick("signup")}
                href="#"
                className={buttonVariants({ variant: "link" })}
              >
                <span className="text-sm font-semibold text-red-500">
                  Sign up
                </span>
              </Link>
            </h5>
          </form>
        </Form>
      ) : (
        <Form {...signupForm}>
          <form
            onSubmit={signupForm.handleSubmit(onSubmitSignup)}
            className="space-y-5 w-[400px] border-slate-200 rounded-lg border-[0.01px] flex flex-col justify-center items-center p-4"
          >
            <div className="gap-1 flex flex-col justify-center items-center tracking-wider">
              <h3 className="text-base font-semibold tracking-wider">
                Create an account!
              </h3>
              <p className="text-sm tracking-wide text-slate-500">
                Please fill in your details.
              </p>
            </div>

            <FormField
              control={signupForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="w-[300px]"
                      placeholder="example@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={signupForm.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      className="w-[300px]"
                      placeholder="Username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={signupForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      className="w-[300px]"
                      type="password"
                      placeholder="********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={signupForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      className="w-[300px]"
                      type="password"
                      placeholder="********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-[300px]" type="submit">
              Sign up
            </Button>

            <h5 className="text-sm">
              Already have an account?{" "}
              <Link
                onClick={() => handleFormClick("signin")}
                href="#"
                className={buttonVariants({ variant: "link" })}
              >
                <span className="text-sm font-semibold text-red-500">
                  Sign in
                </span>
              </Link>
            </h5>
          </form>
        </Form>
      )}
    </div>
  );
}
