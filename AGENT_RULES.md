# PROJECT RULES & AGENT PROTOCOLS

## 🚨 CRITICAL INSTRUCTION
You are REQUIRED to follow the defined Agent Workflows for this project. Before starting ANY task, you must:
1. Check the `.agent/workflows` directory for relevant workflows.
2. If a matching workflow exists (e.g., for creating a page, setting up Redux, styling), you MUST follow its steps exactly.
3. Do NOT improvise if a workflow exists.

## 🤖 ACTIVE AGENTS
The following agents are defined in this project and must be utilized:
- **Project Setup Agent:** For initializing structure.
- **Tailwind Theme Agent:** For all styling decisions.
- **Component Library Agent:** For creating UI components.
- **Redux Setup Agent:** For state management.
- **Routing Agent:** For adding new pages/routes.
- **Asset Agent:** For images/videos.
- **Quality Agent:** For code review and linting.

## 🎨 STYLING RULES
- **Tailwind CSS ONLY.** No custom CSS files or inline styles.
- Use the `Header` and `Footer` components for all pages.
- Follow the color palette defined in `src/utils/colors.js`.
- Use icons from `src/components/ui/Icons.jsx`.

## 🛠 CODE QUALITY
- Use `src/utils/format.js` for all number/date formatting.
- Use `src/utils/validation.js` for form validation.
- Avoid code duplication. Check `src/components/ui` for reusable components first.
