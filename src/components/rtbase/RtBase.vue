<script>
import config from 'config'
import PanelWrapper from '../../moduleloader/panelWrapper/PanelWrapper'
import less from 'less'
const USER_LOGOUT = 'USER_LOGOUT'
export default {
  name: 'RtBase',
  components: { PanelWrapper },
  data() {
    return {
      // LOGO地址
      logoUrl: config.system.logoUrl,
      // 系统标题
      title: config.system.title,
      cityList: [
        {
          value: '#515a6e',
          label: '红色'
        },
        {
          value: '#459aee',
          label: '黑色'
        }
      ],
      model1: '#459aee'
    }
  },
  created() {
  },
  watch: {
    model1: {
      handler(nvalue, ovalue) {
        less.modifyVars({ // 调用 `less.modifyVars` 方法来改变变量值'
          '@primaryColor': nvalue
        })
          .then(() => {
            console.log('修改成功')
          })
      },
      immediate: true
    }
  },
  methods: {
    // 退出登录
    click() {
      this.$Modal.confirm({
        title: '退出',
        content: '<p>确定退出系统吗?</P>',
        onOk: () => {
          this.$store.dispatch(USER_LOGOUT).then(() => {
            this.$router.replace('/login')
          })
        }
      })
    }
  }
}
</script>
<template>
  <div class="RtBase">
    <header>
      <div class="left">
        <img
          :src="logoUrl"
          alt="logo"
        />
        <span>{{ title }}</span>
      </div>
      <div class="right">
        <!--网页切换主题-->
        <Select
          v-model="model1"
          style="width:100px;margin-right:20px;"
        >
          <Option
            v-for="item in cityList"
            :value="item.value"
            :key="item.value"
          >{{ item.label }}</Option>
        </Select>
        <!-- <UserInfo />
        <Icon
          type="md-log-out"
          size="24"
          title="退出"
          @click.native="click"
        ></Icon> -->
      </div>
    </header>
    <main>
      <PanelWrapper>
        <router-view></router-view>
      </PanelWrapper>
      <!-- <img src="../assets/logo.png" /> -->
    </main>
  </div>
</template>

<style lang="less" scoped>
.RtBase {
  width: 100%;
  height: 100%;
  header {
    display: flex;
    height: 50px;
    color: #fff;
    background-color: #459aee;

    .left {
      display: flex;
      flex: 1;

      img {
        height: 30px;
        margin: 10px;
      }
      span {
        line-height: 50px;
        font-size: 24px;
        margin: 0 80px 0 6px;
      }
    }
    .right {
      display: flex;
      align-items: center;

      .k-icon {
        cursor: pointer;
        margin-right: 36px;
      }
    }
  }
  main {
    width: 100%;
    height: calc(~"100vh - 50px");
  }
  /* margin-top: 60px; */
}
</style>
