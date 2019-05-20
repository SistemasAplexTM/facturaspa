<template>
	<div class="page-layout-sidebar-left">
		<div class="page-header header-primary card-base card-shadow--small flex">
			<div class="box grow">
				<h1>Nombre de la tienda</h1>
			</div>
		</div>
		<div class="tales flex">
			<div class="sidebar scrollable only-y">
				<ul>
					<li v-for="i in 20" :key="i">Sidebar Item {{i}}</li>
				</ul>
			</div>
			<div class="box grow card-base card-shadow--small p-30 scrollable only-y">
				<div class="bb mb-10 pb-15">
					<el-button icon="el-icon-plus" type="success" size="small">Nuevo</el-button>
					<div class="fr">
						<el-button icon="el-icon-printer"  size="small"></el-button>
						<el-button icon="el-icon-edit" type="primary" size="small"></el-button>
						<el-button icon="el-icon-delete" type="danger" size="small"></el-button>
					</div>
				</div>
				<div style="m-10 tales flex">
					<h1 class="mt-8">Lorem ipsum dolor sit amet</h1>
					<p class="mt-0">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a odio malesuada, vehicula felis in, porttitor lectus. Donec venenatis nunc metus. Praesent ornare est diam, vitae finibus mauris faucibus quis. Duis magna orci, aliquam at arcu sit amet, sagittis auctor nisi. Aenean vestibulum sem eu orci ultricies, sed accumsan quam varius. Sed vulputate quis orci et ornare. Suspendisse in magna eu felis ullamcorper ultrices.
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a odio malesuada, vehicula felis in, porttitor lectus. Donec venenatis nunc metus. Praesent ornare est diam, vitae finibus mauris faucibus quis. Duis magna orci, aliquam at arcu sit amet, sagittis auctor nisi. Aenean vestibulum sem eu orci ultricies, sed accumsan quam varius. Sed vulputate quis orci et ornare. Suspendisse in magna eu felis ullamcorper ultrices.
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a odio malesuada, vehicula felis in, porttitor lectus. Donec venenatis nunc metus. Praesent ornare est diam, vitae finibus mauris faucibus quis. Duis magna orci, aliquam at arcu sit amet, sagittis auctor nisi. Aenean vestibulum sem eu orci ultricies, sed accumsan quam varius. Sed vulputate quis orci et ornare. Suspendisse in magna eu felis ullamcorper ultrices.
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a odio malesuada, vehicula felis in, porttitor lectus. Donec venenatis nunc metus. Praesent ornare est diam, vitae finibus mauris faucibus quis. Duis magna orci, aliquam at arcu sit amet, sagittis auctor nisi. Aenean vestibulum sem eu orci ultricies, sed accumsan quam varius. Sed vulputate quis orci et ornare. Suspendisse in magna eu felis ullamcorper ultrices.
					</p>
					<h1 class="mt-8">Lorem ipsum dolor sit amet</h1>
					<p class="mt-0">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a odio malesuada, vehicula felis in, porttitor lectus. Donec venenatis nunc metus. Praesent ornare est diam, vitae finibus mauris faucibus quis. Duis magna orci, aliquam at arcu sit amet, sagittis auctor nisi. Aenean vestibulum sem eu orci ultricies, sed accumsan quam varius. Sed vulputate quis orci et ornare. Suspendisse in magna eu felis ullamcorper ultrices.
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a odio malesuada, vehicula felis in, porttitor lectus. Donec venenatis nunc metus. Praesent ornare est diam, vitae finibus mauris faucibus quis. Duis magna orci, aliquam at arcu sit amet, sagittis auctor nisi. Aenean vestibulum sem eu orci ultricies, sed accumsan quam varius. Sed vulputate quis orci et ornare. Suspendisse in magna eu felis ullamcorper ultrices.
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a odio malesuada, vehicula felis in, porttitor lectus. Donec venenatis nunc metus. Praesent ornare est diam, vitae finibus mauris faucibus quis. Duis magna orci, aliquam at arcu sit amet, sagittis auctor nisi. Aenean vestibulum sem eu orci ultricies, sed accumsan quam varius. Sed vulputate quis orci et ornare. Suspendisse in magna eu felis ullamcorper ultrices.
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a odio malesuada, vehicula felis in, porttitor lectus. Donec venenatis nunc metus. Praesent ornare est diam, vitae finibus mauris faucibus quis. Duis magna orci, aliquam at arcu sit amet, sagittis auctor nisi. Aenean vestibulum sem eu orci ultricies, sed accumsan quam varius. Sed vulputate quis orci et ornare. Suspendisse in magna eu felis ullamcorper ultrices.
					</p>
					<h1 class="mt-8">Lorem ipsum dolor sit amet</h1>
					<p class="mt-0">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a odio malesuada, vehicula felis in, porttitor lectus. Donec venenatis nunc metus. Praesent ornare est diam, vitae finibus mauris faucibus quis. Duis magna orci, aliquam at arcu sit amet, sagittis auctor nisi. Aenean vestibulum sem eu orci ultricies, sed accumsan quam varius. Sed vulputate quis orci et ornare. Suspendisse in magna eu felis ullamcorper ultrices.
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a odio malesuada, vehicula felis in, porttitor lectus. Donec venenatis nunc metus. Praesent ornare est diam, vitae finibus mauris faucibus quis. Duis magna orci, aliquam at arcu sit amet, sagittis auctor nisi. Aenean vestibulum sem eu orci ultricies, sed accumsan quam varius. Sed vulputate quis orci et ornare. Suspendisse in magna eu felis ullamcorper ultrices.
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a odio malesuada, vehicula felis in, porttitor lectus. Donec venenatis nunc metus. Praesent ornare est diam, vitae finibus mauris faucibus quis. Duis magna orci, aliquam at arcu sit amet, sagittis auctor nisi. Aenean vestibulum sem eu orci ultricies, sed accumsan quam varius. Sed vulputate quis orci et ornare. Suspendisse in magna eu felis ullamcorper ultrices.
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a odio malesuada, vehicula felis in, porttitor lectus. Donec venenatis nunc metus. Praesent ornare est diam, vitae finibus mauris faucibus quis. Duis magna orci, aliquam at arcu sit amet, sagittis auctor nisi. Aenean vestibulum sem eu orci ultricies, sed accumsan quam varius. Sed vulputate quis orci et ornare. Suspendisse in magna eu felis ullamcorper ultrices.
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { getUsers } from '@/api/user'
export default {
	name: 'LayoutSidebarLeft',
	data() {
		return {
			sidebarOpen: false
		}
	},
 // mounted(){
 //  getUsers().then(({data}) => {
 //   console.log(data);
 //  }).catch(error => {console.log(error);})
 // }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables';

.page-layout-sidebar-left {
	.page-header {
		margin-bottom: 20px;
	}

	.tales{
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
