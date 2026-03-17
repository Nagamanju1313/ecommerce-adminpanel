"use client";
import {ThemeProvider} from '../themeContext/theme'
import PageComp from '../themeContext/pageComp';
import Header from '../components/header';
import Dashboard from '../components/dashboard';
import {ProtectedRootProvider} from '../protected';
import CategoriesListComp from '../components/categories_list';

export default function CategoriesListPage() {
  return (
    <ThemeProvider>
      <ProtectedRootProvider>
        {/* <PageComp/> */}
        <Header/>
        <CategoriesListComp pageName="product-list"/>
      </ProtectedRootProvider>
    </ThemeProvider>
  );
}
