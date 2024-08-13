import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
// import external from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import pkg from './package.json' assert { type: "json" };
import { babel } from '@rollup/plugin-babel';
import { dts } from "rollup-plugin-dts";


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
    external: ['react', 'antd', 'react-dom', '@tanstack/react-query'],
    plugins: [
        external(),
        typescript({
            tsconfig: './tsconfig.json',
            clean: true,
        }),
        babel({
            babelHelpers: 'bundled',
            exclude: 'node_modules/**', // Only transpile our source code
            extensions: ['.ts', '.js', '.tsx', '.jsx'],
        }),
        resolve(),
        commonjs(),
    ],
},
{
input: './src/types/index.d.ts',
output:[{file:'dist/index.d.ts',format: 'esm'}],
plugins:[dts()]
}
];