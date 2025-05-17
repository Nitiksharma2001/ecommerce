import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../../apis/products/products'
import { getCategories } from '../../apis/products/categories'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function useProducts() {
  const [filters, setFilters] = useState<Record<string, any>>({ page: 1, limit: 10, price_min: 0, price_max: 1000 })
  const [totalNumberOfProducts, setTotalNumberOfProducts] = useState(40)
  const [queryParams, setQueryParams] = useSearchParams()

  function updateFilters(newFilters: Record<string, any>, type = 'update') {
    if (type === 'new') {
      setFilters(newFilters)
    } else {
      setFilters({ ...filters, ...newFilters })
    }
  }

  const filterQuery =
    '?' +
    [
      ...Object.entries(filters)
        .filter(([key]) => key != 'page')
        .map(([key, value]) => `${key}=${value}`),
      `offset=${(filters.page - 1) * filters.limit}`,
    ].join('&')

  const productsResponse = useQuery({
    queryKey: ['products', filters],
    queryFn: () => getProducts(filterQuery),
  })
  useQuery({
    queryKey: ['products', 'total'],
    queryFn: () => getProducts(`?limit=0&offset=0`).then((data) => setTotalNumberOfProducts(data.length)),
  })

  const categoriesResponse = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })

  useEffect(() => {
    const queryFilters = Array.from(queryParams.entries()).reduce((acc, [key, value]) => {
      if (key !== 'offset') {
        acc[key] = value
      }
      return acc
    }, {} as Record<string, string>)

    updateFilters(queryFilters)
  }, [])

  useEffect(() => {
    setQueryParams(filterQuery)
  }, [filterQuery])

  return {
    productsResponse,
    categoriesResponse,
    totalNumberOfProducts,
    filters,
    updateFilters,
  }
}
