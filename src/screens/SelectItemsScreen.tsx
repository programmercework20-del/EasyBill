import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Search,
  ScanLine,
  LayoutGrid,
  Plus,
  Minus,
  ChevronDown,
  X,
  Image as ImageIcon,
  ShoppingCart,
  CheckCircle2,
} from 'lucide-react-native';
import {
  useGetItemsQuery,
  useGetCategoriesQuery,
} from '../redux/api/inventoryApi';
import { useSearch } from '../hooks/useSearch';
import { useFilteredList } from '../hooks/useFilteredList';
import { useCart } from '../hooks/useCart';
import { useRefresh } from '../hooks/useRefresh';
import StatusBadge from '../components/ui/StatusBadge';
import PrimaryButton from '../components/ui/PrimaryButton';
import SearchBar from '../components/ui/SearchBar';

const PRIMARY = '#1A73E8';

// Fix localhost URLs for physical device
const fixImageUrl = (url: string): string => {
  if (!url) return url;
  return url.replace('http://localhost:5000', 'https://4sb8r8b7-5000.inc1.devtunnels.ms');
};

export default function SelectItemsScreen({ navigation, route }: any) {
  const party = route?.params?.party;
  const partyType = route?.params?.partyType || 'CUSTOMER';

  // ─── API Data ───────────────────────────────────────────
  const { data: itemsData, isLoading: itemsLoading, refetch } = useGetItemsQuery();
  const { data: categoryDataRaw } = useGetCategoriesQuery();

  const items = useMemo(() => itemsData?.data || [], [itemsData]);
  const categories = useMemo(() => categoryDataRaw?.data || [], [categoryDataRaw]);

  // ─── State ──────────────────────────────────────────────
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [showCatDropdown, setShowCatDropdown] = useState(false);
  const { search, setSearch, isSearchOpen, openSearch, closeSearch } = useSearch();
  const { refreshing, onRefresh } = useRefresh(refetch);
  const {
    cartEntries,
    totalQuantity,
    totalAmount,
    getQuantity,
    addItem,
    removeItem,
    clearItem,
  } = useCart();

  // ─── Filtering ──────────────────────────────────────────
  const categoryFilteredItems = useMemo(() => {
    if (!selectedCategoryId) return items;
    return items.filter(
      (item: any) =>
        (item.category_id || item.categoryId || '')?.toString() === selectedCategoryId
    );
  }, [items, selectedCategoryId]);

  const filteredItems = useFilteredList(categoryFilteredItems, search, ['name']);

  // ─── Group items by category ────────────────────────────
  const groupedItems = useMemo(() => {
    const groups: { categoryName: string; data: any[] }[] = [];
    const catMap = new Map<string, string>();

    categories.forEach((cat: any) => {
      catMap.set((cat.id || cat._id)?.toString(), cat.name);
    });

    const ungrouped: any[] = [];
    const grouped = new Map<string, any[]>();

    filteredItems.forEach((item: any) => {
      const catId = (item.category_id || item.categoryId || '')?.toString();
      const catName = catMap.get(catId);
      if (catName) {
        if (!grouped.has(catName)) grouped.set(catName, []);
        grouped.get(catName)!.push(item);
      } else {
        ungrouped.push(item);
      }
    });

    grouped.forEach((data, categoryName) => {
      groups.push({ categoryName, data });
    });

    if (ungrouped.length > 0) {
      groups.push({ categoryName: 'OTHER ITEMS', data: ungrouped });
    }

    return groups;
  }, [filteredItems, categories]);

  // ─── Selected category name ─────────────────────────────
  const selectedCategoryName = useMemo(() => {
    if (!selectedCategoryId) return 'Ca..';
    const cat = categories.find(
      (c: any) => (c.id || c._id).toString() === selectedCategoryId
    );
    return cat?.name || 'Ca..';
  }, [categories, selectedCategoryId]);

  // ─── Render functions ───────────────────────────────────
  const renderItemCard = useCallback(
    (item: any) => {
      const qty = getQuantity(item);
      const price = item.sellPrice || item.price || 0;
      const stock = item.currentStock ?? item.stock ?? 0;
      const hasImage = item.images && item.images.length > 0;

      return (
        <TouchableOpacity
          key={item.id || item._id}
          style={[
            styles.itemCard,
            selectedItemId === (item.id || item._id).toString() && {
              borderColor: PRIMARY,
              borderWidth: 2,
              backgroundColor: '#F0F7FF',
            },
          ]}
          activeOpacity={0.7}
          onPress={() => {
            setSelectedItemId((item.id || item._id).toString());
            addItem(item);
          }}
        >
          {/* Item Image */}
          <View style={styles.itemImageContainer}>
            {hasImage ? (
              <Image
                source={{ uri: fixImageUrl(item.images[0]) }}
                style={styles.itemImage}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.itemImagePlaceholder}>
                <ImageIcon size={28} color="#CBD5E1" />
              </View>
            )}
          </View>

          {/* Item Name */}
          <Text style={styles.itemName} numberOfLines={2}>
            {item.name}
          </Text>

          {/* Price Row */}
          <Text style={styles.itemPrice}>₹{price}</Text>

          {/* Stock Badge */}
          <StatusBadge
            label={`${stock} in stock`}
            variant={stock > 0 ? 'success' : 'error'}
            style={{ marginTop: 4, alignSelf: 'center' }}
          />

          {/* Quantity Controls */}
          {qty > 0 ? (
            <View style={styles.qtyControlRow}>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => removeItem(item)}
                activeOpacity={0.7}
              >
                <Minus size={14} color={PRIMARY} />
              </TouchableOpacity>
              <View style={styles.qtyValueContainer}>
                <Text style={styles.qtyValue}>{qty}</Text>
              </View>
              <TouchableOpacity
                style={[styles.qtyBtn, styles.qtyBtnAdd]}
                onPress={() => addItem(item)}
                activeOpacity={0.7}
              >
                <Plus size={14} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.qtyControlRow}>
              <TouchableOpacity
                style={styles.qtyBtnEmpty}
                onPress={() => addItem(item)}
                activeOpacity={0.7}
              >
                <Text style={styles.qtyEmptyText}>0</Text>
              </TouchableOpacity>
              <View style={styles.qtyPriceTag}>
                <Text style={styles.qtyPriceText}>{price}</Text>
              </View>
            </View>
          )}
          {/* Cross (deselect) button — only shown when qty > 0 */}
          {qty > 0 && (
            <TouchableOpacity
              style={styles.crossBtn}
              onPress={(e) => {
                e.stopPropagation && e.stopPropagation();
                clearItem(item);
                setSelectedItemId(null);
              }}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <X size={12} color="#FFF" />
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      );
    },
    [getQuantity, addItem, removeItem, clearItem, selectedItemId]
  );

  const renderGroupedSection = ({ item: group }: { item: { categoryName: string; data: any[] } }) => (
    <View style={styles.categorySection}>
      {/* Category Header */}
      <View style={styles.categoryHeader}>
        <Text style={styles.categoryTitle}>{group.categoryName.toUpperCase()}</Text>
        <View style={styles.categoryDivider} />
      </View>

      {/* Items Grid */}
      <View style={styles.itemsGrid}>
        {group.data.map(renderItemCard)}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={PRIMARY} barStyle="light-content" />

      {/* ═══ Header ═══ */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
            <ArrowLeft color="#FFF" size={24} />
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>Select Items</Text>
            {party?.name && (
              <Text style={styles.headerSubtitle} numberOfLines={1}>
                {partyType}: {party.name}
              </Text>
            )}
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity onPress={openSearch} style={styles.headerBtn}>
              <Search color="#FFF" size={20} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerBtn}>
              <ScanLine color="#FFF" size={20} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerBtn}>
              <LayoutGrid color="#FFF" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* ═══ Search Bar (Expandable) ═══ */}
      <SearchBar
        isVisible={isSearchOpen}
        value={search}
        onChangeText={setSearch}
        onCancel={closeSearch}
        placeholder="Search items..."
      />

      {/* ═══ Filter Toolbar ═══ */}
      <View style={styles.filterToolbar}>
        {/* Category Dropdown */}
        <View style={{ zIndex: 1000 }}>
          <TouchableOpacity
            style={styles.categoryDropdown}
            onPress={() => setShowCatDropdown(!showCatDropdown)}
            activeOpacity={0.7}
          >
            <Text style={styles.categoryDropdownText} numberOfLines={1}>
              {selectedCategoryName}
            </Text>
            <ChevronDown color="#64748B" size={14} />
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
                <Text style={[styles.dropdownItemText, !selectedCategoryId && styles.dropdownItemActive]}>
                  All Categories
                </Text>
              </TouchableOpacity>
              {categories.map((cat: any) => (
                <TouchableOpacity
                  key={cat.id || cat._id}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedCategoryId((cat.id || cat._id).toString());
                    setShowCatDropdown(false);
                  }}
                >
                  <Text
                    style={[
                      styles.dropdownItemText,
                      selectedCategoryId === (cat.id || cat._id).toString() && styles.dropdownItemActive,
                    ]}
                  >
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* + Item Button */}
        <PrimaryButton
          title="+ Item"
          variant="outlined"
          size="sm"
          onPress={() => navigation.navigate('NewItem')}
          style={{ borderRadius: 6, paddingHorizontal: 12 }}
        />

        {/* HOLD Button */}
        <PrimaryButton
          title="HOLD"
          variant="outlined"
          size="sm"
          onPress={() => { }}
          style={{ borderRadius: 6, paddingHorizontal: 16 }}
        />

        {/* Parcel Button */}
        <PrimaryButton
          title="Parcel"
          variant="outlined"
          size="sm"
          onPress={() => { }}
          style={{ borderRadius: 6, paddingHorizontal: 12 }}
        />

        {/* Barcode Scan */}
        <TouchableOpacity style={styles.barcodeScanBtn}>
          <ScanLine color="#64748B" size={20} />
        </TouchableOpacity>
      </View>

      {/* ═══ Items List ═══ */}
      {itemsLoading && !refreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={PRIMARY} />
          <Text style={styles.loadingText}>Loading items...</Text>
        </View>
      ) : (
        <FlatList
          data={groupedItems}
          keyExtractor={(item, index) => `${item.categoryName}-${index}`}
          renderItem={renderGroupedSection}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          onRefresh={onRefresh}
          refreshing={refreshing}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <ShoppingCart size={48} color="#CBD5E1" />
              <Text style={styles.emptyText}>No items found</Text>
              <Text style={styles.emptySubText}>
                Try changing the category or search query
              </Text>
            </View>
          }
        />
      )}

      {/* ═══ Bottom Bar ═══ */}
      <View style={styles.bottomBar}>
        {/* Totals Row */}
        <View style={styles.bottomTotals}>
          <View style={styles.bottomTotalItem}>
            <Text style={styles.bottomLabel}>Total:</Text>
            <Text style={styles.bottomValue}>{totalAmount.toFixed(1)}</Text>
          </View>

          <View style={styles.receivedCheckbox}>
            <CheckCircle2 size={18} color={PRIMARY} />
            <Text style={styles.receivedText}>Received:{totalAmount.toFixed(1)}</Text>
          </View>
        </View>

        {/* Action Buttons Row */}
        <View style={styles.bottomActions}>
          <PrimaryButton
            title="DETAILS"
            variant="outlined"
            size="sm"
            onPress={() => {
              navigation.navigate('NewSale', {
                cartEntries,
                totalAmount,
                party,
                partyType,
              });
            }}
            style={styles.bottomActionBtn}
            textStyle={{ fontSize: 13, letterSpacing: 0.5 }}
          />

          <PrimaryButton
            title="KOT"
            variant="outlined"
            size="sm"
            onPress={() => { }}
            style={styles.bottomActionBtn}
            textStyle={{ fontSize: 13, letterSpacing: 0.5 }}
          />

          <PrimaryButton
            title={`NEXT (₹ ${totalAmount.toFixed(1)})`}
            variant="filled"
            size="sm"
            onPress={() => {
              navigation.navigate('SaleDetails', {
                cartEntries,
                totalAmount,
                party,
                partyType,
              });
            }}
            disabled={totalQuantity === 0}
            style={[styles.bottomNextBtn]}
            textStyle={{ fontSize: 13, letterSpacing: 0.5 }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

// ─── Styles ──────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  // Header
  header: {
    backgroundColor: PRIMARY,
    paddingTop: 4,
    paddingBottom: 14,
    paddingHorizontal: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerBtn: {
    padding: 6,
  },
  headerCenter: {
    flex: 1,
    marginLeft: 8,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 11,
    marginTop: 1,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },

  // Search
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 12,
    marginTop: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: '#1E293B',
    padding: 0,
  },

  // Filter Toolbar
  filterToolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    zIndex: 1000,
  },
  categoryDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap: 4,
    minWidth: 70,
  },
  categoryDropdownText: {
    fontSize: 12,
    color: '#334155',
    fontWeight: '500',
    maxWidth: 50,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 40,
    left: 0,
    backgroundColor: '#FFFFFF',
    width: 170,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 2000,
  },
  dropdownItem: {
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  dropdownItemText: {
    fontSize: 13,
    color: '#475569',
  },
  dropdownItemActive: {
    color: PRIMARY,
    fontWeight: '700',
  },
  barcodeScanBtn: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 6,
    padding: 7,
  },

  // Items List
  listContent: {
    paddingBottom: 140,
    paddingTop: 4,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  loadingText: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    gap: 8,
  },
  emptyText: {
    color: '#64748B',
    fontSize: 16,
    fontWeight: '600',
  },
  emptySubText: {
    color: '#94A3B8',
    fontSize: 13,
  },

  // Category Section
  categorySection: {
    marginBottom: 8,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  categoryTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: PRIMARY,
    letterSpacing: 0.8,
    marginRight: 10,
  },
  categoryDivider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },

  // Items Grid
  itemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
  },

  // Item Card
  itemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 8,
    margin: 4,
    width: '30%',
    minWidth: 100,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
    flexGrow: 1,
    maxWidth: '33%',
    position: 'relative',
  },
  crossBtn: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    elevation: 3,
  },
  itemImageContainer: {
    width: '100%',
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#F1F5F9',
    marginBottom: 6,
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  itemImagePlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1E293B',
    textAlign: 'center',
    lineHeight: 14,
    minHeight: 28,
  },
  itemPrice: {
    fontSize: 13,
    fontWeight: '800',
    color: PRIMARY,
    marginTop: 2,
  },

  // Quantity Controls
  qtyControlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 0,
  },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#E8F0FE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnAdd: {
    backgroundColor: PRIMARY,
  },
  qtyValueContainer: {
    minWidth: 32,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginHorizontal: 2,
    borderRadius: 4,
  },
  qtyValue: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B',
  },
  qtyBtnEmpty: {
    width: 32,
    height: 28,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  qtyEmptyText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#94A3B8',
  },
  qtyPriceTag: {
    height: 28,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    marginLeft: 4,
  },
  qtyPriceText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },

  // Bottom Bar
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 10,
  },
  bottomTotals: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  bottomTotalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  bottomLabel: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
  bottomValue: {
    fontSize: 14,
    color: '#1E293B',
    fontWeight: '700',
  },
  receivedCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  receivedText: {
    fontSize: 13,
    color: '#1E293B',
    fontWeight: '500',
  },
  bottomActions: {
    flexDirection: 'row',
    gap: 8,
  },
  bottomActionBtn: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 10,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
  },
  bottomNextBtn: {
    flex: 2,
    borderRadius: 8,
    paddingVertical: 10,
  },
});
