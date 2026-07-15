from playwright.sync_api import sync_playwright
import uuid
import os


def capture_screenshot(url: str):

    os.makedirs("screenshots", exist_ok=True)

    filename = f"{uuid.uuid4()}.png"
    path = os.path.join("screenshots", filename)

    try:
        with sync_playwright() as p:

            browser = p.chromium.launch(headless=True)

            page = browser.new_page(
                viewport={"width": 1440, "height": 900}
            )

            page.goto(
                url,
                wait_until="domcontentloaded",
                timeout=60000
            )

            page.screenshot(
                path=path,
                full_page=True
            )

            browser.close()

        return path

    except Exception as e:
        print("Screenshot Error:", e)
        return None