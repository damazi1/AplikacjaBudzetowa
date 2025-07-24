import { Layout } from 'antd';
import React from 'react';
import '../styles/MyFooter.css';
const { Footer } = Layout;

const MyFooter: React.FC = () => {
           return(
               <Footer style={{ textAlign: 'center', borderTop: '1px solid'}}>
                   Budget Management ©{new Date().getFullYear()} Created by Dawid Ziora
               </Footer>
           );
        }

export default MyFooter;