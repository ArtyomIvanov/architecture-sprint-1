const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const path = require('path');

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
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                use: ['file-loader']
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
                remoteApp: 'host@http://localhost:3000/remoteEntry.js'
            },
            exposes: {
                './App': './src/components/App'
            },
            shared: ['react', 'react-dom']
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
};
