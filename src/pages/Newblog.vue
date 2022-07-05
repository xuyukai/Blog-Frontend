<template>
  <div id="newBlog">
    <el-card style="height: 770px;">
      <el-row>
        <el-input
          style="margin-right:38.62%;width:44%"
          type="text"
          placeholder="请输入标题"
          v-model="title"
          maxlength="100"
          show-word-limit/>
        <el-select
          v-model="selectedtag"
          placeholder="请选择文章标签">
          <el-option
            v-for="item in tags"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-row>
      <br/><br/>
      <mavon-editor :toolbars="toolbars" style="height: 660px" ref=md   @save="save()" v-model="body" id="editor"
                    placeholder="## Start"/>
      <!-- 以下是预览模式配置 -->
      <!--:toolbarsFlag="false"  :subfield="false" defaultOpen="preview"-->

    </el-card>

      <el-button  type="primary" plain class="el-icon-document-checked" @click="sendBlog">
        发布
      </el-button>


  </div>
</template>

<script>
    export default {
        name: "Newblog",
        data(){
            return {
                toolbars: {
                    bold: true, // 粗体
                    italic: true, // 斜体
                    header: true, // 标题
                    underline: true, // 下划线
                    strikethrough: true, // 中划线
                    mark: false, // 标记
                    superscript: false, // 上角标
                    subscript: false, // 下角标
                    quote: true, // 引用
                    ol: true, // 有序列表
                    ul: true, // 无序列表
                    link: true, // 链接
                    imagelink: false, // 图片链接
                    code: true, // code
                    table: true, // 表格
                    fullscreen: true, // 全屏编辑
                    readmodel: false, // 沉浸式阅读
                    htmlcode: true, // 展示html源码
                    help: false, // 帮助
                    /* 1.3.5 */
                    undo: true, // 上一步
                    redo: false, // 下一步
                    trash: false, // 清空
                    save: false, // 保存（触发events中的save事件）
                    /* 1.4.2 */
                    navigation: false, // 导航目录
                    /* 2.1.8 */
                    alignleft: true, // 左对齐
                    aligncenter: true, // 居中
                    alignright: true, // 右对齐
                    /* 2.2.1 */
                    subfield: true, // 单双栏模式
                    preview: true, // 预览
                    boxShadow: false
                },
                title: '',
                body: '',
                tags: [],
                checkboxGroup: [],
                img_file: {},
                selectedtag:''
            }
        },
        methods:{
            sendBlog(){
                if (this.title.length <= 0) {
                    this.$message({
                        type: 'error',
                        message: '缺少标题！'
                    });
                    return;
                }
                if (this.body.length <= 0) {
                    this.$message({
                        type: 'error',
                        message: '缺少内容！'
                    });
                    return;
                }
                if (this.selectedtag ==='') {
                    this.$message({
                        type: 'error',
                        message: '请选择标签！'
                    });
                    return;
                }
                this.$axios
                    .post('/savearticle',{
                        title: this.title,
                        authorName:this.$store.state.name,
                        label: this.selectedtag,
                        context: this.body
                    })
                    .then(successResponse=>{
                        this.$alert('发布成功','提示',{
                            confirmButtonText: '确定',
                            callback: action => {
                                if (action == 'confirm') {
                                    scrollTo(0, 0);
                                    history.back()
                                }
                            }
                        })
                    })
            },
            save(){
                if (this.title.length > 0 && this.body.length > 0) {
                    var element =document.createElement('a');
                    element.setAttribute('href','data:text/plain;charset=utf-8'+encodeURIComponent(this.body + '\n' + new Date().toLocaleString()));
                    element.setAttribute('dowload',this.title);

                    element.style.display='none';
                    document.body.appendChild(element);

                    element.click();

                    document.body.removeChild(element);
                }
            }
        },
        created() {
            this.tags=[{value:1,label:'技术剖析'},{value:2,label:'业界新闻'},{value:3,label:'经验随笔'},{value:4,label:'软件工程'},{value:5,label:'工具推荐'}]
        }
    }
</script>

<style scoped>
  #newBlog {
    margin: 20px 5% 0 5%;
  }

  #tags {
    margin-top: 1%;
  }

  #editor {
    height: 600px;
  }

  .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #67C23A;
  }

  .el-checkbox.is-bordered.is-checked {
    border-color: #67C23A;
  }

  .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #67C23A;
    border-color: #67C23A;
  }
</style>
