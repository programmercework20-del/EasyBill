import { baseApi } from './baseApi';

export const partyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    // ✅ GET PARTIES (with optional type/category filters)
    getParties: builder.query({
      query: (params) => ({
        url: '/party',
        params: params, // e.g., { type: 'salesman', category_id: 1 }
      }),
      providesTags: ['Party'],
    }),

    //get Party by Id
    getPartyByID: builder.query({
      query: (id) => `/party/${id}`,
      providesTags: ['Party'],
    }),

    // ✅ CREATE PARTY
    createParty: builder.mutation({
      query: (data) => ({
        url: '/party',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Party'],
    }),

    // ✅ UPDATE PARTY (Ye API create nahi hai, baad me banegi)
    updateParty: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/party/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Party'],
    }),

    // ✅ DELETE PARTY (Ye API create nahi hai, baad me banegi)
    deleteParty: builder.mutation({
      query: (id) => ({
        url: `/party/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Party'],
    }),

        //party category
        createPartyCategory: builder.mutation({
          query: (data) => ({
            url: '/party-category',
            method: 'POST',
            body: data,
          }),
          invalidatesTags: ['PartyCategory'], // 🔥 cache refresh
        }),
    
        getPartyCategories: builder.query({
          query: () => '/party-category',
          providesTags: ['PartyCategory'],
        }),
  }),
});

export const {
  useGetPartiesQuery,
  useGetPartyByIDQuery,
  useCreatePartyMutation,
  useUpdatePartyMutation,
  useDeletePartyMutation,
  useCreatePartyCategoryMutation,
  useGetPartyCategoriesQuery,
} = partyApi;
