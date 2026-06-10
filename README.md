# Auto Sitemap Generator

An automated backend service and crawler designed to systematically map web properties, respect `robots.txt` directives, and generate valid, SEO-compliant XML sitemaps using a Breadth-First Search (BFS) engine.

🟢 **Live Demo:** [Sitemap Generator](https://bayzed123.github.io/SitemapGenerator/)

---

## Features

* **BFS Crawler:** Traverses domains level-by-level to prioritize high-value pages.
* **`robots.txt` Compliance:** Automatically fetches and respects exclusion rules before crawling.
* **XML Generation:** Builds clean, standard-compliant `sitemap.xml` files ready for search engines.
* **In-Memory Tracking:** Efficient URL queue and visited-state management to prevent infinite loops.

---

## Installation Guidelines (For Developers)

To run this project locally or modify the backend crawler logic, follow these steps:

### Prerequisites
* [Node.js](https://nodejs.org/) (v14 or higher recommended)
* Git

### Setup

**1. Clone the repository**
```bash
git clone [https://github.com/bayzed123/SitemapGenerator.git](https://github.com/bayzed123/SitemapGenerator.git)
cd SitemapGenerator
```

**2. Install dependencies**
```bash
npm install
```

**3. Run the application**
```bash
# Execute the main crawler process
node backend/crawler.js
```

*(Note: Ensure you configure the target seed URL inside the crawler configuration before running).*

---

## Project Structure

```text
SitemapGenerator/
│
├── frontend/
│   ├── index.html
│   ├── app.js
│   ├── dashboard.js
│   ├── style.css
│
├── backend/
│   ├── crawler.js
│   ├── sitemap.js
│   ├── progress.js
│
├── output/
│   ├── links.json
│   ├── sitemap.xml
│   ├── progress.json
│
├── .github/
│   └── workflows/
│       └── crawler.yml
│
└── package.json
```
For a detailed breakdown of the architecture and scaling constraints, please check the [Project Wiki](https://github.com/bayzed123/SitemapGenerator/wiki).

---

## Developer / Author

Developed and maintained by **[Sayad Md Bayezid Hosan](http://www.sayadbayezid.com)**. 

---

## Support This Project

If you found this tool helpful for your SEO or development workflow, consider supporting its continued development!

[![Support](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfFv_YMJyR_L8Ni71R2mQiNNrAGY6kn4ZCK40OPdMwztq4Ub0ea-OMdLg&s)](https://buymeacoffee.com/bayezid)

[Buy me a coffee](https://buymeacoffee.com/bayezid)
