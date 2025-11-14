import { Layout } from 'antd';
import React from 'react';
import {useTranslation} from "react-i18next";
const { Footer } = Layout;

const MyFooter: React.FC = () => {
    const {t} = useTranslation();
           return(
               <Footer style={{ textAlign: 'center', borderTop: '1px solid'}}>
                   Budget Management ©{new Date().getFullYear()} {t("Created by")} Dawid Ziora
               </Footer>
           );
        }

export default MyFooter;