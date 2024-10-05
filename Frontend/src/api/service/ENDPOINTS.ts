const ENDPOINTS = {
	login: "api/login",
	register: "api/register/create",
	tourist: {
		show: (id: string) => `api/tourist/show/${id}`,
	},
};

export default ENDPOINTS;
