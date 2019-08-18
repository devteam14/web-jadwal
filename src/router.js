import VueRouter from 'vue-router';

import Login from '@/components/Auth/Login';
import Dashboard from '@/components/Dashboard';
import AcademicStaffList from '@/components/AcademicStaffList/Index.vue';
import AcademicStaffListShow from '@/components/AcademicStaffList/Show.vue';
import FulfillmentList from '@/components/FulfillmentList/Index.vue';
import Rooms from '@/components/Rooms/Index.vue';
import Lessons from '@/components/Lessons/Index.vue';
import Organization from '@/components/Organization/Index.vue';
import ExamSchedule from '@/components/ExamSchedule/Index.vue';
import ExamScheduleCalendar from '@/components/ExamSchedule/Calendar.vue';
import Student from '@/components/Students/Index.vue';
import StudentShow from '@/components/Students/Show.vue';
import Exams from '@/components/Exams/Index.vue';

export default new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/login',
            component: Login,
            name: 'login',
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/',
            component: Dashboard,
            name: 'dashboard',
            meta: {
                breadcrumb: [{
                    text: 'Dashboard',
                    disabled: true
                }]
            }
        },
        {
            path: '/exams',
            component: Exams,
            name: 'exams',
            meta: {
                breadcrumb: [{
                        text: 'Dashboard',
                        disabled: false,
                        to: '/'
                    },
                    {
                        text: 'Exams',
                        disabled: true
                    }
                ]
            }
        },
        {
            path: '/academic-staff-lists',
            component: AcademicStaffList,
            name: 'academic_staff_lists',
            meta: {
                breadcrumb: [{
                        text: 'Dashboard',
                        disabled: false,
                        to: '/'
                    },
                    {
                        text: 'Academic Staff Lists',
                        disabled: true
                    }
                ]
            }
        },
        {
            path: '/academic-staff-lists/:id',
            component: AcademicStaffListShow,
            name: 'academic-staff-lists',
            meta: {
                breadcrumb: [{
                        text: 'Dashboard',
                        disabled: false,
                        to: '/'
                    },
                    {
                        text: 'Academic Staff List',
                        disabled: false,
                        to: '/academic-staff-lists'
                    },
                    {
                        text: 'Academic Staff List Show',
                        disabled: true
                    }
                ]
            }
        },
        {
            path: '/fulfillment-list',
            component: FulfillmentList,
            name: 'fulfillment_list',
            meta: {
                breadcrumb: [{
                        text: 'Dashboard',
                        disabled: false,
                        to: '/'
                    },
                    {
                        text: 'Fulfillment List',
                        disabled: true
                    }
                ]
            }
        },
        {
            path: '/rooms',
            component: Rooms,
            name: 'rooms',
            meta: {
                breadcrumb: [{
                        text: 'Dashboard',
                        disabled: false,
                        to: '/'
                    },
                    {
                        text: 'Rooms',
                        disabled: true
                    }
                ]
            }
        },
        {
            path: '/lessons',
            component: Lessons,
            name: 'lessons',
            meta: {
                breadcrumb: [{
                        text: 'Dashboard',
                        disabled: false,
                        to: '/'
                    },
                    {
                        text: 'Lessons',
                        disabled: true
                    }
                ]
            }
        },
        {
            path: '/organization',
            component: Organization,
            name: 'organization',
            meta: {
                breadcrumb: [{
                        text: 'Dashboard',
                        disabled: false,
                        to: '/'
                    },
                    {
                        text: 'Organization',
                        disabled: true
                    }
                ]
            }
        },
        {
            path: '/exam-schedule',
            component: ExamSchedule,
            name: 'exam_schedule',
            meta: {
                breadcrumb: [{
                        text: 'Dashboard',
                        disabled: false,
                        to: '/'
                    },
                    {
                        text: 'Exam Schedule',
                        disabled: true
                    }
                ]
            }
        },
        {
            path: '/exam-schedule-calendar',
            component: ExamScheduleCalendar,
            name: 'exam_schedule_calendar',
            meta: {
                breadcrumb: [{
                        text: 'Dashboard',
                        disabled: false,
                        to: '/'
                    },
                    {
                        text: 'Exam Schedule Calendar',
                        disabled: true
                    }
                ]
            }
        },
        {
            path: '/students',
            component: Student,
            name: 'students',
            meta: {
                breadcrumb: [{
                        text: 'Dashboard',
                        disabled: false,
                        to: '/'
                    },
                    {
                        text: 'Students',
                        disabled: true
                    }
                ]
            }
        },
        {
            path: '/students/:id',
            component: StudentShow,
            name: 'student',
            meta: {
                breadcrumb: [{
                        text: 'Dashboard',
                        disabled: false,
                        to: '/'
                    },
                    {
                        text: 'Students',
                        disabled: false,
                        to: '/students'
                    },
                    {
                        text: 'Student Show',
                        disabled: true
                    }
                ]
            }
        },
        {
            path: '*',
            redirect: '/'
        },
    ],
});