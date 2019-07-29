<template>
<v-container fluid fill-height>
    <v-layout>
        <v-flex>
            <v-card :raised="raised" :elevation="elevation">
                <v-card-title class="py-4">
                    <v-flex xs12 sm6 md3>
                        <v-text-field v-model="search" append-icon="search" label="Search" single-line outlined hide-details></v-text-field>
                    </v-flex>
                    <v-spacer></v-spacer>
                    <v-btn outlined color="primary" dark v-on="on">
                        <v-icon>save_alt</v-icon>Export
                    </v-btn>
                </v-card-title>
                <v-data-table multi-sort :search="search" :headers="headers" :items="data" :page.sync="pagination.page" :items-per-page="pagination.itemsPerPage" @page-count="pageCount = $event">
                    <template v-slot:item.room="props">
                        <v-edit-dialog :return-value.sync="props.item.room" large persistent @save="save" @cancel="cancel" @open="open" @close="close">
                            <div>{{ props.item.room }}</div>
                            <template v-slot:input>
                                <div class="mt-4 title">Update Room</div>
                            </template>
                            <template v-slot:input>
                                <v-text-field v-model="props.item.room" :rules="[max25chars]" label="Edit" single-line counter autofocus></v-text-field>
                            </template>
                        </v-edit-dialog>
                    </template>
                    <template v-slot:item.capacity="props">
                        <v-edit-dialog :return-value.sync="props.item.capacity" large persistent @save="save" @cancel="cancel" @open="open" @close="close">
                            <div>{{ props.item.capacity }}</div>
                            <template v-slot:input>
                                <div class="mt-4 title">Update Capacity</div>
                            </template>
                            <template v-slot:input>
                                <v-text-field v-model="props.item.capacity" :rules="[max25chars]" label="Edit" single-line counter autofocus></v-text-field>
                            </template>
                        </v-edit-dialog>
                    </template>
                </v-data-table>
                <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
                    {{ snackText }}
                    <v-btn text @click="snack = false">Close</v-btn>
                </v-snackbar>

            </v-card>
        </v-flex>
    </v-layout>
</v-container>
</template>

<script>
import json_data from '../../data/rooms.json';
export default {
    data: function() {
        return {
            elevation: 0,
            on: false,
            raised: true,
            search: '',
            snack: false,
            snackColor: '',
            snackText: '',
            max25chars: v => v.length <= 25 || 'Input too long!',
            pagination: {
                page: 1,
                itemsPerPage: 10
            },
            headers: [{
                    text: 'Room',
                    value: 'room',
                },
                {
                    text: 'Capacity',
                    value: 'capacity'
                }
            ],
            data: json_data
        }
    },
    created: function() {
        this.pagination.totalItems = this.data.length;
    },
    computed: {
        pages: function() {
            if (
                this.pagination.itemsPerPage == null ||
                this.pagination.totalItems == null
            )
                return 0;

            return Math.ceil(
                this.pagination.totalItems / this.pagination.itemsPerPage
            );
        }
    },
    methods: {
        save() {
            this.snack = true
            this.snackColor = 'success'
            this.snackText = 'Data saved'
        },
        cancel() {
            this.snack = true
            this.snackColor = 'error'
            this.snackText = 'Canceled'
        },
        open() {
            this.snack = true
            this.snackColor = 'info'
            this.snackText = 'Dialog opened'
        },
        close() {}
    },
}
</script>
