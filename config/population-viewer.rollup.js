import babel from 'rollup-plugin-babel';

const banner = 
`/*
 * Population Viewer 
 * https://github.com/CSBP-CPSE/population-viewer/blob/master/LICENCE.md
 * v1.0 - 2021-02-04
 */`;

export default {
    input: '../population-viewer/src/main.js',
    output: {
        file: '../population-viewer/dist/main.min.js',
        format: 'iife',
        banner: banner
    },
    plugins: [
        babel({
            exclude: 'node_modules/**',
			configFile: './config/babel.config.js'
        })
    ]
}
