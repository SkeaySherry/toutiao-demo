<template>
  <van-button
    :icon="value === 1 ? 'good-job' : 'good-job-o'"
    :class="{ liked: value === 1 }"
    style="border:none"
    :loading="loading"
    @click="onLike"
  />
</template>

<script>
import { addLike, delLike } from '@/api/article'
export default {
  name: 'LikeArticle',
  components: {},
  props: {
    // 态度 attitude
    value: {
      type: Number,
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
    async onLike() {
      this.loading = true
      try {
        if (this.value === 1) {
          await delLike(this.art_id)
        } else {
          await addLike(this.art_id)
        }
        this.$toast.success(this.value === 1 ? '取消成功!' : '点赞成功!')
        this.$emit('input', this.value === 1 ? -1 : 1)
      } catch (err) {
        this.$toast.fail('操作失败!')
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.liked {
  .van-icon {
    color: #e5645f;
  }
}
</style>
