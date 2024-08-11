import classNames from 'classnames'
import { createSearchParams, Link } from 'react-router-dom'
import path from 'src/constants/path'
import { QueryConfig } from 'src/Pages/ProductList/ProductList'

interface paginationProps {
  queryConfig: QueryConfig
  pageSize: number
}

const RANGE = 2

export default function Pagination(props: paginationProps) {
  const { queryConfig, pageSize } = props
  const page = Number(queryConfig.page)

  const renderPagination = () => {
    let dotAfter = false
    let dotBefore = false

    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <span key={index} className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border'>
            ...
          </span>
        )
      }
      return null
    }

    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <span key={index} className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border'>
            ...
          </span>
        )
      }
      return null
    }

    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
          return renderDotAfter(pageNumber)
        } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index)
          } else if (pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
            return renderDotAfter(index)
          }
        } else if (page >= pageSize - RANGE * 2 && pageNumber > RANGE && pageNumber < page - RANGE) {
          return renderDotBefore(index)
        }
        return (
          <Link
            to={{
              pathname: path.home,
              search: createSearchParams({
                ...queryConfig,
                page: pageNumber.toString()
              }).toString()
            }}
            key={index}
            className={classNames('mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm', {
              'border-cyan-500': pageNumber === page,
              'border-transparent': pageNumber !== page
            })}
          >
            {pageNumber}
          </Link>
        )
      })
  }

  return (
    <div className='flex flex-wrap mt-6 justify-center'>
      {page === 1 ? (
        <span className='bg-white/60 cursor-not-allowed rounded px-3 py-2 shadow-sm mx-2 border'>Prev</span>
      ) : (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({
              ...queryConfig,
              page: (page - 1).toString()
            }).toString()
          }}
          className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border'
        >
          Prev
        </Link>
      )}
      {renderPagination()}
      {page === pageSize ? (
        <span className='bg-white/60 cursor-not-allowed rounded px-3 py-2 shadow-sm mx-2 border'>Next</span>
      ) : (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({
              ...queryConfig,
              page: (page + 1).toString()
            }).toString()
          }}
          className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border'
        >
          Next
        </Link>
      )}
    </div>
  )
}
