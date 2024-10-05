import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { TUser } from "@/types/global";

type TLoginStore = {
	user: TUser | undefined;
	setUser: (user: TUser) => void;
	resetUser: () => void;
};

export const useLoginStore = create(
	persist<TLoginStore>(
		(set) => ({
			user: undefined,
			setUser: (user: TUser) => set({ user }),
			resetUser: () => set({ user: undefined }),
		}),
		{
			name: "user", // name of the item in the storage (must be unique)
			storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
		},
	),
);

export function onLogout() {
	localStorage.clear();
	sessionStorage.clear();
}
