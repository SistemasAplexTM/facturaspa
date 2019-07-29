<template lang="html">
  <div class="modalPrint">
    <!-- <div class="print-toolbar">
      <el-button icon="el-icon-printer" @click="print">Imprimir</el-button>
    </div> -->
    <div style="" id="page-wrapper">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" id="factura" style="text-align:center; padding: 10px 0px;">
          <tr>
              <th id="data_title">FECHA</th>
              <th id="data_title">{{ form.consecutive }}</th>
              <th id="data_title" rowspan="3">
                  <div>Telefono</div>
                  <div><img id="img_redes" src="@/assets/images/wa_xplod.png"></div>
              </th>
              <th id="data_title" rowspan="3">
                  <div>XPLOD.NY</div>
                  <div><img id="img_redes" src="@/assets/images/igxplod.png"></div>
              </th>
              <th id="data_title" rowspan="3">
                  <div>XPLOD.NY</div>
                  <div><img id="img_redes" src="@/assets/images/face_xplod.png"></div>
              </th>
          </tr>
          <tr>
              <td id="data_title" rowspan="2">{{ form.date }}</td>
              <th id="data_title">Medio de pago</th>
          </tr>
          <tr>
              <td id="data_title">
               {{ payment_methods_print() }}
              </td>
          </tr>
          <!-- DATOS DEL CLIENTE -->
          <tr>
              <th id="data_client">NOMBRE</th>
              <td id="data_client" colspan="2" style="text-align: left;padding-left: 3px;">{{ form.client.nombre }}</td>
              <th id="data_client">DOCUMENTO</th>
              <td id="data_client" style="text-align: left;padding-left: 3px;">{{ form.client.documento }}</td>
          </tr>
          <tr>
              <th id="data_client">CORREO</th>
              <td id="data_client" colspan="2" style="text-align: left;padding-left: 3px;">{{ form.client.email }}</td>
              <th id="data_client">TELÉFONO</th>
              <td id="data_client" style="text-align: left;padding-left: 3px;">{{ form.client.telefono }}</td>
          </tr>
          <tr><td id="table2" colspan="5" style="background-color: #c1c1c1">&nbsp;</td></tr>
          <!-- DETALLE DEL DOCUMENTO -->
          <tr>
              <td colspan="5">
                  <table width="100%" border="0" cellspacing="0" cellpadding="0" >
                      <thead>
                          <tr>
                              <th id="table2" width="5%">CANT</th>
                              <th id="table2" width="13%">CÓDIGO</th>
                              <th id="table2" width="14%">CATEGORIA</th>
                              <th id="table2" width="25%">DESCRIPCIÓN</th>
                              <th id="table2" width="14%">V. UNIT</th>
                              <th id="table2" width="14%">DESC. UNIT</th>
                              <th id="table2" width="15%">V. TOTAL</th>
                          </tr>
                      </thead>
                      <tbody>
                             <tr v-for="item in table_detail">
                                  <td id="table2">{{ item.cantidad }}</td>
                                  <td id="table2">{{ (item.codigo) ? item.codigo : item.product.codigo }}</td>
                                  <td id="table2">{{ (item.category) ? item.category.descripcion : item.product.category.descripcion }}</td>
                                  <td id="table2" style="text-align: left;padding-left: 3px;">{{ item.producto }}</td>
                                  <td id="table2">{{ format(item.precio_venta) }}</td>
                                  <td id="table2">- {{ format(item.descuento_venta) }}</td>
                                  <td id="table2" style="text-align: right;padding-right: 3px;">{{ format((item.precio_venta * item.cantidad) - item.descuento_venta) }}</td>
                              </tr>
                              <tr v-for="tales in (9 - table_detail.length)">
                                  <td id="table2">&nbsp;</td>
                                  <td id="table2">&nbsp;</td>
                                  <td id="table2">&nbsp;</td>
                                  <td id="table2">&nbsp;</td>
                                  <td id="table2">&nbsp;</td>
                                  <td id="table2">&nbsp;</td>
                                  <td id="table2">&nbsp;</td>
                              </tr>
                          <tr>
                              <td id="table2" colspan="7" style="background-color: #c1c1c1">&nbsp;</td>
                          </tr>
                      </tbody>
                      <!-- PIE DEL DOCUMENTO -->
                      <tfoot>
                          <tr>
                              <th id="table2" colspan="2" rowspan="3"><img style="" id="logo" src="@/assets/images/Infashion.png"></th>
                              <th id="table2" colspan="3">PROMOCIÓN NO TIENE CAMBIO</th>
                              <th id="table2" style="text-align: right;">SUBTOTAL</th>
                              <th id="table2" style="text-align: right;padding-right: 3px;">{{ format(totals.subtotal_1) }}</th>
                          </tr>
                          <tr>
                              <th id="table2" colspan="3">NO SE REALIZA REEMBOLSO </th>
                              <th id="table2" style="text-align: right;">IVA</th>
                              <th id="table2" style="text-align: right;padding-right: 3px;">{{ format(totals.iva) }}</th>
                          </tr>
                          <tr>
                              <th id="table2" colspan="3" rowspan="2">
                                  LOS CAMBIOS SE REALIZAN EN UN PLAZO DE 15 DIAS, DE LUNES A VIERNES, RECUERDE PRESENTAR SU FACURA AL MOMENTO DE REALIZAR UN CAMBIO
                              </th>
                              <th id="table2" style="text-align: right;">TOTAL</th>
                              <th id="table2" style="text-align: right;padding-right: 3px;">{{ format(totals.subtotal_1 + totals.iva ) }}</th>
                          </tr>
                          <tr>
                              <th id="table2" colspan="2">IVA REGIMEN COMUN</th>
                              <th id="table2" style="text-align: right;">DESCUENTO</th>
                              <th id="table2" style="text-align: right;padding-right: 3px;">{{ format(totals.descuento_2) }}</th>
                          </tr>
                          <tr>
                              <th id="foot" style="background-color: #c1c1c1;">ASESOR</th>
                              <th id="foot" style="background-color: #c1c1c1;">{{ form.seller }}</th>
                              <th id="foot" style="background-color: #c1c1c1;" colspan="3">GRACIAS POR SU COMPRA!</th>
                              <th id="foot" style="text-align: right;background-color: #c1c1c1;">TOTAL</th>
                              <th id="foot" style="text-align: right;padding-right: 3px;background-color: #c1c1c1;">{{ format(totals.total) }}</th>
                          </tr>
                      </tfoot>
                  </table>
              </td>
          </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import accounting from 'accounting-js';
import { documentById } from '@/api/document/document'

export default {
  name: 'printDocument2',
  data(){
    return {
     form: {
      consecutive: null,
      date: null,
      client: {},
      days: 0,
      date_receip: null,
      seller: {},
      observation: null,
     }
    }
  },
  props: ['id_document'],
  computed:{
    ...mapGetters([
      'totals', 'table_detail', 'form_document', 'payment_methods', 'wholesale'
    ])
  },
  mounted(){
    this.getData()
  },
  methods:{
    print() {
     this.$emit('modalPrint')
     window.print()
    },
    getData(){
     // if (this.form_document.client.nombre) {
     //  this.form = this.form_document
     // }
     let me = this
     documentById(this.id_document).then(response => {
  					if (response.data) {
  						var data = response.data;
  						let date_r = new Date(data.document.fecha_recibido)
  						date_r.setDate(date_r.getDate() - 1)
  						var form = {
  							consecutive: data.document.consecutivo,
  							date: data.document.fecha,
  							days: data.document.dias,
  							client: data.client,
  							seller: data.seller.nombre,
  							observation: data.document.observacion,
  							date_receip: date_r
  						}
        me.form = form
        // me.$store.commit('SET_FORM_DOCUMENT', form)
  						me.$store.commit('SET_PAYMENT_METHODS', data.payment)
  						me.$store.commit('SET_WHOLESALE', data.document.pormayor)
  						me.$store.commit('SET_TABLE_DETAIL', data.detail)
  						me.$store.dispatch('updateSubtotal', { data:data.detail, wholesale: data.document.pormayor})
  						me.$store.commit('SET_ANTICIPO', data.document.anticipo)
        setTimeout(function () {
         me.print()
        }, 300);
  					}
  			}).catch(error => {
  					console.log(error)
  					return false
  			})
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
    payment_methods_print(){
     var result = ''
     for (var i = 0; i < this.payment_methods.length; i++) {
      result += this.payment_methods[i].payment_form.descripcion + ','
     }
     return result
    }
  }
}
</script>

<style lang="scss" scoped>

  *{
    font-size: 12px;
    color: black;
  }
  table{
    margin-top: 10px;
    // background-color: white;
  }
  tr {
    border: solid 1px black;
  }
  td{
   border: solid 1px black;
  }

  #title_document{
      font-size: 20px;
      border-bottom: 1px solid black;
  }
  #data_title{
      border: 1px solid black;
      /*border: 1px solid #c1c1c1;*/
  }
  #data_client{
      border: 1px solid black;
  }
  #foot{
      background-color: black;
      border: 1px solid black;
  }
  #logo{
      width: 100px;
      height: 50px;
  }
  #table2{
      // border: 1px solid black;
  }
  #img_redes{
      height: 15px;
      vertical-align: -webkit-baseline-middle;
  }
  #consecutivo_document{
      text-align: right;
  }
  .title1{
      width: 160px;
  }
  .title2{
      width: 180px;
  }

@media print{
 .layout-container .container .footer ,
	.layout-container .container .header ,
	.layout-container .container .horizontal-nav ,
	.layout-container .footer ,
	.layout-container .layout-picker ,
	.layout-container .vertical-nav ,
	.layout-container .header {
		display:none;
	}
 .print-toolbar {
   display: none;
 }
}
</style>
