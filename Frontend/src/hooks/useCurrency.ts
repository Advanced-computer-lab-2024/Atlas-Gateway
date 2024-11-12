import { useLoginStore } from "@/store/loginStore";
import { exchangeRateResponse } from "@/types/consts";

export default function useCurrency() {
	const { user } = useLoginStore();
	const currency = user?.currency || "EGP";

	const convertCurrency = (amount: number = 0, baseCurrency?: string) => {
		let amountToConvert = amount;
		if (baseCurrency) {
			amountToConvert =
				amount /
				exchangeRateResponse?.conversion_rates?.[
					baseCurrency as keyof typeof exchangeRateResponse.conversion_rates
				];
		}
		return (
			(
				amountToConvert *
				(exchangeRateResponse?.conversion_rates?.[currency] ??
					exchangeRateResponse?.conversion_rates?.EGP)
			).toFixed(2) +
			" " +
			currency
		);
	};

	return convertCurrency;
}
