"use client";
import {ThemeProvider} from '../themeContext/theme'
import PageComp from '../themeContext/pageComp';
import Header from '../components/header';
import Dashboard from '../components/dashboard';
import {ProtectedRootProvider} from '../protected';
import ProductListComp from '../components/product_list';

export default function ProductListPage() {
  return (
    <ThemeProvider>
      <ProtectedRootProvider>
        {/* <PageComp/> */}
        <Header/>
        <ProductListComp pageName="product-list"/>
      </ProtectedRootProvider>
    </ThemeProvider>
  );
}
