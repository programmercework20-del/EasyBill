import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Search, ChevronDown, Plus, RotateCw } from 'lucide-react-native';
import { useSearch } from '../hooks/useSearch';
import { useGetPartiesQuery, useGetPartyCategoriesQuery } from '../redux/api/partyApi';
import { useRefresh } from '../hooks/useRefresh';

const PRIMARY = "#1A73E8";

export default function SelectPartyScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState<'CUSTOMER' | 'salesman'>('CUSTOMER');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [showCatDropdown, setShowCatDropdown] = useState(false);
  const { search, setSearch } = useSearch();

  // ✅ API CALLS
  const { data: partiesData, isLoading: isLoadingParties, refetch, isFetching } = useGetPartiesQuery({
    type: activeTab.toLowerCase(),
    // We send category_id to API, but we'll also filter client-side for maximum reliability
    category_id: selectedCategoryId || undefined,
  });

  const { data: catData } = useGetPartyCategoriesQuery();
  
  // ✅ Refresh Hook
  const { refreshing, onRefresh } = useRefresh(refetch);

  // Handle various API response shapes
  const partiesList = useMemo(() => {
    const rawData = Array.isArray(partiesData) 
      ? partiesData 
      : partiesData?.data || partiesData?.parties || [];
    return rawData;
  }, [partiesData]);

  const apiCategories = useMemo(() => {
    const rawCat = Array.isArray(catData)
      ? catData
      : catData?.data || catData?.partyCategories || catData?.categories || [];
    return rawCat;
  }, [catData]);

  // ✅ Filtering (Client side for instant feedback and robustness)
  const filteredList = useMemo(() => {
    return partiesList.filter((party: any) => {
      const matchesSearch = party.name.toLowerCase().includes(search.toLowerCase());
      
      // If we have a category filter, ensure the party matches it
      // Some APIs might return category_id as string or number
      const matchesCategory = !selectedCategoryId || 
        (party.category_id && party.category_id.toString() === selectedCategoryId.toString());
      
      return matchesSearch && matchesCategory;
    });
  }, [partiesList, search, selectedCategoryId]);

  const selectedCategoryName = useMemo(() => {
    if (!selectedCategoryId) return 'Category';
    const cat = apiCategories.find((c: any) => (c.id || c._id).toString() === selectedCategoryId);
    return cat?.name || 'Category';
  }, [apiCategories, selectedCategoryId]);

  const handleTabChange = useCallback((tab: 'CUSTOMER' | 'salesman') => {
    setActiveTab(tab);
  }, []);

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
          </View>
          <TouchableOpacity onPress={() => refetch()} style={styles.searchButton}>
            <RotateCw color="white" size={20} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Row */}
      <View style={styles.searchRow}>
        <View>
          <TouchableOpacity 
            style={styles.categoryDropdown}
            onPress={() => setShowCatDropdown(!showCatDropdown)}
          >
            <Text style={styles.categoryText} numberOfLines={1}>{selectedCategoryName}</Text>
            <ChevronDown color="#333" size={16} />
          </TouchableOpacity>

          {showCatDropdown && (
            <View style={styles.dropdownMenu}>
              <TouchableOpacity 
                style={styles.dropdownItem}
                onPress={() => {
                  setSelectedCategoryId(null);
                  setShowCatDropdown(false);
                }}
              >
                <Text style={styles.dropdownItemText}>All Categories</Text>
              </TouchableOpacity>
              {apiCategories.map((cat: any) => (
                <TouchableOpacity 
                  key={cat.id || cat._id}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedCategoryId((cat.id || cat._id).toString());
                    setShowCatDropdown(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{cat.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <TouchableOpacity
          style={styles.addPartyButton}
          onPress={() => navigation.navigate('NewParty')}
        >
          <Plus color={PRIMARY} size={14} />
          <Text style={styles.addPartyText}>Party</Text>
        </TouchableOpacity>
        <View style={styles.phoneSearchContainer}>
          <TextInput
            style={styles.phoneSearchInput}
            placeholder="Search by Name"
            placeholderTextColor="#999"
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'CUSTOMER' && styles.activeTab]}
          onPress={() => handleTabChange('CUSTOMER')}
        >
          <Text style={[styles.tabText, activeTab === 'CUSTOMER' && styles.activeTabText]}>
            CUSTOMER
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'salesman' && styles.activeTab]}
          onPress={() => handleTabChange('salesman')}
        >
          <Text style={[styles.tabText, activeTab === 'salesman' && styles.activeTabText]}>
            Sales Man
          </Text>
        </TouchableOpacity>
      </View>

      {/* Section Label */}
      <Text style={styles.sectionLabel}>{activeTab.toUpperCase()}</Text>

      {/* Party List */}
      <ScrollView 
        style={styles.listContainer} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh} 
            colors={[PRIMARY]}
          />
        }
      >
        {isLoadingParties && !refreshing ? (
          <View style={{ padding: 40, alignItems: 'center' }}>
            <ActivityIndicator size="large" color={PRIMARY} />
          </View>
        ) : (
          <>
            {filteredList.length > 0 ? (
              filteredList.map((party: any) => (
                <TouchableOpacity key={party.id || party._id} style={styles.partyCard}>
                  <Text style={styles.partyName}>{party.name}</Text>
                  <Text style={styles.partyPhone}>{party.phone}</Text>
                  <Text style={styles.partyBilling}>{party.billing_type || 'REGULAR'}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <View style={{ padding: 60, alignItems: 'center' }}>
                <Text style={{ color: '#999', fontSize: 16 }}>No parties found</Text>
              </View>
            )}
          </>
        )}
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
    padding: 8,
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
    zIndex: 1000,
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
    width: 100,
  },
  categoryText: {
    fontSize: 13,
    color: '#333',
    flex: 1,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 45,
    left: 0,
    backgroundColor: '#fff',
    width: 150,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 2000,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  dropdownItemText: {
    fontSize: 14,
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
