// import React, { useState } from 'react';
// import {
//   ScrollView,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   StatusBar,
// } from 'react-native';
// import {
//   ArrowLeft,
//   Search,
//   Shapes,
//   ScanLine,
//   ChevronDown,
//   Pencil,
//   Trash2,
//   Check,
// } from 'lucide-react-native';

// import PrimaryButton from '../components/ui/PrimaryButton';
// import StatusBadge from '../components/ui/StatusBadge';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import FloatingInput from '../components/ui/FloatingInput';
// import SearchBar from '../components/ui/SearchBar';
// import { useSearch } from '../hooks/useSearch';

// const PRIMARY = '#1A73E8';

// export default function NewSaleScreen({ navigation, route }: any) {
//   const { cartEntries, totalAmount, party, partyType } =
//     route?.params || {
//       cartEntries: [],
//       totalAmount: 0,
//       party: null,
//       partyType: 'CUSTOMER',
//     };

//   const [billNo, setBillNo] = useState('575');

//   const [billDate, setBillDate] = useState(
//     new Date().toLocaleDateString('en-GB')
//   );

//   const [customerName, setCustomerName] = useState(
//     party?.name || ''
//   );

//   const { search, setSearch, isSearchOpen, openSearch, closeSearch } = useSearch();

//   return (
//     <SafeAreaView className="flex-1 bg-[#F8FAFC]">
//       <StatusBar
//         backgroundColor={PRIMARY}
//         barStyle="light-content"
//       />

//       {/* HEADER */}

//       <View
//         style={{ backgroundColor: PRIMARY }}
//         className="px-4 pt-2 pb-5 rounded-b-[28px]"
//       >
//         <View className="flex-row items-center justify-between">
//           <View className="flex-row items-center flex-1">
//             <TouchableOpacity
//               onPress={() => navigation.goBack()}
//               className="w-11 h-11 rounded-2xl bg-white/15 items-center justify-center mr-3"
//             >
//               <ArrowLeft size={24} color="#FFFFFF" />
//             </TouchableOpacity>

//             <View>
//               <Text className="text-white text-[24px] font-black tracking-wide">
//                 New Sale
//               </Text>

//               <Text className="text-white/70 text-xs mt-1">
//                 FAST v39.08 | 9518795065 | 1043
//               </Text>
//             </View>
//           </View>

//           <View className="flex-row items-center gap-2">
//             <TouchableOpacity 
//               onPress={openSearch}
//               className="w-11 h-11 rounded-2xl bg-white/15 items-center justify-center"
//             >
//               <Search size={22} color="#FFFFFF" />
//             </TouchableOpacity>

//             <TouchableOpacity className="w-11 h-11 rounded-2xl bg-white/15 items-center justify-center">
//               <Shapes size={22} color="#FFFFFF" />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>

//       <SearchBar
//         isVisible={isSearchOpen}
//         value={search}
//         onChangeText={setSearch}
//         onCancel={closeSearch}
//       />

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{
//           paddingBottom: 180,
//         }}
//       >
//         {/* TOP ACTIONS */}

//         <View className="flex-row items-center px-4 pt-6 gap-3">
//           <PrimaryButton
//             title="HOLD"
//             variant="outlined"
//             size="md"
//             onPress={() => { }}
//             style={{
//               flex: 1,
//               borderRadius: 16,
//               borderColor: '#CBD5E1',
//               backgroundColor: '#FFFFFF',
//               paddingVertical: 14,
//             }}
//             textStyle={{
//               color: '#64748B',
//               fontSize: 15,
//               fontWeight: '700',
//             }}
//           />

//           <PrimaryButton
//             title="Parcel"
//             variant="outlined"
//             size="md"
//             onPress={() => { }}
//             style={{
//               flex: 1,
//               borderRadius: 16,
//               borderColor: '#CBD5E1',
//               backgroundColor: '#FFFFFF',
//               paddingVertical: 14,
//             }}
//             textStyle={{
//               color: '#64748B',
//               fontSize: 15,
//               fontWeight: '700',
//             }}
//           />

//           <TouchableOpacity className="w-14 h-14 rounded-2xl border border-[#CBD5E1] items-center justify-center bg-white">
//             <ScanLine size={24} color="#64748B" />
//           </TouchableOpacity>
//         </View>

//         {/* FORM CARD */}

//         <View className="mx-4 mt-6 bg-white rounded-[28px] border border-[#E2E8F0] px-4 py-5 shadow-sm">
//           {/* BILL NO */}

//           <FloatingInput
//             label="Bill No"
//             value={billNo}
//             onChangeText={setBillNo}
//             containerStyle={{
//               marginBottom: 20,
//             }}
//           />

//             {/* BILL DATE */}

//           <FloatingInput
//             label="Bill Date"
//             value={billDate}
//             onChangeText={setBillDate}
//             containerStyle={{
//               marginBottom: 20,
//             }}
//           />

//           {/* BILLING TERM */}

//           <View className="mb-5">
//             <Text className="text-[#64748B] text-[15px] mb-2 ml-2 font-medium">
//               Billing Term
//             </Text>

//             <TouchableOpacity className="bg-[#F8FAFC] border border-[#DCE3EA] rounded-2xl h-[74px] px-5 flex-row items-center justify-between">
//               <Text className="text-[#94A3B8] text-[18px] font-semibold">
//                 Billing Term
//               </Text>

//               <ChevronDown size={24} color="#64748B" />
//             </TouchableOpacity>
//           </View>


//           {/* DUE DATE */}

//           <View className="mb-5">
//             <Text className="text-[#64748B] text-[15px] mb-2 ml-2 font-medium">
//               Bill Due Date
//             </Text>

//             <TouchableOpacity className="bg-[#F8FAFC] border border-[#DCE3EA] rounded-2xl h-[74px] px-5 justify-center">
//               <Text className="text-[#94A3B8] text-[18px] font-semibold">
//                 Bill Due Date
//               </Text>
//             </TouchableOpacity>
//           </View>

//             {/* CUSTOMER */}
            
//           <FloatingInput
//             label="Customer/Supplier Name"
//             value={customerName}
//             onChangeText={setCustomerName}
//             containerStyle={{
//               marginBottom: 20,
//             }}
//           />

//           {/* STATE */}

//           <View>
//             <Text className="text-[#64748B] text-[15px] mb-2 ml-2 font-medium">
//               Delivery States & U.T.
//             </Text>

//             <TouchableOpacity className="bg-[#F8FAFC] border border-[#DCE3EA] rounded-2xl h-[74px] px-5 flex-row items-center justify-between">
//               <Text className="text-[#94A3B8] text-[18px] font-semibold">
//                 Delivery States & U.T.
//               </Text>

//               <ChevronDown size={24} color="#64748B" />
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* BILL ITEMS */}

//         <View className="px-4 mt-8">
//           <Text className="text-[#0F172A] text-[22px] font-black mb-4 tracking-wide">
//             BILL ITEMS
//           </Text>

//           <PrimaryButton
//             title="ADD MORE ITEMS"
//             variant="filled"
//             size="md"
//             onPress={() => navigation.goBack()}
//             fullWidth
//             style={{
//               backgroundColor: '#16A34A',
//               borderRadius: 18,
//               paddingVertical: 16,
//             }}
//             textStyle={{
//               fontSize: 18,
//               letterSpacing: 1,
//               fontWeight: '800',
//             }}
//           />
//         </View>

//         {/* ITEM LIST */}

//         {cartEntries.map((entry: any) => (
//           <View
//             key={entry.item.id || entry.item._id}
//             className="mx-4 mt-5 bg-white rounded-[28px] border border-[#E2E8F0] p-5 shadow-sm"
//           >
//             <View className="flex-row justify-between items-start">
//               {/* LEFT */}

//               <View className="flex-1 pr-4">
//                 <Text className="text-[#0F172A] text-[20px] font-black leading-7 tracking-wide">
//                   {entry.item.name}
//                 </Text>

//                 <StatusBadge
//                   label={`Stock: ${entry.item.currentStock ??
//                     entry.item.stock ??
//                     0
//                     }`}
//                   variant="success"
//                   size="md"
//                   style={{ marginTop: 12 }}
//                 />

//                 <Text
//                   style={{ color: PRIMARY }}
//                   className="text-[18px] font-extrabold mt-4"
//                 >
//                   Qty: {entry.quantity}
//                 </Text>

//                 <Text className="text-[#64748B] text-[16px] font-medium mt-1">
//                   Price: ₹
//                   {entry.item.sellPrice ||
//                     entry.item.price ||
//                     0}
//                 </Text>
//               </View>

//               {/* ACTIONS */}

//               <View className="flex-row gap-3">
//                 <TouchableOpacity className="w-16 h-16 rounded-2xl border border-[#E2E8F0] items-center justify-center bg-[#F8FAFC]">
//                   <Pencil size={24} color={PRIMARY} />
//                 </TouchableOpacity>

//                 <TouchableOpacity className="w-16 h-16 rounded-2xl border border-red-200 items-center justify-center bg-red-50">
//                   <Trash2 size={24} color="#DC2626" />
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         ))}
//       </ScrollView>

//       {/* BOTTOM BAR */}

//       <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#E2E8F0] px-4 pt-4 pb-5">
//         {/* TOTALS */}

//         <View className="flex-row items-center justify-between mb-4">
//           <Text className="text-[#0F172A] text-[20px] font-black">
//             Total: {totalAmount.toFixed(1)}
//           </Text>

//           <View className="flex-row items-center">
//             <View className="w-9 h-9 rounded-xl bg-[#1A73E8] items-center justify-center mr-2">
//               <Check size={20} color="#FFFFFF" />
//             </View>

//             <Text className="text-[#0F172A] text-[16px] font-semibold">
//               Received:{totalAmount.toFixed(1)}
//             </Text>
//           </View>
//         </View>

//         {/* PAYMENT MODES */}

//         <View className="flex-row items-center gap-2 mb-4">
//           <TouchableOpacity className="px-5 py-2.5 rounded-full border border-[#1A73E8] bg-white">
//             <Text
//               style={{ color: PRIMARY }}
//               className="text-[16px] font-semibold"
//             >
//               Bank
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity className="px-5 py-2.5 rounded-full border border-[#1A73E8] bg-[#E8F0FE]">
//             <Text
//               style={{ color: PRIMARY }}
//               className="text-[16px] font-extrabold"
//             >
//               Cash
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity className="px-5 py-2.5 rounded-full border border-[#1A73E8] bg-white">
//             <Text
//               style={{ color: PRIMARY }}
//               className="text-[16px] font-semibold"
//             >
//               Cheque
//             </Text>
//           </TouchableOpacity>
//         </View>

//         {/* BOTTOM BUTTONS */}

//         <View className="flex-row gap-2">
//           <PrimaryButton
//             title="DETAILS"
//             variant="outlined"
//             size="lg"
//             onPress={() => { }}
//             style={{
//               flex: 1,
//               borderRadius: 16,
//               borderColor: '#CBD5E1',
//               backgroundColor: '#FFFFFF',
//             }}
//             textStyle={{
//               color: '#64748B',
//               fontSize: 15,
//               fontWeight: '700',
//             }}
//           />

//           <PrimaryButton
//             title="KOT"
//             variant="outlined"
//             size="lg"
//             onPress={() => { }}
//             style={{
//               flex: 1,
//               borderRadius: 16,
//               borderColor: '#CBD5E1',
//               backgroundColor: '#F8FAFC',
//             }}
//             textStyle={{
//               color: '#64748B',
//               fontSize: 15,
//               fontWeight: '700',
//             }}
//           />

//           <PrimaryButton
//             title={`NEXT (₹${totalAmount.toFixed(1)})`}
//             variant="filled"
//             size="lg"
//             onPress={() => { }}
//             style={{
//               flex: 1.5,
//               borderRadius: 16,
//               backgroundColor: PRIMARY,
//             }}
//             textStyle={{
//               fontSize: 15,
//               fontWeight: '800',
//             }}
//           />
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// }


import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
  Animated,
  Platform,
  Modal,
  Pressable,
  KeyboardAvoidingView,
} from 'react-native';
import {
  ArrowLeft,
  ScanLine,
  ChevronDown,
  Pencil,
  Trash2,
  Check,
  X,
  Calendar,
  User,
  MapPin,
  FileText,
  Plus,
  Minus,
  CreditCard,
  Wallet,
  Receipt,
  Package,
  Save,
  Printer,
  Share2,
  Search,
  Shapes,
  AlertCircle,
} from 'lucide-react-native';

import PrimaryButton from '../components/ui/PrimaryButton';
import StatusBadge from '../components/ui/StatusBadge';
import { SafeAreaView } from 'react-native-safe-area-context';
import FloatingInput from '../components/ui/FloatingInput';
import SearchBar from '../components/ui/SearchBar';
import CustomAlert from '../components/CustomAlert';
import { useSearch } from '../hooks/useSearch';

const PRIMARY = '#1A73E8';
const SUCCESS = '#16A34A';
const DANGER = '#DC2626';
const WARNING = '#F59E0B';

type PaymentMode = 'Bank' | 'Cash' | 'Cheque' | 'UPI' | 'Card';

const BILLING_TERMS = [
  'Cash on Delivery',
  'Net 15 Days',
  'Net 30 Days',
  'Net 45 Days',
  'Net 60 Days',
  'Advance Payment',
];

const STATES = [
  'Andhra Pradesh',
  'Assam',
  'Bihar',
  'Delhi',
  'Gujarat',
  'Karnataka',
  'Kerala',
  'Maharashtra',
  'Punjab',
  'Rajasthan',
  'Tamil Nadu',
  'Telangana',
  'Uttar Pradesh',
  'West Bengal',
];

import { useCreateSaleMutation } from '../redux/api/saleApi';

export default function NewSaleScreen({ navigation, route }: any) {
  // ✅ API CALLS
  const [createSale, { isLoading: isCreating }] = useCreateSaleMutation();

  // ✨ NEW: CustomAlert config
  const [alertConfig, setAlertConfig] = useState<{
    visible: boolean;
    title: string;
    message: string;
    type: 'info' | 'success' | 'error';
    onConfirm: () => void;
    onCancel?: () => void;
    confirmText?: string;
    cancelText?: string;
  } | null>(null);

  const showAlert = (
    title: string,
    message: string,
    onConfirm = () => setAlertConfig(null),
    onCancel?: () => void,
    type: 'info' | 'success' | 'error' = 'info',
    confirmText = 'Okay',
    cancelText?: string
  ) => {
    setAlertConfig({
      visible: true,
      title,
      message,
      type,
      onConfirm: () => {
        setAlertConfig(null);
        onConfirm();
      },
      onCancel: onCancel
        ? () => {
            setAlertConfig(null);
            onCancel();
          }
        : undefined,
      confirmText,
      cancelText,
    });
  };

  const { cartEntries: initialCartEntries, totalAmount: initialTotal, party, partyType } =
    route?.params || {
      cartEntries: [],
      totalAmount: 0,
      party: null,
      partyType: 'CUSTOMER',
    };

  const [billNo, setBillNo] = useState('575');
  const [billDate, setBillDate] = useState(new Date().toLocaleDateString('en-GB'));
  const [customerName, setCustomerName] = useState(party?.name || '');

  // ✨ NEW: Local cart state for live edit/delete
  const [cartEntries, setCartEntries] = useState<any[]>(initialCartEntries || []);

  // ✨ NEW: Additional fields
  const [billingTerm, setBillingTerm] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [deliveryState, setDeliveryState] = useState('');
  const [paymentMode, setPaymentMode] = useState<PaymentMode>('Cash');
  const [discount, setDiscount] = useState('0');
  const [notes, setNotes] = useState('');
  const [isHeld, setIsHeld] = useState(false);
  const [isParcel, setIsParcel] = useState(false);

  // ✨ NEW: Modal states
  const [showTermModal, setShowTermModal] = useState(false);
  const [showStateModal, setShowStateModal] = useState(false);
  const [showDueDateModal, setShowDueDateModal] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [editingEntry, setEditingEntry] = useState<any>(null);
  const [editQty, setEditQty] = useState('1');

  // ✨ NEW: Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const { search, setSearch, isSearchOpen, openSearch, closeSearch } = useSearch();

  // ✨ NEW: Live recalculation
  const { subtotal, totalAmount, discountPercentage } = useMemo(() => {
    const sub = cartEntries.reduce((sum: number, e: any) => {
      const price = e.item.sellPrice || e.item.price || 0;
      return sum + price * (e.quantity || 1);
    }, 0);
    const disc = parseFloat(discount) || 0;
    const total = Math.max(0, sub - disc);
    const percent = sub > 0 ? (disc / sub) * 100 : 0;
    return { subtotal: sub, totalAmount: total, discountPercentage: percent };
  }, [cartEntries, discount]);

  const itemCount = cartEntries.reduce(
    (sum: number, e: any) => sum + (e.quantity || 0),
    0
  );

  // ✨ NEW: Filter cart by search
  const filteredEntries = useMemo(() => {
    if (!search?.trim()) return cartEntries;
    const q = search.toLowerCase();
    return cartEntries.filter((e: any) =>
      (e.item.name || '').toLowerCase().includes(q)
    );
  }, [cartEntries, search]);

  // ✨ NEW: Handlers
  const handleDeleteItem = (id: string) => {
    showAlert(
      'Remove Item',
      'Are you sure you want to remove this item?',
      () => {
        setCartEntries((prev) =>
          prev.filter((e) => (e.item.id || e.item._id) !== id)
        );
      },
      () => {},
      'error',
      'Remove',
      'Cancel'
    );
  };

  const handleEditItem = (entry: any) => {
    setEditingEntry(entry);
    setEditQty(String(entry.quantity || 1));
  };

  const handleSaveEdit = () => {
    const newQty = parseInt(editQty, 10);
    if (!newQty || newQty < 1) {
      showAlert('Invalid', 'Quantity must be at least 1', undefined, undefined, 'error');
      return;
    }
    setCartEntries((prev) =>
      prev.map((e) => {
        const id = e.item.id || e.item._id;
        const eid = editingEntry.item.id || editingEntry.item._id;
        if (id === eid) return { ...e, quantity: newQty };
        return e;
      })
    );
    setEditingEntry(null);
  };

  const handleQtyChange = (entry: any, delta: number) => {
    const id = entry.item.id || entry.item._id;
    setCartEntries((prev) =>
      prev
        .map((e) => {
          const eid = e.item.id || e.item._id;
          if (eid === id) {
            const newQty = (e.quantity || 1) + delta;
            return { ...e, quantity: Math.max(0, newQty) };
          }
          return e;
        })
        .filter((e) => e.quantity > 0)
    );
  };

  const handleHold = () => {
    setIsHeld((p) => !p);
    showAlert(isHeld ? 'Resumed' : 'Held', isHeld ? 'Bill resumed' : 'Bill held successfully', undefined, undefined, 'success');
  };

  const handleSaveBill = () => {
    console.log('Cart Entries:', cartEntries);
    if (!cartEntries.length) {
      showAlert('Empty Cart', 'Please add items before saving the bill.', undefined, undefined, 'error');
      return;
    }
    if (!customerName.trim()) {
      showAlert('Missing Info', 'Please enter customer name.', undefined, undefined, 'error');
      return;
    }
    setShowSummaryModal(true);
  };

  // ✨ NEW: Reusable Selector Modal
  const renderSelectorModal = (
    visible: boolean,
    onClose: () => void,
    title: string,
    options: string[],
    onSelect: (val: string) => void,
    current: string
  ) => (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable
        onPress={onClose}
        className="flex-1 bg-black/50 justify-end"
      >
        <Pressable
          onPress={(e) => e.stopPropagation()}
          className="bg-white rounded-t-[32px] pt-3 pb-8 max-h-[70%]"
        >
          <View className="items-center mb-2">
            <View className="w-12 h-1.5 rounded-full bg-[#CBD5E1]" />
          </View>
          <View className="flex-row items-center justify-between px-6 py-3 border-b border-[#E2E8F0]">
            <Text className="text-[#0F172A] text-[20px] font-black">{title}</Text>
            <TouchableOpacity
              onPress={onClose}
              className="w-9 h-9 rounded-full bg-[#F1F5F9] items-center justify-center"
            >
              <X size={18} color="#64748B" />
            </TouchableOpacity>
          </View>
          <ScrollView className="px-3 pt-2">
            {options.map((opt) => {
              const selected = current === opt;
              return (
                <TouchableOpacity
                  key={opt}
                  onPress={() => {
                    onSelect(opt);
                    onClose();
                  }}
                  className={`flex-row items-center justify-between px-4 py-4 rounded-2xl mb-1 ${
                    selected ? 'bg-[#E8F0FE]' : ''
                  }`}
                >
                  <Text
                    className={`text-[16px] ${
                      selected ? 'font-extrabold' : 'font-medium'
                    }`}
                    style={{ color: selected ? PRIMARY : '#0F172A' }}
                  >
                    {opt}
                  </Text>
                  {selected && <Check size={20} color={PRIMARY} />}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC]" edges={['top']}>
      <StatusBar backgroundColor={PRIMARY} barStyle="light-content" />

      {/* HEADER */}
      <View
        style={{ backgroundColor: PRIMARY }}
        className="px-4 pt-2 pb-5 rounded-b-[28px]"
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center flex-1">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="w-11 h-11 rounded-2xl bg-white/15 items-center justify-center mr-3"
              activeOpacity={0.7}
            >
              <ArrowLeft size={24} color="#FFFFFF" />
            </TouchableOpacity>

            <View className="flex-1">
              <View className="flex-row items-center">
                <Text className="text-white text-[24px] font-black tracking-wide">
                  New Sale
                </Text>
                {isHeld && (
                  <View className="ml-2 px-2 py-0.5 rounded-full bg-[#F59E0B]">
                    <Text className="text-white text-[10px] font-extrabold">
                      HELD
                    </Text>
                  </View>
                )}
                {isParcel && (
                  <View className="ml-2 px-2 py-0.5 rounded-full bg-[#16A34A]">
                    <Text className="text-white text-[10px] font-extrabold">
                      PARCEL
                    </Text>
                  </View>
                )}
              </View>
              <Text className="text-white/70 text-xs mt-1">
                FAST v39.08 | 9518795065 | 1043
              </Text>
            </View>
          </View>

          <View className="flex-row items-center gap-2">
            <TouchableOpacity
              onPress={openSearch}
              className="w-11 h-11 rounded-2xl bg-white/15 items-center justify-center"
              activeOpacity={0.7}
            >
              <Search size={22} color="#FFFFFF" />
            </TouchableOpacity>

            <TouchableOpacity
              className="w-11 h-11 rounded-2xl bg-white/15 items-center justify-center"
              activeOpacity={0.7}
            >
              <Shapes size={22} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* ✨ NEW: Quick Stats Strip */}
        <View className="flex-row items-center justify-between mt-4 bg-white/10 rounded-2xl px-4 py-2.5">
          <View className="flex-row items-center">
            <Package size={14} color="#FFFFFF" />
            <Text className="text-white text-[12px] font-bold ml-1.5">
              {cartEntries.length} Items
            </Text>
          </View>
          <View className="w-px h-4 bg-white/30" />
          <View className="flex-row items-center">
            <Receipt size={14} color="#FFFFFF" />
            <Text className="text-white text-[12px] font-bold ml-1.5">
              Qty: {itemCount}
            </Text>
          </View>
          <View className="w-px h-4 bg-white/30" />
          <View className="flex-row items-center">
            <Wallet size={14} color="#FFFFFF" />
            <Text className="text-white text-[12px] font-extrabold ml-1.5">
              ₹{totalAmount.toFixed(1)}
            </Text>
          </View>
        </View>
      </View>

      <SearchBar
        isVisible={isSearchOpen}
        value={search}
        onChangeText={setSearch}
        onCancel={closeSearch}
      />

      <Animated.View
        style={{
          flex: 1,
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 280 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* TOP ACTIONS */}
          <View className="flex-row items-center px-4 pt-6 gap-3">
            <PrimaryButton
              title={isHeld ? 'RESUME' : 'HOLD'}
              variant="outlined"
              size="md"
              onPress={handleHold}
              style={{
                flex: 1,
                borderRadius: 16,
                borderColor: isHeld ? WARNING : '#CBD5E1',
                backgroundColor: isHeld ? '#FEF3C7' : '#FFFFFF',
                paddingVertical: 14,
              }}
              textStyle={{
                color: isHeld ? WARNING : '#64748B',
                fontSize: 15,
                fontWeight: '700',
              }}
            />

            <PrimaryButton
              title="Parcel"
              variant="outlined"
              size="md"
              onPress={() => setIsParcel((p) => !p)}
              style={{
                flex: 1,
                borderRadius: 16,
                borderColor: isParcel ? SUCCESS : '#CBD5E1',
                backgroundColor: isParcel ? '#DCFCE7' : '#FFFFFF',
                paddingVertical: 14,
              }}
              textStyle={{
                color: isParcel ? SUCCESS : '#64748B',
                fontSize: 15,
                fontWeight: '700',
              }}
            />

            <TouchableOpacity
              className="w-14 h-14 rounded-2xl border border-[#CBD5E1] items-center justify-center bg-white"
              activeOpacity={0.7}
              onPress={() => showAlert('Scanner', 'Open barcode scanner', undefined, undefined, 'info')}
            >
              <ScanLine size={24} color="#64748B" />
            </TouchableOpacity>
          </View>

          {/* FORM CARD */}
          <View className="mx-4 mt-6 bg-white rounded-[28px] border border-[#E2E8F0] px-4 py-5 shadow-sm">
            {/* Section Header */}
            <View className="flex-row items-center mb-4 ml-1">
              <FileText size={18} color={PRIMARY} />
              <Text className="text-[#0F172A] text-[16px] font-black ml-2 tracking-wide">
                BILL DETAILS
              </Text>
            </View>

            <FloatingInput
              label="Bill No"
              value={billNo}
              onChangeText={setBillNo}
              containerStyle={{ marginBottom: 20 }}
            />

            <FloatingInput
              label="Bill Date"
              value={billDate}
              onChangeText={setBillDate}
              containerStyle={{ marginBottom: 20 }}
            />

            {/* BILLING TERM */}
            <View className="mb-5">
              <Text className="text-[#64748B] text-[15px] mb-2 ml-2 font-medium">
                Billing Term
              </Text>
              <TouchableOpacity
                onPress={() => setShowTermModal(true)}
                activeOpacity={0.7}
                className={`bg-[#F8FAFC] border rounded-2xl h-[74px] px-5 flex-row items-center justify-between ${
                  billingTerm ? 'border-[#1A73E8]' : 'border-[#DCE3EA]'
                }`}
              >
                <Text
                  className={`text-[18px] font-semibold ${
                    billingTerm ? 'text-[#0F172A]' : 'text-[#94A3B8]'
                  }`}
                >
                  {billingTerm || 'Select Billing Term'}
                </Text>
                <ChevronDown size={24} color="#64748B" />
              </TouchableOpacity>
            </View>

            {/* DUE DATE */}
            <View className="mb-5">
              <Text className="text-[#64748B] text-[15px] mb-2 ml-2 font-medium">
                Bill Due Date
              </Text>
              <TouchableOpacity
                onPress={() => {
                  const d = new Date();
                  d.setDate(d.getDate() + 30);
                  setDueDate(d.toLocaleDateString('en-GB'));
                }}
                activeOpacity={0.7}
                className={`bg-[#F8FAFC] border rounded-2xl h-[74px] px-5 flex-row items-center justify-between ${
                  dueDate ? 'border-[#1A73E8]' : 'border-[#DCE3EA]'
                }`}
              >
                <Text
                  className={`text-[18px] font-semibold ${
                    dueDate ? 'text-[#0F172A]' : 'text-[#94A3B8]'
                  }`}
                >
                  {dueDate || 'Select Due Date'}
                </Text>
                <Calendar size={22} color="#64748B" />
              </TouchableOpacity>
            </View>

            <FloatingInput
              label="Customer/Supplier Name"
              value={customerName}
              onChangeText={setCustomerName}
              containerStyle={{ marginBottom: 20 }}
            />

            {/* STATE */}
            <View className="mb-5">
              <Text className="text-[#64748B] text-[15px] mb-2 ml-2 font-medium">
                Delivery States & U.T.
              </Text>
              <TouchableOpacity
                onPress={() => setShowStateModal(true)}
                activeOpacity={0.7}
                className={`bg-[#F8FAFC] border rounded-2xl h-[74px] px-5 flex-row items-center justify-between ${
                  deliveryState ? 'border-[#1A73E8]' : 'border-[#DCE3EA]'
                }`}
              >
                <View className="flex-row items-center flex-1">
                  <MapPin size={20} color="#64748B" />
                  <Text
                    className={`text-[18px] font-semibold ml-2 ${
                      deliveryState ? 'text-[#0F172A]' : 'text-[#94A3B8]'
                    }`}
                  >
                    {deliveryState || 'Select State'}
                  </Text>
                </View>
                <ChevronDown size={24} color="#64748B" />
              </TouchableOpacity>
            </View>

            {/* ✨ NEW: Discount */}
            <View className="flex-row items-center mb-5">
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

            {/* ✨ NEW: Notes */}
            <View>
              <Text className="text-[#64748B] text-[15px] mb-2 ml-2 font-medium">
                Notes (Optional)
              </Text>
              <TextInput
                value={notes}
                onChangeText={setNotes}
                placeholder="Add any notes about this sale..."
                placeholderTextColor="#94A3B8"
                multiline
                numberOfLines={3}
                className="bg-[#F8FAFC] border border-[#DCE3EA] rounded-2xl px-5 py-4 text-[#0F172A] text-[16px]"
                style={{
                  textAlignVertical: 'top',
                  minHeight: 90,
                }}
              />
            </View>
          </View>

          {/* BILL ITEMS */}
          <View className="px-4 mt-8">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-[#0F172A] text-[22px] font-black tracking-wide">
                BILL ITEMS
              </Text>
              <View className="px-3 py-1 rounded-full bg-[#E8F0FE]">
                <Text
                  style={{ color: PRIMARY }}
                  className="text-[12px] font-extrabold"
                >
                  {cartEntries.length} ITEMS
                </Text>
              </View>
            </View>

            <PrimaryButton
              title="+ ADD MORE ITEMS"
              variant="filled"
              size="md"
              onPress={() => navigation.goBack()}
              fullWidth
              style={{
                backgroundColor: SUCCESS,
                borderRadius: 18,
                paddingVertical: 16,
              }}
              textStyle={{
                fontSize: 18,
                letterSpacing: 1,
                fontWeight: '800',
              }}
            />
          </View>

          {/* ✨ NEW: Empty State */}
          {filteredEntries.length === 0 && (
            <View className="mx-4 mt-5 bg-white rounded-[28px] border border-dashed border-[#CBD5E1] p-8 items-center">
              <View className="w-16 h-16 rounded-full bg-[#F1F5F9] items-center justify-center mb-3">
                <Package size={32} color="#94A3B8" />
              </View>
              <Text className="text-[#0F172A] text-[16px] font-extrabold">
                {search ? 'No matches found' : 'No items added'}
              </Text>
              <Text className="text-[#64748B] text-[13px] mt-1 text-center">
                {search
                  ? 'Try a different search term'
                  : 'Tap "ADD MORE ITEMS" to start adding products'}
              </Text>
            </View>
          )}

          {/* ITEM LIST */}
          {filteredEntries.map((entry: any, index: number) => {
            const id = entry.item.id || entry.item._id;
            const price = entry.item.sellPrice || entry.item.price || 0;
            const lineTotal = price * (entry.quantity || 1);
            const stock =
              entry.item.currentStock ?? entry.item.stock ?? 0;
            const lowStock = stock < 5;

            return (
              <Animated.View
                key={id}
                style={{ opacity: fadeAnim }}
                className="mx-4 mt-5 bg-white rounded-[28px] border border-[#E2E8F0] p-5 shadow-sm"
              >
                <View className="flex-row justify-between items-start">
                  <View className="flex-1 pr-4">
                    <View className="flex-row items-center">
                      <View className="w-7 h-7 rounded-full bg-[#E8F0FE] items-center justify-center mr-2">
                        <Text
                          style={{ color: PRIMARY }}
                          className="text-[12px] font-black"
                        >
                          {index + 1}
                        </Text>
                      </View>
                      <Text
                        numberOfLines={1}
                        className="text-[#0F172A] text-[16px] font-black leading-6 tracking-wide flex-1"
                      >
                        {entry.item.name}
                      </Text>
                    </View>

                    <View className="flex-row items-center mt-3 gap-2 flex-wrap">
                      <StatusBadge
                        label={`Stock: ${stock}`}
                        variant={lowStock ? 'warning' : 'success'}
                        size="md"
                      />
                      {lowStock && (
                        <View className="flex-row items-center bg-[#FEF3C7] px-2 py-1 rounded-full">
                          <AlertCircle size={12} color={WARNING} />
                          <Text
                            style={{ color: WARNING }}
                            className="text-[10px] font-extrabold ml-1"
                          >
                            LOW
                          </Text>
                        </View>
                      )}
                    </View>

                    {/* ✨ Quantity Stepper */}
                    <View className="flex-row items-center mt-3">
                      <TouchableOpacity
                        onPress={() => handleQtyChange(entry, -1)}
                        className="w-8 h-8 rounded-lg bg-[#F1F5F9] items-center justify-center"
                        activeOpacity={0.7}
                      >
                        <Minus size={14} color="#64748B" />
                      </TouchableOpacity>
                      <View className="px-3">
                        <Text
                          style={{ color: PRIMARY }}
                          className="text-[16px] font-extrabold"
                        >
                          {entry.quantity}
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => handleQtyChange(entry, 1)}
                        className="w-8 h-8 rounded-lg bg-[#E8F0FE] items-center justify-center"
                        activeOpacity={0.7}
                      >
                        <Plus size={14} color={PRIMARY} />
                      </TouchableOpacity>
                    </View>

                    <View className="flex-row items-center justify-between mt-3">
                      <Text className="text-[#64748B] text-[14px] font-medium">
                        Price: ₹{price}
                      </Text>
                      <Text
                        style={{ color: SUCCESS }}
                        className="text-[16px] font-extrabold"
                      >
                        = ₹{lineTotal.toFixed(1)}
                      </Text>
                    </View>
                  </View>

                  <View className="flex-row gap-2">
                    <TouchableOpacity
                      onPress={() => handleEditItem(entry)}
                      className="w-12 h-12 rounded-xl border border-[#E2E8F0] items-center justify-center bg-[#F8FAFC]"
                      activeOpacity={0.7}
                    >
                      <Pencil size={18} color={PRIMARY} />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => handleDeleteItem(id)}
                      className="w-12 h-12 rounded-xl border border-red-200 items-center justify-center bg-red-50"
                      activeOpacity={0.7}
                    >
                      <Trash2 size={18} color={DANGER} />
                    </TouchableOpacity>
                  </View>
                </View>
              </Animated.View>
            );
          })}
        </ScrollView>
      </Animated.View>

      {/* BOTTOM BAR */}
      <View
        className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#E2E8F0] px-4 pt-4 pb-5"
        style={{
          shadowColor: '#000',
          shadowOpacity: 0.06,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: -4 },
          elevation: 12,
        }}
      >
        {/* TOTALS */}
        <View className="flex-row items-center justify-between mb-3">
          <View>
            <Text className="text-[#64748B] text-[11px] font-semibold">
              GRAND TOTAL
            </Text>
            <Text className="text-[#0F172A] text-[18px] font-black">
              ₹{totalAmount.toFixed(1)}
            </Text>
          </View>

          <View className="flex-row items-center">
            <View
              className="w-7 h-7 rounded-lg items-center justify-center mr-2"
              style={{ backgroundColor: PRIMARY }}
            >
              <Check size={16} color="#FFFFFF" />
            </View>
            <View>
              <Text className="text-[#64748B] text-[10px] font-bold">
                RECEIVED
              </Text>
              <Text className="text-[#0F172A] text-[12px] font-extrabold">
                ₹{totalAmount.toFixed(1)}
              </Text>
            </View>
          </View>
        </View>

        {/* PAYMENT MODES */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-3"
        >
          <View className="flex-row items-center gap-2">
            {(['Bank', 'Cash', 'Cheque', 'UPI', 'Card'] as PaymentMode[]).map(
              (mode) => {
                const active = paymentMode === mode;
                return (
                  <TouchableOpacity
                    key={mode}
                    onPress={() => setPaymentMode(mode)}
                    activeOpacity={0.7}
                    className={`px-4 py-1.5 rounded-full border ${
                      active ? 'bg-[#E8F0FE]' : 'bg-white'
                    }`}
                    style={{ borderColor: PRIMARY }}
                  >
                    <Text
                      style={{ color: PRIMARY }}
                      className={`text-[13px] ${
                        active ? 'font-extrabold' : 'font-semibold'
                      }`}
                    >
                      {mode}
                    </Text>
                  </TouchableOpacity>
                );
              }
            )}
          </View>
        </ScrollView>

        {/* BOTTOM BUTTONS */}
        <View className="flex-row gap-2">
          <PrimaryButton
            title="DETAILS"
            variant="outlined"
            size="md"
            onPress={() => setShowSummaryModal(true)}
            style={{
              flex: 1,
              borderRadius: 16,
              borderColor: '#CBD5E1',
              backgroundColor: '#FFFFFF',
            }}
            textStyle={{
              color: '#64748B',
              fontSize: 14,
              fontWeight: '700',
            }}
          />

          <PrimaryButton
            title="KOT"
            variant="outlined"
            size="md"
            onPress={() => showAlert('KOT', 'Kitchen Order Ticket sent', undefined, undefined, 'success')}
            style={{
              flex: 1,
              borderRadius: 16,
              borderColor: '#CBD5E1',
              backgroundColor: '#F8FAFC',
            }}
            textStyle={{
              color: '#64748B',
              fontSize: 15,
              fontWeight: '700',
            }}
          />

          <PrimaryButton
            title={`NEXT (₹${totalAmount.toFixed(1)})`}
            variant="filled"
            size="md"
            onPress={() => navigation.navigate("SaleDetails", {
              cartEntries,
              totalAmount,
              subtotal,
              discount: parseFloat(discount) || 0,
              party,
              partyType,
              paymentMode,
            })} 
            style={{
              flex: 1.5,
              borderRadius: 16,
              backgroundColor: PRIMARY,
            }}
            textStyle={{
              fontSize: 15,
              fontWeight: '800',
            }}
          />
        </View>
      </View>

      {/* ✨ MODALS */}
      {renderSelectorModal(
        showTermModal,
        () => setShowTermModal(false),
        'Billing Term',
        BILLING_TERMS,
        setBillingTerm,
        billingTerm
      )}

      {renderSelectorModal(
        showStateModal,
        () => setShowStateModal(false),
        'Delivery State',
        STATES,
        setDeliveryState,
        deliveryState
      )}

      {/* EDIT QTY MODAL */}
      <Modal
        visible={!!editingEntry}
        transparent
        animationType="fade"
        onRequestClose={() => setEditingEntry(null)}
      >
        <Pressable
          onPress={() => setEditingEntry(null)}
          className="flex-1 bg-black/50 items-center justify-center px-6"
        >
          <Pressable
            onPress={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-6 w-full"
          >
            <Text className="text-[#0F172A] text-[20px] font-black mb-1">
              Edit Quantity
            </Text>
            <Text className="text-[#64748B] text-[13px] mb-4">
              {editingEntry?.item?.name}
            </Text>

            <View className="flex-row items-center justify-center gap-4 my-4">
              <TouchableOpacity
                onPress={() =>
                  setEditQty((p) =>
                    String(Math.max(1, (parseInt(p, 10) || 1) - 1))
                  )
                }
                className="w-12 h-12 rounded-2xl bg-[#F1F5F9] items-center justify-center"
              >
                <Minus size={20} color="#64748B" />
              </TouchableOpacity>

              <TextInput
                value={editQty}
                onChangeText={setEditQty}
                keyboardType="numeric"
                className="bg-[#F8FAFC] border border-[#DCE3EA] rounded-2xl px-6 py-3 text-[24px] font-black text-center text-[#0F172A] min-w-[100px]"
              />

              <TouchableOpacity
                onPress={() =>
                  setEditQty((p) => String((parseInt(p, 10) || 0) + 1))
                }
                className="w-12 h-12 rounded-2xl bg-[#E8F0FE] items-center justify-center"
              >
                <Plus size={20} color={PRIMARY} />
              </TouchableOpacity>
            </View>

            <View className="flex-row gap-3 mt-2">
              <PrimaryButton
                title="Cancel"
                variant="outlined"
                size="md"
                onPress={() => setEditingEntry(null)}
                style={{
                  flex: 1,
                  borderRadius: 14,
                  borderColor: '#CBD5E1',
                }}
                textStyle={{ color: '#64748B', fontWeight: '700' }}
              />
              <PrimaryButton
                title="Save"
                variant="filled"
                size="md"
                onPress={handleSaveEdit}
                style={{
                  flex: 1,
                  borderRadius: 14,
                  backgroundColor: PRIMARY,
                }}
                textStyle={{ fontWeight: '800' }}
              />
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      {/* SUMMARY MODAL */}
      <Modal
        visible={showSummaryModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowSummaryModal(false)}
      >
        <Pressable
          onPress={() => setShowSummaryModal(false)}
          className="flex-1 bg-black/50 justify-end"
        >
          <Pressable
            onPress={(e) => e.stopPropagation()}
            className="bg-white rounded-t-[32px] pt-3 pb-8 max-h-[85%]"
          >
            <View className="items-center mb-2">
              <View className="w-12 h-1.5 rounded-full bg-[#CBD5E1]" />
            </View>
            <View className="flex-row items-center justify-between px-6 py-3 border-b border-[#E2E8F0]">
              <Text className="text-[#0F172A] text-[20px] font-black">
                Bill Summary
              </Text>
              <TouchableOpacity
                onPress={() => setShowSummaryModal(false)}
                className="w-9 h-9 rounded-full bg-[#F1F5F9] items-center justify-center"
              >
                <X size={18} color="#64748B" />
              </TouchableOpacity>
            </View>

            <ScrollView className="px-6 pt-4">
              <View className="bg-[#F8FAFC] rounded-2xl p-4 mb-4">
                <View className="flex-row justify-between mb-2">
                  <Text className="text-[#64748B]">Bill No</Text>
                  <Text className="text-[#0F172A] font-extrabold">
                    #{billNo}
                  </Text>
                </View>
                <View className="flex-row justify-between mb-2">
                  <Text className="text-[#64748B]">Date</Text>
                  <Text className="text-[#0F172A] font-extrabold">
                    {billDate}
                  </Text>
                </View>
                <View className="flex-row justify-between mb-2">
                  <Text className="text-[#64748B]">Customer</Text>
                  <Text className="text-[#0F172A] font-extrabold">
                    {customerName || '—'}
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-[#64748B]">Payment</Text>
                  <Text className="text-[#0F172A] font-extrabold">
                    {paymentMode}
                  </Text>
                </View>
              </View>

              <Text className="text-[#0F172A] text-[16px] font-black mb-2">
                Items ({cartEntries.length})
              </Text>
              {cartEntries.map((e: any) => {
                const price = e.item.sellPrice || e.item.price || 0;
                return (
                  <View
                    key={e.item.id || e.item._id}
                    className="flex-row justify-between py-2 border-b border-[#F1F5F9]"
                  >
                    <Text className="text-[#0F172A] flex-1" numberOfLines={1}>
                      {e.item.name} × {e.quantity}
                    </Text>
                    <Text className="text-[#0F172A] font-extrabold">
                      ₹{(price * e.quantity).toFixed(1)}
                    </Text>
                  </View>
                );
              })}

              <View className="mt-4 bg-[#E8F0FE] rounded-2xl p-4">
                <View className="flex-row justify-between mb-1">
                  <Text className="text-[#64748B]">Subtotal</Text>
                  <Text className="text-[#0F172A] font-bold">
                    ₹{(totalAmount + (parseFloat(discount) || 0)).toFixed(1)}
                  </Text>
                </View>
                <View className="flex-row justify-between mb-1">
                  <Text className="text-[#64748B]">Discount</Text>
                  <Text className="text-[#DC2626] font-bold">
                    - ₹{(parseFloat(discount) || 0).toFixed(1)}
                  </Text>
                </View>
                <View className="h-px bg-white my-2" />
                <View className="flex-row justify-between">
                  <Text className="text-[#0F172A] text-[18px] font-black">
                    Grand Total
                  </Text>
                  <Text
                    style={{ color: PRIMARY }}
                    className="text-[20px] font-black"
                  >
                    ₹{totalAmount.toFixed(1)}
                  </Text>
                </View>
              </View>

              <View className="flex-row gap-2 mt-5 mb-2">
                <TouchableOpacity
                  onPress={() => showAlert('Print', 'Sending to printer...', undefined, undefined, 'info')}
                  className="flex-1 flex-row items-center justify-center py-3 rounded-2xl border border-[#CBD5E1]"
                >
                  <Printer size={18} color="#64748B" />
                  <Text className="text-[#64748B] font-bold ml-2">Print</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => showAlert('Share', 'Sharing bill...', undefined, undefined, 'info')}
                  className="flex-1 flex-row items-center justify-center py-3 rounded-2xl border border-[#CBD5E1]"
                >
                  <Share2 size={18} color="#64748B" />
                  <Text className="text-[#64748B] font-bold ml-2">Share</Text>
                </TouchableOpacity>
              </View>

              <PrimaryButton
                title={isCreating ? "SAVING..." : "CONFIRM & SAVE BILL"}
                variant="filled"
                size="lg"
                fullWidth
                disabled={isCreating}
                onPress={async () => {
                  try {
                    const payload = {
                      customer_id: party?.id || party?._id,
                      salesman_id: 'c2022aeb-6ae5-4d6a-b096-adadaa4d52cc', // Mock Admin ID
                      payment_method: paymentMode.toLowerCase(),
                      discount: parseFloat(discount) || 0,
                      amount_received: totalAmount,
                      items: cartEntries.map((e: any) => ({
                        product_id: e.item.id || e.item._id,
                        quantity: e.quantity,
                        price: e.item.sellPrice || e.item.price || 0,
                      })),
                    };

                    const response = await createSale(payload).unwrap();
                    setShowSummaryModal(false);
                    
                    // Success feedback and navigation
                    setTimeout(() => {
                      showAlert('Success', 'Bill saved successfully!', () => {
                        navigation.navigate('SaleSummary', { 
                          saleId: response.message?.id || response.id || response.message?._id || response._id,
                          saleData: response.message || response,
                          paymentMode: paymentMode,
                          discount: parseFloat(discount) || 0
                        });
                      }, undefined, 'success');
                    }, 400);
                  } catch (err: any) {
                    showAlert('Error', err?.data?.message || 'Failed to save bill', undefined, undefined, 'error');
                    console.log('Error:', err);
                  }
                }}
                style={{
                  backgroundColor: SUCCESS,
                  borderRadius: 16,
                  marginTop: 6,
                  opacity: isCreating ? 0.7 : 1,
                }}
                textStyle={{ fontSize: 16, fontWeight: '800' }}
              />
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>

      {/* ✨ CUSTOM ALERT */}
      {alertConfig && (
        <CustomAlert
          visible={alertConfig.visible}
          title={alertConfig.title}
          message={alertConfig.message}
          type={alertConfig.type}
          onClose={alertConfig.onConfirm}
          onCancel={alertConfig.onCancel}
          confirmText={alertConfig.confirmText}
          cancelText={alertConfig.cancelText}
        />
      )}
    </SafeAreaView>
  );
}