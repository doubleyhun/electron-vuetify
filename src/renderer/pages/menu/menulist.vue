
<template>
    <v-layout>
        <v-flex text-xs-center>
            <div class="main-view">
               <menu-list></menu-list>
            </div>
        </v-flex>
    </v-layout>
</template>

<script>
    /* components */
    import menuList from '../../components/list/menulist'

    export default {
        components: {
            menuList
        },
        name: 'menulist',
        /*     beforeMount: function () {
                 this.$store.dispatch('');
             },*/
        destroyed: function () {
        }
    }
</script>