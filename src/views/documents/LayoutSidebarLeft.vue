<template>
	<div class="page-layout-sidebar-left scrollable only-y">
		<div class="page-header header-primary card-base card-shadow--small flex">
			<div class="box grow">
				<h1>Nombre de la tienda</h1>
			</div>
			<div class="menu-btn align-vertical" @click="sidebarOpen = !sidebarOpen">
				<i class="mdi mdi-menu align-vertical-middle"></i>
			</div>
		</div>
		<div class="flex">
			<div class="sidebar scrollable" :class="{'open':sidebarOpen}">
				<el-button size="small" class="close-btn" @click="sidebarOpen = false">close</el-button>
				<ul>
					<li v-for="i in 20" :key="i">Factura de venta {{i}}</li>
				</ul>
			</div>
			<div class="box grow card-base card-shadow--small p-24">

				<div class="bb mb-10 pb-15 text-center">
					<el-button icon="el-icon-plus" type="success" size="small" class="fl">Nuevo</el-button>
					<h2 class="" style="display:inline">Factura de venta</h2>
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
							:columns="columns"
							:rows="rows"
							:search-options="{
					    enabled: true,
									placeholder: 'Buscar',
					  }"
							:pagination-options="{
					    enabled: true,
					    mode: 'Registros',
					    perPage: 10,
					    position: 'bottom',
					    perPageDropdown: [10, 20, 30],
					    dropdownAllowAll: false,
					    setCurrentPage: 2,
					    nextLabel: 'Siguiente',
					    prevLabel: 'Anterior',
					    rowsPerPageLabel: 'Registros por página',
					    ofLabel: 'de',
					    pageLabel: 'Página', // for 'pages' mode
					    allLabel: 'Todos',
					  }"
							:responsive="true"
							:lineNumbers="true"
							:fixed-header="true"
							max-height="550px"
							@on-row-click="onRowClick"
							@on-row-mouseenter="onRowMouseenter"
							@on-row-mouseleave="onRowMouseleave"
							>
						</vue-good-table>
					</div>
				</div>


			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'LayoutSidebarLeft',
	data() {
		return {
			sidebarOpen: false,
			columns: [
				{
					label: 'Doc',
					field: 'name',

				},
				{
					label: 'Fecha',
					field: 'createdAt',
					type: 'date',
					inputFormat: 'YYYY-MM-DD',
					outputFormat: 'MMM Do YY',
				},
				{
					label: 'Reg./Cant.',
					field: 'age',
					type: 'number',
					html: false,
				},
				{
					label: 'Cliente',
					field: 'score',
					type: 'percentage',
					html: false,
				},
				{
					label: 'Observación',
					field: 'score',
					type: 'percentage',
					html: false,
				},
				{
					label: 'Sucursal',
					field: 'score',
					type: 'percentage',
					html: false,
				},
				{
					label: 'Valor',
					field: 'score',
					type: 'percentage',
					html: false,
				},
				{
					label: 'Recibido',
					field: 'score',
					type: 'percentage',
					html: false,
				},
			],
			rows: [
				{id:1, name:"John",age:20,createdAt: '2010-10-31',score: 0.03343},
				{id:2, name:"Jane",age:24,createdAt: '2011-10-31',score: 0.03343},
				{id:3, name:"Susan",age:16,createdAt: '2011-10-30',score: 0.03343},
				{id:4, name:"Chris",age:55,createdAt: '2011-10-11',score: 0.03343},
				{id:5, name:"Dan",age:40,createdAt: '2011-10-21',score: 0.03343},
				{id:6, name:"John",age:20,createdAt: '2011-10-31',score: 0.03343},
				{id:7, name:"Jane",age:24,createdAt: '20111031'},
				{id:8, name:"John",age:20,createdAt: '2011-10-31',score: 0.03343},
				{id:9, name:"John",age:20,createdAt: '2011-10-31',score: 0.03343},
				{id:10, name:"John",age:20,createdAt: '2011-10-31',score: 0.03343},
				{id:10, name:"John",age:20,createdAt: '2011-10-31',score: 0.03343},
				{id:10, name:"John",age:20,createdAt: '2011-10-31',score: 0.03343},
				{id:10, name:"John",age:20,createdAt: '2011-10-31',score: 0.03343},
				{id:10, name:"John",age:20,createdAt: '2011-10-31',score: 0.03343},
				{id:10, name:"John",age:20,createdAt: '2011-10-31',score: 0.03343},
				{id:10, name:"John",age:20,createdAt: '2011-10-31',score: 0.03343},
				{id:10, name:"John",age:20,createdAt: '2011-10-31',score: 0.03343},
				{id:10, name:"John",age:20,createdAt: '2011-10-31',score: 0.03343},
				{id:10, name:"John",age:20,createdAt: '2011-10-31',score: 0.03343},
				{id:10, name:"John",age:20,createdAt: '2011-10-31',score: 0.03343},
				{id:10, name:"John",age:20,createdAt: '2011-10-31',score: 0.03343},
				{id:10, name:"John",age:20,createdAt: '2011-10-31',score: 0.03343},
			],
			showActions: false
		}
	},
	methods: {
		onRowClick(params) {
				console.log(params.row);
		},
		onRowMouseleave(row, pageIndex) {
			this.showActions = false
		},
		onRowMouseenter(params){
			this.showActions = true
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables';

.page-layout-sidebar-left {
	.page-header {
		margin-bottom: 20px;
		min-height: 60px;

		.menu-btn {
			color: $background-color;
			font-size: 20px;
			display: none;
			cursor: pointer;
		}
	}

	.demo-img {
		width: 100%;
		max-width: 500px;
		margin-bottom: 10px;
		border-radius: 4px;
	}

	.sidebar {
		box-sizing: border-box;
		padding: 24px;
		min-width: 250px;
		margin-left: -24px;

		.close-btn {
			display: none;
			width: 100%;
			margin-bottom: 10px;
		}

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
			.close-btn {
				display: block;
			}

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
