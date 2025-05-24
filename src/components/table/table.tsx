import { useState } from 'react'

import { Button, Flex, InputNumber, Pagination, Select, Space, Table, Typography } from 'antd'

import { GLOBAL_STYLES } from '../../utils/global-styles'
import { DataSourceType, TableJSXProps } from './table-type'

const { Text } = Typography

export default function TableJSX({
  data,
  filters,
  updateFilters,
  isPagination = false,
  isLoading = false
}: TableJSXProps) {
  const [goToPage, setGoToPage] = useState(1)
  const { columns, dataSource, total } = data

  const page = Number(filters['page']) ?? 1
  const limit = Number(filters['limit']) ?? 10

  return (
    <Space direction='vertical' size='large' style={{ width: '100%' }}>
      <Table<DataSourceType>
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        loading={isLoading}
        scroll={{ x: '1000' }}
        onChange={(_, cascadingFilters) => updateFilters(cascadingFilters)}
        style={{
          border: `1px solid ${GLOBAL_STYLES['table']['primaryColor']}`,
          borderRadius: GLOBAL_STYLES['primaryRadius']
        }}
      />

      {isPagination && (
        <Flex justify='flex-end' align='center' gap='40px'>
          <Text style={{ textWrap: 'nowrap', fontSize: 'inherit', color: '#C6C7C8' }}>
            Showing {(page - 1) * limit} - {(page - 1) * limit + dataSource.length} of {total} items
          </Text>
          <Flex align='center' justify='space-between' gap='10px'>
            <Flex gap='5px' align='center'>
              <Text style={{ textWrap: 'nowrap', fontSize: 'inherit' }}>Results per page</Text>
              <Select
                value={limit}
                disabled={isLoading}
                onChange={(limit: number) => updateFilters({ limit })}
                options={[
                  { value: 10, label: '10 / Page' },
                  { value: 20, label: '20 / Page' },
                  { value: 50, label: '50 / Page' }
                ]}
              />
            </Flex>

            <Pagination
              current={page}
              disabled={isLoading}
              total={total}
              onChange={(page: number) => updateFilters({ page })}
              showSizeChanger={false}
              style={{ fontSize: 'inherit' }}
              size='small'
            />

            <Flex gap='5px' align='center'>
              <Text style={{ textWrap: 'nowrap', fontSize: 'inherit' }}>Go to page</Text>
              <InputNumber
                min={1}
                max={Math.ceil(total / limit)}
                size='middle'
                style={{ width: '50px' }}
                value={goToPage}
                onChange={(value) => setGoToPage(value ?? 1)}
                disabled={isLoading}
              />

              <Button
                style={{ fontSize: 'inherit' }}
                disabled={isLoading}
                onClick={() => updateFilters({ page: goToPage })}
              >
                Go
              </Button>
            </Flex>
          </Flex>
        </Flex>
      )}
    </Space>
  )
}
