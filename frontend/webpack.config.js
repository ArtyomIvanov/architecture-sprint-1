const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const path = require('path');
const deps = require('./package.json').dependencies;

module.exports = {
    entry: './src/index.js',
    output: {
        publicPath: 'auto',
    },
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 3000,
    },
    resolve: {
        extensions: ['.jsx', '.js', '.json', '.css', '.scss', '.jpg', 'jpeg', 'png', 'svg', 'ico', 'json'],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'] // if you're using React
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(sass|scss)$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            // {
            //     test: /\.(png|svg|jpg|jpeg|gif|ico|json)$/,
            //     use: ['file-loader']
            // },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                type: 'asset/resource'
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            }
        ]
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'host',
            filename: 'remoteEntry.js',
            remotes: {
                authMicro: 'authMicro@http://localhost:3001/remoteEntry.js',
                cardMicro: 'cardMicro@http://localhost:3002/remoteEntry.js',
                profileMicro: 'profileMicro@http://localhost:3003/remoteEntry.js'
            },
            shared: { react: { singleton: true }, "react-dom": { singleton: true }, "react-router-dom": { singleton: true } },
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
};
