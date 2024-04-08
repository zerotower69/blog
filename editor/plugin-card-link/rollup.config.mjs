import typescript from "@rollup/plugin-typescript"
import nodeResolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import json from "@rollup/plugin-json"
import terser from "@rollup/plugin-terser"
import {resolve} from "path"

export default {
  input:"./src/index.ts",
  output:[
    {
       file:"./dist/index.mjs",
       format:"es",
    },
    {
      file:"./dist/index.js",
      format:"cjs"
    }
  ],
  plugins:[
    json(),
    nodeResolve(),
    typescript({
      tsconfig:"tsconfig.json",
      outputToFilesystem:false
    }),
    commonjs({
      include:/node_modules/
    }),
    terser(),
  ]
}