import { baseApi } from './baseApi';

export const inventoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // ✅ GET ITEMS
    getItems: builder.query({
      query: () => '/items',
      providesTags: ['Inventory'],
    }),

    // ✅ CREATE ITEM (FORM DATA - multipart)
    createItem: builder.mutation({
      query: (formData) => ({
        url: '/items',
        method: 'POST',
        body: formData,
        // Don't set Content-Type — fetchBaseQuery detects FormData automatically
        formData: true,
      }),
      invalidatesTags: ['Inventory'],
    }),

    // ✅ UPDATE ITEM (FORM DATA - multipart)
    updateItem: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/items/${id}`,
        method: 'PUT',
        body: formData,
        formData: true,
      }),
      invalidatesTags: ['Inventory'],
    }),

    // ✅ DELETE ITEM
    deleteItem: builder.mutation({
      query: (id) => ({
        url: `/items/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Inventory'],
    }),

    // ✅ CATEGORY
    getCategories: builder.query({
      query: () => '/categories',
      providesTags: ['Inventory'],
    }),

    createCategory: builder.mutation({
      query: (data) => ({
        url: '/categories',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Inventory'],
    }),

    updateCategory: builder.mutation({
      query: ({ id, name }) => ({
        url: `/categories/${id}`,
        method: 'PUT',
        body: { name },
      }),
      invalidatesTags: ['Inventory'],
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Inventory'],
    }),

    // ✅ STOCK
    updateStock: builder.mutation({
      query: (data) => ({
        url: '/stock/update',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Inventory'],
    }),

    getLedger: builder.query({
      query: (id) => `/stock/${id}`,
    }),

  }),
});

export const {
  useGetItemsQuery,
  useCreateItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateStockMutation,
  useGetLedgerQuery,
} = inventoryApi;