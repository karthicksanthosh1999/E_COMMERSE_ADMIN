'use client';

import { cn } from "cn"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link";
import api from "@/lib/axios";
import { ChangeEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const route = useRouter()

  const [loginData, setLoginData] = useState<ILoginUser>({ email:"", password:"" });


    const handleChange:ChangeEventHandler<HTMLInputElement> = (event) => {
      const { value, name } = event.target;
      setLoginData((preV) =>({...preV, [name]: value}))
    }


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data } = await api.post("/api/auth/login",loginData);
      if(data?.success === true){
        route.push("/dashboard")
        toast.success(`Welcome Back ${data?.data?.name}`)
      }
    } catch (error) {
      console.error("LOGIN ERROR:", error);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6 w-full", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="font-semibold text-2xl">Login to your account</CardTitle>
          <CardDescription className="text-sm font-normal">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                             name="email"
                  value={loginData?.email}
                  onChange={handleChange}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Link
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="******" 
                  required 
                  name="password"
                  className="rounded-sm"
                  value={loginData?.password}
                  onChange={handleChange}
                  />
              </Field>
              <Field>
                <Button 
                  variant={'default'} 
                  type="submit"
                  className={'cursor-pointer bg-[#72410e] hover:bg-[#72410e]/80 text-white'}
                >Login</Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
