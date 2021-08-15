<template>
  <div class="update-birthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
import dayjs from 'dayjs'
export default {
  name: 'UpdateGender',
  components: {},
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      minDate: new Date(1900, 0, 1), // 最小支持选择的日期
      maxDate: new Date(), // 最大支持选择的日期(当前日期)
      currentDate: new Date(this.value) // 初始日期
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onConfirm(val) {
      try {
        await updateUserProfile({
          birthday: dayjs(val).format('YYYY-MM-DD')
        })
        this.$emit('close')
        this.$emit('input', dayjs(val).format('YYYY-MM-DD'))
        this.$toast.success('更新成功！')
      } catch (err) {
        this.$toast.fail('更新失败！')
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
