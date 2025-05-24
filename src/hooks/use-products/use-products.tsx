import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../../apis/products/products'
import { getCategories } from '../../apis/products/categories'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function useProducts() {
  const [filters, setFilters] = useState<Record<string, any>>({ page: 1, limit: 10 })
  const [queryParams, setQueryParams] = useSearchParams()

  function updateFilters(newFilters: Record<string, any>, type = 'update') {
    if (type === 'new') {
      setFilters(newFilters)
    } else {
      setFilters({ ...filters, ...newFilters })
    }
  }

  const productsResponse = useQuery({
    queryKey: ['products', filters],
    queryFn: () => getProducts(filters),
  })

  const categoriesResponse = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })

  useEffect(() => {
    const queryFilters = Array.from(queryParams.entries()).reduce((acc, [key, value]) => {
      acc[key] = value
      return acc
    }, {} as Record<string, string>)

    updateFilters(queryFilters)
  }, [])

  useEffect(() => {
    const filterQuery = '?' + [...Object.entries(filters).map(([key, value]) => `${key}=${value}`)].join('&')
    setQueryParams(filterQuery)
  }, [filters])

  return {
    productsResponse,
    categoriesResponse,
    filters,
    updateFilters,
  }
}
