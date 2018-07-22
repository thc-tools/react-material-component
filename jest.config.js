module.exports = {
    roots: ["<rootDir>/src"],
    transform: {
        "^.+\\.tsx?$": "ts-jest",
        "^.+\\.jsx?$": "<rootDir>/jest-preprocess.js"
    },
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

    // Setup Enzyme
    snapshotSerializers: ["enzyme-to-json/serializer"],
    setupTestFrameworkScriptFile: "jest-enzyme",
    testEnvironment: "enzyme",
    transformIgnorePatterns: ["node_modules/(?!(@material|my-project)/)"]
};
