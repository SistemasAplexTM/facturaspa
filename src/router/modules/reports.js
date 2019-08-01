import Reports from '../../views/reports/Index.vue'
import layouts from '../../layout'

export default {
  path: '/reports',
  name: 'Informes',
  component: Reports,
  meta: {
    roles: ['management'],
    auth: true,
    layout: layouts.navLeft,
    searchable: true,
    tags: ['app']
  }
}
