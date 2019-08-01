import Index from '@/views/pages/errors/Index.vue'
import Unauthorized from '@/views/pages/errors/401.vue'
import NotFound from '@/views/pages/errors/404.vue'
import layouts from '@/layout'

export default {
  path: 'error',
  name: 'Error',
  component: Index,
  redirect: { path: '/unauthorized',name: 'Unauthorized' },
  children:[
    {
			path: '/unauthorized',
			name: 'Unauthorized',
			component: Unauthorized,
			meta: {
				layout: layouts.contenOnly
			}
		},
    {
			path: '/*',
			name: 'not-found',
			component: NotFound,
			meta: {
				layout: layouts.contenOnly
			}
		}
  ]
}
