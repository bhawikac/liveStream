var FancyNames = {
  Strongandfirm: "Strength",
  Dstressandrelax: "Body & Mind",
  "Body&Mind": "Body & Mind",
  Weightlossandhealthyheart: "Weight loss",
  "Strongandfirm(Conditioning)": "Strength",
  "Weightlossandhealthyheart(Cardio)": "Weight loss",
  Power: "Strength",
  Shape: "Weight loss",
  "Cycling(Cycling)": "Weight loss",
  cycling: "Weight loss",
  bike: "Weight loss",
  kids: "Kids",
  senior: "Senior"
};
 

export default function mapFancyName(str) {

  //Hard Coded Strings removed for class Mapping
  // let key = str.replace(/\s/g, "");

  // if (FancyNames.hasOwnProperty(key)) {
  //   return FancyNames[key];
  // } else if (key === "D'stressandrelax(Mind-body)") {
  //   return "Body & Mind";
  // } else {
  //   return "Weight loss";
  // }
  return str;
}
