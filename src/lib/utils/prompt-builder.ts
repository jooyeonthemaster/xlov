import { Member, ResponseData } from '@/types'

// HEX color to poetic color name conversion
const COLOR_NAME_MAP: Record<string, string> = {
  '#FFD700': 'molten gold, like liquid sunlight captured in amber honey, warm and opulent',
  '#FF6B6B': 'living coral, the blush of dawn reflecting on ocean waves, passionate yet tender',
  '#4ECDC4': 'aquamarine depths, the color where sky meets tropical sea at the horizon',
  '#9B59B6': 'deep amethyst twilight, the mysterious purple of last light before darkness',
  '#2C3E50': 'midnight ocean, the infinite depth of a starless sea under moonless sky',
  '#F39C12': 'burnt sienna amber, aged whiskey in crystal catching firelight',
  '#1ABC9C': 'jade garden after rain, the luminous green of ancient temple ponds',
  '#E74C3C': 'crimson passion, the deep red of velvet roses at their peak bloom',
  '#ECF0F1': 'pearl frost, the delicate silver-white of morning dew on silk',
  '#34495E': 'charcoal storm, thunderclouds gathering over slate mountains',
  '#FF9FF3': 'cherry blossom kiss, the ephemeral pink of petals falling in spring wind',
  '#00D2D3': 'crystalline cyan, glacier ice refracting arctic sunlight',
}

// Elaborate, poetic season descriptions for conceptual depth
const SEASON_MAP: Record<string, string> = {
  spring: `the essence of spring awakening - cherry blossom petals drifting like pink snow through golden afternoon light,
    fresh dewdrops on newborn leaves catching prismatic rainbows, the gentle warmth of rebirth and new beginnings,
    soft pastel gradients of pink, mint green and lavender filling the atmosphere like a watercolor painting coming to life,
    delicate sakura branches framing the composition with organic, asymmetrical beauty`,
  summer: `the intoxicating heat of midsummer - golden hour sunlight dripping like honey through humid air,
    sun-kissed skin glistening with the natural sheen of warmth, vibrant tropical energy pulsing through every element,
    rich amber and coral tones bleeding into deep turquoise shadows, the languid sensuality of long summer evenings,
    heat waves creating dreamy distortions in the atmosphere, bold confidence radiating from within`,
  autumn: `the melancholic beauty of autumn's decay - crimson and amber leaves falling in slow motion through misty air,
    warm burgundy and burnt orange tones wrapping everything in nostalgic warmth, the bittersweet romance of endings,
    soft golden light filtering through bare branches creating intricate shadow patterns, vintage film warmth and grain,
    rich earth tones and deep reds suggesting both harvest abundance and impending winter stillness`,
  winter: `the crystalline silence of deep winter - frost patterns like delicate lace on every surface,
    pale blue and silver tones creating an otherworldly, ethereal atmosphere, breath visible in cold air,
    stark beauty in bare landscapes, moonlight reflecting off fresh snow creating diamond sparkles,
    the quiet intimacy of cold nights, elegant minimalism and pristine purity in every element`,
}

// Elaborate time-of-day lighting and atmosphere descriptions
const TIME_MAP: Record<string, string> = {
  dawn: `the sacred hour before sunrise - sky painted in gradients of rose, lavender, peach and pale gold,
    ethereal morning mist softening all edges into dreamlike diffusion, the world holding its breath in anticipation,
    first rays of sun creating celestial rim lighting, dew-covered surfaces catching and scattering light like tiny prisms,
    the liminal space between dream and waking, hushed and magical, everything bathed in otherworldly pink-gold glow`,
  morning: `crisp morning clarity - clean, bright natural light casting sharp but gentle shadows,
    fresh blue sky energy infusing everything with vitality and optimism, the pristine quality of a new day,
    dewy freshness making colors appear more vivid and saturated, air feeling clean and full of possibility,
    golden-white light creating luminous skin tones and sparkling catch lights in eyes`,
  afternoon: `the golden poetry of late afternoon - warm amber light streaming at low angles creating dramatic chiaroscuro,
    long shadows adding depth and mystery to every surface, rich warm tones making everything feel precious and timeless,
    the nostalgic quality of light just before magic hour, dust particles visible in sunbeams like floating gold,
    skin glowing with warm undertones, the comfortable intimacy of fading daylight`,
  night: `cinematic nocturnal mystery - moonlight casting silver-blue illumination over everything,
    subtle interplay of cool shadows and warm artificial light sources, the intimate drama of darkness,
    city lights creating bokeh orbs in the background, stars and neon reflections adding points of brilliance,
    the seductive mystery of nighttime, faces half-illuminated creating intrigue and depth`,
}

// Elaborate texture and mood descriptions
const TEXTURE_MAP: Record<string, string> = {
  soft: `cloud-like softness pervading every element - gentle diffused lighting eliminating harsh shadows,
    fabric draping with fluid grace, hair moving like silk in gentle breeze, skin appearing luminous and touchable,
    pastel color palette with subtle gradients, dreamy bokeh blurring background into abstract impressionism,
    the tenderness of cashmere against skin, velvet shadows and cotton-candy highlights`,
  rough: `raw artistic texture with intentional beautiful imperfections - visible film grain adding analog warmth,
    textured surfaces catching light in complex patterns, hair with natural flyaways and organic movement,
    deliberate contrast and shadow play creating dramatic tension, authenticity over perfection,
    industrial and organic elements mixing, the beauty found in weathered surfaces and honest wear`,
  flowing: `liquid movement frozen in time - fabric and hair caught mid-motion creating dynamic sculptural forms,
    the graceful arc of movement suggesting dance or wind, fluidity in every line and curve,
    silk, satin, and chiffon creating abstract shapes as they flow through air,
    water or wind as invisible forces shaping the composition, elegant motion blur suggesting life and energy`,
  sharp: `razor-precise clarity with crystalline detail - every element in perfect focus with stunning definition,
    clean geometric lines and precise composition, high contrast creating bold graphic impact,
    architectural precision in framing, minimal elements maximally impactful,
    the satisfying clarity of perfect resolution, edges crisp as cut glass`,
  warm: `enveloping warmth radiating from within - golden and amber tones suffusing every element,
    cozy intimacy like being wrapped in cashmere by firelight, rich earth tones and sunset colors,
    soft focus creating the hazy comfort of cherished memories, the embrace of belonging,
    honey-colored light making skin glow with inner warmth, inviting and nurturing atmosphere`,
  cool: `refined elegance with ice-blue sophistication - silver and slate tones creating sleek modernism,
    marble-smooth surfaces reflecting cool light, minimalist luxury and restrained power,
    the composed beauty of controlled emotion, elegant distance that intrigues rather than repels,
    moonlit tones and metallic accents, the allure of something precious and untouchable`,
}

// Elaborate emotion and expression descriptions
const EMOTION_MAP: Record<string, string> = {
  warm: `genuine warmth radiating from within - eyes crinkled with authentic joy, natural asymmetric smile,
    the comfortable intimacy of someone who makes you feel at home, accessible and real,
    soft gaze that invites connection, relaxed facial muscles suggesting true contentment,
    the kind of beauty that puts others at ease, nurturing energy visible in every feature`,
  cold: `aristocratic cool elegance - composed features suggesting hidden depths, imperious yet magnetic,
    the untouchable beauty of carved marble, eyes that see everything and reveal nothing,
    controlled expression hinting at vast inner complexity, elegant restraint as strength,
    the allure of mystery and distance, power in stillness and silence`,
  intense: `magnetic intensity that commands attention - eyes that pierce through to the soul,
    the focused energy of barely contained passion, charisma that fills every frame,
    strong features set with purpose and conviction, the compelling presence that makes hearts race,
    raw emotional power radiating outward, impossible to look away from`,
  peaceful: `transcendent serenity visible in every feature - meditation-calm eyes and relaxed brow,
    the gentle strength of inner peace, features softened by genuine tranquility,
    breathing space and stillness as composition elements, timeless calm unaffected by chaos,
    the beauty of someone at complete peace with themselves, buddha-like composure`,
  mysterious: `enigmatic allure that raises more questions than answers - eyes holding secrets and stories,
    expression shifting depending on the angle of light, the intrigue of the unknowable,
    half-revealed beauty that demands closer attention, shadow and light playing across features,
    the magnetic pull of mystery, every glance suggesting hidden depths`,
  playful: `effervescent joy sparkling in every feature - genuine laughter caught mid-burst,
    mischievous light dancing in eyes, the infectious energy of someone fully alive,
    spontaneous and unguarded moments of pure delight, natural asymmetry of real emotion,
    the irresistible charm of someone who doesn't take themselves too seriously, pure fun`,
}

// Get color description from HEX or return a poetic interpretation
function getColorDescription(hex: string): string {
  if (COLOR_NAME_MAP[hex]) {
    return COLOR_NAME_MAP[hex]
  }
  // For custom colors, create a poetic description based on the hex
  return `a unique custom shade (${hex}) that should be interpreted artistically and woven throughout the composition in lighting, environment, wardrobe, or subtle color grading`
}

export function buildImagePrompt(
  member: Member,
  responses: ResponseData
): string {
  const colorDesc = getColorDescription(responses.color)
  const seasonDesc = SEASON_MAP[responses.season] || responses.season
  const timeDesc = TIME_MAP[responses.timeOfDay] || responses.timeOfDay
  const textureDesc = TEXTURE_MAP[responses.texture] || responses.texture
  const emotionDesc = EMOTION_MAP[responses.emotion] || responses.emotion

  return `=== ABSOLUTE PRIORITY: FACIAL IDENTITY PRESERVATION ===
The person's EXACT facial features from the reference image must be preserved with 100% fidelity.
Every detail - the precise shape of eyes, nose, lips, jawline, cheekbones, eyebrows, facial proportions,
and all unique distinguishing characteristics - must remain IDENTICAL to the reference.
This is the most critical requirement and cannot be compromised under any circumstances.

=== ANTI-AI APPEARANCE DIRECTIVE (CRITICAL) ===
This image MUST look like a REAL photograph taken by a human photographer, NOT AI-generated.
MANDATORY natural imperfections to include:
- Real film grain texture (Kodak Portra 400 or Fuji Pro 400H characteristic grain)
- Natural skin texture: visible pores, subtle blemishes, micro-lines, natural oiliness variation
- Skin should have REAL human texture - NOT smooth, NOT waxy, NOT plastic, NOT airbrushed
- Asymmetry in facial features (natural human asymmetry, not perfect symmetry)
- Subtle imperfections: stray hairs, minor fabric wrinkles, dust particles in light
- Natural color variation across skin (redder cheeks, different undertones)
- Realistic subsurface scattering showing blood vessels subtly beneath skin
- Natural shininess variation: T-zone slightly oilier, matte areas where appropriate
- Hair should have natural flyaways, not every strand perfect
- Realistic catch lights in eyes with actual environmental reflection
- Natural depth of field with organic bokeh, not artificially perfect circles

AVOID these AI tells at all costs:
- Overly smooth, poreless skin (the "plastic" look)
- Perfect symmetry in features
- Unnaturally uniform skin tones
- Too-perfect hair without any flyaways
- Wax-figure-like appearance
- Artificial-looking eyes or teeth
- Overly saturated or HDR-looking colors
- The uncanny valley effect

=== CONCEPTUAL CREATIVE DIRECTION ===

COLOR ESSENCE:
${colorDesc}
Weave this color poetically throughout the image - in the lighting quality, environmental elements,
wardrobe choices, subtle color grading, and atmospheric haze. The color should feel like an emotional presence,
not just a literal application.

SEASONAL ATMOSPHERE:
${seasonDesc}

TEMPORAL LIGHT QUALITY:
${timeDesc}

TEXTURAL MOOD:
${textureDesc}

EMOTIONAL RESONANCE:
${emotionDesc}

CONCEPTUAL ANCHOR - THE DEFINING WORD: "${responses.oneWord}"
This single word should inform the entire emotional and visual narrative of the image.
Let it guide the subtle choices in expression, posture, atmosphere, and composition.
The viewer should feel this word emanating from the image even without knowing what it is.

=== TECHNICAL PHOTOGRAPHY SPECIFICATIONS ===

Camera & Lens (for reference quality):
- Medium format digital (Hasselblad X2D 100C) or high-end full frame (Sony A7R V)
- Prime portrait lens: 85mm f/1.4 or 105mm f/1.4
- Shot wide open or slightly stopped down (f/1.4 - f/2.8) for natural bokeh
- Low ISO (100-400) preserving shadow detail and natural grain structure

Lighting Philosophy:
- Natural or naturalistic lighting that feels organic, not studio-artificial
- Motivated lighting that makes sense for the time of day and environment
- Beautiful interplay of highlight and shadow creating dimensional form
- Catch lights in eyes that reflect a believable light source

Film Stock Reference:
Emulate the characteristics of premium analog film:
- Kodak Portra 400 for warm, flattering skin tones with beautiful grain
- Fuji Pro 400H for slightly cooler, ethereal quality
- Natural color rolloff in highlights and shadows
- Organic grain structure that adds texture without being distracting

=== COMPOSITION & STYLING ===

Framing: Editorial portrait or fashion photography composition
- Asymmetrical balance, rule of thirds, or intentional center composition
- Meaningful negative space that contributes to mood
- Environmental elements that support the conceptual narrative
- Magazine editorial quality suitable for Vogue, W Magazine, or Dazed

Styling Direction:
- Fashion-forward choices that complement the color theme
- Wardrobe and accessories that feel organic to the concept
- Hair and makeup that enhance natural beauty while supporting the mood
- Every element should feel intentionally chosen, not randomly placed

=== OUTPUT EXPECTATION ===

Create a photograph that could be mistaken for the work of Tim Walker, Paolo Roversi, Peter Lindbergh,
or Annie Leibovitz - master photographers who capture humanity and beauty with artistic vision.
The image should feel like a precious moment captured on film, with all the beautiful imperfections
and organic qualities that make real photographs feel alive.

The final result should be a conceptual portrait that tells a story, evokes emotion, and showcases
the subject's unique beauty through the creative lens of the user's selections - all while maintaining
absolute fidelity to the reference face and avoiding any hint of artificial generation.`
}

export function buildAggregatedPrompt(
  member: Member,
  topResponses: {
    topColors: string[]
    topSeasons: string[]
    topTextures: string[]
    topEmotions: string[]
    topWords: string[]
  }
): string {
  const seasons = topResponses.topSeasons
    .map((s) => SEASON_MAP[s] || s)
    .join(' and ')
  const textures = topResponses.topTextures
    .map((t) => TEXTURE_MAP[t] || t)
    .join(', ')
  const emotions = topResponses.topEmotions
    .map((e) => EMOTION_MAP[e] || e)
    .join(', ')

  return `Create an artistic portrait representing the COLLECTIVE PERCEPTION of "${member.name}" (${member.englishName}) from K-pop group XLOV, as imagined by thousands of fans worldwide.

AGGREGATED FAN PERCEPTIONS (synthesis of fan community vision):
- Most associated colors: ${topResponses.topColors.join(', ')}
- Most associated seasons: ${seasons}
- Most associated textures: ${textures}
- Most associated emotions: ${emotions}
- Most chosen defining words: ${topResponses.topWords.join(', ')}

Create a synthesis of these collective impressions into a single cohesive artistic portrait that represents how the entire fan community perceives this member.

The image should feel like a visual average of thousands of individual visions - a collective dream of who this idol is to their fans.

Use high-fashion editorial photography style with artistic interpretation. Genderless, androgynous aesthetic. Magazine-quality composition.`
}

export function buildMemberSelfPrompt(
  member: Member,
  selfDefinition: {
    color: string
    season: string
    timeOfDay: string
    texture: string
    emotion: string
    oneWord: string
  }
): string {
  const seasonDesc = SEASON_MAP[selfDefinition.season] || selfDefinition.season
  const timeDesc = TIME_MAP[selfDefinition.timeOfDay] || selfDefinition.timeOfDay
  const textureDesc = TEXTURE_MAP[selfDefinition.texture] || selfDefinition.texture
  const emotionDesc = EMOTION_MAP[selfDefinition.emotion] || selfDefinition.emotion

  return `Create an artistic self-portrait representing how "${member.name}" (${member.englishName}) from XLOV sees THEMSELVES.

MEMBER'S SELF-PERCEPTION:
- Their color: ${selfDefinition.color}
- Their season: ${seasonDesc}
- Their time: ${timeDesc}
- Their texture: ${textureDesc}
- Their emotion: ${emotionDesc}
- How they define themselves in one word: "${selfDefinition.oneWord}"

This is the AUTHENTIC self-image - how the artist sees their own essence and identity.

Create a deeply personal, introspective artistic portrait that captures this self-perception. The image should feel intimate and truthful, like looking into a mirror of the soul.

High-fashion editorial style, genderless aesthetic, artistic and conceptual interpretation.`
}
