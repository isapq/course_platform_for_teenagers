const components = {
    // TextField
    MuiTextField: {
        defaultProps: {
            variant: 'outlined',
            size: 'small',
        },
    },

    MuiInputLabel: {
        styleOverrides: {
        root: {
            color: '#3B4887',

            '&.Mui-focused': {
            color: '#1e2ea8',
            },
        },
        },
    },

    MuiOutlinedInput: {
        styleOverrides: {
            root: {
            backgroundColor: '#BFCEFF',
            borderRadius: 8,

            '& fieldset': {
                borderColor: '#23346b',
                borderWidth: '1px',
            },

            '&:hover fieldset': {
                borderColor: '#2039f5',
                borderWidth: '2px',
            },
            },
        },
    },

    // Button
    MuiButton: {
        defaultProps: {
            variant: 'contained',
            color: 'primary',
            disableElevation: true,
        },

        styleOverrides: {
            root: {
                color: "#FFFFFF",
                background: "#3B4887",
                borderRadius: "2",
                fontWeight: 600,
                boxShadow: "3",

                '&:hover': {
                    backgroundColor: '#1e2ea8',
                    boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.22)',
                }
            }
        }
    }
};

export default components;
