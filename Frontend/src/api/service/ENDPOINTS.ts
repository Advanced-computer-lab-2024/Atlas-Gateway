export const baseURL = "http://localhost:5000";

const ENDPOINTS = {
	places: {
		list: "api/places/list",
		listGoverner: "api/places/listGoverner",
		show: (id: string) => `api/places/show/${id}`,
		create: "api/places/create",
		update: (id: string) => `api/places/update/${id}`,
		delete: (id: string) => `api/places/delete/${id}`,
	},
	products: {
		list: "api/products/list",
		show: (id: string) => `api/products/show/${id}`,
		create: "api/products/create",
		update: (id: string) => `api/products/update/${id}`,
		delete: (id: string) => `api/products/delete/${id}`,
		addWishlist: (id: string) => `api/products/wishlist/${id}`,
		removeWishlist: (id: string) => `api/products/removewishlist/${id}`,
		addToCart: (id: string) => `api/tourist/cart/add/${id}`,
		removeFromCart: (id: string) => `api/tourist/cart/remove/${id}`,
		updateProductQuantity: (id: string) => `api/tourist/cart/update/${id}`,
	},
	orders: {
		create: "api/orders/create",
		list: "api/orders/list",
		show: (id: string) => `api/orders/show/${id}`,
		cancel: (id: string) => `api/orders/cancel/${id}`,
	},
	addres: {
		addAddress: "api/orders/addAddress",
		//updateAddress: "api/orders/updateAddress",
		//listAddresses: "api/orders/listAddresses",
	},
	activity: {
		list: "api/activity/list",
		listAdvertisor: "api/activity/listAdvertisor",
		show: (id: string) => `api/activity/show/${id}`,
		create: "api/activity/create",
		update: (id: string) => `api/activity/update/${id}`,
		delete: (id: string) => `api/activity/delete/${id}`,
		book: (id: string) => `api/activity/book/${id}`,
		cancelBooking: (id: string) => `api/activity/cancelBooking/${id}`,
		bookmark: (id: string) => `api/activity/bookmark/${id}`,
		removeBookmark: (id: string) => `api/activity/removeBookmark/${id}`,
	},
	changePassword: "/api/password/change",
	forgetPassword: "/api/password/forget",
	login: "api/login",
	register: "api/register/create",
	media: {
		upload: "api/media/upload",
		download: "api/media/download",
	},
	payment: "/api/payment/createPaymentIntent",
	admin: {
		list: "api/admin/list",
		show: (id: string) => `api/admin/show/${id}`,
		create: "api/admin/create",
		delete: (id: string) => `api/admin/delete/${id}`,
		report: "api/admin/report",
	},
	governor: {
		list: "api/governor/list",
		create: "api/governor/create",
		showGoverner: (id: string) => `api/governor/showGoverner/${id}`,
		update: (id: string) => `api/governor/update/${id}`,
		delete: (id: string) => `api/governor/delete/${id}`,
	},
	tourist: {
		list: "api/tourist/list",
		show: (id: string) => `api/tourist/show/${id}`,
		update: (id: string) => `api/tourist/update/${id}`,
		redeem: (id: string) => `api/tourist/redeem/${id}`,
		delete: (id: string) => `api/tourist/delete/${id}`,
		requestDelete: (id: string) => `api/tourist/requestDelete/${id}`,
		upcomingActivities: (id: string) =>
			`api/tourist/upcomingActivities/${id}`,
		upcomingItineraries: (id: string) =>
			`api/tourist/upcomingItineraries/${id}`,
		pastActivities: (id: string) => `api/tourist/pastActivities/${id}`,
		pastItineraries: (id: string) => `api/tourist/pastItineraries/${id}`,
	},
	seller: {
		list: "api/seller/list",
		show: (id: string) => `api/seller/show/${id}`,
		update: (id: string) => `api/seller/update/${id}`,
		delete: (id: string) => `api/seller/delete/${id}`,
		requestDelete: (id: string) => `api/seller/requestDelete/${id}`,
		salesReport: (id: string) => `api/seller/report/${id}`,
	},
	tourGuide: {
		list: "api/tourGuide/list",
		show: (id: string) => `api/tourGuide/show/${id}`,
		update: (id: string) => `api/tourGuide/update/${id}`,
		delete: (id: string) => `api/tourGuide/delete/${id}`,
		requestDelete: (id: string) => `api/tourGuide/requestDelete/${id}`,
		report: (id: string) => `api/tourGuide/report/${id}`,
	},
	advertiser: {
		list: "api/advertiser/list",
		show: (id: string) => `api/advertiser/show/${id}`,
		update: (id: string) => `api/advertiser/update/${id}`,
		delete: (id: string) => `api/advertiser/delete/${id}`,
		requestDelete: (id: string) => `api/advertiser/requestDelete/${id}`,
		report: (id: string) => `api/advertiser/report/${id}`,
	},
	transportation_advertiser: {
		list: "api/transportation_advertiser/list",
		show: (id: string) => `api/transportation_advertiser/show/${id}`,
		update: (id: string) => `api/transportation_advertiser/update/${id}`,
		delete: (id: string) => `api/transportation_advertiser/delete/${id}`,
		report: (id: string) => `api/transportation_advertiser/report/${id}`,
	},
	category: {
		list: "api/category/list",
		show: (id: string) => `api/category/show/${id}`,
		create: "api/category/create",
		update: (id: string) => `api/category/update/${id}`,
		delete: (id: string) => `api/category/delete/${id}`,
	},
	tag: {
		list: "api/tags/list",
		show: (id: string) => `api/tag/show/${id}`,
		create: "api/tags/preference/create",
		update: "api/tag/update",
		delete: (id: string) => `api/tags/preference/delete/${id}`,
	},
	itinerary: {
		list: "api/itinerary/list",
		listTourguide: "api/itinerary/listTourGuide",
		show: (id: string) => `api/itinerary/show/${id}`,
		create: "api/itinerary/create",
		update: (id: string) => `api/itinerary/update/${id}`,
		flag: (id: string) => `api/itinerary/flag/${id}`,
		toggleStatus: (id: string) => `api/itinerary/toggleStatus/${id}`,
		delete: (id: string) => `api/itinerary/delete/${id}`,
		book: (id: string) => `api/itinerary/book/${id}`,
		cancelBooking: (id: string) => `api/itinerary/cancelBooking/${id}`,
		bookmark: (id: string) => `api/itinerary/bookmark/${id}`,
		removeBookmark: (id: string) => `api/itinerary/removeBookmark/${id}`,
	},
	flights: {
		search: "api/flights/search",
		book: "api/flights/book",
	},
	hotels: {
		list: (cityCode: string) => `api/hotels/list/${cityCode}`,
		show: (id: string) => `api/hotels/show/${id}`,
		bookRoom: "api/hotels/bookRoom",
		myBookings: "api/hotels/myBookings",
		delete: (id: string) => `api/hotels/delete/${id}`,
	},
	complaint: {
		list: "api/complaint/list",
		show: (id: string) => `api/complaint/show/${id}`,
		listProfile: "api/complaint/list-profile",
		create: "api/complaint/create",
		update: (id: string) => `api/complaint/update/${id}`,
	},

	transportation: {
		list: "api/transportation/list",
		listAdvertisor: "api/transportation/listAdvertisor",
		get: (id: string) => `api/transportation/get/${id}`,
		create: "api/transportation/create",
		update: (id: string) => `api/transportation/update/${id}`,
		delete: (id: string) => `api/transportation/delete/${id}`,
		book: (id: string) => `api/transportation/book/${id}`,
		cancelBooking: (id: string) => `api/transportation/cancelBooking/${id}`,
	},
	userStatistics: {
		list: "api/admin/userStats",
	},
};

export default ENDPOINTS;
