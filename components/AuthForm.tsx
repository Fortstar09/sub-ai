"use client";
import React from "react";
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
import { toast } from "sonner";
import Link from "next/link";

const formSchema = z.object({
  fullName: z.string().min(2).max(50),
});

const AuthForm = ({ type }: { type: string }) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    toast("Event has been created.");
    console.log(values);
  }

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
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fullname</FormLabel>
                    <FormControl>
                      <Input
                        className="h-13 placeholder:text-[#98a2b3cc] blink text-base font-normal
    text-[#475367]"
                        placeholder="Enter your full name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        className="h-13 placeholder:text-[#98a2b3cc] blink text-base font-normal
            text-[#475367]"
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
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="h-13 placeholder:text-[#98a2b3cc] blink text-base font-normal
            text-[#475367]"
                    placeholder="Enter your full name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    className="h-13 placeholder:text-[#98a2b3cc] blink text-base font-normal
            text-[#475367]"
                    placeholder="Enter your full name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="h-13 w-full bg-emerald-600 hover:bg-emerald-500"
          >
            {type === "sign-in" ? "Sign In" : "Create Account"}
          </Button>
        </form>
      </Form>
      <div className="text-center text-base text-light ">{type === "sign-in" ? "Don't have an account? " : "Already have an account"}{" "}<Link className="text-emerald-600 hover:underline" href={type === 'sign-in'? '/sign-up' : '/sign-in'}>{type === 'sign-in'? 'Sign Up' : 'Sign In'}</Link></div>
    </div>
  );
};

export default AuthForm;
