import { extendTheme } from '@chakra-ui/react';

// import "@fontsource/poppins";
// import "@fontsource/solway";
import "@fontsource/space-grotesk"
import "@fontsource/fira-sans"

const theme = extendTheme({
  fonts: {
    heading: `"Cal Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,	
  	body: `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
  },
  colors: {
    primary: {
      100: '#8612fa',
      200: '#ffffff',
      300: '#53565a',
      400: '#53565a',
      500: '#2196f3',
      600: '#1e88e5',
      700: '#ffffff1f',
      800: '#162936',
      900: '#242424',
      1000: '#1a1a1a',
      1100: '#192229',
    },
  },
})

export default theme;