<template>
<v-container fluid fill-height >
    <v-layout>
        <v-flex> 
            <v-card :raised="raised" :elevation="elevation">
                <v-card-title class="py-4">
                    <v-flex xs12 sm6 md3>
                      <v-text-field v-model="search" append-icon="search" label="Search"  single-line outlined hide-details></v-text-field>
                    </v-flex>
                       <v-spacer></v-spacer>
                    <v-btn outlined color="primary"  dark v-on="on">
                        <v-icon>save_alt</v-icon>Export
                    </v-btn>
                 
                </v-card-title>
                <v-data-table  multi-sort :search="search" :headers="headers" :items="data" :page.sync="pagination.page" :items-per-page="pagination.itemsPerPage"  @page-count="pageCount = $event" >
                    
                    <template v-slot:item.code="props">
                        <v-edit-dialog :return-value.sync="props.item.code" large persistent @save="save" @cancel="cancel" @open="open" @close="close">
                            <div>{{ props.item.code }}</div>
                            <template v-slot:input>
                                <div class="mt-4 title">Update Code</div>
                            </template>
                            <template v-slot:input>
                                <v-text-field v-model="props.item.code" :rules="[max25chars]" label="Edit" single-line counter autofocus></v-text-field>
                            </template>
                        </v-edit-dialog>
                    </template>
                    <template v-slot:item.name="props">
                        <v-edit-dialog :return-value.sync="props.item.name" large persistent @save="save" @cancel="cancel" @open="open" @close="close">
                            <div>{{ props.item.name }}</div>
                            <template v-slot:input>
                                <div class="mt-4 title">Update Name</div>
                            </template>
                            <template v-slot:input>
                                <v-text-field v-model="props.item.name" :rules="[max25chars]" label="Edit" single-line counter autofocus></v-text-field>
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
export default {
    data: function() {
        return {
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
                    text: 'Code',
                    value: 'code',
                },
                {
                    text: 'Name',
                    value: 'name'
                },
                {
                    text: 'Section',
                    value: 'section'
                },
                {
                    text: 'Lecturer',
                    value: 'lecturer'
                },
                {
                    text: 'Proctor',
                    value: 'proctor'
                },
                {
                    text: 'Duration',
                    value: 'duration'
                },
                {
                    text: 'Exam Date',
                    value: 'exam_date'
                },
                {
                    text: 'Start Time',
                    value: 'start_time'
                },
                {
                    text: 'Room',
                    value: 'room'
                },
                {
                    text: 'Semester',
                    value: 'semester'
                }
            ],
            data: [{
                    code: 'Frozen Yogurt',
                    name: 159,
                    section: 6.0,
                    lecturer: 24,
                    proctor: 4.0,
                    duration: '1%',
                    exam_date: 6.0,
                    start_time: 24,
                    room: 4.0,
                    semester: '1%',
                },
                {
                    code: 'Ice cream sandwich',
                    name: 159,
                    section: 6.0,
                    lecturer: 24,
                    proctor: 4.0,
                    duration: '1%',
                    exam_date: 6.0,
                    start_time: 24,
                    room: 4.0,
                    semester: '1%',
                },
                {
                    code: 'Eclair',
                    name: 159,
                    section: 6.0,
                    lecturer: 24,
                    proctor: 4.0,
                    duration: '1%',
                    exam_date: 6.0,
                    start_time: 24,
                    room: 4.0,
                    semester: '1%',
                },
                {
                    code: 'Cupcake',
                    name: 159,
                    section: 6.0,
                    lecturer: 24,
                    proctor: 4.0,
                    duration: '1%',
                    exam_date: 6.0,
                    start_time: 24,
                    room: 4.0,
                    semester: '1%',
                },
                {
                    code: 'Gingerbread',
                    name: 159,
                    section: 6.0,
                    lecturer: 24,
                    proctor: 4.0,
                    duration: '1%',
                    exam_date: 6.0,
                    start_time: 24,
                    room: 4.0,
                    semester: '1%',
                },
                {
                    code: 'Jelly bean',
                    name: 159,
                    section: 6.0,
                    lecturer: 24,
                    proctor: 4.0,
                    duration: '1%',
                    exam_date: 6.0,
                    start_time: 24,
                    room: 4.0,
                    semester: '1%',
                },
                {
                    code: 'Lollipop',
                    name: 159,
                    section: 6.0,
                    lecturer: 24,
                    proctor: 4.0,
                    duration: '1%',
                    exam_date: 6.0,
                    start_time: 24,
                    room: 4.0,
                    semester: '1%',
                },
                {
                    code: 'Honeycomb',
                    name: 159,
                    section: 6.0,
                    lecturer: 24,
                    proctor: 4.0,
                    duration: '1%',
                    exam_date: 6.0,
                    start_time: 24,
                    room: 4.0,
                    semester: '1%',
                },
                {
                    code: 'Donut',
                    name: 159,
                    section: 6.0,
                    lecturer: 24,
                    proctor: 4.0,
                    duration: '1%',
                    exam_date: 6.0,
                    start_time: 24,
                    room: 4.0,
                    semester: '1%',
                },
                {
                    code: 'KitKat',
                    name: 159,
                    section: 6.0,
                    lecturer: 24,
                    proctor: 4.0,
                    duration: '1%',
                    exam_date: 6.0,
                    start_time: 24,
                    room: 4.0,
                    semester: '1%',
                },
                {
                    code: 'Frozen Yogurt',
                    name: 159,
                    section: 6.0,
                    lecturer: 24,
                    proctor: 4.0,
                    duration: '1%',
                    exam_date: 6.0,
                    start_time: 24,
                    room: 4.0,
                    semester: '1%',
                },
                {
                    code: 'Ice cream sandwich',
                    name: 159,
                    section: 6.0,
                    lecturer: 24,
                    proctor: 4.0,
                    duration: '1%',
                    exam_date: 6.0,
                    start_time: 24,
                    room: 4.0,
                    semester: '1%',
                },
                {
                    code: 'Eclair',
                    name: 159,
                    section: 6.0,
                    lecturer: 24,
                    proctor: 4.0,
                    duration: '1%',
                    exam_date: 6.0,
                    start_time: 24,
                    room: 4.0,
                    semester: '1%',
                },
                {
                    code: 'Cupcake',
                    name: 159,
                    section: 6.0,
                    lecturer: 24,
                    proctor: 4.0,
                    duration: '1%',
                    exam_date: 6.0,
                    start_time: 24,
                    room: 4.0,
                    semester: '1%',
                },
                {
                    code: 'Gingerbread',
                    name: 159,
                    section: 6.0,
                    lecturer: 24,
                    proctor: 4.0,
                    duration: '1%',
                    exam_date: 6.0,
                    start_time: 24,
                    room: 4.0,
                    semester: '1%',
                },
                {
                    code: 'Jelly bean',
                    name: 159,
                    section: 6.0,
                    lecturer: 24,
                    proctor: 4.0,
                    duration: '1%',
                    exam_date: 6.0,
                    start_time: 24,
                    room: 4.0,
                    semester: '1%',
                },
                {
                    code: 'Lollipop',
                    name: 159,
                    section: 6.0,
                    lecturer: 24,
                    proctor: 4.0,
                    duration: '1%',
                    exam_date: 6.0,
                    start_time: 24,
                    room: 4.0,
                    semester: '1%',
                },
                {
                    code: 'Honeycomb',
                    name: 159,
                    section: 6.0,
                    lecturer: 24,
                    proctor: 4.0,
                    duration: '1%',
                    exam_date: 6.0,
                    start_time: 24,
                    room: 4.0,
                    semester: '1%',
                },
                {
                    code: 'Donut',
                    name: 159,
                    section: 6.0,
                    lecturer: 24,
                    proctor: 4.0,
                    duration: '1%',
                    exam_date: 6.0,
                    start_time: 24,
                    room: 4.0,
                    semester: '1%',
                },
                {
                    code: 'KitKat',
                    name: 159,
                    section: 6.0,
                    lecturer: 24,
                    proctor: 4.0,
                    duration: '1%',
                    exam_date: 6.0,
                    start_time: 24,
                    room: 4.0,
                    semester: '1%',
                },
                {
                    code: 'Frozen Yogurt',
                    name: 159,
                    section: 6.0,
                    lecturer: 24,
                    proctor: 4.0,
                    duration: '1%',
                    exam_date: 6.0,
                    start_time: 24,
                    room: 4.0,
                    semester: '1%',
                },
                {
                    code: 'Ice cream sandwich',
                    name: 159,
                    section: 6.0,
                    lecturer: 24,
                    proctor: 4.0,
                    duration: '1%',
                    exam_date: 6.0,
                    start_time: 24,
                    room: 4.0,
                    semester: '1%',
                },
                {
                    code: 'Eclair',
                    name: 159,
                    section: 6.0,
                    lecturer: 24,
                    proctor: 4.0,
                    duration: '1%',
                    exam_date: 6.0,
                    start_time: 24,
                    room: 4.0,
                    semester: '1%',
                },
                {
                    code: 'Cupcake',
                    name: 159,
                    section: 6.0,
                    lecturer: 24,
                    proctor: 4.0,
                    duration: '1%',
                    exam_date: 6.0,
                    start_time: 24,
                    room: 4.0,
                    semester: '1%',
                },
                {
                    code: 'Gingerbread',
                    name: 159,
                    section: 6.0,
                    lecturer: 24,
                    proctor: 4.0,
                    duration: '1%',
                    exam_date: 6.0,
                    start_time: 24,
                    room: 4.0,
                    semester: '1%',
                },
                {
                    code: 'Jelly bean',
                    name: 159,
                    section: 6.0,
                    lecturer: 24,
                    proctor: 4.0,
                    duration: '1%',
                    exam_date: 6.0,
                    start_time: 24,
                    room: 4.0,
                    semester: '1%',
                },
                {
                    code: 'Lollipop',
                    name: 159,
                    section: 6.0,
                    lecturer: 24,
                    proctor: 4.0,
                    duration: '1%',
                    exam_date: 6.0,
                    start_time: 24,
                    room: 4.0,
                    semester: '1%',
                },
                {
                    code: 'Honeycomb',
                    name: 159,
                    section: 6.0,
                    lecturer: 24,
                    proctor: 4.0,
                    duration: '1%',
                    exam_date: 6.0,
                    start_time: 24,
                    room: 4.0,
                    semester: '1%',
                },
                {
                    code: 'Donut',
                    name: 159,
                    section: 6.0,
                    lecturer: 24,
                    proctor: 4.0,
                    duration: '1%',
                    exam_date: 6.0,
                    start_time: 24,
                    room: 4.0,
                    semester: '1%',
                },
                {
                    code: 'KitKat',
                    name: 159,
                    section: 6.0,
                    lecturer: 24,
                    proctor: 4.0,
                    duration: '1%',
                    exam_date: 6.0,
                    start_time: 24,
                    room: 4.0,
                    semester: '1%',
                },
                {
                    code: 'Frozen Yogurt',
                    name: 159,
                    section: 6.0,
                    lecturer: 24,
                    proctor: 4.0,
                    duration: '1%',
                    exam_date: 6.0,
                    start_time: 24,
                    room: 4.0,
                    semester: '1%',
                },
                {
                    code: 'Ice cream sandwich',
                    name: 159,
                    section: 6.0,
                    lecturer: 24,
                    proctor: 4.0,
                    duration: '1%',
                    exam_date: 6.0,
                    start_time: 24,
                    room: 4.0,
                    semester: '1%',
                },
                {
                    code: 'Eclair',
                    name: 159,
                    section: 6.0,
                    lecturer: 24,
                    proctor: 4.0,
                    duration: '1%',
                    exam_date: 6.0,
                    start_time: 24,
                    room: 4.0,
                    semester: '1%',
                },
                {
                    code: 'Cupcake',
                    name: 159,
                    section: 6.0,
                    lecturer: 24,
                    proctor: 4.0,
                    duration: '1%',
                    exam_date: 6.0,
                    start_time: 24,
                    room: 4.0,
                    semester: '1%',
                },
                {
                    code: 'Gingerbread',
                    name: 159,
                    section: 6.0,
                    lecturer: 24,
                    proctor: 4.0,
                    duration: '1%',
                    exam_date: 6.0,
                    start_time: 24,
                    room: 4.0,
                    semester: '1%',
                },
                {
                    code: 'Jelly bean',
                    name: 159,
                    section: 6.0,
                    lecturer: 24,
                    proctor: 4.0,
                    duration: '1%',
                    exam_date: 6.0,
                    start_time: 24,
                    room: 4.0,
                    semester: '1%',
                },
                {
                    code: 'Lollipop',
                    name: 159,
                    section: 6.0,
                    lecturer: 24,
                    proctor: 4.0,
                    duration: '1%',
                    exam_date: 6.0,
                    start_time: 24,
                    room: 4.0,
                    semester: '1%',
                },
                {
                    code: 'Honeycomb',
                    name: 159,
                    section: 6.0,
                    lecturer: 24,
                    proctor: 4.0,
                    duration: '1%',
                    exam_date: 6.0,
                    start_time: 24,
                    room: 4.0,
                    semester: '1%',
                },
                {
                    code: 'Donut',
                    name: 159,
                    section: 6.0,
                    lecturer: 24,
                    proctor: 4.0,
                    duration: '1%',
                    exam_date: 6.0,
                    start_time: 24,
                    room: 4.0,
                    semester: '1%',
                },
                {
                    code: 'KitKat',
                    name: 159,
                    section: 6.0,
                    lecturer: 24,
                    proctor: 4.0,
                    duration: '1%',
                    exam_date: 6.0,
                    start_time: 24,
                    room: 4.0,
                    semester: '1%',
                },
            ],
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
      save () {
        this.snack = true
        this.snackColor = 'success'
        this.snackText = 'Data saved'
      },
      cancel () {
        this.snack = true
        this.snackColor = 'error'
        this.snackText = 'Canceled'
      },
      open () {
        this.snack = true
        this.snackColor = 'info'
        this.snackText = 'Dialog opened'
      }
    },
}
</script>
