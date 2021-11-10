function getSystemDefaultTheme() {
  if (window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'default';
}

const theme = {
  Select: {
    styles: {
      base: {
        background: 'var(--bb-palette-default)',
      },
    },
    Icon: {
      styles: {
        base: {
          top: '0',
        },
      },
    },
  },
  FieldWrapper: {
    ValidationText: {
      styles: {
        base: {
          padding: 'minor-1',
          fontWeight: 'bold',
        },
      },
    },
  },
  Modal: {
    Backdrop: {
      styles: {
        base: {
          backdropFilter: 'blur(2px) grayscale(1)',
        },
      },
    },
  },
  Toast: {
    defaultProps: {
      accent: 'bottom',
      variant: 'bordered',
      className: 'shadow-lg',
    },
    timeout: 10000,
  },
};

export { theme, getSystemDefaultTheme };
