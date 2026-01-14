// Leaderboards data - Most data will come from API, except "How Rankings Stay Fair"

export const leaderboardsData = {
    // Current Active Draw (from API)
    activeDraw: {
        number: 4,
        status: "Active",
        name: "Draw 4"
    },

    // Available Draws (from API)
    availableDraws: [
        { id: 4, name: "Draw 4", status: "Active" },
        { id: 3, name: "Draw 3", status: "Results Locked" },
        { id: 2, name: "Draw 2", status: "Archived Winners" }
    ],

    // Top Creators for current draw (from API)
    topCreators: [
        {
            rank: 4,
            creator: "Hassan R.",
            country: "Rwanda",
            flag: "🇷🇼",
            city: "Kigali",
            points: 9880,
            status: "Active",
            avatar: "/avatar-hassan.jpg"
        },
        {
            rank: 5,
            creator: "Amina K.",
            country: "Kenya",
            flag: "🇰🇪",
            city: "Nairobi",
            points: 9400,
            status: "Active",
            avatar: "/avatar-amina.jpg"
        },
        {
            rank: 6,
            creator: "Kelvin Arts",
            country: "Uganda",
            flag: "🇺🇬",
            city: "Kampala",
            points: 8990,
            status: "Active",
            avatar: "/avatar-kelvin.jpg"
        },
        {
            rank: 7,
            creator: "Juma K.",
            country: "Tanzania",
            flag: "🇹🇿",
            city: "DSM",
            points: 8009,
            status: "Active",
            avatar: "/avatar-juma.jpg"
        },
        {
            rank: 8,
            creator: "Joan S.",
            country: "South Africa",
            flag: "🇿🇦",
            city: "Pretoria",
            points: 8001,
            status: "Active",
            avatar: "/avatar-joan.jpg"
        },
        {
            rank: 9,
            creator: "Ismail H.",
            country: "Zambia",
            flag: "🇿🇲",
            city: "Kinve",
            points: 7851,
            status: "Active",
            avatar: "/avatar-ismail.jpg"
        }
    ],

    // User's Position (from API)
    userPosition: {
        draw: "Draw 4",
        rank: 128,
        totalRank: 1940,
        points: 1940,
        countryRank: 14,
        username: "Mp Rank Sneoz.",
        flag: "🇰🇪"
    },

    // Top Videos This Draw (from API)
    topVideos: [
        {
            id: 1,
            creator: "Jessica K.",
            country: "Nigeria",
            flag: "🇳🇬",
            points: 6500,
            thumbnail: "/video-jessica.jpg",
            location: "Nigeria"
        },
        {
            id: 2,
            creator: "Daniel M.",
            country: "Kenya",
            flag: "🇰🇪",
            points: 5900,
            thumbnail: "/video-daniel.jpg",
            location: "Kenya"
        }
    ],

    // How Rankings Stay Fair (NOT from API - static content)
    fairRankings: {
        title: "How Rankings Stay Fair",
        methods: [
            {
                icon: "✓",
                text: "Points verified using platform APIs",
                color: "green"
            },
            {
                icon: "✓",
                text: "AI checks screenshots & engagement",
                color: "green"
            },
            {
                icon: "✓",
                text: "Manual reviews for suspicious activity",
                color: "green"
            }
        ],
        policyLink: {
            text: "Read Fair Play Policy",
            url: "/fair-play-policy"
        }
    },

    // Call to Action (static)
    callToAction: {
        title: "Think You Can Rank Higher?",
        description: "Join the active Draw or upload another approved video to climb the leaderboard.",
        buttons: [
            { text: "Join Active Draw", url: "/draws", color: "yellow" },
            { text: "Upload New Video", url: "/upload", color: "blue" }
        ]
    }
};

export default leaderboardsData;
