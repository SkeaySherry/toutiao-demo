<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        class="edit-btn"
        type="danger"
        plain
        round
        size="mini"
        @click="isEdit = !isEdit"
      >
        {{ isEdit ? '完成' : '编辑' }}
      </van-button>
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in myChannels"
        :key="index"
        @click="onChannelClick(channel, index)"
      >
        <van-icon
          slot="icon"
          name="clear"
          v-show="isEdit && !fixedChannels.includes(channel.id)"
        ></van-icon>
        <span class="text" slot="text" :class="{ active: active === index }">
          {{ channel.name }}
        </span>
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        icon="plus"
        v-for="(channel, index) in recommendChannels"
        :key="index"
        :text="channel.name"
        @click="addChannel(channel)"
      />
    </van-grid>
    <!-- /频道推荐 -->
  </div>
</template>

<script>
import { getAllChannels, addUserChannels, delUserChannels } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      allChannels: [], // 所有频道
      isEdit: false, // 是否在编辑状态
      fixedChannels: [0] // 固定频道, 不可删除
    }
  },
  computed: {
    ...mapState(['user']),
    recommendChannels() {
      // 所有的频道 - 我的频道
      return this.allChannels.filter(channel =>
        this.myChannels.every(item => item.id !== channel.id)
      )
    }
  },
  watch: {},
  created() {
    this.loadAllChannels()
  },
  mounted() {},
  methods: {
    async loadAllChannels() {
      try {
        const { data } = await getAllChannels()
        // console.log(data)
        this.allChannels = data.data.channels
      } catch (err) {
        console.log(err)
        this.$toast('获取频道列表失败')
      }
    },
    // 增加 我的频道
    async addChannel(channel) {
      this.myChannels.push(channel)
      // 持久化储存
      try {
        // 判断是否是登录状态
        if (this.user) {
          // 登录状态
          await addUserChannels({
            id: channel.id,
            seq: this.myChannels.length // 频道的序号,直接传数组的长度
          })
        } else {
          // 未登录
          setItem('TOUTIAO', this.myChannels)
        }
      } catch (err) {
        console.log(err)
        this.$toast('添加频道失败')
      }
    },
    // 点击 我的频道 频道项
    async onChannelClick(channel, index) {
      // 判断是否是编辑状态
      if (this.isEdit) {
        // 编辑状态 >>> 删除频道
        this.myChannels.splice(index, 1)

        // 如果删除的一项在高亮项之前,要处理高亮问题
        if (index <= this.active) {
          this.$emit('updateActive', this.active - 1, true)
        }

        // 持久化储存
        this.deleteChannel(channel)
      } else {
        // 非编辑状态 >>> 切换频道
        this.$emit('updateActive', index, false)
      }
    },
    async deleteChannel(channel) {
      try {
        // 判断是否是登录状态
        if (this.user) {
          // 登录状态
          await delUserChannels(channel.id)
        } else {
          // 未登录
          setItem('TOUTIAO', this.myChannels)
        }
      } catch (err) {
        console.log(err)
        this.$toast('删除频道失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333333;
  }

  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }

  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
      .active {
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }

  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }

  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>
