import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'

const AddStockOutForm = Loadable(lazy(() => import('./AddStockOutForm')))
const PendingStockOut = Loadable(lazy(() => import('./PendingStockOut')))
const AllStockOutTrueStatus = Loadable(
    lazy(() => import('./AllStockOutTrueStatus'))
)

const wereHouseRoutes = [
    {
        path: '/stockOutForm',
        element: <AddStockOutForm />,
    },
    {
        path: '/listStockOut',
        element: <AllStockOutTrueStatus />,
    },
    {
        path: '/pendingStockOut',
        element: <PendingStockOut />,
    },
]

export default wereHouseRoutes
