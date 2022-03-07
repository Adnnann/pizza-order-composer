import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/core/Header'
import Home from './components/cart/Home';
import Order from './components/order/Order'
import Signin from './components/user/Signin';
import Signup from './components/user/Signup';
import AddToCart from './components/cart/AddToCart';
import OrderHistory from './components/order/OrderHistory';
import OrderWindowModal from './components/order/OrderModalWindow';

const MainRouter = () => {

    return(
        <Router>
        <Header />
        <Signin />
        <Signup />
        <OrderWindowModal />
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/addToCart' element={<AddToCart />}></Route>
                <Route path='/order' element={<Order />}></Route>
                <Route path='/orderHistory' element={<OrderHistory />}></Route>
            </Routes>
        </Router>
    )
}

export default MainRouter