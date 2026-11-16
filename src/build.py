#!/usr/bin/env python3
"""Build the multi-page site from src/template.html into public/.
Run from the project root:  python3 src/build.py
"""
import re, json, datetime, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
SITE = 'https://nneighbor.org'
V = datetime.datetime.now().strftime('%Y%m%d%H%M')
WHO = 'communities, especially Mongolian American, AAPI, and immigrant groups,'

PAGES = {  # data-page: (file, title, description)
  'home': ('index.html', 'New Neighbor Initiative · Community-rooted. Institutionally connected.',
           f'New Neighbor Initiative helps {WHO} and small businesses turn existing opportunities into practical progress through civic engagement, leadership development, economic opportunity, and culture.'),
  'about': ('about.html', 'About NNI · New Neighbor Initiative',
            f'New Neighbor Initiative closes the distance between {WHO} and the institutions, relationships, and opportunities that influence their lives.'),
  'work': ('our-work.html', 'Our Work · New Neighbor Initiative',
           'Four practices, one model of access: civic and policy engagement, leadership and youth, economic opportunity, and culture and community.'),
  'civic': ('civic-policy.html', 'Civic & Policy Engagement · New Neighbor Initiative',
            'NNI turns community experiences into documented priorities and brings community representatives into direct, nonpartisan dialogue with institutions.'),
  'priorities': ('community-priorities.html', 'Mongolian American Community Policy Priorities 2026 · New Neighbor Initiative',
                 'Town halls and a 113-person rapid pulse survey produced the Mongolian American Community Policy Priorities, presented to the Congressional Asian Pacific American Caucus.'),
  'leadership': ('leadership-youth.html', 'Leadership & Youth · New Neighbor Initiative',
                 'NNI develops emerging leaders by placing them inside real civic and organizational work. Apply to the Young Civic Leader Program.'),
  'economic': ('economic-opportunity.html', 'Small Business & Economic Opportunity · New Neighbor Initiative',
               'Help for micro and small business owners: business readiness, access to capital, procurement, B2B growth, and connections to the right partners.'),
  'culture': ('culture-community.html', 'Culture & Community · New Neighbor Initiative',
              'Cultural programs, including the Congressional Mongolian Lunar New Year, that bring communities into civic spaces and build lasting relationships.'),
  'impact': ('impact.html', 'Impact · New Neighbor Initiative',
             'What NNI can document: congressional offices engaged, youth leaders, businesses assisted, opportunities accessed, and partnerships built.'),
  'news': ('news.html', 'News · New Neighbor Initiative', 'News, recaps, and highlights from New Neighbor Initiative.'),
  'calendar': ('events.html', 'Event Calendar · New Neighbor Initiative',
               'Upcoming NNI masterclasses, community events, and Capitol Hill programs, plus partner events open to our community.'),
  'involved': ('get-involved.html', 'Get Involved & Donate · New Neighbor Initiative',
               'Volunteer, partner, bring NNI to your community, or support our work with a tax-deductible gift.'),
  'privacy': ('privacy.html', 'Privacy Policy · New Neighbor Initiative', 'How New Neighbor Initiative handles information sent through this website.'),
  'notfound': ('404.html', 'Page not found · New Neighbor Initiative', 'This page could not be found.'),
}
WORK = ['work', 'civic', 'leadership', 'economic', 'culture']
NEWS = ['news', 'calendar']
EXTRA = {'support': 'get-involved.html#support', 'contact': 'get-involved.html#contact'}

src = (ROOT / 'src' / 'template.html').read_text()
head, rest = src.split('<body>', 1)
pre, rest = rest.split('<main id="main">', 1)
main, post = rest.split('</main>', 1)

blocks = {}
for m in re.finditer(r'<!-- =+ [^>]*?=+ -->\n(<div data-page="([a-z]+)">.*?)(?=\n<!-- =+ |\Z)', main, re.S):
    blocks[m.group(2)] = m.group(1).rstrip()
missing = set(PAGES) - set(blocks)
assert not missing, missing

def links(html, here):
    def sub(m):
        name = m.group(1)
        if name in PAGES:
            return 'href="%s"' % PAGES[name][0]
        if name in EXTRA:
            target = EXTRA[name]
            return 'href="#%s"' % name if here == 'involved' else 'href="%s"' % target
        return m.group(0)
    return re.sub(r'href="#([a-z-]+)"', sub, html)

org = {"@context": "https://schema.org", "@type": "NGO", "name": "New Neighbor Initiative", "alternateName": "NNI",
       "url": SITE + "/", "logo": SITE + "/assets/nni-logo-navy.png", "email": "connect@nneighbor.org",
       "nonprofitStatus": "Nonprofit501c3",
       "address": {"@type": "PostalAddress", "addressLocality": "Washington", "addressRegion": "DC", "addressCountry": "US"},
       "description": PAGES['home'][2]}

out = ROOT / 'public'
for name, (file, title, desc) in PAGES.items():
    h = head.replace('%%V%%', V)
    h = re.sub(r'<title>.*?</title>', '<title>%s</title>' % title.replace('&', '&amp;'), h)
    h = re.sub(r'<meta name="description" content="[^"]*">', '<meta name="description" content="%s">' % desc.replace('&', '&amp;'), h)
    url = SITE + '/' + ('' if file == 'index.html' else file)
    meta = []
    if name == 'notfound':
        meta.append('<meta name="robots" content="noindex">')
    else:
        meta.append('<link rel="canonical" href="%s">' % url)
    meta += ['<meta name="theme-color" content="#033366">',
             '<meta property="og:type" content="website">', '<meta property="og:site_name" content="New Neighbor Initiative">',
             '<meta property="og:title" content="%s">' % title.replace('&', '&amp;'),
             '<meta property="og:description" content="%s">' % desc.replace('&', '&amp;'),
             '<meta property="og:url" content="%s">' % url,
             '<meta property="og:image" content="%s/assets/og-image.jpg">' % SITE,
             '<meta property="og:image:width" content="1200">', '<meta property="og:image:height" content="630">',
             '<meta name="twitter:card" content="summary_large_image">']
    if name == 'home':
        meta.append('<script type="application/ld+json">%s</script>' % json.dumps(org))
    h = h.replace('</head>', '\n'.join(meta) + '\n</head>')

    p = pre
    for a in re.findall(r'<a href="#[a-z]+" data-nav="([a-z]+)">', p):
        on = a == name or (a == 'work' and name in WORK)
        if on:
            p = p.replace('data-nav="%s">' % a, 'data-nav="%s" class="on" aria-current="page">' % a)
    if name in WORK:
        p = p.replace('<div class="subnav" id="work-subnav" hidden>', '<div class="subnav" id="work-subnav">')
    if name in NEWS:
        p = p.replace('<div class="subnav" id="news-subnav" hidden>', '<div class="subnav" id="news-subnav">')
    p = p.replace('data-sub="%s">' % name, 'data-sub="%s" class="on" aria-current="page">' % name)
    p = re.sub(r'\n<div class="subnav" id="(work|news)-subnav" hidden>.*?\n</div>\n', '\n', p, flags=re.S)

    body = blocks[name].replace('<div data-page="%s">' % name, '<div data-page="%s" class="show">' % name, 1)
    html = h + '<body data-page="%s">' % name + p + '<main id="main">\n' + body + '\n</main>' + post.replace('%%V%%', V)
    html = links(html, name)
    (out / file).write_text(html)

# sitemap + robots
today = datetime.date.today().isoformat()
urls = [SITE + '/' + ('' if f == 'index.html' else f) for n, (f, _, _) in PAGES.items() if n not in ('notfound',)]
(out / 'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    ''.join('  <url><loc>%s</loc><lastmod>%s</lastmod></url>\n' % (u, today) for u in urls) + '</urlset>\n')
(out / 'robots.txt').write_text('User-agent: *\nAllow: /\nSitemap: %s/sitemap.xml\n' % SITE)
print('built', len(PAGES), 'pages, version', V)
