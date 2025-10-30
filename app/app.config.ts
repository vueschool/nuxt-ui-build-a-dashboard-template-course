export default defineAppConfig({
  roles: ['member', 'owner'] as const,
  ui: {
    colors: {
      primary: 'brand',
      neutral: 'slate',
      tertiary: 'pink'
    }
  }
})
