import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

interface AuthState {
	authUser: any | null;
	isSigningUp: boolean;
	isLoggingIn: boolean;
	isUpdatingProfile: boolean;
	isCheckingAuth: boolean;
	checkAuth: () => Promise<void>;
	logout: () => Promise<void>;
	signup: (formData: { fullName: string; email: string; password: string }) => void;
	login: (formData: { email: string, password: string }) => void
}

export const useAuthStore = create<AuthState>((set) => ({
	authUser: null,
	isSigningUp: false,
	isLoggingIn: false,
	isUpdatingProfile: false,
	isCheckingAuth: true,

	checkAuth: async () => {
		try {
			const res = await axiosInstance.get("/auth/check");
			set({ authUser: res.data, isCheckingAuth: false });
		} catch (error) {
			console.error("Error checking auth:", error);
			set({ authUser: null, isCheckingAuth: false });
		}
	},

	signup: async (data: any) => {
		set({ isSigningUp: true })
		try {
			const res = await axiosInstance.post("/auth/signup", data)
			set({ authUser: res.data })
			toast.success("Account created successfully")
		} catch (error: any) {
			toast.error(error.response.data.message)
		} finally {
			set({ isSigningUp: false })
		}
	},

	logout: async () => {
		try {
			await axiosInstance.post("/auth/logout")
			set({ authUser: null })
			toast.success("Logged out successfully")
		} catch (error: any) {
			toast.error(error.response.data.message)
		}
	},

	login: async (data: any) => {
		set({ isLoggingIn: true })
		try {
			const res = await axiosInstance.post("/auth/login", data)
			set({ authUser: res.data })
			toast.success("Logged in successfully")
		} catch (error: any) {
			toast.error(error.response.data.message)
		} finally {
			set({ isLoggingIn: false })
		}
	}

}));

