// This is just an example,
// so you can safely delete all default props below

export default {
  failed: "Action failed",
  success: "Action was successful",
  home: "Home",
  dashboard: "Dashboard",
  welcome: "Welcome to GreenPulse Dashboard!",
  welcomeMsg:
    "Would you like to take a quick, step by step guided tour of how to navigate through the dashboard?",
  start_tour: "Start tour",
  skip_tour: "Skip tour",
  profile: "Profile",
  logout: "Logout",
  select_language: "Select Language",
  settings: "Settings",
  my_profile: "My Profile",

  // burned area info
  burnt_area_info:
    "The burned area is calculated from pre and post-fire images to creates burn severity assessment maps. The classification of burn severity follows USGS proposed classification system for burn severity ranges.",
  burnt_area_summary:
    "The total burned area was <b>{totalBurnedArea}Ha</b>, which corresponds to the sum of all burn severity categories i.e. very high severity <b>{veryHighSeverity}Ha</b>, high severity <b>{highSeverity}Ha</b>, moderate severity <b>{moderateSeverity}Ha</b> and the low severity <b>{lowSeverity}Ha</b>.",

  //login and sign up translations
  firstName: "First Name",
  lastName: "Last Name",
  emailAddress: "Email Address",
  password: "Password",
  newPassword: "New Password",
  confirmPassword: "Confirm Password",
  alreadyHaveAnAccount: "Already have an account?",
  dontHaveAnAccount: "Don't have an account?",
  signup: "Signup",
  login: "Login",
  registerNewAccount: "Register New Account",
  resetPassword: "Forgot your password?",
  passwordReset: "Reset Password",
  backtologin: "Cancel password reset?",
  updatePassword: "Reset Password",

  //home
  tagline: "Unlocking Insights for sustainability through Earth Observation",
  forest: "Earth Pulse Forest",
  agro: "Earth Pulse Agro",
  water: "Earth Pulse Water",

  //map buttons
  layers: "Layers",
  analysis: "Analysis",
  map: "Map",
  baseMap: "select base map",
  maplabels: "Map Labels",
  maplabelsToggle: "Show Map Labels",
  feedback: "Feedback",
  Help: "help",
  share: "Share",
  helpmessage: "What would you like to do?",
  documentation: "Visit Documentation",
  tour: "Take a tour",
  drawingTools: "drawing tools",
  opacity: "Opacity",
  burnedArea: "Burned Area",
  fireDates: "fire occurred between <b>{start}Ha</b> and <b>{end}Ha</b>",
  statistics: "Statistics",
  layerSettings: "Layer Settings",
  burnedAreaStats: "Burned Area Statistics",
  switchtopie: "Switch to pie chart",
  switchtobar: "Switch to bar chart",
  downloadImage: "Download Chart Image",
  downloadCsv: "Download CSV data",

  //Burned Ara Analysis Card
  burnedAreaAnalysis: "Burned Area Analysis",
  prefireSelect: "Select Period Before the Fire",
  postfire: "Select period After the Fire",
  from: "from",
  to: "to",
  submit: "Submit",
  computing: "Computing Burned Area Statistics",
  loadingMsg: "This may take a while",
  wait: "Please wait",

  // Burned area map print layout
  note: "Note",
  burnedAreaNotes:
    "Burn severity map generated automatically using Normalized Burn Ratio (NBR),using near-infrared (NIR) and shortwave-infrared (SWIR) wavelengths. The post-fire image is subtracted from the pre-fire image to create the delta NBR (dNBR), which can be used to assess burn severity",
  dataSource: "Data-Source",
  pre_fire_date: "Pre-fire Date",
  post_fire_date: "Post-fire Date",
  severity: "Burned Area Severity",
  disclaimer: "Disclaimer",
  the_disclaimer:
    "The developer of the application from which this map document was generated is not liable for the correctness of outputs or decisions derived as a consequence.",
  createdby: "created by"
};
