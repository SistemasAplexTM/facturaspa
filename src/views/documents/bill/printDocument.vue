<template lang="html">
  <div class="modalPrint">
    <div class="print-toolbar">
      <el-button icon="el-icon-printer" @click="print">Imprimir</el-button>
    </div>

    <table width="100%" border="0" cellspacing="0" cellpadding="0" id="factura" style="text-align:center; padding: 10px 0px;">
      <tr>
          <th colspan="5" id="consecutivo_document"><span class="pull-right"></span></th>
      </tr>
      <tr>
          <th id="data_title" class="title1" style="text-align: right">2019-03-19</th>
          <th id="data_title" class="title2" style="color: #FCFCFC"></th>
          <th id="data_title" rowspan="3" class="title3">
              <div></div>
              <div><!--img--></div>
          </th>
          <div>&nbsp;</div>
          <th id="data_title" rowspan="3" class="title3">
              <div><!--img--></div>
          </th>
      </tr>
      <tr>
          <td id="data_title" rowspan="2" style="text-align: right;width: 168px;font-size: 10px;">
              &nbsp;Duvier Marin Escobar<br>
              &nbsp;1112230018<br>
              &nbsp;3122414492<br>
              &nbsp;duvierm24@gmail.com<br>
          </td>
          <th id="data_title">Efectivo</th>
      </tr>
      <tr>
          <td id="data_client"><br><br>Jhonny Roba Kills</td>
      </tr>
      <tr><td id="table2" colspan="5" style="">&nbsp;</td></tr>
      <!-- DETALLE DEL DOCUMENTO -->
      <tr>
          <td colspan="5">
              <table width="100%" border="0" cellspacing="0" cellpadding="0"draggable="">
                  <thead>
                      <tr>
                          <th id="table2" width="7%" style="font-size: 23px;">&nbsp;</th>
                          <th id="table2" width="13%">&nbsp;</th>
                          <th id="table2" width="14%">&nbsp;</th>
                          <th id="table2" width="25%">&nbsp;</th>
                          <th id="table2" width="14%">&nbsp;</th>
                          <th id="table2" width="14%">&nbsp;</th>
                          <th id="table2" width="17%">&nbsp;</th>
                      </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in 9">
                      <td id="table2" class="datos" style="text-align: left;padding-left: 3px;">1</td>
                      <td id="table2" class="datos">100160162915</td>
                      <td id="table2" class="datos">T SHIRT</td>
                      <td id="table2" class="datos" style="text-align: left;padding-left: 3px;">DIAMOND</td>
                      <td id="table2" class="datos">$ 12,521.00 </td>
                      <td id="table2" class="datos">- $ 0</td>
                      <td id="table2" class="datos" style="text-align: right;padding-right: 3px;">$ 12,521.00</td>
                    </tr>
                  </tbody>
                  <!-- PIE DEL DOCUMENTO -->
                  <tfoot >
                      <tr>
                          <th id="table2" colspan="2" rowspan="3"><!--img--></th>
                          <th id="table2" colspan="3"><!--ROMOCIÓN NO TIENE CAMBIO--></th>
                          <th id="table2" style="text-align: right;"><!--SUBTOTAL--></th>
                          <th id="table2" style="text-align: right;padding-right: 3px;font-size: 11px; padding-top: 5px">$ 302.000</th>
                      </tr>
                      <tr>
                          <th id="table2" colspan="3"><!--NO SE REALIZA REEMBOLSO--></th>
                          <th id="table2" style="text-align: right;"></th>
                          <th id="table2" style="text-align: right;padding-right: 3px;font-size: 11px;">$ 90.000</th>
                      </tr>
                      <tr>
                          <th id="table2" colspan="3" rowspan="2" style="">
                              <!--LOS CAMBIOS SE REALIZAN EN UN PLAZO DE 15 DIAS, DE LUNES A VIERNES, RECUERDE PRESENTAR SU FACURA AL MOMENTO DE REALIZAR UN CAMBIO-->
                          </th>
                          <th id="table2" style="text-align: right;"><!--TOTAL--></th>
                          <th id="table2" style="text-align: right;padding-right: 3px;font-size: 11px;">$ 392.000</th>
                      </tr>
                      <tr>
                          <th id="table2" colspan="2"><!--IVA REGIMEN COMUN--></th>
                          <th id="table2" style="text-align: right;"><!--DESCUENTO--></th>
                          <th id="table2" style="text-align: right;padding-right: 3px;font-size: 11px;">$ 0</th>
                      </tr>
                      <tr>
                          <th id="foot" style="">159364</th>
                          <th id="foot" style=""></th>
                          <th id="foot" style="" colspan="3"><!--GRACIAS POR SU COMPRA!--></th>
                          <th id="foot" style="text-align: right;"><!--TOTAL--></th>
                          <th id="foot" style="text-align: right;padding-right: 3px;">$ 392.000</th>
                      </tr>
                  </tfoot>
              </table>
          </td>
      </tr>

  </table>

  </div>
</template>

<script>
export default {
  name: 'printDocument',
  data(){
    return {

    }
  },
  props: ['id_document'],
  methods:{
    print() {
      this.$emit('modalPrint')
      window.print()
    },
  }
}
</script>

<style lang="scss">

  *{
      font-size: 12px;
  }
  table{
    margin-top: 10px;
    background-color: white;
  }
  #title_document{
      font-size: 20px;
      border-bottom: 1px solid #FFF;
  }
  #data_title{
      border: 1px solid #FFF;
      /*border: 1px solid #c1c1c1;*/
  }
  #data_client{
      border: 1px solid #FFF;
  }
  #foot{
      background-color: #FFF;
      border: 1px solid #FFF;
  }
  #logo{
      width: 100px;
      height: 50px;
  }
  #table2{
      border: 1px solid #FFF;
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
