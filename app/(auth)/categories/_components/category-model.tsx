"use client";

import { useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Plus, Trash2 } from "lucide-react";

import {
  createCategorySchema,
  CreateCategoryDto,
} from "../category-schema";

import {
  useCreateCategory,
  useUpdateCategory,
} from "../_hooks/category-hooks";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  parentId: string | null;
  attributeSchema?: {
    key: string;
    label: string;
    type: "text" | "number" | "boolean" | "select";
    options?: string[];
    required?: boolean;
  }[];
  isActive?: boolean;
  sortOrder?: number;
}

interface PageProps {
  mode: "CREATE" | "UPDATE";
  open: boolean;
  onClose: (open: boolean) => void;
  category?: Category | null;
}

const CategoryModal = ({
  mode,
  onClose,
  open,
  category,
}: PageProps) => {
  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();

  const isPending =
    createMutation.isPending || updateMutation.isPending;

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateCategoryDto>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      parentId: null,
      attributeSchema: [],
      isActive: true,
      sortOrder: 0,
    },
  });

  const {
    fields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "attributeSchema",
  });

  const categoryName = watch("name");

  // Generate slug from category name
  useEffect(() => {
    if (mode === "CREATE") {
      const slug = categoryName
        ?.toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      setValue("slug", slug);
    }
  }, [categoryName, mode, setValue]);

  // Reset form when modal opens
  useEffect(() => {
    if (open) {
      if (mode === "UPDATE" && category) {
        reset({
          name: category.name,
          slug: category.slug,
          description: category.description ?? "",
          parentId: category.parentId,
          attributeSchema: category.attributeSchema ?? [],
          isActive: category.isActive ?? true,
          sortOrder: category.sortOrder ?? 0,
        });
      } else {
        reset({
          name: "",
          slug: "",
          description: "",
          parentId: null,
          attributeSchema: [],
          isActive: true,
          sortOrder: 0,
        });
      }
    }
  }, [open, mode, category, reset]);

  const onSubmit = async (values: CreateCategoryDto) => {
    try {
      const payload: CreateCategoryDto = {
        ...values,
        description: values.description || null,
        parentId: values.parentId || null,
        attributeSchema: values.attributeSchema ?? [],
        isActive: values.isActive ?? true,
        sortOrder: values.sortOrder ?? 0,
      };

      if (mode === "CREATE") {
        await createMutation.mutateAsync(payload);
      } else {
        if (!category?.id) return;

        await updateMutation.mutateAsync({
          id: category.id,
          data: payload,
        });
      }

      reset();
      onClose(false);
    } catch (error) {
      console.error("Category operation failed:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">

        <DialogHeader>
          <DialogTitle>
            {mode === "CREATE"
              ? "Create Category"
              : "Update Category"}
          </DialogTitle>

          <DialogDescription>
            {mode === "CREATE"
              ? "Add a new category to your store."
              : "Update category information."}
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Category Name</Label>

            <Input
              id="name"
              placeholder="Enter category name"
              {...register("name")}
            />

            {errors.name && (
              <p className="text-sm text-destructive">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>

            <Input
              id="slug"
              placeholder="category-slug"
              {...register("slug")}
            />

            {errors.slug && (
              <p className="text-sm text-destructive">
                {errors.slug.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>

            <Textarea
              id="description"
              placeholder="Enter category description"
              rows={3}
              {...register("description")}
            />

            {errors.description && (
              <p className="text-sm text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Parent Category */}
          <div className="space-y-2">
            <Label htmlFor="parentId">Parent Category ID</Label>

            <Input
              id="parentId"
              placeholder="Optional parent category ID"
              {...register("parentId")}
            />

            <p className="text-xs text-muted-foreground">
              Leave empty if this is a root category.
            </p>
          </div>

          {/* Sort Order */}
          <div className="space-y-2">
            <Label htmlFor="sortOrder">Sort Order</Label>

            <Input
              id="sortOrder"
              type="number"
              {...register("sortOrder", {
                valueAsNumber: true,
              })}
            />

            {errors.sortOrder && (
              <p className="text-sm text-destructive">
                {errors.sortOrder.message}
              </p>
            )}
          </div>

          {/* Active */}
          <div className="flex items-center gap-3">
            <Controller
              name="isActive"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="isActive"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />

            <Label
              htmlFor="isActive"
              className="cursor-pointer"
            >
              Active Category
            </Label>
          </div>

          <Separator />

          {/* Dynamic Attributes */}
          <div className="space-y-4">

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">
                  Category Attributes
                </h3>

                <p className="text-sm text-muted-foreground">
                  Define custom fields for products in this category.
                </p>
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  append({
                    key: "",
                    label: "",
                    type: "text",
                    options: [],
                    required: false,
                  })
                }
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Attribute
              </Button>
            </div>

            {fields.map((field, index) => (
              <div
                key={field.id}
                className="space-y-4 rounded-lg border p-4"
              >

                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">
                    Attribute {index + 1}
                  </h4>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>

                {/* Attribute Key */}
                <div className="space-y-2">
                  <Label>Key</Label>

                  <Input
                    placeholder="e.g. brandName"
                    {...register(
                      `attributeSchema.${index}.key`
                    )}
                  />

                  {errors.attributeSchema?.[index]?.key && (
                    <p className="text-sm text-destructive">
                      {errors.attributeSchema[index]?.key?.message}
                    </p>
                  )}
                </div>

                {/* Attribute Label */}
                <div className="space-y-2">
                  <Label>Label</Label>

                  <Input
                    placeholder="e.g. Brand Name"
                    {...register(
                      `attributeSchema.${index}.label`
                    )}
                  />

                  {errors.attributeSchema?.[index]?.label && (
                    <p className="text-sm text-destructive">
                      {errors.attributeSchema[index]?.label?.message}
                    </p>
                  )}
                </div>

                {/* Attribute Type */}
                <div className="space-y-2">
                  <Label>Type</Label>

                  <Controller
                    name={`attributeSchema.${index}.type`}
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={(value) => {
                          field.onChange(value);

                          if (value !== "select") {
                            setValue(
                              `attributeSchema.${index}.options`,
                              []
                            );
                          }
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="text">
                            Text
                          </SelectItem>

                          <SelectItem value="number">
                            Number
                          </SelectItem>

                          <SelectItem value="boolean">
                            Boolean
                          </SelectItem>

                          <SelectItem value="select">
                            Select
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                {/* Select Options */}
                {watch(
                  `attributeSchema.${index}.type`
                ) === "select" && (
                  <div className="space-y-2">
                    <Label>Options</Label>

                    <Controller
                      name={`attributeSchema.${index}.options`}
                      control={control}
                      render={({ field }) => (
                        <Input
                          placeholder="Small, Medium, Large"
                          value={
                            field.value?.join(", ") ?? ""
                          }
                          onChange={(e) => {
                            field.onChange(
                              e.target.value
                                .split(",")
                                .map((option) => option.trim())
                                .filter(Boolean)
                            );
                          }}
                        />
                      )}
                    />

                    <p className="text-xs text-muted-foreground">
                      Separate options using commas.
                    </p>
                  </div>
                )}

                {/* Required */}
                <div className="flex items-center gap-3">
                  <Controller
                    name={`attributeSchema.${index}.required`}
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value ?? false}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />

                  <Label className="cursor-pointer">
                    Required attribute
                  </Label>
                </div>

              </div>
            ))}

            {fields.length === 0 && (
              <div className="rounded-lg border border-dashed p-6 text-center">
                <p className="text-sm text-muted-foreground">
                  No attributes added yet.
                </p>
              </div>
            )}
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
                  ? "Create Category"
                  : "Update Category"}
            </Button>

          </div>

        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryModal;