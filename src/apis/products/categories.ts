import { apiClientService } from '../instance'

export async function getCategories() {
  const { data } = await apiClientService({ url: '/categories' })
  return data as any[]
}
