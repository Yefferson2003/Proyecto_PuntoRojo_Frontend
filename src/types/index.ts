import { z } from 'zod'

const ResponsePaginationSchema = z.object({
    total: z.number(),
    totalPages: z.number(),
    currentPage: z.number(),
})

//* AUTH & USERS*//
export const authSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    password_confirmation: z.string(),
    clietType: z.string(),
    identification: z.string(),
    phone: z.string(),
    address: z.string(),
    token: z.string()
})

type Auth = z.infer<typeof authSchema>
export type UserLoginForm = Pick<Auth, 'email' | 'password'>
export type UserRegistrationForm = Pick<Auth, 'email' | 'password' | 'password_confirmation' | 'address' | 'clietType' | 'identification' | 'name' | 'phone'>
export type DeliveryManRegistrationForm = Pick<Auth, 'email' | 'password' | 'password_confirmation' | 'name' | 'phone' | 'identification'>
export type RequestConfirmationCodeForm = Pick<Auth, 'email'>
export type ForgotPasswordForm = Pick<Auth, 'email'>
export type NewPasswordForm = Pick<Auth, 'password' | 'password_confirmation'>
export type UserUpdateForm = Pick<Auth, 'name' | 'clietType' | 'identification' | 'phone' | 'address'>
export type DeliveryManUpdateForm = Pick<Auth, 'name' | 'identification' | 'phone'>
export type UserPasswordForm = Pick<Auth, 'password'>

export type ConfirmToken = Pick<Auth, 'token'>

//* CATEGORY*//
export const subCategorySchema = z.object({
    id: z.number(),
    name: z.string(),
    visibility: z.boolean()
})
export type SubCategory = z.infer<typeof subCategorySchema>
export type SubCategoryFormData = Pick<SubCategory, 'name' | 'visibility'>

export const categorySchema = z.object({
    id: z.number(),
    name: z.string(),
    visibility: z.boolean(),
    subCategories: z.array(subCategorySchema)
})
export const formCategorySchema = categorySchema.pick({
    id: true,
    name: true,
    visibility: true,
})
export const categoriesSchema = z.array(categorySchema)

export type Category = z.infer<typeof categorySchema>
export type CategoryFormData = Pick<Category, 'name' | 'visibility' >
export type EditCategory = z.infer<typeof formCategorySchema>

// REVIEW

export const ReviewSchema = z.object({
    id: z.number(),
    qualification: z.number(),
    description: z.string(),
    visibility: z.boolean()
})

export const reviewSchema = z.union([
    ReviewSchema,
    z.object({})
])

export const responseReviewsVisibilitySchama = ResponsePaginationSchema.pick({
    currentPage: true,
    total: true,
    totalPages: true
}).extend({
    reviews: z.array(ReviewSchema)
})

export const reviewFormSchema =z.object({
    qualification: z.number(),
    description: z.string(),
})

export type Review = z.infer<typeof reviewSchema >
export type ReviewVisible = z.infer<typeof ReviewSchema >

export type ReviewForm = z.infer<typeof reviewFormSchema >

// PRODUCT //
export const productSchema = z.object({
    id: z.number(),
    name: z.string(),
    nit: z.string(),
    description: z.string().nullable(),
    imgUrl: z.string().optional(),
    availability: z.boolean(),
    priceBefore: z.union([z.number(), z.string()]),
    priceAfter: z.union([z.number(), z.string()]),
    iva: z.union([z.number(), z.string()]),
    offer: z.boolean(),
    subCategoryId: z.union([z.number(), z.string()])
})
export const productsSchema = z.array(productSchema)

export const responseProductsSchema = z.object({
    total: z.number(),
    products: z.array(productSchema), // Lista de productos
    totalPages: z.number(),
    currentPage: z.number(),
});

export type Product = z.infer<typeof productSchema>
export type ProductFormData = Omit<Product, 'id'>

// ORDER && CUSTOMER//


export const userSchema = z.object({
    id: z.number(),
    email: z.string().email(), 
    name: z.string(),
    rol: z.enum(['user', 'admin', 'deliveryman']),
});


export const customerSchema = z.object({
    id: z.number().optional(),
    clietType: z.enum(['natural', 'legal']).optional(),
    identification: z.string().optional(),
    phone: z.string().length(10).optional(),
    address: z.string().optional(),
    userId: z.number().optional(),
    user: userSchema.pick({
        id: true,
        name: true,
        email: true,
        rol: true,
    })
});

const customerForAdminSchema = customerSchema.pick({
    id: true,
    clietType: true,
    identification: true,
    phone: true,
    address: true,
    user: true
}).extend({
    review: ReviewSchema.nullable(),
    createdAt: z.string()
})

export type CustomerForAdmin = z.infer<typeof customerForAdminSchema>

export const responseCustomerForAdminSchema = ResponsePaginationSchema.pick({
    currentPage: true,
    total: true,
    totalPages: true,
}).extend({
    customers: z.array(customerForAdminSchema)
})

export type Customer = z.infer<typeof customerSchema>

export const deliveryManSchema = z.object({
    id: z.number().optional(),
    availability: z.boolean(),
    status: z.enum(['active', 'inactive']),
    phone: z.string().optional(),
    userId: z.number().optional(),
    identification: z.string().optional(),
    user: userSchema.pick({
        id: true,
        name: true,
        email: true,
        rol: true,
    })
});

const OrderSchema = z.object({
    id: z.number(),
    address: z.string(),
    createdAt: z.string().datetime(),
    customerId: z.number(),
    deliveryManId: z.number().nullable(),
    deliveryType: z.string(),
    paymentMethod: z.string(),
    request: z.string(),
    status: z.string(),
    updatedAt: z.string().datetime(),
    completedAt: z.string().datetime().nullable()
});

const orderListSchema = OrderSchema.pick({
    id: true,
    address: true,
    deliveryType: true,
    paymentMethod: true,
    createdAt: true,
    status: true,
}).extend({
    customer: customerSchema.pick({
        id: true
    }).extend({
        user: userSchema.pick({
            name: true
        })
    })
});

const orderListForDeliverySchema  = OrderSchema.pick({
    id: true,
    createdAt: true,
    deliveryType: true,
    paymentMethod: true,
    status: true,
    address: true,
    completedAt: true,
    request: true,
    deliveryManId: true
}).extend({
    customer: customerSchema.pick({
        id: true,
        phone: true,
        identification: true,
        clietType: true
    }).extend({
        user: userSchema.pick({
            id: true,
            email: true,
            name: true
        })
    }),
    orderDetails: z.array(z.object({
        quantity: z.number(),
        product: productSchema.pick({
            id: true,
            priceAfter: true
        })
    }))
})

const orderListDeliverySchemaForAdmin  = OrderSchema.pick({
    id: true,
    createdAt: true,
    deliveryType: true,
    paymentMethod: true,
    status: true,
    address: true,
    completedAt: true,
    request: true,
    deliveryManId: true
}).extend({
    customer: customerSchema.pick({
        id: true,
        phone: true,
        identification: true,
        clietType: true
    }).extend({
        user: userSchema.pick({
            id: true,
            email: true,
            name: true
        })
    }),
    orderDetails: z.array(z.object({
        quantity: z.number(),
        product: productSchema.pick({
            id: true,
            priceAfter: true,
            imgUrl: true,
            nit: true,
            name: true
        })
    }))
})

const orderListForCustomerSchema  = OrderSchema.pick({
    id: true,
    paymentMethod: true,
    deliveryType: true,
    status: true,
    address: true,
    createdAt: true,
    completedAt: true
}).extend({
    deliveryMan: deliveryManSchema.pick({
        id: true,
        phone: true,
    }).extend({
        user: userSchema.pick({
            id: true,
            name: true
        })
    }).nullable(),
    orderDetails: z.array(z.object({
        id: z.number(),
        quantity: z.number(),
        product: productSchema.pick({
            id: true,
            priceAfter: true
        })
    }))
})

export const orderDetailsForCustomerSchema  = OrderSchema.pick({
    id: true,
    paymentMethod: true,
    deliveryType: true,
    address: true,
    createdAt: true,
    completedAt: true,
    status: true,
    deliveryManId: true
}).extend({
    orderDetails: z.array(z.object({
        id: z.number(),
        quantity: z.number(),
        product: productSchema
    }))
})

// export const orderListForCustomerSchema = z.array(orderForCustomerSchema)

export type OrderListForCustomer = z.infer<typeof orderListForCustomerSchema>
export type OrderListDeliveryMan = z.infer<typeof orderListForDeliverySchema>
export type OrderDetailsForCustomer = z.infer<typeof orderDetailsForCustomerSchema>

export type OrderList = z.infer<typeof orderListSchema>
export type OrderListForDelivery = z.infer<typeof orderListForDeliverySchema>
export type OrderListForDeliveryForAdmin = z.infer<typeof orderListDeliverySchemaForAdmin>



export const responseOrdersCustomerSchema = ResponsePaginationSchema.pick({
    total: true,
    totalPages: true,
    currentPage: true,
}).extend({
    orders: z.array(orderListForCustomerSchema),
})

export const responseOrdersSchema = ResponsePaginationSchema.pick({
    total: true,
    totalPages: true,
    currentPage: true,
}).extend({
    orders: z.array(orderListSchema),
})

export const responseOrdersForDeliverySchema = ResponsePaginationSchema.pick({
    total: true,
    totalPages: true,
    currentPage: true,
}).extend({
    orders: z.array(orderListForDeliverySchema)
})

export const responseOrdersDeliverySchemaForAdmin = ResponsePaginationSchema.pick({
    total: true,
    totalPages: true,
    currentPage: true,
}).extend({
    orders: z.array(orderListDeliverySchemaForAdmin)
})

const cartItemSchema = z.object({
    product: productSchema,
    quantity: z.number().min(1)
})

export const orderSchema = OrderSchema.pick({
    id: true,
    deliveryType: true,
    paymentMethod: true,
    request: true,
    address: true,
    createdAt: true,
    status: true,
    completedAt: true,
}).extend({
    orderDetails: z.array(cartItemSchema),
    deliveryMan: deliveryManSchema.pick({
        id: true,
        availability: true,
        phone: true,
        user: true
    }).nullable(),
    customer: customerSchema.pick({
        clietType: true,
        identification: true,
        phone: true,
        user: true
    })
})

export type Order = z.infer<typeof orderSchema> 

//////

export const cartItemFormDataSchema = z.object({
    product: productSchema.shape.id,
    quantity: z.number().min(1)
})

export type CartItem = z.infer<typeof cartItemSchema>

export type productsFormData = {
    productId: number
    quantity: number
}

export const orderFormSchema = z.object({
    deliveryType: z.string(),
    paymentMethod: z.string(),
    request: z.string(),
    address: z.string(),
})

// USER 

export const adminSchema = z.object({
    user: userSchema.pick({
        id: true,
        name: true,
        email: true,
        rol: true,
    })
})

export const deliveryMenSchema = z.array(deliveryManSchema)
export type DeliveryMan = z.infer<typeof deliveryManSchema>
export type SelectDeliveryManForm = Pick<DeliveryMan, 'id'>

export const accountSchema = z.union([customerSchema, deliveryManSchema, adminSchema]);

export type User = z.infer<typeof userSchema>

export type OrderFormData = z.infer<typeof orderFormSchema> & {products: productsFormData[]}

// MESSAGES

export const messageSchema = z.object({
    id: z.number(),
    message: z.string(),
    visibility: z.boolean()
})

export const messagesSchema = z.array(messageSchema)

export type Message = z.infer<typeof messageSchema>

export type FormMessage = Pick<Message, 'message'>

export type SokectData = {
    orderId: number
    customerId: number
    deliveryManId: number
}

// DATE FOR CHART

export const dateCount = z.object({
    date: z.string(),
    count: z.number()
})
export const dateDetails = z.object({
    date: z.string(),
    total: z.number()
})

export const responseDateCount = z.array(dateCount)
export const responseDateDetails = z.array(dateDetails)



