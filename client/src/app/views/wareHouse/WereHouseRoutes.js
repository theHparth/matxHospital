import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'

const AddStockInWereHouse = Loadable(
    lazy(() => import('./AddStockInWereHouse'))
)
const WereHouseStock = Loadable(lazy(() => import('./WereHouseStock')))
const TotalStock = Loadable(lazy(() => import('./TotalStock')))

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
        path: '/totoalStock',
        element: <TotalStock />,
    },
]

export default wereHouseRoutes
