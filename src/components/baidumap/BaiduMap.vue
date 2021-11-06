<script>
import SIdentify from './SIdentify.vue'
export default {
  name: 'BaiduMap',
  components: { SIdentify },
  data() {
    return {
      value1: 0,
      value2: 'a',
      option1: [
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 },
      ],
      option2: [
        { text: '默认排序', value: 'a' },
        { text: '好评排序', value: 'b' },
        { text: '销量排序', value: 'c' },
      ],
      list: [],
      loading: false,
      finished: false,
    }
  },
  mounted() {
    this.onLoad()
  },
  methods: {
    reset: function () {
      for (let key in this.formLabelAlign) {
        this.formLabelAlign[key] = ''
      }
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push('学生-' + this.list.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
  }
}
</script>
<template>
  <div id="map">
    <van-sticky>
      <van-nav-bar
        title="课后服务系统"
        left-text="返回"
        left-arrow
      />
    </van-sticky>
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
    >
      <van-form
        @submit="onSubmit"
        label-width="40px"
      >
        <div class="row">
          <van-field
            v-model="username"
            name="用户名"
            label="班级"
            placeholder="用户名"
          >
            <template #input>
              <van-dropdown-menu>
                <van-dropdown-item
                  v-model="value1"
                  :options="option1"
                />
              </van-dropdown-menu>
            </template>
          </van-field>
          <van-field
            v-model="password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            border
          ></van-field>
        </div>
        <div class="row">
          <van-field
            v-model="username"
            name="用户名"
            label="班级"
            placeholder="用户名"
          >
            <template #input>
              <van-dropdown-menu>
                <van-dropdown-item
                  v-model="value1"
                  :options="option1"
                />
              </van-dropdown-menu>
            </template>
          </van-field>
          <van-field
            v-model="username"
            name="用户名"
            label="班级"
            placeholder="用户名"
            border
          >
            <template #input>
              <van-dropdown-menu>
                <van-dropdown-item
                  v-model="value1"
                  :options="option1"
                />
              </van-dropdown-menu>
            </template>
          </van-field>
        </div>
      </van-form>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-skeleton
          v-for="item in list"
          :key="item"
          :title="item"
          title
          avatar
          :row="3"
        />
        <!-- <van-cell
          v-for="item in list"
          :key="item"
          :title="item"
          value="待审核"
          label="描述信息"
          is-link
        >
          <template #title>
            <img style="width:30px;height:30px" />
            <van-tag type="danger">标签</van-tag>
            <span class="custom-title">单元格</span>
          </template>
        </van-cell> -->
        <!-- <van-cell
          center
          v-for="item in list"
          :key="item"
          :title="item"
          value="内容"
          label="描述信息"
          is-link
          icon="shop-o"
        /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<style lang="less" scoped>
#map {
  width: 100%;
  .row {
    display: flex;
    justify-content: space-around;
    flex-direction: row;
  }
}
/deep/ .van-dropdown-menu__bar {
  // height: 0px !important;
  background-color: none;
  box-shadow: none;
}
/deep/ .van-cell {
  align-items: center;
}
/deep/ .van-cell:nth-child(even) {
  border-bottom: 1px solid #f5f6f7;
}
// /deep/.van-cell:not(:last-child)::after {
//   -webkit-transform: scaleY(1);
//   transform: scaleY(1);
//   top: 0;
// }
</style>
