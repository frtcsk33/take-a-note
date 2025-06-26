# TAKE A NOTE Uygulaması

## Proje Hakkında
Bu Electron tabanlı masaüstü uygulaması ile kullanıcılar not ekleyebilir, düzenleyebilir, silebilir ve silinen notları geri alabilir. Silinen notlar filtrelenerek sadece silinenler gösterilebilir.Notlar kalıcı olarak **Electron Store** kullanılarak yerel diskte saklanır.

## Özellikler
- Yeni not ekleme
- Var olan notu düzenleme
- Notları silme (silinen notlar filtrelenebilir)
- Silinen notları geri alma
- Silinen notları göster/gizle seçeneği
- Modal pencere ile not düzenleme
- Electron stre ile kalıcı veri saklama

## Gereksinimler
- Node.js (v14 veya üzeri)
- npm (Node Package Manager)

## Kullanılan Üçüncü Taraf Kütüphaneler

- [`electron-store`](https://github.com/sindresorhus/electron-store): Not verilerini kalıcı olarak dosyada saklamak için kullanıldı.


## Kurulum Adımları

```bash
# 1. Depoyu Klonlayın
git clone https://github.com/frtcsk33/take-a-note.git

# 2. Proje klasörüne gidin
cd take-a-note

# 3. Bağımlılıkları yükleyin
npm install 

# 4. Uygulamayı başlatın
npm start