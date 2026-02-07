// Media & Highlights data - Will come from API

export const mediaData = {
    // Stats (from API)
    stats: {
        featuredVideos: 240,
        totalViews: "2.8M",
        highlightReels: 12
    },

    // Official Highlight Reels (from API)
    highlightReels: [
        {
            id: 1,
            title: "Draw 3 - Best Moments",
            duration: "3:45",
            views: "125K",
            date: "Dec 15, 2025",
            thumbnail: "/highlight-draw3.jpg"
        },
        {
            id: 2,
            title: "Top 10 Most Creative Videos - East Africa",
            duration: "5:20",
            views: "98K",
            date: "Dec 10, 2025",
            thumbnail: "/highlight-top10.jpg"
        },
        {
            id: 3,
            title: "Jinnar Viral November Highlights",
            duration: "4:15",
            views: "87K",
            date: "Nov 30, 2025",
            thumbnail: "/highlight-november.jpg"
        }
    ],

    // Top Featured Videos (from API)
    featuredVideos: [
        {
            id: 1,
            creator: "Joseph M.",
            country: "Kenya",
            flag: "🇰🇪",
            points: 12900,
            views: "45.2K",
            likes: "8.9K",
            comments: "234",
            shares: "567",
            thumbnail: "/video-joseph.jpg",
            featured: true,
            trending: true
        },
        {
            id: 2,
            creator: "Maria N.",
            country: "Tanzania",
            flag: "🇹🇿",
            points: 11540,
            views: "38.7K",
            likes: "7.2K",
            comments: "189",
            shares: "445",
            thumbnail: "/video-maria.jpg",
            featured: true,
            trending: false
        },
        {
            id: 3,
            creator: "Gift M.",
            country: "Uganda",
            flag: "🇺🇬",
            points: 10200,
            views: "32.5K",
            likes: "6.8K",
            comments: "156",
            shares: "389",
            thumbnail: "/video-gift.jpg",
            featured: true,
            trending: true
        },
        {
            id: 4,
            creator: "Hassan R.",
            country: "Rwanda",
            flag: "🇷🇼",
            points: 9880,
            views: "29.3K",
            likes: "5.9K",
            comments: "142",
            shares: "334",
            thumbnail: "/video-hassan.jpg",
            featured: false,
            trending: true
        },
        {
            id: 5,
            creator: "Amina K.",
            country: "Kenya",
            flag: "🇰🇪",
            points: 9400,
            views: "27.8K",
            likes: "5.4K",
            comments: "128",
            shares: "298",
            thumbnail: "/video-amina.jpg",
            featured: false,
            trending: false
        },
        {
            id: 6,
            creator: "David O.",
            country: "Nigeria",
            flag: "🇳🇬",
            points: 8990,
            views: "25.6K",
            likes: "5.1K",
            comments: "115",
            shares: "267",
            thumbnail: "/video-david.jpg",
            featured: false,
            trending: true
        }
    ],

    // Available Draws for filter (from API)
    availableDraws: [
        { id: 4, name: "Draw 4 (Current)", value: "current" },
        { id: 3, name: "Draw 3", value: "3" },
        { id: 2, name: "Draw 2", value: "2" },
        { id: 1, name: "Draw 1", value: "1" }
    ]
};

export default mediaData;
