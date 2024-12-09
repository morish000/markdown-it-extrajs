import puppeteer from 'puppeteer';
import fs from 'fs/promises';

async function convertHtmlFileToPdf(htmlFilePath, outputPdfPath) {
    const browser = await puppeteer.launch({
        executablePath: '/snap/bin/chromium',
        args: ['--no-sandbox']
    });
    
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

    // HTMLファイルを読み込み
    const htmlContent = await fs.readFile(htmlFilePath, 'utf8');
    await page.setContent(htmlContent, { timeout: 60000, waitUntil: ['load', 'networkidle0'] });
    
    // PDFとして保存
    await page.pdf({ path: outputPdfPath, format: 'A4' });
    await browser.close();
}

const htmlFilePath = './dist/sample.html';
const outputPdfPath = './dist/sample_debug.pdf';
convertHtmlFileToPdf(htmlFilePath, outputPdfPath);
