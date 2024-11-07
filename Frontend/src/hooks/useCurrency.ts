import { useLoginStore } from "@/store/loginStore";
import { exchangeRateResponse } from "@/types/consts";

export default function useCurrency() {
	const { user } = useLoginStore();
	const currency = user?.currency || "EGP";

	const convertCurrency = (amount: number = 0) => {
		return (
			amount *
			(exchangeRateResponse?.conversion_rates?.[currency] ??
				exchangeRateResponse?.conversion_rates?.EGP)
		);
	};

	return convertCurrency;
}
