import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'

const AddStockInWereHouse = Loadable(
    lazy(() => import('./AddStockInWereHouse'))
)
const WereHouseStock = Loadable(lazy(() => import('./WereHouseStock')))

const wereHouseRoutes = [
    {
        path: '/addStockInWereHouse',
        element: <AddStockInWereHouse />,
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
