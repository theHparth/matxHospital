import { combineReducers } from 'redux'
import ScrumBoardReducer from './ScrumBoardReducer'
import NotificationReducer from './NotificationReducer'
import EcommerceReducer from './EcommerceReducer'
import NavigationReducer from './NavigationReducer'
import HospitalReducer from './HospitalReducer'
import VendorReducer from './VendorReducer'
import StockReducer from './StockReducer'
import WareHouseReducer from './WareHouseReducer'
import StockOutReducer from './StockOutReducer'
import StockInUserReducer from './user/StockInUserReducer'

const RootReducer = combineReducers({
    notifications: NotificationReducer,
    navigations: NavigationReducer,
    scrumboard: ScrumBoardReducer,
    ecommerce: EcommerceReducer,
    hospitalList: HospitalReducer,
    vendorList: VendorReducer,
    stockList: StockReducer,
    wareHouseStockList: WareHouseReducer,
    stockOutList: StockOutReducer,
    stockInUserList: StockInUserReducer,
})

export default RootReducer
