import css from 'rollup-plugin-css-porter';

export default {
    input: 'mythic-gme-tools.js',
    output: {
        file: 'dist/mythic-gme-tools.js',
        format: 'cjs'
    },
    plugins: [ css({
        raw: 'dist/mythic-gme-tools.css',
        minified: false,
    }) ]
};