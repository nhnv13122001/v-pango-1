import 'antd/dist/reset.css'
import { StrictMode } from 'react'
import { ConfigProvider } from 'antd'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App.tsx'
import { AppProvider } from './contexts/app.context.tsx'

const theme = {
  components: {
    Form: {
      itemMarginBottom: 0
    }
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <ConfigProvider theme={theme}>
        <App />
      </ConfigProvider>
    </AppProvider>
  </StrictMode>
)
