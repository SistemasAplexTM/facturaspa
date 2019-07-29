<template lang="html">
 <el-dialog title="Inventario" :visible.sync="open" width="70%" center
 @close="closeDialog()" :close-on-click-modal="false" :fullscreen="false"
 :show-close="false" :close-on-press-escape="false">
  <vue-good-table mode="remote" :totalRows="totalRecords" :columns="columns"
   :rows="rows"
   :pagination-options="{
    enabled: true,
    mode: 'Registros',
    perPage: 10,
    position: 'bottom',
    perPageDropdown: [10, 20, 30],
    dropdownAllowAll: false,
    nextLabel: 'Siguiente',
    prevLabel: 'Anterior',
    rowsPerPageLabel: 'Registros por página',
    ofLabel: 'de',
    pageLabel: 'Página', // for 'pages' mode
    allLabel: 'Todos',
   }"
   :responsive="true"
   :isLoading.sync="isLoading"
   :fixed-header="true"
    max-height="550px"
    @on-row-click="onRowClick"
    @on-selected-rows-change="selectionChanged"
    @on-page-change="onPageChange"
    @on-sort-change="onSortChange"
    @on-column-filter="onColumnFilter"
    @on-per-page-change="onPerPageChange">
   <template slot="table-row" slot-scope="props">
    <span v-if="props.column.field == 'actions'">
     <el-tooltip content="Sin formato" placement="top">
      <el-button @click="printDocument(props.row.id,1)" size="small" icon="el-icon-printer" title="Sin formato"></el-button>
     </el-tooltip>
     <el-tooltip content="Con membrete" placement="top">
      <el-button @click="printDocument(props.row.id,2)" type="primary" size="small" icon="el-icon-printer" title="Con membrete"></el-button>
     </el-tooltip>
     </span>
     <span v-else>
      {{props.formattedRow[props.column.field]}}
     </span>
    </template>
   </vue-good-table>
  <span slot="footer" class="dialog-footer">
   <el-button @click="closeDialog()" icon="el-icon-close">Cerrar</el-button>
  </span>
 </el-dialog>
</template>

<script>
import accounting from 'accounting-js';
import { getInventory } from '@/api/document/document';

export default {
 data() {
  return {
   isLoading: false,
   columns: [
    {
      label: 'Código',
      field: 'product.codigo',
      sortable: false,
      filterOptions: {
       enabled: true, // enable filter for this column
        placeholder: 'Buscar Código', // placeholder for filter input
        filterValue: '', // initial populated value for this filter
        trigger: 'enter', //only trigger on enter not on keyup
      },
    },
    {
      label: 'Referencia',
      field: 'product.referencia',
      width: '90px',
      sortable: false
     },
     {
       label: 'Descripción',
       field: 'product.descripcion',
       sortable: false,
       filterOptions: {
        enabled: true, // enable filter for this column
         placeholder: 'Buscar Descripción', // placeholder for filter input
         filterValue: '', // initial populated value for this filter
         trigger: 'enter', //only trigger on enter not on keyup
       },
      },
      {
       label: 'Categoría',
       field: 'product.category.descripcion',
       sortable: false
      },
      {
       label: 'Saldo',
       field: 'saldo',
       width: '100px',
    },
    {
       label: 'Precio venta',
       field: 'product.precio_venta',
       formatFn: this.format,
       width: '100px',
       sortable: false
   }],
   rows: [],
   totalRecords: 0,
   serverParams: {
     columnFilters: {
       'product.codigo': '',
       'product.descripcion': '',
     },
     sort: {
       field: 'saldo',
       type: 'desc',
     },
     page: 0,
     perPage: 10
   },
  }
 },
 props: ['open'],
 watch:{
  open(newVal, oldVal){
   if (newVal) {
    this.loadItems()
   }
  }
 },
 methods: {
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
	 onRowClick(params) {
   this.closeDialog()
   this.$emit('select', params.row.product.codigo)
			// this.$store.dispatch('editing_document', params.row.id)
			// this.$router.push('/bill/' + this.type_selected_name)
	 },
		selectionChanged(){
			this.showActions = true
		},
		updateParams(newProps) {
    this.serverParams = Object.assign({}, this.serverParams, newProps);
  },
  onPageChange(params) {
    this.updateParams({page: params.currentPage - 1});
    this.loadItems();
  },
  onPerPageChange(params) {
    this.updateParams({perPage: params.currentPerPage});
    this.loadItems();
  },
  onSortChange(params) {
   this.updateParams({
    sort: {
     type: params[0].type,
     field: params[0].field,
    },
   });
   this.loadItems();
  },
  onColumnFilter(params) {
    this.updateParams(params);
    this.loadItems();
  },
  loadItems() {
			// if (this.type_selected != null) {
				// getInventory(this.type_selected, this.serverParams).then(({data}) => {
				getInventory(2, this.serverParams).then(({data}) => {
					this.totalRecords = data.totalRecords;
					this.rows = data.rows;
				});
			// }
  },
  closeDialog(){
   this.$emit('close')
  }
	}
}

</script>

<style lang="css" scoped>
</style>
