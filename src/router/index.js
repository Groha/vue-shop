import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../pages/HomePage'
import ProductDetails from '../pages/ProductDetails'
import CartDetails from '../pages/CartDetails'
import NotFound from '../pages/NotFoundPage'

const routes = [
    { path: '/', name: 'home', component: HomePage },
    { path: '/product/:id', name: 'product', component: ProductDetails },
    { path: '/cart', name: 'cart', component: CartDetails },
    { path: '/:pathMatch(.*)*', name: 'notFound', component: NotFound }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router