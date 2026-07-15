import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse, urljoin


def get_meta_property(soup, prop):
    tag = soup.find("meta", attrs={"property": prop})
    if tag:
        return tag.get("content", "").strip()
    return ""


def get_meta_name(soup, name):
    tag = soup.find("meta", attrs={"name": name})
    if tag:
        return tag.get("content", "").strip()
    return ""


def fetch_website(url: str):

    response = requests.get(
        url,
        timeout=15,
        headers={"User-Agent": "Mozilla/5.0"}
    )

    soup = BeautifulSoup(response.text, "lxml")

    # -----------------------
    # Basic SEO
    # -----------------------

    title = soup.title.string.strip() if soup.title and soup.title.string else ""

    description = get_meta_name(soup, "description")
    keywords = get_meta_name(soup, "keywords")
    robots = get_meta_name(soup, "robots")
    viewport = get_meta_name(soup, "viewport")

    canonical = ""
    canonical_tag = soup.find("link", rel="canonical")
    if canonical_tag:
        canonical = canonical_tag.get("href", "").strip()

    language = ""
    html_tag = soup.find("html")
    if html_tag:
        language = html_tag.get("lang", "").strip()

    charset = ""
    charset_tag = soup.find("meta", charset=True)
    if charset_tag:
        charset = charset_tag.get("charset", "").strip()

    # -----------------------
    # Headings
    # -----------------------

    h1_tags = soup.find_all("h1")
    h2_tags = soup.find_all("h2")
    h3_tags = soup.find_all("h3")
    h4_tags = soup.find_all("h4")
    h5_tags = soup.find_all("h5")
    h6_tags = soup.find_all("h6")

    h1_headings = [h.get_text(strip=True) for h in h1_tags]
    h2_headings = [h.get_text(strip=True) for h in h2_tags]

    # -----------------------
    # Images
    # -----------------------

    images = soup.find_all("img")

    total_images = len(images)
    images_with_alt = 0

    for image in images:
        alt = image.get("alt")
        if alt and alt.strip():
            images_with_alt += 1

    images_missing_alt = total_images - images_with_alt

    alt_coverage = (
        round(images_with_alt / total_images * 100, 2)
        if total_images > 0 else 0
    )

    # -----------------------
    # Links
    # -----------------------

    parsed = urlparse(url)

    domain = parsed.netloc

    total_links = 0
    internal_links = 0
    external_links = 0
    email_links = 0
    phone_links = 0

    for a in soup.find_all("a", href=True):

        href = a["href"].strip()

        total_links += 1

        if href.startswith("mailto:"):
            email_links += 1
            continue

        if href.startswith("tel:"):
            phone_links += 1
            continue

        absolute = urljoin(url, href)

        if urlparse(absolute).netloc == domain:
            internal_links += 1
        else:
            external_links += 1

    # -----------------------
    # Open Graph
    # -----------------------

    og_title = get_meta_property(soup, "og:title")
    og_description = get_meta_property(soup, "og:description")
    og_image = get_meta_property(soup, "og:image")
    og_url = get_meta_property(soup, "og:url")

    # -----------------------
    # Twitter Card
    # -----------------------

    twitter_card = get_meta_name(soup, "twitter:card")
    twitter_title = get_meta_name(soup, "twitter:title")
    twitter_description = get_meta_name(soup, "twitter:description")

    return {
        "title": title,
        "description": description,
        "keywords": keywords,
        "canonical": canonical,
        "robots": robots,
        "language": language,
        "charset": charset,
        "viewport": viewport,

        "h1_count": len(h1_tags),
        "h2_count": len(h2_tags),
        "h3_count": len(h3_tags),
        "h4_count": len(h4_tags),
        "h5_count": len(h5_tags),
        "h6_count": len(h6_tags),

        "h1_headings": h1_headings,
        "h2_headings": h2_headings,

        "total_images": total_images,
        "images_with_alt": images_with_alt,
        "images_missing_alt": images_missing_alt,
        "alt_coverage": alt_coverage,

        "total_links": total_links,
        "internal_links": internal_links,
        "external_links": external_links,
        "email_links": email_links,
        "phone_links": phone_links,

        "og_title": og_title,
        "og_description": og_description,
        "og_image": og_image,
        "og_url": og_url,

        "twitter_card": twitter_card,
        "twitter_title": twitter_title,
        "twitter_description": twitter_description,

        "html": response.text,
    }