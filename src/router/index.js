import { removeToken, removeUser, getToken, getUser } from '@/utils/auth'
import { getBC, removeBC } from '@/utils/global'
import Vue from 'vue'
import Router from 'vue-router'

//pages
import Login from '../views/pages/authentication/Login.vue'

import layouts from '../layout'
import store from '../store'

import Bill from '../views/documents/bill/Index.vue'

// modules routes
import reports from './modules/reports'
import documents from './modules/documents'
import global from './modules/global'
import errors from './modules/errors'

Vue.use(Router)

const router = new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			alias: '/dashboard',
			name: 'Inicio',
			component: Bill,
			meta: {
				auth: true,
				roles: ['admin', 'cashier'],
				layout: layouts.navLeft
			}
		},
		{
			path: '/login',
			name: 'login',
			component: Login,
			meta: {
				auth: false,
				layout: layouts.contenOnly
			}
		},
		{
			path: '/logout',
			beforeEnter (to, from, next) {
				removeToken()
				removeBC()
				removeUser()
				next({path:'/login'})
			}
		},
		reports,
		documents,
		global,
		errors
	]
})

const l = {
	contenOnly(){
		store.commit('setLayout', layouts.contenOnly)
	},
	navLeft(){
		store.commit('setLayout', layouts.navLeft)
	},
	navRight(){
		store.commit('setLayout', layouts.navRight)
	},
	navTop(){
		store.commit('setLayout', layouts.navTop)
	},
	navBottom(){
		store.commit('setLayout', layouts.navBottom)
	},
	set(layout){
		store.commit('setLayout', layout)
	}
}

router.beforeEach((to, from, next) => {
	if(to && to.meta && to.meta.layout){
		l.set(to.meta.layout)
	}
  if (to.meta.auth) {
    const authUser = getUser()
    if (!authUser) {
      next({ name: 'login' })
    } else {
			if (!to.meta.roles) {
				next()
				return false
			}
			let enter = false
      for (var i = 0; i < authUser.roles.length; i++) {
        if (to.meta.roles.includes(authUser.roles[i].guard_name)) {
          enter = true
        }
      }
			if (!enter)
				next({ name: 'Unauthorized' })

			next()
    }
  } else {
    if (to.name === 'login' && store.state.app.logged)
			next({ path: from.path })

		next()
  }
})

router.afterEach((to, from) => {
	setTimeout(()=>{
		store.commit('setSplashScreen', false)
	}, 500)
})

export default router
