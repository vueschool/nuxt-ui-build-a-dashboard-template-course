type Theme = ReturnType<typeof defineAppConfig>['ui']

export default {
  card: {
    slots: {
      root: 'rounded-none border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]',
      header: 'px-6 py-3 border-b-2 border-black bg-white font-mono uppercase tracking-wide text-lg',
      body: 'px-6 py-4 bg-white font-mono text-base',
      footer: 'px-6 py-3 border-t-2 border-black bg-white font-mono'
    },
    variants: {
      variant: {
        solid: {
          root: 'bg-black text-white border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]'
        },
        outline: {
          root: 'bg-white text-black border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]'
        },
        soft: {
          root: 'bg-gray-100 text-black border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]'
        },
        subtle: {
          root: 'bg-white text-black border-2 border-dashed border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]'
        }
      }
    },
    defaultVariants: {
      variant: 'outline'
    }
  }
} satisfies Theme
