"use client";
import { createContext, useContext, useEffect, useState } from "react";
import authService from "@/lib/auth";

// Create the context
const UserContext = createContext({});

// Custom hook to use the context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserContextProvider');
  }
  return context;
};

// Context Provider Component
export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch current user and profile
  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get current user from auth
      const userResult = await authService.getCurrentUser();

      if (userResult.success) {
        setUser(userResult.user);

        // Get user profile from database
        const profileResult = await authService.getUserProfile(userResult.user.$id);

        if (profileResult.success) {
          setUserProfile(profileResult.profile);
        } else {
          console.warn('Profile not found:', profileResult.error);
          setUserProfile(null);
        }
      } else {
        // User not authenticated
        setUser(null);
        setUserProfile(null);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError(error.message);
      setUser(null);
      setUserProfile(null);
    } finally {
      setLoading(false);
    }
  };

  // Function to refresh only the user profile (efficient for profile updates)
  const refreshUserProfile = async () => {
    if (!user?.$id) {
      console.warn('Cannot refresh profile: user not authenticated');
      return;
    }

    try {
      const profileResult = await authService.getUserProfile(user.$id);

      if (profileResult.success) {
        setUserProfile(profileResult.profile);
      } else {
        console.warn('Profile not found:', profileResult.error);
      }
    } catch (error) {
      console.error('Error refreshing user profile:', error);
    }
  };

  // Function to clear user data from context (called after logout)
  const clearUserData = () => {
    setUser(null);
    setUserProfile(null);
  };

  // Check authentication status on component mount
  useEffect(() => {
    fetchUserData();
  }, []);

  // Helper to check if user is authenticated
  const isAuthenticated = user !== null;

  // Helper to check if user has premium
  const isPremium = userProfile?.isPremium || false;

  // Helper to get user's full name
  const getUserFullName = () => {
    if (!userProfile) return user?.name || 'User';
    return `${userProfile.firstName} ${userProfile.lastName}`.trim();
  };

  // Helper to get user's initials for avatar
  const getUserInitials = () => {
    const fullName = getUserFullName();
    return fullName
      .split(' ')
      .map(name => name.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const contextValue = {
    // State
    user,
    userProfile,
    loading,
    error,
    isAuthenticated,
    isPremium,

    // Actions
    fetchUserData,
    refreshUserProfile,
    clearUserData,

    // Helpers
    getUserFullName,
    getUserInitials,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
