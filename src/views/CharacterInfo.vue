<template>
    <div class="character-info">
        <h1 class="ci__title">Star Wars Universe</h1>
        <div class="ci__character-data">
            <h2 class="ci__sub-title">{{ characterData.name}}</h2>
        </div>
    </div>
</template>

<script>
import { getCharacterById } from '@/services'

export default {
    name: "CharacterInfo",
    props: {
        id: {
            type: String,
            default: null,
        },
    },
    data() {
        return {
            characterData: {},
            loading: false,
            isEmpty: false,
            hasError: false,
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
                    console.log(res.data)
                })
                .catch(() => {
                    this.hasError = true;
                })
                .finally(() => {
                    this.loading = false;
                });
        }
    }
}
</script>