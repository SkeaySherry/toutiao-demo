<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      :success-text="refreshText"
      :success-duration="1500"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <article-item
          v-for="article in list"
          :key="article.art_id.toString()"
          :article="article"
        ></article-item>

        <!-- <van-cell
          v-for="(article, index) in list"
          :key="index"
          :title="article.title"
        /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleList } from '@/api/article'
import ArticleItem from '@/components/article-item'

export default {
  name: '',
  components: { ArticleItem },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false,
      timestamp: null,
      isLoading: false, // 刷新状态
      refreshText: '' // 刷新提示文本
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      try {
        const { data } = await getArticleList({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })
        console.log(data)

        const { results } = data.data
        this.list.push(...results)

        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (results.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        // 开启错误提示
        this.error = true
        // 关闭loading效果
        this.loading = false
        console.log('获取文章列表失败', err)
        this.$toast('获取文章列表失败')
      }
    },
    async onRefresh() {
      try {
        const { data } = await getArticleList({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: 1
        })

        const { results } = data.data
        this.list.unshift(...results)

        this.isLoading = false
        this.refreshText = `刷新成功, 更新${results.length}条数据`
      } catch (err) {
        // console.log('刷新失败', err)
        this.isLoading = false
        this.refreshText = '刷新失败'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article-list {
  // 百分比单位是相对于父元素的
  // height: 100%;

  // 视口（在移动端是布局视口）单位：vw 和 vh，不受父元素影响
  // 1vw = 视口宽度的百分之一
  // 1vh = 视口高度的百分之一
  height: 79vh;
  overflow-y: auto;
}
</style>
