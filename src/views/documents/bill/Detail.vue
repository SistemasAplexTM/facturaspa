<template>
	<div>
		<el-row :gutter="24">
			<el-col :span="18">
				<el-input type="search" placeholder="Ingresar código" size="small"
				style="width:400px" v-model="bar_code" :disabled="loading" autofocus
				@keyup.enter.native="getData(bar_code)" ref="bar_code">
					<el-button slot="append" type="primary" @click="" class="pl-30 pr-30" :loading="loading">
						<i v-show="!loading" class="fal fa-search"></i>
					</el-button>
				</el-input>
			</el-col>
			<el-col :span="6" class="labelOff">
					<el-switch v-model="wholesale" inactive-text="Normal" active-text="Por mayor" @change="updateValueDetail()" :disabled="disabledWholesale"></el-switch>
			</el-col>
		</el-row>

		<div class="flex">
			<div class="scrollable only-y w-100">
				<el-table :data="tableData" class="w-100" height="400">
		    <el-table-column prop="producto" label="Producto" width="250"></el-table-column>
		    <el-table-column prop="cantidad" label="Cantidad" width="150">
		    	<template slot-scope="scope">
						<el-input-number v-model="scope.row.cantidad"
						@change="calculateMonto(scope.$index, scope.row.cantidad)"
						size="small" :min="1"></el-input-number>
		    	</template>
		    </el-table-column>
		    <el-table-column prop="precio" label="Precio Unit.">
					<template slot-scope="scope">
						{{ (wholesale) ? format(scope.row.precio_pormayor) : format(scope.row.precio_venta) }}
					</template>
				</el-table-column>
		    <el-table-column prop="descuento" label="Dcto.">
					<template slot-scope="scope">
						{{ format(scope.row.descuento) }}
					</template>
				</el-table-column>
		    <el-table-column prop="iva" label="IVA">
		    	<template slot-scope="scope">
		    		{{ format(scope.row.iva) }} <el-button size="mini" round>{{ scope.row.porcentaje_iva }}%</el-button>
		    	</template>
		    </el-table-column>
		    <el-table-column prop="monto_total" label="Monto Total" width="110">
					<template slot-scope="scope">
						{{ format(scope.row.monto_total) }}
					</template>
				</el-table-column>
		    <el-table-column align="center" width="50">
		    	<template slot-scope="scope">
		    		<el-dropdown class="avatar-container right-menu-item">
				        <el-button type="text" size="mini">
									<i class="fal fa-ellipsis-v"></i>
		    			</el-button>
				        <el-dropdown-menu slot="dropdown" class="user-dropdown">
				          	<el-dropdown-item>
				          		<span @click="deleteRow(scope.$index, tableData)" class="text-danger">
												<i class="fal fa-cloce"></i>
												Eliminar
											</span>
				          	</el-dropdown-item>
				        </el-dropdown-menu>
				    </el-dropdown>
		     	</template>
		    </el-table-column>
    	<template slot="empty">
					<div class="o-040 mb-20">
						<i class="fal fa-shopping-basket fa-10x mt-20"></i>
						<br>
						<p class="mb30">
							Aún no hay productos para facturar
						</p>
					</div>
		    </template>
   </el-table>
			</div>
		</div>

	</div>
</template>

<script>
	import accounting from 'accounting-js';
	import { getByCode as getProductByCode } from '@/api/product'
	import { mapGetters } from 'vuex'
	import { getUser } from '@/utils/auth'

	export default {
		data(){
	  	return {
	  		tableData: [],
	  		rowsDelete: [],
	  		total_monto: 0,
					wholesale: false,
					bar_code: null,
					cellar: null,
					loading: false
	  	}
		},
		computed:{
			...mapGetters(['table_detail', 'editing_document']),
			disabledWholesale(){
				return  Object.keys(this.editing_document).length != 0
			}
		},
		watch:{
			table_detail:{
				deep: true,
	  		handler(val, oldVal){
					if(val.length == 0){
						this.tableData = []
					}else{
						this.tableData = val
					}
				}
			},
			tableData:{
				deep: true,
	  		handler(val, oldVal){
					if(val.length > 0){
							this.$store.commit('SET_TABLE_DETAIL', val)
					}else{
						// this.$store.commit('SET_TABLE_DETAIL', [])
					}
				}
			},
			wholesale(val){
				this.$store.commit('SET_WHOLESALE', val)
			}
		},
		methods:{
			getBranchOfficeId(){
				var data = getUser();
				return data.sucursal_id
				// return 2
			},
			getData(code){
				this.loading = true
				var params = { code: code, branch_office_id: this.getBranchOfficeId() , wholesale: this.wholesale }
				getProductByCode(params).then(({data}) => {
					if(data.code ==  200){
						let datos = this.tableData;
						let position_search = datos.findIndex( buscar => buscar.product_id === data.data.product_id );
						if(position_search < 0){
							data.data.cantidad_anterior = 1
							let desto = data.data.descuento_venta;
							let monto_total = data.data.monto_total;
							if(this.wholesale == true){
								monto_total = data.data.monto_total_pormayor;
								desto = data.data.descuento_pormayor;
							}
							data.data.descuento = desto
							data.data.monto_total = monto_total
       this.tableData.push(data.data)
       this.generateTotals(this.tableData);
							this.bar_code = null;
						}else{
							if ((this.tableData[position_search].cantidad + 1) > (parseInt(datos[position_search].saldo))) {
								this.$message({
									type: 'warning',
									message: 'Supera la cantidad de existencias en inventario'
								});
							}else{
								this.tableData[position_search].cantidad = parseInt(this.tableData[position_search].cantidad) + 1;
								this.calculateMonto(position_search, parseInt(this.tableData[position_search].cantidad));
								this.tableData[position_search].cantidad_anterior = this.tableData[position_search].cantidad
							}
						}
						this.bar_code = null;
						this.loading = false
						// this.$refs.bar_code.focus()
						this.$nextTick(() => this.$refs.bar_code.focus())
					}else{
						this.loading = false
						this.$message({
							type: 'warning',
							message: data.msg
						});
					}
    	}).catch(error => {
     		console.log(error)
					this.loading = false
   	});
			},
			calculateMonto(index, cantidad){
				let me = this
				if (this.tableData[index].cantidad > this.tableData[index].saldo) {
					this.$message({
						type: 'warning',
						message: 'Supera la cantidad de existencias en inventario'
					});
					setTimeout(function () {
						me.tableData[index].cantidad = me.tableData[index].cantidad_anterior
					}, 300);
				}else{
					let precio = this.tableData[index].precio_venta;
					let desto = this.tableData[index].descuento_venta;
					// if(this.wholesale == true){
					// 	precio = this.tableData[index].precio_pormayor;
					// 	desto = this.tableData[index].descuento_pormayor;
					// }
					console.log(desto);
					desto = (desto * cantidad)
					this.tableData[index].descuento = desto
					this.tableData[index].iva = Math.round(((precio * cantidad) - desto)  * this.tableData[index].porcentaje_iva / 100, 0)
					// this.tableData[index].monto_total = (precio * cantidad) - parseFloat(this.tableData[index].descuento) + parseFloat(this.tableData[index].iva)
					this.tableData[index].monto_total = (precio * cantidad) - parseFloat(desto) + parseFloat(this.tableData[index].iva)
					this.generateTotals(this.tableData);
					this.tableData[index].cantidad_anterior = this.tableData[index].cantidad
				}
			},
			generateTotals(datos){
				this.$store.dispatch('updateSubtotal', { data:datos, wholesale: this.wholesale})
			},
			updateValueDetail(){
				// let me = this;
				// if(this.tableData.length > 0){
				// 	this.tableData.forEach( function(value, index, array) {
				// 	  // me.calculateMonto(index, value.cantidad)
				// 	});
				// }
			},
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
			deleteRow(index, rows) {
    rows.splice(index, 1);
				if(this.tableData.length <= 0){
					this.$store.dispatch('defaultTotals')
				}
   	this.generateTotals(this.tableData);
   },
			reset(){
				this.$store.dispatch('defaultAll')
				this.tableData = []
				this.total_monto = 0
				this.wholesale = false
				this.bar_code = null
				this.generateTotals(this.tableData);
				// this.$refs.bar_code.focus()
			}
		}
	}
</script>

<style>

</style>
