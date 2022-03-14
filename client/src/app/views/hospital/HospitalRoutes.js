import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'

const AddHospital = Loadable(lazy(() => import('./AddHospital')))
const AllHospital = Loadable(lazy(() => import('./AllHospital')))

const HospitalRoutes = [
    {
        path: '/addHospital',
        element: <AddHospital />,
    },
    {
        path: '/allHospitals',
        element: <AllHospital />,
    },
    // {
    //     path: '/api/v1/hospitals/editHospitals',
    //     element: <AppEchart />,
    //     auth: authRoles.editor,
    // },
    // {
    //     path: '/api/v1/hospitals/deleteHospitals',
    //     element: <AppEchart />,
    //     auth: authRoles.editor,
    // },
]

export default HospitalRoutes
