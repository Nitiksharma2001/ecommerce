import { Button, Card, Flex, Image, InputNumber, Pagination, Spin, Typography } from 'antd'

import useProducts from '../../hooks/use-products/use-products'
import { GLOBAL_STYLES } from '../../utils/global-styles'
import MainWrapper from '../main'

const { Text } = Typography

const cardTitleStyle = {
  fontWeight: GLOBAL_STYLES['typogrpahy']['weight']['heavy'],
  fontSize: GLOBAL_STYLES['typogrpahy']['size']['title'],
  color: GLOBAL_STYLES['colors']['grey']['7']
}

export default function Home() {
  const { filters, productsResponse, categoriesResponse, updateFilters } = useProducts()

  return (
    <MainWrapper title={'Products'}>
      <Flex vertical gap={'20px'}>
        {productsResponse.isLoading && <Spin size='large' />}
        <Flex gap={'10px'}>
          {categoriesResponse.data?.slice(0, 12).map(({ name, slug }) => (
            <Button
              color={filters['category'] === slug ? 'danger' : 'cyan'}
              variant='solid'
              id={slug}
              key={slug}
              loading={productsResponse.isLoading && filters['category'] === slug}
              onClick={() => updateFilters({ category: slug })}
            >
              {name}
            </Button>
          ))}
        </Flex>
        <Flex align='center' justify='flex-end' gap='30px'>
          <Pagination
            total={productsResponse?.data?.total ?? 0}
            showLessItems
            showSizeChanger
            onChange={(page, limit) => updateFilters({ page, limit })}
          />
          <Button onClick={() => updateFilters({ page: 1, limit: 0 }, 'new')}>Reset Filters</Button>
        </Flex>

        <Flex wrap='wrap' justify='space-between' gap={'10px'}>
          {productsResponse.data?.products?.map((product: any) => (
            <Card
              style={{ width: '300px' }}
              hoverable
              cover={<Image loading='eager' preview alt='not-found' src={product.thumbnail} />}
            >
              <Flex vertical>
                <Text style={cardTitleStyle}>{product.title}</Text>
                <Text style={{ color: 'red', fontSize: GLOBAL_STYLES['typogrpahy']['size']['title'] }} ellipsis={true}>
                  {product.price}$
                </Text>
              </Flex>
            </Card>
          ))}
        </Flex>
      </Flex>
    </MainWrapper>
  )
}
