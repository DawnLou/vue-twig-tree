import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from "rollup-plugin-babel";
import typescript from 'rollup-plugin-typescript2';
import vue from 'rollup-plugin-vue2';
import css from 'rollup-plugin-css-only';
export default [
    {
        input: 'src/index.ts',
        output: [
            {
                name: 'vue-twig-tree',
                file: 'dist/index.esm.js',
                format: 'esm'
            },
            {
                name: 'vue-twig-tree',
                file: 'dist/index.umd.js',
                format: 'umd'
            }
        ],
        plugins: [
            vue(),
            css(),
            resolve(),
            commonjs(),
            babel(),
            typescript(),
        ]
    }
];