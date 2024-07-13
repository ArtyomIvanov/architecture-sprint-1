const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        publicPath: 'auto',
    },
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 3001,
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'host',
            remotes: {
                remoteApp: 'remoteApp@http://localhost:3002/remoteEntry.js'
            },
            shared: ['react', 'react-dom']
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
};
