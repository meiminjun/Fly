<template>
    <div>
        <h1>1232323</h1>
    </div>
</template>
<script>
    export default {
        data () {
            return {

            };
        },
        computed: {

        },
        created () {
        },
        mounted () {
            this.$message('message');
            this.$loading();
            this.$loading.close();
        },
        methods: {
        },
        watch: {
        },
        // beforeRouteLeave (to, from, next) {
        // },
        destroyed () {
        }
    };
</script>
<style scoped>

</style>
