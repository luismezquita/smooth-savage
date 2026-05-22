import asyncio
from playwright.async_api import async_playwright

async def verify():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(viewport={'width': 375, 'height': 812})
        page = await context.new_page()

        await page.goto("http://localhost:4173/ingredients")
        await page.wait_for_timeout(2000)

        # Output all SVGs to see what classes they have
        svgs = await page.evaluate('''() => {
            return Array.from(document.querySelectorAll('svg')).map(svg => svg.className.baseVal);
        }''')
        print("SVGs found:", svgs)

        # Screenshot the ingredients page
        await page.screenshot(path="ingredients_page_state.png")
        await browser.close()

asyncio.run(verify())
