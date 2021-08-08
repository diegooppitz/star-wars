<template>
    <span class="loading">loading...</span>
</template>

<script>
export default {
    name: 'Loading',
}
</script>

<style lang="stylus" scoped>
.loading 
    color #ffd700
    font-size 36px
    position absolute
    left 50%
    transform translateX(-50%)
</style>