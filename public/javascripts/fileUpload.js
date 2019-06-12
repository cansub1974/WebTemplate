var rootStyles = window.getComputedStyle(document.documentElement);

if (rootStyles.getPropertyValue('--product-image-width-large') != null && rootStyles.getPropertyValue('--product-image-width-large') !== '') {
  ready();
} else {
  document.getElementById('style-css').addEventListener('load', ready);
}

function ready() {
  var imageWidth = parseFloat(rootStyles.getPropertyValue('--product-image-width-large'));
  var imageAspectRatio = parseFloat(rootStyles.getPropertyValue('--product-image-aspect-ratio'));
  var imageHeight = imageWidth / imageAspectRatio;
  FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode
  );

  FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode
  );

  FilePond.setOptions({
    stylePanelAspectRatio: 1 / imageAspectRatio,
    imageResizeTargetWidth: imageWidth,
    imageResizeTargetHeight: imageHeight
  });

  FilePond.parse(document.body);
}