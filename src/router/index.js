import { removeToken, removeUser, getToken, getUser } from '@/utils/auth'
import { getBC, removeBC } from '@/utils/global'
import Vue from 'vue'
import Router from 'vue-router'

//apps
import Dashboard from '../views/apps/Dashboard.vue'

//pages
import Login from '../views/pages/authentication/Login.vue'
import Register from '../views/pages/authentication/Register.vue'
import ForgotPassword from '../views/pages/authentication/ForgotPassword.vue'
import NotFound from '../views/pages/NotFound.vue'
import Invoice from '../views/pages/Invoice.vue'
import Test from '../views/Test.vue'


import layouts from '../layout'
import store from '../store'

import reports from './modules/reports'
import documents from './modules/documents'
import global from './modules/global'
import Bill from '../views/documents/bill/Index.vue'
import User from '../views/users/Index.vue'

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
				layout: layouts.navLeft,
				searchable: true,
				tags: ['app']
			}
		},
		{
			path: '/invoice',
			name: 'invoice',
			component: Invoice,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['pages']
			}
		},
		{
			path: '/test',
			name: 'test',
			component: Test,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['pages']
			}
		},
		{
			path: '/users',
			name: 'users',
			component: User,
			meta: {
				layout: layouts.navLeft
			}
		},
		{
			path: '/login',
			name: 'login',
			component: Login,
			meta: {
				layout: layouts.contenOnly
			}
		},
		{
			path: '/register',
			name: 'register',
			component: Register,
			meta: {
				layout: layouts.contenOnly
			}
		},
		{
			path: '/forgot-password',
			name: 'forgot-password',
			component: ForgotPassword,
			meta: {
				layout: layouts.contenOnly
			}
		},
		reports,
		documents,
		global,
		{
			path: '/logout',
			beforeEnter (to, from, next) {
				removeToken()
				removeBC()
				removeUser()
				auth.logout()
				next({path:'/login'})
			}
		},
		{
			path: '*',
			name: 'not-found',
			component: NotFound,
			meta: {
				layout: layouts.contenOnly
			}
		}
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

//insert here login logic
const auth = {
	loggedIn() {
		return store.getters.isLogged && getToken()
	},
	logout() {
		store.commit('setLogout')
	}
}

function enterRoute() {
	if (getUser().roles.some(permission => permission.name === 'gerencia')) {
		return '/reports'
	}else{
		return '/bill/Factura de Venta'
	}
}

router.beforeEach((to, from, next) => {
	// let authrequired = false
	// if(to && to.meta && to.meta.auth)
	// authrequired = true
	// if(authrequired) {
	// 	if(auth.loggedIn()) {
	// 		if(to.name === 'login') {
	// 			window.location.href = enterRoute()
	// 			return false
	// 		} else {
	// 			next()
	// 		}
	// 	} else {
	// 		if(to.name !== 'login'){
	// 			window.location.href = '/login'
	// 			return false
	// 		}
	// 		next()
	// 	}
	// } else {
	// 	if(auth.loggedIn() && to.name === 'login'){
	// 		window.location.href = enterRoute()
	// 		return false
	// 	} else {
	// 		next()
	// 	}
	// }

	if(to && to.meta && to.meta.layout){
		l.set(to.meta.layout)
	}
})


//console.log('authrequired', authrequired, to.name)



// router.beforeEach((to, from, next) => {
//   if (to.meta.auth) {
//     const authUser = getUser()
//     if (!authUser) {
//       next({ name: 'login' })
//     } else {
//       // for (var i = 0; i < authUser.roles.length; i++) {
//       //   if (to.meta.roles.includes(authUser.roles[i].guard_name)) {
//           next()
//       //     return false
//       //   }
//       // }
//     }
//   } else {
//     if (to.name === 'login' && store.state.app.logged) {
//       return false
//     } else {
//       next()
//     }
//   }
// })

router.afterEach((to, from) => {
	setTimeout(()=>{
		store.commit('setSplashScreen', false)
	}, 500)
})

// router.beforeEach((to, from, next) => {
// 		if (to.name !== 'logout' && to.name !== 'login' && to.name !== 'global/index' && to.name !== 'invoice') {
// 				if (!getBC()) {
// 					window.location.href = '/global/index'
// 					return false
// 				}
// 				next()
// 		}
// 	next()
// })

export default router
