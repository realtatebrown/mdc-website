# Website content publishing

The native Google Sheet is owned by massdeportationcoalition@gmail.com and remains Restricted:
https://docs.google.com/spreadsheets/d/1INn0Ebw2ftEjp-OrYjCJVSbeu9AMMNtgzNWh1MAZ5vk/edit

Editor tabs: Instructions, Partners, Articles, Documentaries & Specials, Interviews & Podcasts, Coalition Updates, Press Archive.

Each partner-media tab matches a News format. Type is prefilled. Author is the exact partner/contributor name, used for linked /news?partner=... feeds. Kyle Brosnan and Mike Howell also appear under Oversight Project. Directory entries show content links when work exists. Article images take priority; available individual portraits are used for bylines and as image fallbacks, displayed without a wide crop.

The hidden Press Coverage tab is a compatibility adapter for the deployed publisher. Its A1 formula combines all four media/press tabs, retaining the exact 13-column header. Do not edit this hidden tab or redeploy Apps Script for ordinary content changes. Native tables cover A1:M1000 in each editor tab; preserve dropdowns and headings when adding entries.

The container-bound MDC Website Publisher uses the advanced Sheets v4 service with only the spreadsheets.readonly OAuth scope. SpreadsheetApp.openById cannot be used with that scope. Source and manifest in this folder match the publisher. Deploy new script versions through Manage deployments to preserve the feed URL.

The web app executes as the owner and permits Anyone to read only Published rows and explicitly selected website columns. The spreadsheet itself, Instructions, Draft and Archived rows remain private. Do not publish the workbook as CSV. No credentials are sent to the website.

Set server runtime variable MDC_CONTENT_FEED_URL to the deployed Apps Script /macros/s/.../exec URL. The public Worker receives this non-secret URL from wrangler.jsonc. The owner-only private preview also has the connection configured through Sites environment variables. Editors have not been invited.

The website refreshes on requests approximately every five minutes. Google has a 30-second cache. The server validates the whole payload and retains its last valid response if URLs, IDs, states or dates are invalid. The publisher stores its last successful export across executions. Cold Workers use the bundled snapshot if Google is unreachable. Allow 20 seconds for Google cold starts before falling back.

Use the Instructions tab for editing guidance. Status options are Draft, Published and Archived. A newly added partner feeds both the map and directory; individuals appear in the directory only. Partner-media Type is prefilled by tab. Featured = Yes selects the documentary feature on Home and News; the newest selected film wins. Latest partner cards are ordered by date. Mark Morgan intentionally has no profile link.
