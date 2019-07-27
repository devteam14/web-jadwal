<template>
<v-container fluid pl-0 pr-0 grid-list-md>
    <h2 class="text-left mb-5 pl-3 pr-3">General Overview</h2>
    <v-container>
        <v-layout>
            <v-flex md4>
                <v-card>
                    <v-container grid-list-md>
                        <v-layout>
                            <v-flex md4>GRAPH</v-flex>
                            <v-flex md8>
                                <v-card-text class="custom">Fullfilment Ratio</v-card-text>
                                <v-card-title class="custom">{{ fullfilment_ratio }}</v-card-title>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
            <v-flex md4>
                <v-card>
                    <v-container grid-list-md>
                        <v-layout>
                            <v-flex md4>ICON</v-flex>
                            <v-flex md8>
                                <v-card-text class="custom">Total Lesson Count</v-card-text>
                                <v-card-title class="custom">{{ total_lesson_count }}</v-card-title>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
            <v-flex md4>
                <v-card>
                    <v-container grid-list-md>
                        <v-layout>
                            <v-flex md4>ICON</v-flex>
                            <v-flex md8>
                                <v-card-text class="custom">Total Exam Count</v-card-text>
                                <v-card-title class="custom">{{ total_exam_count }}</v-card-title>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout wrap>
            <v-flex md4>
                <v-card>
                    <v-container grid-list-md>
                        <v-layout>
                            <v-flex md4>ICON</v-flex>
                            <v-flex md8>
                                <v-card-text class="custom">Total Lecturer Count</v-card-text>
                                <v-card-title class="custom">{{ total_lecturer_count }}</v-card-title>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
            <v-flex md4>
                <v-card>
                    <v-container grid-list-md>
                        <v-layout>
                            <v-flex md4>ICON</v-flex>
                            <v-flex md8>
                                <v-card-text class="custom">Total Room Count</v-card-text>
                                <v-card-title class="custom">{{ total_room_count }}</v-card-title>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
            <v-flex md4>
                <v-card>
                    <v-container grid-list-md>
                        <v-layout>
                            <v-flex md4>GRAPH</v-flex>
                            <v-flex md8>
                                <v-card-text class="custom">Total Student Count</v-card-text>
                                <v-card-title class="custom">{{ total_student_count }}</v-card-title>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>

    <v-container fluid white mt-5>
        <h2 class="text-left mb-5">Exam Schedule Ovweview</h2>
        <v-layout wrap>
            <v-flex md4>
                <v-flex md12 text-center>
                    <v-card>
                        <v-card-title class="d-block">90%</v-card-title>
                        <v-card-text>exam satisfied all preferences</v-card-text>
                    </v-card>
                </v-flex>
                <v-flex md12>
                    <v-card pt-5>
                        <v-card-text>Preference Satiscation</v-card-text>
                        <canvas id="preference_satisfaction" width="400" height="400"></canvas>
                    </v-card>
                </v-flex>
                <v-flex md12>
                    <v-card pt-5>
                        <v-card-text>Common Exam Times</v-card-text>
                        <canvas id="common_exam_times" width="400" height="400"></canvas>
                    </v-card>
                </v-flex>
            </v-flex>
            <v-flex md4>
                <v-flex md12 text-center>
                    <v-card>
                        <v-card-title class="d-block">5%</v-card-title>
                        <v-card-text>of exams allocated</v-card-text>
                    </v-card>
                </v-flex>
                <v-flex md12>
                    <v-card pt-5>
                        <v-card-text>Peek Time Usage</v-card-text>
                        <canvas id="peek_time_usage" width="400" height="400"></canvas>
                    </v-card>
                </v-flex>
                <v-flex md12>
                    <v-card pt-5>
                        <v-card-text>Common Exam Times</v-card-text>
                        <canvas id="common_exam_times2" width="400" height="400"></canvas>
                    </v-card>
                </v-flex>
            </v-flex>
            <v-flex md4>
                <v-flex md12>
                    <v-card>
                        <v-card-text>Most Requested Rooms</v-card-text>
                        <canvas id="most_requested_rooms" width="400" height="400"></canvas>
                    </v-card>
                </v-flex>
                <v-flex md12>
                    <v-card pt-5>
                        <v-card-text>Exam Distribution across the week</v-card-text>
                        <canvas id="exam_distribution_across_the_week" width="400" height="400"></canvas>
                    </v-card>
                </v-flex>
            </v-flex>
        </v-layout>
    </v-container>
</v-container>
</template>

<script>
var Chart = require('chart.js');
export default {

    data: function() {
        return {
            fullfilment_ratio: '75%',
            total_lesson_count: 154,
            total_exam_count: 302,
            total_lecturer_count: 254,
            total_room_count: 154,
            total_student_count: 154
        }
    },
    created: function() {
        // this.preferenceSatisfaction();
    },
    mounted: function() {
        this.mostRequestedRooms();
        this.preferenceSatisfaction();
        this.peekTimeUsage();
        this.examDistributionAcrossTheWeek();
        this.commonExamTimes();
        this.commonExamTimes2();
    },
    methods: {
        mostRequestedRooms: function() {
            var randColors = [this.dynamicColors(), this.dynamicColors(), this.dynamicColors(), this.dynamicColors(), this.dynamicColors()];
            var ctx = document.getElementById('most_requested_rooms').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'horizontalBar',
                data: {
                    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                    datasets: [{
                        label: '# of Votes',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: randColors,
                        borderColor: randColors,
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            },
                            gridLines: {
                                display: false
                            }
                        }],
                        xAxes: [{
                            gridLines: {
                                display: false
                            }
                        }]
                    }
                }
            });
        },
        preferenceSatisfaction: function() {
            var randColors = [this.dynamicColors(), this.dynamicColors(), this.dynamicColors(), this.dynamicColors(), this.dynamicColors()];
            var ctx = document.getElementById('preference_satisfaction').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                    datasets: [{
                        label: '# of Votes',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: randColors,
                        borderColor: randColors,
                        borderWidth: 1
                    }]
                }
            });
        },
        examDistributionAcrossTheWeek: function() {
            var randColors = [this.dynamicColors(), this.dynamicColors(), this.dynamicColors(), this.dynamicColors(), this.dynamicColors()];
            var ctx = document.getElementById('exam_distribution_across_the_week').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                    datasets: [{
                        label: '# of Votes',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: randColors,
                        borderColor: randColors,
                        borderWidth: 1
                    }]
                }
            });
        },
        peekTimeUsage: function() {
            var ctx = document.getElementById('peek_time_usage').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
                    datasets: [{
                        backgroundColor: this.dynamicColors(),
                        data: [60.34, 90.21, 40.68, -74.54, -62.35, -58.29, -84.03, -4.41],
                        label: 'Dataset',
                        fill: 'start',
                        lineTension: 0.00001
                    }]
                },
                options: {
        			spanGaps: false,
        			elements: {
        				line: {
        					tension: 0.000001
        				}
        			},
        			plugins: {
        				filler: {
        					propagate: false
        				}
        			},
        			scales: {
        				xAxes: [{
        					ticks: {
        						autoSkip: false,
        						maxRotation: 0
        					}
        				}]
        			}
                }
            });
        },
        commonExamTimes: function() {
            var randColors = [this.dynamicColors(), this.dynamicColors(), this.dynamicColors(), this.dynamicColors(), this.dynamicColors()];
            var ctx = document.getElementById('common_exam_times').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                    datasets: [{
                        label: '# of Votes',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: randColors,
                        borderColor: randColors,
                        borderWidth: 1
                    }]
                },
                options: {
        			circumference: Math.PI,
                    rotation: -Math.PI
                }
            });
        },
        commonExamTimes2: function() {
            var randColors = [this.dynamicColors(), this.dynamicColors(), this.dynamicColors(), this.dynamicColors(), this.dynamicColors()];
            var ctx = document.getElementById('common_exam_times2').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                    datasets: [{
                        label: '# of Votes',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: randColors,
                        borderColor: randColors,
                        borderWidth: 1
                    }]
                },
                options: {
        			circumference: Math.PI,
                    rotation: -Math.PI
                }
            });
        },
        dynamicColors: function() {
            var r = Math.floor(Math.random() * 255);
            var g = Math.floor(Math.random() * 255);
            var b = Math.floor(Math.random() * 255);
            return "rgb(" + r + "," + g + "," + b + ", .7)";
        }
    }
};
</script>
