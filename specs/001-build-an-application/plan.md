# Implementation Plan: Showcase Next.js Caching Methods

**Branch**: `001-build-an-application` | **Date**: 9 September 2025 | **Spec**: [/specs/001-build-an-application/spec.md]
**Input**: Feature specification from `/specs/001-build-an-application/spec.md`

## Execution Flow (/plan command scope)
```
1. Load feature spec from Input path
   → If not found: ERROR "No feature spec at {path}"
2. Fill Technical Context (scan for NEEDS CLARIFICATION)
   → Detect Project Type from context (web=frontend+backend, mobile=app+api)
   → Set Structure Decision based on project type
3. Evaluate Constitution Check section below
   → If violations exist: Document in Complexity Tracking
   → If no justification possible: ERROR "Simplify approach first"
   → Update Progress Tracking: Initial Constitution Check
4. Execute Phase 0 → research.md
   → If NEEDS CLARIFICATION remain: ERROR "Resolve unknowns"
5. Execute Phase 1 → contracts, data-model.md, quickstart.md, agent-specific template file (e.g., `CLAUDE.md` for Claude Code, `.github/copilot-instructions.md` for GitHub Copilot, or `GEMINI.md` for Gemini CLI).
6. Re-evaluate Constitution Check section
   → If new violations: Refactor design, return to Phase 1
   → Update Progress Tracking: Post-Design Constitution Check
7. Plan Phase 2 → Describe task generation approach (DO NOT create tasks.md)
8. STOP - Ready for /tasks command
```

**IMPORTANT**: The /plan command STOPS at step 7. Phases 2-4 are executed by other commands:
- Phase 2: /tasks command creates tasks.md
- Phase 3-4: Implementation execution (manual or via tools)

## Summary
Build a Next.js 15 application that demonstrates the newest and beta caching features, including SSR caching, API route caching, and other advanced mechanisms. The app will use minimal external libraries and focus exclusively on Next.js 15 caching capabilities.

## Technical Context
**Language/Version**: Next.js 15 (beta)
**Primary Dependencies**: Next.js 15 (no additional libraries unless strictly required for caching demos)
**Storage**: N/A (demo data only, unless Next.js caching requires)
**Testing**: Jest, Playwright (for integration and E2E tests)
**Target Platform**: Web (modern browsers)
**Project Type**: Web application (frontend only)
**Performance Goals**: Demonstrate cache effectiveness and refresh speed; no explicit throughput targets
**Constraints**: Use only Next.js 15 caching features; minimize external dependencies
**Scale/Scope**: Single demo app; multiple caching strategies showcased

## Constitution Check
*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Simplicity**:
- Projects: 1 (single web app)
- Using Next.js directly (no wrappers)
- Single data model (demo entities only)
- No unnecessary patterns (no Repository/UoW)

**Architecture**:
- Feature is a standalone demo app
- No additional libraries unless required for Next.js caching
- No CLI required
- Documentation will be provided in markdown

**Testing (NON-NEGOTIABLE)**:
- RED-GREEN-Refactor cycle enforced
- Tests written before implementation
- Contract→Integration→E2E→Unit order followed
- No mocks; real Next.js caching features used
- Integration tests for caching scenarios
- No implementation before failing tests

**Observability**:
- Basic logging for cache events
- Error context displayed in UI

**Versioning**:
- Versioning via git and feature branch
- Breaking changes not expected

## Project Structure

### Documentation (this feature)
```
specs/[###-feature]/
├── plan.md              # This file (/plan command output)
├── research.md          # Phase 0 output (/plan command)
├── data-model.md        # Phase 1 output (/plan command)
├── quickstart.md        # Phase 1 output (/plan command)
├── contracts/           # Phase 1 output (/plan command)
└── tasks.md             # Phase 2 output (/tasks command - NOT created by /plan)
```

### Source Code (repository root)
```
# Option 1: Single project (DEFAULT)
src/
├── models/
├── services/
├── cli/
└── lib/

tests/
├── contract/
├── integration/
└── unit/

# Option 2: Web application (when "frontend" + "backend" detected)
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/

# Option 3: Mobile + API (when "iOS/Android" detected)
api/
└── [same as backend above]

ios/ or android/
└── [platform-specific structure]
```

**Structure Decision**: Web application (frontend only)

## Phase 0: Outline & Research
1. **Extract unknowns from Technical Context** above:
   - Which specific new and beta caching features in Next.js 15 should be showcased?
   - Are there any required external libraries for demonstrating caching?
   - Should the app support user authentication for personalized caching demos?

2. **Generate and dispatch research agents**:
   - Task: "Research all new and beta caching features in Next.js 15."
   - Task: "Determine if any external libraries are required for Next.js 15 caching demos."
   - Task: "Clarify if user authentication is needed for personalized caching demos."

3. **Consolidate findings** in `research.md` using format:
   - Decision: [List of Next.js 15 caching features to showcase]
   - Rationale: [Why these features were chosen]
   - Alternatives considered: [Other caching approaches evaluated]

**Output**: research.md with all NEEDS CLARIFICATION resolved

## Phase 1: Design & Contracts
*Prerequisites: research.md complete*

1. **Extract entities from feature spec** → `data-model.md`:
   - CachingMethod: name, type, description, demoComponent
   - DemoInteraction: actionType, cacheState, result

2. **Generate API contracts** from functional requirements:
   - If any API route caching is demoed, define endpoints for cache refresh, status, etc.
   - Output OpenAPI schema to `/contracts/` if applicable

3. **Generate contract tests** from contracts:
   - One test file per endpoint (if API routes used)
   - Assert request/response schemas
   - Tests must fail (no implementation yet)

4. **Extract test scenarios** from user stories:
   - Each story → integration test scenario
   - Quickstart test = story validation steps

5. **Update agent file incrementally** (O(1) operation):
   - Run `/scripts/update-agent-context.sh copilot` for your AI assistant
   - Add only NEW tech from current plan
   - Preserve manual additions between markers
   - Update recent changes (keep last 3)
   - Keep under 150 lines for token efficiency
   - Output to repository root

**Output**: data-model.md, /contracts/*, failing tests, quickstart.md, agent-specific file

## Phase 2: Task Planning Approach
*This section describes what the /tasks command will do - DO NOT execute during /plan*

**Task Generation Strategy**:
- Load `/templates/tasks-template.md` as base
- Generate tasks from Phase 1 design docs (contracts, data model, quickstart)
- Each contract → contract test task [P]
- Each entity → model creation task [P] 
- Each user story → integration test task
- Implementation tasks to make tests pass

**Ordering Strategy**:
- TDD order: Tests before implementation 
- Dependency order: Models before services before UI
- Mark [P] for parallel execution (independent files)

**Estimated Output**: 25-30 numbered, ordered tasks in tasks.md

**IMPORTANT**: This phase is executed by the /tasks command, NOT by /plan

## Phase 3+: Future Implementation
*These phases are beyond the scope of the /plan command*

**Phase 3**: Task execution (/tasks command creates tasks.md)  
**Phase 4**: Implementation (execute tasks.md following constitutional principles)  
**Phase 5**: Validation (run tests, execute quickstart.md, performance validation)

## Complexity Tracking
*Fill ONLY if Constitution Check has violations that must be justified*

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |


## Progress Tracking
*This checklist is updated during execution flow*

**Phase Status**:
- [x] Phase 0: Research complete (/plan command)
- [x] Phase 1: Design complete (/plan command)
- [x] Phase 2: Task planning complete (/plan command - describe approach only)
- [x] Phase 3: Tasks generated (/tasks command)
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:
- [x] Initial Constitution Check: PASS
- [x] Post-Design Constitution Check: PASS
- [x] All NEEDS CLARIFICATION resolved
- [ ] Complexity deviations documented

---
*Based on Constitution v2.1.1 - See `/memory/constitution.md`*