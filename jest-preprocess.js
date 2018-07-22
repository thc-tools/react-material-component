const babelOptions = {
    presets: [
        [
            "@thc/babel-preset-react",
            {
                hot: false,
                mode: "test"
            }
        ]
    ]
};

module.exports = require("babel-jest").createTransformer(babelOptions);
