<template>
<v-container fluid pl-0 pr-0 grid-list-md>
    <h3 class="text-left mb-5 pl-3 pr-3 grey-text">General Overview</h3>
    <v-container>
        <v-layout>
            <v-flex md4>
                <v-card>
                    <v-container grid-list-md>
                        <v-layout>
                            <v-flex md4>
                                 <v-progress-circular 
                                 id="fullfilmentRatioProg"
                                :rotate="-90"
                                :size="80"
                                :width="15"
                                :value="value"
                                color="primary"
                                >
                                {{ value }}
                                </v-progress-circular>
                            </v-flex>
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
                            <v-flex md4><img src="@/assets/student.svg"></v-flex>
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
                            <v-flex md4><img src="@/assets/exam.svg"></v-flex>
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
                            <v-flex md4><img src="@/assets/lecturer.svg"></v-flex>
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
                            <v-flex md4><img src="@/assets/room.svg"></v-flex>
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
                            <v-flex md4><img src="@/assets/student.svg"></v-flex>
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
        <h3 class="text-left mb-5 grey-text">Exam Schedule Overview</h3>
        <v-layout wrap>
            <v-flex md4>
                <v-flex md12 text-center>
                    <v-card class="value-chart">
                        <v-card-title class="d-block ">90%</v-card-title>
                        <v-card-text>exam satisfied all preferences</v-card-text>
                    </v-card>
                </v-flex>
                <v-flex md12>
                    <v-card pt-5 class="graph-chart">
                        <v-card-text>Preference Satisfaction</v-card-text>
                        <canvas id="preference_satisfaction" width="250" height="250"></canvas>
                    </v-card>
                </v-flex>
                <v-flex md12>
                    <v-card pt-5 class="graph-chart">
                        <v-card-text class="text-center">Room Utilization</v-card-text>
                        <canvas id="roomUtilization" height="200"></canvas>
                    </v-card>
                </v-flex>
            </v-flex>
            <v-flex md4>
                <v-flex md12 text-center>
                    <v-card class="value-chart">
                        <v-card-title class="d-block">5%</v-card-title>
                        <v-card-text>of exams allocated</v-card-text>
                    </v-card>
                </v-flex>
                <v-flex md12>
                    <v-card pt-5 class="graph-chart">
                        <v-card-text>Peek Time Usage</v-card-text>
                        <canvas id="peek_time_usage" width="250" height="250"></canvas>
                    </v-card>
                </v-flex>
                <v-flex md12>
                    <v-card pt-5 class="graph-chart">
                        <v-card-text class="text-center">Common Exam Times</v-card-text>
                        <canvas id="common_exam_times"  height="200" ></canvas>
                    </v-card>
                </v-flex>
            </v-flex>
            <v-flex md4>
                <v-flex md12>
                    <v-card class="graph-chart">
                        <v-card-text >Most Requested Rooms</v-card-text>
                        <canvas id="most_requested_rooms" width="400" height="400"></canvas>
                    </v-card>
                </v-flex>
                <v-flex md12>
                    <v-card pt-5 class="graph-chart">
                        <v-card-text>Exam Distribution across the week</v-card-text>
                        <canvas id="exam_distribution_across_the_week"  height="285"></canvas>
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
            total_student_count: 154,
            interval:{},
            value:0
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
        this.roomUtilization();
        this.commonExamTimes();
        this.fullfilmentRatioProg();
        
    },
    methods: {
        fullfilmentRatioProg: function(){
            this.interval = setInterval(() => {
            if (this.value === 100) {
                return (this.value = 0)
              }
                this.value += 10
            }, 1000)
        },

          beforeDestroy () {
                clearInterval(this.interval)
        },
        
        mostRequestedRooms: function() {
            var randColors = ['#97BFF4', '#8BE2CE', '#FF7FB0', '#FFE57F', '#FFB37F'];
            var borderColors = ['#307FE9', '#17C69D', '#FF0061', '#FFCC00', '#FF6800'];

            var ctx = document.getElementById('most_requested_rooms').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'horizontalBar',
                data: {
                    labels: ['Theatre', 'Computer Lab', 'Printing Studio', 'Record Studio', 'Standard Class'],
                    datasets: [{
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: randColors,
                        borderColor: borderColors,
                        borderWidth: 2
                    }]
                },
                options: {
                    layout: {
                        padding: {
                             left: 25,
                             right: 25,
                             top: 10,
                             bottom: 25 
            }
                    },
                    legend:{
                        display:false
                    },
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
            var randColors = ['#97BFF4', '#8BE2CE', '#FF7FB0', '#FFE57F'];
            var borderColors = ['#307FE9', '#17C69D', '#FF0061', '#FFCC00'];
            var ctx = document.getElementById('preference_satisfaction').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Match', 'Partial Match', 'No Prefs', 'No Match'],
                    datasets: [{
                        data: [12, 19, 3, 5,  ],
                        backgroundColor: randColors,
                        borderColor: borderColors,
                        borderWidth: 2,
                        borderAlign: 'inner'
                    }],
                },
                options: {
                legend: {
                    display: true,
                    position:'top',
                    padding:0,
                    labels: {
                        fontColor: '#172B4D',
                        boxWidth: 15
                            }
                        },
                layout: {
                     padding: {
                     left: 25,
                     right: 25,
                     top: 10,
                      bottom: 25 
            }
        }         
                },
         

                    
            });
        },
    

          examDistributionAcrossTheWeek: function() {
            var randColors = ['#97BFF4', '#8BE2CE', '#FF7FB0', '#FFE57F', '#FFB37F', '#7FE3F2', '#CAD6E6'];
            var borderColors = ['#307FE9', '#17C69D', '#FF0061', '#FFCC00', '#FF6800','#00C7E6','#A3ADBA'];
            var ctx = document.getElementById('exam_distribution_across_the_week').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        data: [20, 20, 20, 15, 15, 5, 5],
                        backgroundColor: randColors,
                        borderColor: borderColors,
                        borderWidth: 2,
                        borderAlign: 'inner'
                    }],
                },
                options: {
                legend: {
                    display: true,
                    position:'top',
                    padding:0,
                    labels: {
                        fontColor: '#172B4D',
                        boxWidth: 15
                            }
                        },
                layout: {
                     padding: {
                     left: 10,
                     right: 10,
                     top: 5,
                      bottom: 15 
            }
        }         
                },
         

                    
            });
        },


        peekTimeUsage: function() {

       
                            
            var ctx = document.getElementById('peek_time_usage').getContext('2d');

   
      
            // Create gradient
            var gradient = ctx.createLinearGradient(150.000, 0.000, 150.000, 300.000);
            // Add colors
            gradient.addColorStop(0.000, '#8BE2CE');
            gradient.addColorStop(1.000, '#DEFFF7');
            
            // Fill with gradient
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 300.000, 300.000);



         
  
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['7am', 'Noon', '5pm', '10pm'],
                    datasets: [{
                        backgroundColor: gradient,
                        data: [80, 60, 40, 20],
                        label: 'Dataset',
                        fill: 'start',
                        borderColor:'#17C69D'

                    }]
                },
                options: {
                      legend:{
                        display:false
                    },
                    showLine:false,
                    
                    spanGaps: false,
                    gridLines:false,
                    borderCapStyle: 'round',
                  
        			elements: {
        				line: {
                            borderWidth: 5,
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
        roomUtilization: function() {
            var randColors = ['#97BFF4', '#FF7FB0'];
            var borderColors = ['#307FE9', '#E24152'];
            var ctx = document.getElementById('roomUtilization').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Utilized Rooms', 'Non-Utilized Rooms'],
                    datasets: [{
                        label: '# of Votes',
                        data: [75, 25],
                        backgroundColor: randColors,
                        borderColor: borderColors,
                        borderWidth: 2,
                        borderAlign: 'inner'
                        
                    }]
                },
                options: {
        			circumference: Math.PI,
                    rotation: -Math.PI,
                    layout: {
                     padding: {
                     left: 25,
                     right: 25,
                     top: 10,
                     bottom: 25 
            }
        } 
                }
            });
        },

              commonExamTimes: function() {
            var randColors = ['#8BE2CE', '#97BFF4'];
            var borderColors = ['#17C69D', '#307FE9'];
            var ctx = document.getElementById('common_exam_times').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['PM Times', 'AM Times'],
                    datasets: [{
                        label: '# of Votes',
                        data: [75, 25],
                        backgroundColor: randColors,
                        borderColor: borderColors,
                        borderWidth: 2,
                        borderAlign: 'inner'
                        
                    }]
                },
                options: {
        			circumference: Math.PI,
                    rotation: -Math.PI,
                    layout: {
                     padding: {
                     left: 25,
                     right: 25,
                     top: 10,
                     bottom: 25 
            }
        } 
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
