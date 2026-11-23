
"use client";

import { Categories } from "@/types/category";
import {
  X,
  FolderTree,
  Tag,
  Layers,
  Hash,
  FileText,
  Image as ImageIcon,
} from "lucide-react";

interface PageProps {
    category : Categories,
    onClose : () => void
}

export default function CategoryViewModal({ category, onClose } : PageProps) {
  if (!category) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b p-5">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Category Details
            </h2>
            <p className="text-sm text-gray-500">
              View category information
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-red-500"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[75vh] space-y-5 overflow-y-auto p-5">

          {/* Category Name */}
          <div className="flex items-center gap-4 rounded-xl bg-blue-50 p-4">
            <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
              <FolderTree size={24} />
            </div>

            <div>
              <p className="text-sm text-gray-500">Category Name</p>
              <h3 className="text-lg font-semibold text-gray-800">
                {category.name}
              </h3>
            </div>
          </div>

          {/* Basic Details */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            <div className="rounded-xl border p-4">
              <div className="mb-2 flex items-center gap-2 text-gray-500">
                <Hash size={16} />
                <span className="text-sm">Slug</span>
              </div>
              <p className="font-medium text-gray-800">
                {category.slug || "-"}
              </p>
            </div>

            <div className="rounded-xl border p-4">
              <div className="mb-2 flex items-center gap-2 text-gray-500">
                <Layers size={16} />
                <span className="text-sm">Parent Category</span>
              </div>
              <p className="font-medium text-gray-800">
                {category.parent?.name || category.parentId || "Root Category"}
              </p>
            </div>

            <div className="rounded-xl border p-4">
              <div className="mb-2 flex items-center gap-2 text-gray-500">
                <Tag size={16} />
                <span className="text-sm">Status</span>
              </div>

              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                  category.isActive
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {category.isActive ? "Active" : "Inactive"}
              </span>
            </div>

            <div className="rounded-xl border p-4">
              <div className="mb-2 flex items-center gap-2 text-gray-500">
                <Hash size={16} />
                <span className="text-sm">Sort Order</span>
              </div>
              <p className="font-medium text-gray-800">
                {category.sortOrder ?? 0}
              </p>
            </div>

          </div>

          {/* Description */}
          <div className="rounded-xl border p-4">
            <div className="mb-2 flex items-center gap-2 text-gray-500">
              <FileText size={16} />
              <span className="text-sm">Description</span>
            </div>
            <p className="text-sm text-gray-700">
              {category.description || "No description provided."}
            </p>
          </div>

          {/* Image */}
          {category.imageUrl && (
            <div className="rounded-xl border p-4">
              <div className="mb-3 flex items-center gap-2 text-gray-500">
                <ImageIcon size={16} />
                <span className="text-sm">Category Image</span>
              </div>

              <img
                src={category.imageUrl}
                alt={category.name}
                className="h-40 w-40 rounded-xl border object-cover"
              />
            </div>
          )}

          {/* Attribute Schema */}
          <div className="rounded-xl border p-4">
            <h3 className="mb-4 font-semibold text-gray-800">
              Attribute Schema
            </h3>

            {category?.attributeSchema?.length > 0 ? (
              <div className="space-y-3">
                {category?.attributeSchema.map((attribute, index) => (
                  <div
                    key={index}
                    className="flex flex-col justify-between gap-2 rounded-lg bg-gray-50 p-3 sm:flex-row sm:items-center"
                  >
                    <div>
                      <p className="font-medium text-gray-800">
                        {attribute?.label}
                      </p>
                      <p className="text-xs text-gray-500">
                        Key: {attribute.key}
                      </p>
                    </div>

                    <span className="w-fit rounded-md bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
                      {attribute.type}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                No attributes configured.
              </p>
            )}
          </div>

          {/* Child Categories */}
          <div className="rounded-xl border p-4">
            <h3 className="mb-3 font-semibold text-gray-800">
              Child Categories
            </h3>

            {category.children?.length > 0 ? (
              <div className="space-y-2">
                {category.children.map((child) => (
                  <div
                    key={child.id}
                    className="rounded-lg bg-gray-50 p-3"
                  >
                    <p className="font-medium text-gray-800">
                      {child.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {child.slug}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                No child categories.
              </p>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="flex justify-end border-t p-5">
          <button
            onClick={onClose}
            className="rounded-lg bg-gray-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-gray-700"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
