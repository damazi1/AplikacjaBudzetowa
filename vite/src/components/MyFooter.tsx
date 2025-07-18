import { Layout } from 'antd';
import React from 'react';
import '../styles/MyFooter.css';
const { Footer } = Layout;

const MyFooter: React.FC = () => {
           return(
               <Footer style={{ textAlign: 'center', backgroundColor: '#001529', color: '#a9a9a9' }}>
                   Budget Management ©{new Date().getFullYear()} Created by Dawid Ziora
               </Footer>
           );
        }

export default MyFooter;