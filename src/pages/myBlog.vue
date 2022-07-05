<template>
  <div>
    <div class="bg2"></div>
    <div id="myBlog">
      <userInfo style="margin-left:200px;margin-bottom: -15%"></userInfo>
      <el-main style="width: 60%;margin-top:-225px;margin-left: 400px">
        <div>
          <myBlogList/>
        </div>
      </el-main>
    </div>
  </div>
</template>
<script>
    import myBlogList from '@/components/myBlogList'
    import userInfo from "../components/userInfo";
    export default {
        name: 'myBlog',
        components: {myBlogList,userInfo}
    }
</script>
<style scoped>
  .bg2{
    background: url("../assets/bg1.jpg") no-repeat;
    background-position: center;
    margin-top:-6%;
    margin-left: -0.5%;
    padding: 0;
    height: 110%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  #myBlog{
    margin: auto 1%;
    position: relative;
  }
</style>
