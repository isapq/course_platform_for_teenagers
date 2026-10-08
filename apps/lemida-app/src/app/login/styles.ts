// box(s)
export const loginContainerSx = {
    background: "radial-gradient(#002C66, #2885FF)",
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
};

export const loginCardSx = {
    background: "#FFFFFF",
    width: {
        xs: "400px",
        md: "742px"
    },
    height: {
        xs: "700px",
        md: "321px"
    },
    borderRadius: "10px",
    display: "flex",
    flexDirection: {
        xs: "column",
        md: "row"
    },
    gap: "90px",
};

export const loginFormSx = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "10px",
    marginLeft: {
        md: "65px"
    },
    marginTop: {
        xs: "-30px",
        md: "5px"
    },
    alignItems: {
        xs: "center"
    },
    order: {
        xs: 2,
        md: 1,
    }
};

export const loginHeroSx = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "-35px",
    order: {
        xs: 1,
        md: 2
    }
};

// demais componentes

export const loginFieldSx = {
  width: {
    xs: '370px',
    md: '214px',
  },

  '& .MuiOutlinedInput-root': {
    minHeight: {
      xs: 55,
      md: 38,
    },
  
    maxHeight: {
      xs: 76,
    },

    '&.Mui-focused fieldset': {
      borderColor: '#1e2ea8',
      borderWidth: 4,
    },
  },
};

export const loginButtonSx = {
  width: {
    xs: '370px',
    md: '214px',
  },

  height: {
    xs: '50px',
    md: '38px',
  },
};

export const forgotPasswordTextSx = {
  fontSize: 15,
  textAlign: 'right',
  marginLeft: {
    xs: '245px',
    md: '108px',
  },
  cursor: 'pointer',
};

export const quoteTextSx = {
    fontSize: "15px",
    width: "251px",
    display: {
        xs: "none",
        md: "block"
    }
};
