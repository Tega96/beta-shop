import FormData from 'form-data';
import Mailgun from 'mailgun.js';

const mailgun = new Mailgun(FormData);

const apiKey = process.env.MAILGUN_API_KEY;
const domain = process.env.MAILGUN_DOMAIN;
const host = process.env.MAILGUN_HOST || 'api.mailgun.net';
const fromEmail = process.env.EMAIL_FROM || 'Beta Phone Shop <orders@sandbox.mailgun.org>';

const isMailgunConfigured = Boolean(
  apiKey &&
  apiKey !== 'key-your-mailgun-api-key' &&
  domain &&
  domain !== 'sandbox123456789abcdef.mailgun.org'
);

const mg = isMailgunConfigured
  ? mailgun.client({
      username: 'api',
      key: apiKey!,
      url: host.includes('eu') ? 'https://api.eu.mailgun.net' : 'https://api.mailgun.net',
    })
  : null;

export interface SendOrderEmailParams {
  to: string;
  customerName: string;
  orderNumber: string;
  items: Array<{
    name: string;
    variantName: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    image?: string | null;
  }>;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

export async function sendOrderConfirmationEmail(params: SendOrderEmailParams) {
  const { to, customerName, orderNumber, items, subtotal, tax, shipping, total, shippingAddress } = params;

  const itemsHtml = items
    .map(
      (item) => `
      <tr style="border-bottom: 1px solid #e2e8f0;">
        <td style="padding: 12px 0;">
          <div style="font-weight: 600; color: #1e293b;">${item.name}</div>
          <div style="font-size: 13px; color: #64748b;">${item.variantName}</div>
        </td>
        <td style="padding: 12px 0; text-align: center; color: #475569;">x${item.quantity}</td>
        <td style="padding: 12px 0; text-align: right; font-weight: 600; color: #1e293b;">$${item.totalPrice.toFixed(2)}</td>
      </tr>
    `
    )
    .join('');

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Order Confirmation - ${orderNumber}</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #334155;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); padding: 32px 24px; text-align: center; color: #ffffff;">
          <h1 style="margin: 0; font-size: 26px; font-weight: 800; letter-spacing: -0.5px;">BETA PHONE SHOP</h1>
          <p style="margin: 8px 0 0 0; opacity: 0.9; font-size: 15px;">Thank you for your order!</p>
        </div>

        <!-- Body -->
        <div style="padding: 32px 24px;">
          <div style="margin-bottom: 24px;">
            <h2 style="font-size: 20px; font-weight: 700; color: #0f172a; margin: 0 0 8px 0;">Hi ${customerName},</h2>
            <p style="margin: 0; line-height: 1.6; color: #475569;">
              We have received your order and are currently getting it ready. You will receive another notification when your package ships!
            </p>
          </div>

          <!-- Order Info Box -->
          <div style="background-color: #f1f5f9; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
            <div style="display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 4px;">
              <span style="color: #64748b;">Order Number:</span>
              <strong style="color: #0284c7; font-size: 15px;">#${orderNumber}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 14px;">
              <span style="color: #64748b;">Date:</span>
              <strong style="color: #1e293b;">${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</strong>
            </div>
          </div>

          <!-- Items Table -->
          <h3 style="font-size: 16px; font-weight: 700; color: #0f172a; margin: 0 0 12px 0;">Order Summary</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <thead>
              <tr style="border-bottom: 2px solid #e2e8f0; font-size: 13px; text-transform: uppercase; color: #64748b;">
                <th style="padding: 8px 0; text-align: left;">Item</th>
                <th style="padding: 8px 0; text-align: center;">Qty</th>
                <th style="padding: 8px 0; text-align: right;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <!-- Financial Breakdown -->
          <div style="border-top: 2px solid #e2e8f0; padding-top: 16px; margin-bottom: 28px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 4px 0; color: #64748b;">Subtotal:</td>
                <td style="padding: 4px 0; text-align: right; color: #1e293b;">$${subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td style="padding: 4px 0; color: #64748b;">Estimated Tax:</td>
                <td style="padding: 4px 0; text-align: right; color: #1e293b;">$${tax.toFixed(2)}</td>
              </tr>
              <tr>
                <td style="padding: 4px 0; color: #64748b;">Shipping:</td>
                <td style="padding: 4px 0; text-align: right; color: #1e293b;">${shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</td>
              </tr>
              <tr style="border-top: 1px solid #cbd5e1;">
                <td style="padding: 12px 0; font-size: 18px; font-weight: 800; color: #0f172a;">Total:</td>
                <td style="padding: 12px 0; text-align: right; font-size: 18px; font-weight: 800; color: #0284c7;">$${total.toFixed(2)}</td>
              </tr>
            </table>
          </div>

          <!-- Shipping Address -->
          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
            <h4 style="margin: 0 0 8px 0; font-size: 14px; text-transform: uppercase; color: #64748b;">Shipping Address</h4>
            <p style="margin: 0; line-height: 1.5; color: #1e293b; font-size: 14px;">
              ${customerName}<br>
              ${shippingAddress.street}<br>
              ${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.postalCode}<br>
              ${shippingAddress.country}
            </p>
          </div>

          <!-- Footer note -->
          <p style="font-size: 13px; color: #94a3b8; text-align: center; margin: 32px 0 0 0;">
            If you have questions about your order, simply reply to this email or reach us at support@betashop.com.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  if (!isMailgunConfigured || !mg) {
    console.log('\n================ [MAILGUN DEV FALLBACK] ================');
    console.log(`To: ${to}`);
    console.log(`Subject: Your Beta Shop Order Confirmation (#${orderNumber})`);
    console.log(`Customer: ${customerName}`);
    console.log(`Order Number: ${orderNumber}`);
    console.log(`Total: $${total.toFixed(2)}`);
    console.log(`Notice: Mailgun API keys are not yet configured in .env.`);
    console.log(`To send live emails, provide MAILGUN_API_KEY and MAILGUN_DOMAIN.`);
    console.log('========================================================\n');
    return { success: true, messageId: `mock-mailgun-${Date.now()}` };
  }

  try {
    const response = await mg.messages.create(domain!, {
      from: fromEmail,
      to: [to],
      subject: `Your Beta Shop Order Confirmation (#${orderNumber})`,
      html: htmlContent,
      text: `Thank you for your order #${orderNumber}, ${customerName}! Total: $${total.toFixed(2)}. We will send shipping updates soon.`,
    });

    console.log(`[Mailgun] Email dispatched successfully to ${to}, id: ${response.id}`);
    return { success: true, messageId: response.id };
  } catch (error) {
    console.error('[Mailgun] Error dispatching email:', error);
    return { success: false, error };
  }
}
