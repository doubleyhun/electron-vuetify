<template>
    <div>
        <div class="page-title-area">
            <span class="page-title">스윗트래커 주변 식당 리스트</span>
        </div>
        <v-dialog v-model="deleteDialog" persistent max-width="300">
            <v-card>
                <v-card-title class="headline">알림</v-card-title>
                <v-card-text>선택한 {{ selectRestName }} 식당을 삭제하시겠습니까?</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat @click="deleteDialog = false">취소</v-btn>
                    <v-btn color="green darken-1" flat @click="deleteRest">삭제</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog
                v-model="deleteSuccessPopup"
                max-width="290">
            <v-card>
                <v-card-title class="headline">알림</v-card-title>
                <v-card-text>선택한 식당이 삭제되었습니다.</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="green darken-1"
                            flat="flat"
                            @click="deleteSuccessPopup = false">
                        확인
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-data-table
                :headers="headers"
                :items="this.restaurantListData"
                :loading="true"
                :no-data-text="noDataText"
                :items-per-page-options="rowsPerPageItems"
                :options.sync="options"
                :server-items-length="this.options.totalItems"
                class="elevation-1">
            <v-progress-linear v-show="linerKey" slot="progress" color="blue" indeterminate></v-progress-linear>
            <template slot="items" slot-scope="props">
                <td class="text-xs-center">{{ props.item.name }}</td>
                <td class="text-xs-center pa-0">{{ convertRestGroupName(props.item.groups) }}</td>
                <td class="text-xs-center">{{ props.item.recent_time }}</td>

                <td class="text-xs-center">{{ convertpublishedData(props.item.published) }}</td>
                <td class="text-xs-center">{{ convertImmigrationCheckedData(props.item.immigrationChecked) }}</td>
                <td class="text-xs-center">
                    <v-btn icon class="mx-0" @click="showDeleteDialog(props.item)">
                        <v-icon color="black">delete_forever</v-icon>
                    </v-btn>
                </td>
            </template>
        </v-data-table>
    </div>
</template>

<script>
    import moment from 'moment'

    export default {
        name: 'restaurantlist',
        watch: {
            options: {
                handler() {
                    this.getRestaurantListData()
                },
                deep: true
            },
            restaurantListData: function (val) {
                if (val.length > 0)
                    this.linerKey = false
                else
                    this.linerKey = true
            }
        },
        methods: {
            getRestaurantListData() {
              /*  let pageParam = {
                    page: this.options.page - 1,
                    pagesize: this.options.rowsPerPage,
                    desc: (this.options.sortBy ? (this.options.descending ? 'desc' : 'asc') : null),
                    sortName: (this.options.sortBy ? this.options.sortBy : null)
                }
                this.$store.dispatch('immigration-list/immigration-list-module/getImmigrationListData', pageParam).then((response) => {
                    this.restaurantListData = response.data.map[0]
                    this.options.totalItems = response.data.pageInfo.totalCount
                }).catch((ex) => {
                    console.log('error', ex)
                })*/

            },
            convertTimeStamp: function (val) {
                let convertVal = undefined
                if (val)
                    convertVal = moment(val).format('YYYY-MM-DD HH:mm:ss')
                else
                    convertVal = ''

                return convertVal
            },
            convertpublishedData: function (val) {
                let returnVal = undefined
                if (val == 0)
                    returnVal = '비게시'
                else if (val == 1)
                    returnVal = '게시'
                else
                    returnVal = '오류'

                return returnVal
            },
            convertImmigrationCheckedData: function (val) {
                let returnVal = undefined
                if (val == 0)
                    returnVal = '미심사'
                else if (val == 1)
                    returnVal = '심사'
                else
                    returnVal = '오류'

                return returnVal
            },
            modifyImmi: function (val) {
                let immiSeq = val.seq

                this.$router.push({
                    path: `/immigration/immigrationmodify?seq=${immiSeq}`
                })
            },
            showDeleteDialog: function (val) {
                this.selectRestInfo = val
                this.selectRestName = val.name
                this.deleteDialog = true
            },
            deleteRest: function () {
                this.deleteDialog = false

                let selectImmiSeq = this.selectRestInfo.seq
                this.$store.dispatch('immigration-list/immigration-list-module/deleteImmigrationData', selectImmiSeq)
                    .then((response) => {
                        this.deleteSuccessPopup = true
                        this.selectRestInfo = null
                        this.selectRestName = null
                        this.getRestaurantListData()
                    }).catch((ex) => {
                    console.log('error', ex)
                    alert('출입국신청서 삭제에 실패하였습니다.')
                    this.selectRestInfo = null
                    this.selectRestName = null
                })
            }
        },
        data() {
            return {
                deleteDialog: false,
                deleteSuccessPopup: false,
                headers: [
                    {text: '식당이름', align: 'center', value: 'name', width: '20%', sortable: false},
                    {text: '식당분류', align: 'center', value: 'groups', width: '20%', sortable: false},
                    {text: '등록/방문일자', align: 'center', value: 'recent_time', width: '20%', sortable: false},
                    {text: '방문빈도수', align: 'center', value: 'count', width: '20%', sortable: false},
                    {text: '대우재단빌딩', align: 'center', value: 'place', width: '20%', sortable: false}
                ],
                linerKey: true,
                noDataText: '표시할 데이터가 없습니다.',
                selectRestInfo: null,
                selectRestName: null,
                rowsPerPageItems: [10, 20, 30, 40, 50, 100],
                options: {
                    rowsPerPage: 30
                },
                restaurantListData: []
            }
        }
    }
</script>