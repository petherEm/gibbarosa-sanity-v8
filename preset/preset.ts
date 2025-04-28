import uiPlugin from './plugins/plugin'
import uiTheme from './theme/theme'

export const uiPreset = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: { 
    extend: { ...uiTheme }  // Use extend instead of replacing
  },
  plugins: [uiPlugin],
}
