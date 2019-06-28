<template>
 <div class="scrollable only-y" v-if="!modalPrint">
  <el-button type="success" size="small" icon="el-icon-plus" @click="reset(true)" class="fl">Nueva factura</el-button>
  <div class="text-right mb-12">
    <el-button v-if="!editing" split-button type="success"
      :loading="loading"
      @click="submit"
      size="small">
      <i class="fal fa-save"></i> Guardar
    </el-button>
    <el-button v-else size="small" type="primary" icon="el-icon-edit-outline" :loading="loading" @click="submit()">
      Actualizar
    </el-button>
    <el-button id="cancelButton" type="default" size="small" icon="el-icon-circle-close" @click="reset(true)">Cancelar</el-button>
    <!-- <el-button id="cancelButton" type="danger" size="small" icon="el-icon-circle-close" @click="reset(true)">Anular</el-button>
    <el-button id="cancelButton" type="danger" size="small" icon="el-icon-circle-close" @click="reset(true)">Eliminar detalle</el-button> -->
  </div>

  <form-document ref="formDocument"></form-document>

  <list-documents></list-documents>

  <payment :open="modalFP" @save="savePaymentMethod" :id_document="id_document" ref="payment"/>

  <el-dialog
    title="Base de caja"
    :visible.sync="modalBC"
    width="30%"
    center
    :before-close="closeBC">
    <p>Por favor digite si base de caja.</p>
    <el-input placeholder="0.00" v-model="bc">
       <i slot="prefix" class="fal fa-dollar-sign mt-13 ml-5"></i>
    </el-input>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="saveCashRegister" :disabled="bc <= 0">Aceptar</el-button>
    </span>
  </el-dialog>
 </div>
 <div v-else>
   <print-document v-if="!modalPrint2" @modalPrint="printFinihs" :id_document="id_document"/>
   <print-document-2 v-else @modalPrint="printFinihs" :id_document="id_document"/>
 </div>
</template>

<script>
import FormDocument from './Form'
import ListDocuments from './List'
import PrintDocument from './printDocument'
import PrintDocument2 from './printDocument2'
import Payment from './Payment'
import accounting from 'accounting-js'
import { save, update, validateCashRegister, saveCashRegister } from '@/api/document/document'
import { mapGetters } from 'vuex'
export default {
  components: {
    FormDocument, ListDocuments, Payment, PrintDocument, PrintDocument2
  },
  data(){
  	return {
      bc: null,
      modalBC: false,
      modalPrint: false,
      modalPrint2: false,
      id_document: null,
  		  editing: false,
      loading: false,
      modalFP: false,
      input: null,
      consecutive: null,
      cssText: `
      .box {
        font-family: sans-serif;
        width: 500px;
        border: solid 1px #ccc;
        text-align: center;
        padding: 1em;
        margin: 2em auto;
      }
      button {
        background-color: #f0f0f0;
        border: solid 1px #ccc;
        padding: 5px 10px;
        font-size: 12px;
      }
      pre {
        color: #c7254e;
      }`
  	}
  },
  computed:{
    ...mapGetters([
      'totals', 'table_detail', 'form_document', 'wholesale', 'money', 'editing_document'
    ])
  },
  watch:{
   editing_document:{
			 deep: true,
			 handler(val, oldVal){
 				if(val != null){
      this.id_document = val.document.id
 					this.editing = true
 				}else{
       this.editing = false
     }
			 }
		 }
  },
  mounted () {
    // const { Printd } = window.printd
    // this.d = new Printd()
    //
    // // Print dialog events (v0.0.9+)
    // const { contentWindow } = this.d.getIFrame()
    //
    // contentWindow.addEventListener(
    //   'beforeprint', () => console.log('before print event!')
    // )
    // contentWindow.addEventListener(
    //   'afterprint', () => {
    //     console.log('after print event!')
    //     this.reset(false)
    //   }
    // )
    // this.validateCashRegister()
  },
  methods:{
    reset(confirm){
      let me = this
      if (confirm) {
        this.$confirm('Se limpiarán los campos del formulario', 'Limpiar formulario', {
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar',
          type: 'warning'
        }).then(() => {
            me.fresh()
        }).catch(() => {

        });
      }else{
        me.fresh()
      }
    },
    fresh(){
      let me  = this
      me.id_document = null
      me.editing = false
      me.loading = false
      me.modalFP = false
      me.input = null
      me.consecutive = null
      me.buttons = []
      me.apx_base = 5000
      me.cash = {
        documento_id: null,
        forma_pago_id: 1,
        valor: ''
      }
      me.td  = {
        documento_id: null,
        forma_pago_id: 4,
        valor: 0,
        descripcion: '',
        descripcion1: ''
      }
      me.tc  = {
        documento_id: null,
        forma_pago_id: 3,
        valor: 0,
        descripcion: '',
        descripcion1: ''
      }
      me.nc  = {
        documento_id: null,
        forma_pago_id: 5,
        valor: 0,
        descripcion: ''
      }
      me.check  = {
        documento_id: null,
        forma_pago_id: 2,
        valor: 0,
        descripcion: '',
        descripcion1: '',
        descripcion2: ''
      }
      me.consig = {
        documento_id: null,
        forma_pago_id: 6,
        valor: ''
      }
      me.ce = {
        documento_id: null,
        forma_pago_id: 7,
        valor: 0,
        descripcion: ''
      }
      me.po = {
        documento_id: null,
        forma_pago_id: 8,
        valor: ''
      }
      setTimeout(function () {
        me.$refs.formDocument.resetForm()
      }, 300);
    },
    refreshTable(){
      this.$refs.list.refresh()
    },
    listDocuments(){
      this.$store.commit('SET_LIST', true)
    },
    submit(){
      this.loading = true
      // let setup = JSON.parse(localStorage.getItem('setup'))
      let data = {
        form_document: this.form_document,
        table_detail: this.table_detail,
        totals: this.totals,
        wholesale: this.wholesale
      }
      let validate = this.validateForm(data)
      if(validate.code == 200){
        this.actionForm(data)
      }else{
        this.$message.error(validate.data);
      }
      this.loading = false
    },
    actionForm(data){
      if(!this.editing){
        save(data).then(({data}) => {
          this.editing = true
          this.id_document = data.id
          this.consecutive = data.consecutive
          this.modalFP = true
          this.$store.commit('SET_FORM_DOCUMENT_CONSECUTIVE', data.consecutive)
          this.$store.commit('SET_TABLE_DETAIL', data.table_detail)
          this.$refs.payment.buttonsPayment()
        }).catch(error => {
          console.log(error)
        })
      }else{
        update(data, this.id_document).then(({data}) => {
          this.modalFP = true
          this.$refs.payment.buttonsPayment()
        }).catch(error => {
          console.log(error)
        })
      }
    },
    validateForm(data){
      let response = {
        'data': '',
        'code': 200
      };
      if(data.form_document.client_id == null){
        response.data = 'Debe seleccionar un cliente'
        response.code = 600
      }else if(data.form_document.date == null){
          response.data = 'Debe seleccionar una fecha'
          response.code = 600
        }else if(data.form_document.seller_id == null){
        response.data = 'Debe seleccionar un vendedor'
        response.code = 600
      }else if(data.table_detail.length == 0){
        response.data = 'Debe ingresar datos en el detalle'
        response.code = 600
      }
      return response;
    },
    savePaymentMethod(formatPrint){
     this.modalPrint = true
     if (formatPrint == 2) {
      this.modalPrint2 = true
     }
    },
    printFinihs(){
     this.modalPrint = false
     this.reset(false)
    },
    format(val){
  			var options = {
  				symbol : "$ ",
  				decimal : ",",
  				thousand: ".",
  				precision : 0,
  				format: "%s%v"
  			};
  			return accounting.formatMoney(val, options)
     },
    commit(val){
      var price = this.cash.valor + this.td.valor + this.tc.valor + this.nc.valor + this.check.valor + this.consig.valor + this.ce.valor + this.po.valor
      this.$store.commit('SET_RECEIVED', price)
      this.$store.commit('SET_RETURN', price - this.totals.neto)
    },
    validateCashRegister(){
      validateCashRegister().then(({data}) => {
        if (!data) {
          this.modalBC = true
        }
      }).catch( error => { console.log(error) })
    },
    saveCashRegister(){
      if (this.bc <= 0) {
        return false
      }
      saveCashRegister({data: this.bc}).then(({data}) => {
        if (data.code == 200) {
          this.modalBC = false
        }
      }).catch(error => { console.log(error) })
    },
    closeBC(){
      return false
    }
  }
}
</script>

<style scoped>
  .lb-total-p{
      color: forestgreen;
      font-weight: bold;
      font-size: 20px;
  }
  .lb-payment-p{
    font-weight: bold;
    color: #909399;
    font-size: 20px;
  }
  .lb-return-p{
    font-weight: bold;
    font-size: 20px;
  }
  .input-payment_method{
    margin-bottom: 10px;
  }
</style>
