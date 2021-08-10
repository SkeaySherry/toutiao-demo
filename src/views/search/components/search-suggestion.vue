<template>
  <div class="search-suggestion">
    <van-cell icon="search" v-for="(text, index) in suggestions" :key="index">
      <template #title>
        <span v-html="highlight(text)" @click="$emit('search', text)"></span>
      </template>
      <van-icon name="close" />
    </van-cell>
  </div>
</template>

<script>
import { getSearchSug } from '@/api/search'
import { debounce } from 'lodash'
// console.log(getSearchSug)
export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      suggestions: []
    }
  },
  computed: {},
  watch: {
    searchText: {
      // handler(val) {
      //   // console.log(val)
      //   this.loadSearchSug(val)
      // },
      handler: debounce(function(val) {
        this.loadSearchSug(val)
      }, 1000),
      immediate: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 加载搜索建议
    async loadSearchSug(value) {
      try {
        const { data } = await getSearchSug(value)
        console.log(data)
        this.suggestions = data.data.options
      } catch (err) {
        this.$toast('获取数据失败,请稍后重试')
      }
    },
    // 处理高亮
    highlight(text) {
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(
        reg,
        `<span style='color:red;'>${this.searchText}</span>`
      )
    }
  }
}
</script>

<style lang="less" scoped></style>
