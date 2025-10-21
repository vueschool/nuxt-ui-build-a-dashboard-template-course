type Theme = ReturnType<typeof defineAppConfig>['ui']

export default {
  card: {
    slots: {
      root: 'rounded-xl border-2 border-yellow-300 shadow-lg shadow-yellow-200 bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100',
      header: 'px-6 py-3 border-b-2 border-yellow-200 bg-yellow-100 font-sans uppercase tracking-wide text-lg text-pink-600 flex items-center gap-2',
      body: 'px-6 py-4 bg-white/70 font-sans text-base text-blue-600',
      footer: 'px-6 py-3 border-t-2 border-yellow-200 bg-yellow-50 font-sans text-pink-800'
    },
    variants: {
      variant: {
        solid: {
          root: 'bg-gradient-to-br from-yellow-200 via-pink-200 to-blue-200 text-pink-800 border-2 border-yellow-300 shadow-lg shadow-yellow-200'
        },
        outline: {
          root: 'bg-white text-blue-700 border-2 border-pink-300 shadow shadow-yellow-100'
        },
        soft: {
          root: 'bg-yellow-50 text-pink-700 border-2 border-blue-200 shadow-sm shadow-pink-100'
        },
        subtle: {
          root: 'bg-white text-pink-400 border-2 border-dashed border-yellow-300 shadow-none'
        }
      }
    },
    defaultVariants: {
      variant: 'outline'
    }
  }
} satisfies Theme
