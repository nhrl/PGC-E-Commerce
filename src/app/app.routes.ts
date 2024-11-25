import { ViewOrderComponent } from './pages/view-order/view-order.component';
import { NavbarComponent } from './partial/navbar/navbar.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';
import { RegisterComponent } from './pages/register/register.component';
import { MainComponent } from './pages/main/main.component';
import { ConsoleComponent } from './pages/console/console.component';
import { GamesComponent } from './pages/games/games.component';
import { AccessoriesComponent } from './pages/accessories/accessories.component';
import { CartComponent } from './pages/cart/cart.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { SuccessComponent } from './pages/success/success.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';

export const routes: Routes = [
    {
        path: '',
        component:NavbarComponent,
        title: 'PlayGround Central',
       children:[
            {
                path: '',
                component: MainComponent,
            },
            {
                path: 'shop',
                children: [
                    {
                        path: 'console',
                        component: ConsoleComponent
                    },
                    {
                        path: 'games',
                        component: GamesComponent
                    },
                    {
                        path: 'accessories',
                        component: AccessoriesComponent
                    }
                ]
            }
        ]
    },
    {
        path: 'login',
        component:LoginComponent,
        title: 'Login'
    },
    {
        path: 'register',
        component: RegisterComponent,
        title: 'Register'
    },
    {
        path: 'cart',
        component: CartComponent,
        title: 'Cart'
    },
    {
        path: 'payment',
        component:PaymentComponent,
        title: 'Payment'
    },
    {
        path: 'success',
        component:SuccessComponent,
        title: 'Success'
    },
    {
        path: 'edit-profile',
        component:EditProfileComponent,
        title: 'Edit Profile'
    },
    {
        path: 'view-order',
        component:ViewOrderComponent,
        title: 'Order'
    }
];

export default routes;
