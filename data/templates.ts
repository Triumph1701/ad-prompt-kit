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
  "Use the main reference image as the visual anchor. Treat the other reference images only as supporting cues for texture, props, or framing.";

const categoryReferenceImage: Record<TemplateCategory, string> = {
  Beauty: "/assets/templates/beauty-reference.svg",
  Food: "/assets/templates/food-reference.svg",
  Fashion: "/assets/templates/fashion-reference.svg",
  General: "/assets/templates/general-reference.svg"
};

const assetTriplet = (
  category: TemplateCategory,
  mainReferenceImage = categoryReferenceImage[category]
) => [
  categoryReferenceImage[category],
  mainReferenceImage,
  categoryReferenceImage[category]
];

const template = (seed: TemplateSeed): PromptTemplate => ({
  ...seed,
  primaryReferenceImageIndex: 1,
  shortDescription: `${seed.shortDescription} The visual direction is guided by the main reference image.`,
  midjourneyPrompt: `${primaryReferenceCopy} ${seed.midjourneyPrompt}`,
  runwayPrompt: `${primaryReferenceCopy} ${seed.runwayPrompt}`,
  storyboardScenes: seed.storyboardScenes.map(
    (scene) => `${scene} Keep the frame aligned with the main reference image.`
  ),
  cameraNotes: `Use the main reference image for angle, crop, and subject hierarchy. ${seed.cameraNotes}`,
  lightingNotes: `Match the lighting logic of the main reference image first. ${seed.lightingNotes}`,
  motionNotes: `Keep motion choices consistent with the main reference image. ${seed.motionNotes}`,
  promptVariations: seed.promptVariations.map(
    (variation) => `${variation} Keep the main reference image as the visual anchor.`
  ),
  faqs: [
    ...seed.faqs,
    {
      question: "How should I use the reference images?",
      answer:
        "Use the main reference image for composition, lighting, palette, and product focus. Use the other reference images as secondary support."
    }
  ]
});

const templateSeeds: TemplateSeed[] = [
  // Beauty (15)
  {
    title: "Luxury Skincare Serum Ad",
    slug: "luxury-skincare-serum-ad",
    category: "Beauty",
    useCase: "Premium skincare product campaign",
    searchIntent: "luxury skincare serum ad prompt",
    shortDescription:
      "Create a premium skincare hero with glossy glass reflections, a clean pedestal setup, and elegant editorial restraint.",
    referenceImages: [
      categoryReferenceImage.Beauty,
      "/assets/templates/luxury-serum-main.png",
      categoryReferenceImage.Beauty
    ],
    midjourneyPrompt:
      "luxury skincare serum bottle on translucent pedestal, pearl gradient background, glossy glass reflections, crisp label area without readable brand text, premium beauty editorial photography, clean negative space, polished cosmetic hero shot --ar 4:5 --v 6",
    runwayPrompt:
      "Pearl light moves across a luxury serum bottle on a translucent pedestal. Controlled glass reflections reveal the bottle shape while the camera slowly pushes into a premium skincare hero finish.",
    storyboardScenes: [
      "A pearl gradient background establishes a polished skincare setting.",
      "The serum bottle becomes central as controlled reflections glide across the glass.",
      "The final hero frame leaves elegant negative space for headline and offer copy."
    ],
    cameraNotes:
      "Use a centered hero crop with shallow depth of field, clear bottle silhouette, and controlled label area.",
    lightingNotes:
      "Use soft pearl lighting, clean rim highlights, and carefully controlled glass reflections.",
    motionNotes:
      "Use a slow push-in with subtle reflection movement only; avoid distracting particles.",
    aspectRatio: "4:5, 1:1, or 16:9",
    duration: "8-12 seconds",
    promptVariations: [
      "Switch the pearl gradient to a cooler clinic-blue luxury finish.",
      "Add one restrained botanical prop near the pedestal base.",
      "Use darker luxury contrast while preserving clean negative space."
    ],
    faqs: [
      {
        question: "What makes this useful for beauty ads?",
        answer:
          "It keeps the product label clean, premium, and ad-ready while preserving a high-end beauty mood."
      },
      {
        question: "Is this better for still images or motion?",
        answer:
          "It works well as an Image Prompt first, then adapts cleanly into a short Runway reveal."
      }
    ],
    relatedSlugs: ["glowing-skin-product-commercial", "anti-aging-cream-promo", "skincare-bundle-offer"]
  },
  {
    title: "Sunscreen Summer Campaign",
    slug: "sunscreen-summer-campaign",
    category: "Beauty",
    useCase: "Seasonal SPF campaign",
    searchIntent: "sunscreen summer campaign prompt",
    shortDescription:
      "Build a bright SPF campaign with warm sand, clean beach light, and a front-facing product hero designed for summer conversion.",
    referenceImages: [
      categoryReferenceImage.Beauty,
      "/assets/templates/sunscreen-main.png",
      categoryReferenceImage.Beauty
    ],
    midjourneyPrompt:
      "front-facing sunscreen tube on warm sand, ocean blur background, bright natural sunlight, subtle citrus support, clean SPF summer skincare advertising, readable label area without brand text, premium seasonal product hero --ar 4:5 --v 6",
    runwayPrompt:
      "Warm beach light and ocean blur establish a summer SPF setting as the sunscreen tube settles front and center. Tiny sunlight flickers stay behind the product while the camera gently pushes toward the tube.",
    storyboardScenes: [
      "Sunlit sand and ocean blur establish a clean summer SPF setting.",
      "The sunscreen tube becomes front-facing and centered with clear packaging hierarchy.",
      "The final frame holds a product-first summer hero with space for campaign copy."
    ],
    cameraNotes:
      "Use low product-level framing and keep the tube front-facing for immediate product clarity.",
    lightingNotes:
      "Use bright natural sunlight with soft bounce on the tube and warm beach highlights.",
    motionNotes:
      "Use a slow push-in with delicate background sparkle; keep the product stable.",
    aspectRatio: "4:5 or 9:16",
    duration: "8-15 seconds",
    promptVariations: [
      "Move the scene from warm sand to poolside tile while preserving label clarity.",
      "Use a sportier outdoor version with cleaner shadows and sharper light.",
      "Create a family-safe summer version without adding faces."
    ],
    faqs: [
      {
        question: "What helps sunscreen creatives convert?",
        answer:
          "A clear front-facing tube, simple seasonal cues, and visible product hierarchy usually outperform crowded summer props."
      },
      {
        question: "Can I reuse this for Meta and TikTok?",
        answer:
          "Yes. It adapts well to static social ads and short vertical summer video concepts."
      }
    ],
    relatedSlugs: ["seasonal-sale-campaign", "meta-beauty-retargeting-ad", "beauty-ugc-routine-ad"]
  },
  {
    title: "Anti-Aging Cream Promo",
    slug: "anti-aging-cream-promo",
    category: "Beauty",
    useCase: "Benefit-led skincare promotion",
    searchIntent: "anti-aging cream ad prompt",
    shortDescription:
      "Show a mature premium cream jar with sculptural surfaces, soft silver accents, and a restrained clinic-luxury finish.",
    referenceImages: [
      categoryReferenceImage.Beauty,
      "/assets/templates/anti-aging-main.png",
      categoryReferenceImage.Beauty
    ],
    midjourneyPrompt:
      "premium anti-aging cream jar on sculptural white base, soft silver accents, smooth cream texture, refined clinical luxury skincare scene, clean studio composition, mature premium cosmetic advertising --ar 4:5 --v 6",
    runwayPrompt:
      "A refined cream jar appears on a sculptural white base while silver highlights move softly across the lid and glass. Motion stays minimal and premium until the clinical-luxury hero frame locks in.",
    storyboardScenes: [
      "A sculptural white surface and cream texture establish a clinical-luxury mood.",
      "The jar is revealed with restrained silver highlights and clean product focus.",
      "The final frame holds a mature premium cream composition with copy space."
    ],
    cameraNotes:
      "Use a medium-close hero crop with one macro insert for cream texture and lid detail.",
    lightingNotes:
      "Use clean studio light with cool silver accents and restrained shadow depth.",
    motionNotes:
      "Use minimal reveal movement and a stable premium product finish.",
    aspectRatio: "1:1 or 4:5",
    duration: "10-15 seconds",
    promptVariations: [
      "Shift the tone toward cooler clinical skincare without losing luxury restraint.",
      "Use warmer gold packaging with the same sculptural layout.",
      "Add one mature skin-texture cue in the background only."
    ],
    faqs: [
      {
        question: "How do I keep anti-aging creative from looking generic?",
        answer:
          "Keep the scene product-first, reduce prop clutter, and let texture plus packaging do most of the persuasion."
      },
      {
        question: "Can this work for retargeting ads?",
        answer:
          "Yes. The structure is especially strong for retargeting if the offer copy sits beside a premium hero shot."
      }
    ],
    relatedSlugs: ["luxury-skincare-serum-ad", "skincare-bundle-offer", "meta-beauty-retargeting-ad"]
  },
  {
    title: "Facial Cleanser TikTok Ad",
    slug: "facial-cleanser-tiktok-ad",
    category: "Beauty",
    useCase: "Vertical cleanser social ad",
    searchIntent: "facial cleanser TikTok ad prompt",
    shortDescription:
      "Create a vertical cleanser creative with airy foam, wet-surface highlights, and a fast social-first bathroom setup.",
    referenceImages: [
      categoryReferenceImage.Beauty,
      "/assets/templates/cleanser-main.png",
      categoryReferenceImage.Beauty
    ],
    midjourneyPrompt:
      "facial cleanser tube in bright aqua white bathroom scene, airy foam, clean wet highlights, vertical social framing, crisp product visibility, fresh skincare TikTok ad composition, product centered --ar 9:16 --v 6",
    runwayPrompt:
      "A cleanser tube snaps into a bright aqua-white frame while airy foam and tiny water highlights move around it. The pacing feels vertical, quick, and clean, ending on a centered social-ready product hero.",
    storyboardScenes: [
      "Aqua-white bathroom light and wet surface reflections establish a fresh cleanser mood.",
      "Foam and water highlights move around the cleanser tube without hiding it.",
      "The final vertical frame centers the product for a TikTok-style skincare hook."
    ],
    cameraNotes:
      "Use vertical product-level framing with quick close detail inserts and a centered final tube crop.",
    lightingNotes:
      "Use bright aqua-white bathroom light with clean wet highlights and soft front fill.",
    motionNotes:
      "Use quick vertical pacing, foam movement, and a sharp final stop on the product.",
    aspectRatio: "9:16",
    duration: "6-9 seconds",
    promptVariations: [
      "Make the setting more creator-style while keeping the centered product.",
      "Use a clinic-sink version with cleaner surfaces and softer highlights.",
      "Push the foam moment harder while preserving label readability."
    ],
    faqs: [
      {
        question: "Is this mainly for TikTok?",
        answer:
          "Yes, but it also works for Reels and short vertical paid social placements."
      },
      {
        question: "What gives it stronger hook potential?",
        answer:
          "Fast entrance motion, clean splash texture, and a product label that reads immediately."
      }
    ],
    relatedSlugs: ["tiktok-beauty-hook-ad", "beauty-ugc-routine-ad", "glowing-skin-product-commercial"]
  },
  {
    title: "Luxury Perfume Ad",
    slug: "luxury-perfume-ad",
    category: "Beauty",
    useCase: "Luxury fragrance campaign",
    searchIntent: "luxury perfume ad prompt",
    shortDescription:
      "Build a cinematic fragrance visual with reflective surfaces, soft mist, floral accents, and a high-fashion beauty finish.",
    referenceImages: [
      categoryReferenceImage.Beauty,
      "/assets/templates/perfume-main.png",
      categoryReferenceImage.Beauty
    ],
    midjourneyPrompt:
      "luxury perfume bottle on reflective dark surface, soft mist, sculptural floral accents, gold edge highlights, premium fragrance advertising, elegant beauty editorial mood --ar 4:5 --v 6",
    runwayPrompt:
      "A perfume bottle emerges through soft mist on a reflective dark surface while floral forms and gold highlights frame the scene. Motion remains elegant and cinematic until the hero shot settles.",
    storyboardScenes: [
      "Soft mist and reflections establish a cinematic fragrance mood.",
      "The perfume bottle emerges with gold highlights and sculptural floral support.",
      "The final frame locks on an elegant high-fashion beauty hero."
    ],
    cameraNotes:
      "Use dramatic close-ups of glass edges and a steady centered bottle reveal.",
    lightingNotes:
      "Use low-key studio lighting with controlled gold rim accents and reflection control.",
    motionNotes:
      "Use slow mist drift and a refined reveal with minimal camera shake.",
    aspectRatio: "4:5 or 16:9",
    duration: "10-15 seconds",
    promptVariations: [
      "Use lighter white florals for a fresher daytime scent campaign.",
      "Shift the mood toward red velvet evening luxury.",
      "Add subtle water reflections for a brighter prestige-beauty finish."
    ],
    faqs: [
      {
        question: "Is this better for beauty or fashion positioning?",
        answer:
          "It sits between both, but the framing and styling here lean toward prestige beauty and fragrance storytelling."
      },
      {
        question: "What keeps perfume creative from feeling cheap?",
        answer:
          "Restrained props, controlled reflections, and a slower cinematic pace usually do the heavy lifting."
      }
    ],
    relatedSlugs: ["luxury-makeup-flatlay", "minimalist-jewelry-campaign", "luxury-skincare-serum-ad"]
  },
  {
    title: "Lipstick Product Launch",
    slug: "lipstick-product-launch",
    category: "Beauty",
    useCase: "Lipstick launch campaign",
    searchIntent: "lipstick ad prompt",
    shortDescription:
      "Show a bold lipstick bullet with rich pigment, premium packaging, and a clean launch-ready beauty composition.",
    referenceImages: [
      "/assets/templates/lipstick-product-launch-1.svg",
      "/assets/templates/lipstick-main.png",
      "/assets/templates/lipstick-product-launch-3.svg"
    ],
    midjourneyPrompt:
      "luxury lipstick bullet and elegant case on polished surface, rich pigment swipe, soft pink and deep red beauty lighting, glossy reflections, high-end cosmetic advertising, editorial close-up detail, clean negative space --ar 4:5 --v 6",
    runwayPrompt:
      "A rich pigment swipe catches the light before the lipstick case rotates into frame. Glossy reflections move across the bullet and packaging, ending on a premium color-led launch hero.",
    storyboardScenes: [
      "A pigment swipe establishes color intensity and premium beauty tone.",
      "The lipstick case enters with polished reflections and clean packaging focus.",
      "The hero frame holds the lipstick and shade story with launch-ready copy space."
    ],
    cameraNotes:
      "Use macro product detail on the lipstick bullet and a stable medium hero crop on the case.",
    lightingNotes:
      "Use polished beauty light with accurate pigment color and glossy but controlled highlights.",
    motionNotes:
      "Use a smooth rotate-in and one controlled pigment reveal moment.",
    aspectRatio: "4:5 or 9:16",
    duration: "6-10 seconds",
    promptVariations: [
      "Make the pigment story more editorial with sharper contrast.",
      "Use soft pink luxury light for a prestige beauty launch.",
      "Turn the frame into a clean ecommerce-meets-editorial lipstick reveal."
    ],
    faqs: [
      {
        question: "What matters most in lipstick prompt design?",
        answer:
          "Shade visibility, packaging polish, and a strong product close-up are usually the three essentials."
      },
      {
        question: "Can this work for shade-range launches?",
        answer:
          "Yes. Duplicate the structure and swap the pigment swipe color while keeping the hero composition consistent."
      }
    ],
    relatedSlugs: ["luxury-makeup-flatlay", "tiktok-beauty-hook-ad", "luxury-perfume-ad"]
  },
  {
    title: "Haircare Shine Campaign",
    slug: "haircare-shine-campaign",
    category: "Beauty",
    useCase: "Haircare product campaign",
    searchIntent: "haircare product ad prompt",
    shortDescription:
      "Create a sleek haircare visual with shine cues, bottle clarity, and premium salon-inspired polish.",
    referenceImages: [
      "/assets/templates/haircare-shine-campaign-1.svg",
      "/assets/templates/haircare-main.png",
      "/assets/templates/haircare-shine-campaign-3.svg"
    ],
    midjourneyPrompt:
      "premium haircare bottle with glossy shine cues, sleek salon-inspired background, subtle flowing texture, clean packaging visibility, beauty advertising composition, polished haircare campaign --ar 4:5 --v 6",
    runwayPrompt:
      "A sleek haircare bottle appears as glossy shine cues move gently across the frame. The motion feels salon-polished and premium, finishing with a clean bottle-focused hero.",
    storyboardScenes: [
      "Glossy shine texture introduces the haircare campaign mood.",
      "The bottle becomes central while smooth flow lines reinforce shine benefits.",
      "The final frame holds a clean salon-inspired product hero."
    ],
    cameraNotes:
      "Use a medium-close hero crop with one glossy texture insert and clear bottle readability.",
    lightingNotes:
      "Use smooth specular highlights to imply hair shine without overexposing the bottle.",
    motionNotes:
      "Use gentle flow motion and a slow reveal rather than dramatic beauty movement.",
    aspectRatio: "4:5 or 16:9",
    duration: "8-12 seconds",
    promptVariations: [
      "Push the visual toward a more clinical scalp-care direction.",
      "Make the tone warmer and more salon-luxury.",
      "Create a high-shine black-and-gold version for premium hair oil."
    ],
    faqs: [
      {
        question: "What visual signal communicates haircare benefit best?",
        answer:
          "Shine texture, smooth flow, and packaging clarity usually say more than adding too many props."
      },
      {
        question: "Can this fit Meta and ecommerce creative?",
        answer:
          "Yes. It can work as a hero image, carousel lead frame, or a clean landing page visual."
      }
    ],
    relatedSlugs: ["luxury-skincare-serum-ad", "body-lotion-soft-skin-ad", "beauty-ugc-routine-ad"]
  },
  {
    title: "Body Lotion Soft Skin Ad",
    slug: "body-lotion-soft-skin-ad",
    category: "Beauty",
    useCase: "Body lotion campaign",
    searchIntent: "body lotion ad prompt",
    shortDescription:
      "Show a soft-skin body lotion visual with creamy texture, fresh highlights, and a calm premium self-care mood.",
    referenceImages: [
      "/assets/templates/body-lotion-soft-skin-ad-1.svg",
      "/assets/templates/body-lotion-main.png",
      "/assets/templates/body-lotion-soft-skin-ad-3.svg"
    ],
    midjourneyPrompt:
      "body lotion bottle beside creamy lotion texture, soft self-care background, fresh highlights, premium skincare advertising, calm wellness mood, clean bottle focus --ar 4:5 --v 6",
    runwayPrompt:
      "A body lotion bottle settles into a calm self-care scene while creamy texture and soft highlights move gently around it. Motion stays minimal and soothing until a clean wellness hero frame appears.",
    storyboardScenes: [
      "Creamy texture and soft highlights establish a calm self-care setting.",
      "The body lotion bottle becomes central with fresh, readable packaging.",
      "The final frame holds a soft premium wellness hero with generous breathing room."
    ],
    cameraNotes:
      "Use a stable medium hero crop with texture inserts that never overpower the bottle.",
    lightingNotes:
      "Use soft diffused skincare light with fresh highlights and gentle shadow control.",
    motionNotes:
      "Use slow texture movement and a calm push-in with no aggressive transitions.",
    aspectRatio: "4:5 or 1:1",
    duration: "8-12 seconds",
    promptVariations: [
      "Push the mood more clinical for dermatologist-focused positioning.",
      "Warm the palette for a spa-like body-care campaign.",
      "Create a brighter ecommerce body-care hero variant."
    ],
    faqs: [
      {
        question: "What makes body-care creative feel premium?",
        answer:
          "Texture clarity, clean bottle placement, and a calm controlled lighting setup do most of the work."
      },
      {
        question: "Can this be reused for creams and butters?",
        answer:
          "Yes. The structure adapts well to body butter, hand cream, and soft-skin moisturizers."
      }
    ],
    relatedSlugs: ["spa-treatment-promo", "haircare-shine-campaign", "luxury-skincare-serum-ad"]
  },
  {
    title: "Spa Treatment Promo",
    slug: "spa-treatment-promo",
    category: "Beauty",
    useCase: "Spa and wellness campaign",
    searchIntent: "spa treatment ad prompt",
    shortDescription:
      "Create a serene spa-style campaign with wellness textures, soft stone surfaces, and polished self-care storytelling.",
    referenceImages: assetTriplet("Beauty"),
    midjourneyPrompt:
      "spa treatment product setup on soft stone surface, wellness textures, calm neutral palette, premium self-care advertising, airy light, polished beauty-wellness composition --ar 4:5 --v 6",
    runwayPrompt:
      "Soft neutral light moves across stone surfaces and wellness textures before the spa product becomes the focus. Motion remains calm, airy, and premium, ending on a quiet self-care hero frame.",
    storyboardScenes: [
      "Stone surface and calm wellness textures establish a spa atmosphere.",
      "The treatment product settles into a centered, polished composition.",
      "The final hero frame feels serene, clean, and premium."
    ],
    cameraNotes:
      "Use a slightly elevated hero angle with soft negative space and minimal prop density.",
    lightingNotes:
      "Use airy neutral light with low contrast and a calm wellness grade.",
    motionNotes:
      "Use slow drifting motion and a peaceful product reveal with no aggressive transitions.",
    aspectRatio: "4:5 or 16:9",
    duration: "8-14 seconds",
    promptVariations: [
      "Make it more luxury-hotel spa with warmer stone tones.",
      "Shift the palette cooler for a modern clinic-spa hybrid.",
      "Create a softer self-care social version with brighter fill light."
    ],
    faqs: [
      {
        question: "What is the main advantage of spa-style prompt design?",
        answer:
          "It creates a calm premium atmosphere that can position even simple products as elevated wellness experiences."
      },
      {
        question: "Can it work for service businesses too?",
        answer:
          "Yes. Replace the product with treatment props, towels, oils, or room setup details and keep the same calm composition."
      }
    ],
    relatedSlugs: ["body-lotion-soft-skin-ad", "anti-aging-cream-promo", "luxury-skincare-serum-ad"]
  },
  {
    title: "Beauty UGC Routine Ad",
    slug: "beauty-ugc-routine-ad",
    category: "Beauty",
    useCase: "Beauty UGC campaign",
    searchIntent: "beauty UGC ad prompt",
    shortDescription:
      "Design a creator-style beauty routine ad with authentic framing, product demo energy, and social-ready product storytelling.",
    referenceImages: [
      categoryReferenceImage.Beauty,
      "/assets/templates/cleanser-main.png",
      categoryReferenceImage.Beauty
    ],
    midjourneyPrompt:
      "beauty UGC routine setup, creator-style framing, clean bathroom counter, authentic product demo energy, natural daylight, social ad composition, clear beauty packaging focus --ar 9:16 --v 6",
    runwayPrompt:
      "A creator-style beauty routine begins with a clean counter setup and natural daylight. The product demo feels casual and authentic, with vertical pacing and a final CTA-ready hero frame.",
    storyboardScenes: [
      "A clean bathroom counter establishes a believable creator setting.",
      "The product is demonstrated in a simple routine-style motion sequence.",
      "The final frame keeps the packaging clear and conversion-ready for social."
    ],
    cameraNotes:
      "Use handheld vertical framing, eye-level product placement, and one close demo insert.",
    lightingNotes:
      "Use natural daylight and simple home-style bounce rather than polished studio light.",
    motionNotes:
      "Use handheld creator movement and quick natural routine pacing.",
    aspectRatio: "9:16",
    duration: "12-20 seconds",
    promptVariations: [
      "Make it founder-led rather than creator-led.",
      "Shift the mood toward testimonial style with the same product demo structure.",
      "Use a more polished creator apartment background while keeping authenticity."
    ],
    faqs: [
      {
        question: "What makes beauty UGC feel believable?",
        answer:
          "Natural framing, simple routine logic, and a product demo that feels useful instead of overproduced."
      },
      {
        question: "Can this work without showing a face?",
        answer:
          "Yes. Hands, countertop setup, mirror crops, and product-close routine shots can still feel UGC-native."
      }
    ],
    relatedSlugs: ["ugc-ad-script", "facial-cleanser-tiktok-ad", "meta-beauty-retargeting-ad"]
  },
  {
    title: "Before-After Skincare Ad",
    slug: "before-after-skincare-ad",
    category: "Beauty",
    useCase: "Beauty proof and result ad",
    searchIntent: "beauty before after ad prompt",
    shortDescription:
      "Create a result-led skincare visual with clear contrast cues, clean packaging, and a believable proof-oriented ad structure.",
    referenceImages: assetTriplet("Beauty"),
    midjourneyPrompt:
      "before-and-after skincare product visual, clean split-proof composition, elegant beauty packaging, bright readable layout, result-led social ad styling, premium but credible skincare campaign --ar 4:5 --v 6",
    runwayPrompt:
      "A clean split composition introduces proof-led skincare storytelling as the product moves into the center. Motion stays restrained, clear, and credibility-focused until the result frame locks in.",
    storyboardScenes: [
      "The composition establishes a simple before-and-after contrast cue.",
      "The skincare product is centered between proof-oriented visual zones.",
      "The final frame balances credibility, product hierarchy, and CTA space."
    ],
    cameraNotes:
      "Use structured split framing and keep the product central rather than secondary to effects.",
    lightingNotes:
      "Use clear bright lighting with balanced contrast between proof cues and packaging.",
    motionNotes:
      "Use subtle transitions between proof states; avoid gimmicky morphing.",
    aspectRatio: "4:5 or 9:16",
    duration: "8-12 seconds",
    promptVariations: [
      "Make the proof structure more clinical and less social-first.",
      "Use softer pastel beauty tones while preserving clarity.",
      "Create a faster retargeting version with stronger CTA space."
    ],
    faqs: [
      {
        question: "What makes before-and-after creative usable?",
        answer:
          "A clear structure, believable visual proof, and a product hero that still feels premium rather than overly clinical."
      },
      {
        question: "Can this support retargeting?",
        answer:
          "Yes. It works especially well for retargeting because the proof structure reinforces conversion-oriented messaging."
      }
    ],
    relatedSlugs: ["meta-beauty-retargeting-ad", "glowing-skin-product-commercial", "skincare-bundle-offer"]
  },
  {
    title: "Skincare Bundle Offer",
    slug: "skincare-bundle-offer",
    category: "Beauty",
    useCase: "Skincare bundle promotion",
    searchIntent: "skincare bundle ad prompt",
    shortDescription:
      "Present multiple skincare products in a bundle-first hero layout with clear hierarchy, offer space, and polished beauty lighting.",
    referenceImages: [
      categoryReferenceImage.Beauty,
      "/assets/templates/luxury-serum-main.png",
      categoryReferenceImage.Beauty
    ],
    midjourneyPrompt:
      "skincare bundle arrangement with serum, cleanser, cream or lotion, premium beauty offer layout, clean label visibility, soft luxury lighting, bundle-first ecommerce composition --ar 4:5 --v 6",
    runwayPrompt:
      "A bundle of skincare products settles into a clean premium arrangement while soft beauty light defines hierarchy between hero product and support items. The frame ends with clear offer-space balance.",
    storyboardScenes: [
      "Multiple skincare products establish a bundle-first premium composition.",
      "Beauty lighting clarifies the hero item and supporting products inside the set.",
      "The final frame leaves clean space for bundle value messaging."
    ],
    cameraNotes:
      "Use a slightly elevated hero angle to show multiple products without losing label clarity.",
    lightingNotes:
      "Use soft luxury beauty light that keeps hierarchy clean across the product set.",
    motionNotes:
      "Use a subtle reveal across the bundle and end on a stable ecommerce lockup.",
    aspectRatio: "4:5 or 16:9",
    duration: "8-12 seconds",
    promptVariations: [
      "Use a holiday gift-set tone with restrained festive accents.",
      "Create a clinic-bundle version with cooler skincare lighting.",
      "Use a more ecommerce-first offer layout with simpler props."
    ],
    faqs: [
      {
        question: "What matters most in a bundle creative?",
        answer:
          "Product hierarchy, packaging readability, and a layout that makes value clear without feeling crowded."
      },
      {
        question: "Can this work on landing pages too?",
        answer:
          "Yes. The same bundle arrangement is useful for hero sections, collection pages, and paid social."
      }
    ],
    relatedSlugs: ["luxury-skincare-serum-ad", "anti-aging-cream-promo", "seasonal-sale-campaign"]
  },
  {
    title: "Luxury Makeup Flatlay",
    slug: "luxury-makeup-flatlay",
    category: "Beauty",
    useCase: "Luxury makeup campaign",
    searchIntent: "luxury makeup ad prompt",
    shortDescription:
      "Build a polished makeup flatlay with premium product arrangement, clean editorial spacing, and a prestige beauty look.",
    referenceImages: [
      "/assets/templates/luxury-makeup-flatlay-1.svg",
      "/assets/templates/makeup-flatlay-main.png",
      "/assets/templates/luxury-makeup-flatlay-3.svg"
    ],
    midjourneyPrompt:
      "luxury makeup flatlay with curated cosmetic arrangement, premium packaging, editorial negative space, soft prestige beauty lighting, elegant campaign composition --ar 4:5 --v 6",
    runwayPrompt:
      "A curated luxury makeup flatlay comes into focus as soft prestige beauty light moves across the packaging. The motion feels editorial and slow, ending in a refined campaign layout.",
    storyboardScenes: [
      "A curated flatlay arrangement establishes prestige beauty order and balance.",
      "Soft editorial light reveals packaging details and cosmetic textures.",
      "The final frame holds a polished makeup layout with clean campaign breathing room."
    ],
    cameraNotes:
      "Use top-down or slightly angled flatlay framing with careful spacing between products.",
    lightingNotes:
      "Use soft prestige-beauty light with minimal shadow clutter and strong packaging legibility.",
    motionNotes:
      "Use slow editorial movement across the flatlay rather than dramatic camera shifts.",
    aspectRatio: "4:5 or 1:1",
    duration: "6-10 seconds",
    promptVariations: [
      "Turn the flatlay into a richer holiday beauty gift-set version.",
      "Use a monochrome minimal makeup arrangement with stronger negative space.",
      "Shift to a warmer fashion-beauty crossover grade with bolder reflections."
    ],
    faqs: [
      {
        question: "Why use a flatlay for luxury makeup?",
        answer:
          "Flatlays make range, texture, and packaging design easy to understand while still feeling premium."
      },
      {
        question: "Can this support paid social and ecommerce?",
        answer:
          "Yes. It works for launch frames, collection announcements, and editorial-style ecommerce banners."
      }
    ],
    relatedSlugs: ["lipstick-product-launch", "luxury-perfume-ad", "minimalist-jewelry-campaign"]
  },
  {
    title: "TikTok Beauty Hook Ad",
    slug: "tiktok-beauty-hook-ad",
    category: "Beauty",
    useCase: "Short-form beauty hook ad",
    searchIntent: "TikTok beauty hook ad prompt",
    shortDescription:
      "Create a beauty-first vertical hook ad with fast product reveal energy, creator-native pacing, and clear packaging focus.",
    referenceImages: [
      "/assets/templates/tiktok-beauty-hook-ad-1.svg",
      "/assets/templates/tiktok-beauty-main.png",
      "/assets/templates/tiktok-beauty-hook-ad-3.svg"
    ],
    midjourneyPrompt:
      "vertical beauty hook ad, clean product-first frame, creator-native motion cues, bright cosmetic lighting, fast attention-grabbing packaging reveal, social ad composition --ar 9:16 --v 6",
    runwayPrompt:
      "A fast beauty hook opens with bright cosmetic lighting and an immediate product reveal. The pacing stays native to short-form social, ending on a centered hero frame with CTA-ready space.",
    storyboardScenes: [
      "A fast first-frame hook establishes vertical beauty ad energy.",
      "The product reveal happens quickly with bright cosmetic lighting and clean packaging focus.",
      "The final hero frame leaves space for the hook line and CTA."
    ],
    cameraNotes:
      "Use a vertical crop with fast first-frame framing and a clear product center point.",
    lightingNotes:
      "Use bright beauty light with quick contrast definition and strong packaging readability.",
    motionNotes:
      "Use quick social-native pacing and a sharp final stop on the product hero.",
    aspectRatio: "9:16",
    duration: "5-8 seconds",
    promptVariations: [
      "Make the hook more creator-native while keeping the product front and center.",
      "Use a cleaner Meta-style beauty hook with softer transitions.",
      "Build a more premium cosmetics version with tighter lighting control."
    ],
    faqs: [
      {
        question: "What makes a beauty hook ad work on TikTok?",
        answer:
          "Speed, clarity, and a first second that communicates the product type immediately."
      },
      {
        question: "Can this also work for Reels?",
        answer:
          "Yes. The same hook structure translates well to Reels and Shorts with minimal changes."
      }
    ],
    relatedSlugs: ["facial-cleanser-tiktok-ad", "beauty-ugc-routine-ad", "lipstick-product-launch"]
  },
  {
    title: "Glowing Skin Product Commercial",
    slug: "glowing-skin-product-commercial",
    category: "Beauty",
    useCase: "Radiance-focused skincare video ad",
    searchIntent: "glowing skin product commercial prompt",
    shortDescription:
      "Frame skincare packaging against a luminous skin-texture backdrop with peach-white glow, dewy highlights, and a bright high-key beauty finish.",
    referenceImages: [
      categoryReferenceImage.Beauty,
      "/assets/templates/glowing-skin-main.png",
      categoryReferenceImage.Beauty
    ],
    midjourneyPrompt:
      "skincare jar and serum bottle against luminous skin texture backdrop, peach white high-key beauty studio, glossy dewy highlights, soft radiant finish, clean premium cosmetic campaign, product and skin glow balanced in one frame --ar 4:5 --v 6",
    runwayPrompt:
      "Soft light sweeps across a luminous skin-texture backdrop as the skincare product settles into frame. Peach-white glow, dewy highlight behavior, bright social-first beauty motion, ending with a radiant clean hero composition.",
    storyboardScenes: [
      "Luminous skin texture fills the background with a soft peach-white glow.",
      "Skincare packaging slides gently into the foreground while dewy highlights catch the edges.",
      "Final frame balances product and radiant skin texture without clutter."
    ],
    cameraNotes:
      "Use a medium product crop with macro skin-texture cutaways, keeping the packaging in the foreground.",
    lightingNotes:
      "Use high-key peach-white lighting with soft bloom and dewy highlight control.",
    motionNotes:
      "Use a gentle lateral slide and soft highlight sweep; avoid fast beauty transitions.",
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
        answer:
          "Yes. It is designed for short vertical beauty content and quick product benefit communication."
      },
      {
        question: "How can I make it more premium?",
        answer:
          "Add marble surfaces, restrained typography space, and slower camera motion."
      }
    ],
    relatedSlugs: ["luxury-skincare-serum-ad", "facial-cleanser-tiktok-ad", "sunscreen-summer-campaign"]
  },

  // Food (15)
  {
    title: "Coffee Brand Ad",
    slug: "coffee-brand-ad",
    category: "Food",
    useCase: "Coffee product advertising",
    searchIntent: "coffee brand ad prompt",
    shortDescription:
      "Present a premium coffee bag beside a ceramic cup, warm wood textures, and soft morning steam for a rich artisanal feel.",
    referenceImages: [
      categoryReferenceImage.Food,
      "/assets/templates/coffee-main.png",
      categoryReferenceImage.Food
    ],
    midjourneyPrompt:
      "premium coffee bag beside ceramic cup, warm wood surface, soft steam, restrained roasted beans, artisanal coffee branding, rich brown morning light, packaging readable and centered --ar 4:5 --v 6",
    runwayPrompt:
      "Warm morning light enters the frame as steam rises from a ceramic cup beside a premium coffee bag. The shot slowly pushes toward the packaging and settles on a rich artisanal coffee hero.",
    storyboardScenes: [
      "Warm wood and steam establish the morning coffee atmosphere.",
      "The coffee bag becomes central with rich brown light and restrained beans nearby.",
      "The final frame holds an artisanal coffee brand hero with copy space."
    ],
    cameraNotes:
      "Use a slightly low angle on the packaging and one macro insert of steam or bean texture.",
    lightingNotes:
      "Use warm window light with soft contrast and appetizing brown tonal control.",
    motionNotes:
      "Use slow steam motion and a measured push-in on the packaging.",
    aspectRatio: "4:5, 1:1, or 16:9",
    duration: "8-12 seconds",
    promptVariations: [
      "Turn the scene into a darker espresso-bar version with stronger contrast.",
      "Make it an iced coffee summer variant with condensation instead of steam.",
      "Use a subscription-box coffee brand layout with the same warm wood tone."
    ],
    faqs: [
      {
        question: "Why does this work for packaged coffee?",
        answer:
          "It balances atmosphere with product readability, which matters for both branding and ecommerce use."
      },
      {
        question: "Can it be adapted for cafe brands too?",
        answer:
          "Yes. Replace the bag with branded cups, beans, or a bar counter hero while keeping the same warm coffee language."
      }
    ],
    relatedSlugs: ["matcha-latte-commercial", "premium-packaging-food-ad", "restaurant-food-reel"]
  },
  {
    title: "Matcha Latte Commercial",
    slug: "matcha-latte-commercial",
    category: "Food",
    useCase: "Matcha beverage campaign",
    searchIntent: "matcha latte ad prompt",
    shortDescription:
      "Show a creamy matcha pour with clean green contrast, cafe calm, and premium beverage storytelling.",
    referenceImages: [
      categoryReferenceImage.Food,
      "/assets/templates/matcha-main.png",
      categoryReferenceImage.Food
    ],
    midjourneyPrompt:
      "creamy matcha latte in clear glass, vivid green swirl, bamboo whisk, calm cafe light, premium beverage advertising, clean tabletop composition, fresh and modern drink branding --ar 4:5 --v 6",
    runwayPrompt:
      "Milk pours into vivid matcha inside a clear glass while soft cafe light holds the scene. Motion stays calming and premium, ending with a clean beverage hero frame.",
    storyboardScenes: [
      "Soft cafe light and matcha tools establish a premium beverage setting.",
      "A creamy milk pour creates a vivid green swirl in the glass.",
      "The final shot holds a clean tabletop hero for the drink brand."
    ],
    cameraNotes:
      "Use a close tabletop angle and one overhead or three-quarter pour insert.",
    lightingNotes:
      "Use soft natural cafe light that keeps the green tone fresh and visible.",
    motionNotes:
      "Use one controlled pour moment followed by a calm settle into the hero frame.",
    aspectRatio: "4:5 or 9:16",
    duration: "7-12 seconds",
    promptVariations: [
      "Turn it into an iced matcha with condensation and brighter summer light.",
      "Use a Japanese tea-room interpretation with more restraint and negative space.",
      "Add oat-milk wellness positioning while preserving the clear glass hero."
    ],
    faqs: [
      {
        question: "What makes matcha creatives look premium?",
        answer:
          "Vivid green control, a clean pour moment, and an uncluttered cafe environment usually carry the premium feel."
      },
      {
        question: "Can this work for wellness beverage brands?",
        answer:
          "Yes. It already leans wellness-friendly and can be adapted with cleaner nutrition or ritual cues."
      }
    ],
    relatedSlugs: ["coffee-brand-ad", "seasonal-drink-campaign", "tiktok-recipe-ad"]
  },
  {
    title: "Chocolate Bar Product Shot",
    slug: "chocolate-bar-product-shot",
    category: "Food",
    useCase: "Packaged snack advertising",
    searchIntent: "chocolate bar ad prompt",
    shortDescription:
      "Build an indulgent chocolate visual with glossy texture, precise packaging focus, and premium confectionery mood.",
    referenceImages: [
      categoryReferenceImage.Food,
      "/assets/templates/chocolate-main.png",
      categoryReferenceImage.Food
    ],
    midjourneyPrompt:
      "premium chocolate bar packaging with glossy chocolate pieces, cocoa detail, warm indulgent lighting, rich confectionery advertising, clean label readability, premium snack hero --ar 4:5 --v 6",
    runwayPrompt:
      "Glossy chocolate texture and warm cocoa tones establish the scene before the packaged bar settles into a premium hero frame. Motion is slow, indulgent, and product-first.",
    storyboardScenes: [
      "Glossy chocolate and cocoa tones establish an indulgent snack mood.",
      "The product package becomes central with rich warm light and clear readability.",
      "The final frame holds a premium confectionery hero with appetite appeal."
    ],
    cameraNotes:
      "Use macro chocolate texture inserts and a stable packaging hero crop.",
    lightingNotes:
      "Use warm appetizing light with glossy highlights on chocolate and restrained shadow depth.",
    motionNotes:
      "Use slow reveal movement and tiny texture drift, not aggressive falling-piece animation.",
    aspectRatio: "4:5 or 1:1",
    duration: "8-10 seconds",
    promptVariations: [
      "Make it cleaner and lighter for a family snack direction.",
      "Use dark-luxury premium chocolate styling with reduced prop density.",
      "Add nut or berry support while preserving packaging dominance."
    ],
    faqs: [
      {
        question: "What keeps chocolate creatives from feeling messy?",
        answer:
          "A strong package center, limited supporting props, and well-controlled glossy texture keep the frame clean."
      },
      {
        question: "Can this work for ecommerce too?",
        answer:
          "Yes. The structure is suitable for both premium ads and ecommerce landing page modules."
      }
    ],
    relatedSlugs: ["healthy-snack-promo", "black-friday-food-sale", "premium-packaging-food-ad"]
  },
  {
    title: "Healthy Snack Promo",
    slug: "healthy-snack-promo",
    category: "Food",
    useCase: "Better-for-you snack campaign",
    searchIntent: "healthy snack ad prompt",
    shortDescription:
      "Create a clean snack promo with ingredients, bright daylight, and product-first packaging hierarchy.",
    referenceImages: [
      categoryReferenceImage.Food,
      "/assets/templates/healthy-snack-main.png",
      categoryReferenceImage.Food
    ],
    midjourneyPrompt:
      "healthy snack pouch with clean ingredient styling, nuts or fruit support, bright natural light, modern wellness packaging, premium snack advertising, product-first composition --ar 4:5 --v 6",
    runwayPrompt:
      "Bright daylight reveals a healthy snack pouch as ingredient accents settle into the frame. Motion remains clean and active, ending with a centered packaging hero that feels wellness-first.",
    storyboardScenes: [
      "Clean ingredients and daylight establish a fresh wellness-snack mood.",
      "The pouch settles front and center with a simple ingredient support system.",
      "The final frame holds a bright, product-first healthy snack hero."
    ],
    cameraNotes:
      "Use a front-facing pouch angle with simple ingredient support and generous breathing room.",
    lightingNotes:
      "Use bright natural light with a modern wellness palette and low clutter.",
    motionNotes:
      "Use gentle ingredient motion and a clean product settle, not chaotic scatter animation.",
    aspectRatio: "4:5 or 9:16",
    duration: "6-10 seconds",
    promptVariations: [
      "Push the visual toward active-lifestyle positioning.",
      "Make it more kid-friendly while preserving clean package hierarchy.",
      "Use a premium organic-grocery finish with warmer tabletop tones."
    ],
    faqs: [
      {
        question: "What makes healthy snack ads feel more premium?",
        answer:
          "Ingredient restraint, packaging clarity, and bright but controlled natural light do the job."
      },
      {
        question: "Can this become a sale ad too?",
        answer:
          "Yes. The frame can be adapted with stronger offer space for bundle or discount campaigns."
      }
    ],
    relatedSlugs: ["protein-bar-fitness-ad", "food-ugc-taste-test", "seasonal-drink-campaign"]
  },
  {
    title: "Restaurant Food Reel",
    slug: "restaurant-food-reel",
    category: "Food",
    useCase: "Restaurant social reel",
    searchIntent: "restaurant reel prompt",
    shortDescription:
      "Design a restaurant reel with plating texture, warm dining light, and appetizing close-up rhythm for social performance.",
    referenceImages: [
      categoryReferenceImage.Food,
      "/assets/templates/restaurant-main.png",
      categoryReferenceImage.Food
    ],
    midjourneyPrompt:
      "signature restaurant dish in warm dining light, plating detail, sauce texture, appetizing social reel framing, cinematic close-up food advertising, premium restaurant storytelling --ar 9:16 --v 6",
    runwayPrompt:
      "Warm restaurant light and close-up plating establish appetite appeal before the hero dish settles into a social-ready frame. Motion uses quick texture moments and a final clean dish reveal.",
    storyboardScenes: [
      "Warm dining light and close-up plating texture establish appetite appeal.",
      "A sauce or garnish moment adds satisfying restaurant motion detail.",
      "The final frame presents the hero dish in a clear social-ready composition."
    ],
    cameraNotes:
      "Use close handheld-style food framing with one tight texture insert and one final full-dish shot.",
    lightingNotes:
      "Use warm practical restaurant light with appetizing highlights and shallow depth.",
    motionNotes:
      "Use quick texture beats followed by a slightly slower final dish reveal.",
    aspectRatio: "9:16",
    duration: "8-15 seconds",
    promptVariations: [
      "Make it more fine dining with darker cinematic contrast.",
      "Shift to faster casual-social energy with brighter fill light.",
      "Add kitchen prep cues while preserving the final hero dish."
    ],
    faqs: [
      {
        question: "Why do close texture shots work for food reels?",
        answer:
          "They create appetite quickly and make the dish feel more sensory, even in short-form placements."
      },
      {
        question: "Can this work for paid ads too?",
        answer:
          "Yes. Restaurant reels can adapt well to local awareness or order-now campaigns."
      }
    ],
    relatedSlugs: ["tiktok-recipe-ad", "meal-delivery-promo", "food-ugc-taste-test"]
  },
  {
    title: "Protein Bar Fitness Ad",
    slug: "protein-bar-fitness-ad",
    category: "Food",
    useCase: "Protein snack campaign",
    searchIntent: "protein bar ad prompt",
    shortDescription:
      "Build a fitness-focused snack ad with high-protein energy, packaging clarity, and a clean active-lifestyle frame.",
    referenceImages: [
      "/assets/templates/protein-bar-fitness-ad-1.svg",
      "/assets/templates/protein-snack-main.png",
      "/assets/templates/protein-bar-fitness-ad-3.svg"
    ],
    midjourneyPrompt:
      "unbranded protein snack bars with visible chocolate coating, oat texture, nuts, and crispy layers on a clean fitness surface, scattered almonds and oats, subtle protein powder scoop in background, bright energetic commercial food photography, appetizing edible texture, healthy snack advertising, clean negative space --ar 4:5 --v 6",
    runwayPrompt:
      "A close macro of oats, nuts, and chocolate texture opens the spot before the protein bars slide into a clean fitness setup. Light moves across the coating and crispy layers, ending on an appetizing healthy snack hero with space for a benefit headline.",
    storyboardScenes: [
      "Macro oat, nut, and chocolate texture establishes the protein snack benefit.",
      "Protein bars settle onto a clean fitness surface with almonds and oats nearby.",
      "The final frame holds the bars as an appetizing healthy snack hero with clean CTA space."
    ],
    cameraNotes:
      "Use low food-level framing, one macro texture insert, and a stable hero angle that makes the bars look edible and premium.",
    lightingNotes:
      "Use bright energetic food lighting with crisp highlights on chocolate coating and soft shadows under the bars.",
    motionNotes:
      "Use a clean slide-in, small ingredient movement, and a slow push toward texture; avoid abstract fitness graphics.",
    aspectRatio: "4:5 or 9:16",
    duration: "6-10 seconds",
    promptVariations: [
      "Make the scene more gym-focused with harder contrast.",
      "Use a cleaner ecommerce-shelf style with fewer lifestyle elements.",
      "Add flavor cues while preserving the fitness-first hierarchy."
    ],
    faqs: [
      {
        question: "What signals performance in a protein snack ad?",
        answer:
          "A crisp palette, clear packaging, and one strong active-lifestyle cue often outperform overdesigned gym scenes."
      },
      {
        question: "Can this work for launch campaigns too?",
        answer:
          "Yes. It is useful for new flavor releases, seasonal offers, and bundle ads."
      }
    ],
    relatedSlugs: ["healthy-snack-promo", "energy-drink-launch", "black-friday-food-sale"]
  },
  {
    title: "Energy Drink Launch",
    slug: "energy-drink-launch",
    category: "Food",
    useCase: "Energy drink launch campaign",
    searchIntent: "energy drink ad prompt",
    shortDescription:
      "Create a bold beverage launch with high-contrast can lighting, sharp color, and performance-driven visual energy.",
    referenceImages: [
      "/assets/templates/energy-drink-launch-1.svg",
      "/assets/templates/energy-drink-main.png",
      "/assets/templates/energy-drink-launch-3.svg"
    ],
    midjourneyPrompt:
      "unbranded aluminum energy drink can with cold condensation, ice cubes, water splashes, dramatic dark studio background, electric blue and orange neon light streaks, premium beverage launch advertising, high contrast, crisp metal surface, clean negative space --ar 4:5 --v 6",
    runwayPrompt:
      "A dark studio frame flashes with blue and orange light as ice and condensation reveal the energy drink can. Water droplets move across the metal surface, then the camera locks into a bold new-product launch hero.",
    storyboardScenes: [
      "Ice, condensation, and dark studio light create an energetic beverage launch mood.",
      "The unbranded can rotates slightly as blue and orange streaks define the silhouette.",
      "The final frame holds the cold can with strong launch energy and clean offer space."
    ],
    cameraNotes:
      "Use a low product-level angle with the can centered and readable, plus one tight condensation detail.",
    lightingNotes:
      "Use high-contrast dark studio lighting with electric blue and orange edge highlights on the can.",
    motionNotes:
      "Use sharp light streaks, subtle can rotation, and controlled splash movement; do not add unrelated food props.",
    aspectRatio: "4:5 or 9:16",
    duration: "6-10 seconds",
    promptVariations: [
      "Make the can design feel more premium and less extreme-sport.",
      "Use a night-launch version with deeper contrast.",
      "Create a cleaner display-ad version with simplified motion energy."
    ],
    faqs: [
      {
        question: "What makes energy drink creative feel modern?",
        answer:
          "Strong can readability, focused accent color, and controlled performance energy usually feel more premium than overly noisy effects."
      },
      {
        question: "Can this fit YouTube Shorts and TikTok?",
        answer:
          "Yes. It works well in fast vertical formats because the can and color contrast communicate quickly."
      }
    ],
    relatedSlugs: ["protein-bar-fitness-ad", "seasonal-drink-campaign", "youtube-shorts-ad"]
  },
  {
    title: "Organic Juice Campaign",
    slug: "organic-juice-campaign",
    category: "Food",
    useCase: "Organic beverage campaign",
    searchIntent: "organic juice ad prompt",
    shortDescription:
      "Use a fresh juice bottle, produce cues, and bright natural light to create a clean organic beverage campaign.",
    referenceImages: [
      "/assets/templates/organic-juice-campaign-1.svg",
      "/assets/templates/organic-beverage-main.png",
      "/assets/templates/organic-juice-campaign-3.svg"
    ],
    midjourneyPrompt:
      "clear glass organic juice bottle with citrus slices, mint leaves, botanical ingredients, water droplets, soft natural daylight, fresh green and citrus palette, clean wellness beverage advertising, product-centered commercial photography, no readable label --ar 4:5 --v 6",
    runwayPrompt:
      "Natural daylight moves across citrus, mint, and water droplets before the glass juice bottle becomes the center of the frame. Motion stays fresh, clean, and wellness-focused until the final organic beverage hero.",
    storyboardScenes: [
      "Citrus slices, mint, and water droplets establish a fresh organic beverage mood.",
      "The clear bottle moves into focus with natural daylight and botanical support.",
      "The final frame holds a clean wellness drink hero with bright negative space."
    ],
    cameraNotes:
      "Use a fresh product-level angle with visible glass droplets and citrus detail, keeping the bottle central.",
    lightingNotes:
      "Use soft natural daylight, fresh green bounce, and bright citrus highlights without neon contrast.",
    motionNotes:
      "Use gentle water-droplet shimmer, soft leaf movement, and a slow push-in on the bottle.",
    aspectRatio: "4:5 or 16:9",
    duration: "7-11 seconds",
    promptVariations: [
      "Use a more premium glass-bottle wellness direction.",
      "Make the scene brighter and more ecommerce-first.",
      "Use a darker organic-market version with richer produce shadows."
    ],
    faqs: [
      {
        question: "What keeps organic drink visuals from feeling generic?",
        answer:
          "Keep the produce support restrained and let label clarity plus light freshness carry the brand story."
      },
      {
        question: "Can this work for seasonal flavors?",
        answer:
          "Yes. Swap the produce set and color palette while preserving the bottle-first hierarchy."
      }
    ],
    relatedSlugs: ["seasonal-drink-campaign", "meal-delivery-promo", "healthy-snack-promo"]
  },
  {
    title: "Bakery Product Ad",
    slug: "bakery-product-ad",
    category: "Food",
    useCase: "Bakery product campaign",
    searchIntent: "bakery product ad prompt",
    shortDescription:
      "Create a warm bakery visual with pastry texture, soft crumb detail, and a fresh-from-oven product story.",
    referenceImages: [
      "/assets/templates/bakery-product-ad-1.svg",
      "/assets/templates/bakery-main.png",
      "/assets/templates/bakery-product-ad-3.svg"
    ],
    midjourneyPrompt:
      "fresh golden croissants on warm parchment paper, artisan wooden table, soft morning sunlight, subtle flour dust, buttery flaky texture, cozy premium bakery advertising, appetizing realistic food styling, clean negative space --ar 4:5 --v 6",
    runwayPrompt:
      "Warm morning light falls across parchment and flaky croissant texture. A slight dusting of flour drifts through the frame before the camera settles into a cozy premium bakery hero.",
    storyboardScenes: [
      "Warm parchment, flour dust, and golden pastry texture set a fresh bakery mood.",
      "The croissants become the hero as buttery layers catch the morning light.",
      "The final frame holds an appetizing bakery product composition with clean copy space."
    ],
    cameraNotes:
      "Use close food-level framing, one macro flaky-layer insert, and a simple tabletop hero composition.",
    lightingNotes:
      "Use warm soft morning light with golden highlights and gentle shadows on the pastry layers.",
    motionNotes:
      "Use subtle flour dust, tiny crumb movement, and a slow push toward the croissant texture.",
    aspectRatio: "4:5 or 1:1",
    duration: "7-10 seconds",
    promptVariations: [
      "Make the bakery direction more premium and cafe-focused.",
      "Use a brighter casual bakery counter setup.",
      "Create a holiday bakery version with restrained festive accents."
    ],
    faqs: [
      {
        question: "What makes bakery creative more appetizing?",
        answer:
          "Texture clarity, warmth, and a product-first crop generally outperform overly decorative prop styling."
      },
      {
        question: "Can this support local bakery ads?",
        answer:
          "Yes. It is well suited to local awareness, seasonal promotions, and preorder campaigns."
      }
    ],
    relatedSlugs: ["restaurant-food-reel", "premium-packaging-food-ad", "black-friday-food-sale"]
  },
  {
    title: "Meal Delivery Promo",
    slug: "meal-delivery-promo",
    category: "Food",
    useCase: "Meal delivery advertising",
    searchIntent: "meal delivery ad prompt",
    shortDescription:
      "Build a convenient meal-delivery visual with plated freshness, packaging cues, and direct-response offer space.",
    referenceImages: [
      "/assets/templates/meal-delivery-promo-1.svg",
      "/assets/templates/meal-delivery-main.png",
      "/assets/templates/meal-delivery-promo-3.svg"
    ],
    midjourneyPrompt:
      "premium open takeout meal box filled with colorful healthy vegetables, rice, and grilled protein, clean kitchen counter, fresh ingredients nearby, modern healthy meal delivery advertising, bright natural light, appetizing commercial food photography, clean CTA space --ar 4:5 --v 6",
    runwayPrompt:
      "A premium meal box opens on a clean kitchen counter, revealing colorful vegetables, rice, and grilled protein. Fresh ingredients frame the scene as the camera settles into a convenient healthy meal-delivery hero.",
    storyboardScenes: [
      "Fresh ingredients and a clean kitchen surface establish healthy convenience.",
      "The meal box opens to reveal colorful vegetables, rice, and grilled protein.",
      "The final frame holds a modern delivery meal hero with clear offer space."
    ],
    cameraNotes:
      "Use a slightly elevated food angle so the meal contents are clear and appetizing.",
    lightingNotes:
      "Use bright natural kitchen light with fresh color rendering on vegetables and protein.",
    motionNotes:
      "Use a clean box-open reveal, gentle steam or ingredient motion, and a stable final CTA frame.",
    aspectRatio: "4:5, 16:9, or 9:16",
    duration: "8-12 seconds",
    promptVariations: [
      "Make the scene more premium for a chef-driven meal-delivery brand.",
      "Use a family-dinner angle while preserving product clarity.",
      "Create a fast social acquisition variant with stronger CTA space."
    ],
    faqs: [
      {
        question: "Why is meal delivery creative different from restaurant creative?",
        answer:
          "It needs to sell both food appeal and service convenience, so packaging and utility cues matter more."
      },
      {
        question: "Can this be reused for subscription campaigns?",
        answer:
          "Yes. It adapts well to weekly meal plans, bundles, and first-order promotions."
      }
    ],
    relatedSlugs: ["restaurant-food-reel", "google-display-ad-creative", "testimonial-ad"]
  },
  {
    title: "Food UGC Taste Test",
    slug: "food-ugc-taste-test",
    category: "Food",
    useCase: "Food UGC campaign",
    searchIntent: "food UGC ad prompt",
    shortDescription:
      "Create a creator-style taste-test ad with authentic framing, product sampling, and social-native food storytelling.",
    referenceImages: assetTriplet("Food"),
    midjourneyPrompt:
      "food UGC taste-test setup, creator-style framing, authentic snack or drink demo, natural daylight, social media ad composition, clear product visibility --ar 9:16 --v 6",
    runwayPrompt:
      "A creator-style taste-test begins in natural daylight with an authentic product sample moment. Motion stays handheld and social-native, ending with a simple product and CTA frame.",
    storyboardScenes: [
      "A creator-style food setup establishes an authentic taste-test environment.",
      "The product is sampled or demonstrated in a believable social-native way.",
      "The final frame keeps the item visible and CTA-ready for direct response."
    ],
    cameraNotes:
      "Use handheld vertical framing with one product close-up and one demo-style taste moment.",
    lightingNotes:
      "Use natural daylight and a casual home or tabletop environment.",
    motionNotes:
      "Use light handheld movement, fast cuts, and direct creator pacing.",
    aspectRatio: "9:16",
    duration: "12-20 seconds",
    promptVariations: [
      "Make it more polished while keeping creator authenticity intact.",
      "Use a founder-style product demo instead of a casual creator.",
      "Shift the tone toward testimonial UGC for stronger conversion intent."
    ],
    faqs: [
      {
        question: "Why do food taste-test ads perform well?",
        answer:
          "They give quick social proof and let the viewer imagine the product experience through direct reaction cues."
      },
      {
        question: "Can this work for packaged snacks and drinks?",
        answer:
          "Yes. The format is flexible across beverages, bars, candy, and better-for-you food products."
      }
    ],
    relatedSlugs: ["tiktok-recipe-ad", "ugc-ad-script", "healthy-snack-promo"]
  },
  {
    title: "TikTok Recipe Ad",
    slug: "tiktok-recipe-ad",
    category: "Food",
    useCase: "TikTok recipe campaign",
    searchIntent: "TikTok recipe ad prompt",
    shortDescription:
      "Build a short-form recipe creative with satisfying prep moments, ingredient clarity, and fast vertical pacing.",
    referenceImages: assetTriplet("Food"),
    midjourneyPrompt:
      "vertical TikTok recipe ad, clean ingredient prep, satisfying food action, social-first framing, bright kitchen light, creator-native ad composition --ar 9:16 --v 6",
    runwayPrompt:
      "Ingredient prep and fast satisfying food action establish a TikTok recipe rhythm. The pacing stays vertical and creator-native before landing on the final product and CTA frame.",
    storyboardScenes: [
      "Ingredient prep establishes a clean, satisfying food process.",
      "A key recipe action becomes the hook moment in the middle of the frame.",
      "The final product shot holds the finished result and CTA space."
    ],
    cameraNotes:
      "Use vertical overhead and close prep angles with fast action clarity.",
    lightingNotes:
      "Use bright kitchen light with strong ingredient color and clean shadows.",
    motionNotes:
      "Use fast prep pacing and satisfying action beats, then a stable final food shot.",
    aspectRatio: "9:16",
    duration: "8-15 seconds",
    promptVariations: [
      "Make the recipe more premium and chef-driven.",
      "Use a messier creator-kitchen version for more social authenticity.",
      "Build a branded ingredient feature into the same vertical workflow."
    ],
    faqs: [
      {
        question: "What makes a TikTok recipe ad feel strong?",
        answer:
          "A clear food action hook, ingredient clarity, and a fast but readable vertical edit rhythm."
      },
      {
        question: "Can this work for restaurant and grocery brands?",
        answer:
          "Yes. The structure adapts well to ingredient features, packaged products, and menu-item promos."
      }
    ],
    relatedSlugs: ["restaurant-food-reel", "food-ugc-taste-test", "youtube-shorts-ad"]
  },
  {
    title: "Black Friday Food Sale",
    slug: "black-friday-food-sale",
    category: "Food",
    useCase: "Food sale promotion",
    searchIntent: "Black Friday food sale prompt",
    shortDescription:
      "Create a high-contrast food sale frame with product appetite, strong offer space, and a clear promotional hierarchy.",
    referenceImages: [
      categoryReferenceImage.Food,
      "/assets/templates/black-friday-main.png",
      categoryReferenceImage.Food
    ],
    midjourneyPrompt:
      "food product sale creative on dark promotional background, appetite-led product presentation, strong offer space, ecommerce sale layout, premium Black Friday energy --ar 4:5 --v 6",
    runwayPrompt:
      "A high-contrast promotional frame opens before the food product becomes central. Motion stays clean and urgent, with a strong final sale lockup built for offer-led ecommerce or local promotions.",
    storyboardScenes: [
      "A dark promotional background establishes urgency and Black Friday energy.",
      "The food product becomes the clear visual anchor with appetite and sale balance.",
      "The final frame protects space for price, discount, and CTA."
    ],
    cameraNotes:
      "Use product-first framing with protected copy zones and a strong sale-centered hierarchy.",
    lightingNotes:
      "Use high-contrast sale lighting with appetite-preserving highlights on the food or packaging.",
    motionNotes:
      "Use fast controlled promotional pacing and a stable final product lockup.",
    aspectRatio: "4:5, 1:1, or 9:16",
    duration: "6-10 seconds",
    promptVariations: [
      "Make it cleaner and more premium with a reduced color palette.",
      "Use a lighter Cyber Monday food variant with the same sale-space structure.",
      "Push it toward bundle pricing with stronger offer cues."
    ],
    faqs: [
      {
        question: "What keeps sale creative from looking cheap?",
        answer:
          "Limit the palette, keep the product central, and avoid overcrowding the frame with too many offer badges."
      },
      {
        question: "Can this work for DTC and local businesses?",
        answer:
          "Yes. It adapts cleanly to packaged food brands, cafes, bakeries, and delivery offers."
      }
    ],
    relatedSlugs: ["black-friday-ad", "premium-packaging-food-ad", "bakery-product-ad"]
  },
  {
    title: "Premium Packaging Food Ad",
    slug: "premium-packaging-food-ad",
    category: "Food",
    useCase: "Premium packaged food campaign",
    searchIntent: "premium packaging food ad prompt",
    shortDescription:
      "Show premium packaged food with crisp label readability, refined lighting, and elevated product-market storytelling.",
    referenceImages: [
      categoryReferenceImage.Food,
      "/assets/templates/coffee-main.png",
      categoryReferenceImage.Food
    ],
    midjourneyPrompt:
      "premium packaged food hero with crisp label readability, refined tabletop setting, elevated food branding, polished appetizing light, premium product-market composition --ar 4:5 --v 6",
    runwayPrompt:
      "A premium packaged food item settles into a refined tabletop scene while polished appetizing light defines the label and edges. Motion stays elegant and product-first through the final hero frame.",
    storyboardScenes: [
      "A refined tabletop setup establishes elevated packaged-food positioning.",
      "The product package becomes central with crisp label readability and polished highlights.",
      "The final frame holds a premium packaged-food hero for brand or ecommerce use."
    ],
    cameraNotes:
      "Use a direct package angle and keep all supporting props secondary to the label.",
    lightingNotes:
      "Use polished appetizing light with clean edge definition and premium contrast.",
    motionNotes:
      "Use a smooth tabletop reveal and minimal supporting movement around the package.",
    aspectRatio: "4:5 or 1:1",
    duration: "8-12 seconds",
    promptVariations: [
      "Make the frame darker and more luxury-food oriented.",
      "Use a brighter ecommerce-first version for marketplaces and landing pages.",
      "Add a premium ingredient prop while preserving package dominance."
    ],
    faqs: [
      {
        question: "What is different about premium food packaging ads?",
        answer:
          "They need stronger label discipline and more refined lighting than casual snack or restaurant ads."
      },
      {
        question: "Can this work for subscriptions or gift boxes?",
        answer:
          "Yes. The same product hierarchy adapts well to curated sets and premium food collections."
      }
    ],
    relatedSlugs: ["coffee-brand-ad", "chocolate-bar-product-shot", "black-friday-food-sale"]
  },
  {
    title: "Seasonal Drink Campaign",
    slug: "seasonal-drink-campaign",
    category: "Food",
    useCase: "Seasonal beverage campaign",
    searchIntent: "seasonal drink campaign prompt",
    shortDescription:
      "Create a limited-time beverage visual with seasonal flavor cues, clean product hierarchy, and promotional flexibility.",
    referenceImages: assetTriplet("Food"),
    midjourneyPrompt:
      "seasonal drink hero with limited-time flavor cues, premium beverage styling, clean cup or bottle hierarchy, polished campaign lighting, modern promotional composition --ar 4:5 --v 6",
    runwayPrompt:
      "Seasonal flavor cues establish a limited-time beverage mood while the drink remains central and easy to read. Motion stays polished and promotional through a final campaign-ready lockup.",
    storyboardScenes: [
      "Seasonal flavor accents establish the limited-time beverage story.",
      "The drink becomes central with clear hierarchy and polished campaign light.",
      "The final frame leaves room for limited-time messaging and CTA."
    ],
    cameraNotes:
      "Use a stable beverage hero crop with seasonal flavor props pushed to the edges.",
    lightingNotes:
      "Use polished beverage light that keeps condensation, glass, or package detail visible.",
    motionNotes:
      "Use gentle seasonal prop movement and a clean final beverage lockup.",
    aspectRatio: "4:5 or 9:16",
    duration: "7-12 seconds",
    promptVariations: [
      "Make the campaign warmer and holiday-focused.",
      "Use a spring seasonal refresh palette with softer contrasts.",
      "Push the frame toward a more urgent limited-time sale message."
    ],
    faqs: [
      {
        question: "Why are seasonal drink prompts useful?",
        answer:
          "They combine product storytelling with timely promotional relevance, which helps both awareness and conversion campaigns."
      },
      {
        question: "Can I use this for recurring launches?",
        answer:
          "Yes. It works well for holiday drinks, summer flavors, and seasonal cafe or DTC beverage drops."
      }
    ],
    relatedSlugs: ["matcha-latte-commercial", "organic-juice-campaign", "seasonal-sale-campaign"]
  },

  // Fashion (15)
  {
    title: "Fashion Lookbook Reel",
    slug: "fashion-lookbook-reel",
    category: "Fashion",
    useCase: "Editorial lookbook campaign",
    searchIntent: "fashion lookbook prompt",
    shortDescription:
      "Build a clean fashion lookbook reel with outfit transitions, editorial movement, and premium studio direction.",
    referenceImages: [
      categoryReferenceImage.Fashion,
      "/assets/templates/lookbook-main.png",
      categoryReferenceImage.Fashion
    ],
    midjourneyPrompt:
      "fashion lookbook reel with model in curated outfits, clean editorial studio, modern styling, premium apparel campaign, polished visual hierarchy, smooth collection storytelling --ar 9:16 --v 6",
    runwayPrompt:
      "A model transitions through curated outfits in a clean editorial studio. Motion is smooth and fashion-led, ending on a premium lookbook hero frame that can support collection messaging.",
    storyboardScenes: [
      "A clean editorial studio establishes a premium collection mood.",
      "A controlled outfit transition highlights styling and silhouette changes.",
      "The final frame holds a collection-led hero composition."
    ],
    cameraNotes:
      "Use vertical full-body framing with one tighter apparel detail insert.",
    lightingNotes:
      "Use smooth even editorial light with enough contrast to separate garments from the background.",
    motionNotes:
      "Use polished model turns and fluid transitions without aggressive effects.",
    aspectRatio: "9:16",
    duration: "10-18 seconds",
    promptVariations: [
      "Move the lookbook outdoors for a street-editorial feel.",
      "Use monochrome luxury lighting for a higher-fashion look.",
      "Create a more ecommerce-ready try-on style version."
    ],
    faqs: [
      {
        question: "Why do lookbook reels work well for fashion ads?",
        answer:
          "They communicate silhouette, styling range, and brand mood quickly without needing heavy copy."
      },
      {
        question: "Can this work for paid social?",
        answer:
          "Yes. Add a sharper opening hook and a more direct CTA frame for performance placements."
      }
    ],
    relatedSlugs: ["streetwear-drop-promo", "seasonal-collection-launch", "tiktok-outfit-transition"]
  },
  {
    title: "Minimalist Jewelry Campaign",
    slug: "minimalist-jewelry-campaign",
    category: "Fashion",
    useCase: "Jewelry product campaign",
    searchIntent: "jewelry campaign prompt",
    shortDescription:
      "Show delicate jewelry with clean spacing, refined sparkle control, and premium editorial minimalism.",
    referenceImages: [
      categoryReferenceImage.Fashion,
      "/assets/templates/jewelry-main.png",
      categoryReferenceImage.Fashion
    ],
    midjourneyPrompt:
      "minimalist jewelry campaign with gold or silver pieces, neutral editorial surface, refined sparkle control, soft luxury fashion lighting, elegant accessory hero composition --ar 4:5 --v 6",
    runwayPrompt:
      "Soft luxury light moves across delicate jewelry resting on a neutral editorial surface. Motion is minimal and premium, with the final hero frame emphasizing craftsmanship and sparkle restraint.",
    storyboardScenes: [
      "A neutral editorial surface establishes calm luxury accessory storytelling.",
      "Light catches the jewelry with controlled sparkle and clean product focus.",
      "The final hero frame leaves space for collection or price messaging."
    ],
    cameraNotes:
      "Use macro detail for one piece, then pull back to a clean accessory composition.",
    lightingNotes:
      "Use soft warm or cool luxury light with tightly controlled sparkle highlights.",
    motionNotes:
      "Use slow glint movement and a refined camera settle.",
    aspectRatio: "4:5 or 1:1",
    duration: "6-10 seconds",
    promptVariations: [
      "Make the surface more bridal and refined.",
      "Use silver jewelry with cooler luxury light.",
      "Add one hand-model lifestyle cue while preserving minimalism."
    ],
    faqs: [
      {
        question: "What makes jewelry creative feel premium?",
        answer:
          "Controlled sparkle, negative space, and a focus on craftsmanship usually do more than loud prop styling."
      },
      {
        question: "Can this work for ecommerce hero images too?",
        answer:
          "Yes. It can be simplified for cleaner listing and landing-page use without losing elegance."
      }
    ],
    relatedSlugs: ["handbag-product-ad", "watch-product-shot", "luxury-perfume-ad"]
  },
  {
    title: "Streetwear Drop Promo",
    slug: "streetwear-drop-promo",
    category: "Fashion",
    useCase: "Streetwear launch campaign",
    searchIntent: "streetwear drop prompt",
    shortDescription:
      "Create a bold streetwear drop visual with urban texture, limited-release energy, and clear apparel focus.",
    referenceImages: [
      categoryReferenceImage.Fashion,
      "/assets/templates/streetwear-main.png",
      categoryReferenceImage.Fashion
    ],
    midjourneyPrompt:
      "streetwear drop promo with oversized apparel, urban texture, bold contrast, youth-culture fashion styling, limited-release mood, clean product visibility, modern apparel advertising --ar 9:16 --v 6",
    runwayPrompt:
      "Urban texture and graphic shadows set a limited-release streetwear tone while the apparel becomes the focus. Motion is energetic, fashion-forward, and built for a sharp drop announcement finish.",
    storyboardScenes: [
      "Urban texture and hard contrast establish limited-drop energy.",
      "The apparel or logo detail becomes central in a bold streetwear frame.",
      "The final shot holds a drop-ready hero with launch messaging space."
    ],
    cameraNotes:
      "Use low angles, bold crop choices, and one close logo or fabric insert.",
    lightingNotes:
      "Use graphic shadow patterns and higher contrast than luxury fashion setups.",
    motionNotes:
      "Use quick movement and a sharp final stop that supports urgency.",
    aspectRatio: "9:16",
    duration: "6-12 seconds",
    promptVariations: [
      "Shift the look into a cleaner studio streetwear direction.",
      "Use night flash styling for a rawer youth-culture feel.",
      "Add sneaker detail support without losing apparel hierarchy."
    ],
    faqs: [
      {
        question: "Why do streetwear drop prompts need urgency?",
        answer:
          "Drop culture performs best when the visual language suggests scarcity, timing, and strong identity."
      },
      {
        question: "Can this work without a model?",
        answer:
          "Yes. A hanging garment, flatlay, or oversized detail crop can still carry the drop energy."
      }
    ],
    relatedSlugs: ["sneaker-launch-campaign", "seasonal-collection-launch", "black-friday-fashion-sale"]
  },
  {
    title: "Handbag Product Ad",
    slug: "handbag-product-ad",
    category: "Fashion",
    useCase: "Accessory product campaign",
    searchIntent: "handbag ad prompt",
    shortDescription:
      "Present a handbag with material detail, clean pedestal composition, and polished editorial accessory lighting.",
    referenceImages: [
      categoryReferenceImage.Fashion,
      "/assets/templates/handbag-main.png",
      categoryReferenceImage.Fashion
    ],
    midjourneyPrompt:
      "luxury handbag on neutral pedestal, leather grain detail, clean editorial accessory lighting, premium fashion advertising, elegant shadow control, product-first composition --ar 4:5 --v 6",
    runwayPrompt:
      "A structured handbag is revealed on a neutral pedestal while light moves gently across the leather grain and hardware. Motion stays elegant and product-led through the final hero frame.",
    storyboardScenes: [
      "A neutral pedestal establishes a premium accessory presentation.",
      "Leather grain and hardware catch the light without overwhelming the overall shape.",
      "The final frame holds the handbag as a clean editorial hero."
    ],
    cameraNotes:
      "Use a steady mid hero crop with one macro insert for leather or hardware detail.",
    lightingNotes:
      "Use soft directional light that defines texture while preserving silhouette clarity.",
    motionNotes:
      "Use a slow reveal glide and a stable final accessory lockup.",
    aspectRatio: "4:5 or 1:1",
    duration: "8-12 seconds",
    promptVariations: [
      "Make the tone darker and more evening-luxury oriented.",
      "Use a brighter ecommerce-friendly version with cleaner shadows.",
      "Add subtle travel cues for a more lifestyle-led accessory story."
    ],
    faqs: [
      {
        question: "What helps handbag ads look more expensive?",
        answer:
          "Material detail, shape clarity, and restrained accessory styling usually elevate the perception quickly."
      },
      {
        question: "Can this be reused for satchels or mini bags?",
        answer:
          "Yes. The same structure adapts well across most handbag silhouettes and collections."
      }
    ],
    relatedSlugs: ["minimalist-jewelry-campaign", "ecommerce-fashion-hero", "watch-product-shot"]
  },
  {
    title: "Sneaker Launch Campaign",
    slug: "sneaker-launch-campaign",
    category: "Fashion",
    useCase: "Sneaker release campaign",
    searchIntent: "sneaker launch prompt",
    shortDescription:
      "Showcase a sneaker release with bold form, launch energy, and product-first athletic style.",
    referenceImages: [
      "/assets/templates/sneaker-launch-campaign-1.svg",
      "/assets/templates/sneaker-main.png",
      "/assets/templates/sneaker-launch-campaign-3.svg"
    ],
    midjourneyPrompt:
      "unbranded premium sneaker on a clean pedestal, dramatic studio lighting, streetwear launch mood, sharp shadows, modern footwear advertising photography, bold silhouette, material detail, clean background --ar 4:5 --v 6",
    runwayPrompt:
      "A dramatic light sweep reveals the sneaker silhouette on a clean pedestal. The camera moves around the shoe to catch material detail and ends on a sharp streetwear launch hero.",
    storyboardScenes: [
      "A dark-to-light reveal establishes sneaker-launch energy.",
      "The sneaker sits on a clean pedestal as sharp shadows define the silhouette.",
      "The final frame holds the shoe as a premium footwear launch hero."
    ],
    cameraNotes:
      "Use a low pedestal angle, one close material insert, and a final side-profile hero crop.",
    lightingNotes:
      "Use dramatic studio lighting with sharp shadow control and clean highlights along the sole and upper.",
    motionNotes:
      "Use a slow orbit, light sweep, and crisp final lockup; avoid showing a model face.",
    aspectRatio: "4:5 or 9:16",
    duration: "6-10 seconds",
    promptVariations: [
      "Shift to a cleaner studio performance-sneaker presentation.",
      "Use more street-led shadows for a fashion-sneaker crossover mood.",
      "Add one apparel support cue without taking attention off the shoe."
    ],
    faqs: [
      {
        question: "What matters most in a sneaker launch prompt?",
        answer:
          "Shape clarity, material definition, and a composition that feels urgent without becoming cluttered."
      },
      {
        question: "Can it support drop campaigns?",
        answer:
          "Yes. It is especially effective for launch, drop-date, and limited-release footwear creative."
      }
    ],
    relatedSlugs: ["streetwear-drop-promo", "activewear-performance-ad", "black-friday-fashion-sale"]
  },
  {
    title: "Sunglasses Summer Ad",
    slug: "sunglasses-summer-ad",
    category: "Fashion",
    useCase: "Seasonal accessory campaign",
    searchIntent: "sunglasses ad prompt",
    shortDescription:
      "Create a summer accessory visual with stylish eyewear, bright light, and clean seasonal luxury cues.",
    referenceImages: [
      "/assets/templates/sunglasses-summer-ad-1.svg",
      "/assets/templates/sunglasses-main.png",
      "/assets/templates/sunglasses-summer-ad-3.svg"
    ],
    midjourneyPrompt:
      "unbranded luxury sunglasses on a sunlit stone surface near a pool edge, warm golden summer light, resort fashion mood, soft reflections, elegant accessory advertising photography, clean composition, premium negative space --ar 4:5 --v 6",
    runwayPrompt:
      "Golden sunlight glides across a stone surface and catches the sunglasses lens reflections. The shot stays elegant and summery, ending on a clean resort-accessory hero.",
    storyboardScenes: [
      "Warm sun and stone texture establish a resort summer setting.",
      "The sunglasses catch soft lens reflections near the pool edge.",
      "The final frame holds a clean luxury accessory hero with seasonal copy space."
    ],
    cameraNotes:
      "Use a slightly low tabletop angle with lens reflections visible and the frame uncluttered.",
    lightingNotes:
      "Use warm golden natural light with soft pool reflections and controlled highlights on the lenses.",
    motionNotes:
      "Use subtle sunlight movement, gentle reflection shimmer, and a slow push-in.",
    aspectRatio: "4:5 or 1:1",
    duration: "6-10 seconds",
    promptVariations: [
      "Use a beach-luxury version with warmer tones and restrained lifestyle cues.",
      "Make it more urban and editorial while preserving summer brightness.",
      "Turn it into a stronger ecommerce accessory hero with fewer props."
    ],
    faqs: [
      {
        question: "What makes eyewear creative feel premium?",
        answer:
          "Clean shape visibility, controlled reflections, and a restrained accessory environment help most."
      },
      {
        question: "Can this work for DTC and retail campaigns?",
        answer:
          "Yes. It adapts well to ecommerce, social ads, and seasonal retail launch visuals."
      }
    ],
    relatedSlugs: ["handbag-product-ad", "seasonal-collection-launch", "activewear-performance-ad"]
  },
  {
    title: "Watch Product Shot",
    slug: "watch-product-shot",
    category: "Fashion",
    useCase: "Watch and accessory campaign",
    searchIntent: "watch product ad prompt",
    shortDescription:
      "Show a premium watch with clean dial visibility, material detail, and polished luxury accessory structure.",
    referenceImages: [
      "/assets/templates/watch-product-shot-1.svg",
      "/assets/templates/watch-main.png",
      "/assets/templates/watch-product-shot-3.svg"
    ],
    midjourneyPrompt:
      "unbranded luxury watch on dark stone and black leather surface, refined metal and glass highlights, clean dial visibility, deep shadows, premium accessory advertising photography, minimal composition, clean negative space --ar 4:5 --v 6",
    runwayPrompt:
      "A refined light sweep travels across the watch case, glass, and strap on a dark stone surface. The motion remains precise and luxurious, ending on a clean dial-focused accessory hero.",
    storyboardScenes: [
      "Dark stone and leather establish a premium watch setting.",
      "A controlled highlight reveals the case, glass, and strap material.",
      "The final frame holds clear dial visibility with luxury negative space."
    ],
    cameraNotes:
      "Use a precise product angle that keeps the dial readable and shows strap material detail.",
    lightingNotes:
      "Use low-key luxury lighting with narrow highlights on metal and glass, avoiding glare on the dial.",
    motionNotes:
      "Use a slow light sweep and tiny camera slide; keep motion restrained and premium.",
    aspectRatio: "4:5 or 1:1",
    duration: "8-12 seconds",
    promptVariations: [
      "Make the mood sport-luxury with cleaner contrast.",
      "Use a darker masculine luxury direction with deeper shadows.",
      "Shift to a brighter ecommerce-friendly accessory layout."
    ],
    faqs: [
      {
        question: "What is hardest about watch creative?",
        answer:
          "Controlling reflections while preserving dial readability is usually the key challenge."
      },
      {
        question: "Can this be adapted for jewelry-style campaigns?",
        answer:
          "Yes. The same precision approach works well across other premium metal accessories too."
      }
    ],
    relatedSlugs: ["minimalist-jewelry-campaign", "handbag-product-ad", "luxury-dress-editorial"]
  },
  {
    title: "Luxury Dress Editorial",
    slug: "luxury-dress-editorial",
    category: "Fashion",
    useCase: "Luxury apparel campaign",
    searchIntent: "luxury dress ad prompt",
    shortDescription:
      "Create a high-fashion dress editorial with elegant silhouette focus, fabric movement, and polished luxury light.",
    referenceImages: assetTriplet("Fashion"),
    midjourneyPrompt:
      "luxury dress editorial, elegant silhouette, premium fabric movement, polished fashion lighting, high-end apparel advertising, clean runway-inspired composition --ar 4:5 --v 6",
    runwayPrompt:
      "The dress silhouette is introduced through polished luxury light and subtle fabric movement. Motion stays refined and fashion-editorial, ending with a strong apparel hero frame.",
    storyboardScenes: [
      "Polished editorial light establishes a luxury apparel atmosphere.",
      "Fabric movement reveals silhouette and premium garment structure.",
      "The final frame holds a clean fashion hero with collection-level polish."
    ],
    cameraNotes:
      "Use full-length or three-quarter apparel framing with one detail insert for fabric texture.",
    lightingNotes:
      "Use polished luxury-fashion light that shapes silhouette while preserving fabric detail.",
    motionNotes:
      "Use restrained fabric movement and a smooth model or garment reveal.",
    aspectRatio: "4:5 or 16:9",
    duration: "8-14 seconds",
    promptVariations: [
      "Make the editorial mood more monochrome and runway-like.",
      "Use warmer evening-luxury tones while preserving silhouette clarity.",
      "Create a softer ecommerce-luxury version for landing pages."
    ],
    faqs: [
      {
        question: "Why is silhouette so important in apparel prompts?",
        answer:
          "Silhouette is often the fastest way viewers understand garment value, fit direction, and fashion identity."
      },
      {
        question: "Can this support seasonal collections?",
        answer:
          "Yes. It can anchor launch visuals for new collections, lookbooks, or premium sale campaigns."
      }
    ],
    relatedSlugs: ["fashion-lookbook-reel", "seasonal-collection-launch", "black-friday-fashion-sale"]
  },
  {
    title: "Activewear Performance Ad",
    slug: "activewear-performance-ad",
    category: "Fashion",
    useCase: "Activewear campaign",
    searchIntent: "activewear ad prompt",
    shortDescription:
      "Build a performance-fashion visual with clean movement cues, apparel clarity, and a modern athletic premium tone.",
    referenceImages: [
      "/assets/templates/activewear-performance-ad-1.svg",
      "/assets/templates/activewear-main.png",
      "/assets/templates/activewear-performance-ad-3.svg"
    ],
    midjourneyPrompt:
      "unbranded premium activewear outfit arranged in a clean studio setting, leggings, sports top, training shoes, breathable fabric texture, energetic directional lighting, sporty fashion advertising photography, product layout centered --ar 4:5 --v 6",
    runwayPrompt:
      "Energetic studio light reveals fabric texture across a premium activewear outfit. The camera moves from detail to full outfit layout, ending on a clean sporty performance-fashion hero.",
    storyboardScenes: [
      "Clean studio light establishes a modern activewear campaign mood.",
      "Fabric texture and training shoes create performance detail.",
      "The final frame holds the outfit as a polished athletic product hero."
    ],
    cameraNotes:
      "Use flatlay or slightly elevated product framing with clear garment shape and fabric texture.",
    lightingNotes:
      "Use energetic directional light with crisp fabric highlights and clean studio shadows.",
    motionNotes:
      "Use subtle fabric ripple, light sweep, and a smooth pullback to the full outfit.",
    aspectRatio: "4:5 or 9:16",
    duration: "7-12 seconds",
    promptVariations: [
      "Make the tone more fashion-editorial than gym-performance.",
      "Use a cleaner ecommerce-activewear variant with fewer lifestyle cues.",
      "Push the frame toward outdoor movement while preserving apparel focus."
    ],
    faqs: [
      {
        question: "What keeps activewear ads premium instead of generic?",
        answer:
          "Limit background noise, keep apparel readable, and let fit plus movement imply performance."
      },
      {
        question: "Can this work for launch and retargeting both?",
        answer:
          "Yes. The structure can be adapted for awareness creative or tighter conversion-focused layouts."
      }
    ],
    relatedSlugs: ["sneaker-launch-campaign", "ecommerce-fashion-hero", "retargeting-fashion-ad"]
  },
  {
    title: "Fashion UGC Try-On",
    slug: "fashion-ugc-try-on",
    category: "Fashion",
    useCase: "Fashion UGC campaign",
    searchIntent: "fashion UGC ad prompt",
    shortDescription:
      "Create a creator-style try-on ad with authentic styling, wearable context, and social-native outfit storytelling.",
    referenceImages: [
      "/assets/templates/fashion-ugc-try-on-1.svg",
      "/assets/templates/fashion-ugc-main.png",
      "/assets/templates/fashion-ugc-try-on-3.svg"
    ],
    midjourneyPrompt:
      "creator-style fashion UGC setup with stylish outfit details, folded jacket, handbag, sneakers, sunglasses, premium casual lifestyle setting, authentic social media fashion photography, polished but natural, no visible face, clean composition --ar 9:16 --v 6",
    runwayPrompt:
      "A creator-style fashion setup begins with close details of jacket, bag, shoes, and sunglasses in natural indoor light. The motion feels social-native and authentic, ending on a polished outfit-story frame without focusing on a face.",
    storyboardScenes: [
      "A natural indoor space establishes a believable creator fashion setup.",
      "Outfit details, bag, shoes, and sunglasses create the try-on story.",
      "The final frame holds a polished UGC-style fashion hero with CTA space."
    ],
    cameraNotes:
      "Use handheld-style detail crops and a final lifestyle composition that avoids face focus.",
    lightingNotes:
      "Use natural indoor light with soft lifestyle shadows and realistic fabric color.",
    motionNotes:
      "Use gentle handheld movement, quick detail cuts, and a clean final outfit lockup.",
    aspectRatio: "9:16",
    duration: "10-18 seconds",
    promptVariations: [
      "Make the try-on more polished while keeping creator authenticity.",
      "Use a founder-style presentation with the same outfit hierarchy.",
      "Shift to a more premium apartment setting for a cleaner social tone."
    ],
    faqs: [
      {
        question: "Why do try-on formats perform well for fashion ads?",
        answer:
          "They help people imagine fit, movement, and real-life styling faster than static product-only imagery."
      },
      {
        question: "Can this work without showing a full face?",
        answer:
          "Yes. Mirror crops, torso shots, and outfit movement can still communicate clearly."
      }
    ],
    relatedSlugs: ["tiktok-outfit-transition", "fashion-lookbook-reel", "ecommerce-fashion-hero"]
  },
  {
    title: "TikTok Outfit Transition",
    slug: "tiktok-outfit-transition",
    category: "Fashion",
    useCase: "Vertical fashion transition ad",
    searchIntent: "TikTok outfit transition prompt",
    shortDescription:
      "Build a short-form outfit transition with scroll-stopping pace, styling clarity, and creator-native fashion energy.",
    referenceImages: assetTriplet("Fashion"),
    midjourneyPrompt:
      "TikTok outfit transition ad, vertical fashion styling, clean before-after outfit switch, creator-native energy, strong apparel visibility, social-first composition --ar 9:16 --v 6",
    runwayPrompt:
      "A fast outfit transition drives the hook, moving from setup to styled look in a vertical social-native sequence. Motion ends on a clear fashion hero with CTA-ready space.",
    storyboardScenes: [
      "The vertical frame opens with a quick setup and immediate outfit context.",
      "A fast transition reveals the styled look with stronger fashion energy.",
      "The final frame keeps the outfit readable and conversion-ready."
    ],
    cameraNotes:
      "Use full-body vertical framing and protect enough space to make the transition legible.",
    lightingNotes:
      "Use clean bright light that keeps apparel color and fit visible during motion.",
    motionNotes:
      "Use a fast outfit-change transition followed by a stable final look lockup.",
    aspectRatio: "9:16",
    duration: "5-8 seconds",
    promptVariations: [
      "Make the transition more polished and editorial.",
      "Use a more casual creator-bedroom style setting.",
      "Build a brand-led sale or drop variation around the same transition logic."
    ],
    faqs: [
      {
        question: "What makes an outfit transition usable for ads?",
        answer:
          "The transition needs to be readable, quick, and still leave enough time for the final look to sell the product."
      },
      {
        question: "Can this work for multiple outfits?",
        answer:
          "Yes. You can chain multiple transitions, but one or two strong swaps usually perform better than too many."
      }
    ],
    relatedSlugs: ["fashion-ugc-try-on", "fashion-lookbook-reel", "streetwear-drop-promo"]
  },
  {
    title: "Ecommerce Fashion Hero",
    slug: "ecommerce-fashion-hero",
    category: "Fashion",
    useCase: "Fashion ecommerce hero visual",
    searchIntent: "ecommerce fashion hero prompt",
    shortDescription:
      "Create a fashion ecommerce hero with clear apparel hierarchy, polished styling, and clean landing-page flexibility.",
    referenceImages: [
      categoryReferenceImage.Fashion,
      "/assets/templates/fashion-main.png",
      categoryReferenceImage.Fashion
    ],
    midjourneyPrompt:
      "fashion ecommerce hero with apparel-first composition, polished styling, clean landing-page space, premium product hierarchy, modern retail visual design --ar 16:9 --v 6",
    runwayPrompt:
      "A polished fashion layout settles into a landing-page-friendly composition. Motion remains minimal and ecommerce-first, ending on a clean apparel hero ready for headline and CTA.",
    storyboardScenes: [
      "A clean retail-style layout establishes apparel hierarchy and landing-page structure.",
      "The apparel and styling details settle into a polished ecommerce composition.",
      "The final hero frame protects space for headline, offer, and CTA placement."
    ],
    cameraNotes:
      "Use a stable hero crop with apparel clarity and enough negative space for page copy.",
    lightingNotes:
      "Use bright polished retail light with clean separation between garment and background.",
    motionNotes:
      "Use subtle reveal motion and a stable final ecommerce lockup.",
    aspectRatio: "16:9 or 4:5",
    duration: "6-10 seconds",
    promptVariations: [
      "Create a darker premium fashion hero while preserving page-copy space.",
      "Use a cleaner marketplace-style version with less editorial styling.",
      "Add one accessory cue without weakening the apparel-first layout."
    ],
    faqs: [
      {
        question: "What makes a fashion ecommerce hero effective?",
        answer:
          "Apparel clarity, page-friendly negative space, and an immediately understandable product hierarchy."
      },
      {
        question: "Can this work across different apparel categories?",
        answer:
          "Yes. The structure is flexible across dresses, outerwear, activewear, and curated seasonal edits."
      }
    ],
    relatedSlugs: ["landing-page-hero-prompt", "fashion-lookbook-reel", "retargeting-fashion-ad"]
  },
  {
    title: "Seasonal Collection Launch",
    slug: "seasonal-collection-launch",
    category: "Fashion",
    useCase: "Fashion seasonal launch campaign",
    searchIntent: "seasonal collection launch prompt",
    shortDescription:
      "Show a new fashion collection with coordinated styling, campaign polish, and a clear launch-story structure.",
    referenceImages: assetTriplet("Fashion"),
    midjourneyPrompt:
      "seasonal fashion collection launch, coordinated apparel styling, premium campaign composition, collection-first hierarchy, refined editorial lighting, modern fashion brand storytelling --ar 4:5 --v 6",
    runwayPrompt:
      "A coordinated seasonal fashion collection enters through polished editorial pacing and clean styling hierarchy. Motion emphasizes launch energy before resolving into a collection-ready hero frame.",
    storyboardScenes: [
      "Coordinated styling establishes a clear seasonal collection mood.",
      "The collection hierarchy becomes visible through apparel grouping and editorial pacing.",
      "The final frame holds a launch-ready collection hero for campaign messaging."
    ],
    cameraNotes:
      "Use collection-level framing with enough separation to understand each key look or product group.",
    lightingNotes:
      "Use editorial campaign light that feels premium but still keeps product details readable.",
    motionNotes:
      "Use smooth launch pacing and a stable collection lockup at the end.",
    aspectRatio: "4:5 or 16:9",
    duration: "10-16 seconds",
    promptVariations: [
      "Make the launch more minimal and luxury-driven.",
      "Use a brighter commercial retail tone with stronger product clarity.",
      "Push it toward a social-first drop campaign with tighter pacing."
    ],
    faqs: [
      {
        question: "What is the difference between a lookbook and a collection launch prompt?",
        answer:
          "A collection launch usually carries stronger hierarchy, messaging space, and a clearer new-season announcement feel."
      },
      {
        question: "Can this support seasonal sale campaigns later?",
        answer:
          "Yes. The same visual system can later be adapted for markdowns, retargeting, or launch reminders."
      }
    ],
    relatedSlugs: ["fashion-lookbook-reel", "black-friday-fashion-sale", "product-launch-teaser"]
  },
  {
    title: "Retargeting Fashion Ad",
    slug: "retargeting-fashion-ad",
    category: "Fashion",
    useCase: "Fashion retargeting campaign",
    searchIntent: "retargeting fashion ad prompt",
    shortDescription:
      "Build a fashion retargeting frame with clear apparel focus, premium sales polish, and space for direct-response messaging.",
    referenceImages: [
      categoryReferenceImage.Fashion,
      "/assets/templates/fashion-main.png",
      categoryReferenceImage.Fashion
    ],
    midjourneyPrompt:
      "fashion retargeting ad with apparel-first hierarchy, clean promotional space, polished ecommerce styling, premium direct-response retail composition --ar 4:5 --v 6",
    runwayPrompt:
      "The frame opens with clean apparel hierarchy and premium retail styling. Motion stays restrained and conversion-aware, ending on a fashion hero built for offer copy and retargeting messaging.",
    storyboardScenes: [
      "A clean retail-fashion layout establishes conversion intent.",
      "Apparel remains central while offer space becomes more pronounced.",
      "The final frame locks into a direct-response fashion hero."
    ],
    cameraNotes:
      "Use centered apparel framing with protected messaging areas and clean retail structure.",
    lightingNotes:
      "Use bright polished fashion-retail light with strong garment separation from the background.",
    motionNotes:
      "Use gentle reveal motion and a firm final lockup suitable for conversion ads.",
    aspectRatio: "4:5 or 1:1",
    duration: "6-10 seconds",
    promptVariations: [
      "Make the retargeting frame more luxury and restrained.",
      "Turn it into a sale-led variant with stronger offer emphasis.",
      "Use a cleaner collection-based retargeting layout with multiple products."
    ],
    faqs: [
      {
        question: "What makes retargeting different from top-of-funnel fashion ads?",
        answer:
          "Retargeting usually needs clearer messaging space and a more direct product hierarchy while still looking branded."
      },
      {
        question: "Can this work with accessories too?",
        answer:
          "Yes. The same frame can support handbags, jewelry, watches, or mixed category retargeting sets."
      }
    ],
    relatedSlugs: ["ecommerce-fashion-hero", "black-friday-fashion-sale", "comparison-ad"]
  },
  {
    title: "Black Friday Fashion Sale",
    slug: "black-friday-fashion-sale",
    category: "Fashion",
    useCase: "Fashion sale campaign",
    searchIntent: "Black Friday fashion sale prompt",
    shortDescription:
      "Showcase a fashion sale frame with strong offer-space hierarchy, apparel-first presentation, and premium promotional contrast.",
    referenceImages: [
      categoryReferenceImage.Fashion,
      "/assets/templates/black-friday-main.png",
      categoryReferenceImage.Fashion
    ],
    midjourneyPrompt:
      "fashion sale creative with apparel-first hierarchy, dark premium promotional background, strong offer space, Black Friday retail energy, polished fashion advertising composition --ar 4:5 --v 6",
    runwayPrompt:
      "Dark premium sale lighting establishes urgency before apparel and offer space become central. Motion is concise and conversion-focused, ending in a polished Black Friday fashion lockup.",
    storyboardScenes: [
      "Dark premium sale light establishes urgency and fashion retail energy.",
      "Apparel and offer-space hierarchy settle into a clean promotional layout.",
      "The final frame holds a polished Black Friday fashion hero."
    ],
    cameraNotes:
      "Use apparel-first framing with enough protected space for offer, price, and CTA messaging.",
    lightingNotes:
      "Use premium sale contrast with strong garment readability and controlled background darkness.",
    motionNotes:
      "Use fast but minimal promotional pacing and a stable final lockup.",
    aspectRatio: "4:5, 1:1, or 9:16",
    duration: "6-10 seconds",
    promptVariations: [
      "Create a cleaner white Cyber Monday version with the same layout logic.",
      "Make the sale more luxury and less aggressive through reduced contrast.",
      "Use an accessory-led version with the same promotional hierarchy."
    ],
    faqs: [
      {
        question: "How do I keep sale ads from hurting a fashion brand?",
        answer:
          "Use a disciplined palette, keep the garment or accessory central, and avoid overcrowding the layout with noisy badges."
      },
      {
        question: "Can this be adapted for seasonal markdowns?",
        answer:
          "Yes. The same structure works for Black Friday, end-of-season, and flash-sale fashion campaigns."
      }
    ],
    relatedSlugs: ["black-friday-ad", "retargeting-fashion-ad", "seasonal-collection-launch"]
  },

  // General / Ecommerce (15)
  {
    title: "Product Launch Teaser",
    slug: "product-launch-teaser",
    category: "General",
    useCase: "Launch teaser campaign",
    searchIntent: "product launch teaser prompt",
    shortDescription:
      "Create a suspense-led launch teaser with partial reveal logic, clean silhouette control, and premium campaign anticipation.",
    referenceImages: [
      categoryReferenceImage.General,
      "/assets/templates/launch-teaser-main.png",
      categoryReferenceImage.General
    ],
    midjourneyPrompt:
      "product launch teaser with partial reveal, silhouette under light or material, premium campaign suspense, clean modern composition, launch anticipation, polished ad framing --ar 16:9 --v 6",
    runwayPrompt:
      "A silhouette and controlled light reveal create suspense around a new product. Motion stays deliberate and premium before ending on a teaser-ready campaign frame with launch space.",
    storyboardScenes: [
      "A silhouette or concealed product shape establishes launch anticipation.",
      "Controlled light reveals one key detail without showing the full product.",
      "The final teaser frame protects space for launch date or waitlist messaging."
    ],
    cameraNotes:
      "Use partial-detail framing and avoid fully revealing the product too early.",
    lightingNotes:
      "Use controlled launch lighting with a strong reveal highlight and restrained background detail.",
    motionNotes:
      "Use a slow suspenseful push-in and subtle reveal movement only.",
    aspectRatio: "16:9, 4:5, or 9:16",
    duration: "6-12 seconds",
    promptVariations: [
      "Make the teaser brighter and more playful while preserving suspense.",
      "Use a tech-startup blue gradient for SaaS or hardware launches.",
      "Add countdown copy space while keeping the reveal partial."
    ],
    faqs: [
      {
        question: "What makes a teaser useful?",
        answer:
          "It creates anticipation without overexplaining, which works well for launches, drops, and waitlist campaigns."
      },
      {
        question: "Can this work for products and software?",
        answer:
          "Yes. The suspense structure works across physical products, apps, features, and seasonal launches."
      }
    ],
    relatedSlugs: ["saas-feature-launch", "seasonal-collection-launch", "landing-page-hero-prompt"]
  },
  {
    title: "Ecommerce Hero Shot",
    slug: "ecommerce-hero-shot",
    category: "General",
    useCase: "Ecommerce hero visual",
    searchIntent: "ecommerce hero shot prompt",
    shortDescription:
      "Build a clean ecommerce hero with readable packaging, conversion-ready layout space, and polished lighting.",
    referenceImages: [
      categoryReferenceImage.General,
      "/assets/templates/ecommerce-hero-main.png",
      categoryReferenceImage.General
    ],
    midjourneyPrompt:
      "ecommerce hero shot with centered product packaging, clean gradient background, clear label readability, polished studio light, conversion-ready landing page composition --ar 16:9 --v 6",
    runwayPrompt:
      "A clean hero layout forms around a centered product while polished light keeps the packaging crisp and readable. Motion is minimal and landing-page friendly until the frame locks in.",
    storyboardScenes: [
      "A clean background and centered product establish ecommerce hierarchy.",
      "Polished lighting defines the product while preserving generous copy space.",
      "The final frame becomes a landing-page-friendly hero with strong readability."
    ],
    cameraNotes:
      "Use a direct front-facing product angle with enough negative space for headline and CTA.",
    lightingNotes:
      "Use soft studio light with crisp product edges and clean label clarity.",
    motionNotes:
      "Use minimal reveal motion and a stable final page-hero lockup.",
    aspectRatio: "16:9 or 4:5",
    duration: "6-10 seconds",
    promptVariations: [
      "Make the background pure white for a more marketplace-oriented hero.",
      "Add subtle lifestyle props without reducing product readability.",
      "Shift to a darker premium gradient while preserving clean page space."
    ],
    faqs: [
      {
        question: "Why is this useful beyond the homepage?",
        answer:
          "The same hero composition works across landing pages, emails, display units, and product collection banners."
      },
      {
        question: "Can it support multiple product categories?",
        answer:
          "Yes. It is intentionally category-neutral and adapts to beauty, food, fashion, and general ecommerce goods."
      }
    ],
    relatedSlugs: ["landing-page-hero-prompt", "meta-carousel-ad", "retargeting-offer-ad"]
  },
  {
    title: "UGC Ad Script",
    slug: "ugc-ad-script",
    category: "General",
    useCase: "Creator-style UGC campaign",
    searchIntent: "UGC ad script prompt",
    shortDescription:
      "Create a creator-style ad structure with hook, demo, proof, and CTA sequencing for conversion-focused campaigns.",
    referenceImages: [
      categoryReferenceImage.General,
      "/assets/templates/ugc-main.png",
      categoryReferenceImage.General
    ],
    midjourneyPrompt:
      "UGC ad visual with creator-style framing, product demo setup, authentic home environment, natural light, social ad structure, conversion-focused composition --ar 9:16 --v 6",
    runwayPrompt:
      "A creator-style ad begins with a hook, then moves through demo, proof, and CTA rhythm in a social-native environment. Motion stays handheld and authentic through the final product frame.",
    storyboardScenes: [
      "The opening hook introduces the product and problem quickly.",
      "A clear demo moment shows the product in use with believable context.",
      "The final CTA frame reinforces product visibility and next-step action."
    ],
    cameraNotes:
      "Use handheld eye-level framing with direct product demo visibility and one close proof insert.",
    lightingNotes:
      "Use natural daylight and home-style practicality instead of polished studio lighting.",
    motionNotes:
      "Use social-native pacing, fast cuts, and direct creator movement.",
    aspectRatio: "9:16",
    duration: "15-30 seconds",
    promptVariations: [
      "Shift to a founder-led version while keeping the same UGC structure.",
      "Make it more testimonial-driven with stronger proof language.",
      "Create a tighter retargeting-friendly edit with a faster CTA."
    ],
    faqs: [
      {
        question: "Does this only work for TikTok?",
        answer:
          "No. It is useful across Reels, Shorts, paid social, and creator-style landing page sections."
      },
      {
        question: "What makes UGC feel usable instead of generic?",
        answer:
          "Specific product interaction, a clear problem-solution structure, and believable creator pacing."
      }
    ],
    relatedSlugs: ["beauty-ugc-routine-ad", "food-ugc-taste-test", "fashion-ugc-try-on"]
  },
  {
    title: "Black Friday Ad",
    slug: "black-friday-ad",
    category: "General",
    useCase: "Promotional sale campaign",
    searchIntent: "Black Friday ad prompt",
    shortDescription:
      "Build a product-first Black Friday frame with strong sale hierarchy, dark contrast, and premium direct-response polish.",
    referenceImages: [
      categoryReferenceImage.General,
      "/assets/templates/black-friday-main.png",
      categoryReferenceImage.General
    ],
    midjourneyPrompt:
      "Black Friday ad creative with centered product, dark premium promotional background, bold offer space, conversion-ready ecommerce layout, polished sale lighting --ar 4:5 --v 6",
    runwayPrompt:
      "Dark promotional contrast opens the frame before the product becomes central and offer space locks into place. Motion stays urgent and clean, ending on a premium Black Friday hero.",
    storyboardScenes: [
      "Dark sale contrast establishes urgency and promotional intent.",
      "The product becomes central while offer-space hierarchy grows more visible.",
      "The final frame supports discount, deadline, and CTA messaging."
    ],
    cameraNotes:
      "Use centered product framing with protected copy zones for price and offer messaging.",
    lightingNotes:
      "Use premium sale contrast with controlled accent highlights and clean product readability.",
    motionNotes:
      "Use quick but controlled sale pacing that ends on a stable lockup.",
    aspectRatio: "4:5, 1:1, or 9:16",
    duration: "6-10 seconds",
    promptVariations: [
      "Create a cleaner Cyber Monday white variant with the same structure.",
      "Make the sale more luxury and restrained by reducing accent color.",
      "Use a bundle-first version while preserving clear product dominance."
    ],
    faqs: [
      {
        question: "How do I keep Black Friday ads from looking cheap?",
        answer:
          "Keep the product central, simplify the palette, and let the offer-space structure do more work than extra decoration."
      },
      {
        question: "Can this work for any category?",
        answer:
          "Yes. The sale hierarchy is category-neutral and adapts well to beauty, food, fashion, and SaaS offers."
      }
    ],
    relatedSlugs: ["seasonal-sale-campaign", "retargeting-offer-ad", "black-friday-fashion-sale"]
  },
  {
    title: "Seasonal Sale Campaign",
    slug: "seasonal-sale-campaign",
    category: "General",
    useCase: "Seasonal promotion",
    searchIntent: "seasonal sale prompt",
    shortDescription:
      "Create a product-first seasonal sale frame with tasteful accents, clean offer space, and flexible campaign styling.",
    referenceImages: [
      categoryReferenceImage.General,
      "/assets/templates/seasonal-sale-main.png",
      categoryReferenceImage.General
    ],
    midjourneyPrompt:
      "seasonal sale campaign with product-first composition, tasteful seasonal accents, polished ecommerce lighting, clean offer space, premium promotional design --ar 4:5 --v 6",
    runwayPrompt:
      "Subtle seasonal accents establish a timely campaign mood while the product remains central and readable. Motion stays polished and promotional through a clean final sale lockup.",
    storyboardScenes: [
      "Seasonal accents establish context without crowding the product.",
      "The product remains central while offer-space balance becomes clear.",
      "The final frame supports promotional messaging, dates, and CTA."
    ],
    cameraNotes:
      "Use a product-first retail composition with restrained props and clear negative space.",
    lightingNotes:
      "Use polished ecommerce light with soft seasonal color accents.",
    motionNotes:
      "Use gentle prop movement and a smooth product reveal rather than aggressive holiday effects.",
    aspectRatio: "4:5, 16:9, or 9:16",
    duration: "8-14 seconds",
    promptVariations: [
      "Use spring pastel energy while preserving the product-first layout.",
      "Turn it into a winter gift-guide variant with softer festive cues.",
      "Make it a summer sale version with brighter light and cleaner color."
    ],
    faqs: [
      {
        question: "What keeps seasonal sale ads feeling branded?",
        answer:
          "Use category-specific cues sparingly and keep the product plus offer hierarchy cleaner than the decorative layer."
      },
      {
        question: "Can this work outside major holidays?",
        answer:
          "Yes. It also fits summer sales, spring refreshes, end-of-season markdowns, and limited-time offers."
      }
    ],
    relatedSlugs: ["black-friday-ad", "seasonal-drink-campaign", "sunscreen-summer-campaign"]
  },
  {
    title: "SaaS Feature Launch",
    slug: "saas-feature-launch",
    category: "General",
    useCase: "SaaS product marketing",
    searchIntent: "SaaS feature launch prompt",
    shortDescription:
      "Build a clean SaaS feature launch visual with UI-led hierarchy, modern gradients, and product-marketing polish.",
    referenceImages: [
      "/assets/templates/saas-feature-launch-1.svg",
      "/assets/templates/saas-main.png",
      "/assets/templates/saas-feature-launch-3.svg"
    ],
    midjourneyPrompt:
      "modern laptop on a clean desk with abstract dashboard-like glow on screen, no readable UI text, soft blue lighting, premium SaaS product marketing, polished minimal tech commercial photography, product-centered composition, clean negative space --ar 16:9 --v 6",
    runwayPrompt:
      "Soft blue light reveals a laptop with an abstract dashboard glow. Interface shapes animate subtly without readable text, then the shot settles into a clean SaaS feature-launch hero.",
    storyboardScenes: [
      "A clean desk and laptop establish SaaS product-marketing context.",
      "Abstract dashboard shapes glow softly without readable UI text.",
      "The final frame holds a polished software launch hero with headline space."
    ],
    cameraNotes:
      "Use a clean three-quarter laptop angle with screen glow visible and plenty of headline space.",
    lightingNotes:
      "Use soft blue tech lighting, controlled reflections, and no readable interface words.",
    motionNotes:
      "Use subtle UI glow, slow camera push, and restrained product-marketing motion.",
    aspectRatio: "16:9 or 4:5",
    duration: "6-12 seconds",
    promptVariations: [
      "Make the gradient mood more enterprise and restrained.",
      "Push the feature launch toward startup optimism with brighter contrast.",
      "Create a more performance-marketing version with stronger CTA space."
    ],
    faqs: [
      {
        question: "Can a prompt library support SaaS marketing too?",
        answer:
          "Yes. The same principles of hierarchy, clarity, and conversion messaging apply to software launch visuals."
      },
      {
        question: "Is this only useful for landing pages?",
        answer:
          "No. It can support launch emails, social cards, display units, and announcement ads."
      }
    ],
    relatedSlugs: ["product-launch-teaser", "landing-page-hero-prompt", "linkedin-b2b-ad"]
  },
  {
    title: "App Install Ad",
    slug: "app-install-ad",
    category: "General",
    useCase: "App growth campaign",
    searchIntent: "app install ad prompt",
    shortDescription:
      "Create an app-growth visual with device framing, benefit-led hierarchy, and mobile performance-marketing clarity.",
    referenceImages: [
      "/assets/templates/app-install-ad-1.svg",
      "/assets/templates/app-growth-main.png",
      "/assets/templates/app-install-ad-3.svg"
    ],
    midjourneyPrompt:
      "modern smartphone on clean studio surface, abstract colorful app interface shapes on screen with no readable words, bright gradient lighting, polished mobile app growth advertising, product-centered composition, clean negative space --ar 16:9 --v 6",
    runwayPrompt:
      "A smartphone rises into a bright gradient frame as abstract app shapes animate on the screen. The motion stays simple and growth-focused, ending on a clean install-ready mobile ad hero.",
    storyboardScenes: [
      "A smartphone and gradient light establish mobile app growth context.",
      "Abstract colorful interface shapes animate without readable text.",
      "The final frame holds the phone with clear CTA-ready negative space."
    ],
    cameraNotes:
      "Use a centered phone hero angle with screen visible and simple surrounding space.",
    lightingNotes:
      "Use bright gradient tech lighting with clean reflections and no readable UI text.",
    motionNotes:
      "Use a phone rise, soft screen animation, and a stable final install-ad frame.",
    aspectRatio: "4:5 or 9:16",
    duration: "6-10 seconds",
    promptVariations: [
      "Make the design more consumer-social with brighter color.",
      "Use a more enterprise app tone with calmer contrast and cleaner gradients.",
      "Create a stronger direct-response version with clearer install CTA emphasis."
    ],
    faqs: [
      {
        question: "What matters most in app install creative?",
        answer:
          "Device readability, benefit hierarchy, and a layout that makes action feel obvious and low-friction."
      },
      {
        question: "Can this support TikTok and Meta placements?",
        answer:
          "Yes. It adapts well to both feed and vertical placements with only small ratio or pacing changes."
      }
    ],
    relatedSlugs: ["google-display-ad-creative", "youtube-shorts-ad", "meta-carousel-ad"]
  },
  {
    title: "Landing Page Hero Prompt",
    slug: "landing-page-hero-prompt",
    category: "General",
    useCase: "Landing page visual system",
    searchIntent: "landing page hero prompt",
    shortDescription:
      "Build a landing-page hero with strong headline space, clean product hierarchy, and polished conversion-oriented structure.",
    referenceImages: [
      "/assets/templates/landing-page-hero-prompt-1.svg",
      "/assets/templates/landing-page-main.png",
      "/assets/templates/landing-page-hero-prompt-3.svg"
    ],
    midjourneyPrompt:
      "abstract website layout cards floating in a clean studio scene, modern landing page visual system, polished SaaS aesthetic, soft shadows, blue and white gradient lighting, strong headline space, no readable text --ar 16:9 --v 6",
    runwayPrompt:
      "Abstract web layout cards float into a clean hero composition with soft shadows and clear headline space. Motion stays web-friendly and polished, ending on a conversion-ready landing page visual system.",
    storyboardScenes: [
      "Floating layout cards establish a modern landing-page system.",
      "Soft shadows and gradient light create depth around the hero structure.",
      "The final frame holds clear headline space and conversion-ready hierarchy."
    ],
    cameraNotes:
      "Use a wide hero crop with layout cards offset to preserve headline and CTA space.",
    lightingNotes:
      "Use soft blue-white gradient lighting and clean shadows that feel modern but not busy.",
    motionNotes:
      "Use gentle floating card motion and a slow settle into the final web hero layout.",
    aspectRatio: "16:9",
    duration: "6-10 seconds",
    promptVariations: [
      "Make the hero more editorial while preserving headline space.",
      "Use a brighter SaaS-style gradient instead of a product-heavy retail mood.",
      "Shift the composition toward a premium dark-mode website aesthetic."
    ],
    faqs: [
      {
        question: "What makes a landing-page hero usable?",
        answer:
          "The visual has to support copy, not fight it, while still making the product or offer immediately understandable."
      },
      {
        question: "Can this work across SaaS and ecommerce?",
        answer:
          "Yes. The layout principle is universal and can flex between software, product, or campaign landing pages."
      }
    ],
    relatedSlugs: ["ecommerce-hero-shot", "saas-feature-launch", "comparison-ad"]
  },
  {
    title: "Google Display Ad Creative",
    slug: "google-display-ad-creative",
    category: "General",
    useCase: "Display advertising",
    searchIntent: "Google Display ad creative prompt",
    shortDescription:
      "Create a display-ad-ready visual with simple product hierarchy, readable message zones, and broad campaign flexibility.",
    referenceImages: assetTriplet("General"),
    midjourneyPrompt:
      "Google Display ad creative, simple product hierarchy, clear message zones, polished campaign composition, broad ecommerce and lead-gen flexibility, clean ad-ready design --ar 16:9 --v 6",
    runwayPrompt:
      "A clean display-friendly layout forms around the product or offer while messaging zones remain obvious and readable. Motion is minimal and banner-friendly until the final lockup settles.",
    storyboardScenes: [
      "A simple layout establishes display-ad hierarchy and broad campaign usability.",
      "The product or offer becomes central without crowding message space.",
      "The final frame supports banner messaging, CTA, and broad campaign adaptation."
    ],
    cameraNotes:
      "Use a simple composition that can be adapted to banner sizes and multiple ad placements.",
    lightingNotes:
      "Use clean broad-use advertising light with easy readability and low visual noise.",
    motionNotes:
      "Use minimal motion and clear end-state hierarchy suitable for display placements.",
    aspectRatio: "16:9 or 1.91:1",
    duration: "6-8 seconds",
    promptVariations: [
      "Make the display direction more retail and product-led.",
      "Shift toward SaaS lead generation with stronger interface cues.",
      "Create a premium brand-awareness version with softer promotion emphasis."
    ],
    faqs: [
      {
        question: "Why is simplicity important in display ads?",
        answer:
          "Display units are often small or quick to scan, so the message and visual hierarchy need to be very clear."
      },
      {
        question: "Can this support remarketing campaigns?",
        answer:
          "Yes. It adapts cleanly to remarketing, offer reminders, or top-of-funnel brand units."
      }
    ],
    relatedSlugs: ["retargeting-offer-ad", "app-install-ad", "meta-carousel-ad"]
  },
  {
    title: "Meta Carousel Ad",
    slug: "meta-carousel-ad",
    category: "General",
    useCase: "Meta carousel campaign",
    searchIntent: "Meta carousel ad prompt",
    shortDescription:
      "Build a carousel-ready visual framework with product sequence logic, clean card hierarchy, and conversion-friendly storytelling.",
    referenceImages: [
      "/assets/templates/meta-carousel-ad-1.svg",
      "/assets/templates/meta-carousel-main.png",
      "/assets/templates/meta-carousel-ad-3.svg"
    ],
    midjourneyPrompt:
      "multiple abstract social ad cards arranged in perspective on a clean studio surface, modern Meta carousel campaign visual system, bright professional lighting, colorful premium marketing style, no readable text, no logos --ar 4:5 --v 6",
    runwayPrompt:
      "A sequence of abstract ad cards slides into perspective, creating a clean social carousel system. Motion emphasizes card-to-card hierarchy and ends on a polished conversion-friendly carousel hero.",
    storyboardScenes: [
      "A first abstract ad card establishes the social carousel structure.",
      "Additional cards slide into perspective with clear sequence hierarchy.",
      "The final frame holds a polished carousel system with space for campaign messaging."
    ],
    cameraNotes:
      "Use a perspective card layout with enough spacing to show sequence without clutter.",
    lightingNotes:
      "Use bright professional studio light with premium color accents and no readable text.",
    motionNotes:
      "Use smooth card slide-ins, subtle depth shifts, and a clean final carousel lockup.",
    aspectRatio: "4:5",
    duration: "6-10 seconds",
    promptVariations: [
      "Make the carousel more education-led with cleaner benefit framing.",
      "Shift toward product-comparison storytelling with the same modular logic.",
      "Use a more premium brand feel while preserving strong card clarity."
    ],
    faqs: [
      {
        question: "Why think in systems for carousel prompts?",
        answer:
          "Carousel ads usually perform better when the visual language carries consistently from the first card through the rest."
      },
      {
        question: "Can this work for collections and bundles?",
        answer:
          "Yes. Carousel structures are especially useful for bundles, before-and-after flows, features, and multiple SKUs."
      }
    ],
    relatedSlugs: ["meta-beauty-retargeting-ad", "comparison-ad", "ecommerce-hero-shot"]
  },
  {
    title: "YouTube Shorts Ad",
    slug: "youtube-shorts-ad",
    category: "General",
    useCase: "Short-form video ad",
    searchIntent: "YouTube Shorts ad prompt",
    shortDescription:
      "Create a short-form ad with immediate hook potential, clear product hierarchy, and platform-native pacing for Shorts.",
    referenceImages: assetTriplet("General"),
    midjourneyPrompt:
      "YouTube Shorts ad visual with fast hook energy, clear product hierarchy, vertical storytelling, polished social-video design, modern ad-ready composition --ar 9:16 --v 6",
    runwayPrompt:
      "The ad opens with a fast visual hook, then moves into product clarity and a concise CTA structure. Motion is platform-native for Shorts and ends on a strong vertical hero frame.",
    storyboardScenes: [
      "A fast first-frame hook establishes vertical short-form attention.",
      "The product or offer becomes clear through quick but readable pacing.",
      "The final frame delivers a concise CTA and branded lockup."
    ],
    cameraNotes:
      "Use a bold vertical crop with immediate hierarchy and fast readability.",
    lightingNotes:
      "Use clean high-clarity light that still holds up under quick vertical edits.",
    motionNotes:
      "Use a strong hook, quick pacing, and a short stable finish for CTA clarity.",
    aspectRatio: "9:16",
    duration: "6-12 seconds",
    promptVariations: [
      "Make the hook more product-led and less creator-led.",
      "Shift toward a higher-end brand tone with slower ending motion.",
      "Use a stronger direct-response finish with more offer emphasis."
    ],
    faqs: [
      {
        question: "How are Shorts ads different from feed ads?",
        answer:
          "They need a stronger opening beat and tighter pacing because the viewer is moving through full-screen vertical content quickly."
      },
      {
        question: "Can this adapt to TikTok or Reels?",
        answer:
          "Yes. The overall structure is highly portable across the three main short-form platforms."
      }
    ],
    relatedSlugs: ["tiktok-recipe-ad", "app-install-ad", "ugc-ad-script"]
  },
  {
    title: "LinkedIn B2B Ad",
    slug: "linkedin-b2b-ad",
    category: "General",
    useCase: "B2B lead generation campaign",
    searchIntent: "LinkedIn B2B ad prompt",
    shortDescription:
      "Create a professional B2B campaign visual with cleaner hierarchy, credible polish, and a business-ready conversion frame.",
    referenceImages: [
      "/assets/templates/linkedin-b2b-ad-1.svg",
      "/assets/templates/b2b-lead-main.png",
      "/assets/templates/linkedin-b2b-ad-3.svg"
    ],
    midjourneyPrompt:
      "clean business desk with laptop, abstract chart shapes and soft data visualization glow, no readable text, professional blue and white lighting, premium B2B lead generation advertising, polished enterprise marketing style, clean negative space --ar 16:9 --v 6",
    runwayPrompt:
      "A clean business desk and laptop appear under professional blue-white light as abstract chart shapes glow softly. Motion remains credible and restrained, ending on a polished B2B lead-generation hero.",
    storyboardScenes: [
      "A clean business desk establishes professional B2B context.",
      "Abstract data shapes glow around the laptop without readable UI text.",
      "The final frame holds a credible lead-generation hero with clean CTA space."
    ],
    cameraNotes:
      "Use a professional desk-level angle with laptop and data shapes balanced around clear copy space.",
    lightingNotes:
      "Use blue-white enterprise lighting with restrained glow and no readable chart labels.",
    motionNotes:
      "Use subtle data glow, slow push-in, and a stable professional final frame.",
    aspectRatio: "4:5 or 16:9",
    duration: "6-12 seconds",
    promptVariations: [
      "Make the visual more startup-modern with brighter gradients.",
      "Use a more enterprise-formal layout with calmer spacing and contrast.",
      "Create a stronger demo-focused version with interface emphasis."
    ],
    faqs: [
      {
        question: "What makes LinkedIn creative effective?",
        answer:
          "Clarity, credibility, and a layout that respects professional expectations usually matter more than flashy motion."
      },
      {
        question: "Can this work for SaaS and service businesses?",
        answer:
          "Yes. It adapts well to software, consulting, B2B tools, and event or webinar promotions."
      }
    ],
    relatedSlugs: ["saas-feature-launch", "landing-page-hero-prompt", "testimonial-ad"]
  },
  {
    title: "Testimonial Ad",
    slug: "testimonial-ad",
    category: "General",
    useCase: "Social proof campaign",
    searchIntent: "testimonial ad prompt",
    shortDescription:
      "Create a proof-led ad structure with credibility, quote space, and a clean conversion-oriented product layout.",
    referenceImages: assetTriplet("General"),
    midjourneyPrompt:
      "testimonial ad creative with product-first proof layout, quote-ready message space, polished social proof composition, clean conversion design, premium but credible marketing visual --ar 4:5 --v 6",
    runwayPrompt:
      "A clean product-and-proof layout appears as quote space and credibility cues settle into place. Motion is subtle and trustworthy, ending on a strong testimonial-style campaign frame.",
    storyboardScenes: [
      "A product-first proof layout establishes credibility and conversion intent.",
      "Quote or review support becomes clearer while the product remains visible.",
      "The final frame balances social proof, product, and CTA hierarchy."
    ],
    cameraNotes:
      "Use product visibility plus clean quote or proof zones in the same composition.",
    lightingNotes:
      "Use bright credible advertising light with minimal dramatic contrast.",
    motionNotes:
      "Use subtle motion that supports readability and trust rather than spectacle.",
    aspectRatio: "4:5 or 1:1",
    duration: "6-10 seconds",
    promptVariations: [
      "Make the testimonial more UGC-like and creator-friendly.",
      "Use a B2B social-proof direction with calmer visual pacing.",
      "Turn it into a retargeting-ready proof frame with stronger CTA space."
    ],
    faqs: [
      {
        question: "Why do testimonial ads work?",
        answer:
          "They reduce uncertainty by combining product clarity with social proof, which is especially useful lower in the funnel."
      },
      {
        question: "Can I use this for service businesses?",
        answer:
          "Yes. Replace the product hero with a service proof visual or platform interface and keep the same credibility logic."
      }
    ],
    relatedSlugs: ["ugc-ad-script", "comparison-ad", "retargeting-offer-ad"]
  },
  {
    title: "Comparison Ad",
    slug: "comparison-ad",
    category: "General",
    useCase: "Product comparison campaign",
    searchIntent: "comparison ad prompt",
    shortDescription:
      "Build a structured comparison visual with clear side-by-side logic, product hierarchy, and persuasive simplicity.",
    referenceImages: assetTriplet("General"),
    midjourneyPrompt:
      "comparison ad creative with clean side-by-side layout, strong product hierarchy, persuasive clarity, premium campaign composition, structured difference-driven visual storytelling --ar 4:5 --v 6",
    runwayPrompt:
      "A clean side-by-side layout establishes comparison logic while the product or offer remains easy to scan. Motion stays restrained and clarity-led until the final comparison frame settles.",
    storyboardScenes: [
      "A clean split layout establishes immediate comparison logic.",
      "Differences become clear while the product hierarchy stays easy to understand.",
      "The final frame balances persuasion, readability, and CTA space."
    ],
    cameraNotes:
      "Use a clean two-zone or modular layout with clear side-by-side hierarchy.",
    lightingNotes:
      "Use consistent lighting across both comparison zones to keep the contrast readable.",
    motionNotes:
      "Use subtle transitions between the two zones and a stable final comparison lockup.",
    aspectRatio: "4:5 or 16:9",
    duration: "6-10 seconds",
    promptVariations: [
      "Make the comparison more ecommerce and feature-led.",
      "Use a B2B or SaaS comparison direction with stronger interface cues.",
      "Create a cleaner sale-oriented version with stronger CTA emphasis."
    ],
    faqs: [
      {
        question: "When do comparison ads work best?",
        answer:
          "They work best when the audience already understands the category and needs a clearer reason to choose one option."
      },
      {
        question: "Can comparison ads feel premium?",
        answer:
          "Yes. Keep the layout clean, the message simple, and the lighting consistent rather than overloading the frame with claims."
      }
    ],
    relatedSlugs: ["testimonial-ad", "retargeting-offer-ad", "meta-carousel-ad"]
  },
  {
    title: "Retargeting Offer Ad",
    slug: "retargeting-offer-ad",
    category: "General",
    useCase: "Retargeting conversion campaign",
    searchIntent: "retargeting offer ad prompt",
    shortDescription:
      "Create a conversion-ready retargeting frame with clear product focus, direct offer hierarchy, and polished sales intent.",
    referenceImages: assetTriplet("General"),
    midjourneyPrompt:
      "retargeting offer ad with product-first hierarchy, direct offer space, polished ecommerce design, premium conversion-focused layout, clear urgency and CTA structure --ar 4:5 --v 6",
    runwayPrompt:
      "A clean offer-led layout appears around the product while urgency and CTA space become obvious. Motion stays concise and conversion-focused, ending on a clear retargeting hero frame.",
    storyboardScenes: [
      "A clean offer-led frame establishes retargeting and conversion intent.",
      "The product remains central while urgency and CTA space become more explicit.",
      "The final frame holds a polished direct-response layout built for action."
    ],
    cameraNotes:
      "Use centered product framing with generous message zones for urgency and offer copy.",
    lightingNotes:
      "Use bright polished retail light with strong product clarity and restrained background noise.",
    motionNotes:
      "Use concise direct-response pacing and a stable final conversion lockup.",
    aspectRatio: "4:5 or 1:1",
    duration: "6-10 seconds",
    promptVariations: [
      "Make the retargeting frame more luxury and less overtly promotional.",
      "Turn it into a bundle-offer layout while preserving clarity.",
      "Use a cleaner general-ecommerce version for product reminder ads."
    ],
    faqs: [
      {
        question: "What is the main job of a retargeting offer ad?",
        answer:
          "It should reduce friction, make the offer obvious, and help the viewer move from interest to action quickly."
      },
      {
        question: "Can this structure work across industries?",
        answer:
          "Yes. It works for physical products, apps, SaaS offers, service promotions, and lead-generation campaigns."
      }
    ],
    relatedSlugs: ["black-friday-ad", "comparison-ad", "testimonial-ad"]
  }
];

export const templates: PromptTemplate[] = templateSeeds.map(template);

export const categories: TemplateCategory[] = ["Beauty", "Food", "Fashion", "General"];

export const primaryCategories: TemplateCategory[] = ["Beauty", "Food", "Fashion"];
