// import React, { useState, useCallback } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { ArrowLeft, Search, ScanLine, ChevronDown, Check } from 'lucide-react-native';
// import { useSelector } from 'react-redux';

// import FloatingInput from '../components/ui/FloatingInput';
// import PrimaryButton from '../components/ui/PrimaryButton';

// const PRIMARY = '#1A73E8';

// // ─── DOB auto-formatter: enforces dd-mm-yyyy as user types ──────────────────
// function formatDOB(text: string): string {
//   // Strip everything that's not a digit
//   const digits = text.replace(/\D/g, '');
//   // Insert dashes at positions 2 and 4 → dd-mm-yyyy
//   if (digits.length <= 2) return digits;
//   if (digits.length <= 4) return `${digits.slice(0, 2)}-${digits.slice(2)}`;
//   return `${digits.slice(0, 2)}-${digits.slice(2, 4)}-${digits.slice(4, 8)}`;
// }

// // ─── Floating-label Dropdown (mirrors FloatingInput look) ────────────────────
// function FloatingDropdown({
//   label,
//   value,
//   options,
//   onSelect,
// }: {
//   label: string;
//   value: string;
//   options: { id: string; name: string }[];
//   onSelect: (item: { id: string; name: string }) => void;
// }) {
//   const [open, setOpen] = useState(false);
//   const isLabelFloated = Boolean(value);

//   return (
//     <View style={[styles.wrapper, { zIndex: open ? 100 : 1 }]}>
//       {isLabelFloated && <Text style={styles.floatedLabel}>{label}</Text>}

//       <TouchableOpacity
//         onPress={() => setOpen(!open)}
//         activeOpacity={0.8}
//         style={[styles.inputBox, open && styles.inputBoxFocused]}
//       >
//         <Text
//           style={[styles.dropdownText, !value && styles.dropdownPlaceholder]}
//           numberOfLines={1}
//         >
//           {value || label}
//         </Text>
//         <ChevronDown
//           size={20}
//           color="#6B7280"
//           style={{ transform: [{ rotate: open ? '180deg' : '0deg' }] }}
//         />
//       </TouchableOpacity>

//       {open && (
//         <View style={styles.dropdownMenu}>
//           {options.map((opt) => (
//             <TouchableOpacity
//               key={opt.id}
//               style={styles.dropdownItem}
//               onPress={() => {
//                 onSelect(opt);
//                 setOpen(false);
//               }}
//             >
//               <Text
//                 style={[
//                   styles.dropdownItemText,
//                   value === opt.name && styles.dropdownItemActive,
//                 ]}
//               >
//                 {opt.name}
//               </Text>
//               {value === opt.name && (
//                 <Check size={16} color={PRIMARY} />
//               )}
//             </TouchableOpacity>
//           ))}
//         </View>
//       )}
//     </View>
//   );
// }

// // ─── Payment Chip ────────────────────────────────────────────────────────────
// function PaymentChip({
//   label,
//   selected,
//   onPress,
// }: {
//   label: string;
//   selected: boolean;
//   onPress: () => void;
// }) {
//   return (
//     <TouchableOpacity
//       onPress={onPress}
//       activeOpacity={0.75}
//       style={[
//         styles.paymentChip,
//         selected && styles.paymentChipSelected,
//       ]}
//     >
//       <Text style={[styles.paymentChipText, selected && styles.paymentChipTextSelected]}>
//         {label}
//       </Text>
//     </TouchableOpacity>
//   );
// }

// // ─── Main Screen ─────────────────────────────────────────────────────────────
// export default function SaleDetailsScreen({ navigation, route }: any) {
//   const { cartEntries = [], totalAmount = 0, party, partyType } = route?.params || {};

//   // Only admin is shown in AssignStaff
//   const { user } = useSelector((state: any) => state.auth);
//   const adminOption = user
//     ? [{ id: user.id || user._id || '1', name: user.name || user.email || 'Admin' }]
//     : [{ id: '1', name: 'Admin' }];

//   // ─── Form State ─────────────────────────────────────────
//   const [partyPhone, setPartyPhone] = useState(party?.phone || '');
//   const [dob, setDob] = useState('');
//   const [customerName, setCustomerName] = useState(party?.name || '');
//   const [billingAddress, setBillingAddress] = useState(party?.billing_address || '');
//   const [assignedStaff, setAssignedStaff] = useState('');
//   const [paymentMode, setPaymentMode] = useState<'Bank' | 'Cash' | 'Cheque'>('Cash');

//   const handleSave = useCallback(() => {
//     const salePayload = {
//       cartEntries,
//       totalAmount,
//       party,
//       partyType,
//       partyPhone,
//       dob,
//       customerName,
//       billingAddress,
//       assignedStaff,
//       paymentMode,
//     };
//     console.log('[SaleDetails] 💾 Saving sale:', salePayload);
//     // TODO: Call createSale API in the next chat
//   }, [cartEntries, totalAmount, party, partyType, partyPhone, dob, customerName, billingAddress, assignedStaff, paymentMode]);

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar backgroundColor={PRIMARY} barStyle="light-content" />

//       {/* ═══ Header ═══ */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
//           <ArrowLeft size={24} color="#FFF" />
//         </TouchableOpacity>

//         <View style={styles.headerCenter}>
//           <Text style={styles.headerTitle}>Search</Text>
//           <Text style={styles.headerSubtitle}>FAST v39.08 | 9518795065 | 1043</Text>
//         </View>

//         <View style={styles.headerActions}>
//           <TouchableOpacity style={styles.headerBtn}>
//             <Search size={22} color="#FFF" />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.headerBtn}>
//             <ScanLine size={22} color="#FFF" />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.headerBtn}>
//             {/* Placeholder for barcode icon */}
//             <View style={styles.gridIcon}>
//               {[...Array(4)].map((_, i) => (
//                 <View key={i} style={styles.gridDot} />
//               ))}
//             </View>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* ═══ Form ═══ */}
//       <ScrollView
//         style={styles.scrollView}
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator={false}
//         keyboardShouldPersistTaps="handled"
//       >
//         {/* Party Phone + DOB (side by side) */}
//         <View style={styles.rowFields}>
//           <View style={{ flex: 1.4 }}>
//             <FloatingInput
//               label="Party phone"
//               value={partyPhone}
//               onChangeText={setPartyPhone}
//               keyboardType="phone-pad"
//               containerStyle={{ marginBottom: 0 }}
//             />
//           </View>
//           <View style={{ width: 12 }} />
//           <View style={{ flex: 1 }}>
//             <FloatingInput
//               label="DOB"
//               value={dob}
//               onChangeText={setDob}
//               keyboardType="numeric"
//               formatValue={formatDOB}
//               containerStyle={{ marginBottom: 0 }}
//             />
//           </View>
//         </View>

//         <View style={{ height: 20 }} />

//         {/* Customer/Supplier Name */}
//         <FloatingInput
//           label="Customer/Supplier Name"
//           value={customerName}
//           onChangeText={setCustomerName}
//         />

//         {/* Billing Address */}
//         <FloatingInput
//           label="Billing Address"
//           value={billingAddress}
//           onChangeText={setBillingAddress}
//           multiline
//         />

//         {/* Assign Staff Dropdown (admin only) */}
//         <FloatingDropdown
//           label="Assign Staff"
//           value={assignedStaff}
//           options={adminOption}
//           onSelect={(opt) => setAssignedStaff(opt.name)}
//         />
//       </ScrollView>

//       {/* ═══ Bottom Bar ═══ */}
//       <View style={styles.bottomBar}>
//         {/* Totals */}
//         <View style={styles.totalsRow}>
//           <Text style={styles.totalText}>
//             Total:{totalAmount.toFixed(1)}
//           </Text>

//           <View style={styles.receivedRow}>
//             <View style={styles.receivedCheck}>
//               <Check size={16} color="#FFF" />
//             </View>
//             <Text style={styles.receivedText}>
//               Received:{totalAmount.toFixed(1)}
//             </Text>
//           </View>
//         </View>

//         {/* Payment Mode Chips */}
//         <View style={styles.paymentChips}>
//           {(['Bank', 'Cash', 'Cheque'] as const).map((mode) => (
//             <PaymentChip
//               key={mode}
//               label={mode}
//               selected={paymentMode === mode}
//               onPress={() => setPaymentMode(mode)}
//             />
//           ))}
//         </View>

//         {/* Action Buttons */}
//         <View style={styles.actionButtons}>
//           <PrimaryButton
//             title="DETAILS"
//             variant="outlined"
//             size="sm"
//             onPress={() => {}}
//             style={styles.detailsBtn}
//             textStyle={styles.detailsBtnText}
//           />

//           <PrimaryButton
//             title="KOT"
//             variant="outlined"
//             size="sm"
//             onPress={() => {}}
//             style={styles.kotBtn}
//             textStyle={styles.kotBtnText}
//           />

//           <PrimaryButton
//             title={`SAVE (₹${totalAmount.toFixed(1)})`}
//             variant="filled"
//             size="sm"
//             onPress={handleSave}
//             style={styles.saveBtn}
//             textStyle={styles.saveBtnText}
//           />
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// }

// // ─── Styles ───────────────────────────────────────────────────────────────────
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F3F4F6',
//   },

//   // Header
//   header: {
//     backgroundColor: PRIMARY,
//     paddingHorizontal: 12,
//     paddingTop: 4,
//     paddingBottom: 14,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   headerBtn: {
//     padding: 6,
//   },
//   headerCenter: {
//     flex: 1,
//     marginLeft: 4,
//   },
//   headerTitle: {
//     color: '#FFF',
//     fontSize: 22,
//     fontWeight: '800',
//     letterSpacing: 0.2,
//   },
//   headerSubtitle: {
//     color: 'rgba(255,255,255,0.75)',
//     fontSize: 11,
//     marginTop: 1,
//   },
//   headerActions: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   gridIcon: {
//     width: 20,
//     height: 20,
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 3,
//     padding: 2,
//   },
//   gridDot: {
//     width: 7,
//     height: 7,
//     borderRadius: 1,
//     backgroundColor: '#FFF',
//   },

//   // Form
//   scrollView: {
//     flex: 1,
//   },
//   scrollContent: {
//     paddingHorizontal: 16,
//     paddingTop: 28,
//     paddingBottom: 200,
//   },
//   rowFields: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//   },

//   // FloatingInput styles (shared for FloatingDropdown)
//   wrapper: {
//     marginBottom: 20,
//     position: 'relative',
//   },
//   floatedLabel: {
//     position: 'absolute',
//     left: 14,
//     top: -9,
//     backgroundColor: '#F3F4F6',
//     paddingHorizontal: 4,
//     fontSize: 11,
//     fontWeight: '600',
//     color: PRIMARY,
//     zIndex: 10,
//     letterSpacing: 0.2,
//   },
//   inputBox: {
//     backgroundColor: '#FFFFFF',
//     borderWidth: 1,
//     borderColor: '#D1D5DB',
//     borderRadius: 12,
//     paddingHorizontal: 14,
//     paddingVertical: 14,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   inputBoxFocused: {
//     borderColor: PRIMARY,
//     borderWidth: 1.5,
//   },

//   // Dropdown
//   dropdownText: {
//     flex: 1,
//     fontSize: 15,
//     color: '#1E293B',
//   },
//   dropdownPlaceholder: {
//     color: '#9CA3AF',
//   },
//   dropdownMenu: {
//     position: 'absolute',
//     top: '100%',
//     left: 0,
//     right: 0,
//     backgroundColor: '#FFF',
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: '#E2E8F0',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.12,
//     shadowRadius: 8,
//     elevation: 8,
//     zIndex: 200,
//     marginTop: 4,
//   },
//   dropdownItem: {
//     paddingHorizontal: 16,
//     paddingVertical: 13,
//     borderBottomWidth: 1,
//     borderBottomColor: '#F1F5F9',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   dropdownItemText: {
//     fontSize: 14,
//     color: '#374151',
//   },
//   dropdownItemActive: {
//     color: PRIMARY,
//     fontWeight: '700',
//   },

//   // Bottom Bar
//   bottomBar: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: '#FFF',
//     borderTopWidth: 1,
//     borderTopColor: '#E2E8F0',
//     paddingHorizontal: 14,
//     paddingTop: 10,
//     paddingBottom: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: -3 },
//     shadowOpacity: 0.07,
//     shadowRadius: 6,
//     elevation: 10,
//   },
//   totalsRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   totalText: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#1E293B',
//   },
//   receivedRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 6,
//   },
//   receivedCheck: {
//     width: 22,
//     height: 22,
//     borderRadius: 4,
//     backgroundColor: PRIMARY,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   receivedText: {
//     fontSize: 15,
//     fontWeight: '500',
//     color: '#1E293B',
//   },

//   // Payment Chips
//   paymentChips: {
//     flexDirection: 'row',
//     gap: 8,
//     marginBottom: 12,
//   },
//   paymentChip: {
//     paddingHorizontal: 20,
//     paddingVertical: 8,
//     borderRadius: 100,
//     borderWidth: 1.5,
//     borderColor: PRIMARY,
//     backgroundColor: '#FFF',
//   },
//   paymentChipSelected: {
//     backgroundColor: '#E8F0FE',
//   },
//   paymentChipText: {
//     fontSize: 15,
//     color: PRIMARY,
//     fontWeight: '500',
//   },
//   paymentChipTextSelected: {
//     fontWeight: '700',
//   },

//   // Action buttons
//   actionButtons: {
//     flexDirection: 'row',
//     gap: 8,
//   },
//   detailsBtn: {
//     flex: 1,
//     borderRadius: 8,
//     paddingVertical: 12,
//     borderColor: '#CBD5E1',
//     backgroundColor: '#FFF',
//   },
//   detailsBtnText: {
//     color: '#6B7280',
//     fontSize: 14,
//     letterSpacing: 0.5,
//   },
//   kotBtn: {
//     flex: 1,
//     borderRadius: 8,
//     paddingVertical: 12,
//     borderColor: '#CBD5E1',
//     backgroundColor: '#F3F4F6',
//   },
//   kotBtnText: {
//     color: '#6B7280',
//     fontSize: 14,
//     letterSpacing: 0.5,
//   },
//   saveBtn: {
//     flex: 2,
//     borderRadius: 8,
//     paddingVertical: 12,
//     backgroundColor: PRIMARY,
//   },
//   saveBtnText: {
//     fontSize: 14,
//     letterSpacing: 0.5,
//   },
// });



import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Search,
  ScanLine,
  ChevronDown,
  Check,
} from 'lucide-react-native';
import { useSelector } from 'react-redux';

import FloatingInput from '../components/ui/FloatingInput';
import PrimaryButton from '../components/ui/PrimaryButton';
import { useSearch } from '../hooks/useSearch';
import { useCreateSaleMutation } from '../redux/api/saleApi';
import { useGetPartiesQuery } from '../redux/api/partyApi';
import CustomAlert from '../components/CustomAlert';
import { SearchBar } from 'react-native-screens';

const PRIMARY = '#1A73E8';

// ─────────────────────────────────────────────────────────────
// DOB FORMAT
// ─────────────────────────────────────────────────────────────

function formatDOB(text: string): string {
  const digits = text.replace(/\D/g, '');

  if (digits.length <= 2) return digits;

  if (digits.length <= 4) {
    return `${digits.slice(0, 2)}-${digits.slice(2)}`;
  }

  return `${digits.slice(0, 2)}-${digits.slice(
    2,
    4
  )}-${digits.slice(4, 8)}`;
}

// ─────────────────────────────────────────────────────────────
// FLOATING DROPDOWN
// ─────────────────────────────────────────────────────────────

function FloatingDropdown({
  label,
  value,
  options,
  onSelect,
}: {
  label: string;
  value: string;
  options: { id: string; name: string }[];
  onSelect: (item: { id: string; name: string }) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <View className="mb-5 z-50">
      {!!value && (
        <Text className="absolute left-3 -top-2 z-10 bg-[#F4F6FA] px-1 text-[11px] font-semibold text-[#1A73E8]">
          {label}
        </Text>
      )}

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setOpen(!open)}
        className={`
          bg-white
          border
          rounded-2xl
          px-4
          py-4
          flex-row
          items-center
          ${open ? 'border-[#1A73E8]' : 'border-[#D1D5DB]'}
        `}
      >
        <Text
          className={`flex-1 text-[15px] ${
            value ? 'text-[#0F172A]' : 'text-[#9CA3AF]'
          }`}
          numberOfLines={1}
        >
          {value || label}
        </Text>

        <ChevronDown
          size={20}
          color="#6B7280"
          style={{
            transform: [{ rotate: open ? '180deg' : '0deg' }],
          }}
        />
      </TouchableOpacity>

      {open && (
        <View className="absolute top-[58px] left-0 right-0 bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-lg">
          {options.map((opt) => (
            <TouchableOpacity
              key={opt.id}
              activeOpacity={0.8}
              onPress={() => {
                onSelect(opt);
                setOpen(false);
              }}
              className="px-4 py-4 border-b border-[#F1F5F9] flex-row items-center justify-between"
            >
              <Text
                className={`text-[14px] ${
                  value === opt.name
                    ? 'text-[#1A73E8] font-bold'
                    : 'text-[#334155]'
                }`}
              >
                {opt.name}
              </Text>

              {value === opt.name && (
                <Check size={16} color={PRIMARY} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

// ─────────────────────────────────────────────────────────────
// PAYMENT CHIP
// ─────────────────────────────────────────────────────────────

function PaymentChip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      className={`
        px-5
        py-2.5
        rounded-full
        border
        ${
          selected
            ? 'bg-[#E8F0FE] border-[#1A73E8]'
            : 'bg-white border-[#CBD5E1]'
        }
      `}
    >
      <Text
        className={`text-[15px] ${
          selected
            ? 'text-[#1A73E8] font-bold'
            : 'text-[#64748B] font-medium'
        }`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

// ─────────────────────────────────────────────────────────────
// SCREEN
// ─────────────────────────────────────────────────────────────

export default function SaleDetailsScreen({
  navigation,
  route,
}: any) {
  const {
    cartEntries = [],
    totalAmount: initialTotal = 0,
    subtotal: initialSubtotal = 0,
    discount: passedDiscount = 0,
    party,
    partyType,
    paymentMode: initialPaymentMode,
  } = route?.params || {};

  const { user } = useSelector((state: any) => state.auth);

  const adminOption = user
    ? [
        {
          id: user.id || user._id || '1',
          name: user.name || user.email || 'Admin',
        },
      ]
    : [{ id: '1', name: 'Admin' }];

  const [partyPhone, setPartyPhone] = useState(
    party?.phone || ''
  );

  const [dob, setDob] = useState('');

  const [customerName, setCustomerName] = useState(
    party?.name || ''
  );

  const [billingAddress, setBillingAddress] = useState(
    party?.billing_address || ''
  );

  const [assignedStaff, setAssignedStaff] = useState('');

  const [discount, setDiscount] = useState(passedDiscount.toString());

  const { subtotal, totalAmount, discountPercentage } = useMemo(() => {
    const sub = initialSubtotal || cartEntries.reduce((sum: number, e: any) => {
      const price = e.item?.sellPrice || e.item?.price || 0;
      return sum + price * (e.quantity || 1);
    }, 0);
    const disc = parseFloat(discount) || 0;
    const total = Math.max(0, sub - disc);
    const percent = sub > 0 ? (disc / sub) * 100 : 0;
    return { subtotal: sub, totalAmount: total, discountPercentage: percent };
  }, [cartEntries, discount, initialSubtotal]);

  const [paymentMode, setPaymentMode] = useState<
    'Bank' | 'Cash' | 'Cheque' | 'UPI' | 'Card'
  >(initialPaymentMode || 'Cash');

  const [createSale, { isLoading: isSaving }] = useCreateSaleMutation();
  const { data: salesmenData } = useGetPartiesQuery({ type: 'salesman' });
  const [alertConfig, setAlertConfig] = useState<any>(null);

  const salesmen = useMemo(() => {
    return Array.isArray(salesmenData) ? salesmenData : salesmenData?.data || salesmenData?.parties || [];
  }, [salesmenData]);

  const showAlert = (title: string, message: string, onConfirm?: () => void, onCancel?: () => void, type: any = 'info') => {
    setAlertConfig({ visible: true, title, message, onConfirm, onCancel, type });
  };

  const { search, setSearch, isSearchOpen, openSearch, closeSearch } = useSearch();

  const handleSave = async () => {
    const validSalesmanId = salesmen[0]?.id || salesmen[0]?._id || 'c2022aeb-6ae5-4d6a-b096-adadaa4d52cc';

    const salePayload = {
      customer_id: party?.id || party?._id,
      salesman_id: validSalesmanId,
      payment_method: paymentMode.toLowerCase(),
      discount: parseFloat(discount) || 0,
      amount_received: totalAmount,
      items: cartEntries.map((entry: any) => ({
        product_id: entry.item?.id || entry.item?._id,
        quantity: entry.quantity,
        price: entry.item?.sellPrice || entry.item?.price || 0,
      })),
    };

    try {
      console.log('[SaleDetails] 💾 Saving sale to API:', JSON.stringify(salePayload, null, 2));
      const response = await createSale(salePayload).unwrap();
      console.log('[SaleDetails] ✅ Sale saved:', response);

      const savedSaleId = response.sale?.id || response.sale?._id || response.message?.id || response.id;
      const savedSaleData = response.sale || response.message || response;

      showAlert('Success', 'Sale saved successfully!', () => {
        navigation.navigate('SaleSummary', { 
          saleId: savedSaleId, 
          saleData: savedSaleData,
          paymentMode: paymentMode,
          discount: parseFloat(discount) || 0,
          autoSendWhatsApp: true
        });
      }, undefined, 'success');
    } catch (err: any) {
      console.error('[SaleDetails] ❌ Save failed:', err);
      showAlert('Error', err?.data?.message || 'Failed to save sale', undefined, undefined, 'error');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F4F6FA]">
      <StatusBar
        backgroundColor={PRIMARY}
        barStyle="light-content"
      />

      {/* HEADER */}

      <View className="bg-[#1A73E8] px-3 pt-1 pb-4 flex-row items-center">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2"
        >
          <ArrowLeft size={24} color="#FFF" />
        </TouchableOpacity>

        <View className="flex-1 ml-1">
          <Text className="text-white text-[22px] font-extrabold">
            Search
          </Text>

          <Text className="text-white/70 text-[11px] mt-0.5">
            FAST v39.08 | 9518795065 | 1043
          </Text>
        </View>

        <View className="flex-row items-center">
          <TouchableOpacity onPress={openSearch} className="p-2">
            <Search size={22} color="#FFF" />
          </TouchableOpacity>

          <TouchableOpacity className="p-2">
            <ScanLine size={22} color="#FFF" />
          </TouchableOpacity>

          <TouchableOpacity className="p-2">
            <View className="w-5 h-5 flex-row flex-wrap gap-[2px]">
              {[...Array(4)].map((_, i) => (
                <View
                  key={i}
                  className="w-2 h-2 rounded-[2px] bg-white"
                />
              ))}
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <SearchBar
        isVisible={isSearchOpen}
        value={search}
        onChangeText={setSearch}
        onCancel={closeSearch}
      />

      {/* CONTENT */}

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 28,
          paddingBottom: 220,
        }}
      >
        {/* FORM CARD */}

        <View className="bg-white rounded-[28px] border border-[#E5E7EB] px-4 py-5 shadow-sm">
          {/* ROW */}

          <View className="flex-row items-start">
            <View className="flex-[1.4]">
              <FloatingInput
                label="Party phone"
                value={partyPhone}
                onChangeText={setPartyPhone}
                keyboardType="phone-pad"
                containerStyle={{ marginBottom: 0 }}
              />
            </View>

            <View className="w-3" />

            <View className="flex-1">
              <FloatingInput
                label="DOB"
                value={dob}
                onChangeText={setDob}
                keyboardType="numeric"
                formatValue={formatDOB}
                containerStyle={{ marginBottom: 0 }}
              />
            </View>
          </View>

          <View className="h-5" />

          <FloatingInput
            label="Customer/Supplier Name"
            value={customerName}
            onChangeText={setCustomerName}
          />

          <FloatingInput
            label="Billing Address"
            value={billingAddress}
            onChangeText={setBillingAddress}
            multiline
          />

          <FloatingDropdown
            label="Assign Staff"
            value={assignedStaff}
            // options={adminOption}
            options={[
              {
                id: '1',
                name: 'Admin',
              },
            ]}
            onSelect={(opt) => setAssignedStaff(opt.name)}
          />

          {/* ✨ NEW: Discount */}
          <View className="h-5" />
          <View className="flex-row items-center">
            <View className="flex-1">
              <FloatingInput
                label="Discount (₹)"
                value={discount}
                onChangeText={setDiscount}
                containerStyle={{ marginBottom: 0 }}
                keyboardType="numeric"
              />
            </View>
            {parseFloat(discount) > 0 && (
              <View className="ml-3 bg-blue-50 px-3 py-2 rounded-xl border border-blue-100">
                <Text className="text-blue-600 font-bold">
                  {discountPercentage.toFixed(1)}%
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* BOTTOM BAR */}

      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#E2E8F0] px-4 pt-3 pb-4">
        <View className="flex-row justify-between items-center mb-3">
          <View>
            <Text className="text-[12px] text-[#64748B] font-medium">
              Sub Total: ₹{subtotal.toFixed(1)}
            </Text>
            {parseFloat(discount) > 0 && (
              <Text className="text-[12px] text-red-500 font-medium">
                Discount: -₹{parseFloat(discount).toFixed(1)} ({discountPercentage.toFixed(1)}%)
              </Text>
            )}
          </View>

          <View className="items-end">
            <Text className="text-[17px] font-black text-[#0F172A]">
              Grand Total: ₹{totalAmount.toFixed(1)}
            </Text>
            <View className="flex-row items-center mt-0.5">
              <View className="w-4 h-4 rounded-full bg-[#16A34A] items-center justify-center mr-1">
                <Check size={10} color="#FFF" />
              </View>
              <Text className="text-[12px] font-bold text-[#16A34A]">
                Received
              </Text>
            </View>
          </View>
        </View>

        {/* PAYMENT */}

        <View className="flex-row gap-2 mb-3 flex-wrap">
          {(['Bank', 'Cash', 'Cheque', 'UPI', 'Card'] as const).map(
            (mode) => (
              <PaymentChip
                key={mode}
                label={mode}
                selected={paymentMode === mode}
                onPress={() => setPaymentMode(mode)}
              />
            )
          )}
        </View>

        {/* BUTTONS */}

        <View className="flex-row gap-2">
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
                paymentMode,
              });
            }}
            style={{
              flex: 1,
              borderRadius: 12,
              paddingVertical: 12,
              borderColor: '#CBD5E1',
              backgroundColor: '#FFFFFF',
            }}
            textStyle={{
              color: '#64748B',
              fontSize: 14,
            }}
          />

          <PrimaryButton
            title="KOT"
            variant="outlined"
            size="sm"
            onPress={() => {}}
            style={{
              flex: 1,
              borderRadius: 12,
              paddingVertical: 12,
              borderColor: '#CBD5E1',
              backgroundColor: '#F8FAFC',
            }}
            textStyle={{
              color: '#64748B',
              fontSize: 14,
            }}
          />

          <PrimaryButton
            title={isSaving ? "SAVING..." : `SAVE (₹${totalAmount.toFixed(1)})`}
            variant="filled"
            size="sm"
            disabled={isSaving}
            onPress={handleSave}
            style={{
              flex: 2,
              borderRadius: 12,
              paddingVertical: 12,
              backgroundColor: PRIMARY,
              opacity: isSaving ? 0.7 : 1
            }}
            textStyle={{
              fontSize: 14,
            }}
          />
        </View>
      </View>

      {alertConfig && (
        <CustomAlert
          visible={alertConfig.visible}
          title={alertConfig.title}
          message={alertConfig.message}
          type={alertConfig.type}
          onClose={() => {
            setAlertConfig(null);
            alertConfig.onConfirm?.();
          }}
          onCancel={() => {
            setAlertConfig(null);
            alertConfig.onCancel?.();
          }}
        />
      )}
    </SafeAreaView>
  );
}