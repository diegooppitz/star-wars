<template>
  <div class="star-wars-home" :class="{ loadHeight: $_verifyLoaded('loading') }">
    <template v-if="$_verifyLoaded('done')">
      <h1 class="swh__title">Star Wars characters</h1>
      <div class="swh__header">
        <input v-model="searchTerm" @keypress.enter="search" @keydown="searchPressKey" type="text" class="swh__search" placeholder="Search for a character">
      </div>

      <template v-if="!isEmpty">
        <ul class="swh__list">
          <li class="swh__list-person" v-for="(person, index) in list" :key="index" >
            <a @click="pickPersonId(person.url)">{{ person.name }}</a>
          </li>
        </ul>
        <pagination v-model="page" :records="count" :per-page="10" @paginate="paginationCallback"/>
      </template>

      <information-component v-else />
    </template>
    <loading-component v-if="$_verifyLoaded('loading')" />
  </div>
</template>

<script>
// Libs
import Pagination from 'vue-pagination-2';

// services
import { getCharacters, searchCharacter } from '@/services'

// mixins
import { verifyMixin } from '@/mixins'

// components
import LoadingComponent from '@/components/Loading'
import InformationComponent from '@/components/Information';

export default {
  name: 'Home',
  mixins: [verifyMixin],
  data() {
    return {
      list: [],
      searchTerm: '',
      searchIsActive: false,
      page: 1,
      count: 0,
    }
  },

  components: {
    Pagination,
    LoadingComponent,
    InformationComponent
  },

  mounted() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      this.$_reqConfig();

      getCharacters(this.page)
        .then((res) => {
          if(!res.data || this.$_verifyData(res.data.results)) return;

          this.count = res?.data?.count;
          this.list = res?.data?.results;
        })
        .catch(() => {
          this.hasError = true;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    searchPressKey() {
      setTimeout(() => {
        if(!this.searchTerm || this.searchTerm.length === 0 ) {
          this.page = 1;
          this.fetchData();
          return
        }

        this.page = 1;
        this.search();
      }, 1000);
    },

    search() {
      if (!this.searchIsActive) this.page = 1;

      if (this.searchTerm.length === 1) return;
      
      if (!this.searchTerm || this.searchTerm.length === 0) {
        this.searchIsActive = false;
        this.fetchData();
        return;
      }

      this.searchIsActive = true;
      // this.$_reqConfig();

      searchCharacter(this.searchTerm, this.page)
        .then((res) => {
            if(!res.data || this.$_verifyData(res.data.results)) return;

            this.count = res?.data?.count;
            this.list = res?.data?.results;
        })
        .catch(() => {
          this.hasError = true;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    // Pick the id on url of a specific people
    pickPersonId(url) {
      const urlLength = url?.length;
      if (!urlLength) return;

      let personId;

      if(url.charAt(urlLength - 5) === '/') {
        personId = url.charAt(urlLength - 4) + url.charAt(urlLength - 3) + url.charAt(urlLength - 2);
        this.$router.push({ name: 'character-info', params: { id: personId } });
      }

      else if (url.charAt(urlLength - 3) === '/') {
        personId = url.charAt(urlLength - 2);
        this.$router.push({ name: 'character-info', params: { id: personId } });
      } 
      
      else {
        personId = url.charAt(urlLength - 3) + url.charAt(urlLength - 2);
        this.$router.push({ name: 'character-info', params: { id: personId } });
      }
    },

    paginationCallback(page) {
      this.page = page;
      if(this.searchIsActive) this.search();
      else this.fetchData();
    }
  }
}
</script>


<style lang="stylus" scoped>
.star-wars-home
  height auto
  min-height 100vh
  box-sizing border-box
  align-content center
  justify-content center
  display flex
  flex-direction column
  background-color #000

  @media screen and (max-width: 767px)
    height 100%
    

  .swh
    &__title
      color #FFD700
      margin 20px 0 10px 0
      padding 0


    &__search,
    &__button 
      box-sizing border-box
      height 40px
      font-size 18px

    &__search
      padding 5px 20px
      margin-top 30px
      width 300px
      outline none
      border 1px solid #ccc
      border-radius 20px

    &__button
      background-color #4169e1
      color #fff
      width 150px
      border none
      cursor pointer

      &:hover 
        opacity 0.9

    &__list
      list-style none
      margin 20px 0 80px 0
      padding 0

      &-person
        padding 15px 0

        @media screen and (max-width: 767px)
          padding 10px 0

      &-person a
        font-size 24px
        color #fff
        cursor pointer
        padding 0 5px

        @media screen and (max-width: 767px)
          font-size 20px

  &.loadHeight 
    height 100vh
    overflow hidden
</style>

<style lang="stylus">
.pagination
    display flex
    justify-content center
    list-style none
    padding 0
    margin 0

    .page-item 
      padding 0.5rem 0.75rem;
      cursor pointer
      color #fff

      @media screen and (max-width: 767px)
        padding 6px 10px

      &:hover 
        background-color #BD6A16
        font-weight 600
        z-index 3
      

      &.active
        background-color #BD6A16
        color #fff
        font-weight 600
      

      &:first-child,
      &:last-child
        display none

      .VuePagination__count 
        color #000
</style>
