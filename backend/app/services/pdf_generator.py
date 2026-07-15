from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Image,
)
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import inch
import os


def generate_pdf(result, screenshot_path):

    os.makedirs("reports", exist_ok=True)

    pdf_path = "reports/seo_report.pdf"

    doc = SimpleDocTemplate(pdf_path)

    styles = getSampleStyleSheet()

    elements = []

    elements.append(
        Paragraph("<b>SEO Analysis Report</b>", styles["Title"])
    )

    elements.append(Spacer(1, 0.3 * inch))

    if screenshot_path and os.path.exists(screenshot_path):

        img = Image(screenshot_path)

        img.drawWidth = 6 * inch
        img.drawHeight = 3.5 * inch

        elements.append(img)

        elements.append(Spacer(1, 0.3 * inch))

    elements.append(
        Paragraph(f"<b>Title:</b> {result['title']}", styles["BodyText"])
    )

    elements.append(
        Paragraph(f"<b>Description:</b> {result['description']}", styles["BodyText"])
    )

    elements.append(
        Paragraph(f"<b>Keywords:</b> {result['keywords']}", styles["BodyText"])
    )

    elements.append(
        Paragraph(f"<b>Total Images:</b> {result['total_images']}", styles["BodyText"])
    )

    elements.append(
        Paragraph(f"<b>Total Links:</b> {result['total_links']}", styles["BodyText"])
    )

    doc.build(elements)

    return pdf_path