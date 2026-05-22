import asyncio
from playwright.async_api import async_playwright

async def verify():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(viewport={'width': 375, 'height': 812})
        page = await context.new_page()

        await page.goto("http://localhost:4173/ingredients")
        await page.wait_for_timeout(2000)

        # Click on the CupSoda icon that has text-white (the one in the cards)
        found = await page.evaluate('''() => {
            const svg = document.querySelector('svg.text-white.lucide-cup-soda');
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
            print("Found and clicked the card CupSoda button!")
            await page.wait_for_timeout(2000)
            print("Current URL:", page.url)
            await page.screenshot(path="smoothies_from_card_verification.png")
            print("Screenshot saved to smoothies_from_card_verification.png")
        else:
            print("Card CupSoda button not found!")

        await browser.close()

asyncio.run(verify())
