import { getById } from '@/api/people'

const people = {
  state: {
    people_editing: {}
  },

  mutations: {
    SET_PEOPLE_EDITING: (state, people_editing) => {
      state.people_editing = people_editing
    }
  },

  actions: {
    peopleEditing({ commit }, id){
      if (!id) {
        commit('SET_PEOPLE_EDITING', '')
        return false
      }else{
        return new Promise((resolve, reject) => {
          getById(id).then(response => {
            if (!response.data) {
              reject('error')
            }
            commit('SET_PEOPLE_EDITING', response.data)
          }).catch(error => {
            reject(error)
          })
        })
      }
    },
  }
}

export default people
