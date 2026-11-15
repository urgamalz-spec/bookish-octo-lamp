(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  /* ---------- Photo slots: show assets/photos/<slot>.jpg (or .png/.webp) if present ---------- */
  $$('.slot[data-slot]').forEach(function (el) {
    var id = el.getAttribute('data-slot');
    var exts = ['jpg', 'jpeg', 'png', 'webp'];
    (function tryNext(i) {
      if (i >= exts.length) return;
      var img = new Image();
      img.alt = '';
      img.onload = function () { el.appendChild(img); };
      img.onerror = function () { tryNext(i + 1); };
      img.src = 'assets/photos/' + id + '.' + exts[i];
    })(0);
  });

  /* ---------- Static content blocks ---------- */
  function bars(target, rows, color, h) {
    $(target).innerHTML = rows.map(function (r) {
      return '<div class="bar"><span>' + esc(r[0]) + '</span><span>' + r[1] + '%</span>' +
        '<div class="track" aria-hidden="true" style="height:' + h + 'px"><div class="fill" style="width:' + r[1] + '%;background:' + (r[2] || color) + (color === '#FECD43' ? ';box-shadow:inset 0 0 0 1px #D9A92A' : '') + '"></div></div></div>';
    }).join('');
  }
  bars('#bars-issues', [
    ['Immigration & legal support', 53, '#033366'], ['Healthcare access', 50, '#033366'],
    ['Cultural preservation & community programs', 46, '#004AAD'], ['Employment opportunities', 45, '#004AAD'],
    ['Stronger community organizations', 45, '#004AAD'], ['Youth engagement', 25, '#8FA9C9'],
    ['Housing affordability', 22, '#8FA9C9'], ['Access to education', 19, '#8FA9C9'],
    ['Language access & interpretation', 13, '#8FA9C9']
  ], '#004AAD', 10);
  bars('#bars-congress', [
    ['Small-business support', 73], ['More funding for emerging immigrant communities', 56],
    ['Affordable housing', 31], ['Language access to government services', 29]
  ], '#FECD43', 14);

  $('#six-areas').innerHTML = [
    ['Business Readiness', 'Strengthen operations, financial understanding, systems, positioning, and the underlying capacity required for growth.'],
    ['Capital Access', 'Help owners identify appropriate grants, lenders, financing programs, and capital-readiness resources — and understand what must happen before applying.'],
    ['Technical Assistance', 'Connect businesses with qualified accounting, legal, technology, marketing, procurement, and business-support expertise when specialized help is required.'],
    ['Procurement & Market Access', 'Build understanding of registrations, licensing, certifications, supplier databases, solicitations, subcontracting, and relationships with prime contractors and institutional buyers.'],
    ['Strategic Relationships', 'Connect businesses with chambers, economic-development organizations, corporations, lenders, government programs, universities, and professional networks.'],
    ['Implementation', 'Help businesses convert an introduction or resource into a defined next step tied to an actual business objective.']
  ].map(function (a, i) {
    return '<div class="stack g14" style="padding:32px 28px;border-right:1px solid #DCD5C7;border-bottom:1px solid #DCD5C7"><span class="mono" style="font-size:11px;color:#004AAD">0' + (i + 1) + '</span><h3 class="serif" style="margin:0;font-weight:500;font-size:28px;line-height:1.12">' + esc(a[0]) + '</h3><p class="body" style="font-size:15.5px">' + esc(a[1]) + '</p></div>';
  }).join('');

  var impact = [
    ['01', 'n-gold', 'CIVIC ACCESS', 'Communities engaging institutions directly.', [['67', 'Congressional offices engaged'], ['3', 'Communities documented']], 'NNI collected community priorities and brought them into congressional engagement — followed by briefings, outreach, and continued contact.'],
    ['02', 'n-blue', 'EMERGING LEADERS', 'Young people gaining real responsibility.', [['31', 'Youth leaders in program roles'], ['4', 'Years on the Hill']], 'Student volunteers moderated sessions, coordinated speakers, and supported outreach to congressional offices for the Lunar New Year program.'],
    ['03', 'n-navy', 'ECONOMIC OPPORTUNITY', 'Businesses turning available resources into action.', [['58+', 'Businesses assisted', 'Owners receiving targeted navigation or support'], ['100+', 'Connections completed', 'Referrals to lenders, technical-assistance providers, procurement programs, or partners'], ['300+', 'Opportunities accessed', 'Grants, financing, training, procurement, certifications, or networks'], ['30+', 'Strategies implemented', 'Operational, financial, market, technology, or growth actions']], 'Measured by what businesses do next — not attendance alone — and reported only when records can verify it.'],
    ['04', 'n-blue', 'INSTITUTIONAL PARTNERSHIPS', 'Relationships across every sector.', [['21', 'Partner organizations'], ['6', 'Sectors: government, nonprofit, business, university, diplomatic, community']], 'Programs are co-hosted with public offices, embassies, universities, and community organizations — not delivered alone.']
  ];
  $('#impact-blocks').innerHTML = impact.map(function (b) {
    var stats = b[4].map(function (s) {
      return '<div class="cardw stack" style="padding:24px;gap:8px"><span class="serif" style="font-size:52px;line-height:1">' + esc(s[0]) + '</span>' +
        (s[2] ? '<span style="font-size:15px;font-weight:500;line-height:1.4">' + esc(s[1]) + '</span><span style="font-size:13.5px;line-height:1.45;color:#4A5563">' + esc(s[2]) + '</span>' : '<span style="font-size:14px;line-height:1.45;color:#4A5563">' + esc(s[1]) + '</span>') + '</div>';
    }).join('');
    return '<div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(min(100%,360px),1fr));gap:clamp(32px,5vw,72px);padding-top:32px;border-top:1px solid #033366">' +
      '<div class="stack g18"><div style="display:flex;gap:14px;align-items:center"><span class="num ' + b[1] + '" style="width:28px;height:28px">' + b[0] + '</span><span class="mono" style="font-size:11.5px;letter-spacing:.16em">' + b[2] + '</span></div><h2 class="serif" style="margin:0;font-weight:500;font-size:clamp(32px,3.4vw,46px);line-height:1.05">' + esc(b[3]) + '</h2></div>' +
      '<div class="grid" style="grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;align-content:start">' + stats +
      '<p class="body" style="grid-column:1/-1;padding-top:16px;border-top:1px solid #DCD5C7">' + esc(b[5]) + '</p></div></div>';
  }).join('');

  var recaps = [
    ['Recap · November 2026', 'From the B20 Summit to District procurement leaders', [['Nov 5', 'DC Department of General Services — 3rd Annual Certified Business Enterprise Symposium'], ['Nov 5', 'Diwali Reception at the Embassy of India'], ['Nov 6', '32nd Annual Loudoun Small Business Awards'], ['Nov 9–11', 'B20 Summit — U.S. Chamber of Commerce'], ['Nov 12', 'National ACE Q4 Strategic Partners Meeting']]],
    ['Recap · October 2026', 'NNI in the room with business and procurement leaders', [['Oct 16', 'Asian American Chamber of Commerce Business Summit'], ['Oct 21', 'US Chamber of Commerce Small Business Forum'], ['Oct 22', 'Prince George’s County Office of Procurement — Partnering for Impact'], ['Oct 27', 'Maryland State Business Roundtable']]]
  ];
  $('#recaps').innerHTML = recaps.map(function (r) {
    return '<div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(min(100%,360px),1fr));gap:clamp(24px,4vw,56px);padding:32px 0;border-bottom:1px solid #DCD5C7">' +
      '<div class="stack g14"><span class="tag">' + esc(r[0]) + '</span><h3 class="serif" style="margin:0;font-weight:500;font-size:clamp(28px,3vw,40px);line-height:1.1">' + esc(r[1]) + '</h3><p class="body">In ' + esc(r[0].replace('Recap · ', '')) + ', NNI participated in:</p></div>' +
      '<div class="stack" style="border-top:1px solid #DCD5C7">' + r[2].map(function (e) {
        return '<div class="grid" style="grid-template-columns:84px minmax(0,1fr);gap:16px;padding:16px 0;border-bottom:1px solid #DCD5C7;align-items:baseline"><span class="mono" style="font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#004AAD">' + esc(e[0]) + '</span><span class="serif" style="font-size:22px;line-height:1.2">' + esc(e[1]) + '</span></div>';
      }).join('') + '</div></div>';
  }).join('');

  /* ---------- Event calendar ---------- */
  var AREAS = { civic: 'Civic & Policy', leadership: 'Leadership & Youth', economic: 'Economic Opportunity', culture: 'Culture & Community' };
  var DOT = { civic: '#FECD43', leadership: '#004AAD', economic: '#033366', culture: '#F7F4EE' };
  var NL = 'Check back for the confirmed date. Subscribe to our newsletter to get the latest news and details on trainings, workshops, opportunities, and events you won’t want to miss.';
  // date: 'YYYY-MM-DD', or 'YYYY-MM' when the day is not yet announced.
  var EVENTS = [
    { date: '2026-11-13', time: '2:00 pm', title: 'Set Up Your ChatGPT Like a CEO with Coach Mila Ryan', area: 'economic', kind: 'Partner event', note: 'Hosted by the Asian American Chamber of Commerce.', link: 'https://asian-americanchamber.glueup.com/event/set-up-your-chatgpt-like-a-ceo-with-coach-mila-ryan-200993/' },
    { date: '2026-12-17', title: 'NNI Partner Appreciation Christmas Holiday Reception', area: 'culture', kind: 'NNI event' },
    { date: '2027-01', title: 'Small Business Masterclass | Micro & Small Business Finance 101: Preparing for Access to Capital', area: 'economic', kind: 'NNI event', note: 'Thinking about applying for a grant, taking out a business loan, or bringing on an investor? Join New Neighbor Initiative for the first session in our monthly Small Business Masterclass series, featuring Mandala Comprehensive Services and banking professionals.\n\nDesigned for micro and small business owners, this session will help you understand your cash flow, organize your financial records, and strengthen the day-to-day operations that support growth. We’ll explore how grants, loans, and investment work, what funders look for, and how to decide which option fits your business.\n\nCome with your questions and leave with practical steps you can take before your next funding opportunity. Check back here for the confirmed date and registration details — or subscribe to our newsletter to get the latest news, dates, and details on our events, workshops, and education sessions so you never miss one.' },
    { date: '2027-02', title: 'Fourth Annual Congressional Mongolian Lunar New Year', area: 'culture', kind: 'NNI event', location: 'Capitol Hill', note: 'Join New Neighbor Initiative on Capitol Hill to celebrate Tsagaan Sar, the Mongolian Lunar New Year, with community members, congressional and federal staff, and civic partners. Experience Mongolia’s vibrant culture through traditional art performance, and enjoy Mongolian food and drinks.\n\nAs in past years, young leaders from NNI’s Youth Civic Leadership Program will help shape the event. Come meet them and hear how they identified and researched issues affecting their community and turned their findings into policy priorities. Ask questions, share your feedback, and learn how you can support their work beyond the celebration.\n\n' + NL },
    { date: '2027-02', title: 'Small Business Masterclass | Take Your AI Skills Up a Level', area: 'economic', kind: 'NNI event', note: 'You already use AI to draft emails and cut down on repetitive work. In this hands-on masterclass, New Neighbor Initiative will show you how to take that a step further and use AI to improve how your business runs.\n\nWe’ll start with the work you already do. Use AI to identify what’s confusing on your website and map out a refresh. Find where a routine process gets stuck, spot trends in your revenue and expenses, and use your CRM data to see which leads need a follow-up.\n\nThen we’ll go deeper into the setup. You’ll learn what to customize, which apps to connect, and how to give an AI agent a defined role in a workflow you can run again. We’ll walk through how the tools work together and where to build in a review before anything goes live or reaches a customer.\n\nBring a business process you’d like to improve. Leave knowing how to set up and test an AI workflow for it.\n\n' + NL },
    { date: '2027-03', title: 'Greater Washington Tech Roundtable | Growing Together', area: 'economic', kind: 'NNI event', note: 'New Neighbor Initiative will bring together leaders of high-performing and high-potential small technology businesses across Greater Washington, with a focus on cybersecurity and emerging technologies, for a candid roundtable with state economic development officials.\n\nWhat would help more technology companies grow, hire, and stay in the region? Business leaders will share what’s helped them grow and where they still face barriers, from finding skilled talent to accessing capital and reaching new customers. Together, participants will identify where businesses and state agencies can work together to help local companies expand and create more opportunities across the region.\n\n' + NL },
    { date: '2027-03', title: 'International Women’s Day | Women Learning Across Generations', area: ['leadership', 'culture'], kind: 'NNI event', note: 'Join New Neighbor Initiative for an International Women’s Day gathering that celebrates womanhood and brings women and girls of all generations together. Women working in policy, business, and science will join community members to share what they’ve learned, talk candidly about challenges they’ve faced, and explore how they can support one another.\n\nSeasoned professionals will share the advice and encouragement they wish they’d had earlier. Younger women and girls will bring their own experiences, fresh ideas, and questions that can challenge familiar ways of thinking. Wherever you are in life, there’s room for your voice and a chance to build relationships that continue beyond the event.\n\n' + NL },
    { date: '2027-06', title: 'Procurement Readiness for Microbusinesses | From B2C to B2B', area: 'economic', kind: 'NNI event', note: 'Ready to sell your products or services to government agencies, larger companies, or prime contractors? Join New Neighbor Initiative for a half-day event that helps microbusiness owners understand how procurement works and build the relationships that can lead to future contracts.\n\nWe’ll walk through how to identify the state and county licenses or permits your business may need, find the right vendor registration platforms, and connect with procurement offices, economic development agencies, and minority business commissions that can help. If paperwork or registration has slowed you down, bring your questions. NNI will help you figure out where to start and who to turn to for support.\n\nYou’ll also have a chance to meet prime contractors, learn what they look for in vendors and subcontractors, and start building relationships before an opportunity opens. NNI is bringing microbusinesses, public agencies, and commercial buyers together so buyers can meet capable local vendors and business owners can build a long-term plan for winning contracts.\n\n' + NL },
    { date: '2027-05', title: 'AAPI Heritage Month | From Community Data to Policy Priorities', area: 'civic', kind: 'NNI event', note: 'This Asian American and Pacific Islander Heritage Month, New Neighbor Initiative (NNI) will lead a series of working sessions with AAPI community organizations and partners in policy, business, and health.\n\nTogether, we’ll gather and analyze data, listen to community members, and examine what the findings tell us about the barriers people face and the opportunities they want to pursue. Through these discussions, we’ll agree on policy priorities grounded in what communities are experiencing and identify where organizations can work together to move those priorities forward.\n\nBring your experience, data, or questions to the table. We’ll use what we learn to develop specific recommendations for decision-makers and define what progress would look like in people’s daily lives.\n\nCheck back for the confirmed dates. Subscribe to our newsletter to get the latest news and details on trainings, workshops, opportunities, and events you won’t want to miss.' },
    { date: '2027-04', title: 'Small Business Masterclass | Make Your Next Real Estate Move Count', area: 'economic', kind: 'NNI event', note: 'Opening a second location, moving downtown, or launching a premium service? Join New Neighbor Initiative for a commercial real estate masterclass designed for micro and small business owners, with particular attention to the challenges minority-owned businesses face in securing space.\n\nExperienced commercial brokers and industry experts will show you how to assess a location against your growth plans, weigh the full cost of a lease, and build a relationship with a broker who can make your case to property owners. Learn how to tell the story behind your business and explain what makes it a strong tenant, from the customers you’ll draw to how your services complement the businesses next door.\n\nBring your plans and questions. You’ll have time to speak directly with commercial brokers and leave with contacts you can turn to as your search moves forward.\n\n' + NL },
    { date: '2027-07', title: 'Career & Mentorship Mixer | Explore What’s Next', area: 'leadership', kind: 'NNI event', note: 'Curious about a career in public service, what it’s like to work at a Fortune 100 company, or how to get started in science? Join New Neighbor Initiative for a career and mentorship mixer for high school and college students.\n\nThrough short, small-group conversations, you’ll meet professionals from Congress, government, diplomacy, public service, business, nonprofits, academia, and science. Ask what their work is really like, how they got started, and what they wish they’d known when they were in your shoes.\n\nWhether you have a career in mind or are still exploring, come with a question and leave with new connections and ideas for your next step.\n\n' + NL },
    { date: '2027-08', title: 'Small Business Masterclass | Demystifying SEO', area: 'economic', kind: 'NNI event', note: 'When someone searches for the service you offer, does your business show up? Join New Neighbor Initiative for a practical masterclass on search engine optimization (SEO) for micro and small business owners.\n\nWe’ll look at what potential customers type into Google and how to use that insight to improve your website and Google Business Profile. Learn how to make your service pages easier to find, show up in relevant local searches, and see which searches are already bringing people to your site.\n\nBring your website or a service you want more customers to find. You’ll leave knowing which updates to tackle first and how to tell whether they’re working.\n\n' + NL },
    { date: '2027-09', title: 'Small Business Masterclass | Build an Online Store That Sells', area: 'economic', kind: 'NNI event', note: 'Ready to sell online for the first time, or wondering why shoppers visit your store without buying? Join New Neighbor Initiative for an e-commerce masterclass for micro and small business owners.\n\nWe’ll follow the customer’s journey from the first product page to checkout. Learn how to choose a sales platform that fits your business, build product pages that answer buyers’ questions, and make decisions about shipping and returns that work for your customers and your margins. If you already sell online, we’ll look at how to spot where shoppers drop off and decide what to fix first.\n\nBring a product you want to sell or an online store you want to improve. Leave with a short list of changes you can put to work right away.\n\n' + NL }
  ];
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var now = new Date();
  var cal = { y: now.getFullYear(), m: now.getMonth(), f: 'all' };
  var key = function (y, m) { return y + '-' + String(m + 1).padStart(2, '0'); };
  var areasOf = function (e) { return [].concat(e.area); };
  var pass = function (e) { return cal.f === 'all' || areasOf(e).indexOf(cal.f) >= 0; };
  var sortKey = function (e) { return e.date.length === 7 ? e.date + '-99' : e.date; };

  var filters = $('#cal-filters');
  [['all', 'All']].concat(Object.keys(AREAS).map(function (k) { return [k, AREAS[k]]; })).forEach(function (f) {
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'chip'; b.textContent = f[1]; b.setAttribute('data-f', f[0]);
    b.addEventListener('click', function () { cal.f = f[0]; renderCal(); });
    filters.appendChild(b);
  });
  var todayBtn = document.createElement('button');
  todayBtn.type = 'button'; todayBtn.className = 'link'; todayBtn.textContent = 'Back to this month';
  todayBtn.style.cssText = 'margin-left:auto;background:none;border:0;border-bottom:1px solid #004AAD;cursor:pointer';
  todayBtn.addEventListener('click', function () { cal.y = now.getFullYear(); cal.m = now.getMonth(); renderCal(); });
  filters.appendChild(todayBtn);
  $('#cal-prev').addEventListener('click', function () { var d = new Date(cal.y, cal.m - 1, 1); cal.y = d.getFullYear(); cal.m = d.getMonth(); renderCal(); });
  $('#cal-next').addEventListener('click', function () { var d = new Date(cal.y, cal.m + 1, 1); cal.y = d.getFullYear(); cal.m = d.getMonth(); renderCal(); });

  function renderCal() {
    var ym = key(cal.y, cal.m), cur = key(now.getFullYear(), now.getMonth());
    var p = new Date(cal.y, cal.m - 1, 1), n = new Date(cal.y, cal.m + 1, 1);
    $('#cal-month').textContent = MONTHS[cal.m] + ' ' + cal.y;
    $('#cal-prev').textContent = '← ' + MONTHS[p.getMonth()].slice(0, 3);
    $('#cal-next').textContent = MONTHS[n.getMonth()].slice(0, 3) + ' →';
    $('#cal-past').hidden = !(ym < cur);
    todayBtn.hidden = ym === cur;
    $$('#cal-filters [data-f]').forEach(function (b) { var on = b.getAttribute('data-f') === cal.f; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); });

    var list = EVENTS.filter(function (e) { return e.date.slice(0, 7) === ym && pass(e); }).sort(function (a, b) { return sortKey(a) < sortKey(b) ? -1 : 1; });
    var days = [];
    list.forEach(function (e) {
      var id = e.date.length === 10 ? e.date : 'tba';
      var d = days.filter(function (x) { return x.id === id; })[0];
      if (!d) {
        if (id === 'tba') d = { id: id, dow: 'Date', num: 'TBA', events: [] };
        else { var dt = new Date(+id.slice(0, 4), +id.slice(5, 7) - 1, +id.slice(8, 10)); d = { id: id, dow: DOW[dt.getDay()], num: dt.getDate(), events: [] }; }
        days.push(d);
      }
      d.events.push(e);
    });
    var out = $('#cal-list');
    if (!days.length) {
      var later = EVENTS.filter(function (e) { return pass(e) && e.date.slice(0, 7) > ym; }).sort(function (a, b) { return sortKey(a) < sortKey(b) ? -1 : 1; })[0];
      out.innerHTML = '<div class="cardw stack g18" style="margin-top:24px;padding:clamp(32px,4vw,56px);align-items:flex-start"><span class="mono" style="font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:#6B7380">No events listed</span><p class="serif" style="margin:0;font-size:clamp(24px,2.6vw,34px);line-height:1.2">Nothing on the calendar for ' + MONTHS[cal.m] + ' ' + cal.y + ' yet.</p>' +
        (later ? '<button type="button" class="btn btn-gold" id="cal-jump" style="font-size:10.5px;padding:13px 20px">Next listed event · ' + MONTHS[+later.date.slice(5, 7) - 1] + ' ' + later.date.slice(0, 4) + ' →</button>' : '') + '</div>';
      if (later) $('#cal-jump').addEventListener('click', function () { cal.y = +later.date.slice(0, 4); cal.m = +later.date.slice(5, 7) - 1; renderCal(); });
      return;
    }
    out.innerHTML = days.map(function (d) {
      return '<div class="cal-day"><div class="stack" style="gap:4px"><span class="mono" style="font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#004AAD">' + d.dow + '</span><span class="serif" style="font-size:clamp(34px,3.4vw,48px);line-height:1">' + d.num + '</span></div><div class="stack" style="gap:28px">' +
        d.events.map(function (e) {
          var a = areasOf(e);
          return '<article class="stack" style="gap:10px"><div class="cal-meta"><span style="display:inline-flex;align-items:center;gap:8px;color:#004AAD"><span class="dot" aria-hidden="true" style="background:' + (DOT[a[0]] || '#004AAD') + '"></span>' + esc(a.map(function (x) { return AREAS[x]; }).join(' · ')) + '</span><span>' + esc(e.kind || '') + '</span>' +
            (e.time ? '<span>' + esc(e.time) + '</span>' : '') + (e.location ? '<span>' + esc(e.location) + '</span>' : '') + '</div>' +
            '<h3 class="serif" style="margin:0;font-weight:500;font-size:clamp(24px,2.4vw,32px);line-height:1.15;text-wrap:balance">' + esc(e.title) + '</h3>' +
            (e.note ? '<p class="body" style="max-width:640px;white-space:pre-line">' + esc(e.note) + '</p>' : '') +
            (e.link ? '<a class="link" href="' + esc(e.link) + '" target="_blank" rel="noopener">Details ↗</a>' : '') + '</article>';
        }).join('') + '</div></div>';
    }).join('');
  }
  renderCal();

  /* ---------- Contact form (opens the visitor's email app) ---------- */
  var topic = 'partner';
  var TOPIC_LABEL = { volunteer: 'Volunteer', partner: 'Partnership', community: 'Bring NNI to my community', support: 'Support NNI' };
  function setTopic(t) {
    topic = t;
    $$('#topics [data-topic]').forEach(function (b) { var on = b.getAttribute('data-topic') === t; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); });
  }
  $$('[data-topic]').forEach(function (b) {
    b.addEventListener('click', function () {
      setTopic(b.getAttribute('data-topic'));
      if (!b.closest('#topics')) $('#contact').scrollIntoView({ behavior: 'smooth' });
    });
  });
  setTopic('partner');
  $('#contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var f = e.target;
    var body = 'Name: ' + f.name.value + '\nOrganization: ' + f.org.value + '\nEmail: ' + f.email.value + '\n\n' + f.message.value;
    location.href = 'mailto:connect@nneighbor.org?subject=' + encodeURIComponent('Website inquiry: ' + TOPIC_LABEL[topic]) + '&body=' + encodeURIComponent(body);
  });

  /* ---------- Router ---------- */
  var PAGES = $$('[data-page]').map(function (el) { return el.getAttribute('data-page'); });
  var WORK = ['work', 'civic', 'leadership', 'economic', 'culture'];
  var NEWS = ['news', 'calendar'];
  function route() {
    var page = location.hash.slice(1) || 'home';
    if (PAGES.indexOf(page) < 0) {
      var target = document.getElementById(page);
      if (target) { target.scrollIntoView(); return; }
      page = 'home';
    }
    $$('[data-page]').forEach(function (el) { el.classList.toggle('show', el.getAttribute('data-page') === page); });
    $('#work-subnav').hidden = WORK.indexOf(page) < 0;
    $('#news-subnav').hidden = NEWS.indexOf(page) < 0;
    $$('[data-sub]').forEach(function (a) { a.classList.toggle('on', a.getAttribute('data-sub') === page); });
    $$('[data-nav]').forEach(function (a) {
      var n = a.getAttribute('data-nav');
      var on = n === page || (n === 'work' && WORK.indexOf(page) >= 0);
      a.classList.toggle('on', on);
      if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    var h = $('[data-page="' + page + '"] h1');
    document.title = page === 'home' ? 'New Neighbor Initiative' : (h ? h.textContent.trim() + ' · ' : '') + 'New Neighbor Initiative';
    window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', route);
  route();
})();
