import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite' // 不加这个配置，ElMessage出不来

// https://vitejs.dev/config/
export default ({ mode }) => defineConfig({
  plugins: [
    vue(),
    // 按需引入，主题色的配置，需要加上 importStyle: 'sass'
    Components({
      dirs: ['src/components'],
      resolvers: [ElementPlusResolver({
        importStyle: 'sass'
      })],
    }),
    ElementPlus()
  ],
  resolve: {
    alias: {
      // '~': path.resolve(__dirname, './'),
      // '@': path.resolve(__dirname, 'src'),
    },
  },
  base: './',
  server: {
    port: 3000
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:8083', // 凡是遇到 /api 路径的请求，都映射到 target 属性
    //     changeOrigin: true,
    //     rewrite: path => path.replace(/^\/api/, '') // 重写 api 为 空，就是去掉它
    //   }
    // }
  },
  // devServer: {
  //   proxy: {
  //     '/login': {
  //       target: 'http://localhost:8083',
  //       changeOrigin: true,
  //       pathRewrite: { '^/login': '/login' } // 这行通常不必要，除非你需要改变实际请求的路径
  //     }
  //   }
  // },
  css: {
    loaderOptions: {
      // 覆盖掉element-plus包中的主题变量文件
      scss: {
        additionalData: `@use "@/styles/element/index.scss" as *;`,
      },
    },
  },
})
