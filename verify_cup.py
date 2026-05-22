import asyncio
from playwright.async_api import async_playwright

async def verify():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(viewport={'width': 375, 'height': 812})
        page = await context.new_page()

        print("Navigating to local server...")
        await page.goto("http://localhost:4173")
        await page.wait_for_timeout(2000)

        # Click on ingredients link based on URL or href
        print("Navigating to Ingredients page...")
        await page.evaluate("() => { const link = Array.from(document.querySelectorAll('a')).find(a => a.href.includes('/ingredients')); if(link) link.click(); }")
        await page.wait_for_timeout(2000)

        # Look for the lucide-cup-soda element
        print("Looking for the CupSoda button on the ingredients page...")
        found = await page.evaluate('''() => {
            const svg = document.querySelector('svg.lucide-cup-soda');
            if (svg) {
                const btn = svg.closest('button');
                if (btn) {
                    btn.click();
                    return true;
                }
            }
            return false;
        }''')

        if found:
            print("Found and clicked the CupSoda button!")
            await page.wait_for_timeout(2000)
            print("Current URL:", page.url)

            # Save a screenshot to verify we are on the Smoothies page with the filter
            await page.screenshot(path="smoothies_cup_verification.png")
            print("Screenshot saved to smoothies_cup_verification.png")
        else:
            print("CupSoda button not found!")
            await page.screenshot(path="failed_cup_verification.png")

        await browser.close()

asyncio.run(verify())
