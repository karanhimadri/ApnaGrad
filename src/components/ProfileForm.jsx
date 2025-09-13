"use client";
import { useState } from "react";
import Button from "./Button";

export default function ProfileForm({ 
  profile, 
  onSave, 
  onCancel, 
  loading = false 
}) {
  const [formData, setFormData] = useState({
    firstName: profile?.firstName || "",
    lastName: profile?.lastName || "",
    phone: profile?.phone || "",
    university: profile?.university || "",
    semester: profile?.semester || "",
    branch: profile?.branch || "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number format";
    }

    if (!formData.university.trim()) {
      newErrors.university = "University is required";
    }

    if (!formData.semester) {
      newErrors.semester = "Semester is required";
    }

    if (!formData.branch.trim()) {
      newErrors.branch = "Branch/Department is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSave(formData);
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const semesterOptions = [
    { value: "1", label: "1st Semester" },
    { value: "2", label: "2nd Semester" },
    { value: "3", label: "3rd Semester" },
    { value: "4", label: "4th Semester" },
    { value: "5", label: "5th Semester" },
    { value: "6", label: "6th Semester" },
    { value: "7", label: "7th Semester" },
    { value: "8", label: "8th Semester" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your first name"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your last name"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your phone number"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>
      </div>

      {/* Academic Information */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Academic Information</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="university" className="block text-sm font-medium text-gray-700 mb-1">
              University *
            </label>
            <input
              type="text"
              id="university"
              name="university"
              value={formData.university}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.university ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your university name"
            />
            {errors.university && (
              <p className="text-red-500 text-sm mt-1">{errors.university}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="semester" className="block text-sm font-medium text-gray-700 mb-1">
                Current Semester *
              </label>
              <select
                id="semester"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.semester ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select Semester</option>
                {semesterOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.semester && (
                <p className="text-red-500 text-sm mt-1">{errors.semester}</p>
              )}
            </div>

            <div>
              <label htmlFor="branch" className="block text-sm font-medium text-gray-700 mb-1">
                Branch/Department *
              </label>
              <input
                type="text"
                id="branch"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.branch ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="e.g., Computer Science"
              />
              {errors.branch && (
                <p className="text-red-500 text-sm mt-1">{errors.branch}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          loading={isSubmitting}
          disabled={loading}
        >
          Save Changes
        </Button>
      </div>
    </form>
  );
}