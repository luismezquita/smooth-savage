import asyncio
from playwright.async_api import async_playwright

async def verify():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(viewport={'width': 375, 'height': 812})
        page = await context.new_page()

        await page.goto("http://localhost:4173/fruit/mango") # assuming mango exists
        await page.wait_for_timeout(2000)

        # Click on the CupSoda icon that has text-white (the one in the detail view)
        found = await page.evaluate('''() => {
            const svgs = document.querySelectorAll('svg.text-white');
            let clicked = false;
            svgs.forEach(svg => {
                if(svg.classList.contains('lucide-cup-soda') || svg.outerHTML.includes('cup-soda')) {
                    const btn = svg.closest('button');
                    if (btn) {
                        btn.click();
                        clicked = true;
                    }
                }
            });
            return clicked;
        }''')

        if found:
            print("Found and clicked the CupSoda button on /fruit/mango!")
            await page.wait_for_timeout(2000)
            print("Current URL:", page.url)
            await page.screenshot(path="smoothies_from_detail_verification.png")
            print("Screenshot saved to smoothies_from_detail_verification.png")
        else:
            print("CupSoda button not found on /fruit/mango!")
            await page.screenshot(path="failed_detail_cup_verification.png")

        await browser.close()

asyncio.run(verify())
