import { Link } from 'react-router-dom'

import { Avatar, Button, Flex, Popconfirm, Tag, Typography } from 'antd'

import { PromiseColumnType, PromiseColumnfiltersType } from '../../apis/table/table'
import { ColumnType } from './table-type'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { deleteUser } from '../../apis/admin/admin'
import { openDrawer } from '../../redux/drawer-slice/drawer-slice'
import { AddUpdateUser } from '../../pages/user-management/update-add-user'
import { AppDispatch } from '../../redux/store'
import { useAppDispatch } from '../../redux/hooks'

const { Text } = Typography

const filterOnColumns = [
  'division',
  'category',
  'segment',
  'region',
  'city',
  'locationType',
  'sourceWarehouseOrSupplier',
  'location',
  'supplierSite',
  'sourceWarehouseOrSupplierSite',
]

export function updateColumns(columns: PromiseColumnType[], columnfilters?: PromiseColumnfiltersType[]): ColumnType {
  const dispatch = useAppDispatch<AppDispatch>()
  function addDataIndex() {
    return columns.map((col) => {
      return { ...col, dataIndex: col.key }
    })
  }

  return addDataIndex()
    .filter((col) => col.key !== 'key')
    .map((col) => {
      const filterColumn = columnfilters?.find((value) => value.key === col.key)!
      if (col.key === 'currentStatus') {
        return {
          ...col,
          render: ({ key, title }: { key: string; title: string }) => (
            <Tag style={{ textTransform: 'capitalize', color: 'black' }} color={key === 'DONE' ? '#FCF2CF' : '#ACECBE'}>
              {title}
            </Tag>
          ),
        }
      }

      if (col.key === 'remark') {
        return {
          ...col,
          render: (value: Record<string, string>, record: any) => {
            const isDisabled = record.currentStatus.key === 'INPROGRESS'
            const linkStyle: React.CSSProperties = { textDecoration: 'underline', color: '#1890ff', textWrap: 'nowrap' }

            return isDisabled ? (
              <span style={{ color: 'rgba(0,0,0,0.25)', textDecoration: 'underline', textWrap: 'nowrap' }}>
                view details
              </span>
            ) : (
              <Link to={`/what-if-analysis/view-details/${record.id}`} style={linkStyle}>
                view details
              </Link>
            )
          },
        }
      }

      if (col.key === 'createdBy') {
        return {
          ...col,
          render: ({ avatar, name }: { avatar: string; name: string }) => (
            <Flex gap='4px' align='center'>
              <Avatar src={avatar} size={30}></Avatar>
              <Text style={{ textWrap: 'nowrap', fontSize: '12px' }}>{name}</Text>
            </Flex>
          ),
        }
      }

      if (col.key === 'edit') {
        return {
          ...col,
          render: (_, record) => (
            <Button
              color='danger'
              variant='text'
              icon={<EditOutlined />}
              onClick={() => {
                dispatch(
                  openDrawer({
                    details: {
                      title: 'Updata the User',
                      content: <AddUpdateUser type='update' userDetails={record} />,
                    },
                  })
                )
              }}
            ></Button>
          ),
        }
      }
      if (col.key === 'delete') {
        return {
          ...col,
          render: (_, record) => (
            <Popconfirm
              title={'Delete user'}
              description={'Do you want to delete the user with email: ' + record['email_id']}
              onConfirm={async () => {
                await deleteUser({ email_id: record['email_id'] })
                window.location.reload()
              }}
              okText='Yes'
              cancelText='No'
            >
              <Button color='danger' variant='text' icon={<DeleteOutlined />}></Button>
            </Popconfirm>
          ),
        }
      }

      return {
        ...col,
        ...(filterColumn &&
          filterOnColumns.includes(filterColumn['key']) && {
            filters: filterColumn['options'].map((value) => {
              return { text: value, value }
            }),
          }),
        render: (text: string) => <Text style={{ textWrap: 'nowrap', fontSize: '12px' }}>{text}</Text>,
      }
    })
}
