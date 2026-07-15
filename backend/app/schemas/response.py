from pydantic import BaseModel
from typing import List


class SEOCheck(BaseModel):
    name: str
    status: str
    points: int


class SEOResponse(BaseModel):
    message: str

    title: str
    description: str
    keywords: str
    canonical: str
    robots: str
    language: str
    charset: str
    viewport: str

    h1_count: int
    h2_count: int
    h3_count: int
    h4_count: int
    h5_count: int
    h6_count: int

    h1_headings: List[str]
    h2_headings: List[str]

    total_images: int
    images_with_alt: int
    images_missing_alt: int
    alt_coverage: float

    total_links: int
    internal_links: int
    external_links: int
    email_links: int
    phone_links: int

    og_title: str
    og_description: str
    og_image: str
    og_url: str

    twitter_card: str
    twitter_title: str
    twitter_description: str

    screenshot: str

    seo_score: int
    checks: List[SEOCheck]

    recommendations: List[str]

    html_length: int