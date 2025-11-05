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
  likes: 89
}, {
  id: 2,
  title: 'Building Modern Dashboards',
  excerpt: 'A comprehensive guide to creating responsive and interactive dashboard interfaces.',
  author: 'Jordan Brown',
  category: 'Design',
  status: 'published',
  publishedAt: sub(new Date(), { days: 5 }).toISOString(),
  views: 3421,
  likes: 234
}, {
  id: 3,
  title: 'Vue Composition API Best Practices',
  excerpt: 'Discover advanced patterns and techniques for using the Composition API effectively.',
  author: 'Taylor Green',
  category: 'Development',
  status: 'published',
  publishedAt: sub(new Date(), { days: 8 }).toISOString(),
  views: 2876,
  likes: 156
}, {
  id: 4,
  title: 'Understanding Server-Side Rendering',
  excerpt: 'Deep dive into SSR concepts and how to optimize your Nuxt applications.',
  author: 'Morgan White',
  category: 'Development',
  status: 'draft',
  publishedAt: sub(new Date(), { days: 10 }).toISOString(),
  views: 0,
  likes: 0
}, {
  id: 5,
  title: 'Design Systems in 2024',
  excerpt: 'Exploring the latest trends and methodologies in design system architecture.',
  author: 'Casey Gray',
  category: 'Design',
  status: 'published',
  publishedAt: sub(new Date(), { days: 12 }).toISOString(),
  views: 1892,
  likes: 112
}, {
  id: 6,
  title: 'Performance Optimization Techniques',
  excerpt: 'Learn how to improve your application performance with proven strategies.',
  author: 'Jamie Johnson',
  category: 'Development',
  status: 'published',
  publishedAt: sub(new Date(), { days: 15 }).toISOString(),
  views: 4231,
  likes: 298
}, {
  id: 7,
  title: 'Accessibility in Modern Web Apps',
  excerpt: 'Making your applications accessible to all users with best practices.',
  author: 'Riley Davis',
  category: 'Tutorial',
  status: 'published',
  publishedAt: sub(new Date(), { days: 18 }).toISOString(),
  views: 1567,
  likes: 94
}, {
  id: 8,
  title: 'State Management Patterns',
  excerpt: 'Exploring different approaches to managing state in Vue applications.',
  author: 'Kelly Wilson',
  category: 'Development',
  status: 'archived',
  publishedAt: sub(new Date(), { days: 30 }).toISOString(),
  views: 5432,
  likes: 412
}, {
  id: 9,
  title: 'Creating Custom UI Components',
  excerpt: 'Step-by-step guide to building reusable component libraries.',
  author: 'Drew Moore',
  category: 'Tutorial',
  status: 'published',
  publishedAt: sub(new Date(), { days: 20 }).toISOString(),
  views: 2234,
  likes: 178
}, {
  id: 10,
  title: 'Testing Vue Applications',
  excerpt: 'Comprehensive testing strategies for Vue and Nuxt applications.',
  author: 'Jordan Taylor',
  category: 'Development',
  status: 'published',
  publishedAt: sub(new Date(), { days: 22 }).toISOString(),
  views: 1890,
  likes: 134
}, {
  id: 11,
  title: 'Mobile-First Design Principles',
  excerpt: 'Building responsive interfaces that work seamlessly across all devices.',
  author: 'Morgan Anderson',
  category: 'Design',
  status: 'published',
  publishedAt: sub(new Date(), { days: 25 }).toISOString(),
  views: 3124,
  likes: 245
}, {
  id: 12,
  title: 'API Integration Best Practices',
  excerpt: 'How to structure and manage API calls in your Nuxt applications.',
  author: 'Casey Thomas',
  category: 'Development',
  status: 'draft',
  publishedAt: sub(new Date(), { days: 3 }).toISOString(),
  views: 0,
  likes: 0
}, {
  id: 13,
  title: 'Animations and Transitions',
  excerpt: 'Adding smooth animations to enhance user experience.',
  author: 'Jamie Jackson',
  category: 'Design',
  status: 'published',
  publishedAt: sub(new Date(), { days: 28 }).toISOString(),
  views: 2789,
  likes: 201
}, {
  id: 14,
  title: 'TypeScript in Vue Projects',
  excerpt: 'Leveraging TypeScript for better developer experience and type safety.',
  author: 'Riley White',
  category: 'Development',
  status: 'published',
  publishedAt: sub(new Date(), { days: 32 }).toISOString(),
  views: 4567,
  likes: 389
}, {
  id: 15,
  title: 'Color Theory for Developers',
  excerpt: 'Understanding color and how to use it effectively in UI design.',
  author: 'Kelly Harris',
  category: 'Design',
  status: 'published',
  publishedAt: sub(new Date(), { days: 35 }).toISOString(),
  views: 2134,
  likes: 167
}, {
  id: 16,
  title: 'Deployment Strategies',
  excerpt: 'Different approaches to deploying Nuxt applications to production.',
  author: 'Drew Martin',
  category: 'Tutorial',
  status: 'published',
  publishedAt: sub(new Date(), { days: 38 }).toISOString(),
  views: 3245,
  likes: 256
}, {
  id: 17,
  title: 'Security Best Practices',
  excerpt: 'Protecting your applications from common vulnerabilities.',
  author: 'Alex Thompson',
  category: 'Development',
  status: 'published',
  publishedAt: sub(new Date(), { days: 40 }).toISOString(),
  views: 4123,
  likes: 334
}, {
  id: 18,
  title: 'SEO Optimization Guide',
  excerpt: 'Improving search engine visibility for your Nuxt applications.',
  author: 'Jordan Garcia',
  category: 'Tutorial',
  status: 'published',
  publishedAt: sub(new Date(), { days: 42 }).toISOString(),
  views: 2987,
  likes: 223
}, {
  id: 19,
  title: 'Advanced Routing Techniques',
  excerpt: 'Mastering Nuxt routing for complex application structures.',
  author: 'Taylor Rodriguez',
  category: 'Development',
  status: 'draft',
  publishedAt: sub(new Date(), { days: 1 }).toISOString(),
  views: 0,
  likes: 0
}, {
  id: 20,
  title: 'Design Trends 2024',
  excerpt: 'The latest design trends shaping modern web interfaces.',
  author: 'Morgan Lopez',
  category: 'Design',
  status: 'published',
  publishedAt: sub(new Date(), { days: 45 }).toISOString(),
  views: 5234,
  likes: 445
}]

export default defineEventHandler(async (event) => {
  const { q } = getQuery(event) as { q: string }
  if (q) {
    return posts.filter(post => post.title.toLowerCase().includes(q.toLowerCase()))
  }
  return posts
})
