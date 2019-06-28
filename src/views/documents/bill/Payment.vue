<template lang="html">
 <el-dialog
   :visible.sync="open"
   width="40%"
   center
   :before-close="handleClose">
   <span slot="title">
     Factura de venta N° <strong>{{ consecutive }}</strong>
     <br>
     <small>{{ form_document.client_name }}</small>
   </span>
   <el-tabs type="" tab-position="left">
     <el-row class="">
       <el-col :span="8">
         <div class="text-center text-bold">Total a pagar</div>
       </el-col>
       <el-col :span="8">
         <div class="text-center text-bold">Total recibido</div>
       </el-col>
       <el-col :span="8">
         <div class="text-center text-bold">Devolución</div>
       </el-col>
     </el-row>
     <el-row class="">
       <el-col :span="8">
         <div class="text-center lb-total-p">{{ format(this.totals.neto) }}</div>
       </el-col>
       <el-col :span="8">
         <div class="text-center lb-payment-p">{{ format(this.totals.recibido) }}</div>
       </el-col>
       <el-col :span="8">
         <div class="text-center lb-return-p" :class="(disabled) ? 'warning-text' : 'danger-text'" >{{ format(this.totals.devolucion) }}</div>
       </el-col>
     </el-row>
     <hr>
     <el-tab-pane>
       <span slot="label">
         Efectivo
         <i class="fal fa-money-bill-alt"></i>
       </span>
       <el-row class="input-payment_method">
         <el-col :span="24">
           <money class="el-input__inner" placeholder="Valor a pagar" v-model="cash.valor" v-bind="money"></money>
         </el-col>
       </el-row>
       <el-row>
         <el-col :span="24" class="pt-10">
           <el-button type="info" plain round size="mini" v-for="button in buttons" :key="button" @click="cash.valor = button">{{ format(button) }}</el-button>
         </el-col>
       </el-row>
     </el-tab-pane>
     <el-tab-pane label="Tarjeta">
       <span slot="label">
         T. Débito
         <i class="fal fa-credit-card"></i>
       </span>
       <el-row>
         <el-col :span="24">
           <money class="el-input__inner disabled" placeholder="Valor a pagar" v-model="td.valor" v-bind="money"></money>
         </el-col>
       </el-row>
       <br>
       <el-row :gutter="12" class="input-payment_method">
         <el-col :span="18">
           <el-input placeholder="Martercard,Visa, etc" v-model="td.descripcion"></el-input>
         </el-col>
         <el-col :span="6">
           <el-input type="text" placeholder="CDC" v-model="td.descripcion1" minlength="4" maxlength="4"></el-input>
         </el-col>
       </el-row>
     </el-tab-pane>
     <el-tab-pane>
       <span slot="label">
         T. Crédito
         <i class="fal fa-credit-card"></i>
       </span>
       <el-row>
         <el-col :span="24">
           <money class="el-input__inner" placeholder="Valor a pagar" v-model="tc.valor" v-bind="money"></money>
         </el-col>
       </el-row>
       <br>
       <el-row :gutter="12" class="input-payment_method">
         <el-col :span="18">
           <el-input placeholder="Martercard,Visa, etc" v-model="tc.descripcion"></el-input>
         </el-col>
         <el-col :span="6">
           <el-input type="text" placeholder="CDC" v-model="tc.descripcion1" minlength="4" maxlength="4"></el-input>
         </el-col>
       </el-row>
     </el-tab-pane>
     <el-tab-pane>
       <span slot="label">
         Nota Crédito
         <i class="fal fa-file"></i>
       </span>
       <el-row>
         <el-col :span="24">
           <money class="el-input__inner" placeholder="Valor a pagar" v-model="nc.valor" v-bind="money"></money>
         </el-col>
       </el-row>
       <br>
       <el-row :gutter="12" class="input-payment_method">
         <el-col :span="24">
           <el-input placeholder="Número de nota crédito" v-model="nc.descripcion"></el-input>
         </el-col>
       </el-row>
     </el-tab-pane>
     <el-tab-pane>
       <span slot="label">
         Cheque
         <i class="fal fa-money-check-alt"></i>
       </span>
       <el-row>
         <el-col :span="24">
           <money class="el-input__inner" placeholder="Valor a pagar" v-model="check.valor" v-bind="money"></money>
         </el-col>
       </el-row>
       <br>
       <el-row :gutter="12" class="input-payment_method">
         <el-col :span="8">
           <el-input placeholder="Número de cuenta" v-model="check.account"></el-input>
         </el-col>
         <el-col :span="8">
           <el-input placeholder="Banco" v-model="check.banck"></el-input>
         </el-col>
         <el-col :span="8">
           <el-input placeholder="Oficina" v-model="check.office"></el-input>
         </el-col>
       </el-row>
     </el-tab-pane>
     <el-tab-pane>
       <span slot="label">
         Consignación
         <i class="fal fa-university"></i>
       </span>
       <el-row>
         <el-col :span="24">
           <money class="el-input__inner" placeholder="Valor a pagar" v-model="consig.valor" v-bind="money"></money>
         </el-col>
       </el-row>
     </el-tab-pane>
     <el-tab-pane>
       <span slot="label">
         Crédito empleados
         <i class="fal fa-shield"></i>
       </span>
       <el-row>
         <el-col :span="24">
           <money class="el-input__inner" placeholder="Valor a pagar" v-model="ce.valor" v-bind="money"></money>
         </el-col>
       </el-row>
       <br>
       <el-row :gutter="12" class="input-payment_method">
         <el-col :span="24">
           Número de días de crédito
           <br>
           <el-input-number placeholder="Número de días de crédito" v-model="ce.descripcion"></el-input-number>
         </el-col>
       </el-row>
     </el-tab-pane>
     <el-tab-pane>
       <span slot="label">
         Pago online
         <i class="fal fa-globe"></i>
       </span>
       <el-row>
         <el-col :span="24">
           <money class="el-input__inner" placeholder="Valor a pagar" v-model="po.valor" v-bind="money"></money>
         </el-col>
       </el-row>
     </el-tab-pane>
   </el-tabs>
   <span slot="footer" class="dialog-footer">
     <el-button type="primary" @click="savePaymentMethod(1)" :disabled="!disabled">Sin formato</el-button>
     <el-button type="primary" @click="savePaymentMethod(2)" :disabled="!disabled">Con membrete</el-button>
   </span>
 </el-dialog>

</template>

<script>
import accounting from 'accounting-js'
import { mapGetters } from 'vuex'
import { savePaymentMethod } from '@/api/document/document'
export default {
 data(){
  return {
   consecutive: null,
   apx_base: 5000,
   buttons: [],
   cash:{
     documento_id: null,
     forma_pago_id: 1,
     valor:0
   },
   td : {
     documento_id: null,
     forma_pago_id: 4,
     valor: 0,
     descripcion: '',
     descripcion1: ''
   },
   tc : {
     documento_id: null,
     forma_pago_id: 3,
     valor: 0,
     descripcion: '',
     descripcion1: ''
   },
   nc : {
     documento_id: null,
     forma_pago_id: 5,
     valor: 0,
     descripcion: '',
   },
   check : {
     documento_id: null,
     forma_pago_id: 2,
     valor: 0,
     descripcion: '',
     descripcion1: '',
     descripcion2: ''
   },
   consig: {
     documento_id: null,
     forma_pago_id: 6,
     valor: 0
   },
   ce: {
     documento_id: null,
     forma_pago_id: 7,
     valor: 0,
     descripcion: ''
   },
   po: {
     documento_id: null,
     forma_pago_id: 8,
     valor: 0
   },
  }
 },
 props: ['open', 'id_document'],
 computed:{
		...mapGetters(['form_document', 'editing_document', 'totals', 'money', 'payment_methods']),
  disabled(){
    if(this.totals.devolucion >= 0){
      return true
    }
    return false
  }
	},
 watch:{
  payment_methods:{
  deep: true,
  handler(val, oldVal){
   if(val != null){
    this.set_methods_payment(val)
   }
  }
 },
 editing_document:{
  deep: true,
  handler(val, oldVal){
   if(val != null){
    this.id_document = val.document.id
    this.consecutive = this.form_document.consecutive
    this.editing = true
   }else{
     this.editing = false
   }
  }
 },
  id_document(val){
    this.cash.documento_id = val;
    this.td.documento_id = val;
    this.tc.documento_id = val;
    this.nc.documento_id = val;
    this.check.documento_id = val;
    this.consig.documento_id = val;
    this.ce.documento_id = val;
    this.po.documento_id = val;
  },
  cash:{
   deep: true,
   handler(val, oldVal){
     this.commit(val.valor)
   }
  },
  td:{
   deep: true,
   handler(val, oldVal){
        this.commit(val.valor)
   }
  },
  tc:{
   deep: true,
   handler(val, oldVal){
        this.commit(val.valor)
   }
  },
  nc:{
   deep: true,
   handler(val, oldVal){
        this.commit(val.valor)
   }
  },
  check:{
   deep: true,
   handler(val, oldVal){
        this.commit(val.valor)
   }
  },
  consig:{
   deep: true,
   handler(val, oldVal){
        this.commit(val.valor)
   }
  },
  ce:{
   deep: true,
   handler(val, oldVal){
        this.commit(val.valor)
   }
  },
  c:{
   deep: true,
   handler(val, oldVal){
        this.commit(val.valor)
   }
  },
  totals:{
   deep: true,
   handler(val, oldVal){
     if (val.neto != oldVal.neto) {
      if (this.cash.valor == 0) {
       this.cash.valor = val.neto
      }
     }
   }
  }
 },
 methods:{
  handleClose(done) {
    if (!this.disabled) {
      this.$message({
        message: 'Debe completar el pago para finalizar',
        type: 'warning'
      });
    }
  },
  buttonsPayment(){
    this.buttons = []
    let total = 0
    let cant = Math.round(this.totals.neto / this.apx_base)
    for (var i = 0; i < 4; i++) {
      this.buttons.push((cant * this.apx_base) + total)
      total += this.apx_base
    }
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
    this.$store.commit('SET_RETURN', (price - this.totals.neto))
  },
  savePaymentMethod(formatPrint){
    let me = this
    let data = {
      'id_document': me.id_document,
      'cash': me.cash,
      'td': me.td,
      'tc': me.tc,
      'nc': me.nc,
      'check': me.check,
      'consig': me.consig,
      'ce': me.ce,
      'po': me.po,
    }
    savePaymentMethod(data).then(({data}) => {
     this.$store.commit('SET_PAYMENT_METHODS', data.payment)
      // this.$message.success('Factura finalizada con éxito.')
      this.$emit('save', formatPrint)
    }).catch(error => {
      this.$message.error('Error al finalizar la factura.')
      console.log(error)
    })
  },
  set_methods_payment(payment_methods){
   for (var i = 0; i < payment_methods.length; i++) {
    switch (payment_methods[i].forma_pago_id) {
     case 1:
      this.cash.valor = payment_methods[i].valor
      break;
     case 2:
      this.check.valor = payment_methods[i].valor
      break;
     case 3:
      this.tc.valor = payment_methods[i].valor
      break;
     case 4:
      this.td.valor = payment_methods[i].valor
      break;
     case 5:
      this.nc.valor = payment_methods[i].valor
      break;
     case 6:
      this.consig.valor = payment_methods[i].valor
      break;
     case 7:
      this.ce.valor = payment_methods[i].valor
      break;
     case 8:
      this.po.valor = payment_methods[i].valor
      break;
     default:

    }
   }
  }
 }
}
</script>

<style lang="css" scoped>
</style>
