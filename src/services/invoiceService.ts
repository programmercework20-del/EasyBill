import axios from 'axios';

const API_BASE_URL = 'https://api.easybill.com'; // Replace with real API

export const invoiceService = {
  uploadInvoice: async (invoiceData: any, pdfUri: string) => {
    try {
      const formData = new FormData();
      formData.append('invoice_id', invoiceData.id);
      formData.append('pdf', {
        uri: pdfUri,
        name: `invoice_${invoiceData.id}.pdf`,
        type: 'application/pdf',
      } as any);

      const response = await axios.post(`${API_BASE_URL}/invoices/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error uploading invoice:', error);
      throw error;
    }
  },

  saveInvoiceDetails: async (invoiceData: any) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/invoices`, invoiceData);
      return response.data;
    } catch (error) {
      console.error('Error saving invoice:', error);
      throw error;
    }
  }
};
