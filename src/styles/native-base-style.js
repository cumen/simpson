import { extendTheme } from 'native-base';

const newColorTheme = {
    defaultBg: '#EFEFEF',
    grey: '#606060',
    textGrey: '#7E7E7E',
    textDarkGrey: '#464646',
    loadingBg: 'rgba(191,189,189,0.8)',
    defaultColorLight:'#c5abcc',
    purpleColor: '#C93B91',
    defaultColor: {
        50: '#7C5486',
        100: '#7C5486',
        200: '#7C5486',
        300: '#7C5486',
        400: '#7C5486',
        500: '#7C5486',
        600: '#7C5486',
        700: '#7C5486',
        800: '#7C5486',
        900: '#7C5486',
    },
    defaultOrange: {
        50: '#F8901E',
        100: '#F8901E',
        200: '#F8901E',
        300: '#F8901E',
        400: '#F8901E',
        500: '#F8901E',
        600: '#F8901E',
        700: '#F8901E',
        800: '#F8901E',
        900: '#F8901E',
    },
};

const newComponentTheme = {
    Button: {
        baseStyle: {
            _text: {
                fontWeight: '400',
            },

        },
        defaultProps: {
            // borderColor: 'defaultColor.100'
        },
        variants: {
            //default
            solid: () => {
                return {
                    bgColor: 'blue.600',
                };
            }
        },
    },
    Input: {
        defaultProps: {
            bg: 'white',
            size: 'md',
            borderColor: 'defaultColor.100',
            placeholderTextColor: 'grey',
            fontWeight: '300',
        }
    },
    TextArea: {
        defaultProps: {
            bg: 'white',
            size: 'md',
            borderColor: 'defaultColor.100',
            placeholderTextColor: 'grey',
            fontWeight: '300',
        }
    },
    Select: {
        defaultProps: {
            bg: 'white',
            size: 'md',
            borderColor: 'defaultColor.100',
            placeholderTextColor: 'grey',
            fontWeight: '300',
            customDropdownIconProps: {
                size: 5,
                mr: 3,
                color:'defaultColor.100'
            },
        }
    }
};



const theme = extendTheme({
    colors: newColorTheme,
    components: newComponentTheme,
    colorScheme: newColorTheme,
});

export default theme