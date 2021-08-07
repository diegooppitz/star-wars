<template>
    <div></div>
</template>

<script>
export default {
    name: "PersonInfo",
    props: {
        id: {
        type: String,
        default: null,
        },
    },
    mounted() {
        console.log(this.id)
    }
}
</script>