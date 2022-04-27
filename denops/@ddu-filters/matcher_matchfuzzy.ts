import {
  BaseFilter,
  DduItem,
  ItemHighlight,
} from "https://deno.land/x/ddu_vim@v1.5.0/types.ts";
import { Denops } from "https://deno.land/x/denops_std@v3.3.0/mod.ts";

type Params = {
  highlightMatched: string;
  limit: number;
  matchseq?: boolean;
};

export class Filter extends BaseFilter<Params> {
  async filter(args: {
    denops: Denops;
    input: string;
    items: DduItem[];
    filterParams: Params;
  }): Promise<DduItem[]> {
    if (args.input.length === 0) {
      return args.items;
    }

    if (!args.filterParams.matchseq) {
      delete args.filterParams.matchseq;
    }

    if (!args.filterParams.highlightMatched) {
      return args.denops.call("matchfuzzy", args.items, args.input, {
        ...args.filterParams,
        key: "word",
      }) as Promise<DduItem[]>;
    }

    const result = await args.denops.call(
      "matchfuzzypos",
      args.items,
      args.input,
      {
        ...args.filterParams,
        key: "word",
      },
    ) as unknown[][];
    const items = result[0] as DduItem[];
    const positions = result[1] as number[][];

    return items.map((item, index) => {
      let hlOffset = 0;
      if (item.display) {
        hlOffset = item.display.indexOf(item.word);
        if (hlOffset < 0) hlOffset = 0;
      }

      const highlights: ItemHighlight[] = item.highlights ?? [];
      for (const position of positions[index]) {
        highlights.push({
          name: "matched",
          hl_group: args.filterParams.highlightMatched,
          col: position + hlOffset + 1,
          width: 1,
        });
      }
      return { ...item, highlights: highlights };
    });
  }

  params(): Params {
    return { highlightMatched: "", limit: 0 };
  }
}
