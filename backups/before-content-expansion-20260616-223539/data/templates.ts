export type TemplateCategory = "Beauty" | "Food" | "Fashion" | "General";

export type TemplateFaq = {
  question: string;
  answer: string;
};

export type PromptTemplate = {
  title: string;
  slug: string;
  category: TemplateCategory;
  useCase: string;
  searchIntent: string;
  shortDescription: string;
  referenceImages: string[];
  primaryReferenceImageIndex: 1;
  midjourneyPrompt: string;
  runwayPrompt: string;
  storyboardScenes: string[];
  cameraNotes: string;
  lightingNotes: string;
  motionNotes: string;
  aspectRatio: string;
  duration: string;
  promptVariations: string[];
  faqs: TemplateFaq[];
  relatedSlugs: string[];
};

type TemplateSeed = Omit<PromptTemplate, "primaryReferenceImageIndex">;

const primaryReferenceCopy =
  "Use the main reference image as the primary visual reference. Treat the other reference images, when present, only as supporting references for texture, prop, or framing ideas.";

const withPrimaryReference = (template: TemplateSeed): PromptTemplate => ({
  ...template,
  primaryReferenceImageIndex: 1,
  shortDescription: `${template.shortDescription} The visual direction is built around the main reference image.`,
  midjourneyPrompt: `${primaryReferenceCopy} Build the image prompt around the main reference image's composition, lighting mood, color palette, product placement, and overall visual hierarchy. ${template.midjourneyPrompt}`,
  runwayPrompt: `${primaryReferenceCopy} Build the video prompt around the main reference image's composition, lighting mood, color palette, product placement, and overall visual hierarchy. ${template.runwayPrompt}`,
  storyboardScenes: template.storyboardScenes.map(
    (scene) => `${scene} Keep the frame aligned with the main reference image.`
  ),
  cameraNotes: `Use the main reference image as the primary camera reference for angle, crop, and hero framing. ${template.cameraNotes}`,
  lightingNotes: `Match the main reference image first for lighting mood, contrast, and highlight behavior. ${template.lightingNotes}`,
  motionNotes: `Keep motion decisions consistent with the main reference image's visual direction. ${template.motionNotes}`,
  promptVariations: template.promptVariations.map(
    (variation) => `${variation} Keep the main reference image as the visual anchor.`
  ),
  faqs: [
    ...template.faqs,
    {
      question: "How should I use the reference images?",
      answer:
        "Use the main reference image for composition, lighting, palette, and product focus. Use the other images only as secondary support."
    }
  ]
});

const templateSeeds: TemplateSeed[] = [
  {
    title: "Luxury Skincare Serum Ad",
    slug: "luxury-skincare-serum-ad",
    category: "Beauty",
    useCase: "Premium skincare product campaign",
    searchIntent: "luxury skincare serum ad prompt",
    shortDescription:
      "Show a single luxury serum bottle on a translucent pedestal with controlled reflections, champagne-white gradients, and precise premium beauty styling.",
    referenceImages: ["/assets/templates/glowing-skin-main.png", "/assets/templates/luxury-serum-main.png", "/assets/templates/ecommerce-hero-main.png"],
    midjourneyPrompt: "single luxury skincare serum bottle centered on translucent acrylic pedestal, champagne white gradient backdrop, controlled glass reflections, soft dewy highlights, minimal premium beauty advertising, clean negative space, polished cosmetic hero shot --ar 4:5 --v 6",
    runwayPrompt: "A single luxury serum bottle sits centered on a translucent pedestal under soft champagne-white light. Reflections stay controlled while tiny dewy highlights shimmer subtly around the bottle. Slow push-in, minimal premium beauty motion, ending on a clean hero frame.",
    storyboardScenes: [
      "Soft champagne-white light reveals the translucent pedestal and glass serum bottle silhouette.",
      "Controlled reflections glide across the bottle edges while dewy highlights stay subtle and premium.",
      "Final frame locks on the centered serum bottle with clean negative space for campaign copy."
    ],
    cameraNotes: "Use a centered hero crop with shallow depth of field, keeping the bottle label and glass edges readable.",
    lightingNotes: "Use soft champagne-white key light, controlled rim highlights, and restrained reflections on glass and acrylic.",
    motionNotes: "Use a slow push-in only; keep droplets and reflections subtle so the bottle remains the visual anchor.",
    aspectRatio: "4:5 for social ads, 16:9 for landing page hero sections",
    duration: "8-12 seconds",
    promptVariations: [
      "Switch the gradient from champagne white to cool pearl blue without changing the centered pedestal composition.",
      "Add one restrained botanical accent near the base while keeping the serum bottle dominant.",
      "Use a darker luxury backdrop but preserve the same glass reflection logic and clean negative space."
    ],
    faqs: [
      {
        question: "Can this prompt work for a vitamin C serum?",
        answer: "Yes. Add vitamin C ingredients such as orange peel, bright amber liquid, and a fresh glow benefit."
      },
      {
        question: "What platform is best for this concept?",
        answer: "The Image Prompt is strong for the hero image, while Runway is useful for a short product reveal video."
      }
    ],
    relatedSlugs: ["glowing-skin-product-commercial", "anti-aging-cream-promo", "ecommerce-hero-shot"]
  },
  {
    title: "Glowing Skin Product Commercial",
    slug: "glowing-skin-product-commercial",
    category: "Beauty",
    useCase: "Radiance-focused skincare video ad",
    searchIntent: "glowing skin product commercial prompt",
    shortDescription:
      "Frame skincare packaging against a luminous skin-texture backdrop with peach-white glow, dewy highlights, and a bright high-key beauty finish.",
    referenceImages: ["/assets/templates/luxury-serum-main.png", "/assets/templates/glowing-skin-main.png", "/assets/templates/ecommerce-hero-main.png"],
    midjourneyPrompt: "skincare jar and serum bottle against luminous skin texture backdrop, peach white high-key beauty studio, glossy dewy highlights, soft radiant finish, clean premium cosmetic campaign, product and skin glow balanced in one frame --ar 4:5 --v 6",
    runwayPrompt: "Soft light sweeps across a luminous skin-texture backdrop as the skincare product settles into frame. Peach-white glow, dewy highlight behavior, bright social-first beauty motion, ending with a radiant clean hero composition.",
    storyboardScenes: [
      "Luminous skin texture fills the background with a soft peach-white glow.",
      "Skincare packaging slides gently into the foreground while dewy highlights catch the edges.",
      "Final frame balances product and radiant skin texture without clutter."
    ],
    cameraNotes: "Use a medium product crop with macro skin-texture cutaways, keeping the packaging in the foreground.",
    lightingNotes: "Use high-key peach-white lighting with soft bloom and dewy highlight control.",
    motionNotes: "Use a gentle lateral slide and soft highlight sweep; avoid fast beauty transitions.",
    aspectRatio: "9:16 for TikTok and Reels",
    duration: "6-10 seconds",
    promptVariations: [
      "Make the peach glow more clinical with soft white dermatologist lighting.",
      "Increase the glass-skin effect while keeping product packaging readable.",
      "Use a warmer sunrise glow but preserve the same luminous skin backdrop."
    ],
    faqs: [
      {
        question: "Is this template suitable for social media ads?",
        answer: "Yes. It is designed for short vertical beauty content and quick product benefit communication."
      },
      {
        question: "How can I make it more premium?",
        answer: "Add marble surfaces, restrained typography space, and slower camera motion."
      }
    ],
    relatedSlugs: ["luxury-skincare-serum-ad", "facial-cleanser-tiktok-ad", "sunscreen-summer-campaign"]
  },
  {
    title: "Sunscreen Summer Campaign",
    slug: "sunscreen-summer-campaign",
    category: "Beauty",
    useCase: "Seasonal SPF campaign",
    searchIntent: "sunscreen summer campaign prompt",
    shortDescription:
      "Anchor the ad around a front-facing sunscreen tube with bright sun, warm sand, ocean blur, and a crisp summer SPF look.",
    referenceImages: ["/assets/templates/glowing-skin-main.png", "/assets/templates/sunscreen-main.png", "/assets/templates/ecommerce-hero-main.png"],
    midjourneyPrompt: "front-facing sunscreen tube on warm sand, ocean bokeh in the background, bright natural sunlight, clean SPF label readability, subtle citrus accent, premium summer skincare advertising, airy and sunlit composition --ar 4:5 --v 6",
    runwayPrompt: "Sunlight flashes softly across warm sand before the sunscreen tube settles front and center. Ocean blur stays behind the product while small highlight flickers and a gentle push-in preserve a bright summer SPF hero shot.",
    storyboardScenes: [
      "Warm sand and ocean blur establish the bright summer SPF setting.",
      "The sunscreen tube becomes front-facing and centered with the label kept clear.",
      "Final frame holds the airy sunlit product hero with subtle citrus or towel support only."
    ],
    cameraNotes: "Use low product-level framing with the tube front-facing and enough background blur to keep the label readable.",
    lightingNotes: "Use bright natural sunlight with soft bounce on the front label and controlled beach highlights.",
    motionNotes: "Use sparkle and light flicker in the background plus a slow push-in on the tube.",
    aspectRatio: "4:5 or 9:16",
    duration: "8-15 seconds",
    promptVariations: [
      "Move the scene from beach sand to poolside tile while keeping the tube front-facing.",
      "Use a sportier outdoor version with the same bright SPF label clarity.",
      "Use a family-safe summer tone without adding people or faces."
    ],
    faqs: [
      {
        question: "Can this prompt show SPF claims?",
        answer: "Use generic text placeholders unless your brand has verified SPF claims and compliant copy."
      },
      {
        question: "What makes the product label readable?",
        answer: "Keep the tube front-facing, use soft bounce light, and avoid busy props behind the label."
      }
    ],
    relatedSlugs: ["glowing-skin-product-commercial", "seasonal-sale-campaign", "healthy-snack-promo"]
  },
  {
    title: "Anti-Aging Cream Promo",
    slug: "anti-aging-cream-promo",
    category: "Beauty",
    useCase: "Benefit-led skincare promotion",
    searchIntent: "anti-aging cream promo prompt",
    shortDescription:
      "Build a mature premium cream visual with a sculptural white base, silver accents, smooth cream texture, and restrained clinical-luxury cues.",
    referenceImages: ["/assets/templates/luxury-serum-main.png", "/assets/templates/anti-aging-main.png", "/assets/templates/glowing-skin-main.png"],
    midjourneyPrompt: "premium anti-aging face cream jar on sculptural white stone, smooth cream texture swatch, soft silver accents, clean luxury skincare studio, restrained clinical beauty styling, minimal shadows, stable mature premium composition --ar 4:5 --v 6",
    runwayPrompt: "A face cream jar is revealed on a sculptural white base while a smooth cream texture catches soft silver light. Motion stays minimal and refined, with a slow reveal that ends on a stable premium anti-aging hero frame.",
    storyboardScenes: [
      "A smooth cream texture swatch appears beside a sculptural white base.",
      "The anti-aging cream jar is revealed with controlled silver highlights.",
      "Final frame holds a stable clinical-luxury product composition."
    ],
    cameraNotes: "Use a stable medium-close product angle with small macro cutaways for cream texture only.",
    lightingNotes: "Use clean white studio light with soft silver highlights and very restrained shadow.",
    motionNotes: "Use minimal reveal motion and subtle texture highlight movement; avoid floating ingredient clutter.",
    aspectRatio: "1:1 or 4:5",
    duration: "10-15 seconds",
    promptVariations: [
      "Shift to a cooler clinical blue-white palette while keeping the sculptural base.",
      "Add one mature skin-texture backdrop cue without making it busy.",
      "Use warmer gold packaging but keep the same restrained cream-jar layout."
    ],
    faqs: [
      {
        question: "Can I mention anti-aging directly?",
        answer: "You can in the creative prompt, but final ad copy should follow platform and regional beauty claim rules."
      },
      {
        question: "What visual elements communicate premium skincare?",
        answer: "Use restrained props, sharp label visibility, refined surfaces, and slow camera movement."
      }
    ],
    relatedSlugs: ["luxury-skincare-serum-ad", "glowing-skin-product-commercial", "minimalist-jewelry-campaign"]
  },
  {
    title: "Facial Cleanser TikTok Ad",
    slug: "facial-cleanser-tiktok-ad",
    category: "Beauty",
    useCase: "Short-form cleanser social ad",
    searchIntent: "facial cleanser TikTok ad prompt",
    shortDescription:
      "Use a bright aqua-white cleanser setup with airy foam, wet surfaces, and a vertical social-first product hero.",
    referenceImages: ["/assets/templates/glowing-skin-main.png", "/assets/templates/cleanser-main.png", "/assets/templates/anti-aging-main.png"],
    midjourneyPrompt: "facial cleanser tube centered in bright aqua white bathroom setup, airy foam, fresh wet surface highlights, clean vertical social ad framing, crisp product visibility, energetic but minimal skincare composition --ar 9:16 --v 6",
    runwayPrompt: "A cleanser tube snaps into a bright aqua-white frame as airy foam and small water highlights move around it. The motion stays vertical, quick, and clean, ending in a centered social-first product hero.",
    storyboardScenes: [
      "Aqua-white bathroom light and wet surface highlights establish a fresh cleanser mood.",
      "Airy foam moves around the cleanser tube as it snaps into the center frame.",
      "Final vertical hero keeps the product tube clear and social-ad ready."
    ],
    cameraNotes: "Use vertical center framing with close product readability and small foam texture cutaways.",
    lightingNotes: "Use bright bathroom daylight with crisp aqua reflections and clean white fill.",
    motionNotes: "Use quick but controlled pop-in motion, foam drift, and one snappy final lockup.",
    aspectRatio: "9:16",
    duration: "6-9 seconds",
    promptVariations: [
      "Make the bathroom setting more UGC but keep the same centered cleanser tube.",
      "Use a teen skincare routine tone without adding faces.",
      "Use a clinic-sink version with the same aqua-white cleanliness."
    ],
    faqs: [
      {
        question: "Is this better for Image Prompt or Runway?",
        answer: "Use the Image Prompt for the key visual and Runway for foam movement or quick vertical ad variations."
      },
      {
        question: "How do I make it feel less generic?",
        answer: "Add your product texture, packaging color, target user, and one specific routine moment."
      }
    ],
    relatedSlugs: ["glowing-skin-product-commercial", "ugc-ad-script", "restaurant-food-reel"]
  },
  {
    title: "Coffee Brand Ad",
    slug: "coffee-brand-ad",
    category: "Food",
    useCase: "Coffee product advertising",
    searchIntent: "coffee brand ad prompt",
    shortDescription:
      "Focus on a premium coffee bag beside a ceramic cup with steam, roasted beans, warm wood, and soft morning window light.",
    referenceImages: ["/assets/templates/matcha-main.png", "/assets/templates/coffee-main.png", "/assets/templates/chocolate-main.png"],
    midjourneyPrompt: "premium coffee bag beside ceramic cup on warm wooden surface, gentle steam rising, restrained roasted beans, soft morning window light, rich brown artisanal coffee advertising, packaging readable and centered --ar 4:5 --v 6",
    runwayPrompt: "Morning light moves gently across a warm wooden surface while a premium coffee bag and ceramic cup settle into frame. Steam rises subtly and the shot ends on a readable artisanal coffee hero pack.",
    storyboardScenes: [
      "Steam rises from the ceramic cup while warm morning light crosses the wooden surface.",
      "The premium coffee bag becomes the readable center beside restrained roasted beans.",
      "Final frame holds the coffee bag and cup as a calm morning ritual hero shot."
    ],
    cameraNotes: "Use a medium tabletop hero crop with the coffee bag readable and the cup slightly secondary.",
    lightingNotes: "Use warm side window light, soft shadows, and restrained highlights on packaging texture.",
    motionNotes: "Use subtle steam, slow dolly-in, and gentle light movement across wood grain.",
    aspectRatio: "4:5, 1:1, or 16:9",
    duration: "8-12 seconds",
    promptVariations: [
      "Make an iced coffee version while keeping packaging and cup as the main layout.",
      "Use a darker espresso-bar palette without overcrowding the beans.",
      "Add subscription box packaging while preserving the same morning tabletop composition."
    ],
    faqs: [
      {
        question: "Can this be used for ecommerce images?",
        answer: "Yes. Keep the packaging front-facing and reduce steam if you need a cleaner marketplace image."
      },
      {
        question: "How can I show flavor notes?",
        answer: "Add props such as chocolate, berries, citrus peel, or nuts based on the roast profile."
      }
    ],
    relatedSlugs: ["matcha-latte-commercial", "chocolate-bar-product-shot", "ecommerce-hero-shot"]
  },
  {
    title: "Matcha Latte Commercial",
    slug: "matcha-latte-commercial",
    category: "Food",
    useCase: "Beverage launch or cafe social video",
    searchIntent: "matcha latte commercial prompt",
    shortDescription:
      "Center the visual on a clear glass matcha latte with creamy swirl, bamboo whisk detail, and calm premium tea styling.",
    referenceImages: ["/assets/templates/coffee-main.png", "/assets/templates/matcha-main.png", "/assets/templates/healthy-snack-main.png"],
    midjourneyPrompt: "clear glass matcha latte with creamy milk swirl, bamboo whisk nearby, soft green powder texture, calm premium tea table styling, fresh natural light, minimalist beverage advertising, serene centered composition --ar 4:5 --v 6",
    runwayPrompt: "Milk pours gently into vivid matcha inside a clear glass while a bamboo whisk and powder remain softly in the background. The motion stays calm and elegant, ending on a serene premium beverage hero frame.",
    storyboardScenes: [
      "Soft green powder and bamboo whisk establish the tea-table setting.",
      "Milk forms a creamy swirl inside the clear glass matcha latte.",
      "Final frame holds a serene premium beverage composition with clean negative space."
    ],
    cameraNotes: "Use close tabletop framing with the clear glass dominant and bamboo whisk secondary.",
    lightingNotes: "Use soft natural cafe light with clean green reflections and gentle white fill.",
    motionNotes: "Use slow pour motion and swirl formation; avoid fast cafe montage cuts.",
    aspectRatio: "9:16 or 4:5",
    duration: "7-12 seconds",
    promptVariations: [
      "Make it iced matcha with condensation while preserving the clear glass hero.",
      "Use a minimalist Japanese tea room table without adding extra props.",
      "Add oat milk positioning while keeping the same green-white swirl focus."
    ],
    faqs: [
      {
        question: "How can I make the matcha color vivid?",
        answer: "Specify ceremonial-grade green, soft white background, and strong color contrast."
      },
      {
        question: "Is this suitable for a cafe reel?",
        answer: "Yes. The pour and swirl scenes are ideal for short vertical social content."
      }
    ],
    relatedSlugs: ["coffee-brand-ad", "restaurant-food-reel", "healthy-snack-promo"]
  },
  {
    title: "Chocolate Bar Product Shot",
    slug: "chocolate-bar-product-shot",
    category: "Food",
    useCase: "Packaged food ecommerce and ad visual",
    searchIntent: "chocolate bar product shot prompt",
    shortDescription:
      "Use a deep, indulgent composition with premium chocolate packaging, broken pieces, cocoa dust, and glossy dark texture.",
    referenceImages: ["/assets/templates/coffee-main.png", "/assets/templates/chocolate-main.png", "/assets/templates/healthy-snack-main.png"],
    midjourneyPrompt: "premium chocolate packaging with broken dark chocolate pieces, controlled cocoa dust, glossy rich texture, warm moody studio light, indulgent confectionery advertising, packaging readable, deep premium composition --ar 4:5 --v 6",
    runwayPrompt: "Broken chocolate pieces catch warm moody light beside premium packaging while a light cocoa dust drift adds texture. Motion stays slow and indulgent, ending on a glossy readable confectionery hero shot.",
    storyboardScenes: [
      "Glossy chocolate texture and broken pieces appear under warm moody light.",
      "Premium chocolate packaging slides into the readable hero position.",
      "Final frame balances packaging, broken pieces, and controlled cocoa dust."
    ],
    cameraNotes: "Use a low medium product angle with macro texture cutaways kept close to the package.",
    lightingNotes: "Use warm moody studio light with glossy highlights and soft dark shadows.",
    motionNotes: "Use slow slide motion and a light cocoa dust drift; keep the product readable.",
    aspectRatio: "4:5 or 1:1",
    duration: "8-10 seconds",
    promptVariations: [
      "Use milk chocolate with a brighter warm background but the same package-led composition.",
      "Add almonds or sea salt as restrained accents near the broken pieces.",
      "Use a clean ecommerce version while keeping the chocolate texture visible."
    ],
    faqs: [
      {
        question: "Can I use this for Amazon-style product content?",
        answer: "Yes, but use the clean ecommerce variation and keep claims off the image unless approved."
      },
      {
        question: "How do I make it feel premium?",
        answer: "Use dark tones, restrained props, glossy texture, and precise package alignment."
      }
    ],
    relatedSlugs: ["coffee-brand-ad", "healthy-snack-promo", "black-friday-ad"]
  },
  {
    title: "Healthy Snack Promo",
    slug: "healthy-snack-promo",
    category: "Food",
    useCase: "Better-for-you snack campaign",
    searchIntent: "healthy snack promo prompt",
    shortDescription:
      "Keep the snack pouch as the clear hero, with bright natural light, pastel-clean background, and restrained healthy ingredients around it.",
    referenceImages: ["/assets/templates/matcha-main.png", "/assets/templates/healthy-snack-main.png", "/assets/templates/restaurant-main.png"],
    midjourneyPrompt: "healthy snack pouch centered on clean pastel background, restrained nuts oats and fruit pieces around pack, bright natural light, active lifestyle food advertising, fresh and uncluttered composition, packaging highly readable --ar 4:5 --v 6",
    runwayPrompt: "A healthy snack pouch rises into a bright pastel-clean frame while a few oats, nuts, and fruit pieces settle around it. Motion stays light and tidy, keeping the pack as the clear healthy-product hero.",
    storyboardScenes: [
      "A few clean ingredients settle onto a bright pastel surface.",
      "The snack pouch rises into a front-facing centered hero position.",
      "Final frame keeps the pouch dominant with ingredients arranged as support only."
    ],
    cameraNotes: "Use front-facing pack framing with limited top-down ingredient detail.",
    lightingNotes: "Use bright natural light, soft pastel bounce, and minimal shadow clutter.",
    motionNotes: "Use gentle ingredient settling and a light pack reveal; avoid chaotic scatter motion.",
    aspectRatio: "4:5 or 9:16",
    duration: "6-10 seconds",
    promptVariations: [
      "Make it post-workout by adding one gym-adjacent prop while keeping the pouch dominant.",
      "Create a kids lunchbox version with restrained color accents.",
      "Use premium organic grocery styling with the same clean pack-centered layout."
    ],
    faqs: [
      {
        question: "Can this prompt support different ingredients?",
        answer: "Yes. Swap the ingredient list for the actual snack components."
      },
      {
        question: "How do I avoid a cluttered image?",
        answer: "Limit props to three or four ingredients and keep the pack centered."
      }
    ],
    relatedSlugs: ["restaurant-food-reel", "matcha-latte-commercial", "seasonal-sale-campaign"]
  },
  {
    title: "Restaurant Food Reel",
    slug: "restaurant-food-reel",
    category: "Food",
    useCase: "Restaurant short-form social content",
    searchIntent: "restaurant food reel prompt",
    shortDescription:
      "Anchor the scene on one plated signature dish with warm restaurant blur, rich surface texture, and appetizing garnish detail.",
    referenceImages: ["/assets/templates/coffee-main.png", "/assets/templates/restaurant-main.png", "/assets/templates/matcha-main.png"],
    midjourneyPrompt: "single plated signature dish in warm restaurant setting, soft dining room bokeh, rich food texture, garnish detail, appetizing premium restaurant advertising, cinematic close framing, no clutter, dish remains dominant --ar 9:16 --v 6",
    runwayPrompt: "Warm dining-room blur frames a single plated dish while garnish and surface texture catch the light. The camera moves in gently with appetizing detail, ending on a clear hero plate in restaurant ambience.",
    storyboardScenes: [
      "Warm restaurant bokeh establishes atmosphere behind the plate.",
      "The plated signature dish receives a precise garnish or sauce detail.",
      "Final vertical frame holds the dish as the appetizing hero shot."
    ],
    cameraNotes: "Use close vertical framing with shallow depth of field and the dish dominant.",
    lightingNotes: "Use warm practical restaurant light with appetizing highlights on texture and sauce.",
    motionNotes: "Use a gentle push-in and small garnish or steam motion; avoid kitchen montage cuts.",
    aspectRatio: "9:16",
    duration: "8-15 seconds",
    promptVariations: [
      "Make it fine-dining with more negative space and softer highlights.",
      "Make it casual street-food while preserving the single plated hero frame.",
      "Add a behind-the-scenes hint only as a supporting cutaway, not the main frame."
    ],
    faqs: [
      {
        question: "Is this good for local restaurant marketing?",
        answer: "Yes. Add cuisine type, dish name, neighborhood, and one offer or reservation cue."
      },
      {
        question: "What shots make food reels perform well?",
        answer: "Plating, sauce pours, steam, texture close-ups, and a clear final dish frame."
      }
    ],
    relatedSlugs: ["matcha-latte-commercial", "coffee-brand-ad", "ugc-ad-script"]
  },
  {
    title: "Luxury Perfume Ad",
    slug: "luxury-perfume-ad",
    category: "Fashion",
    useCase: "Fragrance launch campaign",
    searchIntent: "luxury perfume ad prompt",
    shortDescription:
      "Build the frame around one elegant perfume bottle with mist, glossy reflections, and a restrained high-fashion luxury mood.",
    referenceImages: ["/assets/templates/jewelry-main.png", "/assets/templates/perfume-main.png", "/assets/templates/handbag-main.png"],
    midjourneyPrompt: "single luxury perfume bottle on reflective dark surface, soft mist, controlled gold rim highlights, restrained sculptural floral accent, elegant negative space, premium fragrance hero advertising --ar 4:5 --v 6",
    runwayPrompt: "A single perfume bottle settles on a reflective dark surface as soft mist drifts behind it and controlled gold highlights trace the glass. The motion stays minimal and luxurious, ending on a restrained fragrance hero frame.",
    storyboardScenes: [
      "Soft mist moves behind a reflective dark surface.",
      "The perfume bottle catches controlled gold rim highlights.",
      "Final frame holds the single bottle with restrained floral support and negative space."
    ],
    cameraNotes: "Use a centered bottle reveal with close glass-edge cutaways and controlled reflection lines.",
    lightingNotes: "Use low-key studio light with gold rim highlights and carefully controlled glass reflections.",
    motionNotes: "Use slow mist drift and minimal camera glide; keep the bottle static and premium.",
    aspectRatio: "4:5 or 16:9",
    duration: "10-15 seconds",
    promptVariations: [
      "Use fresh white florals while keeping the same reflective bottle composition.",
      "Use a red velvet evening palette but preserve the single-bottle hero frame.",
      "Use subtle water ripple reflection without adding extra objects."
    ],
    faqs: [
      {
        question: "Can this template fit a fashion brand?",
        answer: "Yes. It is designed for fragrance, luxury, and fashion-adjacent brand storytelling."
      },
      {
        question: "How do I make the bottle look more expensive?",
        answer: "Use heavier glass, precise highlights, minimal props, and a reflective premium surface."
      }
    ],
    relatedSlugs: ["minimalist-jewelry-campaign", "handbag-product-ad", "luxury-skincare-serum-ad"]
  },
  {
    title: "Minimalist Jewelry Campaign",
    slug: "minimalist-jewelry-campaign",
    category: "Fashion",
    useCase: "Jewelry campaign hero visuals",
    searchIntent: "minimalist jewelry campaign prompt",
    shortDescription:
      "Use a clean stone-and-shadow setup with delicate jewelry, warm neutral tones, and refined editorial restraint.",
    referenceImages: ["/assets/templates/perfume-main.png", "/assets/templates/jewelry-main.png", "/assets/templates/handbag-main.png"],
    midjourneyPrompt: "minimalist jewelry on soft stone pedestal, warm beige and cream palette, controlled shadow falloff, delicate gold detail, luxury editorial accessory advertising, sparse composition, highly refined product focus --ar 4:5 --v 6",
    runwayPrompt: "Soft shadow moves lightly across a stone pedestal while delicate jewelry catches a precise warm highlight. Motion remains minimal and editorial, ending with a refined centered jewelry hero frame.",
    storyboardScenes: [
      "Warm neutral stone and soft shadow establish the minimalist jewelry setting.",
      "Delicate gold details catch a small controlled sparkle.",
      "Final frame holds sparse composition with refined editorial restraint."
    ],
    cameraNotes: "Use macro-to-medium framing, keeping one jewelry grouping clear rather than overcrowded.",
    lightingNotes: "Use warm soft light with tiny controlled sparkle highlights and gentle shadow falloff.",
    motionNotes: "Use a slow pan and subtle glint movement only.",
    aspectRatio: "4:5 or 1:1",
    duration: "6-10 seconds",
    promptVariations: [
      "Use silver jewelry with cool grey stone while keeping the sparse composition.",
      "Create a bridal version with softer cream tones and the same pedestal logic.",
      "Add a hand detail only as a supporting texture, not a busy lifestyle scene."
    ],
    faqs: [
      {
        question: "Can I use this for product listing images?",
        answer: "Yes. For listings, use a cleaner background and keep the jewelry shape very readable."
      },
      {
        question: "What should I avoid?",
        answer: "Avoid busy props and harsh sparkle that distracts from the jewelry design."
      }
    ],
    relatedSlugs: ["luxury-perfume-ad", "fashion-lookbook-reel", "handbag-product-ad"]
  },
  {
    title: "Streetwear Drop Promo",
    slug: "streetwear-drop-promo",
    category: "Fashion",
    useCase: "Limited drop launch content",
    searchIntent: "streetwear drop promo prompt",
    shortDescription:
      "Emphasize structured streetwear pieces, concrete texture, directional shadows, and a limited-drop fashion attitude.",
    referenceImages: ["/assets/templates/lookbook-main.png", "/assets/templates/streetwear-main.png", "/assets/templates/handbag-main.png"],
    midjourneyPrompt: "streetwear pieces styled against concrete texture, directional shadows, dark neutral palette with one accent tone, limited drop fashion campaign, structured apparel focus, modern urban composition --ar 4:5 --v 6",
    runwayPrompt: "Directional light cuts across concrete texture while structured streetwear pieces settle into a confident campaign frame. Motion stays sharp and limited, ending on a drop-ready urban fashion hero composition.",
    storyboardScenes: [
      "Concrete texture and directional shadow set a limited-drop mood.",
      "Structured streetwear pieces lock into a bold campaign composition.",
      "Final frame holds dark neutral styling with one accent tone and clear apparel focus."
    ],
    cameraNotes: "Use a strong mid-frame crop that shows silhouette, fabric weight, and drop styling.",
    lightingNotes: "Use directional hard-edged shadow with controlled contrast and one accent color.",
    motionNotes: "Use sharp but limited motion: light sweep, fabric settling, and final lockup.",
    aspectRatio: "9:16",
    duration: "6-12 seconds",
    promptVariations: [
      "Use a darker underground palette while preserving the concrete-shadow composition.",
      "Add one sneaker or cap accent without moving focus away from apparel.",
      "Use a cleaner studio drop version with the same structured silhouette."
    ],
    faqs: [
      {
        question: "How do I include launch urgency?",
        answer: "Add visual space for drop date, limited quantity, and a direct call to action."
      },
      {
        question: "Can this work without a model?",
        answer: "Yes. Use a hanging garment, folded apparel stack, or mannequin with bold lighting."
      }
    ],
    relatedSlugs: ["fashion-lookbook-reel", "product-launch-teaser", "black-friday-ad"]
  },
  {
    title: "Handbag Product Ad",
    slug: "handbag-product-ad",
    category: "Fashion",
    useCase: "Accessory product campaign",
    searchIntent: "handbag product ad prompt",
    shortDescription:
      "Keep one elegant handbag dominant against a soft gradient backdrop with polished leather texture and luxury accessory lighting.",
    referenceImages: ["/assets/templates/jewelry-main.png", "/assets/templates/handbag-main.png", "/assets/templates/lookbook-main.png"],
    midjourneyPrompt: "single elegant handbag on soft gradient backdrop, polished leather texture, refined metal hardware highlights, luxury accessory campaign lighting, minimal premium composition, bag fully dominant and cleanly framed --ar 4:5 --v 6",
    runwayPrompt: "A luxury handbag settles into a soft gradient frame while light traces along the leather texture and metal hardware. Motion stays restrained and premium, ending on a clean accessory hero shot.",
    storyboardScenes: [
      "Soft gradient backdrop reveals the handbag silhouette.",
      "Light traces the leather texture and metal hardware details.",
      "Final frame holds the handbag as the single dominant product hero."
    ],
    cameraNotes: "Use a medium accessory crop with the bag centered and hardware detail readable.",
    lightingNotes: "Use soft luxury gradient lighting with small controlled highlights on metal and leather.",
    motionNotes: "Use a slow reveal and subtle highlight sweep; keep the handbag still and dominant.",
    aspectRatio: "4:5 or 1:1",
    duration: "8-12 seconds",
    promptVariations: [
      "Use black leather on a warmer beige gradient while keeping the same product-only frame.",
      "Use a brighter spring colorway with unchanged hardware highlight logic.",
      "Add a pedestal base without turning it into a lifestyle scene."
    ],
    faqs: [
      {
        question: "How do I show material quality?",
        answer: "Include macro leather grain, stitching, hardware reflections, and clean lighting."
      },
      {
        question: "Can this work for marketplace listings?",
        answer: "Yes. Use a simple background and clear front-facing angles for ecommerce."
      }
    ],
    relatedSlugs: ["luxury-perfume-ad", "minimalist-jewelry-campaign", "ecommerce-hero-shot"]
  },
  {
    title: "Fashion Lookbook Reel",
    slug: "fashion-lookbook-reel",
    category: "Fashion",
    useCase: "Seasonal fashion lookbook video",
    searchIntent: "fashion lookbook reel prompt",
    shortDescription:
      "Use clean editorial styling with one clear fashion subject, soft drape, neutral tones, and lookbook-grade polish.",
    referenceImages: ["/assets/templates/streetwear-main.png", "/assets/templates/lookbook-main.png", "/assets/templates/handbag-main.png"],
    midjourneyPrompt: "clean fashion lookbook composition, neutral studio palette, soft drape and garment texture, editorial lighting, modern premium styling, strong subject separation, polished seasonal campaign frame --ar 4:5 --v 6",
    runwayPrompt: "Soft editorial light moves across garment drape and texture while the fashion subject remains cleanly separated from the background. Motion is minimal and lookbook-like, ending on a polished fashion campaign frame.",
    storyboardScenes: [
      "Neutral studio palette and garment drape establish the lookbook mood.",
      "Fabric texture catches soft editorial light as the subject holds a clean pose.",
      "Final frame locks into a polished seasonal lookbook composition."
    ],
    cameraNotes: "Use a clean editorial crop with strong subject separation and visible garment texture.",
    lightingNotes: "Use soft studio lighting with gentle falloff across fabric and neutral background.",
    motionNotes: "Use subtle pose change, fabric movement, and slow editorial camera drift.",
    aspectRatio: "9:16",
    duration: "10-20 seconds",
    promptVariations: [
      "Use a warmer beige studio palette with the same lookbook structure.",
      "Make it sharper and more high-fashion without adding street background.",
      "Use a seasonal capsule wardrobe version with consistent neutral styling."
    ],
    faqs: [
      {
        question: "How many outfits should I include?",
        answer: "For a short ad, three to five looks usually keeps the reel focused."
      },
      {
        question: "Can this be used for paid social?",
        answer: "Yes. Add a sharper opening hook and final call-to-action frame."
      }
    ],
    relatedSlugs: ["streetwear-drop-promo", "minimalist-jewelry-campaign", "seasonal-sale-campaign"]
  },
  {
    title: "Product Launch Teaser",
    slug: "product-launch-teaser",
    category: "General",
    useCase: "Pre-launch campaign teaser",
    searchIntent: "product launch teaser prompt",
    shortDescription:
      "Create a restrained teaser frame with partial reveal, soft gradients, shadowed product edges, and suspenseful campaign polish.",
    referenceImages: ["/assets/templates/ecommerce-hero-main.png", "/assets/templates/launch-teaser-main.png", "/assets/templates/black-friday-main.png"],
    midjourneyPrompt: "partial product reveal on soft gradient backdrop, controlled shadow edges, minimal pedestal, campaign teaser lighting, suspenseful premium direct-to-consumer launch visual, clean negative space --ar 16:9 --v 6",
    runwayPrompt: "A product silhouette emerges slowly from soft gradient light while edges stay partially hidden in shadow. Motion remains minimal and suspenseful, ending on a restrained launch-teaser frame with clear anticipation.",
    storyboardScenes: [
      "Soft gradient light reveals only the product silhouette edge.",
      "A narrow highlight traces the partial product form without showing everything.",
      "Final frame holds suspenseful negative space for launch copy."
    ],
    cameraNotes: "Use a wide restrained crop with partial product visibility and clean copy space.",
    lightingNotes: "Use controlled shadow edges, soft gradient backlight, and one reveal highlight.",
    motionNotes: "Use slow light sweep and partial reveal; avoid fully exposing the product too early.",
    aspectRatio: "16:9, 4:5, or 9:16",
    duration: "6-12 seconds",
    promptVariations: [
      "Use a darker premium teaser palette with the same partial silhouette logic.",
      "Add one material close-up as a supporting cue while preserving mystery.",
      "Use a brighter DTC launch version with clean negative space."
    ],
    faqs: [
      {
        question: "What products fit this template?",
        answer: "It works for consumer goods, SaaS feature reveals, fashion drops, and ecommerce launches."
      },
      {
        question: "How much should the teaser reveal?",
        answer: "Show enough shape or texture to create curiosity without giving away the full product."
      }
    ],
    relatedSlugs: ["streetwear-drop-promo", "ecommerce-hero-shot", "black-friday-ad"]
  },
  {
    title: "Ecommerce Hero Shot",
    slug: "ecommerce-hero-shot",
    category: "General",
    useCase: "Online store hero image",
    searchIntent: "ecommerce hero shot prompt",
    shortDescription:
      "Prioritize a front-facing product hero with readable packaging, soft gradient background, elegant shadow, and conversion-ready spacing.",
    referenceImages: ["/assets/templates/launch-teaser-main.png", "/assets/templates/ecommerce-hero-main.png", "/assets/templates/seasonal-sale-main.png"],
    midjourneyPrompt: "front-facing product packaging centered on soft gradient background, readable label, elegant commercial shadow, conversion-focused ecommerce hero visual, clean direct-to-consumer composition, strong negative space for copy --ar 16:9 --v 6",
    runwayPrompt: "The product settles front-facing into a soft gradient hero frame while light stays even and label readability remains high. Motion is minimal, preserving a conversion-ready ecommerce header composition.",
    storyboardScenes: [
      "Soft gradient background and clean shadow establish the ecommerce hero layout.",
      "Front-facing product packaging settles into the center with label readability.",
      "Final wide frame preserves negative space for headline and CTA."
    ],
    cameraNotes: "Use a wide hero crop with product centered or slightly offset and copy space protected.",
    lightingNotes: "Use even commercial lighting, soft gradient background, and a clean grounding shadow.",
    motionNotes: "Use very minimal product settle and light movement; preserve conversion clarity.",
    aspectRatio: "16:9 for website hero, 4:5 for social",
    duration: "6-10 seconds",
    promptVariations: [
      "Move the product left to create stronger right-side copy space.",
      "Use a white marketplace-safe version with the same front-facing label clarity.",
      "Use a richer gradient while keeping the ecommerce hero structure unchanged."
    ],
    faqs: [
      {
        question: "Why is label readability important?",
        answer: "Ecommerce hero images need instant product recognition and trust, especially above the fold."
      },
      {
        question: "Can this template work for any category?",
        answer: "Yes. Replace the product type, props, and color palette for your category."
      }
    ],
    relatedSlugs: ["product-launch-teaser", "luxury-skincare-serum-ad", "coffee-brand-ad"]
  },
  {
    title: "UGC Ad Script",
    slug: "ugc-ad-script",
    category: "General",
    useCase: "Creator-style ad concept",
    searchIntent: "UGC ad script prompt",
    shortDescription:
      "Use an authentic creator-style setup with soft home light, natural product handling, and a believable social ad environment.",
    referenceImages: ["/assets/templates/ecommerce-hero-main.png", "/assets/templates/ugc-main.png", "/assets/templates/launch-teaser-main.png"],
    midjourneyPrompt: "creator-style tabletop or home setup, natural window light, product held or placed nearby, authentic social ad mood, clean but believable environment, no polished studio feel, practical UGC composition --ar 9:16 --v 6",
    runwayPrompt: "Natural home light falls across a creator-style setup as the product is handled in a believable social-ad environment. Motion stays handheld and authentic, ending on a clear product-and-proof frame.",
    storyboardScenes: [
      "Natural window light reveals a believable home tabletop setup.",
      "A hand or creator-style cue brings the product into practical use.",
      "Final frame holds product proof or result cue without feeling overproduced."
    ],
    cameraNotes: "Use vertical handheld framing with controlled home background and clear product visibility.",
    lightingNotes: "Use natural window light, soft shadows, and no overly polished studio reflections.",
    motionNotes: "Use small handheld movement, quick proof cut, and direct product focus.",
    aspectRatio: "9:16",
    duration: "15-30 seconds",
    promptVariations: [
      "Make it founder-led with the same home-light product setup.",
      "Use testimonial energy while keeping the environment natural.",
      "Use a problem-solution demo frame without adding excessive props."
    ],
    faqs: [
      {
        question: "Does this generate a full script?",
        answer: "It provides a scene structure that can be expanded into creator dialogue and shot direction."
      },
      {
        question: "What makes UGC feel authentic?",
        answer: "Natural lighting, specific product details, a real problem, and direct creator delivery."
      }
    ],
    relatedSlugs: ["facial-cleanser-tiktok-ad", "restaurant-food-reel", "healthy-snack-promo"]
  },
  {
    title: "Black Friday Ad",
    slug: "black-friday-ad",
    category: "General",
    useCase: "Promotional sale campaign",
    searchIntent: "Black Friday ad prompt",
    shortDescription:
      "Center the product in a dark high-contrast sale composition with strong promotional energy and clean space for offer messaging.",
    referenceImages: ["/assets/templates/ecommerce-hero-main.png", "/assets/templates/black-friday-main.png", "/assets/templates/seasonal-sale-main.png"],
    midjourneyPrompt: "product centered on dark high-contrast gradient background, strong sale composition, black and gold or monochrome promotional lighting, clean typography space, premium Black Friday ecommerce advertising --ar 4:5 --v 6",
    runwayPrompt: "High-contrast sale lighting appears first, then the product locks into the center of a dark promotional frame. Motion is fast but controlled, ending on a premium Black Friday hero with strong offer space.",
    storyboardScenes: [
      "Dark high-contrast gradient establishes the Black Friday sale mood.",
      "Product locks into the center with strong offer space around it.",
      "Final frame holds a premium promotional layout ready for discount copy."
    ],
    cameraNotes: "Use centered product framing with protected typography areas and strong contrast.",
    lightingNotes: "Use black-gold or monochrome sale lighting with bright controlled accent highlights.",
    motionNotes: "Use fast controlled entrance and final lockup, not chaotic sale animation.",
    aspectRatio: "4:5, 1:1, or 9:16",
    duration: "6-10 seconds",
    promptVariations: [
      "Use a cleaner Cyber Monday white version with the same offer-space structure.",
      "Make it luxury and restrained with fewer accents.",
      "Add bundle cues while keeping the product and offer area dominant."
    ],
    faqs: [
      {
        question: "Can this template include discount text?",
        answer: "Yes. Leave space for verified discount, deadline, and call to action."
      },
      {
        question: "How do I keep the creative premium?",
        answer: "Limit the color palette, use clean typography areas, and keep the product dominant."
      }
    ],
    relatedSlugs: ["seasonal-sale-campaign", "product-launch-teaser", "chocolate-bar-product-shot"]
  },
  {
    title: "Seasonal Sale Campaign",
    slug: "seasonal-sale-campaign",
    category: "General",
    useCase: "Holiday or seasonal promotion",
    searchIntent: "seasonal sale campaign prompt",
    shortDescription:
      "Build a clean seasonal promotion frame with product-first composition, soft festive accents, and polished ecommerce campaign balance.",
    referenceImages: ["/assets/templates/black-friday-main.png", "/assets/templates/seasonal-sale-main.png", "/assets/templates/launch-teaser-main.png"],
    midjourneyPrompt: "product-first seasonal promotion setup, soft festive accents, clean gradient background, polished ecommerce lighting, restrained seasonal props, balanced sale composition, premium campaign look --ar 4:5 --v 6",
    runwayPrompt: "Soft seasonal accents enter around a product-first composition while warm promotional light keeps the product dominant. Motion stays smooth and gentle, ending on a balanced seasonal-sale hero frame.",
    storyboardScenes: [
      "Soft seasonal accents establish a promotional mood without crowding the product.",
      "The product becomes the clear center of the seasonal sale frame.",
      "Final composition holds balanced copy space for offer, date, and CTA."
    ],
    cameraNotes: "Use product-first framing with restrained props around the edges and clear campaign space.",
    lightingNotes: "Use warm polished ecommerce light with subtle festive color accents.",
    motionNotes: "Use gentle prop movement and smooth product reveal; avoid busy holiday animation.",
    aspectRatio: "4:5, 9:16, or 16:9",
    duration: "8-15 seconds",
    promptVariations: [
      "Make it spring pastel while preserving the product-first structure.",
      "Make it winter gift-guide style with restrained festive props.",
      "Make it summer sale with brighter light and the same clean layout."
    ],
    faqs: [
      {
        question: "Can this work beyond holidays?",
        answer: "Yes. Use it for seasonal launches, gift guides, clearance events, and limited-time offers."
      },
      {
        question: "How do I avoid generic holiday visuals?",
        answer: "Use category-specific props and keep your product story at the center."
      }
    ],
    relatedSlugs: ["black-friday-ad", "sunscreen-summer-campaign", "fashion-lookbook-reel"]
  }
];

export const templates: PromptTemplate[] = templateSeeds.map(withPrimaryReference);

export const categories: TemplateCategory[] = ["Beauty", "Food", "Fashion", "General"];

export const primaryCategories: TemplateCategory[] = ["Beauty", "Food", "Fashion"];
