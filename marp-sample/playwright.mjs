import { chromium } from 'playwright';
import fs from 'fs/promises';

async function convertHtmlFileToPdf(htmlFilePath, outputPdfPath) {
    const browser = await chromium.launchPersistentContext("./.playwright", { channel: 'chromium', headless: false });

    const page = await browser.newPage();

    page.on('console', async msg => {
        if (msg.type() === 'error') {
            for (const arg of msg.args()) {
                const errorMessage = await arg.evaluate(err => {
                    if (err instanceof Error) {
                        return { message: err.message, stack: err.stack };
                    }
                    return { message: String(err) };
                });
                console.error('PAGE ERROR:', errorMessage);
            }
        } else {
            const args = await Promise.all(msg.args().map(async (arg) => {
                const jsonValue = await arg.jsonValue();
                try {
                    return JSON.stringify(jsonValue, null, 2);
                } catch (e) {
                    return jsonValue;
                }
            }));
            console.log('PAGE LOG:', args.length === 0 ? msg.text() : args.length === 1 ? args[0] : [...args]);
        }
    });

    const htmlContent = await fs.readFile(htmlFilePath, 'utf8');
    await page.setContent(htmlContent, { timeout: 120000, waitUntil: 'networkidle' });

    await page.pdf({
        // format: 'A4', 
        path: outputPdfPath, width: '1280px', height: '720px', printBackground: true, displayHeaderFooter: false, margin: { top: '0mm', right: '0mm', bottom: '0mm', left: '0mm' }
    });
    await browser.close();
}

const htmlFilePath = './dist/sample.html';
const outputPdfPath = './dist/sample_playweigth.pdf';
convertHtmlFileToPdf(htmlFilePath, outputPdfPath);
