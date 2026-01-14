// Winners page data - Only "Recent Winners" comes from API, rest is static

export const winnersData = {
    // Hero Section (static)
    hero: {
        title: "Win Big with the Jinnar Viral Challenge",
        description: "Compete in active Draws, climb the leaderboard, and earn cash prizes, merchandise, and recognition.",
        buttons: [
            { text: "Draw 4 — Prizes Active", url: "/draws", color: "yellow" },
            { text: "View Leaderboard", url: "/leaderboards", color: "blue" }
        ]
    },

    // What You Can Win (static)
    whatYouCanWin: [
        {
            icon: "💰",
            title: "Cash Prizes",
            subtitle: "Cash Prizes",
            description: "Paid to top-ranking creators via mobile money or bank transfer."
        },
        {
            icon: "👕",
            title: "Official Jinnar Merchandise",
            subtitle: "Official Jinnar Merchandise",
            description: "Exclusive branded merch for winners."
        },
        {
            icon: "🏆",
            title: "Recognition & Badges",
            subtitle: "Recognition & Badges",
            description: "Digital badges + feature on our social media."
        },
        {
            icon: "🎯",
            title: "Promotion Opportunities",
            subtitle: "Promotion Opportunities",
            description: "Your video may be used in official Jinnar campaigns."
        }
    ],

    // Prizes by Draw (static)
    prizesByDraw: {
        title: "Prizes by Draw",
        currentDraw: "Draw 4 — Pan-African Spotlight",
        totalPrize: "$10,000",
        extraPrize: "Extra Ways to Win",
        prizes: [
            { rank: "Total Prize Pool", amount: "$10,000", prize: "Region Impact", countries: "All Countries", status: "" },
            { rank: "1st", amount: "$3,000", prize: "Merchandise", countries: "", status: "Active" },
            { rank: "2nd", amount: "2,000", prize: "Merchandise", countries: "", status: "Active" },
            { rank: "3rd", amount: "1,500", prize: "Merchandise", countries: "", status: "Active" },
            { rank: "Top 10", amount: "", prize: "Merchandise + Badge", countries: "", status: "Active" }
        ],
        note: "Prizes are Draw-specific."
    },

    // Extra Ways to Win (static)
    extraWaysToWin: [
        {
            icon: "🏆",
            title: "Regional Champions",
            description: "Top creators per region win extra prizes."
        },
        {
            icon: "🎬",
            title: "Trending Video Award",
            description: "Most engaged video wins a bonus."
        },
        {
            icon: "⭐",
            title: "Fan Favorite Award",
            description: "Community votes for best video."
        },
        {
            icon: "⚡",
            title: "Fast Rise Bonus",
            description: "Biggest point jump in 48 hours wins extra in Draw."
        }
    ],

    // Fair & Transparent Prizes (static)
    fairPrizes: {
        title: "Fair & Transparent Prizes",
        winners: [
            {
                name: "Joseph M.",
                country: "Kenya",
                flag: "🇰🇪",
                amount: "$3,000",
                prize: "Cash",
                image: "/winner-joseph.jpg"
            },
            {
                name: "Maria N.",
                country: "Tanzania",
                flag: "🇹🇿",
                amount: "$2,000",
                prize: "Cash",
                image: "/winner-maria.jpg"
            }
        ],
        link: {
            text: "View All Winners",
            url: "/all-winners"
        }
    },

    // Your Rewards Dashboard (static)
    rewardsDashboard: {
        title: "Your Rewards Dashboard",
        currentDraw: "Draw 3 - 2",
        status: "Winner",
        reward: "Merchandise",
        shippingStatus: "Shipped",
        link: {
            text: "Go to My Rewards",
            url: "/my-rewards"
        }
    },

    // Important Notes (static)
    importantNotes: {
        title: "Important Notes",
        notes: [
            "🏆 You can win in multiple Draws.",
            "💰 Prizes are clear, measurable, already registered, but sign in to see full details.",
            "📋 Full Terms & Conditions apply (see Rules page)."
        ]
    },

    // Ready to Win (static)
    readyToWin: {
        title: "Ready to Win?",
        description: "Join an active Draw, upload your video, and compete with creators across Africa.",
        buttons: [
            { text: "Join Active Draw", url: "/draws", color: "yellow" },
            { text: "Upload Video for Approval", url: "/upload", color: "blue" }
        ]
    },

    // How You Receive Your Prize (static)
    howToReceive: [
        {
            step: 1,
            title: "Winner notification via dashboard & email",
            icon: "📧"
        },
        {
            step: 2,
            title: "Identity confirmation (basic verification)",
            icon: "✓"
        },
        {
            step: 3,
            title: "Reward claim submission",
            icon: "📝"
        },
        {
            step: 4,
            title: "Payout or shipping processed",
            icon: "💸"
        }
    ],

    // Payout Methods (static)
    payoutMethods: [
        { method: "Mobile money", icon: "📱", color: "yellow" },
        { method: "Bank transfer", icon: "🏦", color: "yellow" },
        { method: "Timeline:", icon: "⏱", color: "gray" },
        { method: "Bank transfer", icon: "🏦", color: "gray" },
        { method: "Platform wallet (when available)", icon: "💳", color: "gray" }
    ],
    payoutNote: "* Prizes are processed within 7-14 business days after Draw closure.",

    // Recent Winners (from API)
    recentWinners: [
        {
            name: "Joseph M.",
            country: "Kenya",
            flag: "🇰🇪",
            draw: "Draw 3",
            status: "Winner",
            prize: "$3,000 + Merchandise",
            image: "/recent-winner-joseph.jpg"
        },
        {
            name: "Maria N.",
            country: "Tanzania",
            flag: "🇹🇿",
            draw: "Draw 3",
            status: "Winner",
            prize: "$2,000 + Merchandise",
            image: "/recent-winner-maria.jpg"
        }
    ],

    // Your Rewards (static)
    yourRewards: {
        draw: "Draw 3 - 2",
        status: "Winner",
        reward: "Merchandise",
        shippingStatus: "Shipped",
        checkmark: "✓"
    }
};

export default winnersData;
