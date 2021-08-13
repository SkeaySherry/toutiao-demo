<template>
  <van-button
    v-if="is_followed"
    class="follow-btn"
    round
    size="small"
    @click="onFollow"
    :loading="loading"
    >已关注</van-button
  >
  <van-button
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    @click="onFollow"
    :loading="loading"
    >关注</van-button
  >
</template>

<script>
import { addFollow, removeFollow } from '@/api/user'
export default {
  name: 'FollowUser',
  components: {},
  // 自定义 v-model 属性名
  model: {
    prop: 'is_followed', // 默认是 value
    event: 'updateFollow' // 默认是 input
  },
  props: {
    // 是否关注
    is_followed: {
      type: Boolean,
      required: true
    },
    // 作者id
    aut_id: {
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
    async onFollow() {
      this.loading = true
      try {
        if (this.is_followed) {
          // 执行取消关注
          await removeFollow(this.aut_id)
          this.$toast.success('取消成功!')
        } else {
          await addFollow(this.aut_id)
          this.$toast.success('关注成功!')
        }
        this.$emit('updateFollow', !this.is_followed)
      } catch (err) {
        let message = '操作失败!'
        if (err && err.response.status === 400) {
          message = '不能关注自己!'
        }
        this.$toast.fail(message)
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped></style>
