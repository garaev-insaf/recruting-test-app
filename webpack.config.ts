import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';


module.exports = {
    mode: 'development',
    devtool: "inline-source-map",
    entry: "./src/index.tsx",
    module: {
        rules: [

            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-typescript",
                        ],
                    },
                },
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.scss$/,
                use: [{ loader: MiniCssExtractPlugin.loader }, "css-loader", "sass-loader"],
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader'
            },
            {
                test: /\.(png|jp(e*)g|svg|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "images/[hash]-[name].[ext]",
                        },
                    },
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "fonts/[hash]-[name].[ext]",
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".scss", ".css", "jsx"],
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
        }),

        new HtmlWebpackPlugin({
            template: "./public/index.html",
            filename: "index.html",
            inject: "body",
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "./public/images"),
                    to: path.resolve(__dirname, "dist/images"),
                },
                {
                    from: path.resolve(__dirname, "./public/fonts"),
                    to: path.resolve(__dirname, "dist/fonts"),
                },
            ],
        }),
    ],
    devServer: {
        // static: path.join(__dirname, "./public"),
        port: 3000,
        historyApiFallback: true,
        hot: true,
    },
};