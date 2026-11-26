import gzip
import http.server
import socketserver
import os
from pathlib import Path

PORT = int(os.environ.get("PORT", "8080"))
GZIP_EXTS = {".html", ".js", ".json", ".webmanifest", ".css", ".svg"}


class MekanoHandler(http.server.SimpleHTTPRequestHandler):
    extensions_map = {
        **http.server.SimpleHTTPRequestHandler.extensions_map,
        ".webmanifest": "application/manifest+json; charset=utf-8",
        ".json": "application/json; charset=utf-8",
        ".js": "application/javascript; charset=utf-8",
        ".html": "text/html; charset=utf-8",
        ".svg": "image/svg+xml",
        ".webp": "image/webp",
        ".png": "image/png",
        ".jpg": "image/jpeg",
    }

    def end_headers(self):
        if self.path.startswith("/assets/"):
            self.send_header("Cache-Control", "public, max-age=31536000, immutable")
        else:
            self.send_header("Cache-Control", "no-cache")
        self.send_header("Service-Worker-Allowed", "/")
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("X-Frame-Options", "SAMEORIGIN")
        self.send_header("Referrer-Policy", "strict-origin-when-cross-origin")
        self.send_header("Permissions-Policy", "camera=(), microphone=(), geolocation=()")
        super().end_headers()

    def do_GET(self):
        raw_path = self.path.split("?", 1)[0]
        if raw_path == "/":
            raw_path = "/index.html"
        fp = Path(self.translate_path(raw_path))
        accept_gz = "gzip" in (self.headers.get("Accept-Encoding") or "")
        if accept_gz and fp.is_file() and fp.suffix.lower() in GZIP_EXTS:
            data = fp.read_bytes()
            gz = gzip.compress(data, compresslevel=6)
            self.send_response(200)
            self.send_header("Content-Type", self.guess_type(str(fp)))
            self.send_header("Content-Encoding", "gzip")
            self.send_header("Vary", "Accept-Encoding")
            self.send_header("Content-Length", str(len(gz)))
            self.end_headers()
            self.wfile.write(gz)
            return
        super().do_GET()


class ReusableTCPServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
    allow_reuse_address = True


if __name__ == "__main__":
    with ReusableTCPServer(("0.0.0.0", PORT), MekanoHandler) as httpd:
        print(f"MEKANO storefront listening on http://0.0.0.0:{PORT}", flush=True)
        httpd.serve_forever()
