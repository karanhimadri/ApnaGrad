import { ID, Query } from "appwrite";
import { account, database } from "./appwrite";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const USER_PROFILES_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_USER_PROFILES_COLLECTION_ID;
const BASE_URL = "notenest.himadri.me"

class AuthService {
  // 🔹 Register a new user
  async register({
    email,
    password,
    firstName,
    lastName,
    phone,
    university,
    semester,
    branch,
    agreeTerms,
    agreeMarketing,
  }) {
    try {
      // 1️⃣ Create user account in Auth
      const user = await account.create({
        userId: ID.unique(),
        email,
        password,
        name: `${firstName} ${lastName}`,
      });

      // 2️⃣ Create login session
      await account.createEmailPasswordSession({ email, password });

      // 3️⃣ Create user profile in database
      const profile = await database.createDocument(
        DATABASE_ID,
        USER_PROFILES_COLLECTION_ID,
        ID.unique(),
        {
          userId: user.$id,
          firstName,
          lastName,
          phone,
          university,
          semester,
          branch,
          agreeTerms,
          agreeMarketing,
          isPremium: false,
          premiumExpireAt: null,
        }
      );

      return {
        success: true,
        user,
        profile,
        message: "Account created successfully!",
      };
    } catch (error) {
      console.error("Registration error:", error);

      let errorMessage = "Registration failed. Please try again.";
      if (error.code === 409) errorMessage = "An account with this email already exists.";
      else if (error.code === 400) errorMessage = "Invalid email or password format.";
      else if (error.message) errorMessage = error.message;

      return { success: false, error: errorMessage };
    }
  }

  // 🔹 Login user
  async login(email, password) {
    try {
      const session = await account.createEmailPasswordSession({ email, password });

      return {
        success: true,
        session,
        message: "Login successful!",
      };
    } catch (error) {
      console.error("Login error:", error);

      let errorMessage = "Login failed. Please try again.";
      if (error.code === 401) errorMessage = "Invalid email or password.";
      else if (error.message) errorMessage = error.message;

      return { success: false, error: errorMessage };
    }
  }

  // 🔹 Logout user
  async logout() {
    try {
      await account.deleteSession({ sessionId: "current" });
      return { success: true, message: "Logout successful!" };
    } catch (error) {
      console.error("Logout error:", error);
      return { success: false, error: "Logout failed. Please try again." };
    }
  }

  // 🔹 Get current user (Auth info)
  async getCurrentUser() {
    try {
      const user = await account.get();
      return { success: true, user };
    } catch {
      return { success: false, error: "User not authenticated" };
    }
  }

  // 🔹 Get user profile (extra data from DB)
  async getUserProfile(userId) {
    try {
      const result = await database.listDocuments(
        DATABASE_ID,           // databaseId
        USER_PROFILES_COLLECTION_ID, // collectionId
        [Query.equal("userId", userId)],
      );

      if (result.total > 0 && result.documents?.length > 0) {
        return { success: true, profile: result.documents[0] };
      } else {
        return { success: false, error: "Profile not found" };
      }
    } catch (error) {
      console.error("Error getting profile:", error);
      return { success: false, error: "Failed to get user profile" };
    }
  }

  // 🔹 Update user profile
  async updateUserProfile(rowId, data) {
    try {
      const updated = await database.updateDocument(
        DATABASE_ID,
        USER_PROFILES_COLLECTION_ID,
        rowId,
        data
      );

      return { success: true, profile: updated };
    } catch (error) {
      console.error("Error updating profile:", error);
      return { success: false, error: "Failed to update profile" };
    }
  }

  async forgotPassword(email) {
    try {
      await account.createRecovery({
        email,
        url: `${BASE_URL}/auth/reset-password`,
      });

      return {
        success: true,
        message: "Password reset email sent. Check your inbox!",
      };
    } catch (error) {
      console.error("Forgot password error:", error);
      let errorMessage = "Failed to send password reset email.";
      if (error.message) errorMessage = error.message;
      return { success: false, error: errorMessage };
    }
  }

  // 🔹 2️⃣ Reset password using recovery link
  async resetPassword(userId, secret, newPassword) {
    try {
      await account.updateRecovery({
        userId,
        secret,
        password: newPassword,
        passwordAgain: newPassword,
      });

      return {
        success: true,
        message: "Password has been reset successfully!",
      };
    } catch (error) {
      console.error("Reset password error:", error);
      let errorMessage = "Failed to reset password.";
      if (error.message) errorMessage = error.message;
      return { success: false, error: errorMessage };
    }
  }
}

const authService = new AuthService();
export default authService;
