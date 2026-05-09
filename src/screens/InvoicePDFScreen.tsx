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
  Dimensions,
  Linking,
  PermissionsAndroid,
  Platform,
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
  Settings,
  Eye,
  ZoomIn,
  ZoomOut,
  X,
  CheckCircle2,
  Hash,
  IndianRupee,
  Sparkles,
} from 'lucide-react-native';
import PrimaryButton from '../components/ui/PrimaryButton';
import CustomAlert from '../components/CustomAlert';
import ShareModal from '../components/ui/ShareModal';
import { SafeAreaView } from 'react-native-safe-area-context';

const PRIMARY = '#1A73E8';
const SUCCESS = '#16A34A';
const DANGER = '#DC2626';

const { width: SCREEN_W } = Dimensions.get('window');

type ThemeColor = {
  name: string;
  primary: string;
  bg: string;
};

const THEME_COLORS: ThemeColor[] = [
  { name: 'Blue', primary: '#1A73E8', bg: '#E8F0FE' },
  { name: 'Green', primary: '#16A34A', bg: '#DCFCE7' },
  { name: 'Purple', primary: '#7C3AED', bg: '#EDE9FE' },
  { name: 'Orange', primary: '#EA580C', bg: '#FFEDD5' },
  { name: 'Pink', primary: '#DB2777', bg: '#FCE7F3' },
  { name: 'Black', primary: '#0F172A', bg: '#F1F5F9' },

  // PREMIUM PDF COLORS
  { name: 'Royal Navy', primary: '#1E3A8A', bg: '#DBEAFE' },
  { name: 'Emerald Luxe', primary: '#047857', bg: '#D1FAE5' },
  { name: 'Deep Wine', primary: '#9F1239', bg: '#FFE4E6' },
  { name: 'Golden Elite', primary: '#B45309', bg: '#FEF3C7' },
];

import { 
  useGetInvoiceQuery, 
  useUploadInvoicePdfMutation,
  useSendWhatsAppMutation 
} from '../redux/api/saleApi';
import { ActivityIndicator } from 'react-native';
import ScreenHeader from '../components/ui/ScreenHeader';
import { generatePDF } from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';

export default function InvoicePDFScreen({ navigation, route }: any) {
  const saleId = route?.params?.saleId || route?.params?.saleData?.id || route?.params?.saleData?._id;

  // ✅ API CALLS
  const { data: apiResponse, isLoading: isDataLoading } = useGetInvoiceQuery(saleId, {
    skip: !saleId,
  });
  const [uploadPdf, { isLoading: isUploading }] = useUploadInvoicePdfMutation();
  const [sendWhatsApp, { isLoading: isSendingWhatsApp }] = useSendWhatsAppMutation();

  // const saleData = useMemo(() => {
  //   if (apiResponse?.success && apiResponse.message) {
  //     return apiResponse.message;
  //   }
  //   return route?.params?.saleData || {};
  // }, [apiResponse, route?.params?.saleData]);

const saleData = useMemo(() => {
  console.log('API RESPONSE:', apiResponse);
  console.log('ROUTE PARAMS:', route?.params);

  // Case 1: apiResponse.message contains sale object
  if (
    apiResponse?.success &&
    typeof apiResponse?.message === 'object'
  ) {
    return apiResponse.message;
  }

  // Case 2: apiResponse.sale exists
  if (apiResponse?.sale) {
    return apiResponse.sale;
  }

  // Case 3: route params contains nested sale
  if (route?.params?.saleData?.sale) {
    return route.params.saleData.sale;
  }

  // Case 4: direct sale object
  if (route?.params?.saleData) {
    return route.params.saleData;
  }

  return {};
}, [apiResponse, route?.params]);

  const {
    discount: passedDiscount = 0,
    subtotal: passedSubtotal = 0,
    paymentMode: passedPaymentMode,
  } = route?.params || {};

  const calculatedTotal = useMemo(() => {
    if (saleData.total || saleData.totalAmount) return saleData.total || saleData.totalAmount;
    if (saleData.amount_received) return saleData.amount_received;

    // Fallback: calculate from items
    const items = saleData.items || saleData.cartEntries || [];
    return items.reduce((acc: number, curr: any) => {
      const price = curr.price || curr.item?.sellPrice || 0;
      return acc + (price * (curr.quantity || 0));
    }, 0);
  }, [saleData]);

const discountValue = Number(
  saleData?.discount ||
  passedDiscount ||
  0
);

// Original amount before discount
const subtotalValue = Number(
  saleData?.subtotal ||
  calculatedTotal ||
  0
);

// Final payable amount
const grandTotal = Math.max(
  subtotalValue - discountValue,
  0
);

const paymentModeDisplay = saleData.payment_method || saleData.paymentMode || passedPaymentMode || 'CASH';
const billNo = (saleData?.business?.invoiceNumber || 'N/A').toString();

  // ✨ NEW: State management
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

  const [showToast, setShowToast] = useState(true);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showCustomiseModal, setShowCustomiseModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [themeColor, setThemeColor] = useState<ThemeColor>(THEME_COLORS[0]);
  const [zoom, setZoom] = useState(1);
  const [isPrinting, setIsPrinting] = useState(false);
  const [isPdfGenerating, setIsPdfGenerating] = useState(false);

  // ✨ NEW: Customisation Options
  const [showLogo, setShowLogo] = useState(true);
  const [showSignature, setShowSignature] = useState(true);
  const [showTerms, setShowTerms] = useState(true);
  const [showWatermark, setShowWatermark] = useState(false);

  if (isDataLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" color={PRIMARY} />
        <Text className="mt-4 text-gray-500 font-medium">Preparing Invoice Data...</Text>
      </SafeAreaView>
    );
  }

  // ✨ NEW: Animations
  const toastAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const fabAnim = useRef(new Animated.Value(0)).current;

  // ✨ Auto-hide toast
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(fabAnim, {
        toValue: 1,
        friction: 6,
        delay: 200,
        useNativeDriver: true,
      }),
    ]).start();

    if (showToast) {
      Animated.sequence([
        Animated.spring(toastAnim, {
          toValue: 1,
          friction: 6,
          useNativeDriver: true,
        }),
        Animated.delay(2200),
        Animated.timing(toastAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => setShowToast(false));
    }
  }, []);

  // ✨ NEW: Handlers
  const handleDelete = () => {
    showAlert(
      'Delete Invoice',
      'Are you sure you want to delete this invoice? This action cannot be undone.',
      () => {
        setTimeout(() => {
          showAlert('Deleted', 'Invoice deleted successfully', () => navigation.goBack(), undefined, 'success');
        }, 400);
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
      showAlert('Print', 'Invoice sent to printer successfully', undefined, undefined, 'success');
    }, 1500);
  };

  const generateInvoiceHTML = () => {
    // Prepare items HTML
    const items = saleData.items || saleData.cartEntries || [];
    const itemsHtml = items.map((entry: any, index: number) => {
      const itemName = entry.product?.name || entry.item?.name || 'Item';
      const qty = entry.quantity || 0;
      const price = entry.price || entry.item?.sellPrice || 0;
      const total = qty * price;
      return `
      <tr>
        <td style="padding: 8px 6px; border-bottom: 1px solid #e2e8f0;">${index + 1} ${itemName}</td>
        <td style="padding: 8px 6px; border-bottom: 1px solid #e2e8f0; text-align: center;">${qty}</td>
        <td style="padding: 8px 6px; border-bottom: 1px solid #e2e8f0; text-align: center;">${price}</td>
        <td style="padding: 8px 6px; border-bottom: 1px solid #e2e8f0; text-align: center;">${price}</td>
        <td style="padding: 8px 6px; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: bold;">${total}</td>
      </tr>
    `;
    }).join('');

    const totalQty = items.reduce((acc: number, curr: any) => acc + (curr.quantity || 0), 0);
    const grandTotalAmount = grandTotal;
    const discountValueVal = discountValue;
    const subtotalValueVal = subtotalValue;

    // Conditional sections
    const logoSection = showLogo ? `
    <div style="text-align: right;">
      <div style="width: 48px; height: 48px; border: 1px solid ${theme.primary}30; background: ${theme.bg}; display: inline-flex; align-items: center; justify-content: center; border-radius: 6px;">
        <span style="color: ${theme.primary}; font-size: 10px; font-weight: bold;">LOGO</span>
      </div>
    </div>
  ` : '<div></div>';

    const watermarkHtml = showWatermark ? `
    <div style="position: absolute; top: 40%; left: 0; right: 0; text-align: center; opacity: 0.04; transform: rotate(-30deg); pointer-events: none;">
      <span style="font-size: 80px; font-weight: 900; color: ${theme.primary};">PAID</span>
    </div>
  ` : '';

    const signatureHtml = showSignature ? `
    <div style="margin-top: 32px; display: flex; justify-content: space-between; padding: 0 16px;">
      <div style="text-align: center; width: 80px;">
        <div style="height: 1px; background: #cbd5e1;"></div>
        <p style="font-size: 8px; margin-top: 4px; color: #475569;">Customer Signature</p>
      </div>
      <div style="text-align: center; width: 80px;">
        <div style="height: 1px; background: #cbd5e1;"></div>
        <p style="font-size: 8px; margin-top: 4px; color: #475569;">Authorized Signatory</p>
      </div>
    </div>
  ` : '';

    const termsHtml = showTerms ? `
    <div style="margin-top: 32px; background: #f8fafc; padding: 8px; border-radius: 6px;">
      <p style="font-size: 9px; font-weight: bold; color: #1e293b;">TERMS AND CONDITIONS</p>
      <p style="font-size: 7px; color: #64748b; margin-top: 6px; line-height: 1.4;">
        NOTE : EXCHANGE POLICY<br/>
        1. No Return Policy Only Exchange<br/>
        2. Exchange Within 4-5 Days After that Exchange Not Allowed<br/>
        3. Exchange time 12pm - 5pm.<br/>
        4. Items without Price Tags is Not Accepted<br/>
        5. No Guarantee on Fancy Item<br/>
        <span style="color: ${theme.primary}; font-weight: bold;">Thank You! Visit Again! 🙏</span>
      </p>
    </div>
  ` : '';

    return `
    <html>
      <head>
        <style>
          body { font-family: 'Helvetica'; padding: 20px; color: #1e293b; }
          .container { border: 1px solid #e2e8f0; padding: 20px; border-radius: 8px; }
          .header-row { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; }
          .original-text { font-size: 7px; font-weight: bold; color: #94a3b8; letter-spacing: 1px; }
          .business-name { font-size: 20px; font-weight: 900; color: ${theme.primary}; margin: 0; }
          .business-address { font-size: 9px; color: #475569; margin-top: 4px; line-height: 1.3; }
          .invoice-title { text-align: center; margin: 16px 0; }
          .invoice-title-inner { border-bottom: 2px solid ${theme.primary}; display: inline-block; padding: 0 20px 6px; }
          .invoice-title-text { font-size: 14px; font-weight: 900; letter-spacing: 2px; color: ${theme.primary}; margin: 0; }
          .billing-row { display: flex; justify-content: space-between; margin-top: 8px; margin-bottom: 20px; }
          .bill-to { flex: 1; }
          .bill-to-title { font-size: 8px; font-weight: bold; color: #334155; }
          .bill-to-name { font-size: 10px; font-weight: bold; margin-top: 2px; }
          .bill-to-phone { font-size: 8px; color: #475569; }
          .invoice-meta { width: 160px; }
          .meta-row { display: flex; justify-content: space-between; font-size: 8px; margin-bottom: 4px; }
          .meta-label { font-weight: bold; color: #334155; }
          .meta-value { color: ${theme.primary}; }
          .items-table { width: 100%; border-collapse: collapse; margin-top: 16px; border: 1px solid ${theme.primary}; border-radius: 4px; overflow: hidden; }
          .items-table th { background: ${theme.primary}; color: white; font-size: 8px; font-weight: bold; padding: 8px 6px; text-align: left; }
          .items-table th.center { text-align: center; }
          .items-table th.right { text-align: right; }
          .total-row { background: ${theme.bg}; border-top: 1px solid ${theme.primary}; }
          .total-row td { font-weight: bold; font-size: 8px; padding: 8px 6px; }
          .total-value { color: ${theme.primary}; }
          .totals-section { display: flex; justify-content: flex-end; margin-top: 16px; }
          .totals-card { width: 260px; }
          .subtotal-row, .discount-row { display: flex; justify-content: space-between; font-size: 9px; margin-bottom: 4px; }
          .grand-total-row { background: ${theme.bg}; padding: 6px 8px; border-radius: 4px; display: flex; justify-content: space-between; font-weight: bold; font-size: 10px; margin: 8px 0; color: ${theme.primary}; }
          .payment-row { display: flex; justify-content: space-between; font-size: 8px; margin-top: 4px; font-weight: bold; }
          .balance-row { border-top: 1px solid #e2e8f0; margin-top: 4px; padding-top: 4px; display: flex; justify-content: space-between; font-size: 8px; font-weight: bold; }
          .balance-due { color: #dc2626; }
          .word-amount { margin-top: 16px; flex: 1; }
          .word-amount-label { font-size: 8px; font-weight: bold; color: #334155; }
          .word-amount-text { font-size: 8px; font-style: italic; color: #64748b; margin-top: 2px; }
          .footer-note { text-align: center; font-size: 7px; color: #94a3b8; margin-top: 32px; font-style: italic; }
        </style>
      </head>
      <body>
        <div class="container" style="position: relative;">
          ${watermarkHtml}
          <!-- Header with logo -->
          <div class="header-row">
            <div class="original-text">ORIGINAL FOR RECIPIENT</div>
            ${logoSection}
          </div>

          <!-- Business Info -->
          <h1 class="business-name">${saleData.business?.name || 'REDIMADE CLOTHES'}</h1>
          <p class="business-address">
            ${saleData.business?.address || 'OPP JAMA MASJID MOMINPURA, NAGPUR, MAHARASHTRA, 440018'}<br/>
            📞 ${saleData.business?.phone || '9518795065'}
          </p>

          <!-- Invoice Title -->
          <div class="invoice-title">
            <div class="invoice-title-inner">
              <p class="invoice-title-text">TAX INVOICE</p>
            </div>
          </div>

          <!-- Billing Info -->
          <div class="billing-row">
            <div class="bill-to">
              <p class="bill-to-title">Bill To:</p>
              <p class="bill-to-name">${saleData.customer?.name || saleData.customerName || 'Shoeb Ansari'}</p>
              <p class="bill-to-phone">📞 ${saleData.customer?.phone || saleData.partyPhone || '9817895065'}</p>
            </div>
            <div class="invoice-meta">
              <div class="meta-row">
                <span class="meta-label">Bill No</span>
                <span class="meta-value">#${saleData?.business?.invoiceNumber || 'N/A'}</span>
              </div>
              <div class="meta-row">
                <span class="meta-label">Created On</span>
                <span class="meta-value">${new Date(saleData.date || Date.now()).toLocaleDateString('en-GB')}</span>
              </div>
              <div class="meta-row">
                <span class="meta-label">Payment</span>
                <span class="meta-value">${paymentModeDisplay}</span>
              </div>
            </div>
          </div>

          <!-- Items Table -->
          <table class="items-table">
            <thead>
              <tr>
                <th style="width: 40%;">Description</th>
                <th class="center">Qty</th>
                <th class="center">Rate</th>
                <th class="center">MRP</th>
                <th class="right">Total</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
              <tr class="total-row">
                <td>TOTAL ITEMS: ${items.length}</td>
                <td class="center">${totalQty}</td>
                <td colspan="2"></td>
                <td class="right total-value">₹${subtotalValueVal}</td>
              </tr>
            </tbody>
          </table>

          <!-- Totals Section -->
          <div class="totals-section">
            <div class="word-amount">
              <p class="word-amount-label">Amount in words:</p>
              <p class="word-amount-text">Rupees Only</p>
            </div>
            <div class="totals-card">
              <div class="subtotal-row">
                <span>Sub Total</span>
                <span>₹${subtotalValueVal}</span>
              </div>
              <div class="discount-row">
                <span>Discount</span>
                <span>- ₹${discountValueVal}</span>
              </div>
              <div class="grand-total-row">
                <span>GRAND TOTAL</span>
                <span>₹${grandTotalAmount}</span>
              </div>
              <div class="payment-row">
                <span>Paid Amount</span>
                <span>₹${grandTotalAmount}</span>
              </div>
              <div class="balance-row">
                <span>Balance Due</span>
                <span class="balance-due">₹0.00</span>
              </div>
            </div>
          </div>

          ${signatureHtml}
          ${termsHtml}
          
          <p class="footer-note">This is computer generated invoice. Signature not required.</p>
        </div>
      </body>
    </html>
  `;
  };

  const handlePdf = async () => {
    const finalId = saleId || saleData?.id || saleData?._id;
    if (!finalId) {
      showAlert('Error', 'Invalid Sale ID. Cannot upload PDF.', undefined, undefined, 'error');
      return;
    }

    try {
      setIsPdfGenerating(true);
      const timestamp = Date.now();
      const uniqueFileName = `invoice_${finalId}_${timestamp}`;
      const htmlString = generateInvoiceHTML();

      // Generate PDF
      const options = {
        html: htmlString,
        fileName: uniqueFileName,
        directory: 'Documents',
      };

      const file = await generatePDF(options);
      const pdfUri = file.filePath?.startsWith('file://') ? file.filePath : `file://${file.filePath}`;
      const uniquePdfName = `${uniqueFileName}.pdf`;

      // Upload to server
      const formData = new FormData();
      formData.append('pdf', {
        uri: pdfUri,
        type: 'application/pdf',
        name: uniquePdfName,
      } as any);

      await uploadPdf({ id: finalId, formData }).unwrap();
      showAlert('Success', 'Invoice PDF uploaded successfully!', undefined, undefined, 'success');

      // Cleanup local file
      try {
        await RNFS.unlink(pdfUri.replace('file://', ''));
      } catch (cleanupErr) {
        console.warn('Cleanup failed:', cleanupErr);
      }
    } catch (err: any) {
      console.error('PDF Error:', err);
      const errorMsg = err?.data?.message || err?.message || 'Unknown upload error';
      showAlert('Error', `Upload Failed: ${errorMsg}`, undefined, undefined, 'error');
    } finally {
      setIsPdfGenerating(false);
    }
  };

  const handleDownloadPdf = async () => {
    try {
      if (Platform.OS === 'android') {
        try {
          await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'Storage Permission',
              message: 'App needs access to your storage to download the PDF',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            }
          );
        } catch (err) {
          console.warn(err);
        }
      }

      setIsPdfGenerating(true);
      const timestamp = Date.now();
      const fileName = `Invoice_${billNo.replace(/#/g, '')}_${timestamp}`;
      const htmlString = generateInvoiceHTML();

      const options = {
        html: htmlString,
        fileName: fileName,
        directory: 'Documents',
      };

      const file = await generatePDF(options);
      
      if (Platform.OS === 'android') {
        const destPath = `${RNFS.DownloadDirectoryPath}/${fileName}.pdf`;
        await RNFS.copyFile(file.filePath, destPath);
        
        // Scan the file so it shows up in File Manager / Downloads app immediately
        try {
          await RNFS.scanFile(destPath);
        } catch (scanErr) {
          console.warn('Scan failed:', scanErr);
        }

        showAlert(
          'Downloaded', 
          `Invoice saved to Downloads folder as ${fileName}.pdf`, 
          () => {
            // Optional: try to open the downloads folder or file
            // On many devices, this works to open the system file manager
            if (Platform.OS === 'android') {
               // This is a common way to attempt opening the downloads folder
               Linking.openURL('content://com.android.externalstorage.documents/root/primary').catch(() => {
                 // Fallback if the content URL fails
               });
            }
          },
          undefined,
          'success',
          'Open File Manager'
        );
      } else {
        await Share.share({
          url: file.filePath,
          title: 'Save Invoice',
        });
      }
    } catch (err: any) {
      console.error('Download Error:', err);
      showAlert('Error', 'Failed to save PDF to device', undefined, undefined, 'error');
    } finally {
      setIsPdfGenerating(false);
      setShowShareModal(false);
    }
  };


  const handleShare = async (medium: string) => {
    setShowShareModal(false);
    setTimeout(async () => {
      try {
        if (medium === 'native') {
          await Share.share({
            message: `Invoice #${billNo} from ${saleData.business?.name || 'ADINA COLLECTION'}\nCustomer: ${saleData.customer?.name || saleData.customerName || 'Customer'}\nTotal: ₹${calculatedTotal}\nThank you for your business!`,
            title: `Invoice #${billNo}`,
          });
        } else {
          showAlert('Shared', `Invoice shared via ${medium}`, undefined, undefined, 'success');
        }
      } catch (err) {
        showAlert('Error', 'Could not share invoice', undefined, undefined, 'error');
      }
    }, 400);
  };

  const handleCopyLink = () => {
    setShowShareModal(false);
    setTimeout(() => {
      showAlert('Copied', 'Invoice link copied to clipboard', undefined, undefined, 'success');
    }, 400);
  };

  const handleZoomIn = () => setZoom((z) => Math.min(1.4, z + 0.1));
  const handleZoomOut = () => setZoom((z) => Math.max(0.8, z - 0.1));


  const handleWhatsApp = async () => {
    try {
      console.log('[InvoicePDF] 📱 Sending WhatsApp message for sale:', saleId);
      const response = await sendWhatsApp(saleId).unwrap();
      
      if (response.success && response.whatsappUrl) {
        console.log('[InvoicePDF] ✅ WhatsApp URL received:', response.whatsappUrl);
        Linking.openURL(response.whatsappUrl).catch((err) => {
          console.error('[InvoicePDF] ❌ Failed to open URL:', err);
          showAlert('Error', 'Could not open WhatsApp', undefined, undefined, 'error');
        });
      } else {
        showAlert('Error', 'Failed to generate WhatsApp link', undefined, undefined, 'error');
      }
    } catch (err: any) {
      console.error('[InvoicePDF] ❌ WhatsApp error:', err);
      showAlert('Error', err?.data?.message || 'Failed to send WhatsApp message', undefined, undefined, 'error');
    } finally {
      setShowShareModal(false);
    }
  };

  // ✨ Dynamic theme color
  const theme = themeColor;

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC]" edges={['top']}>
      <StatusBar backgroundColor={PRIMARY} barStyle="light-content" />

      <ScreenHeader
        title="Invoice PDF"
        subtitle={`${saleData.business?.name || 'FAST'} | ${saleData.business?.phone || ''} | #${billNo}`}
        onBack={() => navigation.goBack()}
        rightElement={
          <View className="flex-row items-center gap-2">
            <TouchableOpacity
              onPress={() => setShowPreviewModal(true)}
              className="w-10 h-10 rounded-2xl bg-white/15 items-center justify-center"
              activeOpacity={0.7}
            >
              <Eye color="white" size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => showAlert('Edit', 'Open invoice editor', undefined, undefined, 'info')}
              className="w-10 h-10 rounded-2xl bg-white/15 items-center justify-center"
              activeOpacity={0.7}
            >
              <Pencil color="white" size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleDelete}
              className="w-10 h-10 rounded-2xl bg-white/15 items-center justify-center"
              activeOpacity={0.7}
            >
              <Trash2 color="white" size={20} />
            </TouchableOpacity>
          </View>
        }
      />

      {/* ACTION TOOLBAR */}
      <View className="flex-row justify-between items-center px-4 py-3 bg-white border-b border-gray-100">
        <TouchableOpacity
          onPress={() => setShowCustomiseModal(true)}
          className="flex-row items-center bg-blue-50 px-4 py-2 rounded-xl border border-blue-100"
          activeOpacity={0.7}
          style={{
            backgroundColor: '#E8F0FE',
            borderColor: PRIMARY + '30',
          }}
        >
          <Settings size={14} color={PRIMARY} />
          <Text
            style={{ color: PRIMARY }}
            className="font-extrabold ml-1.5 text-[13px]"
          >
            CUSTOMISE
          </Text>
        </TouchableOpacity>

        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={handlePrint}
            disabled={isPrinting}
            className="bg-green-600 px-4 py-2 rounded-xl flex-row items-center"
            style={{ opacity: isPrinting ? 0.7 : 1 }}
            activeOpacity={0.7}
          >
            <Printer size={14} color="white" />
            <Text className="text-white font-extrabold ml-1.5 text-[13px]">
              {isPrinting ? 'PRINTING...' : 'PRINT'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handlePdf}
            disabled={isPdfGenerating}
            className="bg-green-600 px-4 py-2 rounded-xl flex-row items-center"
            style={{ opacity: isPdfGenerating ? 0.7 : 1 }}
            activeOpacity={0.7}
          >
            <FileText size={14} color="white" />
            <Text className="text-white font-extrabold ml-1.5 text-[13px]">
              {isPdfGenerating ? 'SAVING...' : 'PDF'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ✨ NEW: Quick Info Bar */}
      <View className="flex-row items-center justify-between px-4 py-2.5 bg-white border-b border-gray-100">
        <View className="flex-row items-center">
          <View
            className="w-6 h-6 rounded-full items-center justify-center"
            style={{ backgroundColor: '#E8F0FE' }}
          >
            <CheckCircle2 size={14} color={PRIMARY} />
          </View>
          <Text className="text-[#0F172A] text-[12px] font-bold ml-2">
            PAID
          </Text>
        </View>

        <View className="flex-row items-center">
          <Text className="text-[#64748B] text-[11px] mr-3">Zoom</Text>
          <TouchableOpacity
            onPress={handleZoomOut}
            className="w-7 h-7 rounded-lg bg-[#F1F5F9] items-center justify-center"
          >
            <ZoomOut size={14} color="#64748B" />
          </TouchableOpacity>
          <Text className="text-[#0F172A] text-[12px] font-bold mx-2 min-w-[34px] text-center">
            {Math.round(zoom * 100)}%
          </Text>
          <TouchableOpacity
            onPress={handleZoomIn}
            className="w-7 h-7 rounded-lg bg-[#F1F5F9] items-center justify-center"
          >
            <ZoomIn size={14} color="#64748B" />
          </TouchableOpacity>
        </View>
      </View>

      {/* PDF PREVIEW */}
      <Animated.View
        style={{
          flex: 1,
          opacity: fadeAnim,
        }}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ padding: 16, paddingBottom: 200 }}
          showsVerticalScrollIndicator={false}
        >
          {/* PDF Preview Container */}
          <Animated.View
            style={{
              transform: [{ scale: zoom }],
              backgroundColor: 'white',
              padding: 24,
              minHeight: 650,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: '#E2E8F0',
              shadowColor: '#000',
              shadowOpacity: 0.1,
              shadowRadius: 15,
              elevation: 8,
            }}
          >
            {/* ✨ NEW: Watermark */}
            {showWatermark && (
              <View
                style={{
                  position: 'absolute',
                  top: '40%',
                  left: 0,
                  right: 0,
                  alignItems: 'center',
                  opacity: 0.04,
                  transform: [{ rotate: '-30deg' }],
                }}
                pointerEvents="none"
              >
                <Text
                  style={{
                    fontSize: 60,
                    fontWeight: '900',
                    color: theme.primary,
                  }}
                >
                  PAID
                </Text>
              </View>
            )}

            <View className="flex-row justify-between mb-4">
              <Text className="text-[10px] text-gray-400 font-semibold tracking-wider">
                ORIGINAL FOR RECIPIENT
              </Text>
              {showLogo && (
                <View
                  className="w-12 h-12 border items-center justify-center rounded"
                  style={{
                    backgroundColor: theme.bg,
                    borderColor: theme.primary + '30',
                  }}
                >
                  <Text
                    className="text-[8px] font-bold"
                    style={{ color: theme.primary }}
                  >
                    LOGO
                  </Text>
                </View>
              )}
            </View>

            <Text
              className="font-black text-base"
              style={{ color: theme.primary }}
            >
              {saleData.business?.name || 'ADINA COLLECTION'}
            </Text>
            <Text className="text-[10px] text-gray-600 w-2/3 leading-4">
              {saleData.business?.address || 'OPP JAMA MASJID MOMINPURA NAGPUR, MAHARASHTRA, 440018'}{'\n'}
              📞 {saleData.business?.phone || '9518795065'}
            </Text>

            <View className="items-center my-3">
              <View
                style={{
                  borderBottomWidth: 1.5,
                  borderColor: theme.primary,
                  paddingHorizontal: 16,
                  paddingBottom: 2,
                }}
              >
                <Text
                  className="font-black text-xs tracking-widest"
                  style={{ color: theme.primary }}
                >
                  TAX INVOICE
                </Text>
              </View>
            </View>

            <View className="flex-row justify-between">
              <View>
                <Text className="text-[8px] font-black text-gray-700">
                  Bill To:
                </Text>
                <Text className="text-[9px] font-bold text-gray-900">
                  {saleData.customer?.name || saleData.customerName || 'Customer'}
                </Text>
                <Text className="text-[8px] text-gray-600">
                  📞 {saleData.customer?.phone || saleData.partyPhone || ''}
                </Text>
              </View>
              <View>
                <View className="flex-row justify-between w-32">
                  <Text className="text-[8px] font-bold">Bill No</Text>
                  <Text
                    className="text-[8px] font-bold"
                    style={{ color: theme.primary }}
                  >
                    #{saleData?.business?.invoiceNumber || 'N/A'}

                  </Text>
                </View>
                <View className="flex-row justify-between w-32 mt-0.5">
                  <Text className="text-[8px] font-bold">Created On</Text>
                  <Text className="text-[8px]">
                    {saleData.date ? new Date(saleData.date).toLocaleDateString('en-GB') : new Date().toLocaleDateString('en-GB')} {saleData.date ? new Date(saleData.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                  </Text>
                </View>
                <View className="flex-row justify-between w-32 mt-0.5">
                  <Text className="text-[8px] font-bold">Due Date</Text>
                  <Text className="text-[8px]">
                    {saleData.due_date ? new Date(saleData.due_date).toLocaleDateString('en-GB') : '-'}
                  </Text>
                </View>
              </View>
            </View>

            {/* Mini Table */}
            <View
              className="mt-4 border rounded-sm overflow-hidden"
              style={{ borderColor: theme.primary }}
            >
              <View
                className="flex-row"
                style={{ backgroundColor: theme.primary }}
              >
                <Text className="flex-1 text-white text-[8px] p-1.5 border-r border-white font-black">
                  # ITEM NAME
                </Text>
                <Text className="w-10 text-white text-[8px] p-1.5 border-r border-white font-black text-center">
                  QTY
                </Text>
                <Text className="w-10 text-white text-[8px] p-1.5 border-r border-white font-black text-center">
                  MRP
                </Text>
                <Text className="w-10 text-white text-[8px] p-1.5 border-r border-white font-black text-center">
                  RATE
                </Text>
                <Text className="w-12 text-white text-[8px] p-1.5 font-black text-right">
                  TOTAL
                </Text>
              </View>
              {/* API ITEMS */}
              {(saleData.items || saleData.cartEntries || []).map((entry: any, index: number) => {
                const itemName = entry.product?.name || entry.item?.name || 'Item';
                const quantity = entry.quantity || 0;
                const price = entry.price || entry.item?.sellPrice || 0;
                const total = price * quantity;
                return (
                  <View key={index} className="flex-row">
                    <Text
                      className="flex-1 text-[8px] p-1.5 border-r"
                      style={{ borderColor: theme.primary + '40' }}
                    >
                      {index + 1} {itemName}
                    </Text>
                    <Text
                      className="w-10 text-[8px] p-1.5 border-r text-center"
                      style={{ borderColor: theme.primary + '40' }}
                    >
                      {quantity}
                    </Text>
                    <Text
                      className="w-10 text-[8px] p-1.5 border-r text-center"
                      style={{ borderColor: theme.primary + '40' }}
                    >
                      {price}
                    </Text>
                    <Text
                      className="w-10 text-[8px] p-1.5 border-r text-center"
                      style={{ borderColor: theme.primary + '40' }}
                    >
                      {price}
                    </Text>
                    <Text className="w-12 text-[8px] p-1.5 text-right font-bold">
                      {total}
                    </Text>
                  </View>
                );
              })}

              <View
                className="flex-row border-t"
                style={{
                  backgroundColor: theme.bg,
                  borderColor: theme.primary,
                }}
              >
                <Text className="flex-1 text-[8px] p-1.5 font-black">
                  TOTAL
                </Text>
                <Text className="w-10 text-[8px] p-1.5 font-black text-center">
                  {(saleData.items || saleData.cartEntries || []).reduce((acc: number, curr: any) => acc + (curr.quantity || 0), 0)}
                </Text>
                <Text className="w-10"></Text>
                <Text className="w-10"></Text>
                <Text
                  className="w-12 text-[8px] p-1.5 text-right font-black"
                  style={{ color: theme.primary }}
                >
                  ₹{subtotalValue}
                </Text>
              </View>
            </View>

            <View className="flex-row justify-between mt-4">
              <View className="flex-1 pr-4">
                <Text className="text-[8px] font-black text-gray-700 uppercase tracking-tighter">
                  Bill Amount in words
                </Text>
                <Text className="text-[8px] text-gray-500 italic mt-0.5">
                  Amount generated dynamically
                </Text>
              </View>
              <View className="w-32">
                <View className="flex-row justify-between mb-1">
  <Text className="text-[8px] font-bold text-gray-600">
    Sub Total
  </Text>

  <Text className="text-[8px] font-bold">
    ₹{subtotalValue}
  </Text>
</View>

{discountValue > 0 && (
  <View className="flex-row justify-between mb-1">
    <Text className="text-[8px] font-bold text-red-500">
      Discount
    </Text>

    <Text className="text-[8px] font-bold text-red-500">
      -₹{discountValue}
    </Text>
  </View>
)}

<View
  className="flex-row justify-between p-1 rounded-sm mb-1"
  style={{ backgroundColor: theme.bg }}
>
  <Text
    className="text-[9px] font-black"
    style={{ color: theme.primary }}
  >
    Grand Total
  </Text>

  <Text
    className="text-[9px] font-black"
    style={{ color: theme.primary }}
  >
    ₹{grandTotal}
  </Text>
</View>
                <View className="flex-row justify-between mt-1">
                  <Text className="text-[8px] font-bold text-gray-600">Payment Mode</Text>
                  <Text className="text-[8px] font-bold uppercase">{paymentModeDisplay}</Text>
                </View>
                <View className="flex-row justify-between mt-0.5 pt-1 border-t border-gray-100">
                  <Text className="text-[8px] font-bold text-gray-600">Balance Due</Text>
                  <Text className="text-[8px] font-black text-red-600">₹0.00</Text>
                </View>
              </View>
            </View>

            {showSignature && (
              <View className="mt-8 flex-row justify-between px-4">
                <View className="items-center">
                  <View className="w-20 h-px bg-gray-300" />
                  <Text className="text-[8px] mt-1 text-gray-600">
                    Customer Signature
                  </Text>
                </View>
                <View className="items-center">
                  <View className="w-20 h-px bg-gray-300" />
                  <Text className="text-[8px] mt-1 text-gray-600">
                    Authorized Signatory
                  </Text>
                </View>
              </View>
            )}

            {showTerms && (
              <View className="mt-8 bg-gray-50 p-2 rounded">
                <Text className="text-[8px] font-black text-gray-700">
                  TERMS AND CONDITIONS
                </Text>
                <Text className="text-[7px] text-gray-500 leading-3 mt-1">
                  NOTE : EXCHANGE POLICY{'\n'}
                  1. No Return Policy Only Exchange{'\n'}
                  2. Exchange Within 4-5 Days After that Exchange Not Allowed
                  {'\n'}
                  3. Exchange time 12pm - 5pm.{'\n'}
                  4. Items without Price Tags is Not Accepted{'\n'}
                  5. No Guarantee on Fancy Item{'\n'}
                  <Text style={{ color: theme.primary, fontWeight: 'bold' }}>
                    Thank You! Visit Again! 🙏
                  </Text>
                </Text>
              </View>
            )}

            <Text className="text-center text-[7px] text-gray-400 mt-6 italic">
              This is computer generated invoice. Signature not required.
            </Text>
          </Animated.View>

          {/* ✨ NEW: Quick Stats Cards */}
          {/* <View className="flex-row gap-3 mt-5">
            <View className="flex-1 bg-white rounded-2xl p-4 border border-gray-200">
              <View className="flex-row items-center mb-1.5">
                <IndianRupee size={14} color={SUCCESS} />
                <Text className="text-[#64748B] text-[11px] font-bold ml-1">
                  AMOUNT
                </Text>
              </View>
              <Text className="text-[#0F172A] text-[18px] font-black">
                ₹650
              </Text>
            </View>
            <View className="flex-1 bg-white rounded-2xl p-4 border border-gray-200">
              <View className="flex-row items-center mb-1.5">
                <Hash size={14} color={theme.primary} />
                <Text className="text-[#64748B] text-[11px] font-bold ml-1">
                  ITEMS
                </Text>
              </View>
              <Text className="text-[#0F172A] text-[18px] font-black">1</Text>
            </View>
            <View className="flex-1 bg-white rounded-2xl p-4 border border-gray-200">
              <View className="flex-row items-center mb-1.5">
                <CheckCircle2 size={14} color={SUCCESS} />
                <Text className="text-[#64748B] text-[11px] font-bold ml-1">
                  STATUS
                </Text>
              </View>
              <Text className="text-[16px] font-black text-green-600">
                Paid
              </Text>
            </View>
          </View> */}
        </ScrollView>
      </Animated.View>

      {/* ✨ Animated Success Toast */}
      {showToast && (
        <Animated.View
          style={{
            position: 'absolute',
            top: '45%',
            left: 0,
            right: 0,
            alignItems: 'center',
            opacity: toastAnim,
            transform: [
              {
                translateY: toastAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0],
                }),
              },
              { scale: toastAnim },
            ],
          }}
          pointerEvents="none"
        >
          <View
            className="flex-row items-center bg-black/85 px-5 py-3.5 rounded-2xl"
            style={{
              shadowColor: '#000',
              shadowOpacity: 0.3,
              shadowRadius: 20,
              shadowOffset: { width: 0, height: 8 },
              elevation: 12,
            }}
          >
            <View className="w-8 h-8 rounded-full bg-green-500 items-center justify-center mr-2.5">
              <Check size={18} color="white" strokeWidth={3} />
            </View>
            <View>
              <Text className="text-white font-black text-[14px]">
                PDF Generated!
              </Text>
              <Text className="text-white/70 text-[11px]">
                Saved to Downloads
              </Text>
            </View>
          </View>
        </Animated.View>
      )}

      {/* ✨ Floating Action Buttons */}
      <Animated.View
        style={{
          position: 'absolute',
          bottom: 100,
          right: 16,
          flexDirection: 'row',
          gap: 10,
          opacity: fabAnim,
          transform: [
            {
              translateY: fabAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [30, 0],
              }),
            },
          ],
        }}
      >
        <TouchableOpacity
          onPress={handlePdf}
          className="w-12 h-12 bg-white rounded-2xl items-center justify-center border border-gray-100"
          activeOpacity={0.7}
          style={{
            shadowColor: '#000',
            shadowOpacity: 0.15,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 4 },
            elevation: 6,
          }}
        >
          <Download color={theme.primary} size={22} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setShowShareModal(true)}
          className="w-12 h-12 rounded-2xl items-center justify-center"
          activeOpacity={0.7}
          style={{
            backgroundColor: theme.primary,
            shadowColor: theme.primary,
            shadowOpacity: 0.4,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 4 },
            elevation: 8,
          }}
        >
          <Share2 color="white" size={22} />
        </TouchableOpacity>
      </Animated.View>

      {/* Bottom Button */}
      <View
        className="p-4 bg-white border-t border-gray-200"
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
            title="+ NEW SALE"
            variant="filled"
            onPress={() => navigation.navigate('NewSale')}
            style={{
              flex: 1,
              backgroundColor: PRIMARY,
              borderRadius: 16,
              paddingVertical: 14,
            }}
            textStyle={{ fontSize: 17, fontWeight: '800', letterSpacing: 1 }}
          />
        </View>
      </View>

      {/* ✨ SHARE MODAL */}
      <ShareModal
        visible={showShareModal}
        onClose={() => setShowShareModal(false)}
        onWhatsApp={() => handleShare('WhatsApp')}
        onEmail={() => handleShare('Email')}
        onSms={() => handleShare('SMS')}
        onMore={() => handleShare('native')}
        onCopyLink={handleCopyLink}
        onDownloadPdf={handlePdf}
      />

      {/* ✨ CUSTOMISE MODAL */}
      <Modal
        visible={showCustomiseModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCustomiseModal(false)}
      >
        <View className="flex-1 bg-black/50 justify-end">
          <Pressable
            className="absolute inset-0"
            onPress={() => setShowCustomiseModal(false)}
          />
          <View
            className="bg-white rounded-t-[32px] pt-3 pb-8"
            style={{ maxHeight: '85%' }}
          >
            <View className="items-center mb-2">
              <View className="w-12 h-1.5 rounded-full bg-[#CBD5E1]" />
            </View>
            <View className="flex-row items-center justify-between px-6 py-3 border-b border-[#E2E8F0]">
              <View className="flex-row items-center">
                <Sparkles size={20} color={theme.primary} />
                <Text className="text-[#0F172A] text-[20px] font-black ml-2">
                  Customise Invoice
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setShowCustomiseModal(false)}
                className="w-9 h-9 rounded-full bg-[#F1F5F9] items-center justify-center"
              >
                <X size={18} color="#64748B" />
              </TouchableOpacity>
            </View>

            <ScrollView
              className="px-6 pt-4"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 40, flexGrow: 1 }}
              nestedScrollEnabled={true}
            >
              <Text className="text-[#0F172A] font-extrabold text-[15px] mb-3">
                Theme Colour
              </Text>
              <View className="flex-row flex-wrap gap-3 mb-5">
                {THEME_COLORS.map((c) => {
                  const active = c.name === theme.name;
                  return (
                    <TouchableOpacity
                      key={c.name}
                      onPress={() => setThemeColor(c)}
                      className="items-center"
                      activeOpacity={0.7}
                    >
                      <View
                        className="w-14 h-14 rounded-2xl items-center justify-center"
                        style={{
                          backgroundColor: c.primary,
                          borderWidth: active ? 3 : 0,
                          borderColor: '#0F172A',
                        }}
                      >
                        {active && (
                          <Check size={22} color="white" strokeWidth={3} />
                        )}
                      </View>
                      <Text
                        className="text-[11px] font-bold mt-1"
                        style={{
                          color: active ? c.primary : '#64748B',
                        }}
                      >
                        {c.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <View className="h-px bg-[#E2E8F0] my-2" />

              <Text className="text-[#0F172A] font-extrabold text-[15px] mb-3 mt-2">
                Quick Settings
              </Text>

              {[
                {
                  label: 'Show Logo',
                  desc: 'Display business logo on invoice',
                  icon: Sparkles,
                  value: showLogo,
                  toggle: () => setShowLogo(!showLogo),
                },
                {
                  label: 'Show Signature',
                  desc: 'Add signature lines',
                  icon: Pencil,
                  value: showSignature,
                  toggle: () => setShowSignature(!showSignature),
                },
                {
                  label: 'Show Terms',
                  desc: 'Include terms & conditions',
                  icon: FileText,
                  value: showTerms,
                  toggle: () => setShowTerms(!showTerms),
                },
                {
                  label: 'Watermark',
                  desc: 'Add PAID watermark',
                  icon: Eye,
                  value: showWatermark,
                  toggle: () => setShowWatermark(!showWatermark),
                },
              ].map((s, i) => {
                const Icon = s.icon;
                const active = s.value;
                return (
                  <View
                    key={s.label}
                    className="flex-row items-center py-3 border-b border-[#F1F5F9]"
                  >
                    <View
                      className="w-10 h-10 rounded-xl items-center justify-center mr-3"
                      style={{ backgroundColor: active ? theme.bg : '#F1F5F9' }}
                    >
                      <Icon size={18} color={active ? theme.primary : '#94A3B8'} />
                    </View>
                    <View className="flex-1">
                      <Text className="text-[#0F172A] font-extrabold text-[14px]">
                        {s.label}
                      </Text>
                      <Text className="text-[#64748B] text-[11px]">
                        {s.desc}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={s.toggle}
                      activeOpacity={0.8}
                      className="w-12 h-6 rounded-full p-0.5 justify-center"
                      style={{
                        backgroundColor: active ? theme.primary : '#E2E8F0',
                        alignItems: active ? 'flex-end' : 'flex-start'
                      }}
                    >
                      <View className="w-5 h-5 rounded-full bg-white shadow-sm" />
                    </TouchableOpacity>
                  </View>
                );
              })}

              <PrimaryButton
                title="APPLY CHANGES"
                variant="filled"
                fullWidth
                onPress={() => {
                  setShowCustomiseModal(false);
                  showAlert('Saved', 'Invoice customisation applied', undefined, undefined, 'success');
                }}
                style={{
                  backgroundColor: theme.primary,
                  borderRadius: 16,
                  marginTop: 16,
                  paddingVertical: 14,
                }}
                textStyle={{
                  fontSize: 16,
                  fontWeight: '800',
                  letterSpacing: 1,
                }}
              />
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* ✨ FULL-SCREEN PREVIEW MODAL */}
      <Modal
        visible={showPreviewModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowPreviewModal(false)}
      >
        <View className="flex-1 bg-black/95">
          <SafeAreaView className="flex-1">
            <View className="flex-row items-center justify-between px-4 py-3">
              <TouchableOpacity
                onPress={() => setShowPreviewModal(false)}
                className="w-10 h-10 rounded-2xl bg-white/15 items-center justify-center"
              >
                <X size={22} color="white" />
              </TouchableOpacity>
              <Text className="text-white font-black text-[16px]">
                Invoice Preview
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setShowPreviewModal(false);
                  setShowShareModal(true);
                }}
                className="w-10 h-10 rounded-2xl bg-white/15 items-center justify-center"
              >
                <Share2 size={20} color="white" />
              </TouchableOpacity>
            </View>

            <ScrollView className="flex-1" contentContainerStyle={{ padding: 16 }}>
              <View className="bg-white p-6 rounded-lg">
                <Text
                  className="font-black text-base"
                  style={{ color: theme.primary }}
                >
                  {saleData.business?.name || 'ADINA COLLECTION'}
                </Text>
                <Text className="text-[10px] text-gray-600 mt-1">
                  {saleData.business?.address || ''}
                </Text>
                <View className="items-center my-3">
                  <Text
                    className="font-black text-xs tracking-widest"
                    style={{ color: theme.primary }}
                  >
                    TAX INVOICE #{billNo}
                  </Text>
                </View>
                <Text className="text-[12px] text-center text-gray-500 my-8">
                  {saleData.items?.length || 0} items purchased{'\n'}
                  Total: ₹{saleData.total || saleData.amount_received || 0}
                </Text>
              </View>
            </ScrollView>
          </SafeAreaView>
        </View>
      </Modal>

      {/* ✨ SHARE MODAL */}
      <ShareModal
        visible={showShareModal}
        onClose={() => setShowShareModal(false)}
        onWhatsApp={handleWhatsApp}
        onEmail={() => showAlert('Email', 'Invoice shared via Email', undefined, undefined, 'success')}
        onSms={() => showAlert('SMS', 'Invoice shared via SMS', undefined, undefined, 'success')}
        onMore={() => showAlert('Share', 'System share opened', undefined, undefined, 'info')}
        onCopyLink={() => showAlert('Copied', 'Invoice link copied to clipboard', undefined, undefined, 'success')}
        onDownloadPdf={handleDownloadPdf}
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