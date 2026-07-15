from typing import Dict, List


def calculate_seo_score(result: Dict):

    score = 0
    checks = []
    recommendations = []

    # -------------------------
    # Title
    # -------------------------
    if result["title"]:
        score += 20
        checks.append({
            "name": "Title Tag",
            "status": "PASS",
            "points": 20
        })
    else:
        checks.append({
            "name": "Title Tag",
            "status": "FAIL",
            "points": 0
        })
        recommendations.append("Add a meaningful Title Tag.")

    # -------------------------
    # Meta Description
    # -------------------------
    if result["description"]:
        score += 10
        checks.append({
            "name": "Meta Description",
            "status": "PASS",
            "points": 10
        })
    else:
        checks.append({
            "name": "Meta Description",
            "status": "FAIL",
            "points": 0
        })
        recommendations.append("Add a Meta Description.")

    # -------------------------
    # H1 Tag
    # -------------------------
    if result["h1_count"] == 1:
        score += 20
        checks.append({
            "name": "H1 Tag",
            "status": "PASS",
            "points": 20
        })
    elif result["h1_count"] > 1:
        score += 10
        checks.append({
            "name": "H1 Tag",
            "status": "WARNING",
            "points": 10
        })
        recommendations.append(
            "Use only one H1 tag for better SEO."
        )
    else:
        checks.append({
            "name": "H1 Tag",
            "status": "FAIL",
            "points": 0
        })
        recommendations.append(
            "Add a single H1 heading."
        )

    # -------------------------
    # Image ALT
    # -------------------------
    if result["images_missing_alt"] == 0:
        score += 10
        checks.append({
            "name": "Image ALT",
            "status": "PASS",
            "points": 10
        })
    elif result["images_with_alt"] > 0:
        score += 5
        checks.append({
            "name": "Image ALT",
            "status": "WARNING",
            "points": 5
        })
        recommendations.append(
            f"Add ALT text to {result['images_missing_alt']} image(s)."
        )
    else:
        checks.append({
            "name": "Image ALT",
            "status": "FAIL",
            "points": 0
        })
        recommendations.append(
            "Add ALT text to all images."
        )

    # -------------------------
    # Canonical URL
    # -------------------------
    if result["canonical"]:
        score += 10
        checks.append({
            "name": "Canonical URL",
            "status": "PASS",
            "points": 10
        })
    else:
        checks.append({
            "name": "Canonical URL",
            "status": "FAIL",
            "points": 0
        })
        recommendations.append(
            "Add a Canonical URL."
        )

    # -------------------------
    # Robots
    # -------------------------
    if result["robots"]:
        score += 10
        checks.append({
            "name": "Robots Meta",
            "status": "PASS",
            "points": 10
        })
    else:
        checks.append({
            "name": "Robots Meta",
            "status": "WARNING",
            "points": 0
        })
        recommendations.append(
            "Add a robots meta tag."
        )

    # -------------------------
    # Open Graph
    # -------------------------
    if result["og_title"]:
        score += 10
        checks.append({
            "name": "Open Graph",
            "status": "PASS",
            "points": 10
        })
    else:
        checks.append({
            "name": "Open Graph",
            "status": "WARNING",
            "points": 0
        })
        recommendations.append(
            "Add Open Graph tags for social sharing."
        )

    # -------------------------
    # Twitter Card
    # -------------------------
    if result["twitter_card"]:
        score += 10
        checks.append({
            "name": "Twitter Card",
            "status": "PASS",
            "points": 10
        })
    else:
        checks.append({
            "name": "Twitter Card",
            "status": "WARNING",
            "points": 0
        })
        recommendations.append(
            "Add Twitter Card meta tags."
        )

    # -------------------------
    # Final Recommendation
    # -------------------------
    if len(recommendations) == 0:
        recommendations.append(
            "Excellent SEO! No major issues detected."
        )

    return {
        "seo_score": score,
        "checks": checks,
        "recommendations": recommendations,
    }