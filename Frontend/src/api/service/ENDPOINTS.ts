const ENDPOINTS = {
	places: {
		list: "api/places/list",
		show: (id: string) => `api/places/show/${id}`,
		create: "api/places/create",
		update: "api/places/update",
		delete: "api/places/delete",
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
		show: (id: string) => `api/activity/show/${id}`,
		create: "api/activity/create",
		update: "api/activity/update",
		delete: "api/activity/delete",
	},
	login: "api/login",
	register: "api/register/create",
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
		list: "api/tag/list",
		show: (id: string) => `api/tag/show/${id}`,
		create: "api/tag/create",
		update: "api/tag/update",
		delete: "api/tag/delete",
	},
};

export default ENDPOINTS;
