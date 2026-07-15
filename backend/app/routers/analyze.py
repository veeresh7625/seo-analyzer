from fastapi import APIRouter
from fastapi.responses import FileResponse
import os

from app.schemas.request import WebsiteRequest
from app.schemas.response import SEOResponse
from app.services.analyzer import fetch_website
from app.services.scoring import calculate_seo_score
from app.services.screenshot import capture_screenshot
from app.services.pdf_generator import generate_pdf

router = APIRouter()


@router.post("/analyze", response_model=SEOResponse)
def analyze_website(data: WebsiteRequest):

    # Fetch website data
    result = fetch_website(data.url)

    # Capture screenshot
    try:
        screenshot_path = capture_screenshot(data.url)
    except Exception as e:
        print("Screenshot failed:", e)
        screenshot_path = None

    # Screenshot URL
    screenshot_url = ""

    if screenshot_path:
        filename = os.path.basename(screenshot_path)
        screenshot_url = f"http://127.0.0.1:8000/screenshots/{filename}"

    # Calculate SEO score
    score_result = calculate_seo_score(result)

    print("score_result =", score_result)
    print("recommendations =", score_result.get("recommendations"))

    # Generate PDF
    generate_pdf(result, screenshot_path)

    return SEOResponse(
        message="Website analyzed successfully",

        screenshot=screenshot_url,

        title=result["title"],
        description=result["description"],
        keywords=result["keywords"],
        canonical=result["canonical"],
        robots=result["robots"],
        language=result["language"],
        charset=result["charset"],
        viewport=result["viewport"],

        h1_count=result["h1_count"],
        h2_count=result["h2_count"],
        h3_count=result["h3_count"],
        h4_count=result["h4_count"],
        h5_count=result["h5_count"],
        h6_count=result["h6_count"],

        h1_headings=result["h1_headings"],
        h2_headings=result["h2_headings"],

        total_images=result["total_images"],
        images_with_alt=result["images_with_alt"],
        images_missing_alt=result["images_missing_alt"],
        alt_coverage=result["alt_coverage"],

        total_links=result["total_links"],
        internal_links=result["internal_links"],
        external_links=result["external_links"],
        email_links=result["email_links"],
        phone_links=result["phone_links"],

        og_title=result["og_title"],
        og_description=result["og_description"],
        og_image=result["og_image"],
        og_url=result["og_url"],

        twitter_card=result["twitter_card"],
        twitter_title=result["twitter_title"],
        twitter_description=result["twitter_description"],

        seo_score=score_result["seo_score"],
        checks=score_result["checks"],
        recommendations=score_result["recommendations"],
        
        html_length=len(result["html"])
    )


@router.get("/download-pdf")
def download_pdf():

    pdf_path = os.path.join("reports", "seo_report.pdf")

    if not os.path.exists(pdf_path):
        return {"error": "PDF not generated yet. Analyze a website first."}

    return FileResponse(
        path=pdf_path,
        media_type="application/pdf",
        filename="SEO_Report.pdf",
    )