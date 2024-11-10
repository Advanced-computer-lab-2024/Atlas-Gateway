import amadeus from "../../Config/amadeus.config";

interface HotelSearchParams {
	cityCode: string;
	checkInDate: string;
	checkOutDate: string;
	adults: string;
	page: number;
}

export async function getHotelsByCity(cityCode: string) {
	try {
		const response =
			await amadeus.referenceData.locations.hotels.byCity.get({
				cityCode: cityCode,
			});
		return response.data;
	} catch (error) {
		console.error("Error in getHotelsByCity:", error);
		throw error;
	}
}
export async function searchHotelOffers(params: HotelSearchParams) {
	try {
		const hotels = await getHotelsByCity(params.cityCode);

		const hotelsPerPage = 5;
		const startIndex = (params.page - 1) * hotelsPerPage;
		const endIndex = startIndex + hotelsPerPage;
		if (startIndex >= hotels.length) {
			return { message: "No more hotels available" };
		}
		const paginatedHotels = hotels.slice(startIndex, endIndex);

		const hotelIds = paginatedHotels
			.map((hotel: any) => hotel.hotelId)
			.join(",");

		const searchParams: any = {
			hotelIds: hotelIds,
			checkInDate: params.checkInDate,
			checkOutDate: params.checkOutDate,
			adults: params.adults,
		};

		const response =
			await amadeus.shopping.hotelOffersSearch.get(searchParams);
		return response.data;
	} catch (error) {
		console.error("Error in searchHotelOffers:", error);
		throw error;
	}
}
