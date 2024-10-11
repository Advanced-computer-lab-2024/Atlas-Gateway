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
		update: "api/products/update",
		delete: "api/products/delete",
	},
	activity: {
		list: "api/activity/list",
		listAdvertisor: "api/activity/listAdvertisor",
		show: (id: string) => `api/activity/show/${id}`,
		create: "api/activity/create",
		update: (id: string) => `api/activity/update/${id}`,
		delete: (id: string) => `api/activity/delete/${id}`,
	},
	login: "api/login",
	register: "api/register/create",
	admin: {
		list: "api/admin/list",
		delete: (id: string) => `api/admin/delete/${id}`,
	},
	tourist: {
		show: (id: string) => `api/tourist/show/${id}`,
		update: (id: string) => `api/tourist/update/${id}`,
	},
	seller: {
		show: (id: string) => `api/seller/show/${id}`,
		update: (id: string) => `api/seller/update/${id}`,
	},
	tourGuide: {
		show: (id: string) => `api/tourGuide/show/${id}`,
		update: (id: string) => `api/tourGuide/update/${id}`,
	},
	advertiser: {
		show: (id: string) => `api/advertiser/show/${id}`,
		update: (id: string) => `api/advertiser/update/${id}`,
	},
	category: {
		list: "api/category/list",
		show: (id: string) => `api/category/show/${id}`,
		create: "api/category/create",
		update: "api/category/update",
		delete: "api/category/delete",
	},
	tag: {
		list: "api/tags/list",
		show: (id: string) => `api/tag/show/${id}`,
		create: "api/tag/create",
		update: "api/tag/update",
		delete: "api/tag/delete",
	},
	itinerary: {
		list: "api/itinerary/list",
		listTourguide: "api/itinerary/listTourGuide",
		show: (id: string) => `api/itinerary/show/${id}`,
		create: "api/itinerary/create",
		update: (id: string) => `api/itinerary/update/${id}`,
		delete: (id: string) => `api/itinerary/delete/${id}`,
	},
};

export default ENDPOINTS;
