// srcdoc retains the parent origin for offline frame inspection and canvas access.
(() => {
  const frame = document.getElementById('solar-remade-frame');
  if (frame) frame.srcdoc = window.AtlasArcadeEmbeds.solar;
})();
