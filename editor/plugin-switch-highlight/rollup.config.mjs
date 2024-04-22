import typescript from "@rollup/plugin-typescript"
import nodeResolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import json from "@rollup/plugin-json"
import terser from "@rollup/plugin-terser"

export default {
  input:"./src/index.ts",
  cache:false,
  output:[
    {
       file:"./dist/index.mjs",
       format:"es",
       banner:"//@Copyright zerotower69"
    },
    {
      file:"./dist/index.js",
      format:"cjs",
      banner:"//@Copyright zerotower69"
    }
  ],
  plugins:[
    json(),
    nodeResolve(),
    typescript({
      outputToFilesystem:false
    }),
    commonjs({
      include:/node_modules/
    }),
    terser(),
  ]
}