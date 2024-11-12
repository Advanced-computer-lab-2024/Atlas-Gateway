import {
	PropsWithChildren,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";

import { useGenerateAmadeusToken } from "@/api/data/useGenerateAmadeusToken";

const AmadeusTokenContext = createContext<string | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useAmadeusToken = () => {
	return useContext(AmadeusTokenContext);
};

export const AmadeusTokenProvider = ({ children }: PropsWithChildren) => {
	const [token, setToken] = useState<string | null>(null);
	const { doGenerateAmadeusToken } = useGenerateAmadeusToken(setToken);

	useEffect(() => {
		const fetchToken = async () => {
			try {
				doGenerateAmadeusToken();
			} catch (error) {
				console.error("Error fetching Amadeus token:", error);
			}
		};

		if (!token) {
			fetchToken();
		}
	}, []);

	return (
		<AmadeusTokenContext.Provider value={token}>
			{children}
		</AmadeusTokenContext.Provider>
	);
};
