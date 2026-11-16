// Use this for plain links to files in /public (like your CV PDF),
// so they keep working on GitHub Pages: withBase("/cv.pdf").
// <Link> and imported images already handle the base path for you.
export function withBase(path) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${path}`;
}
