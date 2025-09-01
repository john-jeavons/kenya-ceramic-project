// IntaSend API integration for Kenya Ceramic Project
// Documentation: https://developers.intasend.com/

interface IntaSendConfig {
  apiKey: string
  publishableKey: string
  baseUrl: string
}

interface PaymentRequest {
  amount: number
  currency: string
  email: string
  phone_number: string
  api_ref: string
  redirect_url?: string
  comment?: string
}

interface PaymentResponse {
  id: string
  url: string
  api_ref: string
  state: string
  provider: string
  charges: number
  net_amount: number
  value: number
  account: string
  api_key: string
  mode: string
  signature: string
  created_at: string
  updated_at: string
}

interface PaymentStatusResponse {
  id: string
  state: "PENDING" | "PROCESSING" | "FAILED" | "COMPLETE" | "RETRY"
  provider: string
  charges: number
  net_amount: number
  value: number
  account: string
  api_ref: string
  host: string
  failed_reason?: string
  failed_code?: string
  created_at: string
  updated_at: string
}

class IntaSendAPI {
  private config: IntaSendConfig

  constructor() {
    this.config = {
      apiKey: process.env.INTASEND_SECRET_KEY || "",
      publishableKey: process.env.INTASEND_PUBLISHABLE_KEY || "",
      baseUrl: process.env.INTASEND_BASE_URL || "https://sandbox.intasend.com/api/v1",
    }

    if (!this.config.apiKey) {
      throw new Error("INTASEND_SECRET_KEY environment variable is required")
    }
  }

  private getHeaders() {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.config.apiKey}`,
      Accept: "application/json",
    }
  }

  async initiatePayment(paymentData: PaymentRequest): Promise<PaymentResponse> {
    try {
      const response = await fetch(`${this.config.baseUrl}/payment/mpesa-stk-push/`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(paymentData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`IntaSend API Error: ${errorData.detail || response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error("IntaSend payment initiation error:", error)
      throw error
    }
  }

  async checkPaymentStatus(paymentId: string): Promise<PaymentStatusResponse> {
    try {
      const response = await fetch(`${this.config.baseUrl}/payment/status/`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify({
          invoice_id: paymentId,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`IntaSend Status Check Error: ${errorData.detail || response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error("IntaSend status check error:", error)
      throw error
    }
  }

  async initiateCardPayment(paymentData: PaymentRequest): Promise<PaymentResponse> {
    try {
      const response = await fetch(`${this.config.baseUrl}/payment/card-payment/`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(paymentData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`IntaSend Card Payment Error: ${errorData.detail || response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error("IntaSend card payment error:", error)
      throw error
    }
  }
}

export const intaSend = new IntaSendAPI()
export type { PaymentRequest, PaymentResponse, PaymentStatusResponse }
