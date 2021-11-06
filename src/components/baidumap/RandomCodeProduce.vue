<template>
  <div class="randomcodeuse">
    <el-form
      class="login-form"
      status-icon
      :rules="loginRules"
      ref="loginForm"
      :model="loginForm"
      label-width="0"
    >
      <!-- 随机验证码 输入框 -->
      <el-form-item prop="verifycode">
        <el-input
          v-model="loginForm.verifycode"
          placeholder="请输入验证码"
          class="identifyinput"
        ></el-input>
      </el-form-item>
      <!-- 随机验证码 -->
      <el-form-item>
        <div class="identifybox">
          <div @click="refreshCode">
            <s-identify :identifyCode="identifyCode"></s-identify>
          </div>
          <!-- 刷新验证码 -->
          <el-button
            @click="refreshCode"
            type='text'
            class="textbtn"
          >看不清，换一张</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import SIdentify from './SIdentify.vue'
export default {
  name: 'RandomCodeProduce',
  data() {
    // 自定义验证规则：验证码验证规则
    const validateVerifycode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'))
      } else if (value !== this.identifyCode) {
        console.log('validateVerifycode:', value)
        callback(new Error('验证码不正确'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        verifycode: ''
      },
      identifyCodes: '1234567890',
      identifyCode: '',
      loginRules: {
        verifycode: [
          { required: true, trigger: 'blur', validator: validateVerifycode }
        ]
      }
    }
  },
  components: {
    // 注册绘制随机验证码的组件
    SIdentify
  },
  created() { },
  mounted() {
    // 验证码初始化
    this.identifyCode = ''
    this.makeCode(this.identifyCodes, 4)
  },
  computed: {},
  methods: {
    // 生成随机数
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    // 切换验证码
    refreshCode() {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    // 生成四位随机验证码
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
      }
    }
  }
}
</script>

<style scoped>
.randomcodeuse {
  width: 60%;
  margin: auto;
  display: flex;
  align-items: center;
}
.identifybox {
  display: flex;
  justify-content: space-between;
  margin-top: 7px;
}
.iconstyle {
  color: #409eff;
}
</style>
