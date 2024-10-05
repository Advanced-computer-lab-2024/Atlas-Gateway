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
	activities: {
		list: "api/activities/list",
		show: (id: string) => `api/activities/show/${id}`,
		create: "api/activities/create",
		update: "api/activities/update",
		delete: "api/activities/delete",
	},
	login: "api/login",
	register: "api/register/create",
	tourist: {
		show: (id: string) => `api/tourist/show/${id}`,
	},
};

export default ENDPOINTS;
