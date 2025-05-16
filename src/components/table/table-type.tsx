import { TableProps } from 'antd'

export type DataSourceType = Record<string, any>
export type ColumnType = TableProps<DataSourceType>['columns']
export type FilterType = Record<string, any>

export interface TableJSXProps {
  data: {
    columns: ColumnType
    dataSource: DataSourceType[]
    total: number
  }
  filters: FilterType
  updateFilters: (filters: FilterType) => void
  isPagination?: boolean
  isLoading?: boolean
}
