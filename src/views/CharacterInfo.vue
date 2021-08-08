<template>
    <div class="character-info" :class="{ loadHeight: $_verifyLoaded('loading') }">
        <template v-if="$_verifyLoaded('done')">
            <h1 class="ci__title">{{ characterData.name}}</h1>
            <div class="ci__wrapper">
                <div class="ci__data">
                    <div class="ci__data-col">
                        <h4 class="ci__item ci__item-title">General</h4>
                        <p class="ci__item">Homeworld: {{ homeworld }}</p>
                        <p class="ci__item">Height: {{ characterData.height }}</p>
                        <p class="ci__item">Mass: {{ characterData.mass }}</p>
                        <p class="ci__item">Birth year: {{ characterData.birth_year}}</p>
                    </div>

                    <div class="ci__data-col">
                        <h4 class="ci__item ci__item-title">Films</h4>
                        <p v-if="films.length === 0" class="ci__item">No films</p>
                        <template v-else>
                            <p v-for="(film, index) in films" :key="index" class="ci__item">
                                {{ film }}
                            </p>
                        </template>
                    </div>

                    <div class="ci__data-col">
                        <h4 class="ci__item ci__item-title">Starships</h4>
                        <p v-if="starships.length === 0" class="ci__item">No startships</p>
                        <template v-else>
                            <p v-for="(starship, index) in starships" :key="index" class="ci__item">
                                {{ starship }}
                            </p>
                        </template>
                    </div>

                    <div class="ci__data-col">
                        <h4 class="ci__item ci__item-title">Vehicles</h4>
                        <p v-if="vehicles.length === 0" class="ci__item">No vehicles</p>
                        <template v-else>
                            <p v-for="(vehicle, index) in vehicles" :key="index" class="ci__item">
                                {{ vehicle }}
                            </p>
                        </template>
                    </div>
                </div>
            </div>
        </template>
        <loading-component v-if="$_verifyLoaded('loading')" />
    </div>
</template>

<script>
// services
import { getCharacterById, getPlanetByUrl, getFilmsByUrls, getStarshipsByUrls, getVehiclesByUrls } from '@/services'

// mixins
import { verifyMixin } from '@/mixins'

import LoadingComponent from '@/components/Loading'

export default {
    name: "CharacterInfo",
    mixins: [verifyMixin],
    props: {
        id: {
            type: String,
            default: null,
        },
    },
    data() {
        return {
            characterData: {},
            homeworld: '',
            films: [],
            starships: [],
            vehicles: [],
        }
    },

    components: {
        LoadingComponent,
    },

    mounted() {
        this.fetchData();
    },

    methods: {
        fetchData() {
            this.$_reqConfig();

            getCharacterById(this.id)
                .then((res) => {
                    if(!res || !res.data) {
                        this.isEmpty = true;
                        return;
                    }

                    this.characterData = res.data;
                })
                .catch(() => {
                    this.hasError = true;
                })
                .finally(() => {
                    this.fetchHomeWorld(this.characterData?.homeworld);
                    this.fetchFilms(this.characterData?.films);
                    this.fetchStarships(this.characterData?.starships);
                    this.fetchVehicles(this.characterData?.vehicles);

                    setTimeout(() => {
                        this.loading = false;
                    }, 1000);
                });
        },

        fetchHomeWorld(url) {
            if(!url) return;

            getPlanetByUrl(url).then((res) => {
                this.homeworld = res?.data?.name;
            });
        },

        fetchFilms(urls) {
            if(!urls) return;

            for (let index in urls) {
                getFilmsByUrls(urls[index]).then((res) => {
                    if(!res || !res.data || !res.data.title) return;

                    const film = res.data.title
                    this.films.push(film)
                })    
            }
        }, 

        fetchStarships(urls) {
            if(!urls) return;

            for (let index in urls) {
                getStarshipsByUrls(urls[index]).then((res) => {
                    if (!res || !res.data || !res.data.name) return;

                    const starship = res.data.name
                    this.starships.push(starship)
                });
            }
        },

        fetchVehicles(urls) {
            if(!urls) return;

            for (let index in urls) {
                getVehiclesByUrls(urls[index]).then((res) => {
                    if(!res || !res.data || !res.data.name) return;

                    const vehicle = res.data.name
                    this.vehicles.push(vehicle)
                });
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
.character-info
    height 100vh
    display flex
    justify-content center
    align-items center
    flex-direction column
    overflow hidden
    background-color #000
    
    @media screen and (max-width: 767px)
        overflow-y scroll
        height auto
        padding-bottom 20px

    .ci
        &__title 
            color #FFD700
            font-size 40px


        &__wrapper 
            color #fff
            display flex
            justify-content center
            flex-direction column
            width 80%
            height auto
            border solid 2px #fff
            border-radius 10px

            @media screen and (max-width: 767px)
                height auto
                position relative
        
        &__data
            display flex
            justify-content center

            @media screen and (max-width: 767px)
                flex-direction column

        &__data-col
            padding 0 65px

        &__item
            font-size 22px

            &-title
                font-size 26px
                margin 20px 0

    &.loadHeight 
        height 100vh
        overflow hidden
</style>