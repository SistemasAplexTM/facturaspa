import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import payment from './modules/payments'
import people from './modules/people'
import cupons from './modules/cupons'
import documents from './modules/documents'
import getters from './getters'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  modules: {
    app,
    payment,
    people,
    cupons,
    documents
  },
  getters,
  plugins: [createPersistedState({paths: ['layout']})],
  strict: false
})

export default store
