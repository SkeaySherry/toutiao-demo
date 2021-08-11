<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDel">
        <span @click="$emit('clear')">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDel = false">完成</span>
      </div>
      <van-icon name="delete" v-else @click="isDel = true" />
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in searchHistories"
      :key="index"
      @click="onClick(item, index)"
    >
      <van-icon name="close" v-show="isDel" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  components: {},
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isDel: false // 控制是否是删除状态
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onClick(item, index) {
      if (this.isDel) {
        // 删除历史记录
        this.searchHistories.splice(index, 1)
      } else {
        // 点击搜索
        this.$emit('search', item)
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
