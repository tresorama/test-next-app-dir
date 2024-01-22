// utils

const placeholder_image_url = [
  "/solid-color-image.jpeg",
  "https://images.unsplash.com/photo-1604076850742-4c7221f3101b?q=80&w=2731&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
][1];

const createSlug = (name: string) => {
  return name
    .replace(/\s/g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "")
    .toLowerCase();
};

// data

export type BlogPost = {
  slug: string,
  title: string,
  published_date: Date,
  author_name: string,
  image_url: string,
  excerpt: "CONTENT" | string,
  content: string,
};


export const blogPosts: BlogPost[] = [
  {
    title: 'Il Bianco e il Nero',
    published_date: new Date(2024, 0, 12),
    author_name: "Bruno Delonghi",
    image_url: placeholder_image_url,
    excerpt: "Hipster ipsum tattooed brunch I'm baby. LaCroix crucifix activated pok yuccie banh truck.",
    content: `<p>Hipster ipsum tattooed brunch I'm baby. LaCroix crucifix activated pok yuccie banh truck. Vape 8-bit banjo quinoa you xoxo jean kitsch art.</p><p>Same woke kogi praxis bulb. Praxis ascot viral toast vinegar. Bottle cloud fund yuccie wayfarers butcher lomo. Cleanse +1 beer echo fanny meggings pitchfork forage retro unicorn. Jianbing put subway synth out vexillologist juice vice. Denim bodega gluten-free tattooed bulb bread paleo.</p><p>Green charcoal meditation actually keytar enamel direct marfa ramps. Brunch waistcoat trade activated tacos chips shabby. You leggings brooklyn truffaut flannel occupy vhs.</p><p>Mumblecore hot taxidermy yolo everyday. Fund banh enamel bird probably batch party boys. Palo raw scenester pug butcher axe drinking butcher meggings photo. Cray cold-pressed before scenester irony next succulents poutine. Chia waistcoat subway salvia loko hot bruh copper tote. Tattooed xoxo messenger aesthetic juice man enamel sold cloud. Fanny gatekeep drinking etsy kogi cornhole on af banjo swag. Banjo coloring sold selvage shorts. Hoodie franzen brooklyn four authentic everyday af wayfarers neutra. Yuccie vexillologist carry vinegar direct typewriter lyft pop-up readymade. </p><p>Ennui copper boys meditation bun bushwick yes photo.</p>`
  },
  {
    title: 'Il Buono e il Cattivo Tempo',
    published_date: new Date(2024, 0, 12),
    author_name: "Bruno Delonghi",
    image_url: placeholder_image_url,
    excerpt: "Hipster ipsum tattooed brunch I'm baby. LaCroix crucifix activated pok yuccie banh truck.",
    content: `<p>Hipster ipsum tattooed brunch I'm baby. LaCroix crucifix activated pok yuccie banh truck. Vape 8-bit banjo quinoa you xoxo jean kitsch art.</p><p>Same woke kogi praxis bulb. Praxis ascot viral toast vinegar. Bottle cloud fund yuccie wayfarers butcher lomo. Cleanse +1 beer echo fanny meggings pitchfork forage retro unicorn. Jianbing put subway synth out vexillologist juice vice. Denim bodega gluten-free tattooed bulb bread paleo.</p><p>Green charcoal meditation actually keytar enamel direct marfa ramps. Brunch waistcoat trade activated tacos chips shabby. You leggings brooklyn truffaut flannel occupy vhs.</p><p>Mumblecore hot taxidermy yolo everyday. Fund banh enamel bird probably batch party boys. Palo raw scenester pug butcher axe drinking butcher meggings photo. Cray cold-pressed before scenester irony next succulents poutine. Chia waistcoat subway salvia loko hot bruh copper tote. Tattooed xoxo messenger aesthetic juice man enamel sold cloud. Fanny gatekeep drinking etsy kogi cornhole on af banjo swag. Banjo coloring sold selvage shorts. Hoodie franzen brooklyn four authentic everyday af wayfarers neutra. Yuccie vexillologist carry vinegar direct typewriter lyft pop-up readymade. </p><p>Ennui copper boys meditation bun bushwick yes photo.</p>`
  },
  {
    title: 'Apple Vision Pro, primi hands-on dagli Stati Uniti',
    published_date: new Date(2024, 0, 12),
    author_name: "Bruno Delonghi",
    image_url: "https://static.iphoneitalia.com/wp-content/uploads/2024/01/Apple-Vision-Pro-Travel-Mode-1536x864.jpg",
    excerpt: "I primi giornalisti negli Stati Uniti hanno messo le mani sull'Apple Vision Pro.",
    content: `
    <p>The Verge ed Engadget, ad esempio, hanno condiviso le primissime impressioni del Vision Pro.</p>
    <p><img decoding="async" loading="lazy" src="https://static.iphoneitalia.com/wp-content/uploads/2024/01/vision-pro-1-770x567.jpg" alt="vision pro" width="770" height="567" srcset="https://static.iphoneitalia.com/wp-content/uploads/2024/01/vision-pro-1-770x567.jpg 770w, https://static.iphoneitalia.com/wp-content/uploads/2024/01/vision-pro-1-768x566.jpg 768w, https://static.iphoneitalia.com/wp-content/uploads/2024/01/vision-pro-1-660x486.jpg 660w, https://static.iphoneitalia.com/wp-content/uploads/2024/01/vision-pro-1.jpg 904w" sizes="(max-width: 770px) 100vw, 770px"></p>
    <blockquote><p><a href="https://www.theverge.com/24040075/apple-vision-pro-hands-on-virtual-reality" target="_blank" rel="noopener">The Verge</a>:</p><p>Ci vorrà molto tempo per scoprire i risvolti sociali di questa cosa. Certo, è stato tutto un turbine. Ho passato mezz’ora come un bambino a fissare un pianeta alieno, anche se non mi ero mai alzata dal divano. Ma alla fine della demo ho iniziato a sentire il peso del visore che mi riportava al mondo reale. Avevo corrugato la fronte, concentrandomi così tanto che ho sentito l’inizio di un leggero mal di testa. Quella tensione si è dissipata non appena mi sono tolto il visore, ma tornando a Manhattan, ho continuato a rivedere la demo nella mia testa. So cosa ho appena visto. Sto ancora cercando di vedere dove si può inserire nel mondo reale.</p><p><img decoding="async" loading="lazy" class="alignnone size-medium wp-image-820466" src="https://static.iphoneitalia.com/wp-content/uploads/2024/01/hands-on-vision-pro-770x772.jpg" alt="hands on vision pro" width="770" height="772" srcset="https://static.iphoneitalia.com/wp-content/uploads/2024/01/hands-on-vision-pro-770x772.jpg 770w, https://static.iphoneitalia.com/wp-content/uploads/2024/01/hands-on-vision-pro-400x400.jpg 400w, https://static.iphoneitalia.com/wp-content/uploads/2024/01/hands-on-vision-pro-768x770.jpg 768w, https://static.iphoneitalia.com/wp-content/uploads/2024/01/hands-on-vision-pro-65x65.jpg 65w, https://static.iphoneitalia.com/wp-content/uploads/2024/01/hands-on-vision-pro-660x661.jpg 660w, https://static.iphoneitalia.com/wp-content/uploads/2024/01/hands-on-vision-pro.jpg 896w" sizes="(max-width: 770px) 100vw, 770px"><br> <a href="https://www.engadget.com/apple-vision-pro-hands-on-redux-immersive-video-disney-app-floating-keyboard-and-a-little-screaming-180006222.html" target="_blank" rel="noopener">Engadget</a>:</p><p>Scegliere la misura giusta ha richiesto abbastanza tempo, che per un minuto mi sono preoccupato di aver sbagliato scelta. Per prima cosa, ho faticato a far sì che le scritte risultassero nitide. È stato come sedersi nello studio di un optometrista e provare una lente che era leggermente troppo sfocata per me. Stringere le cinghie mi ha aiutato a rendere il testo nitido quanto doveva essere, con qualche piccolo fastidio al naso. La soluzione è stata quella di sostituire il cuscino di tenuta con quello più leggero presente nella confezione. &nbsp;Con queste due modifiche, il Dual Loop Band e il cuscino leggero, mi sono finalmente sentito a mio agio.</p></blockquote>
  <p>Anche Joanna Stern del Wall Street Journal ha affermato che il Dual Loop, che ha potuto provare per la prima volta
    oggi, era molto più comodo dell’opzione a banda singola.</p>
  <p></p>
  <p><strong>Disney+ per Vision Pro</strong> è stato descritto come “giocare a un videogioco” perché puoi selezionare uno
    sfondo in stile Disney per guardare i contenuti. Chi lo ha provato lo ha descritto come un “drive-in a tema Disney”.
  </p>
  <blockquote>
    <p>È un po’ sciocco parlare del realismo delle immagini, ma non ho visto pixel. Invece, ho guardato un piccolo
      biglietto scritto a mano che Tony Stark aveva chiaramente lasciato indietro e mi sentivo come se fossi quasi
      riuscito a raccoglierlo. Quando siamo passati all’ambiente di Tattooine, sono stato messo nella cabina di pilotaggio
      del landspeeder di Luke Skywalker e quando ho allungato la mano per afferrare i comandi dello sterzo, ho potuto
      vedere le mie mani davanti a me.</p>
  </blockquote>
  <p>Sebbene la tastiera virtuale sia stata descritta da Mark Gurman di Bloomberg come “disastrosa”, alcuni hanno
    affermato che funziona “abbastanza bene”, mentre altri hanno detto che era “una delle parti più frustranti” della demo
    perché nessuna delle opzioni di digitazione hanno funzionato bene per un uso prolungato.</p>
    `
  },
].map(item => ({
  ...item,
  slug: createSlug(item.title),
}));


export const getAllBlogPosts = async () => {
  const sleep = (timeInMs: number) => new Promise(res => setTimeout(res, timeInMs));
  await sleep(300);
  return blogPosts;
};

export const getBlogPostBySlug = async (slug: BlogPost['slug']) => {
  const sleep = (timeInMs: number) => new Promise(res => setTimeout(res, timeInMs));
  await sleep(300);
  return blogPosts.find(item => item.slug === slug);
};
