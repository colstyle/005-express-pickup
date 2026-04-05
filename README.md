<div align="center">

# 蹇€掑彇浠剁爜

**鎴戠粰[鍏ㄤ綋鍙栦欢浜篯鍋氫簡涓€涓猍蹇€掑彇浠剁爜绠＄悊鍣╙**

![100APP璁″垝](https://img.shields.io/badge/100%20APP%20璁″垝-005%20%2F%20100-ff6b6b?style=flat-square&logo=rocket)
![浣滆€匽(https://img.shields.io/badge/浣滆€?灏忕煶璋堜粈涔堣-blueviolet?style=flat-square)
![鐗堟湰](https://img.shields.io/badge/鐗堟湰-0.1.0-blue?style=flat-square)
![骞冲彴](https://img.shields.io/badge/骞冲彴-Web%20%7C%20Windows%20%7C%20Android-brightgreen?style=flat-square)
![鎶€鏈爤](https://img.shields.io/badge/鎶€鏈爤-Next.js%20%2B%20Tauri%202%20%2B%20Capacitor-blueviolet?style=flat-square)

> 馃殌 **100 APP 閲忎骇璁″垝** 绗?005 涓綔鍝?路 鎴戠粰[鐩爣浜虹兢]鍋氫簡涓€涓猍搴旂敤鎻忚堪] 路 浣滆€咃細[灏忕煶璋堜粈涔堣](#)

</div>

---

## 鉁?鍔熻兘鐗圭偣

- 鍔熻兘 1
- 鍔熻兘 2
- 鍔熻兘 3

---

## 馃殌 蹇€熷紑濮?
### 鐜瑕佹眰

| 宸ュ叿 | 鐗堟湰瑕佹眰 |
|------|---------|
| Node.js | 鈮?20 |
| Rust / Cargo | 鈮?1.80锛圵indows 妗岄潰绔繀椤伙級 |
| Android Studio | 浠绘剰锛圓ndroid 绔皟璇曪級 |

### 瀹夎涓庤繍琛?
```bash
git clone <浠撳簱鍦板潃>
cd express-pickup

npm install
npm run dev     # 娴忚鍣ㄩ瑙?鈫?http://localhost:3000
```

---

## 馃摝 涓夌鏋勫缓

### 馃寪 Web 鐗?```bash
npm run build
vercel --prod
```

### 馃枼锔?Windows 妗岄潰鐗堬紙Tauri锛?```bash
npm run tauri:dev      # 寮€鍙戞ā寮?npm run tauri:build    # 鎵撳寘 鈫?dist/windows/express-pickup.exe
```
> 棣栨缂栬瘧 Rust 绾﹂渶 5-10 鍒嗛挓锛屽悗缁閲忕紪璇戠绾у畬鎴愩€?
### 馃摫 Android 鐗堬紙Capacitor锛?```bash
npm run android:sync   # 鍚屾 Web 浠ｇ爜鍒?Android 椤圭洰
npm run android:open   # 鍦?Android Studio 涓墦寮€

# 鍛戒护琛屾瀯寤?APK
cd android && .\gradlew assembleDebug
# APK 鈫?android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 馃搨 椤圭洰缁撴瀯

```
express-pickup/
鈹溾攢鈹€ src/app/
鈹?  鈹溾攢鈹€ page.tsx            鈫?涓荤晫闈?鈹?  鈹溾攢鈹€ layout.tsx          鈫?HTML 妯℃澘
鈹?  鈹斺攢鈹€ globals.css         鈫?璁捐绯荤粺锛圖esign Tokens锛?鈹溾攢鈹€ src-tauri/              鈫?Tauri Windows 鍚庣锛圧ust锛?鈹?  鈹溾攢鈹€ src/main.rs
鈹?  鈹溾攢鈹€ tauri.conf.json     鈫?绐楀彛閰嶇疆
鈹?  鈹斺攢鈹€ capabilities/
鈹溾攢鈹€ android/                鈫?Capacitor Android 鍘熺敓椤圭洰
鈹溾攢鈹€ dist/                   鈫?鍙戝竷浜х墿
鈹?  鈹溾攢鈹€ windows/            鈫?.exe
鈹?  鈹斺攢鈹€ android/            鈫?.apk
鈹溾攢鈹€ out/                    鈫?Next.js 闈欐€佸鍑?鈹溾攢鈹€ capacitor.config.ts
鈹斺攢鈹€ package.json
```

---

## 馃摑 寮€鍙戞棩蹇?
| 鏃ユ湡 | 鍐呭 |
|------|------|
| 2026-04-04 | 椤圭洰鍒濆鍖栵紝瀹屾垚 Web / Windows / Android 涓夌閰嶇疆 |

---

## 馃搫 璁稿彲璇?
MIT License 路 [灏忕煶璋堜粈涔堣](#)
