//Parsel koordinatlarının girilerek poligon oluşturulması
var parsel = ee.Geometry.Polygon(
  [ee.Geometry.LinearRing([
    [ 28.084198521250084, 40.228866341022723 ],
    [ 28.085333124204613, 40.228958090340896 ],
    [ 28.08478353670462, 40.230306169431785 ],
    [ 28.084379294659172, 40.23022804624997 ],
    [ 28.084333420000082, 40.230174904318154 ],
    [ 28.084313889204626, 40.229913282499979 ],
    [ 28.084263018295538, 40.229693447499983 ],
    [ 28.084270285568266, 40.229651660681803 ],
    [ 28.084266651931902, 40.229618049545444 ],
    [ 28.084233949204631, 40.229595339318166 ],
    [ 28.08421, 40.22947 ],
    [ 28.084183078295538, 40.229267403636349 ],
    [ 28.08418216988645, 40.229015774318171 ],
    [ 28.084183078295538, 40.22894946045453 ],
    [ 28.084198521250084, 40.228866341022723 ]
    ])
  ]
);

//Parsel alanının görselleştirilmesi
Map.addLayer(parsel, {color: 'red'}, 'Parsel');
Map.centerObject(parsel, 15);

//Sentinel 2 görüntü serisinin çekilmesi
var filtered = ee.ImageCollection('COPERNICUS/S2_SR')
  .filter(ee.Filter.date('2020-01-01', '2020-12-31'))
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 30))
  .filter(ee.Filter.bounds(parsel));
  
//Bulut maskesinin görüntü üzerine uygulanması
  function maskS2clouds(image) {
  var qa = image.select('QA60');
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
             qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask)//.divide(10000)
      .select("B.*")
      .copyProperties(image, ["system:time_start"])}

var filtered = filtered.map(maskS2clouds);

//Tüm görüntüleri üzerinde NDVI hesabının yapılarak bant olarak görüntülere eklenmesi
function addNDVI(image) {
  var ndvi = image.normalizedDifference(['B8', 'B4']).rename('NDVI');
  return image.addBands(ndvi);
}
var withNdvi = filtered.map(addNDVI);

//NDVI zaman serisinin oluşturulması
var chartNdvi = ui.Chart.image.series({
  imageCollection: withNdvi.select('NDVI'),
  region: parsel,
  reducer: ee.Reducer.mean(),
  scale: 10
}).setOptions({
      lineWidth: 1,
      title: 'NDVI Time Series',
      interpolateNulls: true,
      vAxis: {title: 'NDVI Değerleri'},
      hAxis: {title: 'Zaman Aralığı', format: 'YYYY-MMM'},
      series: {
                0: {lineWidth: 3, color: '007f5f'}}
    });

//NDVI Zaman Serisi Grafiğinin Çıktı Olarak Verilmesi
print(chartNdvi);