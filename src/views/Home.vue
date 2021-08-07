<template>
  <div class="star-wars-home">
    <h1 class="swh__title">Select a people</h1>

    <ul class="swh__list">
      <li class="swh__list-person" v-for="(person, index) in list" :key="index" >
        <a @click="pickPersonId(person.url)">{{ person.name }}</a>
      </li>
    </ul>

    <pagination v-model="page" :records="count" :per-page="10" @paginate="callback"/>
  </div>
</template>

<script>
import Pagination from 'vue-pagination-2';

import { getPerson } from '@/services'

export default {
  name: 'Home',
  data() {
    return {
      list: [],
      page: 1,
      count: 0,
      hasError: false,
      loading: false,
    }
  },
  components: {
    Pagination,
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.loading = true;

      getPerson(this.page)
        .then((res) => {
          this.count = res?.data?.count;
          this.list = res?.data?.results;

          if(!this.list) this.hasError = true;
        })
        .catch(() => {
          this.hasError = true;
        })
        .finally(() => {
          this.loading = false;
        })
    },

    pickPersonId(url) {
      const urlLength = url?.length;
      if (!urlLength) return;

      let personId;

      // Pick the id on url of the people
      if(url.charAt(urlLength - 5) === '/') {
        personId = url.charAt(urlLength - 4) + url.charAt(urlLength - 3) + url.charAt(urlLength - 2);
        this.$router.push({ name: 'person-info', params: { id: personId } });
      }

      else if (url.charAt(urlLength - 3) === '/') {
        personId = url.charAt(urlLength - 2);
        this.$router.push({ name: 'person-info', params: { id: personId } });
      } 
      
      else {
        personId = url.charAt(urlLength - 3) + url.charAt(urlLength - 2);
        this.$router.push({ name: 'person-info', params: { id: personId } });
      }
    },

    callback(page) {
      this.page = page;
      this.fetchData();
    }
  }
}
</script>


<style lang="stylus" scoped>
  .star-wars-home
    height 100vh
    align-content center
    justify-content center
    display flex
    flex-direction column 

    @media screen and (max-width: 768px)
      height 100%
      

  .swh
    &__title
      color: #000
      margin: 20px 0 10px 0
      padding: 0

    &__list
      list-style: none
      margin: 2% 0 5% 0
      padding: 0

      &-person
        padding: 15px 0

        @media screen and (max-width: 768px)
          padding: 10px 0

      &-person a
        font-size 24px
        color: #4169E1
        cursor: pointer
        padding: 0 5px

        @media screen and (max-width: 768px)
          font-size: 20px
</style>

<style lang="stylus">
.pagination
    display: flex
    justify-content: center
    list-style: none
    padding: 0
    margin: 0

    .page-item 
      padding: 0.5rem 0.75rem;
      border: 1px solid #ccc;
      cursor: pointer;
      background-color: #fff;

      &:hover 
        background-color: #4169e1
        color: #fff
        font-weight 600
        border-color: lighten(#ccc, 50%)
        z-index: 3
      

      &.active
        background-color: #4169e1
        color: #fff
        font-weight 600
      

      &:first-child,
      &:last-child
        display: none
</style>
