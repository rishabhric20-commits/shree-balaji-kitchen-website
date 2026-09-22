import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://zkyfufsqtmhpseidtxfm.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_-cZ9M2E0x7w6XSv0hUaCsA_vEORiSvs';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Save food order to Supabase
 */
export async function saveFoodOrderToSupabase(orderData) {
  const payload = {
    order_id: orderData.orderId,
    customer_name: orderData.customerName,
    phone: orderData.phone,
    delivery_area: orderData.deliveryArea,
    address: orderData.address,
    meal_type: orderData.mealType,
    diet_preference: orderData.dietPreference,
    day_selected: orderData.daySelected || '',
    menu_details: orderData.menuDetails ? JSON.stringify(orderData.menuDetails) : null,
    status: 'Pending',
    created_at: new Date().toISOString()
  };

  try {
    const { data, error } = await supabase.from('food_orders').insert([payload]);
    if (error) {
      console.warn('Supabase insert notice:', error.message);
      saveOrderToLocalStorage(payload);
      return { success: false, error: error.message };
    }
    saveOrderToLocalStorage(payload);
    return { success: true, data };
  } catch (err) {
    console.warn('Supabase fallback error:', err);
    saveOrderToLocalStorage(payload);
    return { success: false, error: err.message || 'Supabase offline' };
  }
}

function saveOrderToLocalStorage(orderPayload) {
  try {
    const existing = JSON.parse(localStorage.getItem('balaji_food_orders') || '[]');
    existing.unshift(orderPayload);
    localStorage.setItem('balaji_food_orders', JSON.stringify(existing.slice(0, 50)));
  } catch (e) {
    // ignore
  }
}

/**
 * Save inquiry to Supabase
 */
export async function saveInquiryToSupabase(inquiryData) {
  const payload = {
    name: inquiryData.name,
    phone: inquiryData.phone,
    message: inquiryData.message || '',
    inquiry_type: inquiryData.type || 'General',
    details: inquiryData.details ? JSON.stringify(inquiryData.details) : null,
    created_at: new Date().toISOString()
  };

  try {
    const { data, error } = await supabase.from('inquiries').insert([payload]);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
