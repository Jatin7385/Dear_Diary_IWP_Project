const path = require("path");

const config = {
    mode: "development",
    entry: {
        react: ["@babel/polyfill", "react"],
        loginPage: ["./src/components/loginPage.jsx"],
        signupPage: ["./src/components/signupPage.jsx"],
    },
    output: {
        path: path.resolve(__dirname, "static", "react"),
        filename: "[name].js",
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                    },
                },
                exclude: [/node_modules/, /static/],
            },
        ],
    },
    resolve: {
        extensions: [".js", ".jsx", ".json", ".wasm", ".mjs", "*"],
    },
};

module.exports = config;
