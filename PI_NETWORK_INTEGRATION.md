# Pi Network SDK Integration - Eservices App

## Overview
Eservices is a decentralized, all-in-one digital services platform exclusively powered by Pi Network. The app runs flawlessly in Pi Browser with proper Testnet/Sandbox mode integration.

## Pi SDK Configuration

### Script Loading (app/layout.tsx)
\`\`\`javascript
// Pi SDK loaded from official CDN
<Script src="https://sdk.minepi.com/pi-sdk.js" strategy="beforeInteractive" />

// Initialization with Sandbox Mode
window.Pi.init({ 
  version: "2.0", 
  sandbox: true  // CRITICAL: Testnet/Sandbox mode
});
\`\`\`

### Key Features
- **Sandbox Mode**: `sandbox: true` enables Testnet environment
- **Automatic Retry**: 25 retry attempts with exponential backoff
- **Error Handling**: Comprehensive logging and user-friendly error messages
- **Session Persistence**: User sessions stored in localStorage

## Authentication Flow

### 1. Pi SDK Detection
\`\`\`javascript
// Check if Pi SDK is available
if (typeof window.Pi !== 'undefined' && window.piSDKReady === true)
\`\`\`

### 2. User Authentication
\`\`\`javascript
// Request scopes: username, payments
const auth = await window.Pi.authenticate(['username', 'payments'], onIncompletePaymentFound);
\`\`\`

### 3. User Data Stored
\`\`\`javascript
{
  uid: "unique_user_id",
  username: "pioneer_name",
  accessToken: "access_token",
  scopes: ["username", "payments"]
}
\`\`\`

## Payment Integration

### Service Fee Structure
- **Standard Fee**: 0.25 Pi per service
- **Payment Flow**: Create → Approve → Complete
- **Blockchain Verified**: All transactions on Pi blockchain

### Payment Creation
\`\`\`javascript
const payment = await window.Pi.createPayment({
  amount: 0.25,
  memo: "Eservices: Document Request",
  metadata: { serviceType: "certificate", timestamp: "..." }
}, {
  onReadyForServerApproval: (paymentId) => {
    // Backend approves payment
    fetch('/api/pi/approve-payment', { method: 'POST', body: { paymentId } })
  },
  onReadyForServerCompletion: (paymentId, txid) => {
    // Backend completes payment
    fetch('/api/pi/complete-payment', { method: 'POST', body: { paymentId, txid } })
  },
  onCancel: (paymentId) => { /* Handle cancellation */ },
  onError: (error) => { /* Handle error */ }
});
\`\`\`

## App Features

### Core Modules
1. **User & Identity Services**
   - Pi Network exclusive authentication
   - Secure identity vault (CIN, passport, RC, ICE, tax ID)
   - Biometric support via Pi KYC

2. **E-Service Requests**
   - Certificates, attestations, documents
   - Status tracking with real-time updates
   - Document upload with OCR support

3. **Payments & Billing**
   - Pi cryptocurrency only (0.25 Pi per service)
   - Pay bills (water, electricity, telecom)
   - Payment history with blockchain receipts

4. **Document AI + PDF Center**
   - OCR scan documents
   - Auto-fill forms
   - E-signature support
   - Cloud storage

5. **Company Lookup**
   - RC (Registre de Commerce) search
   - ICE (Identifiant Commun de l'Entreprise) lookup
   - Dirigeant information
   - Tax status verification

6. **Real Estate / Syndic Module**
   - Request repairs
   - Pay syndic bills
   - Book common areas
   - View meeting minutes

7. **Multilingual AI Assistant**
   - English, French, Arabic (Darija) support
   - 80%+ deflection rate
   - Real-time service guidance
   - Payment assistance

## Browser Compatibility

### Required Environment
- **Pi Browser**: Mandatory for production use
- **Testnet Mode**: Enabled with `sandbox: true`
- **Internet Connection**: Required for Pi SDK loading

### Development Testing
- App displays SDK status and diagnostics
- Mock mode removed - real Pi SDK only
- Guest mode disabled - Pi authentication required

## Security & Compliance

### Global Standards
- **GDPR**: EU data protection compliance
- **PCI DSS Level 1**: Payment card industry standards
- **Multi-region**: Data residency options (EU, US, APAC)

### Pi Network Security
- Blockchain-verified transactions
- Pi KYC integration for enhanced trust
- JWT + Refresh token authentication
- Encrypted cloud storage
- Role-based access control

## Troubleshooting

### SDK Not Available
**Issue**: "Pi Network SDK is currently unavailable"

**Solutions**:
1. Open app in Pi Browser (not regular browser)
2. Check internet connection
3. Refresh the page
4. Check console logs for detailed errors
5. Verify CDN access to https://sdk.minepi.com/pi-sdk.js

### Authentication Failed
**Issue**: "Authentication cancelled" or "denied"

**Solutions**:
1. Approve permissions in Pi Browser
2. Ensure Pi account is active
3. Check if username and payments scopes are requested
4. Review Pi Browser app permissions

### Payment Issues
**Issue**: Payment not completing

**Solutions**:
1. Verify Pi balance (need at least 0.25 Pi)
2. Check backend API endpoints are responding
3. Review payment callbacks in browser console
4. Ensure blockchain transaction has completed

## API Endpoints

### Backend Routes
\`\`\`
POST /api/pi/approve-payment
POST /api/pi/complete-payment
GET  /api/pi/payment-info
\`\`\`

### Required Environment Variables
\`\`\`
PI_API_KEY=your_pi_api_key_here
NEXT_PUBLIC_APP_URL=your_app_url
\`\`\`

## Testing Checklist

- [ ] Pi SDK script loads from CDN
- [ ] window.Pi object is available
- [ ] Pi.init() succeeds with sandbox: true
- [ ] Sandbox mode indicator shows "ACTIVE"
- [ ] Login button appears and is clickable
- [ ] Authentication succeeds with username + payments scopes
- [ ] User data displays in header dropdown
- [ ] Payment flow completes successfully
- [ ] Blockchain transaction ID (txid) is received
- [ ] Services are accessible after authentication
- [ ] Multilingual support works (EN/FR/AR)
- [ ] Mobile responsive design functions properly

## Success Indicators

✓ **SDK Ready**: Green dot with "Pi Network Connected (Testnet)"
✓ **Authenticated**: Username displays in header with wallet icon
✓ **Scopes Granted**: "username" and "payments" badges visible
✓ **Payment Capable**: Can initiate 0.25 Pi transactions
✓ **Services Active**: All 8+ mini-services accessible

## Support Resources

- **Pi Network**: https://minepi.com
- **Pi Developer Docs**: https://developers.minepi.com
- **App Support**: View "Support" section in app
- **Community**: https://community.minepi.com

---

**Built with Next.js 15 + Pi Network SDK v2.0**
**Optimized for Pi Browser | Testnet/Sandbox Mode**
