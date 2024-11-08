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
	},
	activity: {
		list: "api/activity/list",
		listAdvertisor: "api/activity/listAdvertisor",
		show: (id: string) => `api/activity/show/${id}`,
		create: "api/activity/create",
		update: (id: string) => `api/activity/update/${id}`,
		delete: (id: string) => `api/activity/delete/${id}`,
	},
	changePassword: "/api/change-password",
	login: "api/login",
	register: "api/register/create",
	media: {
		upload: "api/media/upload",
		download: "api/media/download",
	},
	admin: {
		list: "api/admin/list",
		create: "api/admin/create",
		delete: (id: string) => `api/admin/delete/${id}`,
	},
	governor: {
		list: "api/governor/list",
		create: "api/governor/create",
		delete: (id: string) => `api/governor/delete/${id}`,
	},
	tourist: {
		list: "api/tourist/list",
		show: (id: string) => `api/tourist/show/${id}`,
		update: (id: string) => `api/tourist/update/${id}`,
		delete: (id: string) => `api/tourist/delete/${id}`,
		requestDelete: (id: string) => `api/tourist/requestDelete/${id}`,
	},
	seller: {
		list: "api/seller/list",
		show: (id: string) => `api/seller/show/${id}`,
		update: (id: string) => `api/seller/update/${id}`,
		delete: (id: string) => `api/seller/delete/${id}`,
		requestDelete: (id: string) => `api/seller/requestDelete/${id}`,
	},
	tourGuide: {
		list: "api/tourGuide/list",
		show: (id: string) => `api/tourGuide/show/${id}`,
		update: (id: string) => `api/tourGuide/update/${id}`,
		delete: (id: string) => `api/tourGuide/delete/${id}`,
		requestDelete: (id: string) => `api/tourGuide/requestDelete/${id}`,
	},
	advertiser: {
		list: "api/advertiser/list",
		show: (id: string) => `api/advertiser/show/${id}`,
		update: (id: string) => `api/advertiser/update/${id}`,
		delete: (id: string) => `api/advertiser/delete/${id}`,
		requestDelete: (id: string) => `api/advertiser/requestDelete/${id}`,
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
		delete: (id: string) => `api/itinerary/delete/${id}`,
	},
	complaint: {
		list: "api/complaint/list",
		show: (id: string) => `api/complaint/show/${id}`,
		listProfile: "api/complaint/list-profile",
		create: "api/complaint/create",
		update: (id: string) => `api/complaint/update/${id}`,
	},
};

export default ENDPOINTS;
