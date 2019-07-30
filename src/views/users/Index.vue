<template>
	<div class="">
    <el-row>
      <el-button type="primary" @click="createRol">Crear Rol</el-button>
      <el-button type="success" @click="createPermission">Crear Permiso</el-button>
      <el-button type="warning" @click="assignRoleToPermission">Asignar Permiso a un rol</el-button>
      <el-button type="danger" @click="deleteRoleToPermission">Borrar Permiso de un rol</el-button>
      <el-button @click="assignRoleToUser">Asignar rol a un usuario</el-button>
    </el-row>
  </div>
</template>

<script>

import { createRol, createPermission, assignRoleToPermission, deleteRoleToPermission, assignRoleToUser } from '@/api/user'

export default {
	name: 'User',
  data(){
   return{
    //
   }
  },
  methods:{
    createRol(){
     createRol(createRol()).then(({data}) => {
       console.log(data);
     }).catch( error => { console.log(error) })
    },
    createPermission(){
      createPermission(createPermission()).then(({data}) => {
        console.log(data);
      }).catch( error => { console.log(error) })
    },
    assignRoleToPermission(){
      assignRoleToPermission(assignRoleToPermission()).then(({data}) => {
        console.log(data);
      }).catch( error => { console.log(error) })
    },
    deleteRoleToPermission(){
      deleteRoleToPermission(deleteRoleToPermission()).then(({data}) => {
        console.log(data);
      }).catch( error => { console.log(error) })
    },
    assignRoleToUser(){
      assignRoleToUser(assignRoleToUser()).then(({data}) => {
        console.log(data);
      }).catch( error => { console.log(error) })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
