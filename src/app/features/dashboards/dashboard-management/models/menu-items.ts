export const projectMenuItems = [
    {
        label: 'Overview',
        subItems: [
            {
                label: 'All Projects',
                link: 'overview'
            },
        ]
    },
    {
        label: 'Work Orders',
        subItems: [
            {
                label: 'All Work Orders',
                link: 'all-work-orders'
            },
            {
                label: 'Remarks',
                link: 'workorders/remarks'
            },
            {
                label: 'issues',
                link: 'workorders/issues'
            },
            {
                label: 'Actions Needed',
                link: 'workorders/action-needed'
            },
            {
                label: 'All Materials',
                link: 'workorders-all-materials'
            },
            {
                label: 'All Photos',
                link: 'workorders-all-photos'
            },
            {
                label: 'Forms',
                link: 'workorders/forms'
            },
            {
                label: 'Expenses',
                link: 'workorders/expenses'
            }
        ]
    },
    {
        label: 'HR Management',
        icon: 'people',
        subItems: [
            {
                label: 'Dashboard',
                link: '/hr/dashboard',
                icon: 'dashboard'
            },
            {
                label: 'Employees',
                link: '/hr/employees',
                icon: 'badge'
            },
            {
                label: 'Requests',
                link: '/hr/requests',
                icon: 'assignment'
            },
            {
                label: 'Attendance',
                link: '/hr/attendance',
                icon: 'access_time'
            },
            {
                label: 'Warnings',
                link: '/hr/warnings',
                icon: 'warning'
            },
            {
                label: 'Announcements',
                link: '/hr/announcements',
                icon: 'announcement'
            },
            {
                label: 'Reports',
                link: '/hr/reports',
                icon: 'bar_chart'
            }
        ]
    }
];
