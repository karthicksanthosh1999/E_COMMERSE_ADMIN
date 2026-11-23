"use client";

import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  BriefcaseBusiness,
  CalendarDays,
  Pencil,
  X,
  Save,
  Camera,
} from "lucide-react";
import { useSession } from "@/providers/SessionProvider";

export default function ProfilePage() {

  const { user } = useSession()
  const [isEditing, setIsEditing] = useState(false);

  console.log(user)

const [profile, setProfile] = useState({
  name: "",
  email: "",
  phone: "",
  role: "",
  doj: "",
});

useEffect(() => {
  if (!user) return;

const updatedProfile = {
  name: user.name ?? "",
  email: user.email ?? "",
  phone: user.phone ?? "",
  role: user.role ?? "",
  doj: formatDateForInput(user.createdAt),
};

  setProfile(updatedProfile);
  setFormData(updatedProfile);
}, [user]);

  const [formData, setFormData] = useState(profile);

  const formatDateForInput = (date) => {
  if (!date) return "";

  return new Date(date).toISOString().split("T")[0];
};

  const handleEdit = () => {
  setFormData(profile);
  setIsEditing(true);
};

const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const handleSave = () => {
  setProfile(formData);
  setIsEditing(false);
};

const handleCancel = () => {
  setFormData(profile);
  setIsEditing(false);
};

const fields = [
  {
    label: "Full Name",
    name: "name",
    icon: User,
  },
  {
    label: "Email Address",
    name: "email",
    icon: Mail,
  },
  {
    label: "Phone Number",
    name: "phone",
    icon: Phone,
  },
  {
    label: "Role",
    name: "role",
    icon: BriefcaseBusiness,
  },
];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              My Profile
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your personal information and account details.
            </p>
          </div>

          {!isEditing && (
            <button
              onClick={handleEdit}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-gold px-4 py-2.5 text-sm font-medium transition hover:bg-brand-gold-dark cursor-pointer"
            >
              <Pencil size={16} />
              Edit Profile
            </button>
          )}
        </div>

        {/* Profile Card */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          {/* Cover */}
          <div className="relative h-36 bg-gradient-to-r from-brand-gold via-gold-dark to-brand-gold-dark sm:h-48">
            <div className="absolute inset-0 opacity-20">
              <div className="h-full w-full bg-[radial-gradient(circle_at_20%_50%,white,transparent_30%)]" />
            </div>
          </div>

          {/* Profile Info */}
          <div className="px-5 pb-6 sm:px-8">

            <div className="-mt-14 flex flex-col gap-4 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between">

              {/* Avatar */}
              <div className="relative flex h-28 w-28 items-center justify-center rounded-2xl border-4 border-white bg-blue-100 text-3xl font-bold text-blue-700 shadow-md sm:h-32 sm:w-32">
                {(profile.name || "N/A")
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .toUpperCase()}
                {isEditing && (
                  <button
                    type="button"
                    className="absolute -bottom-2 -right-2 rounded-full border-2 border-white bg-brand-gold p-2 text-white shadow hover:bg-blue-700"
                    title="Change profile picture"
                  >
                    <Camera size={16} />
                  </button>
                )}
              </div>

              {/* Name */}
              <div className="pb-1">
                <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                  {profile.name}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {profile.role}
                </p>
              </div>
            </div>

            {/* Details */}
            <div className="mt-8">

              {isEditing ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSave();
                  }}
                >
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                    {fields.map((field) => {
                      const Icon = field.icon;

                      return (
                        <div key={field.name}>
                          <label
                            htmlFor={field.name}
                            className="mb-2 block text-sm font-medium text-gray-700"
                          >
                            {field.label}
                          </label>

                          <div className="relative">
                            <Icon
                              size={18}
                              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                              id={field.name}
                              name={field.name}
                              type="text"
                              value={formData[field.name]}
                              onChange={handleChange}
                              className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                          </div>
                        </div>
                      );
                    })}

                  </div>

                  {/* Bio */}
                  <div className="mt-5">
                    <label
                      htmlFor="bio"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      About Me
                    </label>

                    <input
                      id="bio"
                      name="bio"
                      type="date"
                      value={formData.doj}
                      onChange={handleChange}
                      className="w-full resize-none rounded-lg border border-gray-300 bg-white p-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                    <button
                      type="button"
                      onClick={handleCancel}
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                    >
                      <X size={16} />
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-gold px-4 py-2.5 text-sm font-medium transition hover:bg-brand-gold-dark cursor-pointer"
                    >
                      <Save size={16} />
                      Save Changes
                    </button>

                  </div>
                </form>
              ) : (
                <>

                  {/* View Mode */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                    {fields.map((field) => {
                      const Icon = field.icon;

                      return (
                        <div
                          key={field.name}
                          className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4"
                        >
                          <div className="rounded-lg bg-blue-100 p-2.5 text-blue-600">
                            <Icon size={18} />
                          </div>

                          <div className="min-w-0">
                            <p className="text-xs font-medium text-gray-500">
                              {field.label}
                            </p>

                            <p className="mt-1 wrap-break-word text-sm font-semibold text-gray-900">
                               {profile[field?.name] || "N/A"}
                            </p>
                          </div>
                        </div>
                      );
                    })}

                  </div>

                  {/* About */}
                <div className="mt-5">
                  <label
                    htmlFor="doj"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Date of Join
                  </label>

                  <input
                    id="doj"
                    name="doj"
                    type="date"
                    value={formData.doj}
                    onChange={handleChange}
                    disabled
                    className="w-full rounded-lg border border-gray-300 bg-gray-100 p-3 text-sm text-gray-900 outline-none"
                  />
                </div>
                </>
              )}

            </div>
          </div>
        </div>

        {/* Account Info */}
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <h3 className="text-base font-semibold text-gray-900">
            Account Information
          </h3>

          <div className="mt-4 flex items-center gap-3">
            <div className="rounded-lg bg-green-100 p-3 text-green-600">
              <CalendarDays size={20} />
            </div>

            <div>
              <p className="text-xs font-medium text-gray-500">
                Account Status
              </p>

              <p className="mt-1 text-sm font-semibold text-green-600">
                Active
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}