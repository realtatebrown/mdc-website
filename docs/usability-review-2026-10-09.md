# Private usability review — October 9, 2026

Scope: homepage, partner directory, all 21 playbook recommendations and chapter navigation, research embed, news/archive, principles, shared navigation, responsive CSS, keyboard behavior, reduced motion, and print visibility. Public GitHub and Cloudflare deployment are outside this change.

## Corrections

- Removed Mark Morgan's profile link without adding an empty anchor.
- Added a keyboard skip link on every page, a destination after the header, and sticky-header clearance for homepage section links.
- Put mobile menu controls before their contents in keyboard order. Menus close when focus or a click leaves the header. Constrained open menus to the available screen height.
- Keyboard activation of a state moves focus into its partner panel; closing returns focus to the opener. Forward Tab from a selected state dropdown enters the panel. Mouse movement does not dismiss or replace a panel while focus is inside it.
- Expanded research view now exposes dialog semantics, makes background content inert, loops keyboard focus within the tool, and restores background state on exit. The visible exit control remains available; Escape inside the third-party iframe cannot be handled by the parent site.
- Research URL selection now synchronizes on browser history navigation.
- News reset controls appear only for actual user filters. Outlet choices and totals match the selected news section. X announcements use “View post.”
- Malformed playbook URL fragments no longer throw when decoded.
- Focus reveals every hidden animation ancestor; printing reveals all animated content.
- Added narrow-screen wrapping for the collaboration branding, stacked news filters and recommendation navigation, smaller header treatment below 380px, and short-screen reader adjustments.

## Verification

Automated tests render all six routes, validate unique IDs, check every rendered local link/fragment and asset path, verify all 21 recommendation targets and share controls, verify directory filtering/member links, and check news category defaults and empty searches. Existing navigation tests also cover full chapter retention and featured news images. A production build and direct Worker route checks are the final delivery gates.

A standalone TypeScript check reported existing missing Cloudflare runtime types in db/index.ts and worker/index.ts; it reported no errors in the edited application files. No dependency or hosting configuration changes were made to address that unrelated environment issue.

## Remaining limitations

The required browser-control skill is unavailable in this session. This is a source and rendered-output review, not a completed interactive browser, screenshot, real-device touch, screen-reader, or zoom audit. Responsive and focus fixes still need those checks when browser access is available. Automated checks cannot establish the live availability or behavior of external links, CDN map dependencies, YouTube, or DataRepublican's embedded application.

Email signup remains intentionally disconnected and does not accept submissions. Its missing service connection is not fixed or disguised by this review. Documentary title/artwork/watch link remain pending approved material; the feature continues linking to the supplied announcement.
