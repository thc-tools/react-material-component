module.exports = {
    roots: ["<rootDir>/src"],
    transform: {
        "^.+\\.tsx?$": "ts-jest",
        "^.+\\.jsx?$": "babel-jest"
    },
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

    // Setup Enzyme
    snapshotSerializers: ["enzyme-to-json/serializer"],
    setupTestFrameworkScriptFile: "<rootDir>/enzyme.config.js",
    transformIgnorePatterns: [
        "node_modules/(?!(@material|my-project)/)"    
    ]
};
