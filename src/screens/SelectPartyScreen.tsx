import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Search, ChevronDown, Plus, X } from 'lucide-react-native';

const PRIMARY = "#1A73E8";

const parties = [
  { id: 1, name: "AMIR", phone: "9922291311", billingType: "REGULAR" },
  { id: 2, name: "ARMAN SHEIKH", phone: "9307772648", billingType: "REGULAR" },
  { id: 3, name: "Fuzail Hussain", phone: "9518795065", billingType: "REGULAR" },
  { id: 4, name: "MARUF", phone: "9326717176", billingType: "REGULAR" },
  { id: 5, name: "Owes", phone: "9028656894", billingType: "REGULAR" },
  { id: 6, name: "RAMZAN", phone: "9421742244", billingType: "REGULAR" },
  { id: 7, name: "RIZWAN", phone: "9527226251", billingType: "REGULAR" },
  { id: 8, name: "SHAHBAZ ANSARI", phone: "9876543210", billingType: "REGULAR" },
];

const suppliers = [
  { id: 1, name: "ABC Suppliers", phone: "9812345678", billingType: "REGULAR" },
  { id: 2, name: "XYZ Traders", phone: "9823456789", billingType: "REGULAR" },
  { id: 3, name: "Global Goods", phone: "9834567890", billingType: "REGULAR" },
];

export default function SelectPartyScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState<'CUSTOMER' | 'SUPPLIER'>('CUSTOMER');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <ArrowLeft color="white" size={24} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Select Party</Text>
            <Text style={styles.headerSubtitle}>FAST V39.08 | 9518795065 | 1043</Text>
          </View>
          <TouchableOpacity style={styles.searchButton}>
            <Search color="white" size={24} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Row */}
      <View style={styles.searchRow}>
        <TouchableOpacity style={styles.categoryDropdown}>
          <Text style={styles.categoryText}>Category</Text>
          <ChevronDown color="#333" size={16} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.addPartyButton}>
          <Plus color={PRIMARY} size={14} />
          <Text style={styles.addPartyText}>Party</Text>
        </TouchableOpacity>
        <View style={styles.phoneSearchContainer}>
          <TextInput
            style={styles.phoneSearchInput}
            placeholder="Search by Phone"
            placeholderTextColor="#999"
          />
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'CUSTOMER' && styles.activeTab]}
          onPress={() => setActiveTab('CUSTOMER')}
        >
          <Text style={[styles.tabText, activeTab === 'CUSTOMER' && styles.activeTabText]}>
            CUSTOMER
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'SUPPLIER' && styles.activeTab]}
          onPress={() => setActiveTab('SUPPLIER')}
        >
          <Text style={[styles.tabText, activeTab === 'SUPPLIER' && styles.activeTabText]}>
            SUPPLIER
          </Text>
        </TouchableOpacity>
      </View>

      {/* Section Label */}
      <Text style={styles.sectionLabel}>SALES</Text>

      {/* Party List */}
      <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
        {parties.map((party) => (
          <TouchableOpacity key={party.id} style={styles.partyCard}>
            <Text style={styles.partyName}>{party.name}</Text>
            <Text style={styles.partyPhone}>{party.phone}</Text>
            <Text style={styles.partyBilling}>Billing Type: {party.billingType}</Text>
          </TouchableOpacity>
        ))}

        {/* Suppliers Section - shown after sales list */}
        <Text style={styles.sectionLabel}>SUPPLIERS</Text>
        {suppliers.map((supplier) => (
          <TouchableOpacity key={supplier.id} style={styles.partyCard}>
            <Text style={styles.partyName}>{supplier.name}</Text>
            <Text style={styles.partyPhone}>{supplier.phone}</Text>
            <Text style={styles.partyBilling}>Billing Type: {supplier.billingType}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    backgroundColor: PRIMARY,
    paddingTop: 8,
    paddingBottom: 12,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 4,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 11,
    marginTop: 2,
  },
  searchButton: {
    padding: 4,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  categoryDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap: 4,
  },
  categoryText: {
    fontSize: 13,
    color: '#333',
  },
  addPartyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: PRIMARY,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap: 2,
  },
  addPartyText: {
    fontSize: 13,
    color: PRIMARY,
    fontWeight: '600',
  },
  phoneSearchContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  phoneSearchInput: {
    fontSize: 13,
    color: '#333',
    padding: 0,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    backgroundColor: PRIMARY,
    borderBottomColor: PRIMARY,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  activeTabText: {
    color: 'white',
  },
  sectionLabel: {
    fontSize: 12,
    color: PRIMARY,
    fontWeight: '600',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#E3F2FD',
  },
  listContainer: {
    flex: 1,
  },
  partyCard: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  partyName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  partyPhone: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  partyBilling: {
    fontSize: 13,
    color: '#999',
  },
});
