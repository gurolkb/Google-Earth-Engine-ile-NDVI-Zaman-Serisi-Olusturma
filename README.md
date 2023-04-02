# Google Earth Engine ile NDVI Zaman Serisi Oluşturma
 
Buradaki kod örneği Google Earth Engine platformunda Sentinel-2 uydu görüntüleri kullanarak zaman serisi grafikleri oluşturmanızı sağlar.

Kodun kapsamı;
1. ROI (Region of Interest) oluşturma.
2. Zaman aralığına ait tüm Sentinel-2 uydu görüntülerinin koleksiyon halinde çekilmesi.
3. Görüntü koleksiyonundaki tüm görüntülere bulut maskesi uygulanması.
4. NDVI (Normalize Edilmiş Fark Bitki Endeksi) değerlerinin zaman aralığındaki tüm görüntüler için hesaplanması.
5. Hesaplanan NDVI değerlerinin grafik haline getirilmesi.

Örnek zaman serisi grafiği:
![ee-chart](https://user-images.githubusercontent.com/129385033/229348026-8374e084-0e36-4e5a-87ce-77a39c0b990b.png)
