<template>
	<div class="page-layout-sidebar-left" style="max-width: 100%">
		<div class="page-header header-primary card-shadow--small flex p-5 br-5">
			<div class="box grow">
				<h1>Nombre de la tienda</h1>
			</div>
		</div>
		<div class="h-100 flex">
			<div class="sidebar scrollable only-y" v-loading="loadingSidebar">
				<ul>
					<li v-for="type in types" :key="type.id" @click="selectType(type)">{{ type.descripcion }}</li>
				</ul>
			</div>
			<div class="box grow card-base card-shadow--small p-30 scrollable only-y">
				<!-- <h2 class="mt-8 text-center">Factura de venta</h2> -->
				<div class="bb mb-10 pb-15 text-center">
					<el-button icon="el-icon-plus" type="success" size="small" class="fl" @click="$router.push('/bill')">Nuevo</el-button>
					<h2 class="" style="display:inline">{{ type_selected_name }}</h2>
					<transition name="fade">
						<div class="fr" v-show="showActions">
							<el-button icon="el-icon-printer"  size="small"></el-button>
							<el-button icon="el-icon-edit" type="primary" size="small"></el-button>
							<el-button icon="el-icon-delete" type="danger" size="small"></el-button>
						</div>
					</transition>
				</div>

				<div style="m-10 h-100 flex">
					<div class="vue-good-table-box card-base card-shadow--medium">
						<vue-good-table
							mode="remote"
							:totalRows="totalRecords"
							:columns="columns"
							:rows="rows"
							:search-options="{
					    enabled: true,
								}"
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
					  @on-filter="onColumnFilter"
					  @on-per-page-change="onPerPageChange"
							:selectOptions="{
					    enabled: true,
					    selectOnCheckboxOnly: true, // only select when checkbox is clicked instead of the row
					    selectionInfoClass: 'custom-class',
					    selectionText: 'rows selected',
					    clearSelectionText: 'clear',
					  }"
							>
						</vue-good-table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { getUsers } from '@/api/user'
import { getTypes, getDocuments } from '@/api/document'
export default {
	name: 'LayoutSidebarLeft',
	data() {
		return {
			type_selected: null,
			type_selected_name: 'asdlaksml',
			isLoading: false,
			loadingSidebar: false,
			columns: [
				{
					label: 'Doc',
					field: 'consecutivo'
				},
				{
					label: 'Fecha',
					field: 'fecha',
					type: 'date',
					inputFormat: 'YYYY-MM-DD',
					outputFormat: 'YYYY-MM-DD',
				},
				{
					label: 'Reg./Cant.',
					field: 'id',
					type: 'number',
					html: false,
				},
				{
					label: 'Cliente',
					field: 'client.nombre',
				 sortable: false
				},
				{
					label: 'Observación',
					field: 'observacion',
				},
				{
					label: 'Sucursal',
					field: 'branch.razon_social',
				 sortable: false
				},
				{
					label: 'Valor',
					field: 'id',
				},
				{
					label: 'Recibido',
					field: 'id',
				},
			],
			rows: [],
			totalRecords: 0,
			serverParams: {
    columnFilters: {
    },
    sort: {
      field: 'consecutivo',
      type: 'asc',
    },
    page: 0,
    perPage: 10
   },
			showActions: false,
			types: []
		}
	},
 mounted(){
		this.loadingSidebar = true
  getTypes().then(({data}) => {
   this.types = data;
			this.loadingSidebar = false
			this.isLoading = false
  }).catch(error => {console.log(error);})
 },
	methods: {
		test(){
			// testDetail().then(({data}) => {
			// 	console.log(data);
			// }).catch(error => {console.log(error)})
		},
		selectType(type){
			this.type_selected = type.id
			this.type_selected_name = type.descripcion
			this.isLoading = true
			this.loadItems()
		},
  onRowClick(params) {
			// this.showActions = true
    console.log(params.row);
  },
		selectionChanged(){
			// alert('Hola')
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
			if (this.type_selected != null) {
				getDocuments(this.type_selected, this.serverParams).then(({data}) => {
					this.totalRecords = data.totalRecords;
					this.rows = data.rows;
				});
			}
  }
	}
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables';

.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.page-layout-sidebar-left {
	margin-bottom: 80px;
	.page-header {
		border-radius: 5px;
		padding-left: 15px;
		margin-bottom: 20px;
	}

	.h-100{
		max-height: 100%;
	}

	.sidebar {
		box-sizing: border-box;
		padding: 24px;
		min-width: 250px;
		margin-left: -24px;

		ul {
			width: 100%;
			list-style: none;
			padding: 0;
			margin: 0;
		}
		li {
			box-sizing: border-box;
			width: 100%;
			list-style: none;
			padding: 15px 20px;
			border-bottom: 1px solid transparentize($text-color, .9);
			cursor: pointer;
			position: relative;

			&::after {
				content: '';
				display: block;
				width: 0%;
				height: 100%;
				background: $text-color;
				position: absolute;
				top: 0;
				left: 0;
				opacity: 0;
				transition: all .5s;
			}

			&:hover {
				&::after {
					width: 100%;
					opacity: .3;
				}
			}
		}
	}
}

@media (max-width: 768px) {
	.page-layout-sidebar-left {
		.page-header {
			.menu-btn {
				display: block;
			}
		}
		.sidebar {

			margin: 0;
			text-align: center;
			position: absolute;
			background: white;
			color: #000;
			top: 5px;
			left: -100%;
			opacity: 0;
			bottom: 5px;
			box-shadow: 40px 0px 160px 80px rgba(0, 0, 0, 0.3);
			border-top-right-radius: 4px;
			border-bottom-right-radius: 4px;
			transition: all .5s;

			li {
				border-bottom: 1px solid #eee;
			}

			&.open {
				opacity: 1;
				left: 0;
				z-index: 999;
			}
		}
	}
}
</style>
