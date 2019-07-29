import BC from '../../views/global/BC.vue'
import Index from '../../views/global/Index.vue'
import layouts from '../../layout'

export default {
	 path: '/global',
  name: 'Global',
  component: Index,
  redirect: { path: '/index',name: 'index' },
  children: [
   {
    path: 'index',
    name: 'global/index',
    component: BC,
    meta: {
     auth: true,
     layout: layouts.contenOnly,
     searchable: true,
     tags: ['app']
    }
   }
  ]
 }
