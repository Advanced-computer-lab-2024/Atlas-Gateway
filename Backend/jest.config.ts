// /** @type {import('ts-jest').JestConfigWithTsJest} **/
// module.exports = {
//   testEnvironment: "node",
//   transform: {
//     "^.+.tsx?$": ["ts-jest",{}],
//   },
// };

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
