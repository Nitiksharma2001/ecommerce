import { Button, Flex, Switch, Tooltip, Typography, Upload, UploadProps } from 'antd'
import { engineNames } from '../../../utils/constants'
import TableJSX from '../../table/table'
import { UploadOutlined, DownloadOutlined } from '@ant-design/icons'
import AccordionJSX from './accordion'
import { useState } from 'react'
import { FilterType } from '../../table/table-type'
import useParameter from '../../../hooks/table/use-parameter'
import { updateColumns } from '../../table/helper'
import { dataToCSV } from '../../../helper/csv-zip'
import { saveAs } from 'file-saver'
import { uploadData } from '../../../apis/table/upload-data'
import { GLOBAL_STYLES } from '../../../utils/global-styles'
import DropdownJSX from '../../dropdown/dropdown'

const { Title } = Typography

const cardTitleStyle = {
  fontWeight: GLOBAL_STYLES['typogrpahy']['weight']['heavy'],
  fontSize: GLOBAL_STYLES['typogrpahy']['size']['normal'],
  color: GLOBAL_STYLES['colors']['grey']['7'],
}

interface AccordionTableProps {
  engine: (typeof engineNames)[0]
  canDownload?: boolean
  canUpload?: boolean
}

export default function AccordionTableJSX({ engine, canDownload = true, canUpload = true }: AccordionTableProps) {
  const [filters, setFilters] = useState<FilterType>({ page: 1, limit: 10 })
  const { data, isLoading } = useParameter(engine.key, filters)
  const roleStatus = localStorage.getItem('role_ict') ?? ''

  function updateFilters(updateFilters: FilterType) {
    setFilters({ ...filters, ...updateFilters })
  }

  const props: UploadProps = {
    accept: '.csv',
    multiple: false,
    maxCount: 1,
    customRequest: async ({ file, onSuccess, onError }) => {
      try {
        const csvFile = file as File
        const text = await csvFile.text()
        await uploadData(text, engine.title, engine.key)
        onSuccess?.(undefined, file)
      } catch (error) {
        console.error('Upload failed', error)
        onError?.(error as Error)
      }
    },
    beforeUpload: (file) => {
      console.log(file)
    },
  }
  const accordionItem = [
    {
      label: (
        <Flex justify='space-between' align='center'>
          <Title style={cardTitleStyle}>{engine.title}</Title>
          <Flex gap='10px' align='center' onClick={(e) => e.stopPropagation()}>
            {roleStatus === 'admin' && (
              <DropdownJSX
                options={[
                  { label: 'In-Bound', value: 'inbound' },
                  { label: 'Out-Bound', value: 'outbound' },
                ]}
                defaultValue='inbound'
                onChange={(value) => console.log(value)}
              />
            )}
            {canUpload && (
              <Upload {...props}>
                <Tooltip title='You can upload only CSV file'>
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Tooltip>
              </Upload>
            )}

            {canDownload && (
              <Button
                onClick={() =>
                  saveAs(
                    new Blob([dataToCSV(data.dataSource)], { type: 'text/csv;charset=utf-8;' }),
                    engine.title + '.csv'
                  )
                }
                icon={<DownloadOutlined />}
              >
                Download
              </Button>
            )}
          </Flex>
        </Flex>
      ),

      children: (
        <TableJSX
          data={{ ...data, columns: updateColumns(data.columns, data.columnfilters) }}
          isLoading={isLoading}
          isPagination={true}
          filters={filters}
          updateFilters={updateFilters}
        />
      ),
    },
  ]

  return <AccordionJSX items={accordionItem} />
}
