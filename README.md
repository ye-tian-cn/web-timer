# web-timer

# 📱 Secure Full-Screen Kiosk Timer App

A high-contrast, minimalist countdown timer designed specifically for unattended deployment on a public table. This app runs as a 100% offline **Progressive Web App (PWA)**, avoiding native App Store subscription fees and 7-day developer signing token expirations.

## 🚀 Key Features

*   **Ultra-Large High-Contrast Interface:** Displays numbers using a massive, fixed-width typography layout (`18vw`) for optimal readability from across a large room or table.
*   **10-Second Smart Dimming (50% Contrast):** Automatically fades a dark overlay mask to 50% opacity after 10 seconds of user silence to protect OLED display panels and conserve battery, while keeping the countdown text visible.
*   **Bulletproof Timestamp Math Engine:** Uses physical device epoch millisecond calculations (`Date.now()`). Even if the underlying iOS operating system stutters or pauses background threads, the timer remains strictly accurate down to the millisecond upon screen wake.
*   **Looping Alarm with Safety Timeout:** Fires a continuous audio track upon timer expiration that loops non-stop until the flashing **CONFIRM** button is clicked. Includes an absolute safety ceiling that automatically cuts off the audio stream after exactly 30 seconds to prevent battery drain.
*   **100% Offline Capability:** Utilizes an integrated Service Worker (`sw.js`) and application manifesto to permanently cache code structures and audio assets (`radar.mp3`) directly into local phone storage. Works flawlessly in airplane mode.

---

## 🔌 Embedded Extensions & Libraries

To bypass mobile security sandboxes, the application incorporates two major front-end engine components:

### 1. NoSleep.js Library Integration (via Cloud CDN)
*   **Purpose:** Overrides aggressive mobile power-saving routines.
*   **Mechanism:** When the user taps **START**, the library generates an invisible, repeating single-pixel HTML5 micro-video element directly inside the phone's RAM. This tricks iOS Safari into thinking a video player is active, reliably keeping the background JavaScript engine running without locking up.

### 2. Screen Wake Lock & Page Visibility API Hybrid Core
*   **Purpose:** Ensures constant hardware illumination and sync restoration.
*   **Mechanism:** Programmatically requests a native device `wakeLock` anchor when a countdown begins. Combined with a `visibilitychange` event listener, the app automatically executes self-healing logic to re-assert wake permissions and snap the displayed time forward whenever the application window regains focus.

---

## 🔒 The Public Table Security Manual (Guided Access Setup)

Web applications cannot natively block system-level swipe gestures due to iOS sandbox boundaries. To prevent strangers from exiting the app or accessing your private phone data while it sits on a public table, use Apple's built-in kiosk system:

### ⚙️ 1. Initial One-Time Configuration
1. Open your iPhone’s **Settings** app.
2. Navigate to **Accessibility** ➔ **Guided Access** and turn the master switch **ON**.
3. Tap **Passcode Settings**:
    * Turn **ON Face ID** (allows you to unlock the device instantly with your face).
    * Tap **Set Guided Access Passcode** to create a backup 4 or 6-digit PIN.
4. Tap **Display Auto-Lock** and change the checkmark selection to **Never**.
    * *Crucial: This stops iOS from putting the phone to sleep, letting our app's custom 50% smart dim layer manage display power safely.*

### 📱 2. Locking the Timer on the Table
1. Open the **Timer Web App** from your iPhone Home Screen.
2. Configure your countdown duration using the numeric input blocks.
3. **Triple-click the physical Power Button** (on the right side of the iPhone).
4. Tap **Start** in the top-right corner of the Guided Access frame.
5. Tap your app's green **START** button to launch the countdown.
    * *The home bar, swipe gestures, notifications, volume buttons, and sleep triggers are now completely deactivated.*

### 🔓 3. Unlocking & Resetting
1. Tap the flashing red **CONFIRM** button on the interface to silence the alarm sound.
2. **Triple-click the physical Power Button** again.
3. Look at your phone to scan your **Face ID** (or input your backup PIN) to instantly exit the kiosk wrapper and restore standard smartphone functions.

---

## 📁 Repository File Directory Structure

To maintain a clean production branch, your repository folder tree should only contain these 4 essential deployment files:

```text
├── index.html       # Main UI Layout, CSS Styling, and JavaScript Logic Cores
├── manifest.json    # PWA Metadata, Icons Specification, and Standalone Launch Properties
├── sw.js            # Service Worker Background Cache Catcher Script Handling Offline Access
└── radar.mp3        # Your Custom Alert Sound File (Must match this exact file name format)
```
