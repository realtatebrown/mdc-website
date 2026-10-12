# Website content publishing

The native Google Sheet is owned by massdeportationcoalition@gmail.com and remains Restricted:
https://docs.google.com/spreadsheets/d/1INn0Ebw2ftEjp-OrYjCJVSbeu9AMMNtgzNWh1MAZ5vk/edit

Tabs: Instructions, Partners, Coalition Updates, Press Coverage. Baseline: 66 partners and 39 news records.

The container-bound MDC Website Publisher uses the advanced Sheets v4 service with only the spreadsheets.readonly OAuth scope. SpreadsheetApp.openById cannot be used with that scope. Source and manifest in this folder match the publisher. Deploy new script versions through Manage deployments to preserve the feed URL.

The web app executes as the owner and permits Anyone to read only Published rows and explicitly selected website columns. The spreadsheet itself, Instructions, Draft and Archived rows remain private. Do not publish the workbook as CSV. No credentials are sent to the website.

Set server runtime variable MDC_CONTENT_FEED_URL to the deployed Apps Script /macros/s/.../exec URL. The public Worker receives this non-secret URL from wrangler.jsonc. The owner-only private preview also has the connection configured through Sites environment variables. Editors have not been invited.

The website refreshes on requests approximately every five minutes. Google has a 30-second cache. The server validates the whole payload and retains its last valid response if URLs, IDs, states or dates are invalid. The publisher stores its last successful export across executions. Cold Workers use the bundled snapshot if Google is unreachable. Allow 20 seconds for Google cold starts before falling back.

Use the Instructions tab for editing guidance. Status options are Draft, Published and Archived. A newly added partner feeds both the map and directory; individuals appear in the directory only. News categories are determined by their tab. Featured = Yes prioritizes homepage stories, followed by newest dates. Mark Morgan intentionally has no profile link.
