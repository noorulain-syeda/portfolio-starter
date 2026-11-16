// GitHub Pages serves your site from https://<username>.github.io/<repo-name>/
// so every link needs the "/<repo-name>" prefix. The deploy workflow sets
// NEXT_PUBLIC_BASE_PATH for you. Locally it is empty, so the site runs at "/".
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // build a static site into the "out" folder
  basePath,
  trailingSlash: true, // /projects/x -> /projects/x/index.html (works on GitHub Pages)
  images: {
    unoptimized: true, // GitHub Pages has no server to optimize images
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
