<template>
	<vue-scroll class="page-dashboard">

		<resize-observer @notify="__resizeHanlder" />

		<el-row class="mt-0" :gutter="30">
			<el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
				<div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="!asyncComponent">

					<div class="widget-header ph-20 pt-20">
						<div class="flex justify-center align-center">
							<div class="widget-icon-box mr-20 animated fadeInRight">
								<i class="widget-icon mdi mdi-account-multiple accent-text fs-30"></i>
								<div class="badge-box">
									<span class="badge"><i class="mdi mdi-trending-up success-text mr-10"></i><strong class="accent-text">16%</strong></span>
								</div>
							</div>
							<div class="widget-info box grow text-truncate animated fadeInLeft">
								<div class="o-050 widget-title text-truncate pt-5 pb-10">Clientes</div>
								<h2 class="m-0 text-truncate">4,523</h2>
							</div>
						</div>
					</div>

					<component :is="asyncComponent" :type="'line'" :options='{ width: "100%", height: 80 }' :data="[1, 3, 2, 4, 4, 9, 3, 4, 6, 5, 4, 6, 9, 8, 11, 12, 13, 12, 12, 14].toString()"/>
				</div>
			</el-col>
			<el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
				<div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="!asyncComponent">

					<div class="widget-header ph-20 pt-20">
						<div class="flex justify-center align-center">
							<div class="widget-icon-box mr-20 animated fadeInRight">
								<i class="widget-icon mdi mdi-eye accent-text fs-30"></i>
								<div class="badge-box">
									<span class="badge"><i class="mdi mdi-trending-up success-text mr-10"></i><strong class="accent-text">11%</strong></span>
								</div>
							</div>
							<div class="widget-info box grow text-truncate animated fadeInLeft">
								<div class="o-050 widget-title text-truncate pt-5 pb-10">Views</div>
								<h2 class="m-0 text-truncate">2,523</h2>
							</div>
						</div>
					</div>

					<component :is="asyncComponent" :type="'bar'" :options='{ width: "100%", height: 80, fill: ["#c6d9fd"] }' :data="[1, 3, 2, 4, 4, 9, 3, 4, 6, 5, 4, 6, 9, 8, 7, 6, 5, 12, 10, 9].toString()"/>
				</div>
			</el-col>
			<el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
				<div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="!asyncComponent">

					<div class="widget-header ph-20 pt-20">
						<div class="flex justify-center align-center">
							<div class="widget-icon-box mr-20 animated fadeInRight">
								<i class="widget-icon mdi mdi-account-convert success-text fs-30"></i>
								<div class="badge-box">
									<span class="badge"><i class="mdi mdi-trending-neutral info-text mr-10"></i><strong class="success-text">1%</strong></span>
								</div>
							</div>
							<div class="widget-info box grow text-truncate animated fadeInLeft">
								<div class="o-050 widget-title text-truncate pt-5 pb-10">Conversion</div>
								<h2 class="m-0 text-truncate">9,832</h2>
							</div>
						</div>
					</div>

					<component :is="asyncComponent" :type="'line'" :options='{ width: "100%", height: 80, fill: "#56f19a", stroke: "#67C23A" }' :data="[10, 7, 8, 5, 4, 9, 3, 4, 6, 5, 4, 4, 2, 4, 5, 9, 13, 12, 12, 14].toString()"/>
				</div>
			</el-col>
			<el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
				<div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="!asyncComponent">

					<div class="widget-header ph-20 pt-20">
						<div class="flex justify-center align-center">
							<div class="widget-icon-box mr-20 animated fadeInRight">
								<i class="widget-icon mdi mdi-cash-multiple success-text fs-30"></i>
								<div class="badge-box">
									<span class="badge"><i class="mdi mdi-trending-neutral info-text mr-10"></i><strong class="success-text">0%</strong></span>
								</div>
							</div>
							<div class="widget-info box grow text-truncate animated fadeInLeft">
								<div class="o-050 widget-title text-truncate pt-5 pb-10">Revenue</div>
								<h2 class="m-0 text-truncate">6,364</h2>
							</div>
						</div>
					</div>

					<component :is="asyncComponent" :type="'bar'" :options='{ width: "100%", height: 80, fill: ["#56f19a"] }' :data="[6, 5, 4, 3, 5, 3, 4, 5, 6, 5, 4, 2, 3, 8, 7, 6, 5, 2, 1, 5].toString()"/>
				</div>
			</el-col>
		</el-row>

	</vue-scroll>
</template>

<script>
import echarts from 'echarts'

export default {
	name: 'Dashboard',
	data () {
		return {
			asyncComponent: 'peity',
			resized: false
		}
	},
	computed: {
		smallWidget() {
			return this.dashboardWidth >= 970 && this.dashboardWidth <= 1412 && this.windowWidth >= 1200
		}
	},
	methods: {
		__resizeHanlder: _.throttle(function (e) {
			if(this.resized) {

				this.asyncComponent = null
				this.removePeity()
				setTimeout(()=>{this.asyncComponent = 'peity'}, 1000)
			}
			this.resized = true
		}, 700),
		removePeity() {
			const peityEl = document.querySelectorAll('.widget .peity')//.forEach((el)=>{el.remove()})
			//ie fix
			for(let i=0; i<peityEl.length; i++) {peityEl[i].parentNode.removeChild(peityEl[i])}
		},
	}
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables';

.widget {
	height: 200px;
	position: relative;

	.widget-header {

		.widget-icon-box {
			background: rgba(0, 0, 0, .02);
			border: 1px solid rgba(0, 0, 0, .02);
			border-radius: 4px;
			text-align: center;
			width: 60px;
			padding: 5px;
		}

		.widget-title {
			font-weight: bold;
		}
	}



	.badge-box {
		.badge {
			//background: rgba(0, 0, 0, .02);
			display: inline-block;
			//padding: 2px 5px;
			//border: 1px solid rgba(0, 0, 0, .02);
			border-radius: 4px;
			font-size: 80%;
		}
	}
}


/*@media (max-width: 768px) {
	.el-row {
		//margin-left: 0 !important;
		//margin-right: 0 !important;

		.el-col-24 {
			//padding-left: 0 !important;
			//padding-right: 0 !important;
		}
	}
}*/

/*@media (min-width: 1200px) and (max-width: 1850px) {
	.widget {
		.widget-header {
			.widget-icon-box {
				display: none;
			}
		}
	}
}*/
@media (min-width: 768px) and (max-width: 1040px) {
	.radio-switcher {
		display: none;
	}

	.widget {
		.widget-header {
			.widget-icon-box {
				display: none;
			}
		}
	}
}
@media (max-width: 420px) {
	.radio-switcher {
		display: none;
	}
}
</style>

<style lang="scss">
.page-dashboard {

	.widget {
		.peity {
			position: absolute;
			bottom: -1px;
			left: 0;
			border-bottom-left-radius: 5px;
			border-bottom-right-radius: 5px;
		}
	}
	table.styled {
		.peity {
			margin-right: 10px;
		}
	}

	.vb-content {
		padding: 0 20px;
		box-sizing: border-box !important;
		margin-top: -5px;
		margin-left: -20px;
		margin-right: -20px;
		height: calc(100% + 15px) !important;
		width: calc(100% + 40px) !important;
	}
}

@media (max-width: 768px) {
	.page-dashboard {
		.vb-content {
			padding: 0 5px !important;
			margin: -5px;
			width: calc(100% + 10px) !important;
		}
	}
}
</style>
