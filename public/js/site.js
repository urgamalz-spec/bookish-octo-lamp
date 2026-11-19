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
  if ($('#bars-issues')) bars('#bars-issues', [
    ['Immigration & legal support', 53, '#033366'], ['Healthcare access', 50, '#033366'],
    ['Cultural preservation & community programs', 46, '#004AAD'], ['Employment opportunities', 45, '#004AAD'],
    ['Stronger community organizations', 45, '#004AAD'], ['Youth engagement', 25, '#8FA9C9'],
    ['Housing affordability', 22, '#8FA9C9'], ['Access to education', 19, '#8FA9C9'],
    ['Language access & interpretation', 13, '#8FA9C9']
  ], '#004AAD', 10);
  if ($('#bars-congress')) bars('#bars-congress', [
    ['Small-business support', 73], ['More funding for emerging immigrant communities', 56],
    ['Affordable housing', 31], ['Language access to government services', 29]
  ], '#FECD43', 14);

  if ($('#six-areas')) $('#six-areas').innerHTML = [
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
  if ($('#impact-blocks')) $('#impact-blocks').innerHTML = impact.map(function (b) {
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
  if ($('#recaps')) $('#recaps').innerHTML = recaps.map(function (r) {
    return '<div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(min(100%,360px),1fr));gap:clamp(24px,4vw,56px);padding:32px 0;border-bottom:1px solid #DCD5C7">' +
      '<div class="stack g14"><span class="tag">' + esc(r[0]) + '</span><h3 class="serif" style="margin:0;font-weight:500;font-size:clamp(28px,3vw,40px);line-height:1.1">' + esc(r[1]) + '</h3><p class="body">In ' + esc(r[0].replace('Recap · ', '')) + ', NNI participated in:</p></div>' +
      '<div class="stack" style="border-top:1px solid #DCD5C7">' + r[2].map(function (e) {
        return '<div class="grid" style="grid-template-columns:84px minmax(0,1fr);gap:16px;padding:16px 0;border-bottom:1px solid #DCD5C7;align-items:baseline"><span class="mono" style="font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#004AAD">' + esc(e[0]) + '</span><span class="serif" style="font-size:22px;line-height:1.2">' + esc(e[1]) + '</span></div>';
      }).join('') + '</div></div>';
  }).join('');

  /* ---------- Event calendar ---------- */
  var AREAS = { civic: 'Civic & Policy', leadership: 'Leadership & Youth', economic: 'Economic Opportunity', culture: 'Culture & Community' };
  var DOT = { civic: '#FECD43', leadership: '#004AAD', economic: '#033366', culture: '#F7F4EE' };
  var NL = 'Date and registration details are coming soon. Select “Notify me” below and we’ll email you as soon as they’re confirmed.';
  // date: 'YYYY-MM-DD', or 'YYYY-MM' when the day is not yet announced.
  var EVENTS = [
    { date: '2026-02-19', title: 'Third Congressional Mongolian Lunar New Year', area: 'culture', kind: 'NNI event', location: 'Capitol Hill', note: 'NNI brought Mongolian culture and community voices to Capitol Hill for the Third Congressional Mongolian Lunar New Year. Through cultural performances, conversation, and connections with congressional staff and community partners, the celebration strengthened Mongolian American visibility and created opportunities for engagement beyond the event.' },
    { date: '2026-04', time: 'April 2026', title: 'Mongolian American Community Rapid Pulse Survey', area: 'civic', kind: 'NNI event', location: 'Online', note: 'NNI conducted a rapid pulse survey to understand the challenges, needs, and policy priorities of the Mongolian American community. 113 community members responded, and their answers helped shape the Mongolian American Community Policy Priorities that the community delegation brought to Congress in May.', link: 'community-priorities.html', linkText: 'See what the community told us' },
    { date: '2026-04-28', title: 'AAPI Heritage Month Advocacy Kickoff', area: 'civic', kind: 'NNI event', note: 'NNI convened Mongolian American community members to prepare for congressional engagement during AAPI Heritage Month. The conversation introduced the advocacy process and encouraged participants to turn shared experiences and concerns into policy priorities they could bring directly to legislators.' },
    { date: '2026-05-09', title: 'Preparing Our Community for Congressional Advocacy', area: 'civic', kind: 'NNI event', note: 'Effective advocacy starts with preparation. This in-person session helped community members refine their policy priorities, share their personal experiences, and prepare to communicate with congressional offices. Participants worked together to build confidence and approach their meetings with a clear, collective voice.' },
    { date: '2026-05-10', title: 'Congressional Advocacy Community Consultation', area: 'civic', kind: 'NNI event', note: 'NNI created space for community members to discuss the issues they wanted lawmakers to understand before the congressional fly-in. The consultation helped connect individual experiences with shared priorities and ensured that community perspectives shaped the conversations ahead.' },
    { date: '2026-05-14', title: 'NNI Congressional Fly-In', area: 'civic', kind: 'NNI event', location: 'Capitol Hill', note: 'NNI organized the Mongolian American community’s first congressional fly-in to present its own policy priorities directly to legislators. Community members met with the Honorable Grace Meng, Chair of the Congressional Asian Pacific American Caucus, to share their concerns and discuss opportunities for greater representation and engagement. This milestone marked an important step toward sustained Mongolian American participation in federal policymaking.' },
    { date: '2026-09-02', title: 'AAPI Micro and Small Business Policy Roundtable', area: ['economic', 'civic'], kind: 'NNI event', location: 'Online', note: 'NNI convened an online roundtable with 31 participants representing Thai, Mongolian, Korean, Indian, Chinese, and Vietnamese American businesses. Owners working across cybersecurity, AI, human resources, insurance, restaurants, beauty, trade, construction, staffing, and education examined proposed changes to SBA small-business size standards. Their experiences shaped recommendations on how federal policy can better reflect the realities of micro and small businesses.' },
    { date: '2026-09-20', title: 'AAPI Small Businesses Have a Voice in Federal Policy', area: ['economic', 'civic'], kind: 'NNI event', note: 'NNI gathered comments from 17 AAPI-owned businesses and submitted them through the official SBA portal in response to proposed changes to federal small-business size standards. The submission emphasized protecting genuinely small, minority-owned, and first-time federal contractors from being crowded out by larger, established firms. Together, these owners brought their lived experiences directly into the federal policymaking process.' },
    { date: '2026-10-05', title: 'Mongolian Democratic History: Photo and Editorial Cartoon Exhibition', area: ['civic', 'culture'], kind: 'NNI event', location: 'Rayburn House Office Building', note: 'At the Rayburn House Office Building, NNI presented photographs and editorial cartoons exploring Mongolia’s democratic journey. The exhibition invited visitors to reflect on the courage of ordinary people, the importance of individual participation, and the continuing responsibility to preserve democracy. It opened NNI’s three-day community program encouraging Mongolian Americans to vote and remain civically engaged.' },
    { date: '2026-10-06', title: 'Artists, Journalists, and Minority Community Voices', area: ['civic', 'culture'], kind: 'NNI event', location: 'National Press Club', note: 'NNI brought a professional discussion to the National Press Club exploring how artists and journalists help minority communities tell their stories and make their voices heard. Participants considered how storytelling can inspire people to exercise their voting rights and participate in public life, regardless of their community’s population size.' },
    { date: '2026-10-07', title: 'Remembering Our Democratic Journey, Strengthening Civic Participation', area: ['civic', 'culture'], kind: 'NNI event', location: 'George Washington University', note: 'NNI convened a community discussion at George Washington University reflecting on the peaceful demonstrations and collective determination that brought democracy to Mongolia without violence. Connecting that history with civic responsibilities today, the gathering encouraged Mongolian Americans to recognize the value of their voices, exercise their voting rights, and remain engaged ahead of the 2026 midterm elections.' },
    { date: '2026-11-13', time: '2:00 pm', title: 'Set Up Your ChatGPT Like a CEO with Coach Mila Ryan', area: 'economic', kind: 'Partner event', note: 'Hosted by the Asian American Chamber of Commerce.', link: 'https://asian-americanchamber.glueup.com/event/set-up-your-chatgpt-like-a-ceo-with-coach-mila-ryan-200993/' },
    { date: '2026-12-17', title: 'NNI Partner Appreciation Christmas Holiday Reception', area: 'culture', kind: 'NNI event' },
    { date: '2027-01-09', time: '8:00–9:30 p.m. ET', location: 'Online', title: 'Small Business Masterclass | Bookkeeping, Business Taxes & Reporting Essentials', area: 'economic', kind: 'NNI event', note: 'For micro and small businesses · Includes 2026 tax and wage reporting updates\n\nWhat should you track throughout the year, and what do you need to have ready when it’s time to file? Join New Neighbor Initiative and Bobo Steele, founder of Mandala Comprehensive Service, for a foundational workshop on bookkeeping, business taxes, and the reporting responsibilities that come with running a business.\n\nWe’ll cover:\n\nBookkeeping and financial management: Build a monthly routine for tracking income and expenses, organizing records, and reviewing cash flow.\n\nBusiness taxes and Schedule C: Understand common IRS obligations and filing deadlines, including how sole proprietors report business income and expenses.\n\nBusiness deductions and 2026 updates: Explore the Qualified Business Income (QBI) deduction, review what’s new for 2026, and learn which records to keep to support the deductions you claim.\n\nWage reporting with Social Security: Learn about new Social Security Administration (SSA) wage reporting requirements and the tools employers can use to submit wage reports.\n\nExiting a corporation: Understand the steps involved in closing or dissolving a corporation, including final filings.\n\nBring a question you’ve been putting off. You’ll leave with a monthly finance checklist to help you keep your records organized and get ready for filing season.\n\nSaturday, January 9, 2027, from 8:00 to 9:30 p.m. Eastern. That’s 7:00–8:30 p.m. Central, 6:00–7:30 p.m. Mountain, and 5:00–6:30 p.m. Pacific.', link: 'https://www.eventbrite.com/e/nni-masterclass-bookkeeping-business-taxes-reporting-essentials-tickets-2004929446947', linkText: 'Register on Eventbrite', speaker: { name: 'Bobo Steele', role: 'Founder, Mandala Comprehensive Service', bio: 'Bobo Steele has built a career across four fields that rarely come together in one practice: real estate, insurance, paralegal work, and tax preparation. She founded Mandala Comprehensive Service in 2019 and is a real estate broker with North Pacific Properties. Her insurance experience includes roles with American Family Insurance and Pacific Reliance Insurance.\n\nBobo holds a master’s degree in world economics. Her credentials include Advanced Paralegal training at Edmonds Community College (EdCC), certificates in real estate and insurance, and tax preparation training through H&R Block.' }, image: 'assets/events/masterclass-2027-01-09.jpg', imageAlt: 'Small Business Masterclass: Bookkeeping, Business Taxes and Reporting Essentials, with Bobo Steele, founder of Mandala Comprehensive Service. Saturday, January 9, 2027.' },
    { date: '2027-02', title: 'Fourth Annual Congressional Mongolian Lunar New Year', area: 'culture', kind: 'NNI event', location: 'Capitol Hill', note: 'Join New Neighbor Initiative on Capitol Hill to celebrate Tsagaan Sar, the Mongolian Lunar New Year, with community members, congressional and federal staff, and civic partners. Experience Mongolia’s vibrant culture through traditional art performance, and enjoy Mongolian food and drinks.\n\nAs in past years, young leaders from NNI’s Youth Civic Leadership Program will help shape the event. Come meet them and hear how they identified and researched issues affecting their community and turned their findings into policy priorities. Ask questions, share your feedback, and learn how you can support their work beyond the celebration.\n\n' + NL },
    { date: '2027-02', title: 'Small Business Masterclass | Take Your AI Skills Up a Level', area: 'economic', kind: 'NNI event', note: 'You already use AI to draft emails and cut down on repetitive work. In this hands-on masterclass, New Neighbor Initiative will show you how to take that a step further and use AI to improve how your business runs.\n\nWe’ll start with the work you already do. Use AI to identify what’s confusing on your website and map out a refresh. Find where a routine process gets stuck, spot trends in your revenue and expenses, and use your CRM data to see which leads need a follow-up.\n\nThen we’ll go deeper into the setup. You’ll learn what to customize, which apps to connect, and how to give an AI agent a defined role in a workflow you can run again. We’ll walk through how the tools work together and where to build in a review before anything goes live or reaches a customer.\n\nBring a business process you’d like to improve. Leave knowing how to set up and test an AI workflow for it.\n\n' + NL },
    { date: '2027-03', title: 'Greater Washington Tech Roundtable | Growing Together', area: 'economic', kind: 'NNI event', note: 'New Neighbor Initiative will bring together leaders of high-performing and high-potential small technology businesses across Greater Washington, with a focus on cybersecurity and emerging technologies, for a candid roundtable with state economic development officials.\n\nWhat would help more technology companies grow, hire, and stay in the region? Business leaders will share what’s helped them grow and where they still face barriers, from finding skilled talent to accessing capital and reaching new customers. Together, participants will identify where businesses and state agencies can work together to help local companies expand and create more opportunities across the region.\n\n' + NL },
    { date: '2027-03', title: 'International Women’s Day | Women Learning Across Generations', area: ['leadership', 'culture'], kind: 'NNI event', note: 'Join New Neighbor Initiative for an International Women’s Day gathering that celebrates womanhood and brings women and girls of all generations together. Women working in policy, business, and science will join community members to share what they’ve learned, talk candidly about challenges they’ve faced, and explore how they can support one another.\n\nSeasoned professionals will share the advice and encouragement they wish they’d had earlier. Younger women and girls will bring their own experiences, fresh ideas, and questions that can challenge familiar ways of thinking. Wherever you are in life, there’s room for your voice and a chance to build relationships that continue beyond the event.\n\n' + NL },
    { date: '2027-06', title: 'Procurement Readiness for Microbusinesses | From B2C to B2B', area: 'economic', kind: 'NNI event', note: 'Ready to sell your products or services to government agencies, larger companies, or prime contractors? Join New Neighbor Initiative for a half-day event that helps microbusiness owners understand how procurement works and build the relationships that can lead to future contracts.\n\nWe’ll walk through how to identify the state and county licenses or permits your business may need, find the right vendor registration platforms, and connect with procurement offices, economic development agencies, and minority business commissions that can help. If paperwork or registration has slowed you down, bring your questions. NNI will help you figure out where to start and who to turn to for support.\n\nYou’ll also have a chance to meet prime contractors, learn what they look for in vendors and subcontractors, and start building relationships before an opportunity opens. NNI is bringing microbusinesses, public agencies, and commercial buyers together so buyers can meet capable local vendors and business owners can build a long-term plan for winning contracts.\n\n' + NL },
    { date: '2027-05', title: 'AAPI Heritage Month | From Community Data to Policy Priorities', area: 'civic', kind: 'NNI event', note: 'This Asian American and Pacific Islander Heritage Month, New Neighbor Initiative (NNI) will lead a series of working sessions with AAPI community organizations and partners in policy, business, and health.\n\nTogether, we’ll gather and analyze data, listen to community members, and examine what the findings tell us about the barriers people face and the opportunities they want to pursue. Through these discussions, we’ll agree on policy priorities grounded in what communities are experiencing and identify where organizations can work together to move those priorities forward.\n\nBring your experience, data, or questions to the table. We’ll use what we learn to develop specific recommendations for decision-makers and define what progress would look like in people’s daily lives.\n\nDates and registration details for each session are coming soon. Select “Notify me” below and we’ll email you as soon as they’re confirmed.' },
    { date: '2027-04', title: 'Small Business Masterclass | Make Your Next Real Estate Move Count', area: 'economic', kind: 'NNI event', note: 'Opening a second location, moving downtown, or launching a premium service? Join New Neighbor Initiative for a commercial real estate masterclass designed for micro and small business owners, with particular attention to the challenges minority-owned businesses face in securing space.\n\nExperienced commercial brokers and industry experts will show you how to assess a location against your growth plans, weigh the full cost of a lease, and build a relationship with a broker who can make your case to property owners. Learn how to tell the story behind your business and explain what makes it a strong tenant, from the customers you’ll draw to how your services complement the businesses next door.\n\nBring your plans and questions. You’ll have time to speak directly with commercial brokers and leave with contacts you can turn to as your search moves forward.\n\n' + NL },
    { date: '2027-07', title: 'Career & Mentorship Mixer | Explore What’s Next', area: 'leadership', kind: 'NNI event', note: 'Curious about a career in public service, what it’s like to work at a Fortune 100 company, or how to get started in science? Join New Neighbor Initiative for a career and mentorship mixer for high school and college students.\n\nThrough short, small-group conversations, you’ll meet professionals from Congress, government, diplomacy, public service, business, nonprofits, academia, and science. Ask what their work is really like, how they got started, and what they wish they’d known when they were in your shoes.\n\nWhether you have a career in mind or are still exploring, come with a question and leave with new connections and ideas for your next step.\n\n' + NL },
    { date: '2027-08', title: 'Small Business Masterclass | Demystifying SEO', area: 'economic', kind: 'NNI event', note: 'When someone searches for the service you offer, does your business show up? Join New Neighbor Initiative for a practical masterclass on search engine optimization (SEO) for micro and small business owners.\n\nWe’ll look at what potential customers type into Google and how to use that insight to improve your website and Google Business Profile. Learn how to make your service pages easier to find, show up in relevant local searches, and see which searches are already bringing people to your site.\n\nBring your website or a service you want more customers to find. You’ll leave knowing which updates to tackle first and how to tell whether they’re working.\n\n' + NL },
    { date: '2027-09', title: 'Small Business Masterclass | Build an Online Store That Sells', area: 'economic', kind: 'NNI event', note: 'Ready to sell online for the first time, or wondering why shoppers visit your store without buying? Join New Neighbor Initiative for an e-commerce masterclass for micro and small business owners.\n\nWe’ll follow the customer’s journey from the first product page to checkout. Learn how to choose a sales platform that fits your business, build product pages that answer buyers’ questions, and make decisions about shipping and returns that work for your customers and your margins. If you already sell online, we’ll look at how to spot where shoppers drop off and decide what to fix first.\n\nBring a product you want to sell or an online store you want to improve. Leave with a short list of changes you can put to work right away.\n\n' + NL }
  ];
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var now = new Date();
  var todayKey = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');
  function gcal(e) {
    var d = e.date.replace(/-/g, ''); var n = new Date(+e.date.slice(0, 4), +e.date.slice(5, 7) - 1, +e.date.slice(8, 10) + 1);
    var d2 = n.getFullYear() + String(n.getMonth() + 1).padStart(2, '0') + String(n.getDate()).padStart(2, '0');
    return 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=' + encodeURIComponent(e.title) + '&dates=' + d + '/' + d2 + '&details=' + encodeURIComponent((e.time ? 'Time: ' + e.time + '\n' : '') + 'https://nneighbor.org/events.html') + (e.location ? '&location=' + encodeURIComponent(e.location) : '');
  }
  var cal = { y: now.getFullYear(), m: now.getMonth(), f: 'all' };
  var key = function (y, m) { return y + '-' + String(m + 1).padStart(2, '0'); };
  var areasOf = function (e) { return [].concat(e.area); };
  var pass = function (e) { return cal.f === 'all' || areasOf(e).indexOf(cal.f) >= 0; };
  var sortKey = function (e) { return e.date.length === 7 ? e.date + '-99' : e.date; };

  var filters = $('#cal-filters');
  if (filters) {
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
        if (id === 'tba') d = ym < cur ? { id: id, dow: 'During', num: MONTHS[cal.m].slice(0, 3), events: [] } : { id: id, dow: 'Date', num: 'TBA', events: [] };
        else { var dt = new Date(+id.slice(0, 4), +id.slice(5, 7) - 1, +id.slice(8, 10)); d = { id: id, dow: DOW[dt.getDay()], num: dt.getDate(), events: [] }; }
        days.push(d);
      }
      d.events.push(e);
    });
    var out = $('#cal-list');
    if (!days.length) {
      var later = EVENTS.filter(function (e) { return pass(e) && e.date.slice(0, 7) > ym; }).sort(function (a, b) { return sortKey(a) < sortKey(b) ? -1 : 1; })[0];
      if (ym < cur) {
        out.innerHTML = later ? '<div style="margin-top:32px"><button type="button" class="btn btn-gold" id="cal-jump" style="font-size:12px;padding:13px 20px">Next listed event · ' + MONTHS[+later.date.slice(5, 7) - 1] + ' ' + later.date.slice(0, 4) + ' →</button></div>' : '';
        if (later) $('#cal-jump').addEventListener('click', function () { cal.y = +later.date.slice(0, 4); cal.m = +later.date.slice(5, 7) - 1; renderCal(); });
        return;
      }
      out.innerHTML = '<div class="cardw stack g18" style="margin-top:24px;padding:clamp(32px,4vw,56px);align-items:flex-start"><span class="mono" style="font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:#6B7380">No events listed</span><p class="serif" style="margin:0;font-size:clamp(24px,2.6vw,34px);line-height:1.2">' + 'Nothing on the calendar for ' + MONTHS[cal.m] + ' ' + cal.y + ' yet.' + '</p>' +
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
            (e.image ? '<img src="' + esc(e.image) + '" alt="' + esc(e.imageAlt || e.title) + '" loading="lazy" style="display:block;width:100%;max-width:640px;height:auto;border-radius:4px">' : '') + (e.note ? '<p class="body" style="max-width:640px;white-space:pre-line">' + esc(e.note) + '</p>' : '') +
            (e.speaker ? '<div style="max-width:640px;border-left:3px solid #FECD43;padding:4px 0 4px 18px"><span class="mono" style="display:block;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#004AAD;margin-bottom:6px">About the speaker</span><p style="margin:0 0 8px;font-size:18px;color:#033366"><strong>' + esc(e.speaker.name) + '</strong> | ' + esc(e.speaker.role) + '</p><p class="body" style="margin:0;white-space:pre-line">' + esc(e.speaker.bio) + '</p></div>' : '') +
            '<div style="display:flex;gap:10px 22px;flex-wrap:wrap">' + (e.link ? (/^https?:/.test(e.link) ? '<a class="link" href="' + esc(e.link) + '" target="_blank" rel="noopener">' + esc(e.linkText || 'Details') + ' ↗</a>' : '<a class="link" href="' + esc(e.link) + '">' + esc(e.linkText || 'Details') + ' →</a>') : '') + (e.date.length === 10 && e.date >= todayKey ? '<a class="link" href="' + gcal(e) + '" target="_blank" rel="noopener">Add to Google Calendar ↗</a>' : '') + (e.date.length === 7 && e.date >= todayKey.slice(0, 7) ? '<a class="link" href="#newsletter" data-notify="' + esc(e.title) + '">Notify me when the date is set →</a>' : '') + '</div></article>';
        }).join('') + '</div></div>';
    }).join('');
  }
  renderCal();
  }

  /* ---------- Contact topics (Get Involved) ---------- */
  var topic = 'partner';
  var TOPIC_LABEL = { volunteer: 'Volunteer', partner: 'Partnership', community: 'Bring NNI to my community', support: 'Support NNI' };
  function setTopic(t) {
    topic = t;
    $$('#topics [data-topic]').forEach(function (b) { var on = b.getAttribute('data-topic') === t; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); });
  }
  if ($('#topics')) {
    $$('[data-topic]').forEach(function (b) {
      b.addEventListener('click', function () {
        setTopic(b.getAttribute('data-topic'));
        if (!b.closest('#topics')) $('#contact').scrollIntoView({ behavior: 'smooth' });
      });
    });
    setTopic('partner');
  }

  /* ---------- Forms: deliver to formEndpoint, or fall back to the visitor's email app ---------- */
  var CFG = window.NNI_CONFIG || {};
  var EMAIL = CFG.contactEmail || 'connect@nneighbor.org';
  $$('form.nni-form').forEach(function (form) {
    var note = form.querySelector('.form-note');
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (form._gotcha && form._gotcha.value) return;
      var kind = form.getAttribute('data-form') || 'Website form';
      if (form.id === 'contact-form') kind += ': ' + TOPIC_LABEL[topic];
      var data = {}; Array.prototype.forEach.call(form.elements, function (el) { if (el.name && el.name !== '_gotcha' && el.value) data[el.name] = el.value; });
      data._subject = 'nneighbor.org — ' + kind; data.form = kind;
      var btn = form.querySelector('[type=submit]');
      if (kind.indexOf('Newsletter') === 0 && CFG.mailchimpUrl) {
        // Mailchimp JSONP signup (works from a static site, no server needed)
        var u = CFG.mailchimpUrl.replace('/subscribe/post?', '/subscribe/post-json?').replace(/&amp;/g, '&');
        var q = u.split('?')[1] || '';
        var m = /(?:^|&)u=([^&]+)/.exec(q), i = /(?:^|&)id=([^&]+)/.exec(q);
        var cb = 'nniMc' + Date.now();
        var parts = ['EMAIL=' + encodeURIComponent(data.email || '')];
        if (data.name) parts.push('FNAME=' + encodeURIComponent(data.name));
        if (m && i) parts.push('b_' + m[1] + '_' + i[1] + '=');
        btn.disabled = true; if (note) note.textContent = 'Subscribing…';
        var tag = document.createElement('script');
        var done = function (msg) { btn.disabled = false; if (note) note.innerHTML = msg; try { delete window[cb]; } catch (x) { window[cb] = undefined; } tag.remove(); };
        window[cb] = function (r) {
          if (r && r.result === 'success') { form.reset(); done('Thank you — please check your inbox to confirm your subscription.'); }
          else { var msg = (r && r.msg ? String(r.msg).replace(/^\d+ - /, '') : ''); done(/already subscribed/i.test(msg) ? 'You’re already subscribed — thank you!' : 'Sorry, that didn’t work. ' + msg.replace(/<[^>]*>/g, '') + (CFG.newsletterPage ? ' You can also <a href="' + CFG.newsletterPage + '" target="_blank" rel="noopener">subscribe on our Mailchimp page ↗</a>.' : '')); }
        };
        tag.onerror = function () { done(CFG.newsletterPage ? 'Sorry, that didn’t go through. Please <a href="' + CFG.newsletterPage + '" target="_blank" rel="noopener">subscribe on our Mailchimp page ↗</a>.' : 'Sorry, that didn’t go through. Please email us at <a href="mailto:' + EMAIL + '">' + EMAIL + '</a>.'); };
        tag.src = u + '&' + parts.join('&') + '&c=' + cb;
        document.body.appendChild(tag);
        return;
      }
      if (CFG.formEndpoint) {
        btn.disabled = true; if (note) note.textContent = 'Sending…';
        fetch(CFG.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(data) })
          .then(function (r) { if (!r.ok) throw new Error(r.status); form.reset(); if (note) note.textContent = kind.indexOf('Newsletter') === 0 ? 'Thank you — you’re subscribed.' : 'Thank you. We received your message and will be in touch.'; })
          .catch(function () { if (note) note.innerHTML = 'Sorry, that didn’t send. Please email us at <a href="mailto:' + EMAIL + '">' + EMAIL + '</a>.'; })
          .then(function () { btn.disabled = false; });
      } else {
        var body = Object.keys(data).filter(function (k) { return k.charAt(0) !== '_' && k !== 'form'; }).map(function (k) { return k.replace(/_/g, ' ') + ': ' + data[k]; }).join('\n');
        location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(data._subject) + '&body=' + encodeURIComponent(body);
        if (note) note.innerHTML = 'Your email app should open with this message. If it doesn’t, email us at <a href="mailto:' + EMAIL + '">' + EMAIL + '</a>.';
      }
    });
  });

  /* ---------- Donate buttons ---------- */
  $$('[data-donate]').forEach(function (a) {
    if (CFG.donateUrl) { a.href = CFG.donateUrl; a.target = '_blank'; a.rel = 'noopener'; }
  });
  $$('[data-donate-pending]').forEach(function (el) { el.hidden = !!CFG.donateUrl; });

  /* ---------- Phone menu ---------- */
  var toggle = $('.menu-toggle'), nav = $('nav.main');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
      toggle.textContent = open ? 'Close' : 'Menu';
    });
  }

  /* ---------- Old #page links → new page addresses ---------- */
  var OLD = { home: 'index.html', about: 'about.html', work: 'our-work.html', civic: 'civic-policy.html', priorities: 'community-priorities.html', leadership: 'leadership-youth.html', economic: 'economic-opportunity.html', culture: 'culture-community.html', impact: 'impact.html', news: 'news.html', calendar: 'events.html', involved: 'get-involved.html' };
  var h = location.hash.slice(1);
  if (document.body.getAttribute('data-page') === 'home' && OLD[h]) location.replace(OLD[h]);
})();

// "Notify me" on Date TBA events -> newsletter signup
document.addEventListener('click', function (ev) {
  var a = ev.target.closest && ev.target.closest('[data-notify]');
  if (!a) return;
  var sec = document.getElementById('newsletter'); if (!sec) return;
  ev.preventDefault();
  sec.scrollIntoView({ behavior: 'smooth', block: 'center' });
  var note = sec.querySelector('.form-note'), email = sec.querySelector('input[type=email]');
  if (note) note.textContent = 'Subscribe and we’ll email you when the date for “' + a.getAttribute('data-notify') + '” is confirmed.';
  if (email) setTimeout(function () { email.focus({ preventScroll: true }); }, 500);
});
