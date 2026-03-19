"use client";
import {ThemeProvider} from '../themeContext/theme'
import PageComp from '../themeContext/pageComp';
import Header from '../components/header';
import Dashboard from '../components/dashboard';
import {ProtectedRootProvider} from '../protected';
import OrderListComp from '../components/orders_list';

export default function OrdersList(){
    return <ThemeProvider>
          <ProtectedRootProvider>
            {/* <PageComp/> */}
            <Header/>
            <OrderListComp pageName="product-list"/>
          </ProtectedRootProvider>
        </ThemeProvider>
}