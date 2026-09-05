# Complete Pi SDK Setup for Eservices

## Your Current Issue

✓ SDK Script Loaded: **YES**  
✗ SDK Initialized: **NO**  
✗ User Authenticated: **NO**

The script loads but `Pi.init()` is never called because your main layout files are locked.

---

## SOLUTION: 3 Code Blocks You Need

### 📦 BLOCK 1: The SDK Initializer Component (Already Created)

**File**: `components/pi-sdk-initializer.tsx` (✓ Already exists in your project)

This component loads the Pi SDK and calls `Pi.init()` automatically.

---

### 🔧 BLOCK 2: Add to AppWrapper (REQUIRED)

**YOU MUST UNLOCK THIS FILE FIRST:**
1. Right-click `components/app-wrapper.tsx` in the file tree
2. Click "Unlock"

**Then replace the entire file with this code:**

```tsx
"use client";

import type { ReactNode } from "react";
import { PiAuthProvider } from "@/components/pi-auth-provider";
import { PiSDKInitializer } from "@/components/pi-sdk-initializer";

export function AppWrapper({ children }: { children: ReactNode }) {
  return (
    <>
      <PiSDKInitializer />
      <PiAuthProvider>
        {children}
      </PiAuthProvider>
    </>
  );
}
```

**What changed:**
- Added `<PiSDKInitializer />` at the top
- Removed the auth blocking screen (users can browse before login)
- Fixed import path for PiAuthProvider

---

### 🚀 BLOCK 3: Alternative - Add to Main Page

**If you can't unlock AppWrapper**, add the initializer to your home page:

**File**: `app/page.tsx`

At the very top of your page component, add:

```tsx
import { PiSDKInitializer } from "@/components/pi-sdk-initializer"

export default function HomePage() {
  return (
    <>
      <PiSDKInitializer />
      {/* Rest of your existing page code */}
    </>
  )
}
```

---

## 🎯 The Initialization Script (What Happens Automatically)

When `PiSDKInitializer` loads, it runs this sequence:

```javascript
// 1. Load SDK from CDN
<script src="https://sdk.minepi.com/pi-sdk.js"></script>

// 2. Initialize immediately after load
window.Pi.init({ 
  version: "2.0", 
  sandbox: true  // Enables Testnet mode
})

// 3. Set global flags
window.piSDKReady = true
window.piSDKConfig = { version: "2.0", sandbox: true }

// 4. Dispatch ready event
window.dispatchEvent(new Event("piSDKReady"))
```

You don't need to add this manually - it's all inside `PiSDKInitializer`.

---

## ✅ Verification Steps

### Step 1: Check Browser Console

After adding the initializer and redeploying, open Pi Browser and press F12. You should see:

```
[v0] Pi SDK script loaded from CDN
[v0] Initializing Pi SDK with config: { version: '2.0', sandbox: true }
[v0] Pi SDK initialized successfully ✓
[v0] Mode: SANDBOX (Testnet)
[v0] window.Pi is available: true
[v0] window.piSDKReady: true
```

### Step 2: Check Diagnostics Page

Navigate to your diagnostics page. You should now see:

- ✓ SDK Script Loaded: **YES**
- ✓ SDK Initialized: **YES**
- ✓ Sandbox Mode: **YES**
- ⏳ User Authenticated: **NO** (until you click "Login with Pi")

### Step 3: Test Login

Click "Login with Pi Network" button. The flow should:

1. Open Pi Browser authentication dialog
2. Request permissions: username, payments
3. Return user data
4. Show ✓ User Authenticated: **YES**

---

## 🔍 Placement Instructions Summary

**Where to add `<PiSDKInitializer />`:**

### Option A: AppWrapper (Recommended)
```
components/app-wrapper.tsx (line 8, after opening <>)
```

### Option B: Layout (if you can unlock it)
```
app/layout.tsx (inside <body> tag)
```

### Option C: Main Page (fallback)
```
app/page.tsx (first component in return statement)
```

**Rule**: Add it once, at the highest level possible in your component tree.

---

## 🐛 Troubleshooting

### Problem: Still showing "SDK Initialized: NO"

**Check:**
1. Did you add `<PiSDKInitializer />` to your app?
2. Did you redeploy after making changes?
3. Is the console showing the initialization logs?
4. Hard refresh the page (Ctrl+Shift+R)

### Problem: "Cannot read property 'init' of undefined"

**Cause**: Script didn't load before init was called.

**Fix**: The `PiSDKInitializer` uses `onLoad` callback, which ensures `Pi.init()` only runs after the script loads. Make sure you're using the component exactly as provided.

### Problem: Authentication doesn't work

**Check:**
1. Are you in Pi Browser? (Check User Agent)
2. Is SDK initialized? (Check diagnostics)
3. Do you have internet connection?
4. Check console for specific error messages

---

## 📋 Complete Integration Checklist

- [ ] `components/pi-sdk-initializer.tsx` exists (✓ Already done)
- [ ] Unlock `components/app-wrapper.tsx` (Right-click → Unlock)
- [ ] Add `<PiSDKInitializer />` to AppWrapper
- [ ] Import: `import { PiSDKInitializer } from "@/components/pi-sdk-initializer"`
- [ ] Commit and push changes to GitLab
- [ ] Deploy to https://eservices5527.pinet.com
- [ ] Test in Pi Browser
- [ ] Check console logs (F12)
- [ ] Verify diagnostics show all YES
- [ ] Test "Login with Pi" button
- [ ] Test payment flow

---

## 🎁 Bonus: Quick Test Script

Run this in your Pi Browser console after deployment:

```javascript
// Test SDK availability
console.log("SDK Available:", !!window.Pi)
console.log("SDK Ready:", !!window.piSDKReady)
console.log("SDK Config:", window.piSDKConfig)

// Test authentication
if (window.Pi) {
  window.Pi.authenticate(['username', 'payments'], (payment) => {
    console.log("Incomplete payment:", payment)
  }).then(auth => {
    console.log("✓ Authentication successful:", auth)
  }).catch(err => {
    console.error("✗ Authentication failed:", err)
  })
}
```

---

## 🚀 Next Steps

1. **Unlock the file**: Right-click `components/app-wrapper.tsx` → Unlock
2. **Add the code**: Copy Block 2 above
3. **Deploy**: Push to GitLab and deploy to Pinet
4. **Test**: Open in Pi Browser and check console
5. **Verify**: All diagnostics should show YES

**Need help?** Check the console logs - they contain detailed information about each step of the initialization process.
