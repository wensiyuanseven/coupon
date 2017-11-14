<template>
  <div id="app">
    <el-button type="primary" icon='el-icon-plus' @click="addCarType">添加车型</el-button>
    <!-- 弹出框组件开始 -->
    <div class="dialog-contant">
      <el-dialog :visible.sync='dialogVisible' title='添加车型' width='40%' top='4vh' :close-on-click-modal="false">
        <el-form label-position="right" label-width="140px" size="small">
          <el-form-item label="车型名称：">
            <el-input placeholder="控制在25个字以内"></el-input>
          </el-form-item>
          <el-form-item label="车型唯一标示：">
            <el-input placeholder="控制在30个字以内，英文+数字"></el-input>
          </el-form-item>
          <el-form-item label="车型年租收费：">
            <el-input placeholder="车型年租收费"></el-input>
          </el-form-item>
          <el-form-item label="车型半年租收费：">
            <el-input placeholder="车型半年租收费"></el-input>
          </el-form-item>
          <el-form-item label="车型月租收费：">
            <el-input placeholder="车型月租收费"></el-input>
          </el-form-item>
          <el-form-item label="车型日租收费：">
            <el-input placeholder="车型日租收费"></el-input>
          </el-form-item>
          <el-form-item label="车型停时分钟收费：">
            <el-input placeholder="车型停时分钟收费"></el-input>
          </el-form-item>
          <el-form-item label="车型开时分钟收费：">
            <el-input placeholder="车型开时分钟收费"></el-input>
          </el-form-item>
          <el-form-item label="车型月租押金：">
            <el-input placeholder="车型月租押金"></el-input>
          </el-form-item>
          <el-form-item label="车型半年租押金：">
            <el-input placeholder="车型半年租押金"></el-input>
          </el-form-item>
          <el-form-item label="车型年租押金：">
            <el-input placeholder="车型年租押金"></el-input>
          </el-form-item>
          <el-form-item label="长租预约定金：">
            <el-input placeholder="长租预约定金"></el-input>
          </el-form-item>
          <el-form-item label="车型图片：">
            <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/">
              <el-button type="small">选择图片<i class="el-icon-upload el-icon--right"></i></el-button>
              <span slot="tip" class="el-upload__tip">未选择任何文件</span>
            </el-upload>
          </el-form-item>
          <el-form-item label="日封顶费用：">
            <el-input placeholder="日封顶费用"></el-input>
          </el-form-item>
          <el-form-item label="起步价：">
            <el-input placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="车型备注信息：">
            <el-input placeholder="车型备注信息"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" >保存</el-button>
      </el-dialog>
    </div>
    <!-- 弹出框组件结束 -->
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      dialogVisible: true
    }
  },
  methods: {
    addCarType () {
      this.dialogVisible = true
    }
  }
}
</script>

<style>
.dialog-contant {
  white-space: nowrap;
}
</style>
