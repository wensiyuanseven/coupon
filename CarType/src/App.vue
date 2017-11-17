<template>
  <div id="app">
    <el-button type="primary" icon='el-icon-plus' @click="addCarType">添加车型</el-button>
    <!-- 弹出框组件开始 -->
    <div class="dialog-contant">
      <el-dialog :visible.sync='dialogVisible' title='添加车型' width='40%' top='3vh' :close-on-click-modal="false" v-if="dialogVisible">
        <el-form label-position="right" label-width="140px" size="small" :model="checkFields" ref="checkFields" :rules="rules">
          <el-form-item label="车型名称：" prop="carTypeName">
            <!-- 一定要把.number去掉 -->
            <el-input placeholder="控制在25个字以内" type="num" v-model="checkFields.carTypeName" :maxlength="25"></el-input>
          </el-form-item>
          <el-form-item label="车型唯一标示：" prop="onlyIdentifying">
            <el-input placeholder="控制在30个字以内，英文，数字" v-model="checkFields.onlyIdentifying" :maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="车型座位数：" prop="seatAmoun">
            <el-input placeholder="车型座位数" v-model="checkFields.seatAmoun" :maxlength='2'></el-input>
          </el-form-item>
          <el-form-item label="车型年租收费：" prop='yearRent'>
            <el-input placeholder="车型年租收费" v-model='checkFields.yearRent'></el-input>
          </el-form-item>
          <el-form-item label="车型半年租收费：" prop='halfYearRent'>
            <el-input placeholder="车型半年租收费" v-model='checkFields.halfYearRent'></el-input>
          </el-form-item>
          <el-form-item label="车型月租收费：" prop='monthlyRent'>
            <el-input placeholder="车型月租收费" v-model='checkFields.monthlyRent'></el-input>
          </el-form-item>
          <el-form-item label="车型日租收费：" prop='dailyRent'>
            <el-input placeholder="车型日租收费" v-model='checkFields.dailyRent'></el-input>
          </el-form-item>
          <el-form-item label="车型停时分钟收费：" prop='stopMinuteRent'>
            <el-input placeholder="车型停时分钟收费" v-model='checkFields.stopMinuteRent'></el-input>
          </el-form-item>
          <el-form-item label="车型开时分钟收费：" prop='startMinuteRent'>
            <el-input placeholder="车型开时分钟收费" v-model='checkFields.startMinuteRent'></el-input>
          </el-form-item>
          <el-form-item label="车型月租押金：" prop='rentDeposit'>
            <el-input placeholder="车型月租押金" v-model="checkFields.rentDeposit"></el-input>
          </el-form-item>
          <el-form-item label="车型半年租押金：" prop='halfDeposit'>
            <el-input placeholder="车型半年租押金" v-model="checkFields.halfDeposit"></el-input>
          </el-form-item>
          <el-form-item label="车型年租押金：" prop='yearDeposit'>
            <el-input placeholder="车型年租押金" v-model="checkFields.yearDeposit"></el-input>
          </el-form-item>
          <el-form-item label="长租预约定金：" prop='reservationDeposit'>
            <el-input placeholder="长租预约定金" v-model='checkFields.reservationDeposit'></el-input>
          </el-form-item>
          <el-form-item label="车型图片：">
            <!-- todo后台需要给服务器链接 -->
            <el-upload class="upload" action="https://jsonplaceholder.typicode.com/posts/" :file-list="fileList" :on-progress='onUpload' :on-success='uploadSuccessful' :on-error='uploadError' :before-upload='beforeUpload' :on-exceed="handleExceed">
              <el-button type="small" class="upload-botton">选择图片 <i class="el-icon-upload el-icon--right"></i></el-button>
              <span slot="tip" class="el-upload__tip" v-show="noSelectFile" :class="{'no-select-error-color':noSelectErrorColor}">未选择任何文件</span>
            </el-upload>
          </el-form-item>
          <el-form-item label="日封顶费用：" prop='dataMaxMoney'>
            <el-input placeholder="日封顶费用" v-model="checkFields.dataMaxMoney"></el-input>
          </el-form-item>
          <el-form-item label="起步价：" prop='startMoney'>
            <el-input placeholder="起步价" v-model="checkFields.startMoney"></el-input>
          </el-form-item>
          <el-form-item label="车型备注信息：">
            <el-input placeholder="车型备注信息" v-model="checkFields.remark"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelAddTypeCar">取 消</el-button>
          <!-- dialogVisible = false -->
          <el-button type="primary" @click="submitForm">提交</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 弹出框组件结束 -->
    <!-- 表格开始 -->
    <el-table :data="tableData" border style="width: 100%;text-align:center" class="el-table" size="mini" v-loading='loading'>
      <el-table-column prop="id" label="ID" class="el-table-column" header-align="center" min-width="40"></el-table-column>
      <el-table-column prop="carTypeName" label="名称" header-align="center" min-width="100"></el-table-column>
      <el-table-column prop="yearRent" label="年租收费" header-align="center"></el-table-column>
      <el-table-column prop="halfYearRent" label="半年租收费" header-align="center" min-width="100"></el-table-column>
      <el-table-column prop="monthlyRent" label="月租收费" header-align="center"></el-table-column>
      <el-table-column prop="dailyRent" label="日租收费" header-align="center"></el-table-column>
      <el-table-column prop="stopMinuteRent" label="停时分钟收费" header-align="center" min-width="100"></el-table-column>
      <el-table-column prop="startMinuteRent" label="开时分钟收费" header-align="center" min-width="100"></el-table-column>
      <el-table-column prop="dataMaxMoney" label="日封顶费用" header-align="center" min-width="95"></el-table-column>
      <el-table-column prop="startMoney" label="起步价" header-align="center"></el-table-column>
      <el-table-column prop="overtime" label="刷卡超时(秒)" header-align="center" min-width="100"></el-table-column>
      <el-table-column prop="statuePeriod" label="状态上报周期(秒)" header-align="center" min-width="120"></el-table-column>
      <el-table-column prop="dataPeriod" label="数据上报周期(秒)" header-align="center" min-width="120"></el-table-column>
      <el-table-column prop="minLectricity" label="soc下限亏电阀值" header-align="center" min-width="120"></el-table-column>
      <el-table-column prop="maxLectricity" label="soc上限亏电阀值" header-align="center" min-width="150"></el-table-column>
      <el-table-column prop="remark" label="备注" header-align="center" min-width="50"></el-table-column>
      <el-table-column prop="addTime" label="添加时间" header-align="center" min-width="140"></el-table-column>
      <el-table-column label="操作" header-align="center" min-width="230">
        <template slot-scope="scope">
                   <el-button size="mini"  @click="editList(scope.row)">编辑</el-button>
                  <el-button  size="mini"  type="danger" @click="deleteItem(scope.$index, scope.row)">删除</el-button>
                  <el-button  size="mini"  type="success" @click="detailsItem(scope.row)">详情</el-button>
</template>
      </el-table-column>
    </el-table>
    <!-- 表格结束 -->
    <!-- 分页开始 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="paging.currentPage"
      :page-sizes="paging.showRows"
      layout="total, sizes, prev, pager, next, jumper"
      :total="paging.total">
    </el-pagination>
    <!-- 分页结束 -->
    <!-- 日期开始 -->
    <div class="search-block">
      <span>添加日期范围</span>
      <div class="search-data">
          <el-date-picker
            v-model="dataValue1"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions">
        </el-date-picker>
        <el-date-picker
          v-model="dataValue2"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions">
        </el-date-picker>
      </div>
        <!-- 搜索开始 -->
    <div class="search">
     <div class="search-input">
        <el-input placeholder="请输入内容" v-model="searchKeyword" class="input-with-select" ></el-input>
      </div>
      <div class="search-botton">
        <el-button type="primary" icon="el-icon-search"  @click="search" :disabled="disabledBotton">搜索</el-button>
      </div>
    </div>
    <!-- 搜索结束 -->
  </div>
    <!-- 日期结束 -->
    <!-- 车型详情对话框 开始-->
     <el-dialog :visible.sync='detailsItemVisible' title='车型详情' width='40%' top='3vh' >
       <div class="content-table">
       <table id="customers"> 
                  <tr>
                  <td>ID：</td>
                  <td>1</td>
                  </tr>
                  <tr>
                  <td>车型名称：</td>
                  <td>2016款知豆D1</td>
                  </tr>
                  <tr>
                  <td>车型年租收费：	</td>
                  <td>11400.00</td>                
                  </tr>
                  <tr >
                  <td>车型半年租收费：</td>
                  <td>1200.00</td>         
                  </tr>
                  <tr>
                  <td>车型月租收费：</td>
                  <td>1200.00</td> 
                  </tr>
                  <tr >
                  <td>车型日租收费：</td>
                  <td>100.00</td>
                  </tr>
                     <tr >
                  <td>车型停时分钟收费：</td>
                  <td>100.00</td>
                  </tr>
                     <tr >
                  <td>车型开时分钟收费：</td>
                  <td>100.00</td>
                  </tr>
                     <tr >
                  <td>车型月租押金：</td>
                  <td>100.00</td>
                  </tr>
                     <tr >
                  <td>车型半年租押金：</td>
                  <td>100.00</td>
                  </tr>
                     <tr >
                  <td>车型年租押金：</td>
                  <td>100.00</td>
                  </tr>
                     <tr >
                  <td>长租预约定金：</td>
                  <td>100.00</td>
                  </tr>
                     <tr >
                  <td>车型图片：	</td>
                  <td><img src="./assets/LOGO@2x.png"/></td>
                  </tr>
                     <tr >
                  <td>日封顶费用：	</td>
                  <td>100.00</td>
                  </tr>
                     <tr >
                  <td>车型日租收费：</td>
                  <td>100.00</td>
                  </tr>
                     <tr>
                  <td>起步价：</td>
                  <td>100.00</td>
                  </tr>
                     <tr>
                  <td>车型备注信息：	</td>
                  <td>100.00</td>
                  </tr>
                     <tr>
                  <td>刷卡超时时间：</td>
                  <td>100.00</td>
                  </tr>
                     <tr>
                  <td>车辆状态上报周期：</td>
                  <td>100.00</td>
                  </tr>
                     <tr>
                  <td>车身数据上报周期：</td>
                  <td>100.00</td>
                  </tr>
                      <tr>
                  <td>soc下限亏电阀值：	</td>
                  <td>100.00</td>
                  </tr>
                      <tr>
                  <td>SOC上限亏电阀值：</td>
                  <td>100.00</td>
                  </tr>
                        <tr>
                  <td>创建时间：</td>
                  <td>100.00</td>
                  </tr>

</table>
       </div>
     </el-dialog>
    <!--  车型详情对话框 结束-->
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted () {
    setTimeout(() => {
      this.loading = false
      // todo 第一次请求
    }, 1000)
  },
  data () {
    // 自定义验证规则
    let publicRulesMoney = (rule, value, callback) => {
      !value ? callback(new Error('不能为空')) : !Number(value) ? callback(new Error('请输入正确的金额')) : callback()
    }
    return {
      loading: true,
      searchKeyword: '', // 搜索
      disabledBotton: true,
      // 分页
      paging: {
        showRows: [10, 20, 30], //  设置的数量
        maxperpage: 0, // 每页请求的数量
        total: 300, // 后台获取数据
        currentPage: 1 // 当前页数  后台获取到的第一条页数
      },
      // 时间选择器
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },
      dataValue1: '', // 日期选择器
      dataValue2: '', // 日期选择器2
      dialogVisible: false, // isible 添加提示状态
      detailsItemVisible: false,
      rules: {
        carTypeName: [{
          required: true,
          message: '不能为空'
        }],
        onlyIdentifying: [{
          required: true,
          message: '请输入车型唯一标示'
        },
        {
          pattern: /^[a-zA-Z0-9]*$/,
          message: '请输入英文或数字',
          trigger: 'change,blur'
        }],
        seatAmoun: [{
          required: true,
          message: '不能为空'
        },
        {
          pattern: /^[0-9]*$/,
          message: '车型座位数必须为数字',
          trigger: 'change,blur'
        }
        ],
        yearRent: [{
          validator: publicRulesMoney,
          trigger: 'change'
        }],
        halfYearRent: [{
          validator: publicRulesMoney,
          trigger: 'change,blur'
        }],
        monthlyRent: [{
          validator: publicRulesMoney,
          trigger: 'change,blur'
        }],
        dailyRent: [{
          validator: publicRulesMoney,
          trigger: 'change,blur'
        }],
        stopMinuteRent: [{
          validator: publicRulesMoney,
          trigger: 'change,blur'
        }],
        startMinuteRent: [{
          validator: publicRulesMoney,
          trigger: 'change,blur'
        }],
        rentDeposit: [{
          validator: publicRulesMoney,
          trigger: 'change,blur'
        }],
        halfDeposit: [{
          validator: publicRulesMoney,
          trigger: 'change,blur'
        }],
        yearDeposit: [{
          validator: publicRulesMoney,
          trigger: 'change,blur'
        }],
        reservationDeposit: [{
          validator: publicRulesMoney,
          trigger: 'change,blur'
        }],
        dataMaxMoney: [{
          validator: publicRulesMoney,
          trigger: 'change,blur'
        }],
        startMoney: [{
          validator: publicRulesMoney,
          trigger: 'change,blur'
        }]
      },
      checkFields: {
        carTypeName: 'sss',
        onlyIdentifying: 'qasq',
        seatAmoun: null,
        yearRent: null,
        halfYearRent: null,
        monthlyRent: null,
        dailyRent: null,
        stopMinuteRent: null,
        startMinuteRent: null,
        rentDeposit: null,
        halfDeposit: null,
        yearDeposit: null,
        reservationDeposit: null,
        dataMaxMoney: null,
        startMoney: null,
        remark: ''
      },
      // 文件上传列表
      fileList: [{
        name: '',
        url: ''
      }],
      noSelectFile: false,
      noSelectErrorColor: false,
      flag: true,
      tableData: [{
        id: '1',
        carTypeName: '海马爱尚EV',
        yearRent: '14400.00',
        halfYearRent: '8800.00',
        monthlyRent: '1880.00',
        dailyRent: '1880.00',
        stopMinuteRent: '0.10',
        startMinuteRent: '0.50',
        dataMaxMoney: '118.00',
        startMoney: '3.00',
        overtime: '180',
        statuePeriod: '30',
        dataPeriod: '120',
        minLectricity: '30',
        maxLectricity: '40',
        remark: '...',
        addTime: '2017-07-06 17:40:52',
        address: ''
      }]
    }
  },
  watch: {
    searchKeyword (newsearch) {
      newsearch ? this.disabledBotton = false : this.disabledBotton = true
    }
  },
  methods: {
    // everyCellClick (a, b, c, d) {
    //   console.log(a)
    // },
    // 搜索
    search () {
      // tudo 发送请求
    },
    // 每一页的最大数 改变时会触发
    handleSizeChange (maxperpage) {
      this.paging.maxperpage = maxperpage
      console.log(`每页 ${this.paging.maxperpage} 条---第${this.paging.currentPage}页`)
      // todo 发送ajax 把this.paging.maxperpage  当前页数  传过去
    },
    // pageSize 改变时会触发
    handleCurrentChange (currentpage) {
      this.paging.currentPage = currentpage
      console.log(`当前页: ${this.paging.currentPage}`)
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 200)
      // todu 发送ajax 每次改变 把当前页数传过去
      // $ajax(this.paging.currentPage ){ }
    },
    // 编辑车型列表
    editList (row) {
      // todo 获取到列表id
      this.dialogVisible = true
      // todu
      // 复制对象
      this.checkFields = Object.assign({}, row)
      // todo  发送ajax 获取数据 渲染到输入框
    },
    // 删除车型列表
    deleteItem (index, row) {
      console.log(row)
      // todo 获取item的id
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          // todo 发送ajax
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 查看详情
    detailsItem () {
      this.detailsItemVisible = true
    },
    // 添加车型按钮
    addCarType () {
      this.dialogVisible = true
      // 把所有状态滞空
      // this.checkFields.carTypeName = ''
      // this.checkFields.yearRent = ''
      // this.checkFields.halfYearRent = ''
      // this.checkFields.monthlyRent = ''
      // this.checkFields.dailyRent = ''
      // this.checkFields.stopMinuteRent = ''
      // this.checkFields.startMinuteRent = ''
      // this.checkFields.rentDeposit = ''
      // this.checkFields.halfDeposit = ''
      // this.checkFields.yearDeposit = ''
      // this.checkFields.reservationDeposit = ''
      // this.checkFields.dataMaxMoney = ''
      // this.checkFields.startMoney = ''
      // tudu循环之间的区别
      for (var key in this.checkFields) {
        // console.log(this.checkFields[key] = 'wdkjw')
        this.checkFields[key] = null
      }
    },
    beforeUpload (fileList) {
      console.log(fileList)
      this.noSelectFile = false
      this.flag = false
    },
    // 上传过程中
    onUpload () {
      this.noSelectFile = false
      this.flag = false
      // 上传过程中禁止点击
    },
    // 文件上传成功
    uploadSuccessful (response, file, fileList) {
      console.log(fileList)
      this.noSelectFile = false
      this.flag = true
    },
    // 文件上传失败
    uploadError (response, file, fileList) {
      console.log(fileList)
      this.flag = true
    },
    // 超过上传文件最大限制
    handleExceed () { },
    // 取消添加车型
    cancelAddTypeCar () {
      this.$refs.checkFields.resetFields()
      this.dialogVisible = false
      this.$message({
        type: 'info',
        message: '已取消添加'
      })
    },
    // 提交字段
    submitForm () {
      this.$refs.checkFields.validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
        // if (valid) {
        //   alert('验证通过')
        // } else {
        //   alert('验证失败')
        // }
        // if (!this.fileList[0].name.length) {
        //   if (this.flag) {
        //     this.noSelectFile = true
        //     this.noSelectErrorColor = true
        //   }
        //   return
        // }
        // if (valid) {
        //   this.$confirm('确认要提交吗?', '提示', {
        //     confirmButtonText: '确定',
        //     cancelButtonText: '取消',
        //     type: 'warning'
        //   }).then(() => {
        //     this.$message({
        //       type: 'success',
        //       message: '提交成功!'
        //     })
        //   }).catch(() => {
        //     this.$message({
        //       type: 'info',
        //       message: '已取消提交'
        //     })
        //   })
        // } else {
        //   return false
        // }
      })
    }
  }
}
</script>

<style lang="scss">
body {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
.dialog-contant {
  white-space: nowrap;
}
.no-select-error-color {
  color: red;
}
.content-table {
  #customers {
    width: 100%; // background: #787878;
    margin: 0 auto;
    text-align: center;
    border-collapse: collapse; //合并为一个边框
    tr {
      &:hover {
        background: #fcfdff;
      }
      td {
        padding-top: 5px;
        padding-bottom: 5px;
        border: 1px solid #e6ebf5;
        &:first-child {
          width: 150px;
          font-weight: 600;
          text-align: right;
          white-space: nowrap;
        }
        &:last-child {
          text-align: left;
          padding-left: 10px;
        }
      }
    }
  }
} // 搜索区块
.search-block {
  // 日期
  .search-data {
    display: inline;
  } // 搜索
  .search {
    //因为input的宽度为100% 撑不起这一行 它会另起一行
    // inline 不能改变宽度  inline-block可以改变宽度
    display: inline-block;
    .search-input {
      display: inherit;
    }
    .search-botton {
      display: inherit;
    }
  }
} // 修改默认样式
.el-dialog__body {
  padding: 0px 20px;
}
.el-dialog__footer {
  padding: 0px 15px 15px;
}
.upload {
  .upload-botton {
    display: inline-block;
    vertical-align: middle;
  } // 上传图片
  .el-upload-list {
    display: inline-block;
  }
  .el-upload-list__item:first-child {
    margin-top: 0px;
  }
  .el-upload-list__item {
    display: inline-flex;
    align-items: center;
  }
}
</style>

