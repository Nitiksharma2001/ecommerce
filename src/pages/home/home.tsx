import MainWrapper from '../main'
import { Button, Card, Flex, Image, Pagination, Spin, Typography } from 'antd'
import { GLOBAL_STYLES } from '../../utils/global-styles'
import useProducts from '../../hooks/use-products/use-products'

const { Text } = Typography

const cardTitleStyle = {
  fontWeight: GLOBAL_STYLES['typogrpahy']['weight']['heavy'],
  fontSize: GLOBAL_STYLES['typogrpahy']['size']['title'],
  color: GLOBAL_STYLES['colors']['grey']['7'],
}

export default function Home() {
  const { filters, productsResponse, categoriesResponse, totalNumberOfProducts, updateFilters } = useProducts()

  return (
    <MainWrapper title={'Products'}>
      <Flex vertical gap={'20px'} align='center'>
        {productsResponse.isLoading && <Spin size='large' />}
        <Flex gap={'10px'}>
          {categoriesResponse.data?.slice(0, 10).map(({ id, name, slug }) => (
            <Button
              color={filters['categorySlug'] === slug ? 'danger' : 'cyan'}
              variant='solid'
              id={id}
              key={slug}
              loading={productsResponse.isLoading && filters['categorySlug'] === slug}
              onClick={() => updateFilters({ categorySlug: slug })}
            >
              {name}
            </Button>
          ))}
        </Flex>
        <Pagination
          total={totalNumberOfProducts}
          showLessItems
          showSizeChanger
          showQuickJumper
          onChange={(page, limit) => updateFilters({ page, limit })}
        />

        <Flex wrap='wrap' justify='center' gap={'10px'}>
          {productsResponse.data?.map((product) => (
            <Card style={{ width: '300px' }} hoverable cover={<Image alt='not-found' src={product.images[0]} />}>
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
