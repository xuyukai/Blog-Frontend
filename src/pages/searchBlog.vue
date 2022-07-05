<template>
  <div>
    <Webhead></Webhead>
    <div style="position: relative;opacity: 0.8">
      <el-menu :default-active="activeIndex" @hover="handleSelect" style="margin-left:23%;margin-top:1% ;width:55.5%;" mode="horizontal"
               active-text-color="#ffd04b">
        <el-menu-item index="1" style="margin-left: 5%" @click="articleSearch">
          <div style="">
            文章
          </div>
        </el-menu-item>
        <el-menu-item index="2" style="margin-left: 5%" @click="userSearch">
          <div>
            用户
          </div>
        </el-menu-item>
      </el-menu>
    </div>
    <div style="position: relative" id="searchBlogList" v-loading="loading" v-if="userOrArticleFlag">
      <p style="display: none">{{searchTxt = this.$route.params.searchTxt}}</p>
      <el-card shadow="hover" v-if="blogList.length<=0" style="width:62%;margin-left:20%;margin-top:20%; opacity: 0.8">暂无符合条件的文章</el-card>
      <div>
        <blogCard v-for="blog in blogList" :key="blog.id" :id="blog.articleId" :title="blog.title"
                      :body="blog.context"
                      :time="blog.date"
                      :discussCount="blog.commentNumber"
                      :tag="blog.label"
                      :name="blog.authorName"/>
      </div>

      <div>
        <el-pagination
          :page-size="pageSize"
          background
          layout="prev, pager, next"
          :total="totalblog"
          @current-change="currentArticleChange"
          :current-page="currentArticlePage"
          @prev-click="currentPage=currentPage-1"
          @next-click="currentPage=currentPage+1">
        </el-pagination>
      </div>
    </div>
    <div style="position: relative" id="searchUserList" v-loading="loading" v-if="!userOrArticleFlag">
      <p style="display: none">{{searchTxt = this.$route.params.searchTxt}}</p>
      <el-card shadow="hover" v-if="userList.length<=0" style="width:62%; margin-left:20%;margin-top:20%; opacity:0.8">暂无符合条件的用户</el-card>
      <div>
        <userInfo v-for="user in userList"
                  :key="user.username"
                  :username="user.username"
                  :email="user.mailAddress"/>
      </div>

      <div>
        <el-pagination
          :page-size="pageSize"
          background
          layout="prev, pager, next"
          :total="totaluser"
          @current-change="currentUserChange"
          :current-page="currentPage"
          @prev-click="currentPage=currentPage-1"
          @next-click="currentPage=currentPage+1">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import blogCard from '@/components/blogcard'
import userInfo from "../components/UserInfoForSearch";
import Webhead from "../components/WebheadForSearch";

    export default {
        name: 'searchBlog',
        components: {userInfo, Webhead, blogCard},
        data() {
            return {
                activeIndex:'1',
                searchTxt: '',
                totalblog: 10,     //数据总数
                totaluser:0,
                blogList: [],   //当前页数据
                userList:[],
                pageSize: 5,    //每页显示数量
                currentPage: 1,
                loading:  true,
                userOrArticleFlag: true
            }
        },
        watch: {
            searchTxt() { //在此调用接口
                this.loadBlog();
            }
        },
        methods: {
            articleSearch(){
                this.currentPage=1;
                this.userOrArticleFlag=true
            },
            userSearch(){
                this.currenPage=1;
                this.userOrArticleFlag=false
            },
            handleSelect(){

            },
            loadBlog() { //加载数据
                this.$axios
                    .post('/searcharticle',{
                        page: this.currentPage,
                        keyword: this.searchTxt
                  })
                    .then(successResponse => {
                        this.blogList = successResponse.data.data.articleArrayList;
                        this.userList=successResponse.data.data.userArrayList;
                        this.totalblog = successResponse.data.data.articleNumber;
                        /*this.totaluser = seccessResponse.data.data.userNumber;*/
                        this.loading = false;
                    })
            },
            currentUserChange(currentPage){
                    this.currentUserPage=currentPage;
                    this.loadBlog();
                    scrollTo(0,0);
            },
            currentArticleChange(currentPage){
                this.currentArticlePage=currentPage;
                this.loadBlog();
                scrollTo(0,0);
            }
        }
    }
</script>
<style scoped>

  #searchBlogList {
    text-align: center;
    margin: -13px 5% 0 5%;
  }
  #searchUserList {
    text-align: center;
    margin: -13px 5% 0 5%;
  }
</style>
