export const requestOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export const LAYOUT_OPTIONS = {
  FCOSE: {
    name: "fcose",
    idealEdgeLength: 200,
    randomize: true,
    nodeDimensionsIncludeLabels: true,
  },
  DAGRE: {
    name: "dagre",
    nodeSep: 200, // the separation between adjacent nodes in the same rank
    edgeSep: 200, // the separation between adjacent edges in the same rank
    rankSep: 200, // the separation between each rank in the layout
    fit: true,
    rankDir: "BT",
    animate: true,
    minLen: () => {
      return 2;
    },
    nodeDimensionsIncludeLabels: true,
  },
};

export const PANZOOM_OPTIONS = {
  // the default values of each option are outlined below:
  zoomFactor: 0.05, // zoom factor per zoom tick
  zoomDelay: 45, // how many ms between zoom ticks
  minZoom: 0.1, // min zoom level
  maxZoom: 10, // max zoom level
  fitPadding: 50, // padding when fitting
  panSpeed: 10, // how many ms in between pan ticks
  panDistance: 10, // max pan distance per tick
  panDragAreaSize: 75, // the length of the pan drag box in which the vector for panning is calculated (bigger = finer control of pan speed and direction)
  panMinPercentSpeed: 0.25, // the slowest speed we can pan by (as a percent of panSpeed)
  panInactiveArea: 8, // radius of inactive area in pan drag box
  panIndicatorMinOpacity: 0.5, // min opacity of pan indicator (the draggable nib); scales from this to 1.0
  zoomOnly: false, // a minimal version of the ui only with zooming (useful on systems with bad mousewheel resolution)
  fitSelector: undefined, // selector of elements to fit
  animateOnFit: function () {
    // whether to animate on fit
    return false;
  },
  fitAnimationDuration: 1000, // duration of animation on fit

  // icon class names
  sliderHandleIcon: "fa fa-minus",
  zoomInIcon: "fa fa-plus",
  zoomOutIcon: "fa fa-minus",
  resetIcon: "fa fa-expand",
};

export const DEFAULT_PARAMS = {
  model: "text-davinci-003",
  temperature: 0.3,
  max_tokens: 800,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
};

export const np =
  " \n(Ammar, knows, React); (Ammar, knows, C++); (Ammar, knows, Python); (Ammar, good_at, Programming)";
