# Home Page API Requirements

## Overview
The Home page currently uses **100% static data** from `src/data/home.js`. Below is a categorized list of all APIs needed to make it dynamic.

---

## 📊 **1. PLATFORM STATISTICS**

### API Endpoint
```
GET /api/stats/platform
```

### Response Data
```json
{
  "videosSubmitted": 12540,
  "countriesParticipating": 18,
  "totalVideosEarned": 45000
}
```

### Used In
- Hero section stats box (3 stat cards)

---

## 🎁 **2. MEGA DRAW COUNTDOWN**

### API Endpoint
```
GET /api/draws/next-mega
```

### Response Data
```json
{
  "date": "December 30, 2025",
  "countdown": {
    "days": 198,
    "hours": 23,
    "minutes": 14,
    "seconds": 12
  }
}
```

### Used In
- Yellow countdown box in hero section

---

## 📢 **3. ANNOUNCEMENTS**

### API Endpoint
```
GET /api/announcements?limit=5
```

### Response Data
```json
{
  "announcements": [
    {
      "id": 1,
      "type": "mega",
      "title": "Mega Draw - December 30, 2025",
      "description": "Top 50 creators win cash prizes + official Jinnar merchandise.",
      "icon": "🎁",
      "learnMoreLink": "/draws/mega-2025"
    }
  ]
}
```

### Used In
- "Announcements & Draw Results" section

---

## 🏆 **4. WINNERS**

### 4A. Latest Draw Winners
```
GET /api/winners/latest?draw=weekly
```

### Response Data
```json
{
  "drawName": "Nairobi Weekly Champions (Dec 5-12)",
  "winners": [
    {
      "rank": 1,
      "name": "Joseph M.",
      "country": "Kenya",
      "flag": "🇰🇪",
      "points": 12900,
      "totalPoints": 12800
    }
  ]
}
```

### Used In
- "Latest Draw Winners" section (shows top 3)

---

## 📈 **5. LEADERBOARDS**

### 5A. Global Leaderboard - Weekly
```
GET /api/leaderboard/global?period=weekly&limit=10
```

### 5B. Global Leaderboard - Monthly
```
GET /api/leaderboard/global?period=monthly&limit=10
```

### 5C. Regional Leaderboard
```
GET /api/leaderboard/regional?region=east-africa&period=weekly&limit=3
```

### Response Data (All Leaderboards)
```json
{
  "period": "weekly",
  "region": "East Africa",
  "entries": [
    {
      "rank": 1,
      "name": "Joseph M.",
      "country": "Kenya",
      "flag": "🇰🇪",
      "points": 12900,
      "avatar": "/avatar1.jpg",
      "thumbnail": "/creator1.jpg"
    }
  ]
}
```

### Used In
- Main leaderboard table (with Weekly/Monthly tabs)
- Regional leaderboard section (top 3 creators with photos)

---

## 🎬 **6. FEATURED VIDEOS**

### API Endpoint
```
GET /api/videos/featured?limit=3
```

### Response Data
```json
{
  "videos": [
    {
      "id": 1,
      "thumbnail": "/placeholder-video-1.jpg",
      "creator": "Joseph M.",
      "location": "Nairobi",
      "points": 12800,
      "rank": 1
    }
  ]
}
```

### Used In
- Right sidebar "Featured Videos" section

---

## 📤 **7. VIDEO UPLOAD**

### API Endpoint
```
POST /api/videos/upload
```

### Request Data
```json
{
  "file": "<video file>",
  "title": "My Video",
  "description": "Video description"
}
```

### Response Data
```json
{
  "success": true,
  "videoId": "abc123",
  "status": "pending_review"
}
```

### Used In
- Right sidebar "Upload Your Video for Approval" section

---

## ✅ **8. USER VIDEO STATUS**

### API Endpoint
```
GET /api/user/videos/status
```

### Response Data
```json
{
  "videos": [
    {
      "id": "abc123",
      "status": "pending",
      "statusText": "Pending Review",
      "color": "yellow",
      "icon": "⚠"
    },
    {
      "id": "def456",
      "status": "approved",
      "statusText": "Approved - Ready to Post",
      "color": "green",
      "icon": "✓"
    }
  ]
}
```

### Used In
- Right sidebar "Status Indicators" section

---

## 📋 **SUMMARY**

### Total APIs Needed: **8 endpoints**

| Category | Endpoint | Method | Priority |
|----------|----------|--------|----------|
| Platform Stats | `/api/stats/platform` | GET | HIGH |
| Mega Draw | `/api/draws/next-mega` | GET | HIGH |
| Announcements | `/api/announcements` | GET | MEDIUM |
| Winners | `/api/winners/latest` | GET | HIGH |
| Leaderboard (Global Weekly) | `/api/leaderboard/global?period=weekly` | GET | HIGH |
| Leaderboard (Global Monthly) | `/api/leaderboard/global?period=monthly` | GET | HIGH |
| Leaderboard (Regional) | `/api/leaderboard/regional` | GET | MEDIUM |
| Featured Videos | `/api/videos/featured` | GET | MEDIUM |
| Video Upload | `/api/videos/upload` | POST | HIGH |
| User Video Status | `/api/user/videos/status` | GET | MEDIUM |

### Currently Integrated
- ✅ Authentication APIs (`authService.js`)
- ✅ User Profile APIs (`userService.js`)

### Next Steps
1. Create service files for each category
2. Replace static `homeData` imports with API calls
3. Add loading states and error handling
4. Implement real-time countdown updates
