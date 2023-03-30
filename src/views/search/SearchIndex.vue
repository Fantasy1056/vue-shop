<template>
  <Header></Header>
  <section id="page">
    <SearchHistory></SearchHistory>
    <HotSearch></HotSearch>
    <SearchRecommed></SearchRecommed>
  </section>
</template>

<script lang="ts" setup>
import SearchHistory from '@/components/search/SearchHistory.vue'
import HotSearch from '@/components/search/HotSearch.vue'
import SearchRecommed from '@/components/search/SearchRecommend.vue'
import Header from '@/components/search/Header.vue'
</script>

<style lang="less" scoped>
section {
  padding-top: 1.0667rem;
  padding-bottom: 1.0667rem;
}
</style>
