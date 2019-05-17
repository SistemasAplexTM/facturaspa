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

		<el-row class="mt-0" :gutter="30">
			<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
				<div class="card-base card-shadow--medium bg-accent p-20" style="height:400px" v-loading="!asyncChart1">
					<h1 class="white-text mv-0 animated fadeInDown">Statistics</h1>
					<h3 class="mt-0 mb-40 white-text o-050 animated slideInUp">revenue</h3>
					<div id="chart1" style="height:300px; width:100%"></div>
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
			asyncChart1: true,
			chart1: null,
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

				this.asyncChart1 = false
				setTimeout(()=>{this.asyncChart1 = true; this.resizeChart1()}, 1000)
			}
			this.resized = true
		}, 700),
		removePeity() {
			const peityEl = document.querySelectorAll('.widget .peity')//.forEach((el)=>{el.remove()})
			//ie fix
			for(let i=0; i<peityEl.length; i++) {peityEl[i].parentNode.removeChild(peityEl[i])}
		},
		initChart1() {
			this.chart1 = echarts.init(document.getElementById('chart1'))

			// Generate data
			let category = [];
			let dottedBase = +new Date();
			let lineData = [];
			let barData = [];

			for (let i = 0; i < 6; i++) {
				let date = new Date(dottedBase += 3600 * 24 * 1000);
				category.push([
					date.getFullYear(),
					date.getMonth() + 1,
					date.getDate()
				].join('-'));
				let b = Math.random() * 200;
				let d = Math.random() * 200;
				barData.push(parseInt(b))
				lineData.push(parseInt(d + b));
			}


			this.chart1.setOption({
				//backgroundColor: '#0f375f',
				grid: {
					show: false,
					left: '20px',
					right: '50px',
					bottom: '20px',
					top: '20px',
					containLabel: true
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross'
					}
				},
				legend: {
					show: false,
					data: ['line', 'bar'],
					textStyle: {
						color: '#ccc'
					}
				},
				xAxis: {
					data: category,
					boundaryGap : false,
					axisLine: {
						lineStyle: {
							color: 'rgba(255,255,255,0.5)'
						}
					}
				},
				yAxis: {
					splitLine: {show: false},
					axisLine: {
						lineStyle: {
							color: 'rgba(255,255,255,0.5)'
						}
					}
				},
				series: [
					{
						name: 'Data A',
						type: 'line',
						smooth: true,
						showAllSymbol: true,
						symbol: 'emptyCircle',
						symbolSize: 10,
						lineStyle: {
							color: '#fff'
						},
						itemStyle: {
							color: '#fff',
							borderColor: '#5f8fdf',
							borderWidth: 3
						},
						areaStyle: {
							color: 'rgba(255,255,255,0.2)'
						},
						animationDuration: 2800,
						animationEasing: 'cubicInOut',
						data: lineData
					},
					{
						name: 'Data B',
						type: 'bar',
						barWidth: 10,
						itemStyle: {
							normal: {
								barBorderRadius: 5,
								color: new echarts.graphic.LinearGradient(
									0, 0, 0, 1,
									[
										{offset: 0, color: '#fff'},
										{offset: 1, color: 'rgba(255,255,255,0)'}
									]
								)
							}
						},
						data: barData
					},
					{
						name: 'Data C',
						type: 'pictorialBar',
						symbol: 'rect',
						itemStyle: {
							normal: {
								color: 'rgba(255,255,255,0.1)'
							}
						},
						symbolRepeat: true,
						symbolSize: [12, 4],
						symbolMargin: 1,
						z: -10,
						data: lineData
					}
				]
			})
		},
		destroyChart1() {
			if(this.chart1) {
				this.chart1.dispose()
				this.chart1 = null
			}
		},
		resizeChart1() {
			if (this.chart1) {
				this.chart1.resize()
			}
		},
	},
	mounted() {
		this.initChart1()
	},
	beforeDestroy() {
		this.destroyChart1()
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

.timeline {
	max-width: 1200px;
	margin: 6px;
}
.timeline, .timeline-title {
	color: $text-color;
	line-height: 1.4;
	cursor: default;
	font-family: inherit;
}


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
