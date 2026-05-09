import { baseApi } from './baseApi';

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ DASHBOARD SUMMARY
    getDashboardSummary: builder.query({
      query: () => '/dashboard/summary',
      providesTags: ['Dashboard'],
    }),

    // ✅ SALES CHART
    getSalesChart: builder.query({
      query: () => '/dashboard/sales-chart',
      providesTags: ['Dashboard'],
    }),

    // ✅ PAYMENT STATS
    getPaymentStats: builder.query({
      query: () => '/dashboard/payment-stats',
      providesTags: ['Dashboard'],
    }),

    // ✅ TOP PRODUCTS
    getTopProducts: builder.query({
      query: () => '/dashboard/top-products',
      providesTags: ['Dashboard'],
    }),

    // ✅ TOP CUSTOMERS
    getTopCustomers: builder.query({
      query: () => '/dashboard/top-customers',
      providesTags: ['Dashboard'],
    }),

    // ✅ RECENT SALES
    getRecentSales: builder.query({
      query: (params) => ({
        url: '/dashboard/recent-sales',
        params,
      }),
      providesTags: ['Dashboard'],
    }),

    // ✅ HOURLY SALES
    getHourlySales: builder.query({
      query: () => '/dashboard/hourly-sales',
      providesTags: ['Dashboard'],
    }),

    // ✅ LOYAL CUSTOMERS
    getLoyalCustomers: builder.query({
      query: () => '/dashboard/loyal-customers',
      providesTags: ['Dashboard'],
    }),

    // ✅ LOW STOCK ITEMS
    getLowStockItems: builder.query({
      query: () => '/dashboard/low-stock',
      providesTags: ['Dashboard'],
    }),

    // ✅ CASH FLOW
    getCashFlow: builder.query({
      query: () => '/dashboard/cash-flow',
      providesTags: ['Dashboard'],
    }),

    // ✅ CUSTOMER STATS
    getCustomerStats: builder.query({
      query: () => '/dashboard/customer-stats',
      providesTags: ['Dashboard'],
    }),

    // ✅ RECEIVABLE PARTIES
    getReceivableParties: builder.query({
      query: () => '/dashboard/receivable-parties',
      providesTags: ['Dashboard'],
    }),

    // ✅ PAYABLE PARTIES
    getPayableParties: builder.query({
      query: () => '/dashboard/payable-parties',
      providesTags: ['Dashboard'],
    }),

    // ✅ MONEY IN SUMMARY
    getMoneyInSummary: builder.query({
      query: () => '/dashboard/money-in-summary',
      providesTags: ['Dashboard'],
    }),

    // ✅ MONEY OUT SUMMARY
    getMoneyOutSummary: builder.query({
      query: () => '/dashboard/money-out-summary',
      providesTags: ['Dashboard'],
    }),

    // ✅ INVENTORY SUMMARY
    getInventorySummary: builder.query({
      query: () => '/dashboard/inventory-summary',
      providesTags: ['Dashboard'],
    }),

    // ✅ TODAY TRANSACTIONS
    getTodayTransactions: builder.query({
      query: () => '/dashboard/today-transactions',
      providesTags: ['Dashboard'],
    }),
  }),
});

export const {
  useGetDashboardSummaryQuery,
  useGetSalesChartQuery,
  useGetPaymentStatsQuery,
  useGetTopProductsQuery,
  useGetTopCustomersQuery,
  useGetRecentSalesQuery,
  useGetHourlySalesQuery,
  useGetLoyalCustomersQuery,
  useGetLowStockItemsQuery,
  useGetCashFlowQuery,
  useGetCustomerStatsQuery,
  useGetReceivablePartiesQuery,
  useGetPayablePartiesQuery,
  useGetMoneyInSummaryQuery,
  useGetMoneyOutSummaryQuery,
  useGetInventorySummaryQuery,
  useGetTodayTransactionsQuery,
} = dashboardApi;
