<template>
  <el-card id="introduction">
    <!--<hr />-->
    <p>
      <span style="color:#67C23A" class="el-icon-location-information">基本信息</span>
    </p>
    <hr />
    <span style="color:#08c20e">用户名：</span>
    {{username}}
    <br><br>
    <span style="color:#67C23A">邮箱：</span>
    {{email}}
    <br/><br/><br/>
  </el-card>
</template>

<script>

    export default {
        name: 'introduction',
        data() {
            return {
                username:this.$store.state.name,
                email:''
            }
        },
        created() {
            this.loadInfo()
        },
        methods:{
            loadInfo(){
                this.$axios
                    .post('/userinfo',{
                        username:this.$store.state.name
                    })
                    .then(res=>{
                        this.email=res.data.message
                    })
            }
        }
    }
</script>
<style scoped>
  #introduction {
    /*-moz-box-shadow: 0px 6px 0px #333333;
    -webkit-box-shadow: 0px 6px 0px #333333;
    box-shadow: 0px 3px 10px #333333;*/
    text-align: center;
    width:300px;
    height: 200px;
    margin: 20px 0;
    opacity: 0.8;
  }
</style>
