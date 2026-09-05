import { StrategyItem, PortfolioItem, TestimonialBadge, CreatorCaseStudy } from "../types";
import thumbLong1 from "../assets/portfolio/thumb_long_1.jpg";
import thumbLong2 from "../assets/portfolio/thumb_long_2.jpg";
import thumbLong3 from "../assets/portfolio/thumb_long_3.jpg";
import thumbShort1 from "../assets/portfolio/thumb_short_1.jpg";
import thumbShort2 from "../assets/portfolio/thumb_short_2.jpg";
import thumbShort3 from "../assets/portfolio/thumb_short_3.jpg";
import thumbShort4 from "../assets/portfolio/thumb_short_4.jpg";
import thumbShort5 from "../assets/portfolio/thumb_short_5.jpg";
import thumbShort6 from "../assets/portfolio/thumb_short_6.jpg";

export interface PricingTier {
  id: string;
  name: string;
  badge?: string;
  popular?: boolean;
  priceAnchor: string;
  billingPeriod: string;
  description: string;
  turnaround?: string;
  deliverables: string[];
  ctaText: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const AGENCY_STATS = [
  { label: "Combined Views Generated", value: "240M+" },
  { label: "Average Retention Lift", value: "4.2x" },
  { label: "Editing Hours Saved / Wk", value: "32h" },
  { label: "Turnaround Guarantee", value: "48–72h" },
];

export const CLIENT_PROOF_ITEMS = [
  {
    name: "Simran Kaur Makeovers",
    badge: "2M+ Reach",
    metric: "50M+ Views",
    avatar: "/images/testimonials/simran_kaur.jpg",
    verified: true,
  },
  {
    name: "The Jacked Vegan",
    badge: "56K+ Subs",
    metric: "12M+ Views",
    avatar: "/images/testimonials/the_jacked_vegan.jpg",
    verified: true,
  },
  {
    name: "Kai (Esports Coach)",
    badge: "320K+ Subs",
    metric: "18M+ Views",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    verified: true,
  },
  {
    name: "Combined Audience",
    badge: "9,000,000+ Reach",
    metric: "240M+ Views",
    avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80",
    verified: true,
  },
  {
    name: "Average Retention",
    badge: "68.5% AVD",
    metric: "vs 24% Raw",
    avatar: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=100&auto=format&fit=crop&q=80",
    verified: true,
  },
];

export const CREATOR_LOGOS = [
  { name: "AI & FUTURE TECH", symbol: "✦" },
  { name: "FINANCE & WEALTH", symbol: "⬡" },
  { name: "FOUNDERS & B2B SAAS", symbol: "❖" },
  { name: "DOCUMENTARY NARRATIVES", symbol: "◈" },
  { name: "HIGH-TICKET BUSINESS", symbol: "▲" },
  { name: "PODCASTS & INTERVIEWS", symbol: "⦿" },
];

export const STRATEGIES_DATA: StrategyItem[] = [
  {
    id: "hook-lock",
    number: "01",
    title: "The 3-Second HookLock™",
    subtitle: "Eliminating the 30% initial dropoff",
    description:
      "We replace slow intros, channel chatter, and throat-clearing with psychological curiosity gaps, dynamic whip-pans, and instant visual proof that forces viewers to stay locked in.",
    iconName: "Zap",
    tag: "Hook Engineering",
    metrics: "+46% 30s Retention",
    keyBenefits: [
      "Zero talking-head delay in first 1.8s",
      "Immediate visual payoff & emotional stakes",
      "Pattern-interrupt audio risers & foley",
      "High-contrast keyword kinetic pops",
    ],
    retentionImpact: "Plateaus early viewer drop from 68% down to 89% retained viewers",
    visualPreview: {
      beforeLabel: "Standard Intro: 'Hey guys, welcome back to my channel...'",
      afterLabel: "HookLock: 'This single mistake cost $42,000 in 14 minutes.' + Instant kinetic motion graphic",
      highlight: "89% retention at 0:30 mark",
    },
  },
  {
    id: "pacing-rhythm",
    number: "02",
    title: "Micro-Vibration Pacing",
    subtitle: "Rhythmic visual shifts every 2.8 seconds",
    description:
      "Modern viewers suffer from rapid visual fatigue. We engineer a subtle pulse of dynamic jump-cuts, punch-ins, focal depth shifts, and b-roll inserts to maintain unbroken flow.",
    iconName: "Activity",
    tag: "Visual Dynamics",
    metrics: "2.8s Stimulus Rate",
    keyBenefits: [
      "Subtle 105% - 115% camera punch-ins",
      "Directional parallax overlays & speed ramps",
      "Eliminates dead breaths & micro-pauses",
      "Custom 3D tracking & motion labels",
    ],
    retentionImpact: "Extends Average View Duration (AVD) from 3:40 to 9:15 on 12-min videos",
    visualPreview: {
      beforeLabel: "Static 8-second talking head with no camera variation",
      afterLabel: "Dynamic 3-stage zoom + directional whip transition + ambient light streak",
      highlight: "+148% Watch Time",
    },
  },
  {
    id: "sound-architecture",
    number: "03",
    title: "12-Layer Foley & Sound Design",
    subtitle: "Subconscious auditory retention anchors",
    description:
      "Sound design accounts for 60% of perceived production value. We weave custom whooshes, UI clicks, vinyl textures, cinematic sub-bass, and tailored music ducking.",
    iconName: "Volume2",
    tag: "Audio Engineering",
    metrics: "12 Foley Layers / Min",
    keyBenefits: [
      "Sidechain ducked bespoke lofi/cinematic score",
      "Tactile paper, keyboard, and digital click textures",
      "Sub-bass drops for high-impact revelations",
      "Stereo-panned spatial whooshes",
    ],
    retentionImpact: "Drives viewer immersion and perceived 6-figure production quality",
    visualPreview: {
      beforeLabel: "Flat camera mic audio with generic background music",
      afterLabel: "Studio vocal mastering + tailored foley hits + multi-frequency audio risers",
      highlight: "Immersive Audio Experience",
    },
  },
  {
    id: "retention-auditing",
    number: "04",
    title: "Algorithmic Retention Diagnostics",
    subtitle: "Data-driven post-production analytics",
    description:
      "We track exact retention graphs from YouTube Studio, identify every dropoff second, and feed real viewer behavior back into the next script and edit.",
    iconName: "TrendingUp",
    tag: "Analytics & Iteration",
    metrics: "Second-by-Second Teardowns",
    keyBenefits: [
      "Second-by-second YouTube Studio retention teardowns",
      "Identification of boring segments and dead zones",
      "A/B title and thumbnail packaging rotation",
      "Monthly growth roadmap & topic validation",
    ],
    retentionImpact: "Continuous compound growth: +15% retention improvement every quarter",
    visualPreview: {
      beforeLabel: "Guessing why viewers clicked off at minute 4",
      afterLabel: "Exact dropoff node mapped to a pacing lag & re-engineered for next upload",
      highlight: "Continuous Compound Lift",
    },
  },
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "work-1",
    title: "The Only Controller You Will Need in 2026",
    creator: "Kai",
    creatorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80",
    channelSubscribers: "Esports & Aim Coach",
    category: "longform",
    views: "640K",
    retentionRate: "64.2%",
    ctr: "12.8%",
    duration: "0:22",
    proofBadge: "Pro Esports Coach",
    videoPlaceholderUrl: "/videos/portfolio/long_1.mp4",
    thumbnailUrl: thumbLong1,
    tags: ["Esports Coach", "Velocity Pacing", "Hand-Cam Sync", "Motion Tracking"],
    keyEdits: [
      "Dynamic speed-ramp velocity curve synced to gunshot impacts",
      "Picture-in-picture hand-cam motion stabilization",
      "Kinetic typography tracking with red chromatic aberration",
      "Layered gun cock, shell drop, and kill chime foley audio",
    ],
    beforeAfterComparison: {
      rawDesc: "Raw 60fps game capture with silent pauses between eliminations",
      editedDesc: "Adrenaline-fueled montage with impact speed-ramps & cinema bass drops",
      rawPacing: "Average watch time: 0:08 (34% retention)",
      editedPacing: "Average watch time: 0:21 (64.2% retention)",
    },
  },
  {
    id: "work-2",
    title: "I Spent ₹50,000 on My Makeup – Was It Worth It?!",
    creator: "Simran Kaur",
    creatorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&auto=format&fit=crop&q=80",
    channelSubscribers: "912K Subs",
    category: "longform",
    views: "1.4M",
    retentionRate: "68.5%",
    ctr: "14.2%",
    duration: "0:20",
    proofBadge: "912K+ Creator",
    videoPlaceholderUrl: "/videos/portfolio/long_2.mp4",
    thumbnailUrl: thumbLong2,
    tags: ["912K Creator", "UI Step Badges", "Cost Callouts", "Color Grading"],
    keyEdits: [
      "Custom 2D numbered step badges (Step 1: Primer)",
      "High-contrast fluorescent green cost callout graphics",
      "Studio skin-tone warmth correction and macro-product punch-ins",
      "Crisp vocal EQ and ambient beauty background ducking",
    ],
    beforeAfterComparison: {
      rawDesc: "35-minute unedited makeup tutorial with long product application pauses",
      editedDesc: "Fast-moving educational guide with clear step markers and cost breakdowns",
      rawPacing: "Average watch time: 3m 15s (24% retention)",
      editedPacing: "Average watch time: 11m 40s (68.5% retention)",
    },
  },
  {
    id: "work-3",
    title: "How To Train Tendons AND Muscle in Calisthenics (Free Program)",
    creator: "The Jacked Vegan",
    creatorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80",
    channelSubscribers: "Calisthenics & Fitness Coach",
    category: "longform",
    views: "890K",
    retentionRate: "62.8%",
    ctr: "13.6%",
    duration: "0:20",
    proofBadge: "Fitness & Calisthenics",
    videoPlaceholderUrl: "/videos/portfolio/long_3.mp4",
    thumbnailUrl: thumbLong3,
    tags: ["Fitness Coach", "Kinetic Subtitles", "Gym Storytelling", "Sound Foley"],
    keyEdits: [
      "Bold red italic kinetic subtitles highlighting repetition form",
      "Camera whip-pans timed to bar muscle-up transitions",
      "Dynamic speed ramping during concentric movement reps",
      "High-impact metallic clang foley & motivational sidechaining",
    ],
    beforeAfterComparison: {
      rawDesc: "Static tripod footage with background gym noise echo",
      editedDesc: "High-octane training sequence with punchy text hooks and athletic pacing",
      rawPacing: "Average watch time: 2m 10s (22% retention)",
      editedPacing: "Average watch time: 8m 45s (62.8% retention)",
    },
  },
  {
    id: "work-4",
    title: "High Stakes Celebrity Poker Table (Tracking & Rotoscoping)",
    creator: "Hustler Casino / Poker Vlogs",
    creatorAvatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=160&auto=format&fit=crop&q=80",
    channelSubscribers: "Poker & Casino Creator",
    category: "shorts",
    views: "1.2M",
    retentionRate: "124.5%",
    ctr: "16.8%",
    duration: "0:24",
    proofBadge: "Celeb Face Tracking",
    videoPlaceholderUrl: "/videos/portfolio/short_1.mp4",
    thumbnailUrl: thumbShort1,
    tags: ["Face Tracking", "Rotoscoping", "Sound Foley", "Humor"],
    keyEdits: [
      "Celebrity head tracking (Will Ferrell, Bill Murray, Adam Sandler)",
      "Casino chip foley audio and spatial table mixing",
      "Dynamic camera push-ins and comedic timing",
    ],
    beforeAfterComparison: {
      rawDesc: "Static poker table footage with quiet table talk",
      editedDesc: "Humorous rotoscoped celebrity face tracking with layered casino audio",
      rawPacing: "Completion rate: 45%",
      editedPacing: "Completion rate: 124.5%",
    },
  },
  {
    id: "work-5",
    title: "Sing The National Anthem For $10,000 Cash?!",
    creator: "Expo",
    creatorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80",
    channelSubscribers: "Street & Trivia Creator",
    category: "shorts",
    views: "2.8M",
    retentionRate: "115.2%",
    ctr: "15.3%",
    duration: "1:00",
    proofBadge: "10K Street Challenge",
    videoPlaceholderUrl: "/videos/portfolio/short_2.mp4",
    thumbnailUrl: thumbShort2,
    tags: ["Cash Giveaway", "Flying Money Graphic", "Kinetic Subtitles", "Street Pacing"],
    keyEdits: [
      "Custom flying money motion graphic intro hook",
      "Multi-subject street pacing and comedy timing",
      "Punchy kinetic subtitles with custom accent colors",
      "Full story payoff arc with winner cash prize",
    ],
    beforeAfterComparison: {
      rawDesc: "Unedited 3-minute raw street footage with pauses between passersby",
      editedDesc: "Tight 60s viral retention machine with complete winner story arc",
      rawPacing: "Completion rate: 38%",
      editedPacing: "Completion rate: 115.2%",
    },
  },
  {
    id: "work-6",
    title: "The Ultimate Outdoor Tomahawk Steak Prep",
    creator: "Culinary & Grill Creator",
    creatorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80",
    channelSubscribers: "Food & BBQ Creator",
    category: "shorts",
    views: "1.9M",
    retentionRate: "108.7%",
    ctr: "14.8%",
    duration: "0:21",
    proofBadge: "Culinary ASMR & Color",
    videoPlaceholderUrl: "/videos/portfolio/short_3.mp4",
    thumbnailUrl: thumbShort3,
    tags: ["ASMR Sound", "Color Grading", "Macro Food", "Fast Pacing"],
    keyEdits: [
      "Sizzling meat & knife foley sound design",
      "High-saturation rich contrast food color grade",
      "Fast rhythmic jump-cuts synced to music",
    ],
    beforeAfterComparison: {
      rawDesc: "Raw phone clip of backyard barbecue with windy audio",
      editedDesc: "Cinematic ASMR cooking short with enhanced food contrast and mouth-watering foley",
      rawPacing: "Completion rate: 42%",
      editedPacing: "Completion rate: 108.7%",
    },
  },
  {
    id: "work-7",
    title: "3 Hacks To Build Muscle In 90 Days",
    creator: "The Jacked Vegan",
    creatorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80",
    channelSubscribers: "Fitness & Calisthenics",
    category: "shorts",
    views: "850K",
    retentionRate: "102.4%",
    ctr: "13.9%",
    duration: "0:20",
    proofBadge: "3D Cubes Listicle",
    videoPlaceholderUrl: "/videos/portfolio/short_4.mp4",
    thumbnailUrl: thumbShort4,
    tags: ["3D Motion Graphics", "Listicle Hook", "Coaching Tips", "Gym B-Roll"],
    keyEdits: [
      "3D red numbered dice/cubes (1, 2, 3) motion design",
      "Bold '90 DAYS' typography hook",
      "Fast paced exercise b-roll and gym foley",
    ],
    beforeAfterComparison: {
      rawDesc: "Standard gym advice talking head",
      editedDesc: "High-retention listicle with 3D numbered cubes and kinetic text pops",
      rawPacing: "Completion rate: 35%",
      editedPacing: "Completion rate: 102.4%",
    },
  },
  {
    id: "work-8",
    title: "Pro Aim Coach: The Only Way To Train In 2026",
    creator: "Kai",
    creatorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&auto=format&fit=crop&q=80",
    channelSubscribers: "Esports & Aim Coach",
    category: "shorts",
    views: "920K",
    retentionRate: "112.8%",
    ctr: "14.2%",
    duration: "0:15",
    proofBadge: "Stream Repurposing",
    videoPlaceholderUrl: "/videos/portfolio/short_5.mp4",
    thumbnailUrl: thumbShort5,
    tags: ["Esports", "Aim Coaching", "Stream Repurposing", "Kinetic Subtitles"],
    keyEdits: [
      "Pop-in kinetic subtitles with 'LEGITIMATE' hook",
      "Rounded picture-in-picture stream layout",
      "High velocity gaming impact transitions",
    ],
    beforeAfterComparison: {
      rawDesc: "Long stream segment discussing aiming drills",
      editedDesc: "Punchy 15s high-velocity cut designed for viral gaming TikTok/Shorts",
      rawPacing: "Completion rate: 44%",
      editedPacing: "Completion rate: 112.8%",
    },
  },
  {
    id: "work-9",
    title: "Don't Start A Business If You Don't Know This",
    creator: "Pyaari Naari",
    creatorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80",
    channelSubscribers: "Business & Lifestyle",
    category: "shorts",
    views: "1.1M",
    retentionRate: "98.6%",
    ctr: "12.7%",
    duration: "0:23",
    proofBadge: "Business Advice & Hooks",
    videoPlaceholderUrl: "/videos/portfolio/short_6.mp4",
    thumbnailUrl: thumbShort6,
    tags: ["Business Hook", "Light Leaks", "Thought Leadership", "Jump-Cuts"],
    keyEdits: [
      "Top hook banner ('DON'T START BUSINESS IF YOU DON'T KNOW THIS')",
      "Red film-burn light leak overlay",
      "Rhythmic conversational pacing with subtle zooms",
    ],
    beforeAfterComparison: {
      rawDesc: "Continuous vlog monologue about starting a brand",
      editedDesc: "Structured thought-leadership short with top hook card and vintage film burns",
      rawPacing: "Completion rate: 39%",
      editedPacing: "Completion rate: 98.6%",
    },
  },
];

export const PRICING_PACKAGES: PricingTier[] = [
  {
    id: "pkg-shorts",
    name: "Short-Form Engine",
    badge: "SHORTS & REELS",
    priceAnchor: "Starts at $1,200",
    billingPeriod: "/ month",
    description: "For short-form creators, and creators looking to repurpose their long-form videos into viral shorts.",
    deliverables: [
      "12 to 16 Shorts / Reels per month",
      "Long-to-short content repurposing",
      "Viral hook & clip selection",
      "Modern animated captions with brand styling",
      "High-retention pacing, zooms & sound effects",
      "Multi-platform ready for Shorts, Reels & TikTok",
      "Unlimited revisions via timestamped links",
      "Dedicated Editor + direct communication channel",
    ],
    ctaText: "Book Short-Form Sprint",
  },
  {
    id: "pkg-flagship",
    name: "YouTube Long-Form",
    badge: "MOST POPULAR",
    popular: true,
    priceAnchor: "Starts at $2,200",
    billingPeriod: "/ month",
    description: "Complete end-to-end editing for creators focused on YouTube channel growth and maximum watch time.",
    deliverables: [
      "4 Long-form YouTube master edits (up to 20 mins)",
      "High-retention narrative pacing & dead-air cuts",
      "High-CTR Packaging: 3 titles & 2 custom thumbnails",
      "Custom animations, clean lower-thirds & b-roll",
      "Studio audio cleanup, music ducking & color grading",
      "Bi-weekly strategy call to review retention & topics",
      "Unlimited revisions via Frame.io",
      "Dedicated Senior Editor",
    ],
    ctaText: "Lock in Long-Form Retainer",
  },
  {
    id: "pkg-partner",
    name: "Custom",
    badge: "DEDICATED TEAM",
    priceAnchor: "Starts at $3,500",
    billingPeriod: "/ month",
    description: "Your dedicated outsourced media department. Full YouTube master videos plus weekly repurposed shorts.",
    deliverables: [
      "Up to 8 Long-form master edits per month",
      "16 to 20 Shorts repurposed from long-form",
      "Multi-cam editing for podcasts, interviews & vlogs",
      "Complete High-CTR packaging: Weekly titles & thumbnails",
      "Custom 2D/3D motion graphics & intro animations",
      "Weekly 1-on-1 strategy call to review retention",
      "Unlimited revisions with priority production queue",
      "Dedicated Team (Lead Editor, Shorts Editor & Designer)",
      "Dedicated private communication channel",
    ],
    ctaText: "Apply for Custom",
  },
];

export const FAQS_DATA: FaqItem[] = [
  {
    question: "What is your typical turnaround time per video?",
    answer: "Our standard delivery is 48 to 72 hours for short-form content and 3 to 4 business days for long-form master edits. For Full Channel retainers, you receive dedicated bandwidth with a priority editing queue.",
  },
  {
    question: "How do we send you raw footage and assets?",
    answer: "You simply drop your raw A-roll and assets into a shared Google Drive, Dropbox, or Frame.io folder. We organize, synchronize, clean audio, and deliver the final YouTube-ready export directly back to your folder.",
  },
  {
    question: "What if I need changes or revisions on an edit?",
    answer: "All partnerships include unlimited revisions. We use Frame.io where you can leave timestamped comments directly on the video timeline, and your editor resolves them in under 24 hours.",
  },
  {
    question: "Do you design thumbnails and title concepts as well?",
    answer: "Yes! In our YouTube Flagship and Growth Partner tiers, we provide 2 high-contrast, A/B-tested thumbnail concepts and 3 high-CTR title variations per video to maximize impression-to-click conversion.",
  },
  {
    question: "How do I get started?",
    answer: "Click 'Book a 15-Min Strategy Call' to schedule a quick conversation with our lead strategist. We will audit your recent videos, discuss your channel goals, and start your first pilot project within 24 hours.",
  },
];

export const CASE_STUDIES: CreatorCaseStudy[] = [
  {
    id: "case-1",
    creatorName: "TechSphere Breakdown",
    niche: "AI & Consumer Tech",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    growthMultiplier: "4.8x",
    storyQuote:
      "From plateaued 40k views per video to consistent 200k+ viral hits through structured pacing and 3-second cold hooks.",
    beforeStats: {
      avgRetention: 34,
      monthlyViews: "180K",
      subscribers: "85K",
      editingHoursPerWeek: 35,
    },
    afterStats: {
      avgRetention: 78,
      monthlyViews: "1.4M",
      subscribers: "490K",
      editingHoursPerWeek: 2,
    },
    retentionCurveData: [
      { timeMarker: "0:00", industryAverage: 100, harzhRetention: 100 },
      { timeMarker: "0:15", industryAverage: 72, harzhRetention: 94 },
      { timeMarker: "0:30", industryAverage: 58, harzhRetention: 90 },
      { timeMarker: "1:00", industryAverage: 48, harzhRetention: 87 },
      { timeMarker: "2:00", industryAverage: 41, harzhRetention: 84 },
      { timeMarker: "4:00", industryAverage: 35, harzhRetention: 81 },
      { timeMarker: "7:00", industryAverage: 28, harzhRetention: 76 },
      { timeMarker: "10:00", industryAverage: 22, harzhRetention: 73 },
      { timeMarker: "12:00", industryAverage: 18, harzhRetention: 70 },
    ],
  },
  {
    id: "case-2",
    creatorName: "The Financial Blueprint",
    niche: "Personal Wealth & Macro Economy",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    growthMultiplier: "3.6x",
    storyQuote:
      "Transformed dry financial spreadsheets into engaging visual documentary narratives with custom kinetic infographics.",
    beforeStats: {
      avgRetention: 29,
      monthlyViews: "95K",
      subscribers: "42K",
      editingHoursPerWeek: 26,
    },
    afterStats: {
      avgRetention: 72,
      monthlyViews: "820K",
      subscribers: "280K",
      editingHoursPerWeek: 1,
    },
    retentionCurveData: [
      { timeMarker: "0:00", industryAverage: 100, harzhRetention: 100 },
      { timeMarker: "0:15", industryAverage: 68, harzhRetention: 92 },
      { timeMarker: "0:30", industryAverage: 52, harzhRetention: 88 },
      { timeMarker: "1:00", industryAverage: 44, harzhRetention: 83 },
      { timeMarker: "2:00", industryAverage: 38, harzhRetention: 79 },
      { timeMarker: "4:00", industryAverage: 31, harzhRetention: 75 },
      { timeMarker: "7:00", industryAverage: 24, harzhRetention: 71 },
      { timeMarker: "10:00", industryAverage: 19, harzhRetention: 68 },
      { timeMarker: "12:00", industryAverage: 15, harzhRetention: 65 },
    ],
  },
];

export const AI_PROMPT_TEMPLATES = [
  {
    id: "viral-hooks",
    title: "Generate 5 Viral Hooks",
    desc: "Craft scroll-stopping opening lines with visual cues",
    prompt: "Generate 5 high-retention viral hooks for a video titled 'Why 99% of creators fail in their first year'. Include specific visual cues and sound effect notes for the first 3 seconds.",
  },
  {
    id: "retention-audit",
    title: "Pacing & Retention Audit",
    desc: "Identify dropoff risks in a video concept",
    prompt: "I am planning an 11-minute educational video about investing for beginners. How should I pace my video to keep 70%+ retention from minute 3 to minute 9?",
  },
  {
    id: "packaging-ideas",
    title: "Thumbnail & Title Matrix",
    desc: "Create 3 high-CTR title + thumbnail concepts",
    prompt: "Give me 3 high-CTR title options and matching thumbnail visual layouts for an AI automation tutorial video for entrepreneurs.",
  },
  {
    id: "agency-quote",
    title: "Calculate Agency Package",
    desc: "Find the best editing package for your channel",
    prompt: "I post 2 longform YouTube videos per week and want 8 short-form clips repurposed. What is the recommended Harzh workflow, turnaround time, and package?",
  },
];

