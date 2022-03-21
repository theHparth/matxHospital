export const navigations = [
    {
        name: 'Dashboard',
        path: '/dashboard/default',
        icon: 'dashboard',
    },
    {
        label: 'PAGES',
        type: 'label',
    },
    {
        name: 'Hospitals',
        icon: 'library_add',
        children: [
            {
                name: 'Add Hospital',
                iconText: 'SI',
                path: '/addHospital',
            },
            {
                name: 'Hospital List',
                iconText: 'SI',
                path: '/allHospitals',
            },
        ],
    },
    {
        name: 'Vendor',
        icon: 'person_add',
        children: [
            {
                name: 'Add Vendor',
                iconText: 'SI',
                path: '/addVendor',
            },
            {
                name: 'Vendor List',
                iconText: 'SI',
                path: '/allVendor',
            },
        ],
    },
    {
        name: 'Stocks',
        icon: 'business',
        children: [
            {
                name: 'Add Stock',
                iconText: 'SI',
                path: '/addStock',
            },
            {
                name: 'Stock List',
                iconText: 'SI',
                path: '/allStock',
            },
        ],
    },
    {
        name: 'Werehouse',
        icon: 'business',
        children: [
            {
                name: 'Stock Add',
                iconText: 'SI',
                path: '/addStockInWereHouse',
            },
            {
                name: 'Stock In report',
                iconText: 'SI',
                path: '/wereHouseStock',
            },
            {
                name: 'Stock Summery',
                iconText: 'SI',
                path: '/totoalStock',
            },
        ],
    },
    {
        name: 'Stock-Out',
        icon: 'business',
        children: [
            {
                name: 'Form',
                iconText: 'SI',
                path: '/stockOutForm',
            },
            {
                name: 'Stock out data',
                iconText: 'SI',
                path: '/listStockOut',
            },
            {
                name: 'Pending List',
                iconText: 'SI',
                path: '/pendingStockOut',
            },
        ],
    },

    // {
    //     name: 'Session/Auth',
    //     icon: 'security',
    //     children: [
    //         {
    //             name: 'Sign in',
    //             iconText: 'SI',
    //             path: '/session/signin',
    //         },
    //         {
    //             name: 'Sign up',
    //             iconText: 'SU',
    //             path: '/session/signup',
    //         },
    //         {
    //             name: 'Forgot Password',
    //             iconText: 'FP',
    //             path: '/session/forgot-password',
    //         },
    //         {
    //             name: 'Error',
    //             iconText: '404',
    //             path: '/session/404',
    //         },
    //     ],
    // },
    // {
    //     label: 'Components',
    //     type: 'label',
    // },
    {
        name: 'Components',
        icon: 'favorite',
        badge: { value: '30+', color: 'secondary' },
        children: [
            {
                name: 'Auto Complete',
                path: '/material/autocomplete',
                iconText: 'A',
            },
            {
                name: 'Buttons',
                path: '/material/buttons',
                iconText: 'B',
            },
            {
                name: 'Checkbox',
                path: '/material/checkbox',
                iconText: 'C',
            },
            {
                name: 'Dialog',
                path: '/material/dialog',
                iconText: 'D',
            },
            {
                name: 'Expansion Panel',
                path: '/material/expansion-panel',
                iconText: 'E',
            },
            {
                name: 'Form',
                path: '/material/form',
                iconText: 'F',
            },
            {
                name: 'Icons',
                path: '/material/icons',
                iconText: 'I',
            },
            {
                name: 'Menu',
                path: '/material/menu',
                iconText: 'M',
            },
            {
                name: 'Progress',
                path: '/material/progress',
                iconText: 'P',
            },
            {
                name: 'Radio',
                path: '/material/radio',
                iconText: 'R',
            },
            {
                name: 'Switch',
                path: '/material/switch',
                iconText: 'S',
            },
            {
                name: 'Slider',
                path: '/material/slider',
                iconText: 'S',
            },
            {
                name: 'Snackbar',
                path: '/material/snackbar',
                iconText: 'S',
            },
            {
                name: 'Table',
                path: '/material/table',
                iconText: 'T',
            },
        ],
    },
    {
        name: 'Charts',
        icon: 'trending_up',

        children: [
            {
                name: 'Echarts',
                path: '/charts/echarts',
                iconText: 'E',
            },
        ],
    },
    {
        name: 'Documentation',
        icon: 'launch',
        type: 'extLink',
        path: 'http://demos.ui-lib.com/matx-react-doc/',
    },
]
