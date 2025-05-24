import { apiClientService } from '../instance'

export async function getProducts(filters: Record<string, any>) {
  const productApiDict = ['page', 'limit', 'category', 'price']
  const { category, ...rest } = filters
  const filterQuery =
    '?' +
    [
      ...Object.entries(rest)
        .filter(([key]) => productApiDict.includes(key))
        .map(([key, value]) => {
          if (key === 'page') {
            return `skip=${(!isNaN(filters?.page) ? filters?.page : 0) * value}`
          }
          return `${key}=${value}`
        }),
    ].join('&')

  const { data } = await apiClientService({
    url: '/products/category/' + (filters.category ?? 'home-decoration') + filterQuery,
  })
  return data as any
}
