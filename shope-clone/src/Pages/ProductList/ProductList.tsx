import { keepPreviousData, useQuery } from '@tanstack/react-query'
import AsideFilter from './Components/AsideFilter'
import Product from './Components/Product/Product'
import SortProductList from './Components/SortProductList'
import productApi from 'src/apis/product.api'
import Pagination from 'src/components/Pagination'
import { ProductListConfig } from 'src/types/product.type'
import CategoryApi from 'src/apis/category.api'
import useQueryConfig from 'src/hooks/useQueryConfig'

export default function ProductList() {
  const queryConfig = useQueryConfig()

  const { data: ProductsData } = useQuery({
    queryKey: ['/products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    },
    placeholderData: keepPreviousData,
    staleTime: 3 * 60 * 1000
  })

  const { data: CategoriesData } = useQuery({
    queryKey: ['/categories'],
    queryFn: () => {
      return CategoryApi.getCategories()
    }
  })

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        {ProductsData && (
          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-3'>
              {CategoriesData && <AsideFilter categories={CategoriesData.data.data || []} queryConfig={queryConfig} />}
            </div>
            <div className='col-span-9'>
              <SortProductList queryConfig={queryConfig} pageSize={ProductsData.data.data.pagination.page_size} />
              <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
                {ProductsData.data.data.products.map((product) => (
                  <div className='col-span-1' key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
              <Pagination queryConfig={queryConfig} pageSize={ProductsData.data.data.pagination.page_size} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
