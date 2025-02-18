import chromium from "chrome-aws-lambda";
import puppeteer from "puppeteer-core";
import { promises as fsPromises } from "fs";
import { resolve } from "path";
import { getSocialPosts, PreviewPost } from "./social-previews/get-posts";
import {
  heightWidth,
  renderPostPreviewToString,
} from "./shared-post-preview-png";

let browser: puppeteer.Browser;
let page: puppeteer.Page;

const createPostSocialPreviewPng = async (post: PreviewPost) => {
  if (!browser) {
    browser = await chromium.puppeteer.launch({
      args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
    });
    page = await browser.newPage();
    await page.setViewport(heightWidth);
  }

  await page.setContent(await renderPostPreviewToString(post));
  const screenShotBuffer = await page.screenshot();
  return screenShotBuffer;
};

// For non-prod builds, this isn't needed
if (!process.env.BUILD_ENV || process.env.BUILD_ENV === "production") {
  const posts = getSocialPosts();

  /**
   * This is done synchronously, in order to prevent more than a single instance
   * of the browser from running at the same time.
   */
  let postPngs = [] as Array<{ png: Buffer; post: typeof posts[number] }>;
  for (let post of posts) {
    postPngs.push({
      post,
      // @ts-ignore
      png: await createPostSocialPreviewPng(post),
    });
  }

  // @ts-ignore
  await Promise.all(
    postPngs.map(async (postData) => {
      await fsPromises.writeFile(
        // Relative to root
        resolve(
          process.cwd(),
          `./public/${postData.post.slug}.twitter-preview.png`
        ),
        postData.png!
      );
    })
  );

  // @ts-ignore
  await browser!.close();
}
