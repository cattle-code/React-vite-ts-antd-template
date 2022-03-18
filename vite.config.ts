import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


import styleImport from "vite-plugin-style-import"

// const themeVariables = lessToJs(
//   fs.readFileSync(path.reslove(__dirname,'./config/variables.less'),'utf8')
// )

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    styleImport({
      libs: [
        {
          libraryName: 'antd',
          esModule: true,
          resolveStyle:(name) => {
            return `antd/es/${name}/style/index`
          }
        }
      ]
    })
  ],
  css:{
    preprocessorOptions: {
      less: {
        // 支持内联JavaScript，支持less内联js
        javascriptEnabled: true,
        // modifyvars: themeVariables
      }
    }
  },
  server:{
    host: '0.0.0.0'
  },
  
})
