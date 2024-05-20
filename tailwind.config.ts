import type { Config } from 'tailwindcss'
import { PluginAPI } from 'tailwindcss/types/config'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layout/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        // 给tailwind插件提示用的，需要和var.css同步更改
        primary: 'var(--primary, #8a57ea)',
        'level-1': 'var(--text-level-1, #282828)',
      },
      width: {
        'content-width': 'var(--content-width, 1280px)',
      },
      height: {
        'header-height': 'var(--header-height, 64px)',
      },
    },
  },
  plugins: [
    function ({ addUtilities, matchVariant, matchUtilities }: PluginAPI) {
      addUtilities({
        '.f-center': {
          display: 'flex',
          'justify-content': 'center',
          'align-items': 'center',
          'flex-direction': 'column',
        },
        '.f-i-center': {
          display: 'flex',
          'align-items': 'center',
        },
      })
      matchUtilities({
        bor: value => {
          const [width, color, rounded] = value.split(',')
          const entries = [
            ['borderWidth', width],
            ['borderColor', color],
            ['borderRadius', rounded],
          ].filter(v => !!v[1])
          return Object.fromEntries(entries)
        },
        wh: value => {
          const [width, height] = value.split(',')
          const entries = [
            ['width', width],
            ['height', height || width],
          ]
          return Object.fromEntries(entries)
        },
      })
    },
  ],
  corePlugins: {
    preflight: false,
  },
}
export default config
