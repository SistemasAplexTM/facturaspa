import Index from '@/views/people/Index.vue'
import layouts from '@/layout'

export default {
  path: '/people',
  name: 'Terceros',
  component: Index,
  meta: {
    roles: ['admin'],
    auth: true,
    layout: layouts.navLeft
  }
}
