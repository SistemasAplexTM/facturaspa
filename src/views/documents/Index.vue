<template>
	<div class="page-layout-sidebar-left scrollable only-y">
		<div class="page-header header-primary card-base card-shadow--small flex">
			<div class="box grow">
				<h1>Sidebar left</h1>
			</div>
		</div>
		<div class="flex">
			<div class="sidebar scrollable only-y">
				<ul>
					<li v-for="i in 5" :key="i">Sidebar Item {{i}}</li>
				</ul>
			</div>
			<div class="box grow card-base card-shadow--small p-24">
				<div style=" max-width: 1100px; margin: 0 auto; ">
					<h1 class="mt-8">Lorem ipsum dolor sit amet</h1>
					<p class="mt-0">
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
 mounted(){
  getUsers().then(({data}) => {
   console.log(data);
  }).catch(error => {console.log(error);})
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
