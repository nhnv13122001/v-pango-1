import { createContext, useState, ReactNode } from 'react'
import { AttributeType, ResponseFilterType } from '../types/type'
import { objectToString, stringToObject } from '../utils/utils'

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
  filters: Record<string, ResponseFilterType[]>
  setFilters: (modelId: string, filters: ResponseFilterType[]) => void
}

const initialAppContext: AppContextType = {
  item: null,
  setItem: () => null,
  filters: {},
  setFilters: () => null
}

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext<AppContextType>(initialAppContext)

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [item, setItem] = useState<DataModelType | null>(null)
  const [filters, setFiltersState] = useState<
    Record<string, ResponseFilterType[]>
  >(() => {
    const savedFilters = localStorage.getItem('filters')
    return savedFilters ? stringToObject(savedFilters) : {}
  })

  const setFilters = (modelId: string, newFilters: ResponseFilterType[]) => {
    setFiltersState((prev) => {
      const updatedFilters = { ...prev, [modelId]: newFilters }
      localStorage.setItem('filters', objectToString(updatedFilters))
      return updatedFilters
    })
  }

  return (
    <AppContext.Provider value={{ item, setItem, filters, setFilters }}>
      {children}
    </AppContext.Provider>
  )
}
