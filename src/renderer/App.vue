<template>
    <div id="app">
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        <v-app id="inspire">
            <v-navigation-drawer
                    v-model="drawer"
                    app
                    clipped
            >
                <v-list dense>
                    <v-list-item
                            v-for="item in items"
                            :key="item.text"
                            :to="item.to"
                    >
                        <v-list-item-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>
                                {{ item.text }}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-subheader class="mt-4 grey--text text--darken-1">사용자</v-subheader>
                    <v-list>
                        <v-list-item
                                v-for="item in items2"
                                :key="item.text"
                                @click=""
                        >
                            <v-list-item-avatar>
                                <img
                                        :src="`https://randomuser.me/api/portraits/men/${item.picture}.jpg`"
                                        alt=""
                                >
                            </v-list-item-avatar>
                            <v-list-item-title v-text="item.text"></v-list-item-title>
                        </v-list-item>
                    </v-list>
                    <v-list-item @click="">
                        <v-list-item-action>
                            <v-icon color="grey darken-1">settings</v-icon>
                        </v-list-item-action>
                        <v-list-item-title class="grey--text text--darken-1">설정</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>

            <v-app-bar
                    app
                    clipped-left
                    color="red"
                    dense
            >
                <v-app-bar-nav-icon @click.stop="drawer = !drawer">
                    <v-icon>list</v-icon>
                </v-app-bar-nav-icon>
                <v-toolbar-title class="mr-12 align-center">
                    <span class="title">sweetTracker lunch guide</span>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-layout
                        align-center
                        style="max-width: 650px"
                >
                    <v-text-field
                            :append-icon-cb="() => {}"
                            placeholder="Search..."
                            single-line
                            append-icon="search"
                            color="white"
                            hide-details
                    ></v-text-field>
                </v-layout>
            </v-app-bar>

            <v-content>
                <v-container fill-height>
                    <v-layout
                            justify-center
                            align-center
                    >
                        <router-view></router-view>
                    </v-layout>
                </v-container>
            </v-content>
        </v-app>
    </div>
</template>

<script>
    export default {
        props: {
            source: String,
        },
        data: () => ({
            drawer: null,
            items: [
                {icon: 'fastfood', text: '주변 식당 리스트', to: '/restaurant/restaurantlist'},
                {icon: 'library_books', text: '식당 메뉴 리스트', to: '/menu/menulist'},
                {icon: 'dashboard', text: '식당 추천 대시보드', to: '/dashboard'},
                {icon: 'folder', text: '파일추가', to: '/file'}
            ],
            items2: [
                {picture: 28, text: 'YY'}
            ],
        }),
        created() {
            this.$vuetify.theme.dark = true
        },
    }
</script>

<style>


</style>