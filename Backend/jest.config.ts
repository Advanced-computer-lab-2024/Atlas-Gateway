export default {
	clearMocks: true,
	coverageProvider: "v8",
	moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
	roots: ["<rootDir>/src"],
	testMatch: ["**/_tests_/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
	transform: {
		"^.+\\.(ts|tsx)$": "ts-jest",
	},
};
