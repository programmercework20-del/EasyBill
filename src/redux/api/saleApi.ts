import { baseApi } from './baseApi';

export const saleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // ✅ GET ALL SALES
    getSales: builder.query({
      query: () => '/sales',
      providesTags: ['Sale'],
    }),

    // ✅ GET INVOICE DETAILS
    getInvoice: builder.query({
      query: (id) => `/sales/${id}/invoice`,
      providesTags: ['Sale'],
    }),

    // ✅ UPDATE SALE
    updateSale: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/sales/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Sale'],
    }),

    // ✅ DELETE SALE
    deleteSale: builder.mutation({
      query: (id) => ({
        url: `/sales/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Sale'],
    }),

    // ✅ UPLOAD INVOICE PDF
    uploadInvoicePdf: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/sales/${id}/upload-pdf`,
        method: 'POST',
        body: formData,
        // FormData requires specific headers which RTK Query usually handles automatically
        // but we ensure no extra content-type header is forced
      }),
      invalidatesTags: ['Sale'],
    }),

    // ✅ CREATE SALE
    createSale: builder.mutation({
      query: (data) => ({
        url: '/sales',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Sale'],
    }),

    // ✅ SEND WHATSAPP
    sendWhatsApp: builder.mutation({
      query: (saleId) => ({
        url: '/sales/send-whatsapp',
        method: 'POST',
        body: { saleId },
      }),
    }),
  }),
});

export const {
  useGetSalesQuery,
  useGetInvoiceQuery,
  useUpdateSaleMutation,
  useDeleteSaleMutation,
  useUploadInvoicePdfMutation,
  useCreateSaleMutation,
  useSendWhatsAppMutation,
} = saleApi;
