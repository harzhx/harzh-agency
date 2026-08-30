import { StrategyItem, PortfolioItem, TestimonialBadge, CreatorCaseStudy } from "../types";

export interface PricingTier {
  id: string;
  name: string;
  badge?: string;
  popular?: boolean;
  priceAnchor: string;
  billingPeriod: string;
  description: string;
  turnaround: string;
  deliverables: string[];
  ctaText: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const AGENCY_STATS = [
  { label: "Combined Views Generated", value: "240M+", highlight: "+310% Avg Growth" },
  { label: "Average Retention Lift", value: "4.2x", highlight: "vs Raw Footage" },
  { label: "Editing Hours Saved / Wk", value: "32h", highlight: "per creator" },
  { label: "Turnaround Guarantee", value: "48h", highlight: "dedicated senior editor" },
];

export const CLIENT_PROOF_ITEMS = [
  {
    name: "Simran Kaur Makeovers",
    badge: "700K+ Subs",
    metric: "50M+ Views",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    verified: true,
  },
  {
    name: "Champagne Mike",
    badge: "150K+ Subs",
    metric: "12M+ Views",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    verified: true,
  },
  {
    name: "Jack Vegan",
    badge: "120K+ Subs",
    metric: "8M+ Views",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    verified: true,
  },
  {
    name: "Combined Audience",
    badge: "1,000,000+ Reach",
    metric: "70M+ Views",
    avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80",
    verified: true,
  },
  {
    name: "Average Retention",
    badge: "78.4% AVD",
    metric: "vs 21% Raw",
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
    title: "How I Built a $10M AI Startup in 90 Days",
    creator: "David Sterling",
    creatorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80",
    channelSubscribers: "1.4M Subs",
    category: "longform",
    views: "3.2M",
    retentionRate: "74.8%",
    ctr: "12.4%",
    duration: "18:42",
    videoPlaceholderUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    tags: ["Documentary", "3D Motion Graphics", "4K 60FPS", "High Retention"],
    keyEdits: [
      "Custom 3D product animation renders & timeline pacing",
      "Dynamic sound-designed jump cuts every 2.4s",
      "Kinetic financial charts & profit telemetry",
      "Color-graded in Arri Alexa film emulation",
    ],
    beforeAfterComparison: {
      rawDesc: "Raw 42-minute Zoom recording with echo and 5-second silence gaps",
      editedDesc: "Polished 18-minute cinematic case study with custom 3D graphs & foley audio",
      rawPacing: "Average watch time: 2m 14s (21% retention)",
      editedPacing: "Average watch time: 14m 02s (74.8% retention)",
    },
  },
  {
    id: "work-2",
    title: "Stop Wasting Your 20s (The Real Formula)",
    creator: "Marcus Thorne",
    creatorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80",
    channelSubscribers: "890K Subs",
    category: "longform",
    views: "1.8M",
    retentionRate: "78.2%",
    ctr: "14.1%",
    duration: "14:15",
    videoPlaceholderUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80",
    tags: ["Storytelling", "Color Grade", "Emotional Hook", "Sound Foley"],
    keyEdits: [
      "Opening 3-second psychological hooklock",
      "Vintage 16mm film grain overlay & warm film look",
      "Subtle ambient vinyl crackle & piano score ducking",
      "Seamless match cuts and visual metaphors",
    ],
    beforeAfterComparison: {
      rawDesc: "Monotone camera feed with flat lighting and generic intro",
      editedDesc: "Deep emotional pacing with archival footage, custom typography & soundscapes",
      rawPacing: "Average watch time: 3m 40s (32% retention)",
      editedPacing: "Average watch time: 11m 09s (78.2% retention)",
    },
  },
  {
    id: "work-3",
    title: "The Collapse of Luxury Fashion (Mini-Doc)",
    creator: "Studio Atelier",
    creatorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80",
    channelSubscribers: "2.1M Subs",
    category: "longform",
    views: "5.1M",
    retentionRate: "81.0%",
    ctr: "13.2%",
    duration: "24:30",
    videoPlaceholderUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80",
    tags: ["Mini Documentary", "Vox Style", "Motion Graphics", "Sound Design"],
    keyEdits: [
      "3D map zooms & historical newspaper animations",
      "Multi-track foley design (fabric shears, camera flashes)",
      "Dynamic timeline markers with chapter transitions",
      "Dual narrator audio mastering",
    ],
    beforeAfterComparison: {
      rawDesc: "Raw VO audio and 200 disorganized b-roll clips",
      editedDesc: "Broadcast-quality Vox-style narrative with paper-cut animations & custom infographics",
      rawPacing: "Average watch time: 6m 12s",
      editedPacing: "Average watch time: 19m 50s (81% retention)",
    },
  },
  {
    id: "work-4",
    title: "1 Secret Prompt That Beats 99% of Coders",
    creator: "Elena Rostova",
    creatorAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=160&auto=format&fit=crop&q=80",
    channelSubscribers: "620K Subs",
    category: "shorts",
    views: "4.7M",
    retentionRate: "118.5%",
    ctr: "16.8%",
    duration: "0:52",
    videoPlaceholderUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
    tags: ["Viral Short", "Kinetic Captions", "Fast Paced", "Coding"],
    keyEdits: [
      "Custom bouncy pop kinetic subtitles with emoji accents",
      "Live terminal code highlighting & cursor zooms",
      "Ultra-fast 1.2s cut cadence with snap whooshes",
      "Infinite loop ending matched seamlessly to opening line",
    ],
    beforeAfterComparison: {
      rawDesc: "Uncut vertical recording with stutter and slow screen recording",
      editedDesc: "Hyper-engaging 52s retention machine with infinite loop audio",
      rawPacing: "Completion rate: 41%",
      editedPacing: "Completion rate: 118.5% (viewers rewatch 1.2x on average)",
    },
  },
  {
    id: "work-5",
    title: "How I Scaled My Agency to $100k/mo Solo",
    creator: "Chloe Vance",
    creatorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&auto=format&fit=crop&q=80",
    channelSubscribers: "510K Subs",
    category: "shorts",
    views: "2.9M",
    retentionRate: "109.2%",
    ctr: "15.3%",
    duration: "0:48",
    videoPlaceholderUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
    tags: ["Viral Short", "Business", "Hormozi Style", "Punch-Ins"],
    keyEdits: [
      "High-energy opening hook with direct eye-line zoom",
      "Color-coded keyword highlights & animated bar charts",
      "Fast punch-cuts synced to percussive beat",
      "Clear call to action banner overlay",
    ],
    beforeAfterComparison: {
      rawDesc: "Casual selfie video with background car noise",
      editedDesc: "Paced, punchy viral short with studio sound cleanup and energetic kinetic visuals",
      rawPacing: "Completion rate: 38%",
      editedPacing: "Completion rate: 109.2%",
    },
  },
  {
    id: "work-6",
    title: "The Ultimate AI Productivity Stack (2026)",
    creator: "Julian Vance",
    creatorAvatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=160&auto=format&fit=crop&q=80",
    channelSubscribers: "380K Subs",
    category: "shorts",
    views: "1.9M",
    retentionRate: "104.7%",
    ctr: "14.8%",
    duration: "0:56",
    videoPlaceholderUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&auto=format&fit=crop&q=80",
    tags: ["Viral Short", "AI Tech", "High Pacing", "Sound Foley"],
    keyEdits: [
      "Dynamic 3D mockups of applications sliding into view",
      "Instant pattern interrupt in frame 0.0",
      "Sound-designed keyboard clicks and UI taps",
      "High retention loop ending",
    ],
    beforeAfterComparison: {
      rawDesc: "Raw 5-minute screen recording with rambling explanations",
      editedDesc: "Dense 56-second viral breakdown with 15 animated b-roll cuts and studio sound",
      rawPacing: "Completion rate: 33%",
      editedPacing: "Completion rate: 104.7%",
    },
  },
];

export const PRICING_PACKAGES: PricingTier[] = [
  {
    id: "pkg-shorts",
    name: "Short-Form Velocity",
    priceAnchor: "Starts at $1,200",
    billingPeriod: "/ month",
    description: "Designed for creators and founders who want rapid, multi-platform viral audience growth across Reels, TikTok & Shorts.",
    turnaround: "48-Hour Turnaround",
    deliverables: [
      "12 to 16 High-Retention Shorts / Reels per month",
      "Dynamic kinetic typography & custom sound foley",
      "9:16 Smart framing, color-grading & sound cleanup",
      "Hook restructuring for 100%+ completion rates",
      "Unlimited revisions & dedicated Slack communication",
    ],
    ctaText: "Book Short-Form Sprint",
  },
  {
    id: "pkg-flagship",
    name: "YouTube Flagship Authority",
    badge: "MOST POPULAR",
    popular: true,
    priceAnchor: "Starts at $2,200",
    billingPeriod: "/ month",
    description: "Complete end-to-end long-form YouTube editing and short-form repurposing engine for serious 6-figure creators.",
    turnaround: "48-Hour Turnaround",
    deliverables: [
      "4 Long-form Master Edits (up to 20 mins raw footage)",
      "8 Viral Short-form Cutdowns extracted from long-form",
      "2 High-CTR A/B Test Thumbnails per video",
      "3-Second HookLock™ intro pacing re-engineering",
      "Full 12-layer foley audio mastering & color grading",
      "YouTube Studio second-by-second retention diagnostics",
      "Unlimited revisions & dedicated senior editor",
    ],
    ctaText: "Lock in Flagship Retainer",
  },
  {
    id: "pkg-partner",
    name: "Full Growth Partner",
    badge: "CUSTOM SCALE",
    priceAnchor: "Starts at $3,500",
    billingPeriod: "/ month",
    description: "For high-volume creators, podcasts, and venture-backed founders needing a complete outsourced media department.",
    turnaround: "24 to 48-Hour Priority",
    deliverables: [
      "Up to 8 Long-form Master Edits per month",
      "16 to 20 Viral Short-form Repurposed Assets",
      "Weekly Topic & Packaging Strategy Consultation Calls",
      "Custom 3D Blender / After Effects motion graphics",
      "Multi-cam podcast synchronization & studio mixing",
      "Dedicated Lead Editor + Senior Art Director",
      "Priority 24/7 Slack channel with direct founder access",
    ],
    ctaText: "Apply For Partnership",
  },
];

export const FAQS_DATA: FaqItem[] = [
  {
    question: "What is your typical turnaround time per video?",
    answer: "Our standard turnaround time is 48 hours for long-form master edits and 24 to 48 hours for short-form reels. For urgent launches or timely news topics, priority 24-hour delivery is available.",
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
      { timeMarker: "0:00", industryAverage: 100, kromaEdited: 100 },
      { timeMarker: "0:15", industryAverage: 72, kromaEdited: 94 },
      { timeMarker: "0:30", industryAverage: 58, kromaEdited: 90 },
      { timeMarker: "1:00", industryAverage: 48, kromaEdited: 87 },
      { timeMarker: "2:00", industryAverage: 41, kromaEdited: 84 },
      { timeMarker: "4:00", industryAverage: 35, kromaEdited: 81 },
      { timeMarker: "7:00", industryAverage: 28, kromaEdited: 76 },
      { timeMarker: "10:00", industryAverage: 22, kromaEdited: 73 },
      { timeMarker: "12:00", industryAverage: 18, kromaEdited: 70 },
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
      { timeMarker: "0:00", industryAverage: 100, kromaEdited: 100 },
      { timeMarker: "0:15", industryAverage: 68, kromaEdited: 92 },
      { timeMarker: "0:30", industryAverage: 52, kromaEdited: 88 },
      { timeMarker: "1:00", industryAverage: 44, kromaEdited: 83 },
      { timeMarker: "2:00", industryAverage: 38, kromaEdited: 79 },
      { timeMarker: "4:00", industryAverage: 31, kromaEdited: 75 },
      { timeMarker: "7:00", industryAverage: 24, kromaEdited: 71 },
      { timeMarker: "10:00", industryAverage: 19, kromaEdited: 68 },
      { timeMarker: "12:00", industryAverage: 15, kromaEdited: 65 },
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

