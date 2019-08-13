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

                    <template v-slot:item.student="props">
                        <v-edit-dialog :return-value.sync="props.item.student" large persistent @save="save" @cancel="cancel" @open="open" @close="close">
                            <div>{{ props.item.student }}</div>
                            <template v-slot:input>
                                <div class="mt-4 title">Update Student</div>
                            </template>
                            <template v-slot:input>
                                <v-text-field v-model="props.item.student" :rules="[max25chars]" label="Edit" single-line counter autofocus></v-text-field>
                            </template>
                        </v-edit-dialog>
                    </template>
                    <template v-slot:item.stuClass="props">
                        <v-edit-dialog :return-value.sync="props.item.stuClass" large persistent @save="save" @cancel="cancel" @open="open" @close="close">
                            <div>{{ props.item.stuClass }}</div>
                            <template v-slot:input>
                                <div class="mt-4 title">Update Studen Class</div>
                            </template>
                            <template v-slot:input>
                                <v-text-field v-model="props.item.stuClass" :rules="[max25chars]" label="Edit" single-line counter autofocus></v-text-field>
                            </template>
                        </v-edit-dialog>
                    </template>
                    <template v-slot:item.girecegi_sinav_sayisi="props">
                        <v-edit-dialog :return-value.sync="props.item.girecegi_sinav_sayisi" large persistent @save="save" @cancel="cancel" @open="open" @close="close">
                            <div>{{ props.item.girecegi_sinav_sayisi }}</div>
                            <template v-slot:input>
                                <div class="mt-4 title">Update Exam Count</div>
                            </template>
                            <template v-slot:input>
                                <v-text-field v-model="props.item.girecegi_sinav_sayisi" :rules="[max25chars]" label="Edit" single-line counter autofocus></v-text-field>
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
import json_data from '../../data/students.json';

export default {
    data: function() {
        return {
            on: false,
            elevation: 0,
            raised: false,
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
                    text: 'Student',
                    value: 'student',
                },
                {
                    text: 'Student Class',
                    value: 'stuClass'
                },
                {
                    text: 'Exam Count',
                    value: 'girecegi_sinav_sayisi'
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
