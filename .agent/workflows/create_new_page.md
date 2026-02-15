---
description: Standard workflow for creating a new page in the Jinnar Viral App
---

# Create New Page Workflow

Follow this workflow whenever you need to add a new page to the application.

1. **Create Data File (Optional but Recommended)**
   - If the page has static content (FAQs, rules, steps), create a file in `src/data/`.
   - Example: `src/data/myNewPage.js`
   - Export a constant object containing the data.

2. **Create Page Component**
   - Create a new file in `src/pages/`.
   - Name it PascalCase (e.g., `MyNewPage.jsx`).
   - **Imports:**
     - `import React from 'react';`
     - `import Header from '../components/ui/Header';`
     - `import Footer from '../components/ui/Footer';`
     - `import { PlayIcon, ... } from '../components/ui/Icons';` (Use shared icons)
   - **Structure:**
     ```jsx
     const MyNewPage = () => {
       return (
         <div className="min-h-screen bg-gray-50">
           <Header />
           <main className="max-w-7xl mx-auto px-6 py-12">
             {/* Page Content Here */}
           </main>
           <Footer />
         </div>
       );
     };
     export default MyNewPage;
     ```

3. **Styling Rules**
   - Use **Tailwind CSS** exclusively.
   - Use `src/utils/colors.js` for standard colors.
   - Use `src/utils/format.js` for formatting numbers/dates.

4. **Add Route**
   - Open `src/App.jsx`.
   - Import the new page: `import MyNewPage from './pages/MyNewPage';`
   - Add the route:
     - **Public:** `<Route path="/my-page" element={<MyNewPage />} />`
     - **Protected:** 
       ```jsx
       <Route 
         path="/my-page" 
         element={
           <ProtectedRoute>
             <MyNewPage />
           </ProtectedRoute>
         } 
       />
       ```

5. **Verify**
   - Ensure Header and Footer are present.
   - Check responsiveness (mobile/desktop).
   - Verify no custom CSS was added.
