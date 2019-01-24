new Vue({
    el: "#container",
    data:{
        addressList:[],
        limitNumber:3,
        currentIndex:0,
        addressid:[],
        isShow:false,
        reviseUserName:"",
        reviseUserAddress:"",
        reviseUserTel:"",
        shopingMethod:1,
        delIsShow:false,
        addIsShow:false,
        reviseIsShow:false,
        addUserName:"",
        addUserAddress:"",
        addUserTel:"",
    },
    mounted() {
        this.$nextTick(function(){
            this.getAddressList();
            
        });
        
    },
    computed:{
        filterAdressList(){
            return this.addressList.slice(0,this.limitNumber);
        }
    },
    methods:{
			//获得地址列表数据
        getAddressList(){
            var that = this;
            this.$http.get("./data/address.json").then(function(response){
                    var res = response.data;
                    console.log(res);
                    if(res.status == 0){
                        that.addressList = res.result;
                    }
            });
        },
        showMore(limitNumber){
            if(limitNumber == 3){
                this.limitNumber = this.addressList.length
            }else{
                this.limitNumber = 3
            }
        },
        setAddressId(i){
            this.pindex = i;
            console.log(i);
        },
        setDefault(id,i){
            var that = this;
            
            this.addressList.forEach(function(item,index){
                if(item.addressId ==id){
                    item.isDefault = true;
                    
                }else{
                    item.isDefault = false;
                }
            })
        },
        reviseAddress(){
           this.isShow = true;
           this.reviseIsShow = true;
           this.delIsShow = false;
        },
        delShow(){
            this.isShow = true;
            this.reviseIsShow = false;
            this.delIsShow = true;
            
        },
        saveAddress(){
            
            var that = this;
            this.addressList.forEach(function(item,index){
                
                if(that.currentIndex == index && that.reviseUserName !== ""){
                    item.userName = that.reviseUserName;
                    item.streetName = that.reviseUserAddress;
                    item.tel = that.reviseUserTel;
                   
                    that.reviseIsShow=that.delIsShow=that.isShow=false;
                }
                
            });
            that.reviseUserName=that.reviseUserAddress=that.reviseUserTel="";
        },
        delAddressList(){
            this.addressList.splice(this.currentIndex,1);
            this.reviseIsShow=this.delIsShow=this.isShow=false;
        },
        addAddress(){
            
            this.addressList.unshift({
                "addressId":(this.addressList.length-1),
                "userName":this.addUserName,
                "streetName":this.addUserAddress,
                "postCode":"100001",
                "tel":this.addUserTel,
                "isDefault":false,
                
              });
              this.addIsShow=this.isShow=false;
              this.addUserName=this.addUserAddress=this.addUserTel = "";
        },
        
}
})