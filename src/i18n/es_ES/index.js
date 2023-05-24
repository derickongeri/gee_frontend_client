// This is just an example,
// so you can safely delete all default props below

export default {
  failed: "La acción falló",
  success: "La acción fue exitosa",
  home: "Inicio",
  dashboard: "Panel de control",
  welcome: "¡Bienvenido al Panel de control de GreenPulse!",
  welcomeMsg:
    "¿Le gustaría realizar un recorrido guiado rápido y paso a paso de cómo navegar por el panel de control?",
  start_tour: "Iniciar recorrido",
  skip_tour: "Saltar recorrido",
  profile: "Perfil",
  logout: "Cerrar sesión",
  select_language: "Seleccionar idioma",
  settings: "Configuración",
  my_profile: "Mi perfil",
  burnt_area_info:
    "El área quemada se calcula a partir de imágenes previas y posteriores al fuego para crear mapas de evaluación de la gravedad del fuego. La clasificación de la gravedad del fuego sigue el sistema de clasificación propuesto por USGS para los rangos de gravedad del fuego.",
  burnt_area_summary:
    "El área total quemada fue de <b>{totalBurnedArea}Ha</b>, lo que corresponde a la suma de todas las categorías de gravedad del fuego, es decir, la gravedad del fuego muy alta <b>{veryHighSeverity}Ha</b>, la gravedad del fuego alta <b>{highSeverity}Ha</b>, la gravedad del fuego moderada <b>{moderateSeverity}Ha</b> y la gravedad del fuego baja <b>{lowSeverity}Ha</b>.",

  //login and sign up translations
  firstName: "Nombre",
  lastName: "Apellido",
  emailAddress: "Correo electrónico",
  password: "Contraseña",
  alreadyHaveAnAccount: "¿Ya tienes una cuenta?",
  dontHaveAnAccount: "¿No tienes una cuenta?",
  signup: "Registrarse",
  login: "Iniciar sesión",
  registerNewAccount: "Registrar nueva cuenta",

  //home
  tagline:
    "Desbloqueando conocimientos para la sostenibilidad a través de la observación de la Tierra",
  forest: "Earth Pulse Bosque",
  agro: "Earth Pulse Agricultura",
  water: "Earth Pulse Agua",

  //map buttons
  layers: "Capas",
  analysis: "Análisis",
  map: "Mapa",
  baseMap: "seleccionar mapa base",
  maplabels: "Etiquetas de mapa",
  maplabelsToggle: "Mostrar etiquetas de mapa",
  feedback: "Comentarios",
  Help: "Ayuda",
  share: "Compartir",
  helpmessage: "¿Qué te gustaría hacer?",
  documentation: "Visitar documentación",
  tour: "Realizar un recorrido",
  drawingTools: "herramientas de dibujo",
  opacity: "Opacidad",
  burnedArea: "Área quemada",
  fireDates: "El fuego ocurrió entre <b>{start}Ha</b> y <b>{end}Ha</b>",
  statistics: "Estadísticas",
  layerSettings: "Configuración de capas",
  burnedAreaStats: "Estadísticas de área quemada",
  switchtopie: "Cambiar a gráfico circular",
  switchtobar: "Cambiar a gráfico de barras",
  downloadImage: "Descargar imagen del gráfico",
  downloadCsv: "Descargar datos en CSV",

  //Burned Ara Analysis Card
  burnedAreaAnalysis: "Análisis de área quemada",
  prefireSelect: "Seleccionar período anterior al fuego",
  postfire: "Seleccionar período posterior al fuego",
  from: "desde",
  to: "hasta",
  submit: "Enviar",
  computing: "Calculando estadísticas de área quemada",
  loadingMsg: "Esto puede tardar un tiempo",
  wait: "Por favor espera",

  // Burned area map print layout
  note: "Nota",
  burnedAreaNotes:
    "Mapa de gravedad de quemaduras generado automáticamente usando la Relación de Quemadura Normalizada (NBR), utilizando longitudes de onda de infrarrojo cercano (NIR) e infrarrojo de onda corta (SWIR). La imagen posterior al incendio se resta de la imagen anterior al incendio para crear el delta NBR (dNBR), que se puede utilizar para evaluar la gravedad de la quemadura.",
  dataSource: "Fuente de datos",
  pre_fire_date: "Fecha previa al incendio",
  post_fire_date: "Fecha posterior al incendio",
  severity: "Gravedad del área quemada",
  disclaimer: "Descargo de responsabilidad",
  the_disclaimer:
    "El desarrollador de la aplicación a partir de la cual se generó este documento de mapa no es responsable de la corrección de las salidas o decisiones derivadas como consecuencia.",
  createdby: "creado por"
};
