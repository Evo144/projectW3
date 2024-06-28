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
      softYellow: '#FFF9E5',
      softPink: '#FFE4E1',
      lighterBeige: '#FAF8F0',
    },
  },
  components: {
    Menu: {
      parts: ['button', 'list', 'item'],
      baseStyle: {
        button: {
          fontSize: 'lg',
          fontWeight: 'bold',
          bg: 'customColors.gold', 
          color: 'customColors.darkGray',
          padding: '3.5rem', 
          transition: 'all 0.2s cubic-bezier(.08,.52,.52,1)', 
          _hover: {
            bg: 'customColors.darkPink', 
            transform: 'scale(0.95)',
          },
          _active: {
            bg: 'customColors.lightPink', 
          },
          _focus: {
            boxShadow: '0 0 0 3px rgba(209, 71, 158, 0.6)', 
          },
        },
        list: {
          bg: 'customColors.softPink', 
          color: 'customColors.darkGray',
          boxShadow: 'xl', 
        },
        item: {
          _hover: {
            bg: 'customColors.lightGray', 
            color: 'customColors.black', 
          },
          _focus: {
            bg: 'customColors.beige', 
            color: 'customColors.darkGray',
          },
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          maxWidth: '320px',
          height: 'auto',
          width: '100%', 
          bg: 'transparent',
          margin: '0 auto',
          color: 'customColors.darkGray',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
          borderRadius: '12px',
          _hover: {
            boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.2)',
          },
        },
        front: {
          height: 'auto',
          bg: 'customColors.softYellow',
          borderRadius: '12px',
          opacity: 1,
          minH: 'auto', 
          p: 4,
        },
        back: {
          bg: 'customColors.lightPink',
          color: 'customColors.darkGray',
          borderRadius: '12px',
          opacity: 1,
          minH: 'auto', 
          p: 4,
          height: 'auto',
        },
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: 'customColors.lighterBeige',
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