import { create } from "zustand";

import { TUser } from "@/types/global";

type TLoginStore = {
	user: TUser | undefined;
	setUser: (user: TUser) => void;
	resetUser: () => void;
};

export const useLoginStore = create<TLoginStore>((set) => ({
	user: undefined,
	setUser: (user: TUser) => set({ user }),
	resetUser: () => set({ user: undefined }),
}));

export function onLogout() {
	localStorage.clear();
	useLoginStore.getState().resetUser();
}
