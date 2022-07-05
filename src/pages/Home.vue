<!--主页-->

<template>
    <div>
      <web-head></web-head>
      <div style="height: 900px">
        <el-menu :default-active="activeIndex" style="margin-left:15%;margin-top:4% ;width:70%;height: 8%" mode="horizontal" :router="true"  active-text-color="#ffd04b">
            <el-menu-item style="width:10%;" @click="changeTag(6)">
              <div style="line-height:35px">
              <i class="el-icon-star-off"></i>
              <br/>
                热门文章
              </div>
            </el-menu-item>
          <el-menu-item style="width:10%;margin-left: 5%" @click="changeTag(7)">
            <div style="line-height:35px">
              <i class="el-icon-stopwatch"></i>
              <br/>
                最新文章
            </div>
          </el-menu-item>
          <el-menu-item style="width:10%;margin-left: 5%" @click="changeTag(1)">
            <div style="line-height:35px">
              <i class="el-icon-data-analysis"></i>
              <br/>
              技术剖析
            </div>
          </el-menu-item>
          <el-menu-item style="width:10%;margin-left: 5%" @click="changeTag(2)">
            <div style="line-height:35px">
              <i class="el-icon-camera"></i>
              <br/>
              业界新闻
            </div>
          </el-menu-item>
          <el-menu-item style="width:10%;margin-left: 5%" @click="changeTag(3)">
            <div style="line-height:35px">
              <i class="el-icon-chat-dot-square"></i>
              <br/>
              经验随笔
            </div>
          </el-menu-item>
          <el-menu-item style="width:10%;margin-left: 5%" @click="changeTag(4)">
            <div style="line-height:35px">
              <i class="el-icon-monitor"></i>
              <br/>
              软件工程
            </div>
          </el-menu-item>
          <el-menu-item style="width:10%;margin-left: 5% " @click="changeTag(5)">
            <div style="line-height:35px">
              <i class="el-icon-setting"></i>
              <br/>
              工具推荐
            </div>
          </el-menu-item>

          </el-menu>
      </div>
      <div id="searchBlogList">
        <div>
          <blogCard v-for="blog in blogList" :key="blog.articleId" :id="blog.articleId" :title="blog.title"
                    :body="blog.context"
                    :time="blog.date"
                    :discussCount="blog.commentNumber"
                    :tag="blog.label"
                    :name="blog.authorName"/>
        </div>
      </div>
      <web-foot></web-foot>
    </div>
</template>

<script>
import blogcard from "../components/blogcard";
import webhead from '../components/webhead.vue'
import webfoot from '../components/webfoot.vue'
import webleft from '../components/webleft.vue'
export default {
  name: 'Home',
  data () {
    return {
        blogList: [],
        activeIndex: '/',
        total: 0,
        currentPage: 0,
        currentTag:0
    }
  },
  components: {
    'blogCard':blogcard,
    'web-head': webhead,
    'web-foot': webfoot,
    'web-left': webleft
  },
  created () {
      this.currentTag=6;
      this.loadBlog();
  },
  watch:{
      currentTag(){
          this.loadBlog();
      }
  },
  methods: {
      changeTag(tag){
          this.currentTag=tag;
      },
      loadBlog(){
          this.$axios
              .post('/home',{
                  tagId:this.currentTag
              }).then(res=>{
                  this.blogList=res.data.data;
          })
      }
  }
}
</script>

<style scoped>
  #searchBlogList {
    text-align: center;
    margin: -48% 5% 0 5%;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .el-row {
    margin-bottom: 20px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #ffff52;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

</style>
