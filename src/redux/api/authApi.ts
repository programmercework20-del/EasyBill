import { baseApi } from './baseApi';
import { setCredentials } from '../slices/authSlice';
import { saveAuth } from '../../utils/authStorage';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    register: builder.mutation({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
    }),

    login: builder.mutation({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          // Redux update
          dispatch(setCredentials({
            user: data.user,
            token: data.token,
          }));

          // AsyncStorage save
          await saveAuth({
            user: data.user,
            token: data.token,
          });

        } catch (err) {
          console.log(err);
        }
      },
    }),

  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
} = authApi;