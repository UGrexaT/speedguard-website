# Vehicle Speeding Guard Website

Official public website for Vehicle Speeding Guard, operated by 17920318 CANADA INC.

This is a dependency-free static site for `speedguard.net`. It includes:

- Home page
- Privacy Policy draft
- Separate iOS Privacy Policy
- Terms of Use draft
- Support / Contact page
- GitHub Pages support files (`CNAME`, `404.html`, `robots.txt`, `sitemap.xml`)

## Local Preview

From this repository root:

```powershell
node preview-server.mjs
```

Then open:

```text
http://localhost:8080/
```

Set a different port with `PORT=8090 node preview-server.mjs` in shells that support inline environment variables, or with `$env:PORT=8090; node preview-server.mjs` in PowerShell.

## Deployment

This site is ready for GitHub Pages from the `main` branch root.

1. Push changes to `origin/main`.
2. In GitHub, open the repository settings.
3. Under Pages, set the source to deploy from the `main` branch and repository root.
4. Confirm the custom domain is `speedguard.net`.
5. Configure DNS with the records required by GitHub Pages for the domain.

The `CNAME` file is already set to `speedguard.net`.

## Content Review Notes

The Privacy Policy and Terms of Use are production-oriented drafts based on inspection of the current Android repository. They should be reviewed by the operator or legal counsel before being treated as final legal advice or final store-disclosure copy.

Items that need operator review include live backend retention, Firebase console settings, AdMob settings, Play Console disclosures, RevenueCat offerings, HERE/Valhalla processing arrangements, regional legal requirements, and whether production app builds enable optional collection flags.
