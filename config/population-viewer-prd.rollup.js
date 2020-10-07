import babel from 'rollup-plugin-babel';

export default {
    input: '../web-mapping-dev/population-viewer/main.js',
    output: {
        file: '../../web-mapping-prd/population-viewer/main.min.js',
        format: 'iife',
        name: 'bundle'
    },
    plugins: [
        babel({
            exclude: 'node_modules/**',
			configFile: './config/babel.config.js'
        })
    ]
}
