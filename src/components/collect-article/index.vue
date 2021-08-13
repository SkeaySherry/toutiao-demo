<template>
  <van-button
    :icon="value ? 'star' : 'star-o'"
    :class="{ collected: value }"
    style="border:none"
    @click="onCollect"
    :loading="loading"
  ></van-button>
</template>

<script>
import { addCollect, delCollect } from '@/api/article'
export default {
  name: 'CollectArticle',
  components: {},
  props: {
    // 是否收藏
    value: {
      type: Boolean,
      required: true
    },
    // 文章id
    art_id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onCollect() {
      this.loading = true
      try {
        if (this.value) {
          // 取消收藏
          await delCollect(this.art_id)
        } else {
          // 添加收藏
          await addCollect(this.art_id)
        }
        this.$toast.success(this.value ? '取消成功!' : '收藏成功!')
        this.$emit('input', !this.value)
      } catch (err) {
        this.$toast.fail('操作失败!')
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.collected {
  .van-icon {
    color: #ffa500;
  }
}
</style>
