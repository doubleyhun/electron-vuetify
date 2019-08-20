<template>
    <v-layout>
        <v-flex text-xs-center>
            <div class="main-view">
               <restaurant-list></restaurant-list>
            </div>
        </v-flex>
    </v-layout>
</template>

<script>
    /* components */
    import restaurantList from '../../components/list/restaurantlist'

    export default {
        components: {
            restaurantList
        },
        name: 'restaurantlist',
        /*     beforeMount: function () {
                 this.$store.dispatch('');
             },*/
        destroyed: function () {
        }
    }
</script>