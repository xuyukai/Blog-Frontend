<template>
  <el-card id="introduction">
    <span style="color:#08c20e">用户名：</span>
    {{username}}
    <br><br>
    <span style="color:#67C23A">邮箱：</span>
    {{email}}
    <br/><br/><br/>
  </el-card>
</template>

<script>
    import 'element-ui/lib/theme-chalk/display.css';
    export default {
        name: "userinfo",
        props: ['username','email'],
        data() {
            return {
            }
        },
        created() {
        }
    }
</script>
<style scoped>
  #introduction {
    /*-moz-box-shadow: 0px 6px 0px #333333;
    -webkit-box-shadow: 0px 6px 0px #333333;
    box-shadow: 0px 3px 10px #333333;*/
    text-align: center;
    margin: 25px 20%;
    padding: 5px 10px;
    width: 60%;
    opacity: 0.8;
  }
</style>
