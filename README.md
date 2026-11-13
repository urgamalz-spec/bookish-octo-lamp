# New Neighbor Initiative website — ready for GoDaddy Node.js Hosting

Upload this whole folder (or this zip) in the Node.js Hosting UI. Nothing to install or build:
  package.json  name, version, main, build + start scripts
  server.js     serves public/ on process.env.PORT (0.0.0.0)
  public/       the website (index.html, css/, js/, assets/)

## Adding your own photos and logo (optional)
The site works as-is. To show your photos, drop files into public/assets/photos/
named after the spot they fill (.jpg, .png or .webp). Each one appears automatically:

  home-hero, home-approach, action-lny, action-advocacy, action-business,
  about-wide, lead-1 (Urga Azat), lead-2 (Soo Koo), lead-3 (Tsolmon Gantsogt),
  civic-hero, youth-1, youth-2, youth-3, culture-wide, culture-2, culture-3

Other files the site uses if present, in public/assets/:
  nni-logo-navy.png (header logo)   nni-logo-light.png (footer logo)
  civic-hero.mp4 (Civic & Policy video)   youth-civic-program-poster.png
  lashiskin-co100.jpg   aacc-nextgen.png
Until they are added, the site shows the NNI wordmark and leaves those spots out cleanly.

## Editing events
Events live in public/js/site.js in the EVENTS list (date 'YYYY-MM-DD', or 'YYYY-MM' when the day is TBA).
