var rootStyles = window.getComputedStyle(document.documentElement);

if (rootStyles.getPropertyValue('--book-cover-width-large') != null && rootStyles.getPropertyValue('--book-cover-width-large') !== '') {
  ready();
} else {
  document.getElementById('main-css').addEventListener('load', ready);
}

function ready() {
  var coverWidth = parseFloat(rootStyles.getPropertyValue('--book-cover-width-large'));
  var coverAspectRatio = parseFloat(rootStyles.getPropertyValue('--book-cover-aspect-ratio'));
  var coverHeight = coverWidth / coverAspectRatio;
  FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode
  );

  FilePond.setOptions({
    stylePanelAspectRatio: 1 / coverAspectRatio,
    imageResizeTargetWidth: coverWidth,
    imageResizeTargetHeight: coverHeight
  });

  FilePond.parse(document.body);
}