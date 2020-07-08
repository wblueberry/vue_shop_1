<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域-->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="你的图挂了">
      </div>
      <!-- 登录表单区域-->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
        <!-- 用户名区域-->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <!--密码区域-->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="iconfont icon-3702mima" type="password"></el-input>
        </el-form-item>
        <!--按钮区域-->
        <el-form-item class="buttons">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 这是登录表单的数据绑定对象
      loginForm: {
        // 后面引号可以设置默认值
        username: 'admin',
        password: '123456'
      },
      // 这是表单的规则验证对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [{ required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [{ required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 点击重置按钮,重置登录表单
    resetLoginForm () {
      // console.log(this)
      this.$refs.loginFormRef.resetFields()
    },
    // 表单登录预验证
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        // console.log(valid)
        if (!valid) return 0 // 如果为false,就不提交登录请求
        const { data: res } = await this.$http.post('login', this.loginForm)
        if (res.meta.status !== 200) return this.$message.error('登录失败!')
        this.$message.success('登录成功!')
        // 1,将登录成功之后的token,保存到客户端的sessionStorage中
        //    1.1,项目中除了登录之外的其他API接口,必须在登录之后才能访问
        //    1.2,token只应在当前网站打开期间生效,所以将token保存在sessionStorage中
        // console.log(res)
        window.sessionStorage.setItem('token', res.data.token)
        // 2,通过编程式导航跳转到后台主页,路由地址是/home
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .login_container{
    background-color:#2b4b6b ;
    height:100%;
  }
  .login_box{
    width:450px;
    height:300px;
    background-color: wheat;
    border-radius: 3px;//圆角边框
    position: absolute;//绝对定位
    left: 50%;
    top:30%;
  }

  .login_box{
    transform: translate(-50%);
  }
  .avatar_box{
    height:130px;
    width:130px;
    border:1px solid lightcoral;
    background-color: wheat;
    border-radius:50%;//边框设置为圆角
    padding: 10px;//内边距
    box-shadow: 0 0 10px orangered;//加阴影
    /*头像往右移动到中间*/
    position: absolute;//绝对定位
    left: 50%;//往右边移动50%
    //再往左移动头像自身的50%,第二个参数是往上移动50%
    transform: translate(-50%,-50%);

    img{
      width:100%;
      height:100%;
      border-radius: 50%;//图片设置为圆形
      background-color: tomato;
    }
  }
  .buttons{
    display: flex;//弹性盒子
    justify-content: flex-end;
  }
.login_form{
  position: absolute;
  bottom: 0;
  width:100%;
  padding: 0 20px;
  box-sizing:border-box;
}
</style>
