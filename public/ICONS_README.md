# Uygulama İkonları

Bu klasörde bulunan `icon.svg` dosyası uygulamanın ana ikonu olarak kullanılmaktadır.

## PNG İkonları Oluşturma

PNG ikonlarını oluşturmak için aşağıdaki yöntemlerden birini kullanabilirsiniz:

### Yöntem 1: Online Araçlar
1. [Convertio](https://convertio.co/svg-png/) veya [CloudConvert](https://cloudconvert.com/svg-to-png) gibi online araçları kullanın
2. `icon.svg` dosyasını yükleyin
3. Aşağıdaki boyutlarda PNG dosyaları oluşturun:
   - 72x72
   - 96x96
   - 128x128
   - 144x144
   - 152x152
   - 192x192 (Önemli - PWA için)
   - 384x384
   - 512x512 (Önemli - PWA için)

### Yöntem 2: ImageMagick (Komut Satırı)
```bash
# ImageMagick yüklü ise:
convert -background none -resize 192x192 icon.svg icon-192x192.png
convert -background none -resize 512x512 icon.svg icon-512x512.png
```

### Yöntem 3: Inkscape (Ücretsiz Grafik Programı)
1. [Inkscape](https://inkscape.org/) indir ve yükle
2. `icon.svg` dosyasını Inkscape ile aç
3. File > Export PNG Image
4. Her bir boyut için ayrı ayrı export et

## Önemli Notlar

- **192x192** ve **512x512** boyutları PWA için zorunludur
- İkonlar şeffaf arka plana sahip olmalıdır
- Maskable icon için merkezde yeterli padding olmalıdır
- Build işlemi sırasında otomatik olarak optimize edilecektir

## Özel İkon Tasarımı

Daha profesyonel bir görünüm için:
- [Canva](https://www.canva.com/) ile özel tasarım
- [Figma](https://www.figma.com/) ile vektörel tasarım
- Bir grafik tasarımcı ile çalışın

Mevcut `icon.svg` dosyası placeholder olarak kullanılmaktadır. Kendi tasarımınızı oluşturduktan sonra bu dosyayı değiştirebilirsiniz.
