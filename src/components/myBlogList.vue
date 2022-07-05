<template>
  <div>
    <div>
      <blogCard v-for="blog in blogList" :key="blog.articleId" :id="blog.articleId" :title="blog.title"
                :body="blog.context"
                :time="blog.date"
                :discussCount="blog.commentNumber"
                :tag="blog.label"
                :name="blog.authorName"/>
    </div>

    <el-card class="box-card" style="margin: 20% " v-if="blogList.length <= 0">
      <div >
        还没发布过博客
      </div>
    </el-card>


    <div>
      <el-pagination
        :pager-count="5"
        :page-size="pageSize"
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="currentChange"
        :current-page="currentPage"
        @prev-click="currentPage=currentPage-1"
        @next-click="currentPage=currentPage+1">
      </el-pagination>
    </div>
  </div>
</template>
<script>
    import blogCard from '@/components/blogcard'

    export default {
        name: 'myBlogList',
        components: {blogCard},
        data() {
            return {
                total: 0,        //数据总数
                blogList: [],   //当前页数据
                pageSize: 5,    //每页显示数量
                currentPage: 1   //当前页数
            }
        },
        created() {
            this.loadBlog();
        },
        methods: {
            currentChange(currentPage) { //页码更改事件处理
                this.currentPage = currentPage;
                this.loadBlog();
                scrollTo(0, 0);
            },
            loadBlog() { //加载数据
                this.$axios
                    .post('/findmyblog',{
                        page: this.currentPage,
                        keyword: this.$store.state.name
                    })
                    .then(successResponse=>{
                        this.blogList = successResponse.data.data;
                        this.total = successResponse.data.number;
                    })
            }
        }
    }
</script>
<style scoped>
  #myBlogList {
    margin-top: -13px;
  }
</style>
