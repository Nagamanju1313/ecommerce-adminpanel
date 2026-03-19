"use client";
import {ThemeProvider} from '../themeContext/theme'
import PageComp from '../themeContext/pageComp';
import Header from '../components/header';
import Dashboard from '../components/dashboard';
import {ProtectedRootProvider} from '../protected';
import UserListComp from '../components/users_list';

export default function UsersList(){
    return <ThemeProvider>
          <ProtectedRootProvider>
            {/* <PageComp/> */}
            <Header/>
            <UserListComp pageName="product-list"/>
          </ProtectedRootProvider>
        </ThemeProvider>
}