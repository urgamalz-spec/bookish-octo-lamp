const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;
const root = path.join(__dirname, 'public');
// Short caching so updates (same file names) show up quickly behind the CDN.
const cacheFor = (ext) => ['.html', '.js', '.css', '.json'].includes(ext) ? 'no-cache' : 'public, max-age=300';
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.ico': 'image/x-icon'
};

http.createServer((req, res) => {
  const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
  let file = path.normalize(path.join(root, urlPath));
  if (!file.startsWith(root)) { res.writeHead(403); return res.end('Forbidden'); }
  fs.stat(file, (err, st) => {
    if (!err && st.isDirectory()) { file = path.join(file, 'index.html'); st = null; err = null; }
    fs.stat(file, (e, info) => {
      let status = 200;
      if (e || !info.isFile()) {
        // Clean URLs: /about -> about.html ; unknown pages -> 404 page
        const html = file + '.html';
        if (!path.extname(file) && fs.existsSync(html)) { file = html; }
        else { file = path.join(root, '404.html'); status = 404; }
      }
      fs.stat(file, (e2, s2) => {
        if (e2) { res.writeHead(500); return res.end('Server error'); }
        const type = types[path.extname(file).toLowerCase()] || 'application/octet-stream';
        const size = s2.size;
        const range = req.headers.range;
        // Byte-range support so Safari / iPhone can play the videos.
        if (range && /^bytes=\d*-\d*$/.test(range)) {
          let [a, b] = range.replace('bytes=', '').split('-');
          let start = a === '' ? Math.max(0, size - Number(b)) : Number(a);
          let end = a !== '' && b !== '' ? Math.min(Number(b), size - 1) : size - 1;
          if (start > end || start >= size) {
            res.writeHead(416, { 'Content-Range': 'bytes */' + size });
            return res.end();
          }
          res.writeHead(206, { 'Cache-Control': cacheFor(path.extname(file).toLowerCase()), 'Content-Type': type, 'Content-Range': 'bytes ' + start + '-' + end + '/' + size, 'Accept-Ranges': 'bytes', 'Content-Length': end - start + 1 });
          return fs.createReadStream(file, { start, end }).pipe(res);
        }
        res.writeHead(status, { 'Cache-Control': cacheFor(path.extname(file).toLowerCase()), 'Content-Type': type, 'Content-Length': size, 'Accept-Ranges': 'bytes' });
        if (req.method === 'HEAD') return res.end();
        fs.createReadStream(file).pipe(res);
      });
    });
  });
}).listen(port, '0.0.0.0', () => console.log('NNI site running on port ' + port));
