/**
 * Cashfree Payment Gateway Integration Helpers
 * Using Cashfree PG REST API (Version: 2023-08-01)
 */

export interface CashfreeCustomerDetails {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface CashfreeOrderResponse {
  cf_order_id: string;
  order_id: string;
  order_amount: number;
  order_currency: string;
  order_status: string;
  payment_session_id: string;
  payments?: {
    url: string;
  };
  order_meta?: {
    payment_gateway_details?: any;
    return_url?: string;
    notify_url?: string;
  };
}

const getApiBaseUrl = (): string => {
  const env = process.env.CASHFREE_ENV || "sandbox";
  return env === "production"
    ? "https://api.cashfree.com/pg"
    : "https://sandbox.cashfree.com/pg";
};

const getHeaders = () => {
  const appId = process.env.CASHFREE_APP_ID || "";
  const secretKey = process.env.CASHFREE_SECRET_KEY || "";

  if (!appId || !secretKey) {
    console.warn("Cashfree App ID or Secret Key is missing in environment variables!");
  }

  return {
    "Content-Type": "application/json",
    "x-client-id": appId,
    "x-client-secret": secretKey,
    "x-api-version": "2023-08-01",
  };
};

/**
 * Create a new Payment Order on Cashfree
 */
export async function createCashfreeOrder(params: {
  orderId: string;
  amount: number;
  customer: CashfreeCustomerDetails;
  returnUrl: string;
  notifyUrl?: string;
}): Promise<CashfreeOrderResponse> {
  const url = `${getApiBaseUrl()}/orders`;
  
  const body = {
    order_id: params.orderId,
    order_amount: Number(params.amount.toFixed(2)),
    order_currency: "INR",
    customer_details: {
      customer_id: params.customer.id,
      customer_name: params.customer.name,
      customer_email: params.customer.email,
      customer_phone: params.customer.phone,
    },
    order_meta: {
      return_url: params.returnUrl,
      ...(params.notifyUrl ? { notify_url: params.notifyUrl } : {}),
    }
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Cashfree create order failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data as CashfreeOrderResponse;
  } catch (error) {
    console.error("Error creating Cashfree order:", error);
    throw error;
  }
}

/**
 * Retrieve Order Details from Cashfree
 */
export async function getCashfreeOrderDetails(orderId: string): Promise<any> {
  const url = `${getApiBaseUrl()}/orders/${orderId}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: getHeaders(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Cashfree fetch order failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Cashfree order:", error);
    throw error;
  }
}

/**
 * Retrieve Payments for a specific Order from Cashfree
 */
export async function getCashfreeOrderPayments(orderId: string): Promise<any[]> {
  const url = `${getApiBaseUrl()}/orders/${orderId}/payments`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: getHeaders(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Cashfree fetch order payments failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching Cashfree order payments:", error);
    throw error;
  }
}
