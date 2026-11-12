
"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Eye, EyeOff } from "lucide-react";
import { ROLE, User, USER_STATUS } from "@/types/users";
import {
  useCreateUser,
  useUpdateUser,
} from "../services/user.service";
import { CreateUserDto, createUserSchema } from "../schema/user.schema";

interface PageProps {
  mode: "CREATE" | "UPDATE";
  open: boolean;
  onClose: (open: boolean) => void;
  user?: User | null;
}


const UserModel = ({
  mode,
  onClose,
  open,
  user,
}: PageProps) => {

  const [showPassword, setShowPassword] = useState(false);

  const createMutation = useCreateUser();
  const updateMutation = useUpdateUser();

  const isPending =
    createMutation.isPending || updateMutation.isPending;

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<CreateUserDto>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      passwordHash: "",
      role: ROLE.USER,
      status: USER_STATUS.ACTIVE,
    },
  });

  useEffect(() => {
    if (open) {
      reset();
    }
  }, [open, user, reset]);

  const onSubmit = async (values: CreateUserDto) => {
    try {
      if (mode === "CREATE") {
        if (!values.passwordHash) {
          // The schema allows an empty password for UPDATE.
          // CREATE must always provide one.
          return;
        }

        await createMutation.mutateAsync({
          ...values,
          passwordHash: values.passwordHash,
        });

      } else {
        if (!user?.id) return;

        const { passwordHash, ...rest } = values;

        const payload = passwordHash
          ? { ...rest, passwordHash }
          : rest;

        await updateMutation.mutateAsync({
          id: user.id,
          data: payload,
        });
      }

      reset();
      onClose(false);

    } catch (error) {
      console.error("User operation failed:", error);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onClose}
    >
      <DialogContent className="sm:max-w-137.5">

        <DialogHeader>
          <DialogTitle>
            {mode === "CREATE" ? "Create User" : "Update User"}
          </DialogTitle>

          <DialogDescription>
            {mode === "CREATE"
              ? "Add a new user to your application."
              : "Update the user information."}
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>

            <Input
              id="name"
              placeholder="Enter full name"
              {...register("name")}
            />

            {errors.name && (
              <p className="text-sm text-destructive">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>

            <Input
              id="email"
              type="email"
              placeholder="Enter email address"
              {...register("email")}
            />

            {errors.email && (
              <p className="text-sm text-destructive">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Mobile Number</Label>

            <Input
              id="phone"
              placeholder="Enter 10-digit mobile number"
              maxLength={10}
              {...register("phone")}
            />

            {errors.phone && (
              <p className="text-sm text-destructive">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Password */}
          {mode === "CREATE" && (
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>

              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="pr-10"
                  {...register("passwordHash")}
                />

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword
                    ? <EyeOff className="h-4 w-4" />
                    : <Eye className="h-4 w-4" />
                  }
                </Button>
              </div>

              {errors.passwordHash && (
                <p className="text-sm text-destructive">
                  {errors.passwordHash.message}
                </p>
              )}
            </div>
          )}

          {/* Role and Status */}
          <div className="grid grid-cols-2 gap-4 w-full">

            <div className="space-y-2 w-full">
              <Label>Role</Label>

              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className={'w-full'}>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="USER">User</SelectItem>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.role && (
                <p className="text-sm text-destructive">
                  {errors.role.message}
                </p>
              )}
            </div>

            <div className="space-y-2 w-full">
              <Label>Status</Label>

              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className={'w-full'}>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="ACTIVE">Active</SelectItem>
                      <SelectItem value="INACTIVE">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.status && (
                <p className="text-sm text-destructive">
                  {errors.status.message}
                </p>
              )}
            </div>

          </div>

          <Separator />

          {/* Actions */}
          <div className="flex justify-end gap-2">

            <Button
              type="button"
              variant="outline"
              onClick={() => onClose(false)}
              disabled={isPending}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isPending}
            >
              {isPending
                ? "Please wait..."
                : mode === "CREATE"
                  ? "Create User"
                  : "Update User"
              }
            </Button>

          </div>

        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserModel;