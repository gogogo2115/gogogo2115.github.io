import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
    };
  }
}

// import 'styled-components'
// import { theme } from '@/styles/theme'

// type Theme = typeof theme

// declare module 'styled-components' {
//   export interface DefaultTheme extends Theme {}
// }
