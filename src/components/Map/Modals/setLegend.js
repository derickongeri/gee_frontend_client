export default function createLegend() {
  const burnedArea = {
    palette: [
      "#7a8737",
      "#acbe4d",
      "#0ae042",
      "#fff70b",
      "#ffaf38",
      "#ff641b",
      "#a41fd6",
      "#ffffff",
    ],
    names: [
      "Regrowth, High",
      "Regrowth, Low",
      "Unburned",
      "Low Severity",
      "Moderate Severity",
      "High Severity",
      "Very High Severity",
      "NA",
    ]
  }

  const makeLegend = (layer) => {
    let LegendData = []
    for (let i = 0; i < layer.names.length; i++){
      LegendData.push({landcover: layer.names[i], color: layer.palette[i]})
    }
    return LegendData
  };

  const setLegendColors = function (rasterName) {
    let legendData = [];
    switch (rasterName) {
      case "burnedArea":
        legendData = makeLegend(burnedArea)
        break;
      case "suitabilityClassified":
        legendData = [
          {
            landcover: "suitable",
            color: "#ffffcc",
          },
          {
            landcover: "Moderately High",
            color: "#c2e699",
          },
          {
            landcover: "Very suitable",
            color: "#78c679",
          },
          {
            landcover: "Highly suitable",
            color: "#31a354",
          },
          {
            landcover: "Very High",
            color: "#006837",
          },
        ];
        break;
      case "landcover_Kenya":
        legendData = [
          {
            landcover: "Water",
            color: "#0046c8",
          },
          {
            landcover: "Bare land",
            color: "#fff5d7",
          },
          {
            landcover: "Artificial areas",
            color: "#d7191c",
          },
          {
            landcover: "Wetland",
            color: "#33e9f6",
          },
          {
            landcover: "Crop-land",
            color: "#f2fc83",
          },
          {
            landcover: "Grass-land",
            color: "#8ca000",
          },
          {
            landcover: "Forest",
            color: "#003c00",
          },
        ];
        break;
      default:
        legendData = [
          {
            landcover: "Maize",
            color: "#dba902",
          },
          {
            landcover: "Millet",
            color: "#96ef0f",
          },
          {
            landcover: "Beans",
            color: "#ddd0af",
          },
          {
            landcover: "Other",
            color: "#69e6aa",
          },
          {
            landcover: "Potatoes",
            color: "#cdcf53",
          },
          {
            landcover: "Rice",
            color: "#f0b727",
          },
          {
            landcover: "Wheat",
            color: "#df649c",
          },
          {
            landcover: "Sugarcane",
            color: "#70cd19",
          },
          {
            landcover: "Tea",
            color: "#a8a8a8",
          },
        ];
    }
    return legendData;
  };

  return {
    setLegendColors,
  };
}
