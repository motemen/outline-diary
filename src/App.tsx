import React, { useState } from "react";
import "./App.css";
import useSWR from "swr";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeReact from "rehype-react";
import { u } from "unist-builder";
import { Content } from "mdast";

function App() {
  const fetcher = (url: string) => fetch(url).then((r) => r.text());
  const { data, error } = useSWR("./motemen.md", fetcher);

  const [query, setQuery] = useState<string | undefined>("巨人の大海");

  const processor = unified()
    .use(remarkParse)
    .use(() => {
      return (tree) => {
        return u(
          "root",
          tree.children.flatMap((node): Content[] => {
            if (node.type !== "list") {
              return [node];
            }

            const mod = (node: Content) => {
              if ("children" in node) {
                node.children = node.children.flatMap((node): any[] => {
                  if (
                    query &&
                    node.type === "text" &&
                    node.value.includes(query)
                  ) {
                    const parts = node.value
                      .split(query)
                      .map((p) => u("text", p));
                    return parts.flatMap((p, i) => {
                      return i === 0
                        ? [p]
                        : [u("strong", [u("text", query)]), p];
                    });
                  }

                  mod(node);

                  return [node];
                });
              }
            };

            node.children.forEach(mod);

            return [node];
          })
        );
      };
    })
    .use(remarkRehype)
    .use(rehypeReact, { createElement: React.createElement });

  const content = processor.processSync(data).result;

  if (error) {
    return <div className="error">ERROR: {error}</div>;
  }
  if (!data) {
    return <div className="loading"></div>;
  }

  return (
    <main>
      <input
        onChange={(ev) => {
          setQuery(ev.target.value);
        }}
        value={query}
      ></input>
      <div>{content}</div>
    </main>
  );
}

export default App;
