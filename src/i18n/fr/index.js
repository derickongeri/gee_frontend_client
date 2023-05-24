// This is just an example,
// so you can safely delete all default props below

export default {
  failed: "Action failed",
  success: "Action was successful",
  home: "Accueil",
  dashboard: "tableau de bord",
  welcome: "Bienvenue sur le tableau de bord GreenPulse!",
  welcomeMsg:
    "Souhaitez-vous bénéficier d'une visite guidée rapide, étape par étape, de la navigation dans le tableau de bord ?",
  start_tour: "Démarrer le projet",
  skip_tour: "Sauter la visite",
  profile: "Profil",
  logout: "Déconnexion",
  select_language: "Choisir la langue",
  settings: "Paramètres",
  my_profile: "Mon profil",
  burnt_area_info:
    "La zone brûlée est calculée à partir d'images prises avant et après l'incendie afin de créer des cartes d'évaluation de la gravité des brûlures. La classification de la gravité des brûlures suit le système de classification proposé par l'USGS pour les plages de gravité des brûlures.",
  burnt_area_summary:
    "La superficie totale brûlée était de <b>{totalBurnedArea}Ha</b>, ce qui correspond à la somme de toutes les catégories de gravité des brûlures, c'est-à-dire très élevée <b>{veryHighSeverity}Ha</b>, élevée <b>{highSeverity}Ha</b>, modérée <b>{moderateSeverity}Ha</b> et faible <b>{lowSeverity}Ha</b>.",

  // Login and sign up page

  firstName: "Prénom",
  lastName: "Nom de famille",
  emailAddress: "Adresse e-mail",
  password: "Mot de passe",
  alreadyHaveAnAccount: "Vous avez déjà un compte?",
  dontHaveAnAccount: "Vous n'avez pas de compte?",
  signup: "S'inscrire",
  login: "Connexion",
  registerNewAccount: "Créer un nouveau compte",

  //home
  tagline:
    "Débloquer des informations pour la durabilité grâce à l'observation de la Terre",
  forest: "Earth Pulse Forêt",
  agro: "Earth Pulse Agriculture",
  water: "Earth Pulse Eau",
  //boutons de la carte
  layers: "Couches",
  analysis: "Analyse",
  map: "Carte",
  baseMap: "Sélectionnez la carte de base",
  maplabels: "Étiquettes de carte",
  maplabelsToggle: "Afficher les étiquettes de carte",
  feedback: "Retour d'information",
  Help: "aide",
  share: "Partager",
  helpmessage: "Que voulez-vous faire ?",
  documentation: "Visitez la documentation",
  tour: "Faire une visite",
  drawingTools: "Outils de dessin",
  opacity: "Opacité",
  burnedArea: "Zone brûlée",
  fireDates: "Feu survenu entre <b>{start}Ha</b> et <b>{end}Ha</b>",
  statistics: "Statistiques",
  layerSettings: "Paramètres de couche",
  burnedAreaStats: "Statistiques de la zone brûlée",
  switchtopie: "Passer au graphique circulaire",
  switchtobar: "Passer au graphique à barres",
  downloadImage: "Télécharger l'image du graphique",
  downloadCsv: "Télécharger les données CSV",

  //Card d'analyse de la zone brûlée
  burnedAreaAnalysis: "Analyse de la zone brûlée",
  prefireSelect: "Sélectionnez la période avant l'incendie",
  postfire: "Sélectionnez la période après l'incendie",
  from: "de",
  to: "à",
  submit: "Envoyer",
  computing: "Calcul des statistiques de la zone brûlée",
  loadingMsg: "Cela peut prendre un certain temps",
  wait: "Veuillez patienter",

  // Burned area map print layout
  note: "Remarque",
  burnedAreaNotes:
    "Carte de gravité de brûlure générée automatiquement à l'aide du rapport de brûlure normalisé (NBR), utilisant des longueurs d'onde proches infrarouges (NIR) et infrarouges à ondes courtes (SWIR). L'image post-incendie est soustraite de l'image pré-incendie pour créer le delta NBR (dNBR), qui peut être utilisé pour évaluer la gravité de la brûlure",
  dataSource: "Source de données",
  pre_fire_date: "Date avant l'incendie",
  post_fire_date: "Date après l'incendie",
  severity: "Gravité de la zone brûlée",
  disclaimer: "Avertissement",
  the_disclaimer:
    "Le développeur de l'application à partir de laquelle ce document de carte a été généré n'est pas responsable de la véracité des sorties ou des décisions dérivées en conséquence.",
  createdby: "créé par",
};
