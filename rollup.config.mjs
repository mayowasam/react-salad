import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import pkg from './package.json' with { type: "json" };
import { babel } from '@rollup/plugin-babel';
import { dts } from "rollup-plugin-dts";
import postcss from 'rollup-plugin-postcss'
import replace from '@rollup/plugin-replace';
import dotenv from "rollup-plugin-dotenv"

export default [{
    input: 'src/index.ts',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            exports: 'named',
            sourcemap: true,
        },
        {
            file: pkg.module,
            format: 'es',
            exports: 'named',
            sourcemap: true,
        },
    ],
    external: [
        'react',
        'react-dom',
        'antd',
        '@tanstack/react-query',
        '@ant-design/nextjs-registry',
        'axios'
    ],
    plugins: [
        postcss({
            config: {
              path: './postcss.config.js',
            },
            extensions: ['.css'],
            minimize: true,
            inject: {
              insertAt: 'top',
            },
          }),
        typescript({
            tsconfig: './tsconfig.json',
            clean: true,
        }),
        dotenv(),
        babel({
            babelHelpers: 'bundled',
            exclude: 'node_modules/**', // Only transpile our source code
            extensions: ['.ts', '.js', '.tsx', '.jsx'],
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify('production'),
            preventAssignment: true,
          }),
        resolve(),
        commonjs()
    ],
},
{
    input: './src/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
    external:[/\.css$/]
}
];