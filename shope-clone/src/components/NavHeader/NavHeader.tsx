import { useContext } from 'react'
import Popover from '../Popover'
import { AppContext } from 'src/contexts/app.context'
import { Link } from 'react-router-dom'
import path from 'src/constants/path'
import { useMutation } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'
import { queryClient } from 'src/main'
import { purchasesStatus } from 'src/constants/purchases'

export default function NavHeader() {
  const { profile, isAuthenticated, setIsAuthenticated, setProfile } = useContext(AppContext)

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
      queryClient.removeQueries({ queryKey: ['purchase', { status: purchasesStatus.inCart }] })
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  return (
    <div className='flex justify-end'>
      <Popover
        className='flex items-center py-1 hover:text-gray-300 cursor-pointer'
        renderPopover={
          <div className='bg-white relative shadow-md rounded-sm border border-gray-200'>
            <div className='flex flex-col py-2 pr-16 pl-1'>
              <button className='py-3 px-3 hover:text-orange'>Tiếng việt</button>
              <button className='py-3 px-3 hover:text-orange'>Endglish</button>
            </div>
          </div>
        }
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='size-5'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418'
          />
        </svg>

        <span className='mx-1'>Tiếng Việt</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='size-5'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' />
        </svg>
      </Popover>
      {isAuthenticated && (
        <Popover
          as='span'
          className='flex items-center py-1 hover:text-gray-300 cursor-pointer ml-6'
          renderPopover={
            <div className='bg-white relative shadow-md rounded-sm border border-gray-200'>
              <Link
                to={path.profile}
                className='block py-3 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500 w-full text-left'
              >
                Tài khoản của tôi
              </Link>
              <Link to='/' className='block py-3 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500 w-full text-left'>
                Đơn mua
              </Link>
              <button
                onClick={handleLogout}
                className='block py-3 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500 w-full text-left'
              >
                Đăng xuất
              </button>
            </div>
          }
        >
          <div className='w-5 h-5 mr-2 flex-shrink-0'>
            <svg
              className='w-[1.25rem] mr-[12px] border-[1px] border-white rounded-full px-[2px] py-[2px]'
              width='1.25rem'
              height='1.25rem'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g clipPath='url(#clip0_1_2598)'>
                <path
                  d='M12 11.9999C13.1867 11.9999 14.3467 11.648 15.3334 10.9887C16.3201 10.3294 17.0892 9.39234 17.5433 8.29598C17.9974 7.19963 18.1162 5.99323 17.8847 4.82934C17.6532 3.66545 17.0818 2.59635 16.2426 1.75724C15.4035 0.918125 14.3344 0.34668 13.1705 0.115169C12.0067 -0.116342 10.8003 0.00247765 9.7039 0.456603C8.60754 0.910729 7.67047 1.67976 7.01118 2.66646C6.35189 3.65315 6 4.81319 6 5.99988C6.00159 7.59069 6.63424 9.11589 7.75911 10.2408C8.88399 11.3656 10.4092 11.9983 12 11.9999ZM12 1.99988C12.7911 1.99988 13.5645 2.23448 14.2223 2.674C14.8801 3.11353 15.3928 3.73824 15.6955 4.46915C15.9983 5.20005 16.0775 6.00432 15.9231 6.78024C15.7688 7.55617 15.3878 8.2689 14.8284 8.82831C14.269 9.38772 13.5563 9.76868 12.7804 9.92302C12.0044 10.0774 11.2002 9.99815 10.4693 9.6954C9.73836 9.39265 9.11365 8.87996 8.67412 8.22216C8.2346 7.56436 8 6.79101 8 5.99988C8 4.93901 8.42143 3.9216 9.17157 3.17145C9.92172 2.42131 10.9391 1.99988 12 1.99988Z'
                  fill='#ffffff'
                ></path>
                <path
                  d='M12 14.0006C9.61386 14.0033 7.32622 14.9523 5.63896 16.6396C3.95171 18.3268 3.00265 20.6145 3 23.0006C3 23.2658 3.10536 23.5202 3.29289 23.7077C3.48043 23.8953 3.73478 24.0006 4 24.0006C4.26522 24.0006 4.51957 23.8953 4.70711 23.7077C4.89464 23.5202 5 23.2658 5 23.0006C5 21.1441 5.7375 19.3636 7.05025 18.0509C8.36301 16.7381 10.1435 16.0006 12 16.0006C13.8565 16.0006 15.637 16.7381 16.9497 18.0509C18.2625 19.3636 19 21.1441 19 23.0006C19 23.2658 19.1054 23.5202 19.2929 23.7077C19.4804 23.8953 19.7348 24.0006 20 24.0006C20.2652 24.0006 20.5196 23.8953 20.7071 23.7077C20.8946 23.5202 21 23.2658 21 23.0006C20.9974 20.6145 20.0483 18.3268 18.361 16.6396C16.6738 14.9523 14.3861 14.0033 12 14.0006Z'
                  fill='#ffffff'
                ></path>
              </g>
              <defs>
                <clipPath id='clip0_1_2598'>
                  <rect width='1.25rem' height='1.25rem' fill='white'></rect>
                </clipPath>
              </defs>
            </svg>
          </div>
          <div>{profile?.name}</div>
        </Popover>
      )}

      {!isAuthenticated && (
        <div className='flex items-center'>
          <Link to={path.login} className='mx-3 capitalize hover: text-white/70'>
            Đăng nhập
          </Link>
          <div className='border-r-[1px] border-r-white/40 h-4'></div>
          <Link to={path.register} className='mx-3 capitalize hover: text-white/70'>
            Đăng ký
          </Link>
        </div>
      )}
    </div>
  )
}
