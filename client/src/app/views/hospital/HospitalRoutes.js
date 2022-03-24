import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'

const AddHospital = Loadable(lazy(() => import('./AddHospital')))
const AllHospital = Loadable(lazy(() => import('./AllHospital')))
const IndividualHospitalStock = Loadable(
    lazy(() => import('./IndividualHospitalStock'))
)

const hospitalRoutes = [
    {
        path: '/addHospital',
        element: <AddHospital />,
    },
    {
        path: '/allHospitals',
        element: <AllHospital />,
    },
    {
        path: '/hospitalData/:id',
        element: <IndividualHospitalStock />,
    },
]

export default hospitalRoutes
