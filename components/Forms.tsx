"use client";

import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Creating the formSchema
const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3).max(20),
});

type FormSchemaType = z.infer<typeof formSchema>;

export default function Forms() {
  // Using useForm with the schema
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormSchemaType) => {
    console.log(data); // Handle the form submission data
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 w-[400px]  border-slate-200 rounded-lg  border-[0.01px] flex flex-col justify-center items-center p-4 "
      >
        <div className="gap-1 flex flex-col justify-center items-center tracking-wider ">
          <h3 className="text-base font-semibold tracking-wider">
            Welcome back!
          </h3>
          <p className="text-sm tracking-wide text-slate-500 ">
            We missed you!Please enter your details
          </p>
        </div>
        <FormField
          control={form.control}
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
          control={form.control}
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
          Submit
        </Button>
        <h5 className="text-sm ">
          Don't have an account ?{" "}
          <span className="text-sm font-semibold text-red-500">Sign up</span>
        </h5>
      </form>
    </Form>
  );
}
