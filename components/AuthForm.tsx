"use client";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { signIn, signUp } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";

const AuthForm = ({ type }: { type: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const formSchema = z.object({
    fullname: type === "sign-in" ? z.string().optional() : z.string().min(2),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[0-9]/, "Password must contain at least one number"),
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      if (type === "sign-up") {
        setIsLoading(true);

        const response = await signUp({
          email: values.email,
          password: values.password,
          fullname: values.fullname,
        });
        setIsLoading(false);

        toast(`${response.status}: ${response.message}`);

        if (response.status === "success") {
          router.push("/dashboard");
        }
      }

      if (type === "sign-in") {
        const response = await signIn({
          email: values.email,
          password: values.password,
        });

        setIsLoading(false);

        toast(`${response.status}: ${response.message}`);

        if (response.status === "success") {
          router.push("/dashboard");
        } 
      }
    } catch (error) {
      console.log(error);
    } finally {
      // setIsLoading(false);
    }
  };

  return (
    <div className=" flex flex-col gap-4 w-full max-w-sm">
      <div className="flex flex-col mb-8">
        <h1 className="text-3xl md:text-4xl font-medium text-center">
          {type === "sign-in" ? "Welcome back" : "Create an account "}
        </h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {type === "sign-up" && (
            <>
              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fullname</FormLabel>
                    <FormControl>
                      <Input
                        className="h-13 placeholder:text-[#98a2b3cc] blink text-base font-normal
    text-[#475367] dark:text-white"
                        placeholder="Enter your full name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    className="h-13 placeholder:text-[#98a2b3cc] blink text-base font-normal
            text-[#475367] dark:text-white"
                    placeholder="Enter your email"
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
                    type="password"
                    className="h-13 placeholder:text-[#98a2b3cc] blink text-base font-normal
            text-[#475367] dark:text-white"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="h-13 w-full flex text-white justify-center items-center bg-emerald-600 cursor-pointer hover:bg-emerald-500"
          >
            {type === "sign-in" ? "Sign In" : "Create Account"}
            {isLoading && (
              <Image src="/icon/spin.svg" alt="logo" height={20} width={20} />
            )}
          </Button>
        </form>
      </Form>
      <div className="text-center text-base text-light ">
        {type === "sign-in"
          ? "Don't have an account? "
          : "Already have an account"}{" "}
        <Link
          className="text-emerald-600 hover:underline"
          href={type === "sign-in" ? "/sign-up" : "/sign-in"}
        >
          {type === "sign-in" ? "Sign Up" : "Sign In"}
        </Link>
      </div>
    </div>
  );
};

export default AuthForm;
