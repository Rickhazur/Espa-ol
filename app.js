/* ════════════════════════════════════════════════
   BOGOTÁ AVENTURA — app.js (Complete Rewrite)
════════════════════════════════════════════════ */

'use strict';

// ═══════════════════════════════════════════════
// 1. DATA
// ═══════════════════════════════════════════════

const SUPABASE_URL      = "https://wapnlkyyamwtleerpwxj.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_274gdLcayOJVo4hV3ZiJHQ_6QbRoh5p";
const ADMIN_EMAIL       = "teacher@bogota.co";

const ITINERARIO = [
  {
    dia: 1,
    titulo: "La Candelaria y Monserrate",
    frase: "«Del barrio colonial a las nubes: el corazón histórico de Bogotá»",
    descripcion: "Sumérjanse en las calles empedradas del barrio colonial donde nació Bogotá y asciendan al cerro tutelar de Monserrate para ver la ciudad desde las nubes. Un día completo entre historia, arte y naturaleza andina.",
    icono: "🏛️",
    color: "#e9c46a",
    actividades: [
      { nombre: "Monserrate", hora: "09:00 AM", icono: "🚠", descripcion: "Subida en teleférico o funicular hasta la cima. Disfruta de la vista panorámica de Bogotá, recorre la iglesia y los puestos de artesanías. A esta hora la niebla suele estar más disipada.", nota: "Lleva chaqueta/paraguas, el clima estará fresco con probabilidad de lluvia.", imagen: "images/monserrate.png" },
      { nombre: "Bajada al Centro y Chorro de Quevedo", hora: "10:30 AM", icono: "⛲", descripcion: "Descenso de la montaña hacia La Candelaria. Inicio en la Plazoleta Chorro de Quevedo, punto de partida clásico, y caminata por la Calle del Embudo con sus murales y fachadas coloridas.", nota: "Ideal para tomar muchas fotos del arte urbano y probar chicha (con moderación).", imagen: "images/chorro_de_quevedo.png" },
      { nombre: "Museo del Oro", hora: "11:30 AM", icono: "✨", descripcion: "Visita a la colección de orfebrería precolombina más grande del mundo. Un viaje impresionante a las culturas indígenas.", nota: "Tómate tu tiempo en el último piso (la sala de la ofrenda).", imagen: "" },
      { nombre: "Plaza de Bolívar y Catedral Primada", hora: "01:00 PM", icono: "🏛️", descripcion: "Recorrido por el corazón histórico y político de la ciudad: la plaza, el Capitolio, el Palacio de Justicia y la imponente catedral neoclásica.", nota: "Cuidado con tus pertenencias mientras tomas fotos en la plaza.", imagen: "" },
      { nombre: "Museo Botero", hora: "02:00 PM", icono: "🎨", descripcion: "Entrada gratuita. Una hora para apreciar las famosas obras de proporciones exageradas de Botero, además de piezas de Picasso, Monet y Cézanne.", nota: "Excelente lugar para descansar un poco mientras admiras el arte.", imagen: "" },
      { nombre: "Almuerzo en Casa Mamá Luz", hora: "03:15 PM", icono: "🍲", descripcion: "Cierre del día con comida típica. El ajiaco santafereño es el plato más recomendado del lugar.", nota: "A esta hora la fila suele ser más corta que al mediodía.", imagen: "images/ajiaco.png" }
    ],
    lecciones: [
      {
        titulo: "El Uso de 'Usted' entre Amigos",
        contenido: "En Bogotá, a diferencia de otras regiones hispanohablantes, es muy común usar 'usted' (el ustedeo) incluso entre familiares y amigos cercanos. Es una marca de respeto y cercanía a la vez.",
        quizPregunta: "¿Con quién usan 'usted' los bogotanos frecuentemente?",
        quizOpciones: ["Solo con desconocidos", "Con familiares y amigos cercanos", "Nunca lo usan", "Solo con el jefe"],
        quizCorrecta: 1
      },
      {
        titulo: "El Diminutivo '-ico' / '-ica'",
        contenido: "Los bogotanos suelen usar el diminutivo '-ico' o '-ica' en palabras que terminan en 't' antes de la vocal final (ej: gato -> gatico, rato -> ratico). Aporta un tono afectivo y suaviza las peticiones.",
        quizPregunta: "¿Cuál es el diminutivo bogotano correcto de 'un momento'?",
        quizOpciones: ["Un momentillo", "Un momentito", "Un momentico", "Un momentín"],
        quizCorrecta: 2
      },
      {
        titulo: "Expresión: 'Chévere' y 'Bacano'",
        contenido: "Ambas palabras significan 'genial' o 'excelente'. 'Chévere' es más universal, mientras que 'bacano' es muy popular en Colombia para describir algo muy bueno.",
        quizPregunta: "Si la vista desde Monserrate te parece increíble, puedes decir que es muy...",
        quizOpciones: ["Chévere", "Aburrida", "Mala", "Común"],
        quizCorrecta: 0
      },
      {
        titulo: "Gramática: Ser vs Estar en Descripciones",
        contenido: "En Colombia, a veces se usa 'estar' para descripciones que en España llevarían 'ser', por ejemplo 'Está muy rico' (la comida) o 'Estás muy bonita hoy' (resaltando un estado).",
        quizPregunta: "¿Cómo elogiarías la comida en Casa Mamá Luz?",
        quizOpciones: ["La comida es rica", "La comida está muy rica", "La comida parece rica", "La comida estuvo rica"],
        quizCorrecta: 1
      },
      {
        titulo: "Expresión: 'Dar papaya'",
        contenido: "Significa exponerse al peligro, dar la oportunidad de que te roben o se aprovechen de ti por descuido. 'No des papaya' es la regla número uno en la calle.",
        quizPregunta: "¿Qué significa 'no dar papaya'?",
        quizOpciones: ["No regalar fruta", "No exponerse al peligro por descuido", "No hablar con la gente", "No comer en la calle"],
        quizCorrecta: 1
      },
      {
        titulo: "Falsos Amigos: 'Embarazada' vs 'Embarrassed'",
        contenido: "Un error clásico: 'Embarazada' en español significa que una mujer espera un bebé (pregnant). Si tienes vergüenza, debes decir 'estoy avergonzada' o 'qué pena'.",
        quizPregunta: "Si te equivocas y sientes vergüenza, dices...",
        quizOpciones: ["Estoy embarazada", "Estoy avergonzada / Qué pena", "Tengo embarazoso", "Soy vergonzosa"],
        quizCorrecta: 1
      },
      {
        titulo: "Cortesía: 'A la orden'",
        contenido: "Al entrar a una tienda o comprar algo, siempre escucharás 'a la orden'. Significa 'a su servicio' o 'de nada' después de un 'gracias'.",
        quizPregunta: "Si dices 'gracias' al comprar una arepa, ¿qué te responderán probablemente?",
        quizOpciones: ["A la orden", "Por favor", "No importa", "Chao"],
        quizCorrecta: 0
      },
      {
        titulo: "Gramática: El condicional de cortesía",
        contenido: "Los bogotanos son muy formales. Usan el condicional ('me gustaría', 'podría') para suavizar peticiones. Nunca dicen 'dame' a un mesero.",
        quizPregunta: "¿Cuál es la forma más educada de pedir agua?",
        quizOpciones: ["Dame agua", "Quiero agua", "¿Me podría traer agua, por favor?", "Trae agua"],
        quizCorrecta: 2
      },
      {
        titulo: "Expresión: 'Tinto'",
        contenido: "En Colombia, pedir un 'tinto' no es pedir vino tinto, ¡es pedir un café negro! El café es el motor del país.",
        quizPregunta: "Si pides un 'tinto' en la mañana, te traerán...",
        quizOpciones: ["Vino tinto", "Café negro", "Té negro", "Jugo"],
        quizCorrecta: 1
      },
      {
        titulo: "Pronunciación: La 'S' clara bogotana",
        contenido: "A diferencia de la costa caribeña donde la 's' se aspira, en Bogotá se pronuncian todas las consonantes con mucha claridad, especialmente la 's' y la 'd'.",
        quizPregunta: "¿Cómo pronuncian 'las moscas' en Bogotá?",
        quizOpciones: ["Lah mohcah", "Las moscas (claro)", "La moca", "Las mosca"],
        quizCorrecta: 1
      }
    ]
  },
  {
    dia: 2,
    titulo: "Usaquén y el Norte Moderno",
    frase: "«De la villa colonial del norte al skyline del siglo XXI»",
    descripcion: "El barrio de Usaquén combina la arquitectura colonial de una antigua villa con la gastronomía gourmet y el comercio premium del norte de Bogotá. Es el Montmartre bogotano, con mercados de pulgas los domingos.",
    icono: "☕",
    color: "#e63946",
    actividades: [
      { nombre: "Brunch en el Parque Usaquén", hora: "09:00 AM", icono: "🥐", descripcion: "El parque central de Usaquén es el epicentro de los domingos bogotanos. Rodeado de cafés y restaurantes de especialidad, es el lugar perfecto para iniciar el día con un desayuno colombiano completo: arepas, huevos pericos, calentado y el inevitable tinto.", nota: "Pidan el 'changua' si quieren sentirse 100% bogotanas: es una sopa de leche con huevo y cilantro, el desayuno rolo por excelencia.", imagen: "images/usaquen_park.png" },
      { nombre: "Mercado de las Pulgas de Usaquén", hora: "10:00 AM", icono: "🧺", descripcion: "Cada domingo Usaquén se transforma. Las calles se llenan de artesanos, músicos y vendedores de antigüedades. Es la mejor oportunidad para llevarse recuerdos colombianos auténticos: ruana de lana, carriel antioqueño o una mochila wayuu.", nota: "Negociar el precio es parte de la cultura. No se sientan mal por regatear amablemente.", imagen: "images/mercado_usaquen.png" },
      { nombre: "Café de Especialidad en Usaquén", hora: "11:00 AM", icono: "☕", descripcion: "Usaquén alberga algunas de las mejores cafeterías de especialidad de Bogotá. Un café de origen único (single origin) preparado en pourover es la forma perfecta de cerrar la visita al barrio antes de continuar el día.", nota: "Combinen el café con un pandebono o un croissant de yuca. Un placer sencillo y auténtico.", imagen: "images/cafe_especialidad.png" }
    ],
    lecciones: [
      {
        titulo: "Tiempos Compuestos: Pretérito Perfecto",
        contenido: "En Colombia, el pretérito perfecto (he ido, has comido) se usa menos para acciones recientes que en España. Preferimos el pretérito indefinido (fui, comí). Sin embargo, se usa para experiencias de vida: 'Nunca he ido a Monserrate'.",
        quizPregunta: "¿Qué forma verbal prefieren los bogotanos para decir que acaban de terminar algo?",
        quizOpciones: ["He terminado", "Había terminado", "Terminé", "Terminara"],
        quizCorrecta: 2
      },
      {
        titulo: "La expresión 'Qué pena'",
        contenido: "En Colombia, 'qué pena' no significa 'qué lástima', sino 'qué vergüenza' o 'lo siento'. Se usa constantemente para disculparse por cosas pequeñas: 'Qué pena, ¿me deja pasar?'.",
        quizPregunta: "Si alguien te pisa por accidente en Bogotá, ¿qué dirá probablemente?",
        quizOpciones: ["Qué lástima", "Qué pena", "Qué dolor", "Qué tristeza"],
        quizCorrecta: 1
      },
      {
        titulo: "Expresión: 'Hacer una vaca'",
        contenido: "Cuando un grupo de amigos junta dinero para comprar algo compartido (comida, bebida o un regalo), se dice 'hacer una vaca'.",
        quizPregunta: "¿Qué significa 'vamos a hacer una vaca'?",
        quizOpciones: ["Ir al campo", "Comprar una vaca", "Juntar dinero entre varios", "Cocinar carne"],
        quizCorrecta: 2
      },
      {
        titulo: "Gramática: Subjuntivo de deseo",
        contenido: "En español, 'Ojalá' siempre va seguido de 'que' más el subjuntivo para expresar esperanza o deseo. El 'que' es obligatorio. Ejemplo correcto: 'Ojalá que haga sol hoy' o '¡Ojalá que lleguen a tiempo!'.",
        quizPregunta: "¿Cómo se dice correctamente 'I hope the weather is nice' usando 'Ojalá'?",
        quizOpciones: ["Ojalá hace buen clima", "Ojalá hará buen clima", "Ojalá que haga buen clima", "Ojalá haga buen clima"],
        quizCorrecta: 2
      },
      {
        titulo: "Pronunciación: Entonación Bogotana",
        contenido: "El acento bogotano (rolo) se caracteriza por tener una entonación algo 'cantadita' pero formal. Se alargan un poco las vocales al final de las frases.",
        quizPregunta: "¿Cómo se describe coloquialmente al nativo de Bogotá?",
        quizOpciones: ["Paisa", "Costeño", "Rolo o Cachaco", "Caleño"],
        quizCorrecta: 2
      },
      {
        titulo: "Falsos Amigos: 'Asistir' vs 'To assist'",
        contenido: "'Asistir' significa ir o estar presente en un evento (to attend). 'To assist' (ayudar) se traduce como 'ayudar'.",
        quizPregunta: "Si vas a un evento en la Zona Rosa, tú vas a...",
        quizOpciones: ["Atender el evento", "Ayudar el evento", "Asistir al evento", "Soportar el evento"],
        quizCorrecta: 2
      },
      {
        titulo: "Cultura Gastronómica: Arepa vs Empanada",
        contenido: "La arepa es de masa de maíz (asada o frita, suele ir con queso). La empanada es frita, rellena de carne o pollo con papa, y se come con ají.",
        quizPregunta: "¿Cuál suele ser frita y rellena de carne y papa?",
        quizOpciones: ["La arepa", "El pandebono", "La empanada", "El buñuelo"],
        quizCorrecta: 2
      },
      {
        titulo: "Gramática: Por vs Para",
        contenido: "'Para' indica destino o propósito (Voy para Usaquén). 'Por' indica causa, medio o a través de un lugar (Camino por el parque).",
        quizPregunta: "Completa: 'Caminamos ___ la Zona Rosa ___ ir al restaurante'.",
        quizOpciones: ["para / por", "por / para", "por / por", "para / para"],
        quizCorrecta: 1
      },
      {
        titulo: "Expresión: 'Ponerse las pilas'",
        contenido: "Significa prestar atención, concentrarse o empezar a actuar con energía ante una situación.",
        quizPregunta: "Si el guía dice '¡Pónganse las pilas!', quiere decir que deben...",
        quizOpciones: ["Comprar baterías", "Irse a dormir", "Prestar atención y activarse", "Caminar lento"],
        quizCorrecta: 2
      },
      {
        titulo: "Expresión: 'Estar frito'",
        contenido: "Significa estar en problemas, no tener salida o estar arruinado. Ejemplo: 'Si no reservamos mesa hoy, estamos fritos'.",
        quizPregunta: "Si pierdes tu vuelo, estás...",
        quizOpciones: ["Caliente", "Frito", "Mojado", "Cocinado"],
        quizCorrecta: 1
      }
    ]
  },
  {
    dia: 3,
    titulo: "Sabana y Pueblos Mágicos",
    frase: "«La sabana cundiboyacense: tierras de esmeraldas y leyendas muiscas»",
    descripcion: "Escapen de la capital y exploren la Sabana de Bogotá: un altiplano fértil rodeado de montañas con pueblos coloniales, haciendas históricas y la magia del pueblo de Zipaquirá, donde bajo la tierra vive la más increíble catedral del mundo.",
    icono: "🏔️",
    color: "#2ec4b6",
    actividades: [
      { nombre: "Catedral de Sal de Zipaquirá", hora: "09:00 AM", icono: "⛏️", descripcion: "A 48 km de Bogotá existe una catedral construida en el interior de una mina de sal a 180 metros de profundidad. La Catedral de Sal de Zipaquirá fue declarada Patrimonio de la Humanidad y es la obra de ingeniería más asombrosa de Colombia.", nota: "Contráten una guía en el lugar. La historia geológica y religiosa del lugar es fascinante.", imagen: "images/catedral_sal.png" },
      { nombre: "Centro Histórico de Zipaquirá", hora: "10:00 AM", icono: "🏘️", descripcion: "El pueblo de Zipaquirá conserva su trazado colonial perfectamente. La plaza central, la iglesia parroquial y los edificios republicanos crean un ambiente de otra época. Los helados de paila y las arepas de choclo son los snacks obligatorios.", nota: "Prueben la 'sobrebarriga' o el 'ajiaco' en cualquier restaurante de la plaza central.", imagen: "images/zipaquira_town.png" },
      { nombre: "Hacienda La Carolina", hora: "11:00 AM", icono: "🌿", descripcion: "Las haciendas de la Sabana de Bogotá son museos vivientes del período colonial y republicano. La Hacienda La Carolina conserva arquitectura del siglo XVIII, jardines con flores andinas y la historia de las élites bogotanas.", nota: "El paseo en caballo por los potreros de la hacienda es la actividad más relajante después de días de ciudad.", imagen: "images/hacienda_carolina.png" }
    ],
    lecciones: [
      {
        titulo: "Uso del Subjuntivo para Mandatos Suavizados",
        contenido: "Es muy común usar el subjuntivo con 'que' para dar órdenes o hacer sugerencias de manera más cortés: 'Que le vaya bien' o 'Que tenga un buen día'.",
        quizPregunta: "¿Cuál es la despedida más común y cortés que usa el subjuntivo?",
        quizOpciones: ["Tenga un buen día", "Que le vaya bien", "Váyase bien", "Que vas bien"],
        quizCorrecta: 1
      },
      {
        titulo: "El sufijo aumentativo y despectivo '-azo'",
        contenido: "En el habla coloquial, el sufijo '-azo' no solo indica tamaño, sino también un golpe (ej: 'un portazo') o intensidad (ej: 'un aguacero' se vuelve 'un aguacerazo').",
        quizPregunta: "¿Qué significa 'un trancazo' en el tráfico bogotano?",
        quizOpciones: ["Un choque fuerte", "Un atasco o embotellamiento gigante", "Un carro muy grande", "Una calle ancha"],
        quizCorrecta: 1
      },
      {
        titulo: "Falsos Amigos: 'Soportar' vs 'To support'",
        contenido: "'Soportar' significa tolerar o aguantar algo molesto. Para decir 'to support', debes usar 'apoyar'.",
        quizPregunta: "¿Cómo dices 'I support your decision'?",
        quizOpciones: ["Soporto tu decisión", "Apoyo tu decisión", "Ayudo tu decisión", "Mantengo tu decisión"],
        quizCorrecta: 1
      },
      {
        titulo: "Cultura: La puntualidad",
        contenido: "La 'hora colombiana' a veces implica un retraso social aceptado de 15 a 30 minutos en eventos informales, aunque los tours y vuelos sí son puntuales.",
        quizPregunta: "Si te invitan a una fiesta en casa a las 8 PM, lo normal es llegar...",
        quizOpciones: ["Exactamente a las 8:00 PM", "A las 7:30 PM", "Sobre las 8:30 PM", "Al día siguiente"],
        quizCorrecta: 2
      },
      {
        titulo: "Expresión: 'Echar gafa'",
        contenido: "Literalmente 'ponerse las gafas'. Significa prestar mucha atención visual, mirar con cuidado u observar.",
        quizPregunta: "Si te dicen 'Échale gafa a esa artesanía', te están pidiendo que...",
        quizOpciones: ["Te pongas lentes", "La mires con atención", "La compres", "La ignores"],
        quizCorrecta: 1
      },
      {
        titulo: "Gramática: Imperfecto vs Indefinido",
        contenido: "El imperfecto describe el 'escenario' (Hacía frío), mientras que el indefinido relata la 'acción' (Fuimos a Zipaquirá).",
        quizPregunta: "Completa: '(Hacer) frío cuando (llegar) a la catedral.'",
        quizOpciones: ["Hizo / llegábamos", "Hacía / llegamos", "Hizo / llegamos", "Hacía / llegábamos"],
        quizCorrecta: 1
      },
      {
        titulo: "Falsos Amigos: 'Actualmente' vs 'Actually'",
        contenido: "'Actualmente' significa 'en la actualidad' (currently). Para decir 'actually' en el sentido de 'en realidad', debes usar 'de hecho' o 'en realidad'.",
        quizPregunta: "¿Qué significa 'Actualmente vivo en Bogotá'?",
        quizOpciones: ["De hecho vivo en Bogotá", "Actualmente (currently) vivo en Bogotá", "Antes vivía en Bogotá", "Quiero vivir en Bogotá"],
        quizCorrecta: 1
      },
      {
        titulo: "Expresión: 'Tener huevo'",
        contenido: "Tener mucho descaro o atrevimiento. Si alguien te cobra el doble por un producto, ¡tiene huevo!",
        quizPregunta: "Si alguien es muy descarado o abusivo, se dice que...",
        quizOpciones: ["Tiene gallina", "Tiene huevo", "Es un pollo", "No tiene huevo"],
        quizCorrecta: 1
      },
      {
        titulo: "Gramática: El gerundio para acciones continuas",
        contenido: "Se usa 'Estar + gerundio' (Estamos caminando). Pero en Colombia también se usa 'Llevar + gerundio' (Llevamos caminando una hora).",
        quizPregunta: "¿Cómo dices 'We have been walking for an hour'?",
        quizOpciones: ["Estamos caminando una hora", "Llevamos caminando una hora", "Tenemos caminando una hora", "Hacemos caminando una hora"],
        quizCorrecta: 1
      },
      {
        titulo: "Vocabulario: 'Ruana'",
        contenido: "Prenda de lana tradicional de los Andes colombianos, tipo poncho. Es perfecta para el clima frío de la Sabana y Zipaquirá.",
        quizPregunta: "¿Para qué sirve una ruana?",
        quizOpciones: ["Para decorar la pared", "Para abrigarse del frío", "Para cocinar", "Para cargar cosas"],
        quizCorrecta: 1
      }
    ]
  },
  {
    dia: 4,
    titulo: "Chapinero y la Bohemia",
    frase: "«El barrio más diverso y creativo de Bogotá: cultura, arte y rolas auténticos»",
    descripcion: "Chapinero es el alma artística y diversa de Bogotá. Aquí conviven galerías de arte emergente, librerías independientes, restaurantes veganos, bares de jazz y la comunidad LGBTQ+ más visible de Colombia. El Bogotá auténtico, sin filtros.",
    icono: "🎭",
    color: "#6c63ff",
    actividades: [
      {
        nombre: "Recorrido de murales y arte urbano en Chapinero Alto",
        hora: "09:00 AM",
        icono: "🎨",
        descripcion: "A Tres Manos Studio, colectivo de muralistas con estudio propio en Chapinero, ha pintado buena parte del arte urbano del sector — se puede visitar su estudio y caminar viendo sus murales en las calles cercanas (Cl. 69, Cra. 10a).",
        nota: "El colectivo A Tres Manos Studio ha pintado buena parte del arte urbano de este sector; no dejen de ver las paredes de la Calle 69 y la Carrera 10a.",
        imagen: "images/grafiti_bogota.png"
      },
      {
        nombre: "Rose Pepper y tiendas vintage de Chapinero Alto",
        hora: "10:00 AM",
        icono: "🛍️",
        descripcion: "Boutiques de ropa retro y diseño local en el mismo sector, ideal para curiosear caminando.",
        nota: "Excelente zona para caminar sin prisa, descubrir prendas únicas y apoyar el diseño local bogotano.",
        imagen: ""
      },
      {
        nombre: "Experiencia del Chocolate en Chuculat",
        hora: "11:00 AM",
        icono: "🍫",
        descripcion: "Tour \"de la semilla a la barra\" con cata guiada de chocolates de distintas regiones de Colombia, terminando con chocolate caliente tradicional.",
        nota: "Una oportunidad deliciosa para conocer el origen del cacao colombiano y su proceso de producción artesanal.",
        imagen: ""
      }
    ],
    lecciones: [
      {
        titulo: "El voseo en Bogotá",
        contenido: "Aunque Bogotá es principalmente de 'usted' y 'tú', el 'vos' se escucha cada vez más entre los jóvenes por influencia antioqueña y caleña. 'Vos sos' o '¿Qué querés?' son comunes en Chapinero.",
        quizPregunta: "¿Cuál es la conjugación de 'tener' usando 'vos'?",
        quizOpciones: ["Tú tienes", "Vos tienes", "Vos tenés", "Vos tenéis"],
        quizCorrecta: 2
      },
      {
        titulo: "Expresión: 'Echar los perros'",
        contenido: "En el contexto de la rumba bogotana, 'echar los perros' no tiene nada que ver con animales. Significa coquetear o intentar conquistar a alguien de manera directa.",
        quizPregunta: "Si te dicen que alguien te está 'echando los perros', ¿qué está haciendo?",
        quizOpciones: ["Asustándote con sus mascotas", "Coqueteando contigo", "Insultándote", "Cobrándote una deuda"],
        quizCorrecta: 1
      },
      {
        titulo: "Cultura: El regateo en mercados",
        contenido: "En tiendas formales no se regatea, pero en mercados de pulgas o de calle, negociar el precio es parte de la cultura, siempre con una sonrisa.",
        quizPregunta: "¿Qué pregunta se usa para pedir una rebaja amistosa?",
        quizOpciones: ["¿Cuánto es?", "¿En cuánto me lo deja?", "¿Por qué tan caro?", "No pago eso"],
        quizCorrecta: 1
      },
      {
        titulo: "Gramática: Pronombres de objeto directo (lo/la)",
        contenido: "Reemplazan al objeto directo. 'Compré la ruana' -> 'La compré'. En Colombia rara vez hay leísmo (usar 'le' en vez de 'lo' para hombres), se mantiene 'lo'.",
        quizPregunta: "Si 'vi a Juan', tú dices...",
        quizOpciones: ["Le vi", "Lo vi", "La vi", "Vi a él"],
        quizCorrecta: 1
      },
      {
        titulo: "Falsos Amigos: 'Sensible' vs 'Sensible'",
        contenido: "En español, 'sensible' significa que siente emociones profundamente (sensitive). Para decir 'sensible' (razonable), usamos 'sensato'.",
        quizPregunta: "Si tu amiga llora fácilmente, ella es...",
        quizOpciones: ["Sensata", "Sensible", "Emocional", "Racional"],
        quizCorrecta: 1
      },
      {
        titulo: "Expresión: 'Hablar paja'",
        contenido: "Significa hablar cosas sin importancia, mentir o hablar de temas triviales para pasar el tiempo. Ejemplo: 'Estuvimos hablando paja toda la tarde'.",
        quizPregunta: "¿Qué haces si estás 'hablando paja' con amigos?",
        quizOpciones: ["Cosechas trigo", "Hablas de temas muy serios", "Charlas de temas sin importancia", "Discutes fuertemente"],
        quizCorrecta: 2
      },
      {
        titulo: "Pronunciación: La 'J' suave",
        contenido: "En Colombia, la letra 'J' o 'G' (antes de e/i) se pronuncia muy suave, como una 'h' en inglés, nunca fuerte y gutural como en España.",
        quizPregunta: "¿Cómo suena la palabra 'Gente' en Bogotá?",
        quizOpciones: ["Con G fuerte de gato", "Fuerte y gutural (España)", "Suave, como 'Hente' (h inglesa)", "No se pronuncia la primera letra"],
        quizCorrecta: 2
      },
      {
        titulo: "Gramática: Oraciones condicionales",
        contenido: "Se forman con 'Si' + Imperfecto de Subjuntivo + Condicional. Ejemplo: 'Si tuviera tiempo, iría al teatro'.",
        quizPregunta: "Completa: 'Si (hacer) sol, (nosotros/ir) al parque.'",
        quizOpciones: ["hiciera / iremos", "hiciera / iríamos", "hace / iríamos", "hacía / vamos"],
        quizCorrecta: 1
      }
    ]
  },
  {
    dia: 5,
    titulo: "Café de Cierre y Repaso",
    frase: "«Un café tranquilo para recordar las aventuras en las alturas y mirar hacia el Caribe»",
    descripcion: "Cerramos nuestro viaje con un café de despedida relajado, repasando lo vivido en Bogotá y compartiendo consejos para la siguiente parada: Santa Marta.",
    icono: "☕",
    color: "#f4a261",
    actividades: [
      {
        nombre: "Café de despedida",
        hora: "09:00 AM",
        icono: "☕",
        descripcion: "Punto de encuentro tranquilo, sin agenda apretada — Casa Café Cultor (un jardín con fuente de agua, dentro de una librería en Chapinero) o Plenitud Café (ambiente acogedor, buenos postres y café filtrado). Ideal para sentarse con calma, sin mirar el reloj.<br><br><strong>Repaso conversado del viaje:</strong><br>Mientras disfrutan el café, un momento para mirar hacia atrás y conectar todo lo vivido:<br>• Día 1 — La Calera, Monserrate y La Candelaria: naturaleza, altura y centro histórico<br>• Día 2 — Usaquén: elegancia, mercado de pulgas y ambiente colonial<br>• Día 3 — Zipaquirá: la Catedral de Sal<br>• Día 4 — Chapinero: arte urbano, chocolate, moda vintage y teatro",
        nota: "Tips para la siguiente etapa: Santa Marta — Cierre práctico antes de salir de Bogotá: clima cálido (25-32°C), qué empacar, cómo llegar (vuelo directo desde Bogotá, ~15 min del aeropuerto al centro histórico), efectivo para zonas como Playa Cristal, y la recomendación de escaparse a Minca si hay tiempo extra.",
        imagen: ""
      }
    ],
    lecciones: [
      {
        titulo: "La doble negación enfática",
        contenido: "En el habla popular, a veces se usa una doble negación para enfatizar o afirmar. Por ejemplo: 'No sé nada' es gramaticalmente correcto, pero coloquialmente podrían escuchar cosas como '¡Uy, no, eso sí que no!'.",
        quizPregunta: "¿Cuál es el propósito de usar múltiples 'no' en una exclamación colombiana?",
        quizOpciones: ["Confundir al oyente", "Enfatizar el rechazo o desacuerdo total", "Demostrar pobreza de vocabulario", "Cancelar la negación inicial"],
        quizCorrecta: 1
      },
      {
        titulo: "Despedidas Bogotanas: 'Chao' y 'Nos vemos'",
        contenido: "La palabra 'chao' (del italiano ciao) es la despedida por defecto en Colombia, más usada que 'adiós'. Suele acompañarse de 'nos pillamos' o 'nos vemos' en ambientes relajados.",
        quizPregunta: "Si un bogotano te dice 'Chao, nos pillamos', ¿qué quiso decir?",
        quizOpciones: ["Que te va a espiar", "Que se despidió y espera verte luego", "Que tienes que correr", "Que te descubrió haciendo algo malo"],
        quizCorrecta: 1
      },
      {
        titulo: "Expresión: 'Hacer el oso'",
        contenido: "Hacer el ridículo o pasar vergüenza en público. Si te caes en medio de la calle, 'haces el oso'.",
        quizPregunta: "Si cantas mal en un karaoke público y todos te miran, acabas de...",
        quizOpciones: ["Hacer el oso", "Hacer el león", "Cantar bien", "Dar papaya"],
        quizCorrecta: 0
      },
      {
        titulo: "Gramática: Futuro próximo vs Futuro simple",
        contenido: "El futuro próximo (Voy a comer) es mucho más usado en el habla diaria que el futuro simple (Comeré).",
        quizPregunta: "¿Cuál es la forma más natural de decir 'I will go tomorrow' en Bogotá?",
        quizOpciones: ["Iré mañana", "Voy a ir mañana", "Voy mañana", "Habré ido mañana"],
        quizCorrecta: 1
      },
      {
        titulo: "Falsos Amigos: 'Recordar' vs 'To record'",
        contenido: "'Recordar' significa tener memoria de algo (to remember). Si quieres decir 'to record' audio o video, usas 'grabar'.",
        quizPregunta: "Si quieres tomar un video con tu celular, tú vas a...",
        quizOpciones: ["Recordar un video", "Acordar un video", "Grabar un video", "Memorizar un video"],
        quizCorrecta: 2
      },
      {
        titulo: "Expresión: 'Caer gordo'",
        contenido: "Si una persona 'te cae gorda', no tiene nada que ver con su peso físico, significa que te desagrada su forma de ser (me cae mal).",
        quizPregunta: "Si dices 'Ese mesero me cae gordo', significa que...",
        quizOpciones: ["El mesero tiene sobrepeso", "El mesero te desagrada", "El mesero es muy amable", "El mesero te invitó a comer"],
        quizCorrecta: 1
      },
      {
        titulo: "Cultura: Calles y Carreras",
        contenido: "La dirección en Bogotá es una cuadrícula: Las 'Calles' van de este a oeste, y las 'Carreras' de norte a sur. La Carrera 7 y la Calle 100 son referentes clásicos.",
        quizPregunta: "¿Qué tipo de vía va de norte a sur en Bogotá?",
        quizOpciones: ["Las Avenidas", "Las Calles", "Las Carreras", "Las Diagonales"],
        quizCorrecta: 2
      },
      {
        titulo: "Gramática: Voz pasiva refleja",
        contenido: "Para generalizar, usamos 'Se + verbo en tercera persona'. Ejemplo: 'En Paloquemao se venden flores' (En vez de 'Las flores son vendidas').",
        quizPregunta: "¿Cómo dices 'Coffee is grown here'?",
        quizOpciones: ["El café es cultivado aquí", "Se cultiva café aquí", "Cultivan el café", "Café cultiva"],
        quizCorrecta: 1
      },
      {
        titulo: "Expresión: 'De una'",
        contenido: "Significa 'sí, inmediatamente' o 'con gusto'. Es la respuesta entusiasta perfecta a una invitación.",
        quizPregunta: "—'¿Vamos a cenar a Andrés Carne de Res?' —'¡_____!'",
        quizOpciones: ["De dos", "De una", "Quizás", "De pronto"],
        quizCorrecta: 1
      },
      {
        titulo: "Gramática: El sufijo '-ísimo'",
        contenido: "Es muy colombiano aumentar la intensidad con '-ísimo'. Algo no es caro, es 'carísimo'. Algo no es bueno, es 'buenísimo'.",
        quizPregunta: "¿Cuál es el superlativo de 'rico' (delicioso)?",
        quizOpciones: ["Ricote", "Riquísimo", "Ricoísimo", "Muy muy rico"],
        quizCorrecta: 1
      }
    ]
  }
];

const MODISMOS = [
  { palabra: "Parcero/a", alemán: "Kumpel/Kumpeline", definicion: "Amigo íntimo, compañero inseparable. Derivado de 'parcela', tierra compartida. Es el término de amistad más usado en Bogotá.", ejemplo: "«Ay, parcera, ¿vamos a tomar un tinto?»", socio: "Nivel informal muy alto. Úsenlo con personas de su edad con quienes tengan confianza. Usarlo con desconocidos suena a intento de crear confianza rápida.", categoria: "saludos", nivel: "Básico" },
  { palabra: "Rolo/a", alemán: "Bogotaner/in", definicion: "Persona nacida y criada en Bogotá (de 'rola', designación histórica de los habitantes capitalinos). También se dice 'cachaco' para el bogotano de clase alta.", ejemplo: "«Soy rola de toda la vida, nunca he vivido en otra ciudad.»", socio: "Identidad colectiva fuerte. Los rolos tienen fama de ser más formales y fríos que los costeños. Usarlo es un signo de pertenencia.", categoria: "diario", nivel: "Básico" },
  { palabra: "¿Qué más?", alemán: "Was gibt's Neues? / Wie geht's?", definicion: "Saludo coloquial que equivale a '¿cómo estás?' o '¿qué hay de nuevo?'. No espera respuesta literal sino una respuesta amable.", ejemplo: "«¡Parcera! ¿Qué más? ¡Cuánto tiempo!»", socio: "Saludo universal en Colombia. La respuesta correcta es '¡Bien, gracias, ¿y usted?!' o simplemente '¡Bien!'", categoria: "saludos", nivel: "Básico" },
  { palabra: "Tinto", alemán: "kleiner schwarzer Kaffee", definicion: "En Colombia 'tinto' es café negro pequeño, ¡NO vino tinto! Pedirlo es el ritual de hospitalidad más básico del país.", ejemplo: "«¿Le sirvo un tintico?»", socio: "Simboliza hospitalidad colombiana. Ofrecer un tinto es el equivalente al té en Gran Bretaña: un gesto de bienvenida.", categoria: "comida", nivel: "Básico" },
  { palabra: "Pola", alemán: "Bier", definicion: "Cerveza, especialmente una cerveza fría en lata o botella. La palabra viene de 'Polar', marca de cerveza venezolana.", ejemplo: "«Nos tomamos unas polas y luego seguimos.»", socio: "Propio de contextos informales y de ocio. Decirlo en un restaurante formal suena raro; pidan 'cerveza' en ese caso.", categoria: "fiesta", nivel: "Básico" },
  { palabra: "Dar papaya", alemán: "Eine Gelegenheit geben, bestohlen zu werden", definicion: "Dar la oportunidad de ser robado o estafado por descuido propio. «No dar papaya» es el mandamiento #1 de la seguridad en Bogotá.", ejemplo: "«No saques el celular en TransMilenio: no des papaya.»", socio: "Filosofía cultural de autoprotección. La responsabilidad del robo recae en quien 'da papaya', no solo en el ladrón. Refleja una actitud resignada ante la inseguridad.", categoria: "diario", nivel: "Básico" },
  { palabra: "Ajiaco", alemán: "Bogotaner Hühnersuppe (mit drei Kartoffelsorten)", definicion: "La sopa más representativa de Bogotá: tres tipos de papa (criolla, pastusa, sabanera), maíz, pollo y guascas (hierba aromática). Símbolo de identidad bogotana.", ejemplo: "«En este frío lo que necesito es un ajiaco caliente.»", socio: "Patrimonio culinario inmaterial. El ajiaco es al bogotano lo que la fondue es al suizo: identidad en un plato.", categoria: "comida", nivel: "Medio" },
  { palabra: "¡Uy, juepucha!", alemán: "Mist! / Verdammt!", definicion: "Exclamación de sorpresa o fastidio, versión suavizada de un insulto. Completamente familiar y sin connotación ofensiva en contexto informal.", ejemplo: "«¡Uy, juepucha! Se me olvidó el paraguas y está lloviendo.»", socio: "Eufemismo ampliamente aceptado. Puede usarse frente a niños y personas mayores sin problema.", categoria: "expresiones", nivel: "Medio" },
  { palabra: "Chévere", alemán: "cool / super / toll", definicion: "Excelente, genial, agradable. Es el adjetivo de aprobación más universal de Colombia y gran parte de Latinoamérica.", ejemplo: "«La vista desde Monserrate estuvo muy chévere.»", socio: "Compartido con Venezuela, Ecuador y otros países hispanohablantes. En Colombia tiene un sabor especialmente cálido.", categoria: "expresiones", nivel: "Básico" },
  { palabra: "Rumba / Rumbear", alemán: "Party / feiern gehen", definicion: "Fiesta, celebración. 'Rumbear' es el verbo: ir de fiesta. Bogotá tiene fama de ciudad de rumba, especialmente los jueves y viernes.", ejemplo: "«¿Vamos a la rumba de mañana en Chapinero?»", socio: "Central en la cultura social colombiana. Declinar una invitación a rumbear sin razón fuerte puede tomarse como desinterés social.", categoria: "fiesta", nivel: "Básico" },
  { palabra: "Mamar gallo", alemán: "Witzen / auf den Arm nehmen", definicion: "Bromear, tomar el pelo, no hablar en serio. Es una tradición cultural muy arraigada del humor bogotano.", ejemplo: "«¿En serio te dijo eso o te estaba mamando gallo?»", socio: "El humor es un valor social en Bogotá. Saber 'mamar gallo' y aguantar que te lo hagan es señal de integración cultural.", categoria: "expresiones", nivel: "Avanzado" },
  { palabra: "Camello", alemán: "Arbeit / Job", definicion: "Trabajo, empleo. 'Camellar' es trabajar. No tiene relación con el animal.", ejemplo: "«Estoy super cansada, tuve mucho camello hoy.»", socio: "Jerga laboral muy cotidiana en Bogotá. También se dice 'chambear' (más juvenil).", categoria: "diario", nivel: "Avanzado" },
  { palabra: "Gonorrea / Gonorrhöa (como insulto)", alemán: "Wichser / Idiot (als Schimpfwort)", definicion: "Insulto fuerte o, paradójicamente, término de cariño extremo entre amigos muy cercanos. El contexto lo es todo.", ejemplo: "«¡Gonorrea malparida, cuánto tiempo sin verte!» (entre amigos muy cercanos)", socio: "CUIDADO: Este término es altamente ambivalente. Úsalo SOLO si tienes certeza absoluta del contexto. Entre desconocidos es un insulto serio.", categoria: "expresiones", nivel: "Avanzado" },
  { palabra: "Estar mamado/a", alemán: "erschöpft sein / k.o. sein", definicion: "Estar agotado, muy cansado. También puede significar estar harto de algo.", ejemplo: "«Después de subir Monserrate quedé mamada del todo.»", socio: "Expresión de uso amplio. No confundir con el verbo 'mamar' en otros contextos.", categoria: "diario", nivel: "Medio" },
  { palabra: "Guaro", alemán: "Aguardiente (Schnaps aus Zuckerrohr und Anis)", definicion: "Aguardiente colombiano, el licor nacional por excelencia. Destilado de caña de azúcar con anís. El trago del pueblo.", ejemplo: "«¿Le echamos un guarito para el frío?»", socio: "El guaro es identidad nacional. Comprarlo en una tienda de barrio y tomarlo en vasos plásticos es la experiencia más auténtica.", categoria: "fiesta", nivel: "Medio" },
  { palabra: "Parce, ¿qué hubo?", alemán: "Hey Alter, was geht?", definicion: "Saludo informal ultra coloquial. Combinación de 'parcero' (amigo) y '¿qué hubo?' (¿qué ha pasado?). La forma más bogotana de saludar.", ejemplo: "«¡Parce, qué hubo! Hace siglos que no sé nada de vos.»", socio: "Nivel máximo de informalidad. El uso de 'vos' en vez de 'tú' es característico de Bogotá y Antioquia.", categoria: "saludos", nivel: "Medio" },
  { palabra: "Chicha", alemán: "fermentiertes Maisgetränk (traditionell)", definicion: "Bebida ancestral fermentada de maíz de origen muisca y andino. Beber chicha es conectar con la Colombia precolombina.", ejemplo: "«En el Chorro de Quevedo venden chicha artesanal.»", socio: "Patrimonio cultural inmaterial. La chicha fue prohibida en Colombia en 1948 por lobbying de las cervecerías. Su recuperación es un acto de resistencia cultural.", categoria: "comida", nivel: "Avanzado" },
  { palabra: "Llave / Llavecita", alemán: "enger Freund / bester Kumpel", definicion: "Amigo muy cercano, de total confianza. Literalmente 'llave', la persona que 'abre las puertas' para ti.", ejemplo: "«Ella es mi llave desde el colegio.»", socio: "Connotación de lealtad y confianza profunda. Llamar a alguien 'llave' es un halago sincero.", categoria: "saludos", nivel: "Avanzado" },
];

const PREGUNTAS_QUIZ = [
  {
    pregunta: "¿Qué significa pedir un 'tinto' en Bogotá?",
    opciones: ["Una copa de vino tinto", "Un café negro pequeño", "Un jugo de mora", "Una chicha artesanal"],
    correcta: 1,
    explicacion: "¡Ojo! En Colombia 'tinto' es café negro, no vino. Pedir 'vino tinto' es lo correcto si quieren vino. El tinto es el símbolo de hospitalidad bogotana."
  },
  {
    pregunta: "¿Qué significa 'no dar papaya' en Bogotá?",
    opciones: ["No compartir la fruta tropical", "No tener dinero para pagar", "No dar la oportunidad de ser robado por descuido", "No hablar con desconocidos"],
    correcta: 2,
    explicacion: "«No dar papaya» es el mandamiento #1 de la seguridad bogotana: no exhibir objetos de valor en zonas de riesgo ni actuar de forma descuidada."
  },
  {
    pregunta: "¿A qué altura sobre el nivel del mar está Bogotá?",
    opciones: ["800 metros", "1.500 metros", "2.600 metros", "3.500 metros"],
    correcta: 2,
    explicacion: "Bogotá está a 2.600 msnm, por eso hace frío y el oxígeno escasea. El clima cambia rápidamente: mañanas frías, mediodías templados, tardes lluviosas."
  },
  {
    pregunta: "¿Qué es el 'ajiaco'?",
    opciones: ["Un baile folclórico bogotano", "Una sopa con tres tipos de papa, pollo y guascas", "Un instrumento musical muisca", "Una bebida caliente de panela"],
    correcta: 1,
    explicacion: "El ajiaco bogotano es el plato más identitario de la capital: tres tipos de papa (criolla, pastusa y sabanera), maíz tierno, pollo desmenuzado, hierbas y guascas. Se sirve con crema de leche y alcaparras."
  },
  {
    pregunta: "¿Qué término usan los bogotanos para referirse a sí mismos?",
    opciones: ["Paisas", "Costeños", "Rolos o Cachacos", "Llaneros"],
    correcta: 2,
    explicacion: "Los bogotanos se llaman 'rolos' (en lenguaje informal y popular) o 'cachacos' (término más tradicional y con matiz de clase social). Los 'paisas' son de Antioquia y los 'costeños' del Caribe."
  },
  {
    pregunta: "¿Qué es la 'rumba' en el habla colombiana?",
    opciones: ["Un baile de salón formal", "Una fiesta o salida nocturna", "Una fruta tropical del Amazonas", "Un tipo de transporte público"],
    correcta: 1,
    explicacion: "Rumbear es irse de fiesta. Bogotá tiene una vida nocturna famosa, especialmente Chapinero y la Zona Rosa. Los bogotanos salen a rumbear especialmente jueves y viernes."
  },
  {
    pregunta: "¿De qué está hecha la Catedral de Sal de Zipaquirá?",
    opciones: ["Mármol blanco del río Magdalena", "Granito de los Andes", "Construida en el interior de una mina de sal", "Piedra volcánica andina"],
    correcta: 2,
    explicacion: "La Catedral de Sal es una obra maestra de la ingeniería: construida en el interior de una antigua mina de sal a 180 metros de profundidad. Patrimonio de la Humanidad a 48 km de Bogotá."
  },
  {
    pregunta: "¿Qué es el 'guaro' en Colombia?",
    opciones: ["Un pájaro amazónico", "Aguardiente colombiano, el licor nacional", "Un barrio de Bogotá", "Un tipo de chicha especial"],
    correcta: 1,
    explicacion: "El aguardiente (guaro) es el licor nacional colombiano: destilado de caña de azúcar con anís. El trago del pueblo, presente en fiestas y reuniones de todos los estratos."
  },
  {
    pregunta: "¿Qué significa llamar a alguien 'parcero/a'?",
    opciones: ["Jefe o superior", "Amigo íntimo de confianza", "Extranjero o turista", "Persona desconocida"],
    correcta: 1,
    explicacion: "Parcero/a es el término de amistad más usado en Colombia: amigo íntimo, compañero inseparable. Viene de 'parcela', tierra compartida. Es una muestra de confianza y afecto."
  },
  {
    pregunta: "¿Qué significa 'estar mamado/a' en Bogotá?",
    opciones: ["Estar borracho/a", "Estar amamantando", "Estar muy cansado/a o agotado/a", "Estar de buen humor"],
    correcta: 2,
    explicacion: "«Estoy mamado/a» significa estar completamente agotado, sin energía. Muy común después de un día explorando Bogotá con todo su tráfico y altitud."
  }
];

const SELLOS_INFO = [
  { emoji: "🏛️", color: "#e9c46a", label: "Candelaria", dia: 1 },
  { emoji: "☕", color: "#e63946", label: "Usaquén",    dia: 2 },
  { emoji: "⛏️", color: "#2ec4b6", label: "Sabana",     dia: 3 },
  { emoji: "🎭", color: "#6c63ff", label: "Chapinero",  dia: 4 },
  { emoji: "🌺", color: "#f4a261", label: "Despedida",  dia: 5 }
];

// ═══════════════════════════════════════════════
// 2. STATE
// ═══════════════════════════════════════════════

let supabaseClient = null;
let sesion = null;           // { tipo:'student'|'admin', nombre:'Karin'|'Eli'|null }
let diaActivo = 1;
let adminEstudiante = 'Karin';
let adminDia = 1;
let quizPreguntaActual = 0;
let quizPuntos = 0;
let quizRespondida = false;
let sellos = [];
let cacheDiarios = { Karin: {}, Eli: {} };
let cacheCargada = false;

// ═══════════════════════════════════════════════
// 3. SUPABASE / CACHE
// ═══════════════════════════════════════════════

async function dbCargar(tabla, estudiante) {
  if (!supabaseClient) return [];
  try {
    const { data, error } = await supabaseClient.from(tabla).select('dia,contenido').eq('estudiante', estudiante);
    if (error) throw error;
    return data || [];
  } catch (e) { console.warn('DB error:', e); return []; }
}

async function precargarCache() {
  if (cacheCargada) return;
  try {
    const tablas = ['diarios', 'correcciones'];
    const alumnos = ['Karin', 'Eli'];
    for (const a of alumnos) {
      for (const t of tablas) {
        const rows = await dbCargar(t, a);
        rows.forEach(r => {
          cacheDiarios[a][`${t}_${r.dia}`] = r.contenido;
        });
      }
    }
  } catch (e) { console.warn('Precarga error:', e); }
  cacheCargada = true;
}

async function dbGuardar(tabla, estudiante, dia, contenido) {
  cacheDiarios[estudiante][`${tabla}_${dia}`] = contenido;
  if (!supabaseClient) return;
  try {
    await supabaseClient.from(tabla).upsert(
      { estudiante, dia, contenido, updated_at: new Date().toISOString() },
      { onConflict: 'estudiante,dia' }
    );
  } catch (e) { console.warn('Save error:', e); }
}

function dbGet(tabla, estudiante, dia) {
  return cacheDiarios[estudiante]?.[`${tabla}_${dia}`] || '';
}

// ═══════════════════════════════════════════════
// 4. UTILS
// ═══════════════════════════════════════════════

function qs(sel, el = document) { return el.querySelector(sel); }
function qsa(sel, el = document) { return [...el.querySelectorAll(sel)]; }

function disparar(nombre, detalle = {}) {
  document.dispatchEvent(new CustomEvent(nombre, { detail: detalle }));
}

// ═══════════════════════════════════════════════
// 5. NAVEGACIÓN
// ═══════════════════════════════════════════════

function navegarA(seccion) {
  qsa('.page').forEach(p => p.classList.remove('active'));
  qsa('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.section === seccion));
  const target = qs(`#${seccion}`);
  if (target) { target.classList.add('active'); }
  window.scrollTo({ top: qs('#main-nav').offsetTop - 10, behavior: 'smooth' });
}

// ═══════════════════════════════════════════════
// 6. THEME (Soleado / Lluvioso)
// ═══════════════════════════════════════════════

let esLluvioso = false;

function inicializarTema() {
  const btn = qs('#theme-toggle');
  const icon = qs('#theme-icon');
  const label = qs('#theme-label');
  const rainCont = qs('#rain-container');

  function crearGotas() {
    rainCont.innerHTML = '';
    for (let i = 0; i < 60; i++) {
      const drop = document.createElement('div');
      drop.className = 'rain-drop';
      drop.style.cssText = `
        left: ${Math.random() * 100}%;
        animation-duration: ${0.6 + Math.random() * 0.8}s;
        animation-delay: ${-Math.random() * 1.5}s;
        opacity: ${0.4 + Math.random() * 0.5};
      `;
      rainCont.appendChild(drop);
    }
  }

  function aplicarTema() {
    if (esLluvioso) {
      document.body.classList.add('rainy');
      icon.textContent = '🌧️'; label.textContent = 'Lluvioso';
      crearGotas();
    } else {
      document.body.classList.remove('rainy');
      icon.textContent = '☀️'; label.textContent = 'Soleado';
      rainCont.innerHTML = '';
    }
  }

  btn.addEventListener('click', () => {
    esLluvioso = !esLluvioso;
    icon.style.transform = 'scale(0)';
    setTimeout(() => { icon.style.transform = ''; aplicarTema(); }, 200);
  });
}

// ═══════════════════════════════════════════════
// 7. CONFETI
// ═══════════════════════════════════════════════

function dispararConfeti() {
  const canvas = qs('#confetti-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const particulas = Array.from({ length: 90 }, () => ({
    x: Math.random() * canvas.width, y: -10,
    vy: 3 + Math.random() * 4, vx: (Math.random() - 0.5) * 3,
    size: 8 + Math.random() * 8,
    color: ['#e9c46a','#e63946','#2ec4b6','#6c63ff','#f4a261'][Math.floor(Math.random()*5)],
    rot: Math.random() * 360, rotV: (Math.random()-0.5)*6
  }));
  let frame;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let vivos = false;
    particulas.forEach(p => {
      if (p.y < canvas.height + 20) { vivos = true; }
      p.x += p.vx; p.y += p.vy; p.rot += p.rotV;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot * Math.PI / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size/2, -p.size/4, p.size, p.size/2);
      ctx.restore();
    });
    particulas.forEach(p => { p.vy += 0.08; });
    if (vivos) { frame = requestAnimationFrame(draw); }
    else { ctx.clearRect(0,0,canvas.width,canvas.height); }
  }
  if (frame) cancelAnimationFrame(frame);
  draw();
}

// ═══════════════════════════════════════════════
// 8. PASAPORTE
// ═══════════════════════════════════════════════

const PASSPORT_KEY = 'bogota_sellos_2026';

function cargarSellos() {
  try { sellos = JSON.parse(localStorage.getItem(PASSPORT_KEY)) || []; }
  catch { sellos = []; }
}

function guardarSellos() {
  localStorage.setItem(PASSPORT_KEY, JSON.stringify(sellos));
}

function tieneSello(dia) { return sellos.includes(dia); }

function darSello(dia) {
  if (!tieneSello(dia)) {
    sellos.push(dia);
    guardarSellos();
    disparar('sellos-actualizado');
    if (sellos.length === ITINERARIO.length) {
      setTimeout(dispararConfeti, 300);
    }
  }
}

function inicializarPasaporte() {
  const cont = qs('#passport-widget');
  cargarSellos();
  renderPasaporte(cont);
  document.addEventListener('sellos-actualizado', () => renderPasaporte(cont));
}

function renderPasaporte(cont) {
  const completo = sellos.length === ITINERARIO.length;
  cont.innerHTML = `
    <div class="passport-header">
      <div class="passport-icon">📘</div>
      <div>
        <h4>Pasaporte de Aventuras</h4>
        <p>${sellos.length} / ${ITINERARIO.length} sellos</p>
      </div>
    </div>
    <div class="passport-stamps">
      ${SELLOS_INFO.map(s => {
        const activo = tieneSello(s.dia);
        return `<div class="stamp-slot ${activo?'stamped':''}"
          data-dia="${s.dia}" title="Día ${s.dia}: ${s.label}"
          style="${activo ? `border-color:${s.color}; background: ${s.color}18; transform: rotate(-8deg);` : ''}">
          <div class="stamp-emoji">${activo ? s.emoji : '?'}</div>
          <div class="stamp-label" style="${activo?`color:${s.color}`:''}">Día ${s.dia}</div>
        </div>`;
      }).join('')}
    </div>
    ${completo ? '<div class="passport-complete">🏆 ¡Bogotá conquistada!</div>' : ''}
  `;
  qsa('.stamp-slot', cont).forEach(slot => {
    slot.addEventListener('click', () => {
      diaActivo = parseInt(slot.dataset.dia);
      renderBitacora();
      qsa('.dia-btn').forEach(b => b.classList.toggle('active', parseInt(b.dataset.dia) === diaActivo));
    });
  });
}

// ═══════════════════════════════════════════════
// 9. BITÁCORA
// ═══════════════════════════════════════════════

function inicializarBitacora() {
  renderDiasSidebar();
  renderBitacora();
  inicializarPasaporte();
}

function renderDiasSidebar() {
  const cont = qs('#dias-selector');
  cont.innerHTML = ITINERARIO.map(d => `
    <button class="dia-btn ${d.dia===diaActivo?'active':''}" data-dia="${d.dia}">
      <span class="dia-num">Día ${d.dia} ${d.icono}</span>
      <span class="dia-sub">${d.titulo}</span>
    </button>
  `).join('');
  qsa('.dia-btn', cont).forEach(btn => {
    btn.addEventListener('click', () => {
      diaActivo = parseInt(btn.dataset.dia);
      qsa('.dia-btn').forEach(b => b.classList.toggle('active', parseInt(b.dataset.dia)===diaActivo));
      renderBitacora();
    });
  });
}

async function renderBitacora() {
  const panel = qs('#bitacora-panel');
  const d = ITINERARIO[diaActivo - 1];

  const yaEstampado = tieneSello(diaActivo);
  const esSello = sesion?.tipo === 'student';
  let entradaAlumna = '', otraEntrada = '', correccion = '';

  if (sesion) {
    await precargarCache();
    const yo = sesion.nombre;
    const otro = yo === 'Karin' ? 'Eli' : 'Karin';
    entradaAlumna = dbGet('diarios', yo, diaActivo);
    otraEntrada   = dbGet('diarios', otro, diaActivo);
    correccion    = dbGet('correcciones', yo, diaActivo);
  }

  // Parsear los 3 párrafos guardados
  let parrafos = ['', '', ''];
  if (entradaAlumna) {
    try {
      const parsed = JSON.parse(entradaAlumna);
      if (Array.isArray(parsed)) parrafos = parsed;
    } catch {
      // compatibilidad: si es texto plano, va al párrafo 1
      parrafos[0] = entradaAlumna;
    }
  }

  // Parsear correcciones (puede ser JSON con 3 campos, o texto simple)
  let correcciones = { p1: '', p2: '', p3: '', general: '' };
  if (correccion) {
    try {
      const parsed = JSON.parse(correccion);
      if (parsed && typeof parsed === 'object') correcciones = { ...correcciones, ...parsed };
    } catch {
      correcciones.general = correccion;
    }
  }

  const titulosDia = ITINERARIO[diaActivo - 1]?.titulo || `Día ${diaActivo}`;
  const promptsParrafos = [
    `¿Qué fue lo que más te impresionó o llamó la atención en ${titulosDia}? Describe el lugar, las personas o el ambiente que encontraste.`,
    `¿Cómo te sentiste durante este día? Habla de las emociones, los retos y las sorpresas que viviste.`,
    `¿Qué aprendiste hoy sobre Colombia, el español o sobre ti misma? ¿Qué llevarías contigo como recuerdo de este día?`
  ];

  let diarioSection = '';
  if (sesion?.tipo === 'student') {
    const yo = sesion.nombre;
    const otro = yo === 'Karin' ? 'Eli' : 'Karin';
    const tieneCorreccion = correcciones.p1 || correcciones.p2 || correcciones.p3 || correcciones.general;

    diarioSection = `
    <div class="diario-box">
      <div class="diario-header">
        <div class="diario-header-icon">✏️</div>
        <div>
          <h4>Mi Bitácora de Viaje — <span style="color:var(--gold)">${yo}</span></h4>
          <p class="diario-subtitle">Escribe al menos tres párrafos sobre tu experiencia del día. Tu profesor los leerá y dejará correcciones.</p>
        </div>
      </div>

      <div class="parrafos-grid">
        ${[0,1,2].map(i => `
        <div class="parrafo-entry">
          <div class="parrafo-label">
            <span class="parrafo-num">Párrafo ${i+1}</span>
            <span class="parrafo-prompt">${promptsParrafos[i]}</span>
          </div>
          <textarea id="parrafo-${i+1}" class="parrafo-textarea" placeholder="Escribe aquí tu párrafo ${i+1}..." rows="5">${parrafos[i] || ''}</textarea>
          ${correcciones[`p${i+1}`] ? `
          <div class="correccion-parrafo">
            <div class="correccion-label">💬 Corrección del Profesor</div>
            <p>${correcciones[`p${i+1}`]}</p>
          </div>` : ''}
        </div>`).join('')}
      </div>

      ${correcciones.general ? `
      <div class="feedback-box">
        <h5>📝 Comentario General del Profesor</h5>
        <p>${correcciones.general}</p>
      </div>` : ''}

      <div class="diario-actions">
        <button id="guardar-diario-btn" class="btn-primary">Guardar Bitácora ✍️</button>
        <span id="diario-status" class="diario-save-status"></span>
      </div>

      ${otraEntrada ? `
        <div class="other-diary">
          <h5>📖 Bitácora de ${otro} (Día ${diaActivo}):</h5>
          ${(() => {
            let op = ['','',''];
            try { const pp = JSON.parse(otraEntrada); if(Array.isArray(pp)) op = pp; } catch { op[0] = otraEntrada; }
            return op.filter(t => t).map((t,i) => `<div class="other-parrafo"><strong>Párrafo ${i+1}:</strong><p>${t}</p></div>`).join('');
          })()}
        </div>` : ''}
    </div>`;
  }

  panel.style.opacity = '0';
  panel.style.transform = 'translateY(12px)';

  panel.innerHTML = `
    <div class="dia-header">
      <div class="dia-header-top">
        <h2 class="dia-titulo">Día ${d.dia}: ${d.titulo}</h2>
        <div class="dia-stamp-badge ${yaEstampado?'active':''}" title="${yaEstampado?'¡Estampado!':'Aún sin sellar'}">
          ${yaEstampado ? SELLOS_INFO[d.dia-1].emoji : '📍'}
        </div>
      </div>
      <p class="dia-frase">${d.frase}</p>
      <p class="dia-desc">${d.descripcion}</p>
    </div>

    ${esSello && !yaEstampado ? `
    <div class="stamp-cta">
      <div class="stamp-cta-text">
        <strong>¿Ya visitaron hoy?</strong>
        <p>Estampa tu pasaporte para marcar el día como completado.</p>
      </div>
      <button class="btn-stamp" id="stamp-btn" data-dia="${d.dia}">
        ${SELLOS_INFO[d.dia-1].emoji} Sellar pasaporte
      </button>
    </div>` : yaEstampado ? `
    <div class="stamp-cta done">
      <div class="stamp-cta-text">
        <strong>¡Día completado! 🎉</strong>
        <p>Este día está en tu pasaporte de aventuras.</p>
      </div>
      <div class="stamp-cta-done">${SELLOS_INFO[d.dia-1].emoji}</div>
    </div>` : ''}

    ${diarioSection}

    <div class="actividades-timeline">
      ${d.actividades.map(a => `
        <div class="actividad-card">
          <div class="act-header">
            <div class="act-icon">${a.icono}</div>
            <div>
              <div class="act-time">${a.hora}</div>
              <div class="act-name">${a.nombre}</div>
            </div>
          </div>
          <div class="act-body">
            ${a.imagen ? `<div class="act-img-wrap"><img src="${a.imagen}" alt="${a.nombre}" loading="lazy" onerror="this.parentElement.style.display='none'"></div>` : ''}
            <div class="act-content">
              <p class="act-desc">${a.descripcion}</p>
              <div class="act-nota"><strong>💡 Tip:</strong> ${a.nota}</div>
            </div>
          </div>
        </div>
      `).join('')}
    </div>

    ${d.lecciones ? `
    <div class="lecciones-diarias">
      <h3 style="margin: 30px 0 15px; font-family: Syne, sans-serif; font-size: 1.4rem; color: var(--gold);">📚 Lecciones de Español Avanzado</h3>
      <div style="display: grid; gap: 20px;">
        ${d.lecciones.map((l, i) => `
          <div class="actividad-card" style="border-left: 3px solid var(--gold);">
            <div class="act-name" style="margin-bottom: 8px;">Lección ${i+1}: ${l.titulo}</div>
            <p class="act-desc">${l.contenido}</p>
            <div class="mini-quiz-container" style="margin-top: 15px; padding: 15px; background: rgba(255,255,255,0.05); border-radius: 8px;">
              <strong>📝 Quiz rápido:</strong> ${l.quizPregunta}
              <div class="mini-quiz-options" style="display: flex; flex-direction: column; gap: 8px; margin-top: 10px;">
                ${l.quizOpciones.map((op, opIdx) => `
                  <button class="btn-mini-quiz" onclick="verificarMiniQuiz(this, ${opIdx === l.quizCorrecta})" style="text-align: left; padding: 8px 12px; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; color: var(--txt); cursor: pointer;">
                    ${op}
                  </button>
                `).join('')}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>` : ''}
  `;

  setTimeout(() => {
    panel.style.opacity = '1';
    panel.style.transform = '';
  }, 30);

  // Listeners
  const stampBtn = qs('#stamp-btn', panel);
  if (stampBtn) {
    stampBtn.addEventListener('click', () => {
      darSello(diaActivo);
      renderBitacora();
    });
  }

  const guardarBtn = qs('#guardar-diario-btn', panel);
  if (guardarBtn) {
    guardarBtn.addEventListener('click', async () => {
      const p1 = (qs('#parrafo-1', panel)?.value || '').trim();
      const p2 = (qs('#parrafo-2', panel)?.value || '').trim();
      const p3 = (qs('#parrafo-3', panel)?.value || '').trim();
      if (!p1 && !p2 && !p3) {
        const st = qs('#diario-status', panel);
        if (st) { st.textContent = '⚠️ Escribe al menos un párrafo.'; st.style.color = '#e63946'; }
        return;
      }
      const txt = JSON.stringify([p1, p2, p3]);
      guardarBtn.textContent = 'Guardando...';
      guardarBtn.disabled = true;
      await dbGuardar('diarios', sesion.nombre, diaActivo, txt);
      const st = qs('#diario-status', panel);
      if (st) { st.textContent = '✅ Bitácora guardada exitosamente.'; st.style.color = '#2ec4b6'; }
      guardarBtn.textContent = 'Guardar Bitácora ✍️';
      guardarBtn.disabled = false;
      setTimeout(() => { if (st) st.textContent = ''; }, 3000);
    });
  }
}

// ═══════════════════════════════════════════════
// 10. GLOSARIO
// ═══════════════════════════════════════════════

// Función para verificar los mini quizzes de las lecciones diarias
function verificarMiniQuiz(btn, esCorrecto) {
  if (btn.parentElement.dataset.respondido) return;
  
  const opciones = Array.from(btn.parentElement.children);
  btn.parentElement.dataset.respondido = 'true';
  
  opciones.forEach(b => b.style.opacity = '0.5');
  btn.style.opacity = '1';
  
  if (esCorrecto) {
    btn.style.background = 'rgba(0,212,170,0.2)';
    btn.style.borderColor = 'var(--emerald)';
    btn.innerHTML += ' ✅ ¡Correcto!';
  } else {
    btn.style.background = 'rgba(255,107,107,0.2)';
    btn.style.borderColor = 'var(--coral)';
    btn.innerHTML += ' ❌ Incorrecto';
  }
}

function inicializarGlosario() {
  renderGlosario();

  qs('#modismos-search').addEventListener('input', renderGlosario);
  qsa('.pill').forEach(p => {
    p.addEventListener('click', () => {
      qsa('.pill').forEach(x => x.classList.remove('active'));
      p.classList.add('active');
      renderGlosario();
    });
  });
}

function renderGlosario() {
  const query = qs('#modismos-search').value.toLowerCase().trim();
  const filtro = qs('.pill.active')?.dataset.filter || 'todos';
  const grid = qs('#glosario-grid');

  const filtrados = MODISMOS.filter(m => {
    const pasaFiltro = filtro === 'todos' || m.categoria === filtro;
    const pasaQuery = !query || m.palabra.toLowerCase().includes(query)
      || m.definicion.toLowerCase().includes(query)
      || m.alemán.toLowerCase().includes(query);
    return pasaFiltro && pasaQuery;
  });

  if (!filtrados.length) {
    grid.innerHTML = '<div class="no-results">🔍 No se encontraron modismos. ¡Intenta con otra búsqueda!</div>';
    return;
  }

  grid.innerHTML = filtrados.map((m, i) => `
    <div class="modismo-card" id="card-${i}" tabindex="0" role="button" aria-label="${m.palabra}">
      <div class="modismo-inner">
        <div class="card-face card-front">
          <div class="card-front-top">
            <span class="nivel-badge">${m.nivel}</span>
            <button class="tts-btn" data-word="${m.palabra}" title="Escuchar pronunciación">🔊</button>
          </div>
          <div class="modismo-word">${m.palabra}</div>
          <div class="modismo-de">🇩🇪 ${m.alemán}</div>
          <div class="modismo-brief">${m.definicion.substring(0, 80)}${m.definicion.length>80?'…':''}</div>
          <div class="flip-hint">Clic para ver más →</div>
        </div>
        <div class="card-face card-back">
          <div class="card-back-word">${m.palabra}</div>
          <div class="card-def">${m.definicion}</div>
          <div class="card-ex">
            <label>Ejemplo</label>
            <p>${m.ejemplo}</p>
          </div>
          <div class="card-socio">
            <label>Contexto Sociolingüístico</label>
            <p>${m.socio}</p>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  // Flip cards
  qsa('.modismo-card', grid).forEach((card, i) => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.tts-btn')) return;
      card.classList.toggle('flipped');
    });
    card.addEventListener('keydown', e => { if (e.key==='Enter'||e.key===' ') card.click(); });
  });

  // TTS buttons
  qsa('.tts-btn', grid).forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const word = btn.dataset.word;
      const utter = new SpeechSynthesisUtterance(word);
      utter.lang = 'es-CO'; utter.rate = 0.85;
      window.speechSynthesis.speak(utter);
      btn.textContent = '🔈';
      setTimeout(() => btn.textContent = '🔊', 1200);
    });
  });
}

// ═══════════════════════════════════════════════
// 11. QUIZ
// ═══════════════════════════════════════════════

// Shuffle array
function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }

let preguntasActuales = [];

function inicializarQuiz() {
  preguntasActuales = shuffle(PREGUNTAS_QUIZ).slice(0, 5);
  quizPreguntaActual = 0; quizPuntos = 0;
  renderQuizPregunta();

  qs('#quiz-restart').addEventListener('click', () => {
    preguntasActuales = shuffle(PREGUNTAS_QUIZ).slice(0, 5);
    quizPreguntaActual = 0; quizPuntos = 0;
    qs('#quiz-results').classList.remove('active');
    qs('#quiz-card-area').style.display = '';
    qs('#quiz-progress-bar-track').style.display = '';
    qs('#quiz-progress-label').style.display = '';
    renderQuizPregunta();
  });
}

function renderQuizPregunta() {
  const total = preguntasActuales.length;
  if (quizPreguntaActual >= total) { mostrarResultadosQuiz(); return; }

  const p = preguntasActuales[quizPreguntaActual];
  const pct = Math.round((quizPreguntaActual / total) * 100);
  qs('#quiz-progress-bar-fill').style.width = pct + '%';
  qs('#quiz-progress-label').textContent = `Pregunta ${quizPreguntaActual + 1} de ${total}`;

  const area = qs('#quiz-card-area');
  area.innerHTML = `
    <div class="quiz-question-text">${p.pregunta}</div>
    <div class="quiz-options">
      ${p.opciones.map((op, i) => `
        <button class="quiz-option" data-idx="${i}">
          <div class="opt-letter">${String.fromCharCode(65+i)}</div>
          <span>${op}</span>
        </button>
      `).join('')}
    </div>
  `;
  quizRespondida = false;

  qsa('.quiz-option', area).forEach(btn => {
    btn.addEventListener('click', () => {
      if (quizRespondida) return;
      quizRespondida = true;
      const idx = parseInt(btn.dataset.idx);
      const correcta = p.correcta;
      const esCorrecta = idx === correcta;
      if (esCorrecta) quizPuntos++;

      qsa('.quiz-option', area).forEach(b => {
        const i = parseInt(b.dataset.idx);
        b.disabled = true;
        if (i === correcta) b.classList.add('correct');
        else if (i === idx)  b.classList.add('incorrect');
      });

      area.insertAdjacentHTML('beforeend', `
        <div class="quiz-feedback">
          <div class="${esCorrecta?'feedback-ok':'feedback-fail'}">${esCorrecta?'¡Correcto! 🎉':'Incorrecto ❌'}</div>
          <div class="feedback-explain">${p.explicacion}</div>
          <button class="btn-primary" id="quiz-next-btn">
            ${quizPreguntaActual+1 < total ? 'Siguiente →' : 'Ver resultados 🏆'}
          </button>
        </div>
      `);

      qs('#quiz-next-btn', area).addEventListener('click', () => {
        quizPreguntaActual++;
        renderQuizPregunta();
      });
    });
  });
}

function mostrarResultadosQuiz() {
  const total = preguntasActuales.length;
  const pct = (quizPuntos / total) * 100;
  let badge, emoji, feedback;
  if (pct === 100)     { badge = '🏆 Experta Rola'; emoji = '🎊'; feedback = '¡Perfecto! Hablan mejor que muchos bogotanos. ¡Están listas para conquistar la ciudad!'; }
  else if (pct >= 80)  { badge = '⭐ Bogotana Honoraria'; emoji = '🌟'; feedback = '¡Excelente! Conocen Bogotá como si fueran rolos de nacimiento. Solo un pequeño repaso y listo.'; }
  else if (pct >= 60)  { badge = '📚 Estudiante Aplicada'; emoji = '👍'; feedback = '¡Muy bien! Tienen una base sólida. Sigan practicando los rolismos más avanzados.'; }
  else if (pct >= 40)  { badge = '🗺️ Turista Curiosa'; emoji = '🤔'; feedback = 'Buen comienzo. Bogotá tiene mucho que enseñarles. Repasen el glosario y vuelvan a intentar.'; }
  else                 { badge = '🌱 Aprendiz Rola'; emoji = '💪'; feedback = 'No se desanimen: ¡el viaje comienza en el primer «parcera»! Estudien los modismos y vuelvan.'; }

  qs('#quiz-progress-bar-fill').style.width = '100%';
  qs('#quiz-card-area').style.display = 'none';

  const results = qs('#quiz-results');
  results.querySelector('.results-emoji').textContent = emoji;
  qs('#quiz-score-value').textContent = `${quizPuntos} / ${total}`;
  qs('#quiz-badge').textContent = badge;
  qs('#quiz-feedback-text').textContent = feedback;
  results.classList.add('active');

  if (quizPuntos === total) { setTimeout(dispararConfeti, 300); }
}

// ═══════════════════════════════════════════════
// 12. ADMIN PANEL
// ═══════════════════════════════════════════════

async function inicializarAdmin() {
  renderAdminDaysList();
  renderAdminReview();

  qsa('.student-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      qsa('.student-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      adminEstudiante = tab.dataset.student;
      adminDia = 1;
      renderAdminDaysList();
      renderAdminReview();
    });
  });
}

function getAdminStatus(estudiante, dia) {
  const corr = dbGet('correcciones', estudiante, dia);
  const diario = dbGet('diarios', estudiante, dia);
  if (corr) return 'reviewed';
  if (diario) return 'pending';
  return 'empty';
}

function renderAdminDaysList() {
  const cont = qs('#admin-days-list');
  cont.innerHTML = ITINERARIO.map(d => {
    const st = getAdminStatus(adminEstudiante, d.dia);
    const stLabel = { reviewed:'Revisado', pending:'Pendiente', empty:'Sin entrada' }[st];
    return `<button class="admin-day-btn ${d.dia===adminDia?'active':''}" data-dia="${d.dia}">
      <span class="admin-day-name">Día ${d.dia}: ${d.titulo}</span>
      <span class="status-mini ${st}">${stLabel}</span>
    </button>`;
  }).join('');

  qsa('.admin-day-btn', cont).forEach(btn => {
    btn.addEventListener('click', () => {
      adminDia = parseInt(btn.dataset.dia);
      renderAdminDaysList();
      renderAdminReview();
    });
  });
}

async function renderAdminReview() {
  await precargarCache();
  const diario = dbGet('diarios', adminEstudiante, adminDia);
  const correccionRaw = dbGet('correcciones', adminEstudiante, adminDia);
  const st = getAdminStatus(adminEstudiante, adminDia);
  const stLabel = { reviewed:'✅ Revisado', pending:'⏳ Pendiente', empty:'📭 Sin entrada' }[st];

  qs('#review-title').textContent = `${adminEstudiante} — Día ${adminDia}: ${ITINERARIO[adminDia-1]?.titulo || ''}`;
  const badge = qs('#review-status');
  badge.textContent = stLabel;
  badge.className = `status-badge ${st}`;

  // Parsear párrafos del estudiante
  let parrafos = ['', '', ''];
  if (diario) {
    try { const p = JSON.parse(diario); if (Array.isArray(p)) parrafos = p; }
    catch { parrafos[0] = diario; }
  }

  // Parsear correcciones existentes
  let correcciones = { p1: '', p2: '', p3: '', general: '' };
  if (correccionRaw) {
    try { const c = JSON.parse(correccionRaw); if (c && typeof c === 'object') correcciones = { ...correcciones, ...c }; }
    catch { correcciones.general = correccionRaw; }
  }

  const entry = qs('#student-entry');
  if (!diario) {
    entry.innerHTML = `<div class="empty-entry"><span>📭</span><p>La alumna aún no ha escrito su bitácora para este día.</p></div>`;
  } else {
    entry.innerHTML = parrafos.map((txt, i) => txt ? `
      <div class="admin-parrafo-block">
        <div class="admin-parrafo-label">Párrafo ${i+1}</div>
        <div class="admin-parrafo-text">${txt.replace(/\n/g, '<br>')}</div>
        <div class="admin-corr-field">
          <label>✏️ Corrección Párrafo ${i+1}:</label>
          <textarea id="admin-corr-p${i+1}" class="admin-corr-textarea" rows="3" placeholder="Escribe aquí la corrección del párrafo ${i+1}...">${correcciones[`p${i+1}`] || ''}</textarea>
        </div>
      </div>` : ''
    ).filter(Boolean).join('')
    + `<div class="admin-parrafo-block general-block">
        <div class="admin-parrafo-label" style="background: var(--gold); color: #000;">📝 Comentario General</div>
        <textarea id="admin-corr-general" class="admin-corr-textarea" rows="4" placeholder="Escribe un comentario general sobre la escritura del día...">${correcciones.general || ''}</textarea>
      </div>`;
  }

  const saveBtn = qs('#save-correction-btn');
  // Ocultar textarea legacy y manejar solo el nuevo panel
  const legacyTextarea = qs('#admin-correction-textarea');
  if (legacyTextarea) legacyTextarea.style.display = 'none';

  if (diario) {
    saveBtn.disabled = false;
    saveBtn.onclick = async () => {
      const corrObj = {
        p1: (qs('#admin-corr-p1')?.value || '').trim(),
        p2: (qs('#admin-corr-p2')?.value || '').trim(),
        p3: (qs('#admin-corr-p3')?.value || '').trim(),
        general: (qs('#admin-corr-general')?.value || '').trim()
      };
      saveBtn.textContent = 'Guardando...';
      saveBtn.disabled = true;
      await dbGuardar('correcciones', adminEstudiante, adminDia, JSON.stringify(corrObj));
      renderAdminDaysList();
      renderAdminReview();
      saveBtn.textContent = '✅ Corrección Guardada';
      setTimeout(() => {
        saveBtn.textContent = 'Guardar Corrección 💾';
        saveBtn.disabled = false;
      }, 2500);
    };
  } else {
    saveBtn.disabled = true;
    saveBtn.onclick = null;
  }
}

// ═══════════════════════════════════════════════
// 13. SESIÓN Y LOGIN CON SUPABASE AUTH
// ═══════════════════════════════════════════════

function inicializarSesion() {
  const modal    = qs('#login-modal');
  const passModal = qs('#password-modal');
  const sessionBtn = qs('#session-btn');
  const closeBtns = qsa('.modal-close');
  
  // Suscripción al estado de Auth de Supabase
  if (supabaseClient) {
    supabaseClient.auth.onAuthStateChange(async (event, session) => {
      if (session && session.user) {
        const userMetadata = session.user.user_metadata || {};
        
        // Identificar tipo de usuario basado en email o metadatos
        let nombreUser = session.user.email.split('@')[0];
        nombreUser = nombreUser.charAt(0).toUpperCase() + nombreUser.slice(1);
        const isAdmin = session.user.email === ADMIN_EMAIL;
        
        sesion = {
          tipo: isAdmin ? 'admin' : 'student',
          nombre: isAdmin ? null : nombreUser,
          user: session.user
        };
        
        actualizarUISession();
        renderBitacora();
        
        if (isAdmin) {
          precargarCache().then(() => { inicializarAdmin(); });
        }

        // Si existe un flag local (establecido en login) o si acabamos de loguearnos y la clave era '2026'
        // Lo verificamos si requiere cambio de clave
        if (sessionStorage.getItem('require_password_change') === 'true') {
          passModal.classList.add('open');
        }
      } else {
        sesion = null;
        actualizarUISession();
        renderBitacora();
      }
    });
  }

  sessionBtn.addEventListener('click', async () => {
    if (sesion) {
      if (supabaseClient) await supabaseClient.auth.signOut();
      cerrarSesion();
    } else {
      modal.classList.add('open');
    }
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.classList.remove('open');
      if (btn.closest('#password-modal')) {
        // No pueden cerrar si el cambio es obligatorio
        alert("¡Debes cambiar tu contraseña para continuar!");
      }
    });
  });

  // Login Form Submit
  const loginForm = qs('#auth-login-form');
  const loginSubmitBtn = qs('#login-submit');
  const loginError = qs('#login-error');

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!supabaseClient) {
      loginError.textContent = "Supabase no está conectado.";
      return;
    }
    const email = qs('#login-email').value.trim();
    const password = qs('#login-password').value.trim();
    
    loginSubmitBtn.disabled = true;
    loginSubmitBtn.textContent = 'Autenticando...';
    loginError.textContent = '';

    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: email,
      password: password
    });

    loginSubmitBtn.disabled = false;
    loginSubmitBtn.textContent = 'Ingresar';

    if (error) {
      loginError.textContent = error.message;
    } else {
      modal.classList.remove('open');
      // Forzar cambio si la clave es la genérica
      if (password === '2026') {
        sessionStorage.setItem('require_password_change', 'true');
        qs('#password-modal').classList.add('open');
      } else {
        sessionStorage.removeItem('require_password_change');
      }
    }
  });

  // Password Change Form
  const passForm = qs('#auth-password-form');
  const passSubmitBtn = qs('#password-submit');
  const passError = qs('#password-error');

  passForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newPass = qs('#new-password').value;
    
    passSubmitBtn.disabled = true;
    passSubmitBtn.textContent = 'Actualizando...';
    passError.textContent = '';

    const { data, error } = await supabaseClient.auth.updateUser({ password: newPass });
    
    passSubmitBtn.disabled = false;
    passSubmitBtn.textContent = 'Guardar y Continuar';

    if (error) {
      passError.textContent = error.message;
    } else {
      sessionStorage.removeItem('require_password_change');
      qs('#password-modal').classList.remove('open');
      alert("Contraseña actualizada con éxito.");
    }
  });
}

function cerrarSesion() {
  sesion = null;
  actualizarUISession();
  renderBitacora();
  navegarA('bitacora');
}

function actualizarUISession() {
  const btn = qs('#session-btn');
  const adminLi = qs('#nav-admin-li');
  if (sesion) {
    const label = sesion.tipo === 'admin' ? '🔑 Salir' : `👩‍🎓 ${sesion.nombre} (Salir)`;
    btn.textContent = label;
    adminLi.style.display = sesion.tipo === 'admin' ? '' : 'none';
  } else {
    btn.textContent = '👤 Ingresar';
    adminLi.style.display = 'none';
  }
}

// ═══════════════════════════════════════════════
// 14. INIT
// ═══════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  // Supabase
  try {
    if (window.supabase && window.supabase.createClient) {
      supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      console.log('✅ Supabase listo.');
      
      // Función temporal para crear usuarios
      window.crearUsuariosSupabase = async () => {
        const users = [
          { email: 'karin@estudiante.com', password: '2026', nombre: 'Karin' },
          { email: 'eli@estudiante.com', password: '2026', nombre: 'Eli' },
          { email: 'teacher@bogota.co', password: '2026', nombre: 'Profesor' }
        ];
        let msg = "Resultados del registro:\n";
        for (const u of users) {
          try {
            const { data, error } = await supabaseClient.auth.signUp({
              email: u.email,
              password: u.password,
              options: {
                data: { nombre: u.nombre }
              }
            });
            if (error) {
              msg += `- ${u.email}: Error: ${error.message}\n`;
            } else {
              msg += `- ${u.email}: Éxito! (ID: ${data.user?.id || 'sin ID'})\n`;
            }
          } catch (e) {
            msg += `- ${u.email}: Excepción: ${e.message}\n`;
          }
        }
        alert(msg);
      };
      // Ejecutarlo automáticamente una vez
      setTimeout(() => {
        window.crearUsuariosSupabase();
      }, 1000);
      
    } else {
      console.warn('⚠️ Supabase SDK no disponible. Modo local activado.');
    }
  } catch (e) {
    console.error('❌ Error Supabase:', e);
  }

  // Nav
  qsa('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => navegarA(btn.dataset.section));
  });

  // Hero CTA
  qs('.hero-cta')?.addEventListener('click', () => navegarA('bitacora'));

  // Módulos
  inicializarTema();
  inicializarBitacora();
  inicializarGlosario();
  inicializarQuiz();
  inicializarSesion();

  console.log('🇨🇴 Bogotá Aventura cargado. ¡Bienvenidas Karin y Eli!');
});
