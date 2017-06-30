const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin'); 

const NODE_ENV = process.env.NODE_ENV || 'development';
const isDevelopment = NODE_ENV === 'development';
const suffix = isDevelopment? '?sourceMap' : '';

const webpack = require('webpack');
const plugins = [];
if (!isDevelopment){
    // plugins.push(new webpack.LoaderOptionsPlugin({
    //     debug: true
    // }));
    // plugins.push(UglifyJSPlugin({
    //     extractComments: true
    // }));
}

module.exports = {
    entry: 
    ['./src/js/frontend/index.jsx'],
    output: {
        path:     path.resolve(__dirname, 'public', 'assets/js'),
        publicPath: '/assets/js/',
        filename: 'index.js',
        sourceMapFilename: 'index.js.map'
    },
    cache: true,
    devtool: isDevelopment && 'inline-source-map',
    devServer: {
        historyApiFallback: true
    },
    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: ['react-hot-loader', 'babel-loader']
        },
        { 
            test: /\.scss$/, 
            //exclude: /node_modules/,
            use: [{
                loader: 'style-loader' // creates style nodes from JS strings
            }, {
                loader: `css-loader${suffix}` // translates CSS into CommonJS
            }, {
                loader: 'sass-loader' // compiles Sass to CSS
            }] 
        },
        {
            test: /\.css$/,
            use: [ 'style-loader', `css-loader${suffix}` ]
        },
        {
            test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
            loader: 'file-loader?name=[path][name].[ext]'
        },
        {
            test: /\.(png)?$/,
            loader: 'file-loader?name=[path][name].[ext]'
        }
        ]
    },
    plugins: plugins
};