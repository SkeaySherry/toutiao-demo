<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <van-cell
        v-for="(article, index) in list"
        :key="index"
        :title="article.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResults } from '@/api/search'
// console.log(getSearchResults)
export default {
  name: 'SearchResult',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 10,
      error: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      try {
        const { data } = await getSearchResults({
          page: this.page,
          per_page: this.per_page,
          q: this.searchText
        })
        const results = data.data.results
        this.list.push(...results)

        this.loading = false

        if (results.length === 0) {
          this.finished = true
        } else {
          this.page++
        }
      } catch (err) {
        this.loading = false
        this.error = true
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
