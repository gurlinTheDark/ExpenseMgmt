
const HtmlWebPackPlugin = require( 'html-webpack-plugin' );
const path = require( 'path' );
module.exports = {
   context: __dirname,
   entry: ['regenerator-runtime/runtime.js', './src/index.js'],
   output: {
      path: path.resolve( __dirname, 'dist' ),
      filename: 'main.js',
      publicPath: '/',
   },
   devServer: {
      historyApiFallback: true,
      proxy: { "/prod/expenses": { target: 'http://localhost:3000/', secure: true },
               "/register/": { target: 'http://localhost:3000/', secure: true },
               "/login/": { target: 'http://localhost:3000/', secure: true }}
   },
   module: {
      rules: [
         {
            test: /\.js$/,
            use: 'babel-loader',
         },
         {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
         },
         {
            test: /\.(png|j?g|svg|gif)?$/,
            use: 'file-loader'
         }
]
   },
   resolve: {
		fallback:  {
			"crypto": require.resolve("crypto-browserify"),
			 "https": require.resolve("https-browserify") ,
			 "http": require.resolve("stream-http") ,
			 "zlib": require.resolve("browserify-zlib")
		}
	},
   plugins: [
      new HtmlWebPackPlugin({
         template: path.resolve( __dirname, 'public/index.html' ),
         filename: 'index.html'
      })
   ]
};