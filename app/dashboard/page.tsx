"use client";
import {ThemeProvider} from '../themeContext/theme'
import PageComp from '../themeContext/pageComp';
import Header from '../components/header';
import Dashboard from '../components/dashboard';

export default function DashboardPage() {
  
  return (
    <ThemeProvider>
    {/* <PageComp/> */}
    <Header/>
    <Dashboard/>
    </ThemeProvider>
  );
}
