"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import authService from "@/lib/auth";
import { useUser } from "@/context/UserContextProvider";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    university: "",
    semester: "",
    branch: "",
    agreeTerms: false,
    agreeMarketing: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();
  const { fetchUserData } = useUser();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Clear general error and success messages when user makes changes
    if (errors.submit) {
      setErrors(prev => ({ ...prev, submit: '' }));
    }
    if (successMessage) {
      setSuccessMessage('');
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]{10,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number (10-15 digits)';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase and number';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.university) {
      newErrors.university = 'University is required';
    }

    if (!formData.semester) {
      newErrors.semester = 'Semester is required';
    }

    if (!formData.branch) {
      newErrors.branch = 'Branch is required';
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms of service';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});
    setSuccessMessage('');

    try {
      const result = await authService.register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        university: formData.university,
        semester: formData.semester,
        branch: formData.branch,
        agreeTerms: formData.agreeTerms,
        agreeMarketing: formData.agreeMarketing
      });

      if (result.success) {
        setSuccessMessage(result.message);
        // Update global user state
        await fetchUserData();
        // Redirect to dashboard after successful registration
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      } else {
        setErrors({ submit: result.error });
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ submit: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const universities = ["MAKAUT", "Jadavpur University", "Calcutta University", "Other"];
  const semesters = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];
  const branches = ["Computer Science", "Electronics", "Mechanical", "Civil", "Electrical", "Other"];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-2xl">N</span>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/auth/login" className="font-medium text-blue-600 hover:text-blue-500">
            Sign in here
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-6 px-4 shadow-lg sm:rounded-lg sm:px-10">
          {/* Success Message */}
          {successMessage && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">{successMessage}</p>
                </div>
              </div>
            </div>
          )}

          {/* General Error Message */}
          {errors.submit && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">{errors.submit}</p>
                </div>
              </div>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4 text-black">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={`mt-1 appearance-none block w-full px-3 py-2 border ${errors.firstName ? 'border-red-300' : 'border-gray-300'
                    } rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${isLoading ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                  placeholder="John"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                )}
              </div>

              <div className="text-black">
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={`mt-1 appearance-none block w-full px-3 py-2 border ${errors.lastName ? 'border-red-300' : 'border-gray-300'
                    } rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${isLoading ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                  placeholder="Doe"
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="text-black">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 appearance-none block w-full px-3 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'
                  } rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                placeholder="john.doe@student.university.edu"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="text-black">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={formData.phone}
                onChange={handleChange}
                className={`mt-1 appearance-none block w-full px-3 py-2 border ${errors.phone ? 'border-red-300' : 'border-gray-300'
                  } rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                placeholder="+1 (555) 123-4567"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>

            {/* Password Fields */}
            <div className="text-black">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className={`mt-1 appearance-none block w-full px-3 py-2 border ${errors.password ? 'border-red-300' : 'border-gray-300'
                  } rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                placeholder="Min 8 chars, 1 uppercase, 1 number"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <div className="text-black">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`mt-1 appearance-none block w-full px-3 py-2 border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                  } rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Academic Info */}
            <div>
              <label htmlFor="university" className="block text-sm font-medium text-gray-700">
                University
              </label>
              <select
                id="university"
                name="university"
                value={formData.university}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${errors.university ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white text-gray-900`}
              >
                <option value="" className="text-gray-500">Select University</option>
                {universities.map(uni => (
                  <option key={uni} value={uni} className="text-gray-900">{uni}</option>
                ))}
              </select>
              {errors.university && (
                <p className="mt-1 text-sm text-red-600">{errors.university}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="semester" className="block text-sm font-medium text-gray-700">
                  Semester
                </label>
                <select
                  id="semester"
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-3 py-2 border ${errors.semester ? 'border-red-300' : 'border-gray-300'
                    } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white text-gray-900`}
                >
                  <option value="" className="text-gray-500">Semester</option>
                  {semesters.map(sem => (
                    <option key={sem} value={sem} className="text-gray-900">{sem}</option>
                  ))}
                </select>
                {errors.semester && (
                  <p className="mt-1 text-sm text-red-600">{errors.semester}</p>
                )}
              </div>

              <div>
                <label htmlFor="branch" className="block text-sm font-medium text-gray-700">
                  Branch
                </label>
                <select
                  id="branch"
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-3 py-2 border ${errors.branch ? 'border-red-300' : 'border-gray-300'
                    } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white text-gray-900`}
                >
                  <option value="" className="text-gray-500">Branch</option>
                  {branches.map(branch => (
                    <option key={branch} value={branch} className="text-gray-900">{branch}</option>
                  ))}
                </select>
                {errors.branch && (
                  <p className="mt-1 text-sm text-red-600">{errors.branch}</p>
                )}
              </div>
            </div>

            {/* Checkboxes */}
            {/* Checkboxes */}
            <div className="space-y-3">
              {/* Error message for agreeTerms */}
              {errors.agreeTerms && (
                <p className="text-sm text-red-600">{errors.agreeTerms}</p>
              )}

              {/* Terms & Conditions Checkbox */}
              <div className="flex items-start">
                <input
                  id="agreeTerms"
                  name="agreeTerms"
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                />
                <label htmlFor="agreeTerms" className="ml-2 block text-sm text-gray-900">
                  I agree to the{' '}
                  <Link href="/terms" className="text-blue-600 hover:underline" target="_blank">
                    Terms of Service
                  </Link>
                </label>
              </div>

              {/* Marketing Consent Checkbox */}
              <div className="flex items-start">
                <input
                  id="agreeMarketing"
                  name="agreeMarketing"
                  type="checkbox"
                  checked={formData.agreeMarketing}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                />
                <label htmlFor="agreeMarketing" className="ml-2 block text-sm text-gray-900">
                  I&apos;d like to receive updates about new study materials and features
                </label>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </div>
                ) : (
                  'Create account'
                )}
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or sign up with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span className="ml-2">Google</span>
              </button>

              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span className="ml-2">Facebook</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
