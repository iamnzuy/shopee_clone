import { Category } from 'src/types/category.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = '/categories'

const CategoryApi = {
  getCategories: () => http.get<SuccessResponse<Category[]>>(URL)
}

export default CategoryApi
