import VueRouter from 'vue-router';

import Login from '@/components/Auth/Login';
import Dashboard from '@/components/Dashboard';
import AcademicStaffList from '@/components/AcademicStaffList/Index.vue';
import FulfillmentList from '@/components/FulfillmentList/Index.vue';
import Rooms from '@/components/Rooms/Index.vue';
import Lessons from '@/components/Lessons/Index.vue';
import Organization from '@/components/Organization/Index.vue';
import ExamSchedule from '@/components/ExamSchedule/Index.vue';
import Student from '@/components/Students/Index.vue';

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
            path: '/academic-staff-list',
            component: AcademicStaffList,
            name: 'academic_staff_list',
            meta: {
                breadcrumb: [{
                        text: 'Dashboard',
                        disabled: false,
                        to: '/'
                    },
                    {
                        text: 'Academic Staff List',
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
        // {
        //   path: '/users',
        //   component: User,
        //   name: 'users',
        //   meta: {
        //     breadcrumb: [
        //       {
        //         text: 'Dashboard',
        //         disabled: false,
        //         to: '/'
        //       },
        //       {
        //         text: 'Users',
        //         disabled: true
        //       }
        //     ]
        //   }
        // },
        // {
        //   path: '/users/:id/edit',
        //   component: EditUser,
        //   name: 'user_edit',
        //   meta: {
        //     breadcrumb: [
        //       {
        //         text: 'Dashboard',
        //         disabled: false,
        //         to: '/'
        //       },
        //       {
        //         text: 'User',
        //         disabled: false,
        //         to: '/users'
        //       },
        //       {
        //         text: 'Edit',
        //         disabled: true
        //       }
        //     ]
        //   }
        // },
        // {
        //   path: '/admin-users',
        //   component: AdminUser,
        //   name: 'admin-users',
        //   meta: {
        //     breadcrumb: [
        //       {
        //         text: 'Dashboard',
        //         disabled: false,
        //         to: '/'
        //       },
        //       {
        //         text: 'Admin Users',
        //         disabled: true
        //       }
        //     ]
        //   }
        // },
        // {
        //   path: '/admin-users/create',
        //   component: CreateAdminUser,
        //   name: 'admin_user_create',
        //   meta: {
        //     breadcrumb: [
        //       {
        //         text: 'Dashboard',
        //         disabled: false,
        //         to: '/'
        //       },
        //       {
        //         text: 'Admin Users',
        //         disabled: false,
        //         to: '/admin-users'
        //       },
        //       {
        //         text: 'Create',
        //         disabled: true
        //       }
        //     ]
        //   }
        // },
        // {
        //   path: '/admin-users/:id/edit',
        //   component: EditAdminUser,
        //   name: 'admin_user_edit',
        //   meta: {
        //     breadcrumb: [
        //       {
        //         text: 'Dashboard',
        //         disabled: false,
        //         to: '/'
        //       },
        //       {
        //         text: 'Admin User',
        //         disabled: false,
        //         to: '/admin-users'
        //       },
        //       {
        //         text: 'Edit',
        //         disabled: true
        //       }
        //     ]
        //   }
        // },
        // {
        //   path: '/campaigns',
        //   component: Campaigns,
        //   name: 'campaigns',
        //   meta: {
        //     breadcrumb: [
        //       {
        //         text: 'Dashboard',
        //         disabled: false,
        //         to: '/'
        //       },
        //       {
        //         text: 'Campaigns',
        //         disabled: true
        //       }
        //     ]
        //   }
        // },
        // {
        //   path: '/campaigns/create',
        //   component: CreateCampaign,
        //   name: 'campaign_create',
        //   meta: {
        //     breadcrumb: [
        //       {
        //         text: 'Dashboard',
        //         disabled: false,
        //         to: '/'
        //       },
        //       {
        //         text: 'Campaigns',
        //         disabled: false,
        //         to: '/campaigns'
        //       },
        //       {
        //         text: 'Create',
        //         disabled: true
        //       }
        //     ]
        //   }
        // },
        // {
        //   path: '/campaigns/:id/edit',
        //   component: EditCampaign,
        //   name: 'campaign_edit',
        //   meta: {
        //     breadcrumb: [
        //       {
        //         text: 'Dashboard',
        //         disabled: false,
        //         to: '/'
        //       },
        //       {
        //         text: 'Campaigns',
        //         disabled: false,
        //         to: '/campaigns'
        //       },
        //       {
        //         text: 'Edit',
        //         disabled: true
        //       }
        //     ]
        //   }
        // },
        // {
        //   path: '/notifications',
        //   component: Notifications,
        //   name: 'notifications',
        //   meta: {
        //     breadcrumb: [
        //       {
        //         text: 'Dashboard',
        //         disabled: false,
        //         to: '/'
        //       },
        //       {
        //         text: 'Notifications',
        //         disabled: true
        //       }
        //     ]
        //   }
        // },
        // {
        //   path: '/notifications/create',
        //   component: CreateNotification,
        //   name: 'notification_create',
        //   meta: {
        //     breadcrumb: [
        //       {
        //         text: 'Dashboard',
        //         disabled: false,
        //         to: '/'
        //       },
        //       {
        //         text: 'Notifications',
        //         disabled: false,
        //         to: '/notifications'
        //       },
        //       {
        //         text: 'Create',
        //         disabled: true
        //       }
        //     ]
        //   }
        // },
        // {
        //   path: '/notifications/:id/edit',
        //   component: EditNotification,
        //   name: 'notification_edit',
        //   meta: {
        //     breadcrumb: [
        //       {
        //         text: 'Dashboard',
        //         disabled: false,
        //         to: '/'
        //       },
        //       {
        //         text: 'Notifications',
        //         disabled: false,
        //         to: '/notifications'
        //       },
        //       {
        //         text: 'Edit',
        //         disabled: true
        //       }
        //     ]
        //   }
        // },
        // {
        //   path: '/timelines',
        //   component: Timelines,
        //   name: 'timelines',
        //   meta: {
        //     breadcrumb: [
        //       {
        //         text: 'Dashboard',
        //         disabled: false,
        //         to: '/'
        //       },
        //       {
        //         text: 'Timelines',
        //         disabled: true
        //       }
        //     ]
        //   }
        // },
        // {
        //   path: '/timelines/create',
        //   component: CreateTimeline,
        //   name: 'timeline_create',
        //   meta: {
        //     breadcrumb: [
        //       {
        //         text: 'Dashboard',
        //         disabled: false,
        //         to: '/'
        //       },
        //       {
        //         text: 'Timelines',
        //         disabled: false,
        //         to: '/timelines'
        //       },
        //       {
        //         text: 'Create',
        //         disabled: true
        //       }
        //     ]
        //   }
        // },
        // {
        //   path: '/timelines/:id/edit',
        //   component: EditTimeline,
        //   name: 'timeline_edit',
        //   meta: {
        //     breadcrumb: [
        //       {
        //         text: 'Dashboard',
        //         disabled: false,
        //         to: '/'
        //       },
        //       {
        //         text: 'Timelines',
        //         disabled: false,
        //         to: '/timelines'
        //       },
        //       {
        //         text: 'Edit',
        //         disabled: true
        //       }
        //     ]
        //   }
        // },
        // {
        //   path: '/surveys',
        //   component: Surveys,
        //   name: 'surveys',
        //   meta: {
        //     breadcrumb: [
        //       {
        //         text: 'Dashboard',
        //         disabled: false,
        //         to: '/'
        //       },
        //       {
        //         text: 'Surveys',
        //         disabled: false
        //       }
        //     ]
        //   }
        // },
        // {
        //   path: '/surveys/create',
        //   component: CreateSurvey,
        //   name: 'survey_create',
        //   meta: {
        //     breadcrumb: [
        //       {
        //         text: 'Dashboard',
        //         disabled: false,
        //         to: '/'
        //       },
        //       {
        //         text: 'Surveys',
        //         disabled: false,
        //         to: '/surveys'
        //       },
        //       {
        //         text: 'Create',
        //         disabled: true
        //       }
        //     ]
        //   }
        // },
        // {
        //   path: '/surveys/:id/edit',
        //   component: EditSurvey,
        //   name: 'survey_edit',
        //   meta: {
        //     breadcrumb: [
        //       {
        //         text: 'Dashboard',
        //         disabled: false,
        //         to: '/'
        //       },
        //       {
        //         text: 'Surveys',
        //         disabled: false,
        //         to: '/surveys'
        //       },
        //       {
        //         text: 'Edit',
        //         disabled: true
        //       }
        //     ]
        //   }
        // },
        // {
        //   path: '/content-categories',
        //   component: ContentCategories,
        //   name: 'content_categories',
        //   meta: {
        //     breadcrumb: [
        //       {
        //         text: 'Dashboard',
        //         disabled: false,
        //         to: '/'
        //       },
        //       {
        //         text: 'Content Categories',
        //         disabled: true
        //       }
        //     ]
        //   }
        // },
        // {
        //   path: '/content-categories/create',
        //   component: CreateContentCategory,
        //   name: 'content_category_create',
        //   meta: {
        //     breadcrumb: [
        //       {
        //         text: 'Dashboard',
        //         disabled: false,
        //         to: '/'
        //       },
        //       {
        //         text: 'Content Categories',
        //         disabled: false,
        //         to: '/content-categories'
        //       },
        //       {
        //         text: 'Create',
        //         disabled: true
        //       }
        //     ]
        //   }
        // },
        // {
        //   path: '/content-categories/:id/edit',
        //   component: EditContentCategory,
        //   name: 'content_category_edit',
        //   meta: {
        //     breadcrumb: [
        //       {
        //         text: 'Dashboard',
        //         disabled: false,
        //         to: '/'
        //       },
        //       {
        //         text: 'Contents Categories',
        //         disabled: false,
        //         to: '/content-categories'
        //       },
        //       {
        //         text: 'Edit',
        //         disabled: true
        //       }
        //     ]
        //   }
        // },
        {
            path: '*',
            redirect: '/'
        },
    ],
});
