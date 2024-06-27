import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: 'Montserrat, sans-serif',
    body: 'Montserrat, sans-serif',
  },
  colors: {
    customColors: {
      lightGray: '#F0E6EF',
      darkGray: '#343434',
      gold: '#FFD700',
      lightPink: '#FFD6E7',
      darkPink: '#D1479E',
      black: '#000',
      beige: '#F5F5DC',
    }
  },
  components: {
    Menu: {
      parts: ['button', 'list'],
      baseStyle: {
        button: {
          bg: 'customColors.lightGray',
          color: 'customColors.darkGray',
          _hover: {
            bg: 'customColors.darkPink',
          },
        },
        list: {
          bg: 'customColors.lightPink',
          color: 'customColors.darkGray',
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          bg: 'customColors.lightGray',
          color: 'customColors.darkGray',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
          _hover: {
            boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.2)',
          },
        },
        front: {
          bg: 'customColors.gold',
        },
        back: {
          bg: 'customColors.darkPink',
          color: 'customColors.lightGray',
        },
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: 'customColors.beige',
        color: 'customColors.darkGray',
      },
      a: {
        color: 'customColors.black',
        _hover: {
          textDecoration: 'underline',
          color: 'customColors.darkPink',
        },
      },
      h1: {
        color: 'customColors.gold',
      },
      h2: {
        color: 'customColors.lightPink',
      },
      p: {
        color: 'customColors.black',
      },
    },
  },
});

export default theme;

