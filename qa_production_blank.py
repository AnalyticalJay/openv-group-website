import json
import os
from playwright.sync_api import sync_playwright

CHROMIUM = "/usr/bin/chromium"
URLS = os.environ.get(
    "OPENV_QA_URLS",
    "https://www.openvgroup.com/,https://openvsite-fw27ucfq.manus.space/?code=9KT5LoMZizADZp9DnvGNh3",
).split(",")


def diagnose(page, url):
    console = []
    errors = []
    failures = []
    page.on("console", lambda message: console.append({"type": message.type, "text": message.text}))
    page.on("pageerror", lambda error: errors.append(str(error)))
    page.on("requestfailed", lambda request: failures.append({"url": request.url, "failure": request.failure}))

    response = page.goto(url, wait_until="domcontentloaded", timeout=45000)
    page.wait_for_timeout(7000)
    state = page.evaluate(
        """() => ({
          rootExists: Boolean(document.getElementById('root')),
          rootChildren: document.getElementById('root')?.childElementCount ?? -1,
          rootTextLength: document.getElementById('root')?.innerText.length ?? -1,
          bodyTextLength: document.body.innerText.length,
          scripts: Array.from(document.scripts).map(script => script.src || script.id || 'inline'),
          resources: performance.getEntriesByType('resource').map(entry => entry.name).filter(name => name.includes('/assets/')),
        })"""
    )
    return {
        "url": url,
        "status": response.status if response else None,
        "state": state,
        "page_errors": errors,
        "console": console,
        "request_failures": failures,
    }


with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True, executable_path=CHROMIUM, args=["--no-sandbox"])
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    results = [diagnose(page, url) for url in URLS]
    browser.close()
    print(json.dumps(results, indent=2))
