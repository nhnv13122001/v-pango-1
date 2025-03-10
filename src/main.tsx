import 'antd/dist/reset.css'
import { StrictMode } from 'react'
import { ConfigProvider } from 'antd'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App.tsx'
import { AppProvider } from './contexts/app.context.tsx'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <AppProvider>
    <ConfigProvider>
      <App />
    </ConfigProvider>
  </AppProvider>
  // </StrictMode>
)
