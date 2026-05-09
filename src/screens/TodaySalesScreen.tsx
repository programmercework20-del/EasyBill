import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useGetTodayTransactionsQuery } from '../redux/api/dashboardApi';
import DetailScreenWrapper from '../components/dashboard/detail/DetailScreenWrapper';
import BaseDetailCard from '../components/dashboard/detail/BaseDetailCard';
import DetailSkeleton from '../components/dashboard/detail/DetailSkeleton';
import DetailEmptyState from '../components/dashboard/detail/DetailEmptyState';
import TransactionCard from '../components/dashboard/detail/TransactionCard';
import { Receipt, Clock, ChevronRight } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export default function TodaySalesScreen() {
  const navigation = useNavigation<any>();
  const [search, setSearch] = useState('');
  const { data, isLoading, refetch } = useGetTodayTransactionsQuery(undefined);
  
  const transactions = (data?.data || []).filter((t: any) => {
    const invoiceMatch = (t.invoiceNumber?.toString() || '').toLowerCase().includes(search.toLowerCase());
    const customerMatch = (t.customer?.name?.toString() || '').toLowerCase().includes(search.toLowerCase());
    return invoiceMatch || customerMatch;
  });

  return (
    <DetailScreenWrapper
      title="Today's Sales"
      subtitle="Detailed list of today's transactions"
      count={transactions.length}
      accentColor="#16A34A" // Green
      data={transactions}
      isLoading={isLoading}
      onRefresh={refetch}
      searchQuery={search}
      setSearchQuery={setSearch}
      placeholder="Search Invoice or Customer..."
      skeleton={<DetailSkeleton />}
      emptyState={
        <DetailEmptyState 
          title="No Sales Today" 
          subtitle="Start by creating a new invoice from the dashboard." 
        />
      }
      renderItem={({ item }) => (
        <TransactionCard
          customerName={item.customer?.name}
          invoiceNumber={item.invoiceNumber}
          amount={item.amount_received || 0}
          paymentMethod={item.payment_method || 'CASH'}
          date={item.createdAt}
          pdfUrl={item.invoice_pdf_url}
          accentColor="#16A34A"
          onPress={() => navigation.navigate('SaleSummary', { saleId: item.id })}
        />
      )}
    />
  );
}
