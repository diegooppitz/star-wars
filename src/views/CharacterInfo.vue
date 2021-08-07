<template>
    <div class="character-info">
        <h1 class="ci__title">Star Wars Universe</h1>
        <div v-if="$_verifyLoaded('done')" class="ci__character-data">
            <h2 class="ci__sub-title">{{ characterData.name}}</h2>
            <p class="ci__item">Homeworld: {{ homeworld }}</p>
            <p class="ci__item">Height: {{ characterData.height }}</p>
            <p class="ci__item">Mass: {{ characterData.mass }}</p>
            <p class="ci__item">Birth year: {{ characterData.birth_year}}</p>
        </div>
    </div>
</template>

<script>
// services
import { getCharacterById, getPlanetByUrl } from '@/services'

import { verifyMixin } from '@/mixins'

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
        }
    },

    mounted() {
        this.fetchData();
    },

    methods: {
        fetchData() {
            this.loading = true;

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
                    this.fetchHomeWorld(this.characterData.homeworld);
                });
        },
        fetchHomeWorld(url) {
            console.log(url)
            if(!url) return;

            getPlanetByUrl(url)
                .then((res) => {
                    this.homeworld = res?.data?.name
                })
                .finally(() => {
                    this.loading = false;
                });
        }
    },
}
</script>