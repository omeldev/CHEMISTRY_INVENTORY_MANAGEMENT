import {createRoot} from 'react-dom/client'
import './style/index.less'

import React from "react"
import {ConfigProvider} from "antd";
import theme from './theme/antdTheme';
import App from "./app/App";

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider theme={theme}>
      <App/>
    </ConfigProvider>
  </React.StrictMode>
)
