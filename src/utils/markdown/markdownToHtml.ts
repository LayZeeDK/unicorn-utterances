import remarkUnwrapImages from "remark-unwrap-images";
import remarkGfm from "remark-gfm";
import rehypeImageSize from "rehype-img-size";
import remarkEmbedder, { RemarkEmbedderOptions } from "@remark-embedder/core";
import oembedTransformer from "@remark-embedder/transformer-oembed";
import * as TwitchTransformer from "gatsby-remark-embedder/dist/transformers/Twitch";
import rehypeSlug from "rehype-slug-custom-id";
import { parent } from "constants/site-config";
import { rehypeHeaderText } from "./plugins/add-header-text";
import remarkTwoslash from "remark-shiki-twoslash";
import { UserConfigSettings } from "shiki-twoslash";
import { rehypeTabs, RehypeTabsProps } from "utils/markdown/plugins/tabs";

// TODO: Create types
import behead from "remark-behead";
import rehypeRaw from "rehype-raw";
import { unifiedChain } from "utils/markdown/unified-chain";

export default async function markdownToHtml(
  content: string,
  imgDirectory: string
) {
  // We mutate this object in plugins to add metadata from remark
  // rendering
  const renderData = {
    headingsWithId: [],
  };

  const result = await unifiedChain({
    remarkPlugins: [
      remarkGfm,
      // Remove complaining about "div cannot be in p element"
      remarkUnwrapImages,
      /* start remark plugins here */
      [behead, { depth: 1 }],
      [
        remarkEmbedder as any,
        {
          transformers: [oembedTransformer, [TwitchTransformer, { parent }]],
        } as RemarkEmbedderOptions,
      ],
      [
        remarkTwoslash,
        {
          themes: ["css-variables"],
        } as UserConfigSettings,
      ],
    ],
    rehypePlugins: [
      // This is required to handle unsafe HTML embedded into Markdown
      rehypeRaw,
      [
        rehypeImageSize as any,
        {
          dir: imgDirectory,
        },
      ],
      // Do not add the tabs before the slug. We rely on some of the heading
      // logic in order to do some of the subheading logic
      [
        rehypeSlug,
        {
          maintainCase: true,
          removeAccents: true,
          enableCustomId: true,
        },
      ],
      [
        rehypeTabs,
        {
          injectSubheaderProps: true,
          tabSlugifyProps: {
            enableCustomId: true,
          },
        } as RehypeTabsProps,
      ],
      [rehypeHeaderText(renderData)],
    ],
  }).process(content);

  return {
    html: result.toString(),
    headingsWithId: renderData.headingsWithId,
  };
}
