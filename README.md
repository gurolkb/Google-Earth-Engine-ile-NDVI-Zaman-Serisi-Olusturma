# Google Earth Engine ile NDVI Zaman Serisi Oluşturma
 
Buradaki kod örneği Google Earth Engine platformunda Sentinel-2 uydu görüntüleri kullanarak zaman serisi grafikleri oluşturmanızı sağlar.

Kodun kapsamı;
1. ROI (Region of Interest) oluşturma.
2. Zaman aralığına ait tüm Sentinel-2 uydu görüntülerinin koleksiyon halinde çekilmesi.
3. Görüntü koleksiyonundaki tüm görüntülere bulut maskesi uygulanması.
4. NDVI (Normalize Edilmiş Fark Bitki Endeksi) değerlerinin zaman aralığındaki tüm görüntüler için hesaplanması.
5. Hesaplanan NDVI değerlerinin grafik haline getirilmesi.

Örnek zaman serisi grafiği:
![ee-chart](https://user-images.githubusercontent.com/129385033/229347950-205bd525-8612-42f6-97dc-068c982a1c96.png)
