<template>
  <div class="update-gender">
    <van-picker
      show-toolbar
      title="标题"
      :columns="columns"
      :default-index="value"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: 'UpdateGender',
  components: {},
  props: {
    // 父组件传来的性别值 （1，0)
    value: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      columns: ['男', '女'],
      localGender: null // 当前性别
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 确定事件
    async onConfirm(value, index) {
      // 增加loading交互
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })

      try {
        await updateUserProfile({
          gender: index
        })
        this.$emit('close')
        this.$emit('input', index)
        this.$toast.success('更新成功!')
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
