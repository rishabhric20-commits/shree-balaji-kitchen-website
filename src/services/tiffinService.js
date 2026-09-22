import { WEEKLY_MENU, PRICING_PLANS, DELIVERY_AREAS, BUSINESS_INFO } from '../data/tiffinData.js';
import { saveFoodOrderToSupabase, saveInquiryToSupabase } from '../lib/supabase.js';

const menuByDayMap = new Map(
  WEEKLY_MENU.map((item) => [item.day.toLowerCase(), item])
);

export const tiffinService = {
  // Fetch weekly menu
  async getWeeklyMenu() {
    return Promise.resolve(WEEKLY_MENU);
  },

  // Get specific day menu in O(1) time
  getMenuForDay(day) {
    return menuByDayMap.get(day.toLowerCase()) || WEEKLY_MENU[0];
  },

  // Fetch subscription plans
  async getPricingPlans() {
    return Promise.resolve(PRICING_PLANS);
  },

  // Fetch delivery zones
  async getDeliveryAreas() {
    return Promise.resolve(DELIVERY_AREAS);
  },

  // Submit trial booking to Backend API (with real-time admin alert) and fallback
  async submitTrialOrder(payload) {
    const orderId = `SBT-${Math.floor(100000 + Math.random() * 900000)}`;

    const orderPayload = {
      orderId,
      customerName: payload.customerName,
      phone: payload.phone,
      deliveryArea: payload.deliveryArea,
      address: payload.address,
      mealType: payload.mealType,
      dietPreference: payload.dietPreference,
      daySelected: payload.selectedDayMenu?.day,
      menuDetails: payload.selectedDayMenu,
      paymentMethod: payload.paymentMethod || 'UPI / QR Code',
      amount: 80
    };

    let backendSuccess = false;

    // 1. Send to Backend API (triggers admin notification & real-time broadcast)
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          backendSuccess = true;
          console.log('✅ Order sent to backend & admin alerted:', orderId);
        }
      }
    } catch (e) {
      console.warn('Backend API order notice:', e);
    }

    // 2. Also back up to Supabase / LocalStorage
    saveFoodOrderToSupabase(orderPayload).catch(err => {
      console.warn('Supabase backup notice:', err);
    });

    // 3. Prepare Safe WhatsApp Confirmation
    let whatsappUrl = `https://wa.me/${BUSINESS_INFO.contact.whatsapp}?text=${encodeURIComponent(
      `Hi Shree Balaji Kitchen, I booked a 1-day trial meal (Order #${orderId}) for ${payload.customerName}, ${payload.deliveryArea}.`
    )}`;

    try {
      const waRes = await fetch('/api/whatsapp/order-dispatch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          customerName: payload.customerName,
          phone: payload.phone,
          mealType: payload.mealType,
          address: payload.address,
          deliveryArea: payload.deliveryArea,
          amount: 80
        })
      });
      if (waRes.ok) {
        const waData = await waRes.json();
        if (waData.whatsappUrl) {
          whatsappUrl = waData.whatsappUrl;
        }
      }
    } catch (e) {
      // fallback
    }

    return {
      success: true,
      orderId,
      backendNotified: backendSuccess,
      whatsappUrl
    };
  },

  // Submit contact inquiry
  async submitContactInquiry(payload) {
    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (e) {
      // ignore
    }

    saveInquiryToSupabase({
      name: payload.name,
      phone: payload.phone,
      message: payload.message,
      type: 'Contact Inquiry'
    }).catch(() => {});

    return { success: true };
  }
};
