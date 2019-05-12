module.exports = {
	devtool: 'cheap-module-eval-source-map',
	entry: ['./example/src/index.jsx'],
	module: {
		rules: [
			{
        		test: /\.jsx?$/,
				exclude: [/node_modules/],
				use: [
					'babel-loader',
				]
			},
		]
	},
	output : {
		path: __dirname + '/example/build/',
		publicPath: '/',
		filename: 'index.js'
	},
};
