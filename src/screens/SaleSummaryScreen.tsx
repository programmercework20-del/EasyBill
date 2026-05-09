import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  Modal,
  Pressable,
  Share,
  StatusBar,
  Linking,
  ActivityIndicator,
} from 'react-native';
import {
  ArrowLeft,
  Pencil,
  Trash2,
  Share2,
  Download,
  Check,
  Printer,
  FileText,
  Phone,
  MapPin,
  Calendar,
  User,
  Package,
  X,
  MessageCircle,
  Hash,
  Wallet,
  CheckCircle2,
  Star,
  Building2,
  Receipt,
  CreditCard,
  Clock,
  IndianRupee,
} from 'lucide-react-native';
import PrimaryButton from '../components/ui/PrimaryButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomAlert from '../components/CustomAlert';
import RatingModal from '../components/ui/RatingModal';
import ShareModal from '../components/ui/ShareModal';
import ScreenHeader from '../components/ui/ScreenHeader';

const PRIMARY = '#1A73E8';
const SUCCESS = '#16A34A';
const DANGER = '#DC2626';
const WARNING = '#F59E0B';

import { 
  useGetInvoiceQuery, 
  useDeleteSaleMutation, 
  useSendWhatsAppMutation 
} from '../redux/api/saleApi';

export default function SaleSummaryScreen({ navigation, route }: any) {
  const saleId = route?.params?.saleId || route?.params?.saleData?.id || route?.params?.saleData?._id;

  // ✅ API CALLS
  const { data: apiResponse, isLoading, refetch } = useGetInvoiceQuery(saleId, {
    skip: !saleId,
  });
  const [deleteSale, { isLoading: isDeleting }] = useDeleteSaleMutation();
  const [sendWhatsApp, { isLoading: isSendingWhatsApp }] = useSendWhatsAppMutation();

  // Map API response to UI needs
  const saleData = useMemo(() => {
    console.log('API RESPONSE:', apiResponse);
    console.log('ROUTE PARAMS:', route?.params);

    // API response object
    if (
      apiResponse?.success &&
      typeof apiResponse?.message === 'object'
    ) {
      return apiResponse.message;
    }

    // Nested sale object
    if (apiResponse?.sale) {
      return apiResponse.sale;
    }

    // Route params nested sale
    if (route?.params?.saleData?.sale) {
      return route.params.saleData.sale;
    }

    // Direct route object
    if (route?.params?.saleData) {
      return route.params.saleData;
    }

    return {};
  }, [apiResponse, route?.params]);

  const totalAmount = useMemo(() => {
    // Priority 1: backend totals
    if (saleData.total) return saleData.total;
    if (saleData.totalAmount) return saleData.totalAmount;
    if (saleData.summary?.total) return saleData.summary.total;

    // Priority 2: calculate from items
    if (saleData.items?.length) {
      return saleData.items.reduce((acc: number, item: any) => {
        const price = item.price || item.product?.sellPrice || 0;
        const qty = item.quantity || 0;
        return acc + price * qty;
      }, 0);
    }

    // Priority 3: cartEntries fallback
    if (saleData.cartEntries?.length) {
      return saleData.cartEntries.reduce((acc: number, entry: any) => {
        const price = entry.item?.sellPrice || entry.item?.price || 0;
        const qty = entry.quantity || 0;
        return acc + price * qty;
      }, 0);
    }

    return 0;
  }, [saleData]);

  // ✨ NEW: State
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

  const [showShareModal, setShowShareModal] = useState(false);
  const [showWhatsAppToast, setShowWhatsAppToast] = useState(true);
  const [isPrinting, setIsPrinting] = useState(false);
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [showRatingModal, setShowRatingModal] = useState(false);

  // ✨ NEW: Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const checkAnim = useRef(new Animated.Value(0)).current;
  const toastAnim = useRef(new Animated.Value(0)).current;
  const totalScale = useRef(new Animated.Value(0.5)).current;

  // ✨ Auto-send WhatsApp on mount if requested
  useEffect(() => {
    if (route?.params?.autoSendWhatsApp && saleId) {
      console.log('[SaleSummary] 🤖 Auto-sending WhatsApp...');
      handleWhatsApp();
      // Clear the param so it doesn't re-trigger on subsequent renders
      navigation.setParams({ autoSendWhatsApp: false });
    }
  }, [saleId, route?.params?.autoSendWhatsApp]);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(checkAnim, {
        toValue: 1,
        friction: 5,
        delay: 200,
        useNativeDriver: true,
      }),
      Animated.spring(totalScale, {
        toValue: 1,
        friction: 6,
        delay: 400,
        useNativeDriver: true,
      }),
    ]).start();

    // Show WhatsApp toast
    Animated.sequence([
      Animated.delay(800),
      Animated.spring(toastAnim, {
        toValue: 1,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      Animated.timing(toastAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(() => setShowWhatsAppToast(false));
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // ✨ Computed values
  const totalItems = saleData.items
    ? saleData.items.length
    : (saleData.cartEntries ? saleData.cartEntries.length : 1);
  const totalQuantity = saleData.items
    ? saleData.items.reduce((acc: number, curr: any) => acc + curr.quantity, 0)
    : (saleData.cartEntries ? saleData.cartEntries.reduce((acc: number, curr: any) => acc + curr.quantity, 0) : 1);

  // const totalAmount = saleData.total || saleData.totalAmount || (saleData.summary?.total) || '0';

  const customerName = saleData.customer?.name || saleData.customerName || 'Customer';
  const partyPhone = saleData.customer?.phone || saleData.partyPhone || '';
  const billNo = saleData?.business?.invoiceNumber || 'N/A';
  // const paymentMode = saleData.payment_method || saleData.paymentMode || 'Cash';
  const paymentModeRaw =
    saleData?.payment_method ||
    saleData?.paymentMode ||
    saleData?.paymentMethod ||
    saleData?.payment_mode ||
    route?.params?.paymentMode ||
    'Cash';
  
  const paymentMode = paymentModeRaw.charAt(0).toUpperCase() + paymentModeRaw.slice(1);
  const billDate = saleData.date ? new Date(saleData.date).toLocaleDateString('en-GB') : new Date().toLocaleDateString('en-GB');

const discount = Number(
  saleData?.discount ||
  route?.params?.discount ||
  0
);

// Original total before discount
const subtotal = Number(
  saleData?.subtotal ||
  totalAmount ||
  0
);

// Final amount after discount
const grandTotal = Math.max(subtotal - discount, 0);

const discountPercentage =
  subtotal > 0
    ? (discount / subtotal) * 100
    : 0;

  // ✨ Handlers
  const handleDelete = () => {
    showAlert(
      'Delete Sale',
      'Are you sure you want to delete this sale? This action cannot be undone.',
      async () => {
        try {
          await deleteSale(saleId).unwrap();
          showAlert('Deleted', 'Sale deleted successfully', () => navigation.goBack(), undefined, 'success');
        } catch (err: any) {
          showAlert('Error', err?.data?.message || 'Failed to delete sale', undefined, undefined, 'error');
        }
      },
      () => { },
      'error',
      'Delete',
      'Cancel'
    );
  };

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      setIsPrinting(false);
      showAlert('Print', 'Invoice sent to printer', undefined, undefined, 'success');
    }, 1200);
  };

  const handlePdf = () => {
    navigation.navigate('InvoicePDF', { 
      saleId, 
      saleData,
      discount: parseFloat(discount) || 0,
      subtotal: subtotal,
      paymentMode: paymentMode
    });
  };

  const handleCall = () => {
    Linking.openURL(`tel:${partyPhone}`);
  };

  const handleWhatsApp = async () => {
    try {
      console.log('[SaleSummary] 📱 Sending WhatsApp message for sale:', saleId);
      const response = await sendWhatsApp(saleId).unwrap();
      
      if (response.success && response.whatsappUrl) {
        console.log('[SaleSummary] ✅ WhatsApp URL received:', response.whatsappUrl);
        Linking.openURL(response.whatsappUrl).catch((err) => {
          console.error('[SaleSummary] ❌ Failed to open URL:', err);
          showAlert('Error', 'Could not open WhatsApp', undefined, undefined, 'error');
        });
        
        // ✨ NEW: Success alert requested by user
        setTimeout(() => {
          showAlert('WhatsApp', 'Message sent on WhatsApp!', undefined, undefined, 'success');
        }, 1000);
      } else {
        showAlert('Error', 'Failed to generate WhatsApp link', undefined, undefined, 'error');
      }
    } catch (err: any) {
      console.error('[SaleSummary] ❌ WhatsApp error:', err);
      showAlert('Error', err?.data?.message || 'Failed to send WhatsApp message', undefined, undefined, 'error');
    } finally {
      setShowShareModal(false);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Invoice #${saleData?.business?.invoiceNumber} from ADINA COLLECTION\nCustomer: ${customerName}\nTotal: ₹${totalAmount}\nThank you!`,
      });
    } catch { }
    setShowShareModal(false);
  };

  const handleSubmitRating = (submittedRating: number) => {
    setShowRatingModal(false);
    setTimeout(() => {
      showAlert('Thank You!', `Thanks for rating us ${submittedRating} stars ⭐`, undefined, undefined, 'success');
    }, 400);
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" color={PRIMARY} />
        <Text className="mt-4 text-gray-500 font-medium">Loading Sale Data...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC]" edges={['top']}>
      <StatusBar backgroundColor={PRIMARY} barStyle="light-content" />

      <ScreenHeader
        title="Sale Detail"
        subtitle={`${saleData.business?.name || 'FAST'} | ${saleData.business?.phone || ''} | #${billNo}`}
        onBack={() => navigation.goBack()}
        rightElement={
          <>
            <TouchableOpacity
              onPress={() => { }}
              className="w-11 h-11 rounded-2xl bg-white/15 items-center justify-center"
              activeOpacity={0.7}
            >
              <Pencil size={20} color="#FFFFFF" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleDelete}
              disabled={isDeleting}
              className="w-11 h-11 rounded-2xl bg-white/15 items-center justify-center"
              activeOpacity={0.7}
            >
              <Trash2 size={20} color={isDeleting ? '#FFFFFF80' : '#FFFFFF'} />
            </TouchableOpacity>
          </>
        }
      />

      {/* <View className="px-4 -mt-6">
        <View className="flex-row items-center justify-between bg-white/10 rounded-2xl px-4 py-2.5">
        </View>
      </View> */}

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginHorizontal: 16,
          marginTop: -6,
          marginBottom: 5,
          backgroundColor: PRIMARY,
          paddingHorizontal: 16,
          paddingVertical: 10,
          borderRadius: 20,
          borderWidth: 3,
          borderColor: '#F8FAFC',
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 5,
        }}
      >
        <View className="flex-row items-center">
          <Text className="text-white text-[12px] font-bold ml-1.5">
            #{billNo}
          </Text>
        </View>
        <View className="w-px h-4 bg-white/30" />
        <View className="flex-row items-center">
          <Package size={14} color="white" />
          <Text className="text-white text-[12px] font-bold ml-1.5">
            {totalItems} Items
          </Text>
        </View>
        <View className="w-px h-4 bg-white/30" />
        <View className="flex-row items-center">
          <Wallet size={14} color="white" />
          <Text className="text-white text-[12px] font-extrabold ml-1.5">
            {/* ₹{totalAmount} */}
            ₹{grandTotal}
          </Text>
        </View>
      </View>

      {/* ACTION TOOLBAR */}
      <View className="flex-row items-center justify-end px-4 py-3 gap-2 bg-white border-b border-gray-100">
        <TouchableOpacity
          onPress={handlePdf}
          disabled={isPdfLoading}
          className="flex-row items-center bg-white border border-green-600 px-4 py-2 rounded-xl"
          activeOpacity={0.7}
          style={{ opacity: isPdfLoading ? 0.6 : 1 }}
        >
          <FileText size={14} color={SUCCESS} />
          <Text className="text-green-600 font-extrabold text-[13px] ml-1.5">
            {isPdfLoading ? 'LOADING...' : 'PDF'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handlePrint}
          disabled={isPrinting}
          className="flex-row items-center bg-green-600 px-4 py-2 rounded-xl"
          activeOpacity={0.7}
          style={{ opacity: isPrinting ? 0.7 : 1 }}
        >
          <Printer size={14} color="white" />
          <Text className="text-white font-extrabold text-[13px] ml-1.5">
            {isPrinting ? 'PRINTING...' : 'PRINT'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setShowShareModal(true)}
          className="w-9 h-9 rounded-xl bg-blue-50 items-center justify-center border border-blue-100"
          activeOpacity={0.7}
        >
          <Share2 size={16} color={PRIMARY} />
        </TouchableOpacity>
      </View>

      <Animated.View
        style={{
          flex: 1,
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ padding: 16, paddingBottom: 220 }}
          showsVerticalScrollIndicator={false}
        >
          {/* ✨ SUCCESS BANNER */}
          <View
            className="bg-white rounded-3xl p-5 border border-green-100 mb-4"
            style={{
              shadowColor: SUCCESS,
              shadowOpacity: 0.1,
              shadowRadius: 16,
              shadowOffset: { width: 0, height: 4 },
              elevation: 4,
            }}
          >
            <View className="flex-row items-center">
              <Animated.View
                style={{
                  transform: [{ scale: checkAnim }],
                }}
                className="w-14 h-14 rounded-full bg-green-100 items-center justify-center mr-3"
              >
                <CheckCircle2 size={32} color={SUCCESS} strokeWidth={2.5} />
              </Animated.View>
              <View className="flex-1">
                <Text className="text-[#0F172A] text-[18px] font-black">
                  Sale Completed!
                </Text>
                <Text className="text-[#64748B] text-[13px] mt-0.5">
                  Invoice generated successfully
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setShowRatingModal(true)}
                className="bg-yellow-100 px-3 py-1.5 rounded-full"
              >
                <View className="flex-row items-center">
                  <Star size={12} color={WARNING} fill={WARNING} />
                  <Text className="text-yellow-700 font-extrabold text-[11px] ml-1">
                    Rate
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View className="bg-white rounded-3xl p-5 border border-gray-200 mb-4">
            <View className="items-center">
              <View
                className="w-20 h-20 rounded-2xl items-center justify-center mb-3"
                style={{ backgroundColor: '#E8F0FE' }}
              >
                {saleData.business?.logo ? (
                  <Image
                    source={{ uri: saleData.business.logo }}
                    style={{ width: 60, height: 60, borderRadius: 12 }}
                  />
                ) : (
                  <Building2 size={40} color={PRIMARY} />
                )}
              </View>
              <Text className="text-[22px] font-black text-[#0F172A] tracking-tight">
                {saleData.business?.name || 'ADINA COLLECTION'}
              </Text>
              <View className="flex-row items-center mt-1.5">
                <MapPin size={12} color="#64748B" />
                <Text className="text-[#64748B] text-[12px] ml-1 text-center px-4">
                  {saleData.business?.address || 'OPP JAMA MASJID MOMINPURA NAGPUR, MAHARASHTRA'}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => Linking.openURL(`tel:${saleData.business?.phone || '9518795065'}`)}
                className="flex-row items-center mt-2 bg-blue-50 px-3 py-1.5 rounded-full"
              >
                <Phone size={12} color={PRIMARY} />
                <Text
                  style={{ color: PRIMARY }}
                  className="font-extrabold text-[12px] ml-1.5"
                >
                  {saleData.business?.phone || '9518795065'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* ✨ BILL META */}
          <View className="bg-white rounded-3xl border border-gray-200 mb-4 overflow-hidden">
            <View
              style={{ backgroundColor: '#F8FAFC' }}
              className="flex-row items-center px-5 py-3 border-b border-gray-100"
            >
              <Receipt size={16} color={PRIMARY} />
              <Text className="text-[#0F172A] font-black ml-2 tracking-wide">
                BILL DETAILS
              </Text>
            </View>

            <View className="px-5 py-4 gap-3">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <Hash size={14} color="#64748B" />
                  <Text className="text-[#64748B] text-[13px] ml-2">
                    Bill No
                  </Text>
                </View>
                <Text
                  className="text-[14px] font-extrabold"
                  style={{ color: PRIMARY }}
                >
                  #{saleData?.business?.invoiceNumber}
                </Text>
              </View>

              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <Calendar size={14} color="#64748B" />
                  <Text className="text-[#64748B] text-[13px] ml-2">
                    Created
                  </Text>
                </View>
                <Text className="text-[#0F172A] text-[13px] font-bold">
                  {new Date().toLocaleDateString('en-GB')}{' '}
                  {new Date().toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              </View>

              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <User size={14} color="#64748B" />
                  <Text className="text-[#64748B] text-[13px] ml-2">
                    Customer
                  </Text>
                </View>
                <Text className="text-[#0F172A] text-[13px] font-extrabold">
                  {customerName}
                </Text>
              </View>

              <TouchableOpacity
                onPress={handleCall}
                className="flex-row items-center justify-between"
              >
                <View className="flex-row items-center">
                  <Phone size={14} color="#64748B" />
                  <Text className="text-[#64748B] text-[13px] ml-2">
                    Phone
                  </Text>
                </View>
                <View className="flex-row items-center bg-green-50 px-2 py-1 rounded-full">
                  <Phone size={10} color={SUCCESS} />
                  <Text className="text-green-700 text-[12px] font-bold ml-1">
                    {partyPhone}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* ✨ ITEMS CARD */}
          <View className="bg-white rounded-3xl border border-gray-200 mb-4 overflow-hidden">
            <View
              style={{ backgroundColor: '#F8FAFC' }}
              className="flex-row items-center justify-between px-5 py-3 border-b border-gray-100"
            >
              <View className="flex-row items-center">
                <Package size={16} color={PRIMARY} />
                <Text className="text-[#0F172A] font-black ml-2 tracking-wide">
                  ITEMS PURCHASED
                </Text>
              </View>
              <View
                className="px-2.5 py-0.5 rounded-full"
                style={{ backgroundColor: '#E8F0FE' }}
              >
                <Text
                  style={{ color: PRIMARY }}
                  className="text-[11px] font-extrabold"
                >
                  {totalItems}
                </Text>
              </View>
            </View>

            {/* Table Header */}
            <View className="flex-row px-5 py-2.5 bg-gray-50 border-b border-gray-100">
              <Text className="flex-1 text-[11px] font-black text-[#64748B] tracking-wider">
                ITEM
              </Text>
              <Text className="w-10 text-center text-[11px] font-black text-[#64748B] tracking-wider">
                QTY
              </Text>
              <Text className="w-14 text-right text-[11px] font-black text-[#64748B] tracking-wider">
                RATE
              </Text>
              <Text className="w-16 text-right text-[11px] font-black text-[#64748B] tracking-wider">
                TOTAL
              </Text>
            </View>

            {/* API ITEMS */}
            {saleData.items && saleData.items.length > 0 ? (
              saleData.items.map((entry: any, index: number) => {
                const itemName = entry.product?.name || 'Item';
                const price = entry.price || 0;
                const total = price * entry.quantity;
                return (
                  <View
                    key={index}
                    className="flex-row px-5 py-3 border-b border-gray-100 items-center"
                  >
                    <View className="flex-1 flex-row items-center">
                      <View
                        className="w-6 h-6 rounded-full items-center justify-center mr-2"
                        style={{ backgroundColor: '#E8F0FE' }}
                      >
                        <Text
                          style={{ color: PRIMARY }}
                          className="text-[10px] font-black"
                        >
                          {index + 1}
                        </Text>
                      </View>
                      <Text
                        className="text-[#0F172A] font-bold text-[14px] flex-1"
                        numberOfLines={1}
                      >
                        {itemName}
                      </Text>
                    </View>
                    <Text className="w-10 text-center font-bold text-[14px] text-[#0F172A]">
                      {entry.quantity}
                    </Text>
                    <Text className="w-14 text-right font-medium text-[14px] text-[#64748B]">
                      ₹{price}
                    </Text>
                    <Text className="w-16 text-right font-extrabold text-[14px] text-[#0F172A]">
                      ₹{total}
                    </Text>
                  </View>
                );
              })
            ) : saleData.cartEntries && saleData.cartEntries.length > 0 ? (
              saleData.cartEntries.map((entry: any, index: number) => {
                const price = entry.item.sellPrice || entry.item.price || 0;
                const total = price * entry.quantity;
                return (
                  <View
                    key={index}
                    className="flex-row px-5 py-3 border-b border-gray-100 items-center"
                  >
                    <View className="flex-1 flex-row items-center">
                      <View
                        className="w-6 h-6 rounded-full items-center justify-center mr-2"
                        style={{ backgroundColor: '#E8F0FE' }}
                      >
                        <Text
                          style={{ color: PRIMARY }}
                          className="text-[10px] font-black"
                        >
                          {index + 1}
                        </Text>
                      </View>
                      <Text
                        className="text-[#0F172A] font-bold text-[14px] flex-1"
                        numberOfLines={1}
                      >
                        {entry.item.name}
                      </Text>
                    </View>
                    <Text className="w-10 text-center font-bold text-[14px] text-[#0F172A]">
                      {entry.quantity}
                    </Text>
                    <Text className="w-14 text-right font-medium text-[14px] text-[#64748B]">
                      ₹{price}
                    </Text>
                    <Text className="w-16 text-right font-extrabold text-[14px] text-[#0F172A]">
                      ₹{total}
                    </Text>
                  </View>
                );
              })
            ) : (
              <View className="px-5 py-8 items-center">
                <Text className="text-gray-400 italic">No items found</Text>
              </View>
            )}

            {/* Items Summary */}
            <View className="px-5 py-3 bg-gray-50 flex-row justify-between">
              <Text className="text-[#64748B] text-[12px] font-bold">
                Total Items: {totalItems}
              </Text>
              <Text className="text-[#64748B] text-[12px] font-bold">
                Total Qty: {totalQuantity}
              </Text>
            </View>
          </View>

          {/* ✨ TOTAL CARD */}
          <Animated.View
            style={{
              transform: [{ scale: totalScale }],
              shadowColor: PRIMARY,
              shadowOpacity: 0.25,
              shadowRadius: 16,
              shadowOffset: { width: 0, height: 6 },
              elevation: 8,
            }}
            className="rounded-3xl p-5 mb-4 overflow-hidden"
          >
            <View
              style={{
                backgroundColor: PRIMARY,
                position: 'absolute',
                inset: 0,
              }}
            />
            <View
              style={{
                position: 'absolute',
                right: -30,
                top: -30,
                width: 120,
                height: 120,
                borderRadius: 60,
                backgroundColor: 'rgba(255,255,255,0.1)',
              }}
            />
            <View
              style={{
                position: 'absolute',
                left: -20,
                bottom: -20,
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: 'rgba(255,255,255,0.08)',
              }}
            />

            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-white/80 text-[12px] font-bold">
                SUB TOTAL
              </Text>
              <Text className="text-white text-[15px] font-bold">
                {/* ₹{totalAmount} */}
                ₹{subtotal}
              </Text>
            </View>

            <View className="h-px bg-white/20 mb-3" />

            <View className="flex-row justify-between items-end">
              <View>
                <Text className="text-white/80 text-[12px] font-bold">
                  GRAND TOTAL
                </Text>
                <Text className="text-white text-[40px] font-black tracking-tight leading-tight">
                  {/* ₹{totalAmount} */}
                  ₹{grandTotal}
                </Text>
              </View>
              <View className="items-end">
                <View className="bg-white/20 px-3 py-1 rounded-full">
                  <Text className="text-white text-[10px] font-black">
                    PAID
                  </Text>
                </View>
                <Text className="text-white/80 text-[11px] mt-1">
                  via {paymentMode}
                </Text>
              </View>
            </View>
          </Animated.View>

          {/* ✨ PAYMENT CARD */}
          <View className="bg-white rounded-3xl border border-gray-200 mb-4 overflow-hidden">
            <View
              style={{ backgroundColor: '#F8FAFC' }}
              className="flex-row items-center px-5 py-3 border-b border-gray-100"
            >
              <CreditCard size={16} color={PRIMARY} />
              <Text className="text-[#0F172A] font-black ml-2 tracking-wide">
                PAYMENT INFO
              </Text>
            </View>

            <View className="px-5 py-4 gap-3">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <Wallet size={14} color="#64748B" />
                  <Text className="text-[#64748B] text-[13px] ml-2">
                    Mode of Payment
                  </Text>
                </View>
                <View className="bg-green-50 px-3 py-1 rounded-full">
                  <Text className="text-green-700 text-[12px] font-extrabold uppercase">
                    {paymentMode}
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <Hash size={14} color="#64748B" />
                  <Text className="text-[#64748B] text-[13px] ml-2">
                    Sub Total
                  </Text>
                </View>
                <Text className="text-[#0F172A] text-[15px] font-bold">
                  ₹{subtotal}
                </Text>
              </View>

              {parseFloat(discount) > 0 && (
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center">
                    <IndianRupee size={14} color="#64748B" />
                    <Text className="text-[#64748B] text-[13px] ml-2">
                      Discount ({discountPercentage.toFixed(1)}%)
                    </Text>
                  </View>
                  <Text className="text-red-500 text-[15px] font-bold">
                    -₹{discount}
                  </Text>
                </View>
              )}

              <View className="h-px bg-gray-100 my-1" />

              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <CheckCircle2 size={14} color={SUCCESS} />
                  <Text className="text-[#0F172A] text-[15px] font-extrabold ml-2">
                    Grand Total
                  </Text>
                </View>
                <Text className="text-green-600 text-[18px] font-black">
                  {/* ₹{totalAmount} */}
                  ₹{grandTotal}
                </Text>
              </View>

              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <Clock size={14} color="#64748B" />
                  <Text className="text-[#64748B] text-[13px] ml-2">
                    Balance Due
                  </Text>
                </View>
                <Text className="text-[#0F172A] text-[15px] font-extrabold">
                  ₹0.00
                </Text>
              </View>
            </View>
          </View>

          {/* ✨ TERMS CARD */}
          <View className="bg-white rounded-3xl border border-gray-200 p-5 mb-4">
            <View className="items-center mb-3">
              <View
                className="px-4 py-1.5 rounded-full"
                style={{ backgroundColor: '#FEF3C7' }}
              >
                <Text className="text-yellow-700 font-black text-[12px] tracking-widest">
                  ⚠ EXCHANGE POLICY
                </Text>
              </View>
            </View>

            <View className="gap-2">
              {[
                'No Return Policy Only Exchange',
                'Exchange Within 4-5 Days After that Exchange Not Allowed',
                'Exchange time 12pm - 5pm.',
                'Items without Price Tags is Not Accepted',
                'No Guarantee on Fancy Item',
              ].map((term, i) => (
                <View key={i} className="flex-row items-start">
                  <View
                    className="w-5 h-5 rounded-full items-center justify-center mr-2 mt-0.5"
                    style={{ backgroundColor: '#E8F0FE' }}
                  >
                    <Text
                      style={{ color: PRIMARY }}
                      className="text-[10px] font-black"
                    >
                      {i + 1}
                    </Text>
                  </View>
                  <Text className="text-[#475569] text-[13px] leading-5 flex-1">
                    {term}
                  </Text>
                </View>
              ))}
            </View>

            <View className="items-center mt-4 pt-4 border-t border-gray-100">
              <Text
                style={{ color: PRIMARY }}
                className="font-black text-[15px]"
              >
                Thank You! Visit Again 🙏
              </Text>
            </View>
          </View>
        </ScrollView>
      </Animated.View>

      {/* ✨ Animated WhatsApp Toast */}
      {showWhatsAppToast && (
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 110,
            left: 16,
            right: 16,
            opacity: toastAnim,
            transform: [
              {
                translateY: toastAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [40, 0],
                }),
              },
            ],
          }}
        >
          <View
            className="bg-[#1F2937] rounded-2xl px-4 py-3 flex-row items-center"
            style={{
              shadowColor: '#000',
              shadowOpacity: 0.25,
              shadowRadius: 16,
              shadowOffset: { width: 0, height: 6 },
              elevation: 10,
            }}
          >
            <View className="w-9 h-9 bg-[#25D366] rounded-full items-center justify-center mr-3">
              <MessageCircle size={18} color="white" />
            </View>
            <View className="flex-1">
              <Text className="text-white font-extrabold text-[13px]">
                Sent on WhatsApp
              </Text>
              <Text className="text-white/70 text-[11px]">
                Bill shared with Party & Owner
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                Animated.timing(toastAnim, {
                  toValue: 0,
                  duration: 200,
                  useNativeDriver: true,
                }).start(() => setShowWhatsAppToast(false));
              }}
              className="w-7 h-7 rounded-full bg-white/10 items-center justify-center"
            >
              <X size={14} color="white" />
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}

      {/* BOTTOM ACTIONS */}
      <View
        className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 pt-3 pb-4"
        style={{
          shadowColor: '#000',
          shadowOpacity: 0.06,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: -4 },
          elevation: 12,
        }}
      >
        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={() => setShowShareModal(true)}
            className="w-14 h-14 rounded-2xl items-center justify-center border border-gray-200 bg-gray-50"
            activeOpacity={0.7}
          >
            <Share2 color={PRIMARY} size={22} />
          </TouchableOpacity>

          <PrimaryButton
            title="PRINT"
            variant="outlined"
            onPress={handlePrint}
            style={{
              flex: 1,
              borderColor: PRIMARY,
              borderRadius: 16,
              paddingVertical: 14,
            }}
            textStyle={{
              color: PRIMARY,
              fontSize: 15,
              fontWeight: '800',
            }}
          />

          <PrimaryButton
            title="+ NEW SALE"
            variant="filled"
            onPress={() => navigation.navigate('NewSale')}
            style={{
              flex: 1.5,
              backgroundColor: PRIMARY,
              borderRadius: 16,
              paddingVertical: 14,
            }}
            textStyle={{
              fontSize: 15,
              fontWeight: '800',
              letterSpacing: 1,
            }}
          />
        </View>
      </View>

      {/* ✨ SHARE MODAL */}
      <ShareModal
        visible={showShareModal}
        onClose={() => setShowShareModal(false)}
        onWhatsApp={handleWhatsApp}
        onEmail={handleShare}
        onSms={handleShare}
        onMore={handleShare}
        onCopyLink={() => {
          showAlert('Copied', 'Invoice link copied', undefined, undefined, 'success');
          setShowShareModal(false);
        }}
        onDownloadPdf={handlePdf}
      />

      {/* ✨ RATING MODAL */}
      <RatingModal
        visible={showRatingModal}
        onClose={() => setShowRatingModal(false)}
        onSubmit={handleSubmitRating}
      />

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