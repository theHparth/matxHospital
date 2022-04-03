import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'

const AddHospital = Loadable(lazy(() => import('./AddHospital')))
const AllHospital = Loadable(lazy(() => import('./AllHospital')))
const Invoice = Loadable(
    lazy(() => import('./hospital-viewer/invoice/InvoiceDetails'))
)
const HospitalView = Loadable(
    lazy(() => import('./hospital-viewer/HospitalViewer'))
)
// const IndividualHospitalStock = Loadable(
//     lazy(() => import('./IndividualHospitalStock'))
// )

const hospitalRoutes = [
    // {
    //     path: '/addHospital',
    //     element: <AddHospital />,
    // },
    {
        path: '/allHospitals',
        element: <AllHospital />,
    },

    // {
    //     path: '/hospitalData/:id',
    //     element: <IndividualHospitalStock />,
    // },
    {
        path: '/hospitalData/:id',
        element: <HospitalView />,
    },
    {
        path: '/invoice',
        element: <Invoice />,
    },
]

export default hospitalRoutes
