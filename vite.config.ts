import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    vue(),
    // 仅在 mock 模式下启用 mock 插件，生产构建不包含任何 mock 内容
    ...(mode === 'mock'
      ? [
        (async () =>
          (await import('vite-plugin-mock')).viteMockServe({
            mockPath: 'mock',
            enable: true,
          }))(),
      ]
      : []),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      dts: 'src/auto-imports.d.ts',
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: 'src/components.d.ts',
    }),
    // 打包分析插件，构建后生成 stats.html 可视化报告
    visualizer({
      open: true,
      filename: 'stats.html',
      gzipSize: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/variables.scss" as *; @use "@/styles/mixins.scss" as *;`
      }
    }
  },
}))
