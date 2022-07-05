<template>
  <div>
    <div class="bg"></div>
    <el-card style="position:relative; opacity: 0.8"  id="blog">
      <el-link :underline="false" @click="back()"><i class="el-icon-back">Back</i></el-link>
      <!--为了blogId值改变事件会被watch到-->
      <p style="display: none">{{blogId = this.$route.params.blogId}}</p>

      <div style="position:relative" id="title">
        <h2 style="text-align: center;margin-bottom:50px ">{{title}}</h2>
      </div>
      <div style="text-align: center">
        <p>
          <span class="el-icon-time hidden-xs-only">&nbsp;{{time}}</span>
          <span class="el-icon-chat-line-square hidden-xs-only" style="margin-left: 100px">&nbsp;{{discussCount}}</span>
          <span class="el-icon-user-solid hidden-xs-only" style="margin-left: 150px">&nbsp;{{userName}}</span>
          <span>
              <el-tag type="success" style="margin-left: 80px">{{tag}}</el-tag>
          </span>
        </p>
      </div>


      <mavon-editor v-model="body" id="editor" :toolbarsFlag="false" :subfield="false" defaultOpen="preview"/>
      <!-- 以下是预览模式配置 -->
      <!--:toolbarsFlag="false"  :subfield="false" defaultOpen="preview"-->
      <div id="discuss" class="hidden-xs-only">

        <div style="width: 50%;margin-left: 2.5%;padding-top: 2% ;height:100%" v-if="getStoreName()!=''">
          <el-input v-model="discussBody" placeholder="请输入评论内容" style="width: 80%;height: 100%" ></el-input>
          <el-button type="primary" style="width: 15%"  @click="sendDiscuss">评论</el-button>
        </div>

        <!-- 评论部分 -->
        <div v-for="discuss in discussList" id="discussList">
          <p style="margin: -5px " @mouseenter="pEnter()" @mouseleave="pLeave()">
            <el-button type="text">{{discuss.username}}&nbsp;&nbsp;:</el-button>
            <span style="margin-left: 10px">{{discuss.context}}</span>
            <br/>
            <span style="color: #909399;" class="el-icon-time">{{discuss.date}}</span>

          </p>
        </div>

        <div style="padding-bottom: 4%">
          <el-pagination
            :page-size="pageSize"
            background
            layout="prev, pager, next"
            :total="total"
            @current-change="currentChange"
            :current-page="currentPage"
            @prev-click="currentPage=currentPage-1"
            @next-click="currentPage=currentPage+1"
            :hide-on-single-page="true">
          </el-pagination>
        </div>

      </div>

    </el-card>

  </div>
</template>
<script>
    import 'element-ui/lib/theme-chalk/display.css';
    export default {
        name: 'blog',
        data() {
            return {
                blogId: -1,//博文id
                title: '',//博文标题
                body: '',//博文内容
                discussCount: 0,//评论数
                blogViews: 0,//浏览数
                time: 0, //发布事件
                userName: '',//博客用户名
                tag: '',  //博文标签
                userReward: '',//博主打赏码

                total: 0,        //数据总数
                discussList: [],   //当前页数据
                pageSize: 5,    //每页显示数量
                currentPage: 1,   //当前页数

                discussBody: '',//评论内容
                replyFlag: false,  // 是否显示回复按钮
                replyBody: ''   //回复内容
            }
        },
        watch: {
            blogId() {//在此调用接口
                this.loadBlog();
                var w = document.documentElement.offsetWidth || document.body.offsetWidth;
                if (w < 768) {  //对应xs
                    document.getElementById('editor').style.margin = '0% -4.5%';
                    document.getElementById('blog').style.margin = '20px 0% 0 0%';
                    document.getElementById('blog').style.padding = '0';
                }
            }
        },
        methods: {
            currentChange(currentPage) { //页码更改事件处理
                this.currentPage = currentPage;
                this.loadBlog();
            },
            loadBlog() { //加载数据
                this.$axios
                    .post('/blog' ,{
                        articleId: this.blogId
                    })
                    .then(res => {
                        this.title = res.data.data.title;
                        this.body = res.data.data.context;
                        this.discussCount = res.data.data.commentNumber;
                        this.time = res.data.data.date;
                        this.userName = res.data.data.authorName;
                        this.tag = res.data.data.label;
                    }
                );

                this.$axios.post('/comments',{
                    articleId:this.blogId ,
                    page :this.currentPage
                }).then(responese => {
                    this.total = responese.data.number;
                    this.discussList = responese.data.data;
                });

            },
            getStoreName() { //获取store中存储的name
                return this.$store.state.name;
            }
            ,
            pEnter() {
                this.replyFlag = true
            }
            ,
            pLeave() {
                this.replyFlag = false
            }
            ,
            sendDiscuss() {  //发送评论
                if (this.discussBody.length <= 0) {
                    this.$message({
                        type: 'error',
                        message: '请先填写评论！'
                    });
                    return;
                }
                this.$axios
                    .post('/savecomments',{
                        username: this.userName,
                        articleId: this.blogId,
                        context: this.discussBody
                    })
                    .then(successResponse=>{
                        this.$message({
                            type:'success',
                            message:'评论成功！'
                        });
                        this.discussBody='';
                        this.loadBlog();
                    })
            }
            ,
            deleteDiscuss(discussId) {  //删除评论
                this.$confirm('是否删除此评论?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                        //普通用户
                        this.$axios
                            .post('/deletediscuss',{
                                discussId:this.discussId
                            })
                            .then(res => {
                            this.$message({
                                type: 'success',
                                message: '删除成功'
                            });
                            this.loadBlog();
                        })
                }).catch(() => {
                });
            }
            ,
            back() {
                this.$route.
                    push({
                    path:'/'
                })
            }
        }
    }
</script>
<style scoped>
  #blog {
    margin: 20px 5% 0 5%;
    padding: 20px;
    text-align: left;
    positon:relative
  }
  .bg{
    background: url("../assets/bg1.jpg") no-repeat;
    background-position: center;
    margin: -8px;
    padding: 0;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  #editor {
    margin: 2% 2%;
    height: 100%;
  }

  #discuss {
    margin: 15px 5% 0 5%;
  }
  #title{
    margin-top: -45px ;
  }
  #discussList {
    text-align: left;
    padding: 2% 1% 1% 3%;
  }
</style>
