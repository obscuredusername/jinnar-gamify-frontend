---
description: Create the Jinnar Challenge page with data file, component, and routing integration
---

# Jinnar Challenge Page Workflow

This workflow guides the creation of the Jinnar Challenge page, ensuring all data is separated and components are properly integrated.

1. **Create Challenge Data File**
   - Create `src/data/jinnarChallenge.js`
   - content:
     ```javascript
     export const challengeData = {
       hero: {
         title: "How the Jinnar Viral Challenge Works",
         subtitle: "Create content. Get approved. Go viral. Earn points. Win rewards.",
         primaryButton: "Join Challenge",
         secondaryButton: "Upload Video for Approval"
       },
       steps: {
         title: "It's Simple — Just 3 Steps",
         items: [
           {
             number: 1,
             title: "Join an Active Draw",
             description: "Jinnar runs numbered challenge rounds called Draws...",
             features: ["A focus topic", "Official hashtags", "Dates", "Prize pool"],
             cta: "View Current Draws"
           },
           {
             number: 2,
             title: "Upload Your Video for Approval",
             description: "Upload video for AI + human review...",
             statuses: [
               { label: "Pending Review", color: "yellow" },
               { label: "Approved", color: "green" },
               { label: "Needs Revision", color: "red" }
             ]
           },
           {
             number: 3,
             title: "Post & Earn Points",
             description: "Publish video on supported platforms...",
             platforms: ["TikTok", "Instagram", "Facebook", "YouTube"],
             cta: "Submit Post Link / Proof"
           }
         ]
       },
       competition: {
         title: "Compete Within Each Draw",
         leaderboard: {
           title: "Draw 3 - East Africa",
           cta: "View Leaderboards",
           entries: [
             { rank: 1, name: "Joseph M.", country: "Kenya", flag: "🇰🇪", points: 12900 },
             { rank: 2, name: "Maria N.", country: "Tanzania", flag: "🇹🇿", points: 11540 },
             { rank: 3, name: "Gift M.", country: "Uganda", flag: "🇺🇬", points: 10200 }
           ]
         }
       },
       winners: {
         title: "How Winners Are Selected",
         subtitle: "Your Content, Jinnar's Promotion",
         description: "Earn Jinnar permission to feature approved videos...",
         benefits: ["Cash prizes", "Official Jinnar merchandise", "Public recognition"],
         cta: "View Prizes & Rewards"
       },
       callToAction: {
         title: "Ready to Join the Next Draw?",
         subtitle: "Create. Share. Compete. Win.",
         primaryButton: "Join Active Draw",
         secondaryButton: "Upload Video Now"
       },
       faq: {
         title: "FAQ Preview",
         subtitle: "Quick Questions",
         questions: [
           { question: "Can I join more than one Draw?", answered: true },
           { question: "How long does approval take?", answered: false },
           { question: "Can I submit multiple videos?", answered: true },
           { question: "How often are Draws held?", answered: false }
         ],
         cta: "View Full FAQ"
       }
     };
     export default challengeData;
     ```

2. **Create JinnarChallenge Page Component**
   - Create `src/pages/JinnarChallenge.jsx`
   - Import `Header` from `../components/ui/Header`
   - Import `challengeData` from `../data/jinnarChallenge`
   - Use Tailwind CSS for all styling
   - Structure: Header -> Hero -> Steps -> Competition -> CTA -> FAQ -> Footer

3. **Add Route to App**
   - Open `src/App.jsx`
   - Import `JinnarChallenge` from `./pages/JinnarChallenge`
   - Add `<Route path="/challenge" element={<JinnarChallenge />} />` inside `<Routes>`

## Rules
- MUST use Tailwind CSS only.
- Use existing Header component.
- Data must be in separate data file.
