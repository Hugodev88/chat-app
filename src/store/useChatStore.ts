import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

interface ChatStore {
	selectedUser: any;
	isUsersLoading: boolean;
	isMessagesLoading: boolean;
	messages: any[];
	users: any[];
	getUsers: any;
	setSelectedUser: any;
}

export const useChatStore = create<ChatStore>((set) => ({
	messages: [],
	users: [],
	selectedUser: null,
	isUsersLoading: false,
	isMessagesLoading: false,

	getUsers: async () => {
		set({ isUsersLoading: true })
		try {
			const res = await axiosInstance.get('/messages/users')
			set({ users: res.data })
		} catch (error: any) {
			toast.error(error.response.data.message)
		} finally {
			set({ isUsersLoading: false })
		}
	},

	getMessages: async (userId: any) => {
		set({ isMessagesLoading: true })
		try {
			const res = await axiosInstance.get(`/messages/${userId}`)
			set({ messages: res.data })
		} catch (error: any) {
			toast.error(error.response.data.message)
		} finally {
			set({ isMessagesLoading: false })
		}
	},

	setSelectedUser: (selectedUser: any) => set({ selectedUser })


}))