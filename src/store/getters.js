const getters = {
 layout(state, getters) {
		return state.app.layout
	},
	navPos(state, getters) {
		return state.app.layout.navPos
	},
	toolbar(state, getters) {
		return state.app.layout.toolbar
	},
	footer(state, getters) {
		return state.app.layout.footer
	},
	boxed(state, getters) {
		return state.app.layout.boxed
	},
	roundedCorners(state, getters) {
		return state.app.layout.roundedCorners
	},
	viewAnimation(state, getters) {
		return state.app.layout.viewAnimation
	},
	isLogged(state, getters) {
		return state.app.logged
	},
	splashScreen(state, getters) {
		return state.app.splashScreen
	},
  money:            state => state.app.money,
  payment_editing: 	state => state.payment.payment_editing,
  people_editing: 	 state => state.people.people_editing,
  cupons_editing: 	 state => state.cupons.cupons_editing,
  // documentos
  totals: 			       state => state.documents.totals,
  wholesale:        state => state.documents.wholesale,
  form_document:    state => state.documents.form_document,
  table_detail:     state => state.documents.table_detail,
  list:             state => state.documents.list,
  editing_document: state => state.documents.editing_document,
}
export default getters
