import { apiClientService } from '../instance'

export async function getCategories() {
  const { data } = await apiClientService({ url: '/products/categories' })
  return data as any[]
}
