<template>
<v-container fluid fill-height>
    <v-layout>
        <v-flex>
            <v-card :raised="raised" :elevation="elevation">
                <v-card-text>
                    <!-- <b>Lecturer:</b> {{ this.lecturer.name }}<br />
                    <b>Exam Count:</b> {{ this.lecturer.exam_count }}<br />
                    <b>Student Count:</b> {{ this.lecturer.student_count }}<br /> -->
                </v-card-text>
            </v-card>
            <v-card :raised="raised" :elevation="elevation">
                <v-card-title class="py-4">
                    <v-flex xs12 sm6 md3>
                        <v-text-field
                            v-model="search"
                            append-icon="search"
                            label="Search"
                            single-line
                            outlined
                            :v-model="search"
                            @input="filterData()"
                        ></v-text-field>
                    </v-flex>
                </v-card-title>
                <v-data-table disable-sort hide-default-footer :headers="headers" :items="data" class="calendar">
                    <template v-slot:item="{ headers, item }">
                        <tr>
                            <td v-for="header in headers" v-html="item[header.value]" align="left" valign="top"></td>
                        </tr>
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

var _ = require('lodash');
export default {
    data: function() {
        return {
            search: '',
            on: false,
            elevation: 0,
            raised: false,
            snack: false,
            snackColor: '',
            snackText: '',
            headers: [],
            data: [],
            tmp_data: []
        }
    },
    created: function() {
        this.getData();
    },
    methods: {
        getData(){
            this.$http
            .get(utils.apiBaseUrl + "exam-schedule-calendar")
            .then(resp => {
                this.tmp_data = resp.data.data.exams;
                this.preparingData(this.tmp_data);
            })
            .catch(err => {
                this.snack = true;
                this.snackColor = "error";
                this.snackText = "Opps! Something went wrong when getting data.";
            });
        },
        preparingData(exam_data){
            
            var new_data = [];
            var new_headers = [];
            new_headers.push({text: 'Hours', value: 'hours', align: 'center'});
            
            var exams = exam_data;
            for(var hour in exams) {
                
                var obj = {};
                const days = exams[hour];
                for(var day in days){

                    if(hour == 9){
                        new_headers.push({ text: day, value: day });
                    }

                    obj['hours'] = hour;
                    var filtered = days[day].filter(function (el) {
                        return el != null;
                    });
                    obj[day] = filtered.join('<br>');
            
                }
                new_data.push(obj);
            }

            this.headers = new_headers;
            this.data = new_data;
        },
        filterData(){
            var data = _.cloneDeep(this.tmp_data);
            if(this.search != ''){
                
                for (var hour in data){
                    const days = data[hour];
                    for(var day in days){
                        const exams = days[day];
                        for(var exam in exams){
                            if (exams[exam] != this.search){
                                delete data[hour][day][exam];
                            }
                        }
                    }
                }
                
            }
            this.preparingData(data);
        },
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
