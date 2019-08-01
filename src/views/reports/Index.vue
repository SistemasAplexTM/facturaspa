<template>
	<div class="page-layout-sidebar-left" style="max-width: 100%">
		<div class="page-header header-primary card-shadow--small flex p-5 br-5">
			<div class="box grow">
				<h1>Informes</h1>
			</div>
			<div class="menu-btn align-vertical" @click="sidebarOpen = !sidebarOpen">
				<i class="mdi mdi-menu align-vertical-middle"></i>
			</div>
		</div>
		<div class="h-100 flex">
			<div class="sidebar scrollable only-y" v-loading="loadingSidebar" :class="{'open':sidebarOpen}">
				<el-button size="small" class="close-btn" @click="sidebarOpen = false">Cerrar</el-button>
				<ul>
					<li v-for="type in types" :key="type" @click="selectType(type)">{{ type }}</li>
				</ul>
			</div>
			<div class="box grow card-base card-shadow--small p-30 scrollable only-y" v-loading="loading">
				<div class="bb mb-10 pb-15 text-center">
					<template v-if="showFilter">
						<h2 class="" style="display:inline">&nbsp;{{ type_selected_name }}</h2>
					</template>
					<template v-else>
						<h2 class="" style="display:inline">Seleccione una opción</h2>
					</template>
				</div>


				<template v-if="showFilter">
					<el-row :gutter="20">
					  <el-col :span="6" :xs="24" :sm="24" :md="12" :lg="12" :xl="6" class="pb-10">
							<span class=""><i class="fal fa-calendar-alt"></i> Elija un rango de fechas</span>
					    <el-date-picker
					      v-model="date_rangue"
					      type="daterange"
					      align="left"
					      unlink-panels
					      range-separator="-"
					      start-placeholder="Fecha Inicio"
					      end-placeholder="Fecha Fin"
								format="yyyy/MM/dd"
      					value-format="yyyy-MM-dd"
					      :picker-options="pickerOptions">
					    </el-date-picker>
						</el-col>
					  <el-col :span="6" :xs="24" :sm="24" :md="12" :lg="12" :xl="6" class="pb-10">
							<span class=""><i class="fal fa-store"></i> Seleccione una sucursal</span>
							<el-select v-model="branch_id" filterable placeholder="Seleccione" clearable>
						    <el-option
						      v-for="item in branchs"
						      :key="item.id"
						      :label="item.name"
						      :value="item.id">
						    </el-option>
						  </el-select>
						</el-col>
					  <el-col :span="6" :xs="24" :sm="24" :md="12" :lg="12" :xl="6" class="pb-10">
							<span class=""><i class="fal fa-tags"></i> Seleccione una categoria</span>
							<el-select v-model="category_id" filterable placeholder="Seleccione" clearable>
						    <el-option
						      v-for="item in categories"
						      :key="item.id"
						      :label="item.name"
						      :value="item.id">
						    </el-option>
						  </el-select>
						</el-col>
					  <!-- <el-col :span="6" :xs="24" :sm="24" :md="12" :lg="12" :xl="6" class="pb-10">
							<span class=""><i class="fal fa-box-full"></i> Seleccione un producto</span>
							<el-select v-model="product_id" filterable placeholder="Seleccione">
						    <el-option
						      v-for="item in products"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						  </el-select>
						</el-col> -->
					</el-row>
					<el-row :gutter="20" class="mt-20">
						<el-col :span="24">
							<el-button icon="el-icon-download" type="success" size="small" class=""
							@click="fileGeneral">Descargar</el-button>
						</el-col>
					</el-row>
				</template>
			</div>
		</div>
	</div>
</template>

<script>
import { testDetail } from '@/api/reports'
import { getBranchs } from '@/api/branch'
import { getAllCategories } from '@/api/product'

export default {
	name: 'Reports',
	data() {
		return {
			sidebarOpen: false,
			type_selected: null,
			type_selected_name: null,
			types: ['Informe General'],
			loadingSidebar: false,
			loading: false,
			showFilter: false,
			totalRecords: 0,
			pickerOptions: {
        shortcuts: [{
          text: 'Ult. Semana',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: 'Ult. Mes',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: 'Ult.3 meses',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
			},
			date_rangue: '',
			branchs: [],
			branch_id: null,
			categories: [],
			category_id: null,
			products: [],
			product_id: null,
		}
	},
	watch:{
		showFilter(val){
			this.getDataBranch()
			this.getDataCategories()
		}
	},
	methods: {
		fileGeneral(){
			this.loading = true
			window.open(process.env.VUE_APP_ROOT + "moreSales/"+ this.date_rangue[0] +"/"+ this.date_rangue[1] +"/"+ this.branch_id +"/"+ this.category_id)
			this.loading = false
		},
		selectType(type){
			// this.type_selected = type.id
			this.showFilter = true
			this.type_selected_name = type
			this.isLoading = true
		},
		getDataBranch(){
			getBranchs().then(({data}) => {
				this.branchs = data.data
			}).catch( error => { console.log(error) })
		},
		getDataCategories(){
			getAllCategories().then(({data}) => {
				this.categories = data.data
			}).catch( error => { console.log(error) })
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
			.menu-btn {
				color: $background-color;
				padding-right: 5px;
				font-size: 20px;
				display: none;
				cursor: pointer;
			}
		}

	.h-100{
		max-height: 100%;
	}

	.close-btn {
		display: none;
		width: 100%;
		margin-bottom: 10px;
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
