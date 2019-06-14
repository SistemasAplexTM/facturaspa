import Documents from '../../views/documents/Documents.vue'
import Index from '../../views/documents/Index.vue'
import Bill from '../../views/documents/bill/Index.vue'
import layouts from '../../layout'

export default {
	 path: '/documents',
  name: 'Documentos',
  component: Index,
  redirect: { path: '/index',name: 'index' },
  children: [
   {
    path: '/index',
    name: 'index',
    component: Documents,
    meta: {
     auth: true,
     layout: layouts.navLeft,
     searchable: true,
     tags: ['app']
    }
   },
   {
    path: '/bill/:name',
    name: 'Factura',
    component: Bill,
    meta: {
     auth: true,
     layout: layouts.navLeft,
     searchable: true,
     tags: ['app']
    }
   }
  ]
 }
