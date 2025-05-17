import { apiClientService } from '../instance'

export async function getProducts(filterQuery: string) {
  const { data } = await apiClientService({ url: '/products' + filterQuery })
  return data as any[]
}
