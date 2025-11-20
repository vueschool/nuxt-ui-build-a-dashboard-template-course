import type { Post } from '~/types'
import { sub } from 'date-fns'

const posts: Post[] = [{
  id: 1,
  title: 'Getting Started with Nuxt UI',
  excerpt: 'Learn how to build beautiful interfaces with Nuxt UI components and design system.',
  author: 'Alex Smith',
  category: 'Tutorial',
  status: 'published',
  publishedAt: sub(new Date(), { days: 2 }).toISOString(),
  views: 1245,
  likes: 89,
  image: 'https://picsum.photos/seed/1/800/600'
}, {
  id: 2,
  title: 'Building Modern Dashboards',
  excerpt: 'A comprehensive guide to creating responsive and interactive dashboard interfaces.',
  author: 'Jordan Brown',
  category: 'Design',
  status: 'published',
  publishedAt: sub(new Date(), { days: 5 }).toISOString(),
  views: 3421,
  likes: 234,
  image: 'https://picsum.photos/seed/2/800/600'
}, {
  id: 3,
  title: 'Vue Composition API Best Practices',
  excerpt: 'Discover advanced patterns and techniques for using the Composition API effectively.',
  author: 'Taylor Green',
  category: 'Development',
  status: 'published',
  publishedAt: sub(new Date(), { days: 8 }).toISOString(),
  views: 2876,
  likes: 156,
  image: 'https://picsum.photos/seed/3/800/600'
}, {
  id: 4,
  title: 'Understanding Server-Side Rendering',
  excerpt: 'Deep dive into SSR concepts and how to optimize your Nuxt applications.',
  author: 'Morgan White',
  category: 'Development',
  status: 'draft',
  publishedAt: sub(new Date(), { days: 10 }).toISOString(),
  views: 0,
  likes: 0,
  image: 'https://picsum.photos/seed/4/800/600'
}, {
  id: 5,
  title: 'Design Systems in 2024',
  excerpt: 'Exploring the latest trends and methodologies in design system architecture.',
  author: 'Casey Gray',
  category: 'Design',
  status: 'published',
  publishedAt: sub(new Date(), { days: 12 }).toISOString(),
  views: 1892,
  likes: 112,
  image: 'https://picsum.photos/seed/5/800/600'
}, {
  id: 6,
  title: 'Performance Optimization Techniques',
  excerpt: 'Learn how to improve your application performance with proven strategies.',
  author: 'Jamie Johnson',
  category: 'Development',
  status: 'published',
  publishedAt: sub(new Date(), { days: 15 }).toISOString(),
  views: 4231,
  likes: 298,
  image: 'https://picsum.photos/seed/6/800/600'
}, {
  id: 7,
  title: 'Accessibility in Modern Web Apps',
  excerpt: 'Making your applications accessible to all users with best practices.',
  author: 'Riley Davis',
  category: 'Tutorial',
  status: 'published',
  publishedAt: sub(new Date(), { days: 18 }).toISOString(),
  views: 1567,
  likes: 94,
  image: 'https://picsum.photos/seed/7/800/600'
}, {
  id: 8,
  title: 'State Management Patterns',
  excerpt: 'Exploring different approaches to managing state in Vue applications.',
  author: 'Kelly Wilson',
  category: 'Development',
  status: 'archived',
  publishedAt: sub(new Date(), { days: 30 }).toISOString(),
  views: 5432,
  likes: 412,
  image: 'https://picsum.photos/seed/8/800/600'
}, {
  id: 9,
  title: 'Creating Custom UI Components',
  excerpt: 'Step-by-step guide to building reusable component libraries.',
  author: 'Drew Moore',
  category: 'Tutorial',
  status: 'published',
  publishedAt: sub(new Date(), { days: 20 }).toISOString(),
  views: 2234,
  likes: 178,
  image: 'https://picsum.photos/seed/9/800/600'
}, {
  id: 10,
  title: 'Testing Vue Applications',
  excerpt: 'Comprehensive testing strategies for Vue and Nuxt applications.',
  author: 'Jordan Taylor',
  category: 'Development',
  status: 'published',
  publishedAt: sub(new Date(), { days: 22 }).toISOString(),
  views: 1890,
  likes: 134,
  image: 'https://picsum.photos/seed/10/800/600'
}, {
  id: 11,
  title: 'Mobile-First Design Principles',
  excerpt: 'Building responsive interfaces that work seamlessly across all devices.',
  author: 'Morgan Anderson',
  category: 'Design',
  status: 'published',
  publishedAt: sub(new Date(), { days: 25 }).toISOString(),
  views: 3124,
  likes: 245,
  image: 'https://picsum.photos/seed/11/800/600'
}, {
  id: 12,
  title: 'API Integration Best Practices',
  excerpt: 'How to structure and manage API calls in your Nuxt applications.',
  author: 'Casey Thomas',
  category: 'Development',
  status: 'draft',
  publishedAt: sub(new Date(), { days: 3 }).toISOString(),
  views: 0,
  likes: 0,
  image: 'https://picsum.photos/seed/12/800/600'
}, {
  id: 13,
  title: 'Animations and Transitions',
  excerpt: 'Adding smooth animations to enhance user experience.',
  author: 'Jamie Jackson',
  category: 'Design',
  status: 'published',
  publishedAt: sub(new Date(), { days: 28 }).toISOString(),
  views: 2789,
  likes: 201,
  image: 'https://picsum.photos/seed/13/800/600'
}, {
  id: 14,
  title: 'TypeScript in Vue Projects',
  excerpt: 'Leveraging TypeScript for better developer experience and type safety.',
  author: 'Riley White',
  category: 'Development',
  status: 'published',
  publishedAt: sub(new Date(), { days: 32 }).toISOString(),
  views: 4567,
  likes: 389,
  image: 'https://picsum.photos/seed/14/800/600'
}, {
  id: 15,
  title: 'Color Theory for Developers',
  excerpt: 'Understanding color and how to use it effectively in UI design.',
  author: 'Kelly Harris',
  category: 'Design',
  status: 'published',
  publishedAt: sub(new Date(), { days: 35 }).toISOString(),
  views: 2134,
  likes: 167,
  image: 'https://picsum.photos/seed/15/800/600'
}, {
  id: 16,
  title: 'Deployment Strategies',
  excerpt: 'Different approaches to deploying Nuxt applications to production.',
  author: 'Drew Martin',
  category: 'Tutorial',
  status: 'published',
  publishedAt: sub(new Date(), { days: 38 }).toISOString(),
  views: 3245,
  likes: 256,
  image: 'https://picsum.photos/seed/16/800/600'
}, {
  id: 17,
  title: 'Security Best Practices',
  excerpt: 'Protecting your applications from common vulnerabilities.',
  author: 'Alex Thompson',
  category: 'Development',
  status: 'published',
  publishedAt: sub(new Date(), { days: 40 }).toISOString(),
  views: 4123,
  likes: 334,
  image: 'https://picsum.photos/seed/17/800/600'
}, {
  id: 18,
  title: 'SEO Optimization Guide',
  excerpt: 'Improving search engine visibility for your Nuxt applications.',
  author: 'Jordan Garcia',
  category: 'Tutorial',
  status: 'published',
  publishedAt: sub(new Date(), { days: 42 }).toISOString(),
  views: 2987,
  likes: 223,
  image: 'https://picsum.photos/seed/18/800/600'
}, {
  id: 19,
  title: 'Advanced Routing Techniques',
  excerpt: 'Mastering Nuxt routing for complex application structures.',
  author: 'Taylor Rodriguez',
  category: 'Development',
  status: 'draft',
  publishedAt: sub(new Date(), { days: 1 }).toISOString(),
  views: 0,
  likes: 0,
  image: 'https://picsum.photos/seed/19/800/600'
}, {
  id: 20,
  title: 'Design Trends 2024',
  excerpt: 'The latest design trends shaping modern web interfaces.',
  author: 'Morgan Lopez',
  category: 'Design',
  status: 'published',
  publishedAt: sub(new Date(), { days: 45 }).toISOString(),
  views: 5234,
  likes: 445,
  image: 'https://picsum.photos/seed/20/800/600'
},
{
  id: 21,
  title: 'Understanding Nuxt Plugins',
  excerpt: 'A practical look into creating and using plugins in Nuxt.',
  author: 'Jamie Lee',
  category: 'Development',
  status: 'published',
  publishedAt: sub(new Date(), { days: 48 }).toISOString(),
  views: 2456,
  likes: 198,
  image: 'https://picsum.photos/seed/21/800/600'
}, {
  id: 22,
  title: 'Scaling Nuxt Applications',
  excerpt: 'Tips and architectures for scaling up with confidence.',
  author: 'Ryan Patterson',
  category: 'Tutorial',
  status: 'published',
  publishedAt: sub(new Date(), { days: 49 }).toISOString(),
  views: 3221,
  likes: 210,
  image: 'https://picsum.photos/seed/22/800/600'
}, {
  id: 23,
  title: 'Accessibility in Nuxt',
  excerpt: 'Ensuring your application is usable by everyone.',
  author: 'Cameron Foster',
  category: 'Design',
  status: 'published',
  publishedAt: sub(new Date(), { days: 50 }).toISOString(),
  views: 1580,
  likes: 127,
  image: 'https://picsum.photos/seed/23/800/600'
}, {
  id: 24,
  title: 'Unit Testing Nuxt Apps',
  excerpt: 'Best practices for testing your codebase.',
  author: 'Robin Nguyen',
  category: 'Development',
  status: 'draft',
  publishedAt: sub(new Date(), { days: 2 }).toISOString(),
  views: 0,
  likes: 0,
  image: 'https://picsum.photos/seed/24/800/600'
}, {
  id: 25,
  title: 'State Management with Pinia',
  excerpt: 'Integrating and using Pinia for global state.',
  author: 'Avery Carter',
  category: 'Tutorial',
  status: 'published',
  publishedAt: sub(new Date(), { days: 51 }).toISOString(),
  views: 3122,
  likes: 276,
  image: 'https://picsum.photos/seed/25/800/600'
}, {
  id: 26,
  title: 'Nuxt Content Module Deep Dive',
  excerpt: 'Leveraging content for static and dynamic sites.',
  author: 'Harper Sullivan',
  category: 'Tutorial',
  status: 'published',
  publishedAt: sub(new Date(), { days: 55 }).toISOString(),
  views: 2170,
  likes: 158,
  image: 'https://picsum.photos/seed/26/800/600'
}, {
  id: 27,
  title: 'Building Custom Directives',
  excerpt: 'Extend your templates with reusable functionality.',
  author: 'Casey Brooks',
  category: 'Development',
  status: 'published',
  publishedAt: sub(new Date(), { days: 60 }).toISOString(),
  views: 1722,
  likes: 98,
  image: 'https://picsum.photos/seed/27/800/600'
}, {
  id: 28,
  title: 'Boosting Performance in Nuxt',
  excerpt: 'How to make your Nuxt app blazing fast.',
  author: 'Sidney Kelly',
  category: 'Development',
  status: 'published',
  publishedAt: sub(new Date(), { days: 61 }).toISOString(),
  views: 3871,
  likes: 377,
  image: 'https://picsum.photos/seed/28/800/600'
}, {
  id: 29,
  title: 'Integrating GraphQL',
  excerpt: 'Fetching and mutating data using GraphQL in Nuxt.',
  author: 'Alexis Kim',
  category: 'Development',
  status: 'published',
  publishedAt: sub(new Date(), { days: 62 }).toISOString(),
  views: 1841,
  likes: 115,
  image: 'https://picsum.photos/seed/29/800/600'
}, {
  id: 30,
  title: 'SSR vs SSG: What to Choose?',
  excerpt: 'Pros and cons of Server-Side Rendering and Static Generation.',
  author: 'Drew Patel',
  category: 'Development',
  status: 'published',
  publishedAt: sub(new Date(), { days: 63 }).toISOString(),
  views: 2024,
  likes: 191,
  image: 'https://picsum.photos/seed/30/800/600'
}, {
  id: 31,
  title: 'Nuxt Animations with Framer Motion',
  excerpt: 'Beautiful animations with the Framer Motion library.',
  author: 'Sam Emerson',
  category: 'Design',
  status: 'published',
  publishedAt: sub(new Date(), { days: 65 }).toISOString(),
  views: 1462,
  likes: 84,
  image: 'https://picsum.photos/seed/31/800/600'
}, {
  id: 32,
  title: 'Localization in Nuxt Applications',
  excerpt: 'Make your app multilingual using i18n modules.',
  author: 'River Bailey',
  category: 'Tutorial',
  status: 'archived',
  publishedAt: sub(new Date(), { days: 70 }).toISOString(),
  views: 1744,
  likes: 99,
  image: 'https://picsum.photos/seed/32/800/600'
}, {
  id: 33,
  title: 'Progressive Web Apps with Nuxt',
  excerpt: 'Going offline and working everywhere.',
  author: 'Brooklyn Flores',
  category: 'Development',
  status: 'published',
  publishedAt: sub(new Date(), { days: 71 }).toISOString(),
  views: 2890,
  likes: 204,
  image: 'https://picsum.photos/seed/33/800/600'
}, {
  id: 34,
  title: 'Dynamic Routing in Nuxt 3',
  excerpt: 'Strategies for advanced navigation.',
  author: 'Skyler Hughes',
  category: 'Tutorial',
  status: 'published',
  publishedAt: sub(new Date(), { days: 72 }).toISOString(),
  views: 1198,
  likes: 73,
  image: 'https://picsum.photos/seed/34/800/600'
}, {
  id: 35,
  title: 'Using API Routes in Nuxt',
  excerpt: 'Creating and consuming API routes.',
  author: 'Dakota Lane',
  category: 'Development',
  status: 'draft',
  publishedAt: sub(new Date(), { days: 3 }).toISOString(),
  views: 0,
  likes: 0,
  image: 'https://picsum.photos/seed/35/800/600'
}, {
  id: 36,
  title: 'Styling with Tailwind CSS',
  excerpt: 'How to use Tailwind efficiently in Nuxt projects.',
  author: 'Robin Tran',
  category: 'Design',
  status: 'published',
  publishedAt: sub(new Date(), { days: 80 }).toISOString(),
  views: 2600,
  likes: 314,
  image: 'https://picsum.photos/seed/36/800/600'
}, {
  id: 37,
  title: 'Server Middleware Explained',
  excerpt: 'Middleware and its use cases within Nuxt server routes.',
  author: 'Shawn Bryant',
  category: 'Development',
  status: 'published',
  publishedAt: sub(new Date(), { days: 85 }).toISOString(),
  views: 1217,
  likes: 67,
  image: 'https://picsum.photos/seed/37/800/600'
}, {
  id: 38,
  title: 'Environment Variables in Nuxt',
  excerpt: 'Best practices for handling secrets and configs.',
  author: 'Jessie Paige',
  category: 'Tutorial',
  status: 'published',
  publishedAt: sub(new Date(), { days: 95 }).toISOString(),
  views: 1712,
  likes: 73,
  image: 'https://picsum.photos/seed/38/800/600'
}, {
  id: 39,
  title: 'Composable Functions 101',
  excerpt: 'Building and reusing composables across projects.',
  author: 'Quinn Morris',
  category: 'Development',
  status: 'published',
  publishedAt: sub(new Date(), { days: 98 }).toISOString(),
  views: 2866,
  likes: 334,
  image: 'https://picsum.photos/seed/39/800/600'
}, {
  id: 40,
  title: 'Real-Time Features with WebSockets',
  excerpt: 'Implementing real-time chat in Nuxt.',
  author: 'Aiden Myers',
  category: 'Development',
  status: 'published',
  publishedAt: sub(new Date(), { days: 105 }).toISOString(),
  views: 997,
  likes: 88,
  image: 'https://picsum.photos/seed/40/800/600'
}, {
  id: 41,
  title: 'Nuxt and Headless CMS',
  excerpt: 'Connecting Strapi, Contentful, and others to Nuxt.',
  author: 'Morgan James',
  category: 'Tutorial',
  status: 'published',
  publishedAt: sub(new Date(), { days: 109 }).toISOString(),
  views: 2112,
  likes: 174,
  image: 'https://picsum.photos/seed/41/800/600'
}, {
  id: 42,
  title: 'Deploying to Vercel & Netlify',
  excerpt: 'A quick deployment guide for the two popular platforms.',
  author: 'Peyton Clark',
  category: 'Tutorial',
  status: 'published',
  publishedAt: sub(new Date(), { days: 110 }).toISOString(),
  views: 3031,
  likes: 219,
  image: 'https://picsum.photos/seed/42/800/600'
}

]

export default defineEventHandler(async (event) => {
  const { q, sort, pageIndex, pageSize, status } = getQuery(event) as { q?: string, sort?: string, pageIndex?: string, pageSize?: string, status?: string }

  let postsCopy = [...posts]

  if (sort) {
    postsCopy = sortPosts(postsCopy, sort)
  }

  if (q) {
    postsCopy = postsCopy.filter(post => post.title.toLowerCase().includes(q.toLowerCase()))
  }
  if (status) {
    postsCopy = postsCopy.filter((post) => {
      if (status === 'all' || !status) return true
      return post.status === status
    })
  }

  const paginated = handlePagination(pageIndex, pageSize, postsCopy)

  await new Promise(resolve => setTimeout(resolve, 3000))

  return {
    data: paginated.data,
    total: paginated.total,
    pageIndex: paginated.pageIndex
  }
})

function handlePagination(pageIndex: string | undefined, pageSize: string | undefined, data: Post[]) {
  const pageIndexNumber = parseInt(pageIndex ?? '0')
  const pageSizeNumber = pageSize ? parseInt(pageSize) : 10
  const total = data.length
  const maxPageIndex = total > 0 ? Math.ceil(total / pageSizeNumber) - 1 : 0
  const clampedPageIndex = Math.max(0, Math.min(pageIndexNumber, maxPageIndex))
  return {
    data: data.slice(clampedPageIndex * pageSizeNumber, (clampedPageIndex + 1) * pageSizeNumber),
    total,
    pageIndex: clampedPageIndex
  }
}

// sort based on a field name or -name (desc)
function sortPosts(posts: Post[], sort: string) {
  const postsCopy = [...posts]
  const sortKey = sort.startsWith('-') ? sort.slice(1) : sort
  const isDescending = sort.startsWith('-')
  const key = sortKey as keyof Post
  postsCopy.sort((a, b) => {
    const aVal = a[key] as string
    const bVal = b[key] as string
    const comparison = aVal.localeCompare(bVal)
    return isDescending ? -comparison : comparison
  })
  return postsCopy
}
