export default defineAppConfig({
  ui: {
    button: {
      defaultVariants: {
        size: 'xl'
      }
    },
    card: {
      slots: {
        header: 'bg-red-500'
      },
      variants: {
        variant: {
          solid: {
            body: 'bg-blue-500'
          }
        }
      }
    },
    colors: {
      primary: 'brand',
      neutral: 'slate',
      tertiary: 'pink'
    }
  }
})
