new Vue({
	el: "#app",
	data:{
		cartList:[],
		delFlag:false,
		goodsIndex:0,
		totalMoney:0,
		checkAllFlag:false
	},
	filters:{
		fomatMoney(value){
			return "￥" + value.toFixed(2);
		}
	},
	methods:{
		getCartList(){
			this.$http.get("./data/cartData.json").then(response=>{
				var res = response.data;
				if(res.status == 1){
					console.log(res.result.list);
					this.cartList = res.result.list;
				}
			})
		
		},
		delGoods(){
			//console.log(this.goodsIndex)
			this.cartList.splice(this.goodsIndex,1);
			this.delFlag = false
		},
		// checkAll(flag){
		// 	this.checkAllFlag = flag;
		// 	this.cartList.forEach((item,index)=>{
		// 		if(!item.checked){
		// 			this.$set(item,"checked",this.checkAllFlag)
		// 		}else{
		// 			item.checked = this.checkAllFlag;
		// 		}
		// 	})
		// },
		checkAll() {
			this.checkAllFlag = !this.checkAllFlagB
		 	this.cartList.forEach((item,index)=>{
				  if (typeof item.checked == 'undefined'){
		 			this.$set(item,"checked",this.checkAllFlag)
		 		}else{
					item.checked = this.checkAllFlag;	    
		 		}
			 })
			
			 this.calcTotalMoney()
			
		 },
		
		selectGoods(item){
			if(!item.checked){
				Vue.set(item,"checked",true)
			}else{
				item.checked = !item.checked
			}
			this.calcTotalMoney();
		},
		changeGoodsNumber(item,way) {
			if (way > 0) {
				item.productQuantity++
			}else{
				if (item.productQuantity > 1) {
					item.productQuantity--
				}
			}
			this.calcTotalMoney();
		},

		calcTotalMoney(){
			this.totalMoney = 0;
			this.cartList.forEach((item,index)=>{
				if(item.checked){
					this.totalMoney += item.productQuantity*item.productPrice
				}
				console.log(item.checked)
			})
		},
		

	},
	computed:{
		checkAllFlagB(){
			return this.cartList.every(t => t.checked);
		},
		checkAllFlagA() {
			return this.cartList.some(t => t.checked);
		}
	},
	mounted() {
		this.$nextTick(function(){
			this.getCartList();
		});
	},
	
})