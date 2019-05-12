import resolve from 'rollup-plugin-node-resolve'

export default {
	input: 'src/index.js',
	external: [
		'react',
		'react-dom',
	],
	output: {
		file: 'dist/bundle.js',
		format: 'cjs',
	},
	plugins: [
		resolve(),
	]
}
