<template>
    <div>
        11123232
    </div>
</template>
<script>
    import { mapState } from 'vuex';
    export default {
        data () {
            return {
                
            };
        },
        components: {
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
