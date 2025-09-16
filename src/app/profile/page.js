"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "@/components/Button";
import ProfileForm from "@/components/ProfileForm";
import { useUser } from "@/context/UserContextProvider";
import authService from "@/lib/auth";

// Lucide Icons
import { CheckCircle2, AlertCircle, Star, UserCheck, Star as StarIcon, Lock, ShieldCheck, Trash2 } from "lucide-react";

export default function ProfilePage() {
  const { user, userProfile, loading, isAuthenticated, refreshUserProfile } = useUser();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) router.push("/auth/login");
  }, [loading, isAuthenticated, router]);

  const handleSaveProfile = async (formData) => {
    setSaveLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const result = await authService.updateUserProfile(userProfile.$id, formData);

      if (result.success) {
        setMessage({ type: "success", text: "Profile updated successfully!" });
        setIsEditing(false);
        await refreshUserProfile();
      } else {
        setMessage({ type: "error", text: result.error || "Failed to update profile" });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage({ type: "error", text: "An unexpected error occurred" });
    } finally {
      setSaveLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setMessage({ type: "", text: "" });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-8"></div>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="h-32 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user || !userProfile) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
        </div>

        {/* Message */}
        {message.text && (
          <div
            className={`mb-6 p-4 rounded-lg ${message.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
              }`}
          >
            <div className="flex items-center">
              {message.type === "success" ? <CheckCircle2 className="w-5 h-5 mr-2" /> : <AlertCircle className="w-5 h-5 mr-2" />}
              {message.text}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="relative inline-block mb-4">
                <Image
                  src="/5.png"
                  alt={`${userProfile.firstName} ${userProfile.lastName}`}
                  width={96}
                  height={96}
                  className="w-24 h-24 rounded-full mx-auto border-4 border-blue-100"
                />
                {userProfile.isPremium && (
                  <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 rounded-full px-2 py-1 text-xs font-bold">
                    PRO
                  </div>
                )}
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">{`${userProfile.firstName} ${userProfile.lastName}`}</h2>
              <p className="text-gray-600 text-sm mb-2">{user.email}</p>
              <p className="text-gray-600 text-sm mb-4">{userProfile.branch}</p>

              <div className="flex items-center justify-center text-green-600 text-sm mb-4">
                <UserCheck className="w-4 h-4 mr-1" />
                Verified Student
              </div>
            </div>

            {!userProfile.isPremium && (
              <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
                <div className="flex items-center mb-3">
                  <Star className="w-6 h-6 text-yellow-300 mr-2" />
                  <h3 className="text-lg font-semibold">Upgrade to Premium</h3>
                </div>
                <p className="text-purple-100 text-sm mb-4">
                  Unlock exclusive features and get unlimited access to all notes, PYQs, and study materials.
                </p>

                <div className="space-y-2 mb-4">
                  {["Unlimited downloads", "Access to all universities", "Priority support", "Ad-free experience"].map((item, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-300 mr-2" />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">₹299</div>
                    <div className="text-purple-200 text-sm">per month</div>
                  </div>
                  <Button variant="premium" onClick={() => router.push("/premium")}>
                    Upgrade Now
                  </Button>
                </div>

                <div className="mt-3 pt-3 border-t border-purple-400/30">
                  <p className="text-xs text-purple-200 text-center">⭐ Special offer: Get 2 months free with annual plan</p>
                </div>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              {isEditing ? (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Edit Profile</h2>
                  <ProfileForm profile={userProfile} onSave={handleSaveProfile} onCancel={handleCancelEdit} loading={saveLoading} />
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
                    <Button variant="outline" onClick={() => setIsEditing(true)}>
                      Edit
                    </Button>
                  </div>

                  <div className="space-y-6">
                    {/* Personal Info */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-500 mb-1">First Name</label>
                          <p className="text-gray-900 font-medium">{userProfile.firstName}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500 mb-1">Last Name</label>
                          <p className="text-gray-900 font-medium">{userProfile.lastName}</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                        <p className="text-gray-900 font-medium">{user.email}</p>
                      </div>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-500 mb-1">Phone Number</label>
                        <p className="text-gray-900 font-medium">{userProfile.phone || "Not provided"}</p>
                      </div>
                    </div>

                    {/* Academic Info */}
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Academic Information</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-500 mb-1">University</label>
                          <p className="text-gray-900 font-medium">{userProfile.university}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">Current Semester</label>
                            <p className="text-gray-900 font-medium">{userProfile.semester} Semester</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">Branch/Department</label>
                            <p className="text-gray-900 font-medium">{userProfile.branch}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Premium Info */}
                    {userProfile.isPremium && (
                      <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Premium Status</h3>
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center">
                          <StarIcon className="w-5 h-5 text-yellow-600 mr-2" />
                          <div>
                            <p className="font-medium text-yellow-800">Premium Member</p>
                            <p className="text-sm text-yellow-700">
                              {userProfile.premiumExpireAt
                                ? `Expires on ${new Date(userProfile.premiumExpireAt).toLocaleDateString()}`
                                : "Lifetime Premium"}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Preferences */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Preferences</h2>
              <div className="space-y-6">
                {[
                  { title: "Email Notifications", desc: "Receive updates about new notes and PYQs", checked: true },
                  { title: "Push Notifications", desc: "Get notified about study reminders", checked: false },
                ].map((pref, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{pref.title}</p>
                      <p className="text-sm text-gray-500">{pref.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={pref.checked} />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Security */}
            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Security</h2>

              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Change Password</p>
                    <p className="text-sm text-gray-500">Update your password to keep your account secure</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Lock className="w-4 h-4 mr-1 inline" /> Change
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <ShieldCheck className="w-4 h-4 mr-1 inline" /> Enable
                  </Button>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-red-200">
              <h2 className="text-xl font-semibold text-red-600 mb-6">Danger Zone</h2>
              <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                <div>
                  <p className="font-medium text-red-900">Delete Account</p>
                  <p className="text-sm text-red-700">Permanently delete your account and all associated data</p>
                </div>
                <Button variant="destructive" size="sm">
                  <Trash2 className="w-4 h-4 mr-1 inline" /> Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
