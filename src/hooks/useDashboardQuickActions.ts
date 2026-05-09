import { useMemo } from 'react';
import { 
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
  useGetTodayTransactionsQuery
} from '../redux/api/dashboardApi';

export interface QuickAction {
  id: string;
  title: string;
  value: string | number;
  subtitle?: string;
  icon: string;
  screen: string;
  color: string;
  bgColor: string;
}

export const useDashboardQuickActions = () => {
  // Call all 17 endpoints
  const summary = useGetDashboardSummaryQuery(undefined);
  const salesChart = useGetSalesChartQuery(undefined);
  const paymentStats = useGetPaymentStatsQuery(undefined);
  const topProducts = useGetTopProductsQuery(undefined);
  const topCustomers = useGetTopCustomersQuery(undefined);
  const recentSales = useGetRecentSalesQuery(undefined);
  const hourlySales = useGetHourlySalesQuery(undefined);
  const loyalCustomers = useGetLoyalCustomersQuery(undefined);
  const lowStock = useGetLowStockItemsQuery(undefined);
  const cashFlow = useGetCashFlowQuery(undefined);
  const customerStats = useGetCustomerStatsQuery(undefined);
  const receivableParties = useGetReceivablePartiesQuery(undefined);
  const payableParties = useGetPayablePartiesQuery(undefined);
  const moneyInSummary = useGetMoneyInSummaryQuery(undefined);
  const moneyOutSummary = useGetMoneyOutSummaryQuery(undefined);
  const inventorySummary = useGetInventorySummaryQuery(undefined);
  const todayTransactions = useGetTodayTransactionsQuery(undefined);

  const isLoading = 
    summary.isLoading || 
    recentSales.isLoading || 
    moneyInSummary.isLoading; // Critical ones to check for loading state

  const actions: QuickAction[] = useMemo(() => {
    const data: QuickAction[] = [];

    // 1. Today Sales (from Summary)
    data.push({
      id: 'today-sales',
      title: 'Today Sales',
      value: `₹${summary.data?.data?.todaySales || 0}`,
      subtitle: `${summary.data?.data?.totalTransactions || 0} Transactions`,
      icon: 'trending-up',
      screen: 'TodaySalesScreen',
      color: '#16A34A',
      bgColor: 'bg-green-50',
    });

    // 2. Loyal Customers
    data.push({
      id: 'loyal-customers',
      title: 'Loyal Customers',
      value: loyalCustomers.data?.data?.length || 0,
      subtitle: 'Active Customers',
      icon: 'users',
      screen: 'LoyalCustomersScreen',
      color: '#7C3AED',
      bgColor: 'bg-purple-50',
    });

    // 3. Low Stock
    data.push({
      id: 'low-stock',
      title: 'Low Stock',
      value: lowStock.data?.data?.length || 0,
      subtitle: 'Need Attention',
      icon: 'package',
      screen: 'LowStockScreen',
      color: '#DC2626',
      bgColor: 'bg-red-50',
    });

    // 4. Money In
    data.push({
      id: 'money-in',
      title: 'Money In',
      value: `₹${moneyInSummary.data?.data?.total || 0}`,
      subtitle: 'Total Receipts',
      icon: 'wallet',
      screen: 'MoneyInScreen',
      color: '#2563EB',
      bgColor: 'bg-blue-50',
    });

    // 5. Money Out
    data.push({
      id: 'money-out',
      title: 'Money Out',
      value: `₹${moneyOutSummary.data?.data?.total || 0}`,
      subtitle: 'Total Expenses',
      icon: 'external-link',
      screen: 'MoneyOutScreen',
      color: '#EA580C',
      bgColor: 'bg-orange-50',
    });

    // 6. Receivables
    data.push({
      id: 'receivables',
      title: 'Receivables',
      value: receivableParties.data?.data?.length || 0,
      subtitle: 'Pending Collection',
      icon: 'arrow-down-left',
      screen: 'ReceivablePartiesScreen',
      color: '#0891B2',
      bgColor: 'bg-cyan-50',
    });

    // 7. Payables
    data.push({
      id: 'payables',
      title: 'Payables',
      value: payableParties.data?.data?.length || 0,
      subtitle: 'Pending Payments',
      icon: 'arrow-up-right',
      screen: 'PayablePartiesScreen',
      color: '#4F46E5',
      bgColor: 'bg-indigo-50',
    });

    // 8. Top Products
    data.push({
      id: 'top-products',
      title: 'Top Products',
      value: topProducts.data?.data?.length || 0,
      subtitle: 'Best Selling',
      icon: 'star',
      screen: 'TopProductsScreen',
      color: '#EAB308',
      bgColor: 'bg-yellow-50',
    });

    // 9. Recent Sales
    data.push({
      id: 'recent-sales',
      title: 'Recent Sales',
      value: recentSales.data?.data?.length || 0,
      subtitle: 'Latest Orders',
      icon: 'clock',
      screen: 'SaleList',
      color: '#475569',
      bgColor: 'bg-slate-50',
    });

    // 10. Inventory Summary
    data.push({
      id: 'inventory-summary',
      title: 'Inventory',
      value: inventorySummary.data?.data?.totalItems || 0,
      subtitle: 'Total SKUs',
      icon: 'layers',
      screen: 'InventorySummaryScreen',
      color: '#0D9488',
      bgColor: 'bg-teal-50',
    });

    // 11. Today Transactions
    data.push({
      id: 'today-transactions',
      title: 'Transactions',
      value: todayTransactions.data?.data?.length || 0,
      subtitle: 'Today\'s Count',
      icon: 'file-text',
      screen: 'TodaySalesScreen',
      color: '#DB2777',
      bgColor: 'bg-pink-50',
    });

    return data;
  }, [
    summary.data,
    loyalCustomers.data,
    lowStock.data,
    moneyInSummary.data,
    moneyOutSummary.data,
    receivableParties.data,
    payableParties.data,
    topProducts.data,
    recentSales.data,
    inventorySummary.data,
    todayTransactions.data
  ]);

  return { actions, isLoading };
};
