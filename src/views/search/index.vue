<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <!--
          Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮
         -->
    <form class="search-form" action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <!-- /搜索栏 -->

    <!-- 搜索结果 -->
    <search-result
      v-if="isResultShow"
      :search-text="searchText"
    ></search-result>
    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <search-suggestion
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
    ></search-suggestion>
    <!-- /联想建议 -->

    <!-- 搜索历史记录 -->
    <search-history
      v-else
      :search-histories="searchHistories"
      @search="onSearch"
      @clear="searchHistories = []"
    ></search-history>
    <!-- /搜索历史记录 -->
  </div>
</template>
<script>
import SearchHistory from './components/search-history.vue'
import SearchResult from './components/search-result.vue'
import SearchSuggestion from './components/search-suggestion.vue'
import { setItem, getItem } from '@/utils/storage'
export default {
  name: 'SearchPage',
  components: { SearchResult, SearchSuggestion, SearchHistory },
  props: {},
  data() {
    return {
      searchText: '', // 绑定输入框变量
      isResultShow: false,
      searchHistories: getItem('TOUTIAO_SEARCH_HISTORY') || [] // 搜索历史记录
    }
  },
  computed: {},
  watch: {
    searchHistories(val) {
      setItem('TOUTIAO_SEARCH_HISTORY', val)
    }
  },
  created() {},
  methods: {
    onSearch(val) {
      // console.log(val) // 输入的值

      this.searchText = val
      // 储存历史记录
      // 判断是否有重复
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      // 最新的排在最前面
      this.searchHistories.unshift(val)

      this.isResultShow = true
    },
    onCancel() {
      this.$router.back()
    }
  }
}
</script>
<style scoped lang="less">
.search-container {
  padding-top: 108px;
  padding-bottom: 100px;
  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
