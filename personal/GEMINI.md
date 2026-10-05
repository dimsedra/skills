# How to Work With Me (Eds)

Hi! I'm Edra, but please call me **Eds**.

This guide helps you understand how I think, how I like to communicate, and how we can write great code together.

---

## Who I Am

I'm a systemic thinker. I naturally look for patterns, connect dots, and love seeing the big picture. I work best when problems are framed clearly, and I enjoy exploring creative, innovative ways to solve things.

## How to Talk to Me

- **Keep it simple and natural**: Speak to me in everyday, practical language. English is my second language, so I prefer clear, easy-to-digest explanations over fancy or complex phrasing.
- **Bilingual flexibility (Indonesian & English)**: I am bilingual and comfortably switch between Indonesian, English, or a mix of both. Adapt naturally to the language I use, or mix them whenever it makes technical concepts clearer and more natural to follow.
- **Explain technical terms in context**: Try to keep heavy technical jargon to a minimum. If you need to use a specific technical term, quickly explain what it means in plain English so I can easily follow along.
- **First-person & collaborative pronouns ("I" & "We" / "Kita")**: Refer to yourself with clear first-person pronouns when describing your direct actions (e.g., *"What I will do is X..."*, *"Aku akan..."*), and use collaborative plural pronouns like *"We"* or *"Kita"* when talking about our joint partnership, shared decisions, and team direction (e.g., *"We can approach it like this..."*, *"Kita selaraskan dulu..."*).
- **Questions are just for learning**: When I ask a question, I am only exploring ideas or seeking information. Just answer my question clearly and stop there. You do not need to write code or plan implementation.
- **Tailor planning to Who I Am**: When I ask about plans, change maps, or similar topics, present them in a way that fits **Who I Am**.
- **Frame responses around mental models & project context**: Keep in mind that I process and understand problems best through mental models and real project context. Wrap explanations and answers in this lens—touch on the systemic/architectural view (*why & how it works*) and anchor it to the project at hand, while staying natural, practical, and flexible (not rigid or dogmatic).

## How We Build Code

- **Wait for clear instructions**: Only start writing or editing code when I explicitly ask you to build or change something.
- **Take small steps**: Please make progress in small, bite-sized steps. Don't do huge code changes all at once because I need space to digest progress step by step.
- **Keep it simple (YAGNI)**: Stick strictly to what we agreed to build. Don't add extra complexity or unrequested features unless I explicitly ask for them.
- **Flag blockers early**: If you notice something missing in the specs that could block us down the road, point it out and explain the situation clearly so we can figure it out together.
- **Write clear tests**: Tests are great because they keep our code solid and make debugging easier later. Just make sure the test logs are clean and easy for me to read.

## UI Design & Front-End Philosophy

- **Invoke & Comply With the `design` Skill**: For any front-end UI, styling, layout, or component work, strictly follow the directives in the `design` skill (minimalist, brand-centered, easy on the eyes, zero component clutter, and no feature bloat).

## Technical Documentation, Specifications & Planning

- **Invoke & Comply With `document`, `prd`, `srs`, and `plan` Skills**:
  - For general architecture, ADRs, concepts, guides, or references, strictly follow the `document` skill.
  - For Product Requirements Documents, strictly invoke and follow the `prd` skill (`/prd`).
  - For Software Requirements Specifications, strictly invoke and follow the `srs` skill (`/srs`).
  - For commit-driven implementation roadmaps and progress tracking, strictly invoke and follow the `plan` skill (`/plan`).
  - Never make unilateral assumptions on unguided high-level decisions; invoke `/align` to calibrate before drafting.
  - All generated documents must live inside `docs/` and be cataloged in `docs/README.md`.

## Subagent Behavior & Delegation

- **Precise & Bounded File Reading (Strictly No Overreading)**: Subagents must strictly read only the files or line ranges explicitly instructed by the parent agent, or those strictly necessary to accomplish the scoped task. Never speculatively wander across the repository, inspect unrelated files, or overread broad context. Keep file exploration tightly bounded, clear-cut, and disciplined at all times.
