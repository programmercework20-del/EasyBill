import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ChevronDown, FileText, ArrowLeft, ChevronLeft, ChevronRight, Share2, Download } from 'lucide-react-native';

export default function PurchaseReport() {
  const reportData = [
    {
      srNo: 1,
      date: '25/04/26',
      receiptNo: '441',
      partyName: 'Fuzail Hussain',
      partyPhone: '9518795065',
      secondaryParty: 'Pankaj Kumar Rai',
      secondaryPhone: '9944987510',
      totalQty: 1.0,
      totalTax: 0.0,
      totalAmount: 580.0002,
      createdBy: 'Admin',
      items: [
        { itemName: 'SHIRTS 680', quantity: 1.0, unit: 0.0, rsPerUnit: 650.0, amount: 580.0002 }
      ]
    },
    {
      srNo: 2,
      date: '25/04/26',
      receiptNo: '442',
      partyName: 'Fuzail Hussain',
      partyPhone: '9518795065',
      totalQty: 1.0,
      totalTax: 0.0,
      totalAmount: 600.0,
      createdBy: 'Admin',
      items: [
        { itemName: 'SHIRTS 680', quantity: 1.0, unit: 0.0, rsPerUnit: 680.0, amount: 600.0 }
      ]
    },
    {
      srNo: 3,
      date: '25/04/26',
      receiptNo: '443',
      partyName: 'Fuzail Hussain',
      partyPhone: '9518795065',
      totalQty: 2.0,
      totalTax: 0.0,
      totalAmount: 1400.0002,
      createdBy: 'Admin',
      items: [
        { itemName: 'JEANS 980', quantity: 1.0, unit: 0.0, rsPerUnit: 980.0, amount: 879.4873 },
        { itemName: 'SHIRT 580', quantity: 1.0, unit: 0.0, rsPerUnit: 580.0, amount: 520.5129 }
      ]
    },
    {
      srNo: 4,
      date: '25/04/26',
      receiptNo: '444',
      partyName: 'Fuzail Hussain',
      partyPhone: '9518795065',
      secondaryParty: 'Rashid Sheikh',
      secondaryPhone: '9975911569',
      totalQty: 1.0,
      totalTax: 0.0,
      totalAmount: 899.9997,
      createdBy: 'Admin',
      items: [
        { itemName: 'JEANS 980', quantity: 1.0, unit: 0.0, rsPerUnit: 980.0, amount: 899.9997 }
      ]
    }
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
     
      

      <ScrollView style={styles.scrollView}>
        {/* Date Range Selector */}
        <View style={styles.dateSelectorContainer}>
          <TouchableOpacity style={styles.dropdown}>
            <Text style={styles.dropdownText}>Last Week</Text>
            <ChevronDown color="#333" size={20} />
          </TouchableOpacity>

          <View style={styles.dateRangeRow}>
            <TouchableOpacity style={styles.dateInput}>
              <Text style={styles.dateText}>25/04/26</Text>
              <ChevronDown color="#333" size={16} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.dateInput}>
              <Text style={styles.dateText}>02/05/26</Text>
              <ChevronDown color="#333" size={16} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Report Title Card */}
        <View style={styles.reportTitleCard}>
          <Text style={styles.reportTitle}>Sale Report</Text>
          <Text style={styles.reportDateRange}>25-04-26 to 02-05-26</Text>
        </View>

        {/* Summary Cards */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total Sales</Text>
            <Text style={styles.summaryValue}>88</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total Sales Quantity</Text>
            <Text style={styles.summaryValue}>115</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total Sales Amount</Text>
            <Text style={styles.summaryValue}>190619.5</Text>
          </View>
        </View>

        {/* Data Table */}
        <View style={styles.tableContainer}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.headerCell, { width: 40 }]}>Sr No</Text>
            <Text style={[styles.headerCell, { width: 70 }]}>Date</Text>
            <Text style={[styles.headerCell, { width: 60 }]}>Receipt No</Text>
            <Text style={[styles.headerCell, { width: 80 }]}>Party Name</Text>
            <Text style={[styles.headerCell, { width: 90 }]}>Party Phone no</Text>
            <Text style={[styles.headerCell, { width: 80 }]}>Secondary Party Name</Text>
            <Text style={[styles.headerCell, { width: 90 }]}>Secondary Phone no</Text>
            <Text style={[styles.headerCell, { width: 50 }]}>Total Quantity</Text>
            <Text style={[styles.headerCell, { width: 50 }]}>Total Tax</Text>
            <Text style={[styles.headerCell, { width: 70 }]}>Total Amount</Text>
            <Text style={[styles.headerCell, { width: 60 }]}>Created By</Text>
          </View>

          {/* Table Rows */}
          {reportData.map((row, index) => (
            <View key={index}>
              {/* Main Row */}
              <View style={[styles.tableRow, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
                <Text style={[styles.cell, { width: 40 }]}>{row.srNo}</Text>
                <Text style={[styles.cell, { width: 70 }]}>{row.date}</Text>
                <Text style={[styles.cell, { width: 60 }]}>{row.receiptNo}</Text>
                <Text style={[styles.cell, { width: 80 }]}>{row.partyName}</Text>
                <Text style={[styles.cell, { width: 90 }]}>{row.partyPhone}</Text>
                <Text style={[styles.cell, { width: 80 }]}>{row.secondaryParty || ''}</Text>
                <Text style={[styles.cell, { width: 90 }]}>{row.secondaryPhone || ''}</Text>
                <Text style={[styles.cell, { width: 50 }]}>{row.totalQty}</Text>
                <Text style={[styles.cell, { width: 50 }]}>{row.totalTax}</Text>
                <Text style={[styles.cell, { width: 70 }]}>{row.totalAmount}</Text>
                <Text style={[styles.cell, { width: 60 }]}>{row.createdBy}</Text>
              </View>

              {/* Item Details Sub-header */}
              <View style={styles.itemHeaderRow}>
                <Text style={[styles.itemHeaderCell, { width: 30 }]}>#</Text>
                <Text style={[styles.itemHeaderCell, { flex: 1 }]}>Item Name</Text>
                <Text style={[styles.itemHeaderCell, { width: 60 }]}>Quantity</Text>
                <Text style={[styles.itemHeaderCell, { width: 50 }]}>Unit</Text>
                <Text style={[styles.itemHeaderCell, { width: 70 }]}>Rs/Unit</Text>
                <Text style={[styles.itemHeaderCell, { width: 80 }]}>Amount</Text>
              </View>

              {/* Item Rows */}
              {row.items.map((item, itemIndex) => (
                <View key={itemIndex} style={[styles.itemRow, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
                  <Text style={[styles.itemCell, { width: 30 }]}>{itemIndex + 1}</Text>
                  <Text style={[styles.itemCell, { flex: 1 }]}>{item.itemName}</Text>
                  <Text style={[styles.itemCell, { width: 60 }]}>{item.quantity}</Text>
                  <Text style={[styles.itemCell, { width: 50 }]}>{item.unit}</Text>
                  <Text style={[styles.itemCell, { width: 70 }]}>{item.rsPerUnit}</Text>
                  <Text style={[styles.itemCell, { width: 80 }]}>{item.amount}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.navButton}>
          <ChevronLeft color="#7C3AED" size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <ChevronRight color="#7C3AED" size={24} />
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <TouchableOpacity style={styles.actionButton}>
          <Download color="#7C3AED" size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Share2 color="#7C3AED" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    backgroundColor: '#7C3AED',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#E0E0E0',
    marginTop: 4,
  },
  pdfButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 4,
  },
  scrollView: {
    flex: 1,
  },
  dateSelectorContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  dropdownText: {
    fontSize: 14,
    color: '#333',
  },
  dateRangeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  dateInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  dateText: {
    fontSize: 14,
    color: '#333',
  },
  reportTitleCard: {
    backgroundColor: '#fff',
    margin: 8,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#7C3AED',
    alignItems: 'center',
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  reportDateRange: {
    fontSize: 14,
    color: '#666',
  },
  summaryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    marginBottom: 8,
    gap: 8,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4CAF50',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 11,
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  tableContainer: {
    backgroundColor: '#fff',
    margin: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#2196F3',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  headerCell: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 2,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  evenRow: {
    backgroundColor: '#F5F5F5',
  },
  oddRow: {
    backgroundColor: '#fff',
  },
  cell: {
    fontSize: 10,
    textAlign: 'center',
    paddingHorizontal: 2,
    color: '#333',
  },
  itemHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#2196F3',
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  itemHeaderCell: {
    color: '#fff',
    fontSize: 9,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  itemRow: {
    flexDirection: 'row',
    paddingVertical: 4,
    paddingHorizontal: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E0E0E0',
  },
  itemCell: {
    fontSize: 9,
    textAlign: 'center',
    color: '#333',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  navButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#7C3AED',
    borderRadius: 4,
    marginRight: 8,
  },
  actionButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#7C3AED',
    borderRadius: 4,
    marginLeft: 8,
  },
});