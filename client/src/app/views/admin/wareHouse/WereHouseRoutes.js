import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'

const AddStockInWereHouse = Loadable(
    lazy(() => import('./AddStockInWereHouse'))
)

const AddStockOutForm = Loadable(lazy(() => import('./AddStockOutForm')))

const WereHouseStock = Loadable(lazy(() => import('./WereHouseStock')))

const wereHouseRoutes = [
    {
        path: '/addStockInWereHouse',
        element: <AddStockOutForm />,
    },
    {
        path: '/wereHouseStock',
        element: <WereHouseStock />,
    },
    {
        path: '/wereHouseStock/:vendorname',
        element: <WereHouseStock />,
    },
]

export default wereHouseRoutes
