import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'
import { authRoles } from 'app/auth/authRoles'

const AddHospital = Loadable(lazy(() => import('./AddHospital')))
const AllHospital = Loadable(lazy(() => import('./AllHospital')))

const HospitalRoutes = [
    {
        path: '/api/v1/hospitals/addHospital',
        element: <AddHospital />,
        auth: authRoles.editor,
    },
    {
        path: '/api/v1/hospitals/allHospitals',
        element: <AllHospital />,
        auth: authRoles.editor,
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
