<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        to="/search"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- /导航栏 -->
    <!-- 频道列表 -->
    <!--
        animated 滑动的动画
        border 底边框线
        swipeable 开启左右手势滑动
-->
    <van-tabs class="channel-tabs" v-model="active" swipeable animated border>
      <van-tab
        v-for="channel in channels"
        :key="channel.id"
        :title="channel.name"
      >
        <article-list :channel="channel"></article-list>
      </van-tab>
      >

      <!-- 右侧自定义内容 -->
      <!-- 占位元素 -->
      <template>
        <div class="placeholder"></div>
      </template>
      <!-- 右侧按钮 -->
      <template #nav-right>
        <div class="hamburger-btn" @click="isChannelEditShow = true">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
      </template>
    </van-tabs>
    <!-- /频道列表 -->
    <!-- 频道编辑弹出框 -->
    <van-popup
      v-model="isChannelEditShow"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left"
    >
      <channel-edit
        :my-channels="channels"
        :active="active"
        @updateActive="onUpdateActive"
      ></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list.vue'
import ChannelEdit from './components/channel-edit'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  name: 'HomePage',
  components: { ArticleList, ChannelEdit },
  props: {},
  data() {
    return {
      active: 0,
      channels: [], // 用户频道列表
      isChannelEditShow: false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created() {
    // this.loadChannels()
    if (this.user) {
      // 登录
      this.loadChannels()
    } else {
      // 未登录
      const localChannels = getItem('TOUTIAO')
      if (localChannels) {
        // 有本地数据
        this.channels = localChannels
      } else {
        // 没有本地数据
        this.loadChannels()
      }
    }
  },
  mounted() {},
  methods: {
    async loadChannels() {
      try {
        const { data } = await getUserChannels()
        // console.log(data)
        this.channels = data.data.channels
      } catch (err) {
        console.log('获取频道数据失败', err)
        this.$toast('获取频道数据失败')
      }
    },
    onUpdateActive(index, isShow) {
      this.active = index
      this.isChannelEditShow = isShow
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  // tabs 标签导航也设置为固定定位
  /deep/ .van-tabs__wrap {
    position: fixed;
    top: 92px;
    z-index: 1;
    left: 0;
    right: 0;
    height: 82px;
  }
  /deep/ .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
  /deep/ .channel-tabs {
    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      font-size: 30px;
      color: #777777;
    }

    .van-tab--active {
      color: #333333;
    }

    .van-tabs__nav {
      padding-bottom: 0;
    }

    .van-tabs__line {
      bottom: 8px;
      width: 31px !important;
      height: 6px;
      background-color: #3296fa;
    }

    .placeholder {
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }

    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      background-color: rgba(255, 255, 255, 0.902);
      i.toutiao {
        font-size: 33px;
      }
      &:before {
        content: '';
        position: absolute;
        left: 0;
        width: 1px;
        height: 58px;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
}
</style>
