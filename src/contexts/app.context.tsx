import { createContext, useState, ReactNode } from 'react'

interface AttributeType {
  key: string
  sysIndexKey: string
  name: string
  dataType: string
  refType: null
  ctxMasterDataRef: null
}

export interface DataModelType {
  id: string
  name: string
  category: string
  objectModel: string
  sysModel: boolean
  order: number
  sysIndex: string
  requiredDateField: boolean
  dateFields: string[]
  customerSegment: boolean
  contactEmailSegment: boolean
  contactPhoneSegment: boolean
  leadSegment: boolean
  deviceSegment: boolean
  zouidSegment: boolean
  fbpsidSegment: boolean
  gcidSegment: boolean
  idField: string
  customerField: string | null
  contactEmailField: string | null
  contactPhoneField: string | null
  leadField: string | null
  deviceField: string | null
  zouidField: string | null
  fbpsidField: string | null
  gcidField: string | null
  hasCustomField: boolean
  defaultDateField: string
  defaultEsDateField: string
  attributes: AttributeType[]
  ctxInitCustomField: boolean
  ctxDefaultDateField: string | null
}

interface AppContextType {
  item: DataModelType | null
  setItem: (item: DataModelType | null) => void
}

export const AppContext = createContext<AppContextType>()

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [item, setItem] = useState<DataModelType | null>(null)

  return (
    <AppContext.Provider value={{ item, setItem }}>
      {children}
    </AppContext.Provider>
  )
}
