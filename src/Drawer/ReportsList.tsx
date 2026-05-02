import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { FileText, ChevronRight } from 'lucide-react-native';

interface ReportItemProps {
  title: string;
  onPress?: () => void;
}

const ReportItem = ({ title, onPress }: ReportItemProps) => (
  <TouchableOpacity style={styles.reportCard} onPress={onPress} activeOpacity={0.8}>
    <View style={styles.iconContainer}>
      <FileText color="#F59E0B" size={24} />
    </View>
    <Text style={styles.reportTitle}>{title}</Text>
    <ChevronRight color="#9CA3AF" size={20} />
  </TouchableOpacity>
);

interface SectionHeaderProps {
  title: string;
}

const SectionHeader = ({ title }: SectionHeaderProps) => (
  <Text style={styles.sectionHeader}>{title}</Text>
);

export default function ReportsList() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Business Reports */}
        <ReportItem title="1.1 Business Report" />
        <ReportItem title="1.2 Day Book Report" />

        {/* Transaction Reports */}
        <SectionHeader title="TRANSACTION REPORTS" />
        <ReportItem title="2.1 Sale Report" />
        <ReportItem title="2.2 Staff Wise Sale Report" />
        <ReportItem title="2.3 Sale Wise Profit And Loss Statement" />
        <ReportItem title="2.4 Purchase Report" />
        <ReportItem title="2.5 Money In Report" />
        <ReportItem title="2.6 Money Out Report" />
        <ReportItem title="2.7 Expense Report" />
        <ReportItem title="2.8 Estimate Report" />

        {/* Party Reports */}
        <SectionHeader title="PARTY REPORTS" />
        <ReportItem title="3.1 Party Ledger" />
        <ReportItem title="3.2 Party Receivable/Payable Report" />
        <ReportItem title="3.3 Party Details Report" />

        {/* Item/Stock Reports */}
        <SectionHeader title="ITEM/STOCK REPORTS" />
        <ReportItem title="4.1 Stock Summary Report" />
        <ReportItem title="4.2 Item Sale Report" />
        <ReportItem title="4.2.1 Item Category wise Sale Report" />
        <ReportItem title="4.3 Item Report" />
        <ReportItem title="4.4 Item Details Report" />

        {/* Other Reports */}
        <SectionHeader title="OTHER REPORTS" />
        <ReportItem title="5.1 Cut Off Day Report" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '700',
    color: '#7C3AED',
    marginTop: 20,
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  reportCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  iconContainer: {
    marginRight: 12,
  },
  reportTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: '#1F2937',
    lineHeight: 22,
  },
});
