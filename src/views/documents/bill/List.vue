<template lang="html">
  <div class="container">
    <el-dialog title="Facturas registradas" :visible.sync="dialogTableVisible" @close="closeDialog" width="70%" top="10px">
      <p>TABLA</p>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
      return {
        textColor: '',
        dialogTableVisible: false,
      };
    },
    computed:{
      ...mapGetters([
        'list'
      ]),
    },
    watch:{
      list(val){
        this.dialogTableVisible = val
      }
    },
    methods:{
      validatePayment(row){
        this.textColor = null;
        let total_payment = row.total_payment;
        let total_sale = row.total_sale;
        if(parseFloat(total_payment) < parseFloat(total_sale)){
          this.textColor = 'text-danger';
        }
        return total_payment;
      },
      closeDialog(){
        this.$store.commit('SET_LIST', false)
      },
      editDocument(val){
        this.$store.dispatch('editing_document', val.dtRowId)
      },
      deleteDocument(val){
        console.log(val.dtRowId);
      }
    }
}
</script>

<style lang="css">
</style>
