<template lang="html">
 <el-row type="flex" justify="center" class="mt-100 text-center" v-loading="loading">
   <el-col :span="5">
    <p>Por favor digite su base de caja</p>
    <el-input placeholder="0.00" v-model="bc">
     <i slot="prefix" class="fal fa-dollar-sign mt-13 ml-5"></i>
    </el-input>
    <br>
    <el-button class="mt-20" round icon="el-icon-save" type="primary" @click="saveCashRegister" :disabled="bc <= 0">Aceptar</el-button>
   </el-col>
 </el-row>
</template>

<script>
import { validateCashRegister, saveCashRegister } from '@/api/global'
import { setBC } from '@/utils/global'
import { getUser } from '@/utils/auth'
export default {
 data(){
  return{
   bc: null,
   loading: false
  }
 },
 mounted(){
  this.loading = true
  this.validateCashRegister()
 },
 methods:{
  validateCashRegister(){
    validateCashRegister(getUser()).then(({data}) => {
      if (data.data[0]) {
        setBC(true)
        this.$router.push('/')
      }
      this.loading = false
    }).catch( error => { console.log(error) })
  },
  saveCashRegister(){
    if (this.bc <= 0) {
      return false
    }
    var data = {
     user: getUser(),
     value: this.bc
    }
    saveCashRegister(data).then(({data}) => {
      if (data.code == 200) {
        setBC(true)
        this.$router.push('/')
      }
    }).catch(error => { console.log(error) })
  },
  closeBC(){
    return false
  }
 }
}
</script>

<style lang="css" scoped>
</style>
