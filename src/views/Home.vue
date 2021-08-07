<template>
  <div class="star-wars-home">
    <h1 class="swh__title">Star Wars API</h1>

    <ul class="swh__list">
      <li class="swh__list-person" v-for="(person, index) in list" :key="index">
        {{ person.name }}
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
          console.log(res.data);
        })
        .catch(() => {
          this.hasError = true;
        })
        .finally(() => {
          this.loading = false;
        })
    },
    callback: function(page) {
      this.page = page;
      this.fetchData();
    }
  }
}
</script>


<style lang="stylus" scoped>
 .star-wars-home {
   height 100vh;

   .swh {
     &__list {
      list-style: none;
     }
     &__list-person {
      padding: 10px;
     }
   }
 }
</style>

<style lang="stylus">
.pagination {
    display: flex;
    justify-content: center;
    list-style: none;

    .page-item {
      padding: 0.5rem 0.75rem;
      border: 1px solid #ccc;
      cursor: pointer;
      background-color: white;

      &:hover {
        background-color: blue;
        border-color: lighten(#ccc, 50%);
        z-index: 3;
      }

      &:first-child,
      &:last-child {
        display: none;
      }
    }
}
</style>
