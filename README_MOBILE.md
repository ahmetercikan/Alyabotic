# 📱 Alyabotic - Mobil Uygulama Rehberi

## ✅ Tamamlanan Adımlar

### 1. Capacitor Kurulumu
- ✅ @capacitor/core ve @capacitor/cli kuruldu
- ✅ @capacitor/android kuruldu
- ✅ @capacitor/ios kuruldu
- ✅ @capacitor/assets kuruldu

### 2. Yapılandırma
- ✅ capacitor.config.ts oluşturuldu
- App ID: `com.ahmetercikan.alyabotic`
- App Name: `Alyabotic`
- Web Directory: `dist`

### 3. Android Platformu
- ✅ Android platformu eklendi
- ✅ 87 adet icon ve splash screen oluşturuldu
- ✅ Tüm ekran boyutları için optimizasyon yapıldı

## 🚀 Sonraki Adımlar

### Android Studio ile Test

1. **Android Studio'yu Aç:**
   ```bash
   npx cap open android
   ```

2. **Emülatör veya Cihaz Seç:**
   - Üstteki cihaz dropdown'ından bir Android emülatör seç
   - VEYA gerçek bir Android telefonu USB ile bağla

3. **Uygulamayı Çalıştır:**
   - Yeşil ▶️ (Run) butonuna tıkla
   - Uygulama emülatör/telefonda açılır

### APK Oluşturma (Test İçin)

1. **Android Studio'da:**
   - Build → Build Bundle(s) / APK(s) → Build APK(s)
   - APK oluşturulunca bildirim gelir
   - "locate" linkine tıklayarak APK'yı bul
   - APK'yı telefona gönder ve yükle

### Signed APK (Play Store İçin)

1. **Keystore Oluştur:**
   ```bash
   keytool -genkey -v -keystore alyabotic-release.keystore -alias alyabotic -keyalg RSA -keysize 2048 -validity 10000
   ```

2. **Android Studio'da:**
   - Build → Generate Signed Bundle / APK
   - APK seç → Next
   - Keystore'u seç ve şifreleri gir
   - release variant seç
   - Finish

3. **Play Store'a Yükle:**
   - https://play.google.com/console açın
   - Yeni uygulama oluştur
   - APK/AAB dosyasını yükle
   - Uygulama bilgilerini doldur
   - Yayınla

## 📝 iOS için (Mac Gerekli)

İOS uygulaması oluşturmak için:

```bash
npx cap add ios
npx capacitor-assets generate --ios
npx cap sync
npx cap open ios
```

Xcode'da:
1. Üstten iPhone seçin
2. ▶️ Play butonuna basın
3. Uygulama çalışır

## 🎯 Önemli Notlar

### Build Etmeyi Unutmayın
Her değişiklikten sonra:
```bash
npm run build
npx cap sync
```

### Web Assets Güncelleme
Sadece web kodunu güncelliyorsanız:
```bash
npm run build
npx cap copy
```

### Native Kod Güncelleme
Android/iOS native kodunu güncelliyorsanız:
```bash
npx cap sync
```

## 🔧 Sorun Giderme

### "Module not found" Hatası
```bash
npm install
npm run build
npx cap sync
```

### Android Build Hatası
```bash
cd android
./gradlew clean
cd ..
npx cap sync
```

### Cache Temizleme
```bash
rm -rf node_modules
rm -rf android/.gradle
npm install
npm run build
npx cap sync
```

## 📚 Faydalı Komutlar

```bash
# Tüm platformları sync et
npx cap sync

# Sadece Android
npx cap sync android

# Android Studio'yu aç
npx cap open android

# iOS Xcode'u aç (Mac'te)
npx cap open ios

# Build ve sync
npm run build && npx cap sync

# Logları izle
npx cap run android --livereload
```

## 🎉 Sonuç

Android uygulamanız hazır! Artık:
- ✅ Android Studio'da test edebilirsiniz
- ✅ APK oluşturabilirsiniz
- ✅ Google Play Store'a yükleyebilirsiniz

## 📞 Yardım

Herhangi bir sorun yaşarsanız:
1. https://capacitorjs.com/docs
2. https://github.com/ionic-team/capacitor
