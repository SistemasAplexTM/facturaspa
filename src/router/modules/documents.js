import Documents from '@/views/documents/Documents.vue'
import Index from '@/views/documents/Index.vue'
import Bill from '@/views/documents/bill/Index.vue'
import layouts from '@/layout'

export default {
	path: '/documents',
  name: 'Documentos',
  component: Index,
  redirect: { path: '/index',name: 'index' },
	meta: { nav: true, icon: 'file' },
  children: [
   {
    path: '/index',
    name: 'Listar',
    component: Documents,
    meta: {
			roles: ['admin', 'management'],
			icon: 'format-list-bulleted',
			auth: true,
			nav: true,
			layout: layouts.navLeft
    }
   },
   {
    path: '/bill/:name',
    name: 'Nuevo',
    component: Bill,
    meta: {
			roles: ['admin', 'cashier'],
			icon: 'plus',
			nav: true,
			auth: true,
			layout: layouts.navLeft,
			cash: true
    }
   }
  ]
 }
