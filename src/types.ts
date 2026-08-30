export type ThemeMode = "dark" | "light";

export interface StrategyItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  tag: string;
  metrics: string;
  keyBenefits: string[];
  retentionImpact: string;
  visualPreview: {
    beforeLabel: string;
    afterLabel: string;
    highlight: string;
  };
}

export interface PortfolioItem {
  id: string;
  title: string;
  creator: string;
  creatorAvatar: string;
  channelSubscribers: string;
  category: "all" | "longform" | "shorts" | "documentary" | "podcast";
  views: string;
  retentionRate: string;
  ctr: string;
  duration: string;
  videoPlaceholderUrl?: string;
  thumbnailUrl: string;
  tags: string[];
  keyEdits: string[];
  beforeAfterComparison?: {
    rawDesc: string;
    editedDesc: string;
    rawPacing: string;
    editedPacing: string;
  };
}

export interface TestimonialBadge {
  id: string;
  name: string;
  role: string;
  companyOrChannel: string;
  avatar: string;
  quote: string;
  stats: {
    metric: string;
    value: string;
  };
  highlightTag: string;
  badgeId: string;
  socialHandle?: string;
  verified: boolean;
}

export interface CreatorCaseStudy {
  id: string;
  creatorName: string;
  niche: string;
  avatar: string;
  beforeStats: {
    avgRetention: number;
    monthlyViews: string;
    subscribers: string;
    editingHoursPerWeek: number;
  };
  afterStats: {
    avgRetention: number;
    monthlyViews: string;
    subscribers: string;
    editingHoursPerWeek: number;
  };
  growthMultiplier: string;
  storyQuote: string;
  retentionCurveData: {
    timeMarker: string;
    industryAverage: number;
    kromaEdited: number;
  }[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
}

export interface ROIInputs {
  subscribers: number;
  monthlyUploads: number;
  avgViewsPerVideo: number;
  currentRetention: number;
}
