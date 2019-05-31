<template>
	<div class="page-layout-sidebar-left" style="max-width: 100%">
		<div class="page-header header-primary card-shadow--small flex p-5 br-5">
			<div class="box grow">
				<h1>Informes</h1>
			</div>
		</div>
		<div class="h-100 flex">
			<div class="sidebar scrollable only-y" v-loading="loadingSidebar">
				<ul>
					<li v-for="type in types" :key="type" @click="selectType(type)">{{ type }}</li>
				</ul>
			</div>
			<div class="box grow card-base card-shadow--small p-30 scrollable only-y" v-loading="loading">
				<div class="bb mb-10 pb-15 text-center">
					<el-button icon="el-icon-download" type="success" size="small" class="fl"
					@click="test">Descargar</el-button>
					<!-- @click="test" :disabled="type_selected_name==null">Descargar</el-button> -->
					<h2 class="" style="display:inline">{{ type_selected_name }}</h2>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { testDetail } from '@/api/reports'
export default {
	name: 'Reports',
	data() {
		return {
			type_selected: null,
			type_selected_name: null,
			types: ['Informe x Bodega'],
			loadingSidebar: false,
			loading: false,
			totalRecords: 0,
		}
	},
	methods: {
		test(){
			this.loading = true
			testDetail().then(({data}) => {
				this.loading = false
				console.log(data);
			}).catch(error => {
				this.loading = false
				console.log(error)})
		},
		selectType(type){
			// this.type_selected = type.id
			this.type_selected_name = type
			this.isLoading = true
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
