const path = require('path');

module.exports = {
    entry: './src/index.jsx',
    output: { 
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public', 'js'),
        publicPath: '/js/'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['react-hot', 'babel-loader']
            },
            {
                test: /\.sass$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    devtool: 'eval-source-map',
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    devServer: {
        inline: true,
        contentBase: path.resolve(__dirname, 'public'),
        port: 8080
  }
};