import { v4 as uuidv4 } from 'uuid';

// Utility function to convert string to Uint8Array
const str2buf = (str: string): Uint8Array => {
  return new TextEncoder().encode(str);
};

// Utility function to convert ArrayBuffer to hex string
const buf2hex = (buffer: ArrayBuffer): string => {
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

const FB_API_VERSION = 'v18.0';
const FB_PIXEL_ID = '610212641825019';
const FB_ACCESS_TOKEN = import.meta.env.VITE_FB_ACCESS_TOKEN;

interface UserData {
  em?: string[];
  ph?: string[];
}

interface CustomData {
  currency: string;
  value: string;
}

interface EventData {
  event_name: string;
  event_time: number;
  action_source: string;
  user_data: UserData;
  custom_data: CustomData;
}

const hashValue = async (value: string): Promise<string> => {
  if (!value) return '';
  const normalized = value.trim().toLowerCase();
  const msgBuffer = str2buf(normalized);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  return buf2hex(hashBuffer);
};

export const sendPurchaseEvent = async (
  email: string,
  phone: string,
  totalAmount: number
) => {
  try {
    const eventData: EventData = {
      event_name: 'Purchase',
      event_time: Math.floor(Date.now() / 1000),
      action_source: 'website',
      user_data: {
        em: [email ? await hashValue(email) : ''],
        ph: [phone ? await hashValue(phone) : ''],
      },
      custom_data: {
        currency: 'NGN',
        value: totalAmount.toString(),
      },
    };

    const response = await fetch(
      `https://graph.facebook.com/${FB_API_VERSION}/${FB_PIXEL_ID}/events?access_token=${FB_ACCESS_TOKEN}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: [eventData] }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Facebook Conversion API response:', data);
    return data;
  } catch (error) {
    console.error('Error sending purchase event:', error);
    return null;
  }
};
