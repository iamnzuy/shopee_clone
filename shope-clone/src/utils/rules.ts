// import { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'

// type Rules = {
//   [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions
// }

// export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
//     email: {
//         required: {
//             value: true,
//             message: "Bắt buộc điền email",
//         },
//         pattern: {
//             value: /^\S+@\S+\.\S+$/,
//             message: "Email không đúng định dạng",
//         },
//         maxLength: {
//             value: 160,
//             message: "Email không quá 160 ký tự",
//         },
//         minLength: {
//             value: 5,
//             message: "Email không ít hơn 5 ký tự",
//         },
//     },
//     password: {
//         required: {
//             value: true,
//             message: "Bắt buộc điền password",
//         },
//         maxLength: {
//             value: 160,
//             message: "Password không quá 160 ký tự",
//         },
//         minLength: {
//             value: 6,
//             message: "Password không ít hơn 6 ký tự",
//         },
//     },
//     confirm_password: {
//         required: {
//             value: true,
//             message: "Bắt buộc điền lại password",
//         },
//         maxLength: {
//             value: 160,
//             message: "Password không quá 160 ký tự",
//         },
//         minLength: {
//             value: 6,
//             message: "Password không ít hơn 5 ký tự",
//         },
//         validate:
//             typeof getValues === "function"
//                 ? (value: any) =>
//                       value === getValues("password") ||
//                       "Nhập lại mật khẩu không khớp"
//                 : undefined,
//     },
// });

const handleConfirmPasswordYup = (refString: string) => {
  return yup
    .string()
    .required('Bắt buộc nhập lại password')
    .max(160, 'Password không quá 160 ký tự')
    .min(6, 'Password không ít hơn 5 ký tự')
    .oneOf([yup.ref(refString)], 'Nhập lại password không khớp')
}

function textPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
  const { price_min, price_max } = this.parent as {
    price_min: string
    price_max: string
  }
  if (price_min !== '' && price_max !== '') {
    return Number(price_max) >= Number(price_min)
  }
  return price_min !== '' || price_max !== ''
}

export const schema = yup.object({
  email: yup
    .string()
    .required('Bắt buộc điền email')
    .email('Email không đúng định dạng')
    .max(160, 'Email không quá 160 ký tự')
    .min(5, 'Email không ít hơn 5 ký tự'),
  password: yup
    .string()
    .required('Bắt buộc nhập password')
    .max(160, 'Password không quá 160 ký tự')
    .min(6, 'Password không ít hơn 5 ký tự'),
  confirm_password: handleConfirmPasswordYup('password'),
  price_min: yup.string().test({
    name: 'price-not-allow',
    message: 'Giá không phù hợp',
    test: textPriceMinMax
  }),
  price_max: yup.string().test({
    name: 'price-not-allow',
    message: 'Giá không phù hợp',
    test: textPriceMinMax
  }),
  name: yup.string().trim().required('Tên sản phẩm là bắt buộc')
})

export const userSchema = yup.object({
  name: yup.string().max(160, 'Độ dài tối đa là 160 ký tự'),
  phone: yup.string().max(20, 'Độ dài tối đa là 20 ký tự'),
  address: yup.string().max(20, 'Độ dài tối đa là 20 ký tự'),
  avatar: yup.string().max(1000, 'Độ dài tối đa là 1000 ký tự'),
  date_of_birth: yup.date().max(new Date(), 'Chọn một ngày trong quá khứ'),
  password: schema.fields['password'] as yup.StringSchema<string | undefined, yup.AnyObject, undefined, ''>,
  new_password: schema.fields['password'] as yup.StringSchema<string | undefined, yup.AnyObject, undefined, ''>,
  confirm_password: handleConfirmPasswordYup('new_password')
})

export type userSchema = yup.InferType<typeof userSchema>
export type UserSchema = yup.InferType<typeof userSchema>
export type Schema = yup.InferType<typeof schema>
