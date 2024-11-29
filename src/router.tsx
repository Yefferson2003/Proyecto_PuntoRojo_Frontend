import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoaderView from "./views/LoaderView";

// Lazy loading para las vistas y layouts
const IndexLayout = lazy(() => import('@/layouts/IndexLayout'))
const HomeView = lazy(() => import('@/views/HomeView'))
const About = lazy(() => import('@/components/about/About'))

const Register = lazy(() => import("@/views/auth/RegisterView"));
const Map = lazy(() => import("./components/about/Map"));
const Privacy = lazy(() => import("./components/about/Privacy"));
const Service = lazy(() => import("./components/about/Service"));
const ProductOverwies = lazy(() => import("./components/products/ProductOverwies"));
const AuthLayout = lazy(() => import("./layouts/AuthLayout"));
const CustomerLayout = lazy(() => import("./layouts/CustomerLayout"));
const CartView = lazy(() => import("./views/CartView"));
const Error404 = lazy(() => import("./views/Error404"));
const PaymentProcess = lazy(() => import("./views/PaymentProcessView"));
const ConfirmAccountView = lazy(() => import("./views/auth/ConfirmAccountView"));
const ForgotPasswordView = lazy(() => import("./views/auth/ForgotPasswordView"));
const Login = lazy(() => import("./views/auth/LoginView"));
const NewPasswordView = lazy(() => import("./views/auth/NewPasswordView"));
const ResquestNewCodeView = lazy(() => import("./views/auth/ResquestNewCodeView"));
const CategoryView = lazy(() => import("./views/dashboardAdmin/CategoryView"));
const CustomersView = lazy(() => import("./views/dashboardAdmin/CustomersView"));
const DashboardAdminView = lazy(() => import("./views/dashboardAdmin/DashboardAdminView"));
const DeliverysView = lazy(() => import("./views/dashboardAdmin/DeliverysView"));
const MessageView = lazy(() => import("./views/dashboardAdmin/MessageView"));
const OrderHistory = lazy(() => import("./views/dashboardAdmin/OrderHistory"));
const OrderView = lazy(() => import("./views/dashboardAdmin/OrderView"));
const ProductView = lazy(() => import("./views/dashboardAdmin/ProductView"));
const StatisticsView = lazy(() => import("./views/dashboardAdmin/StatisticsView"));
const OrdersCustomerView = lazy(() => import("./views/dashboardCustomer/OrdersCustomerView"));
const ProfileView = lazy(() => import("./views/dashboardCustomer/ProfileView"));
const ReviewsView = lazy(() => import("./views/dashboardCustomer/ReviewsView"));
const ProductsFilters = lazy(() => import("./views/productsFilters/ProductsFiltersView"));
const ProductsSearchView = lazy(() => import("./views/productsFilters/ProductsSearchView"));
const DeliveryManLayout = lazy(() => import("./layouts/DeliveryManLayout"));
const ProfileDeliveryMan = lazy(() => import("./views/dashboardDeliveryMan/ProfileDeliveryManView"));
const OrdersDeliveryManView = lazy(() => import("./views/dashboardDeliveryMan/OrdersDeliveryMan.View"));
const OrderHistoryDeliveryMan = lazy(() => import("./views/dashboardDeliveryMan/OrderHistoryDeliveryMan"));

export default function Router() {
    return(
        <>
        <BrowserRouter>
        <Suspense fallback={<LoaderView/>}>
            <Routes>
                <Route path="*" element={<Error404/>}/>
                <Route element={<IndexLayout/>}>
                    
                    <Route path="/" element={<HomeView/>} index/>
                    
                    <Route path="/about" element={<About/>}/>
                    <Route path="/polices/privacy" element={<Privacy/>}/>
                    <Route path="/polices/service" element={<Service/>}/>
                    <Route path="/map" element={<Map/>}/>

                    <Route path="/collections/:category/:categoryId" element={<ProductsFilters/>}/>
                    <Route path="/collections/:category/:subCategory/:subCategoryId" element={<ProductsFilters/>}/>

                    <Route path="/collections/:category/:subCategory/:subCategoryId/products/:productId" element={<ProductOverwies/>}/>
                    <Route path="/collections/:category/:categoryId/products/:productId" element={<ProductOverwies/>}/>
                    <Route path="/products/:productId" element={<ProductOverwies/>}/>

                    <Route path="/search/:search" element={<ProductsSearchView/>}/>
                    <Route path="/search/:search/products/:productId" element={<ProductOverwies/>}/>

                    <Route path="/cart" element={<CartView/>}/>
                    <Route path="/checkouts" element={<PaymentProcess/>}/>
                </Route>
                

                <Route element={<AuthLayout/>}>
                    <Route path="/auth/login" element={<Login/>} />
                    <Route path="/auth/register" element={<Register/>} />
                    <Route path="/auth/confirm-account" element={<ConfirmAccountView/>} />
                    <Route path="/auth/new-code" element={<ResquestNewCodeView/>} />
                    <Route path="/auth/forgot-password" element={<ForgotPasswordView/>} />
                    <Route path="/auth/new-password" element={<NewPasswordView/>} />
                </Route>

                
                <Route path="/404" element={<Error404/>} />

                <Route element={<DashboardAdminView/>}>
                    <Route path="/dashboard+admin" element={<StatisticsView/>}/>
                    <Route path="/dashboard+admin/products" element={<ProductView/>}/>
                    <Route path="/dashboard+admin/categories" element={<CategoryView/>}/>
                    <Route path="/dashboard+admin/orders" element={<OrderView/>}/>
                    <Route path="/dashboard+admin/orders+history" element={<OrderHistory/>}/>
                    <Route path="/dashboard+admin/deliverys" element={<DeliverysView/>}/>
                    <Route path="/dashboard+admin/messages" element={<MessageView/>}/>
                    <Route path="/dashboard+admin/customers" element={<CustomersView/>}/>
                </Route>

                <Route element={<CustomerLayout/>}>
                    <Route path="/dashboard+customer" element={<ProfileView/>}/>
                    <Route path="/dashboard+customer/orders" element={<OrdersCustomerView/>}/>
                    <Route path="/dashboard+customer/reviews" element={<ReviewsView/>}/>
                </Route>

                <Route element={<DeliveryManLayout/>}>
                    <Route path="/dashboard+deliveryMan" element={<ProfileDeliveryMan/>}/>
                    <Route path="/dashboard+deliveryMan/orders" element={<OrdersDeliveryManView/>}/>
                    <Route path="/dashboard+customer/orders+history" element={<OrderHistoryDeliveryMan/>}/>
                </Route>
            </Routes>
        </Suspense>
        </BrowserRouter>
        </>
    )
}