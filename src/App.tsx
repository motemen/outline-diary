import React, { useState } from "react";
import "./App.css";
import useSWR from "swr/immutable";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import remarkRehype from "remark-rehype";
import rehypeReact from "rehype-react";
import { u } from "unist-builder";
import { Content, Root } from "mdast";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material";
import { load as loadYAML } from "js-yaml";
import { Helmet } from "react-helmet";
import { useHash } from "react-use";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const transformHighlightQuery = (query: string | undefined) => (tree: Root) => {
  if (!query) {
    return tree;
  }

  return {
    ...tree,
    children: tree.children.flatMap((node): Content[] => {
      if (node.type !== "list") {
        return [node];
      }

      const highlightQuery = (node: Content): boolean => {
        if (!("children" in node)) {
          return false;
        }

        let found = false;
        node.children = node.children.flatMap((node): any[] => {
          if (node.type === "text" && node.value.includes(query)) {
            found = true;
            return node.value
              .split(query)
              .map((p) => u("text", p))
              .flatMap((p, i) =>
                i === 0 ? [p] : [u("strong", [u("text", query)]), p]
              );
          }

          if (highlightQuery(node)) {
            found = true;
          }

          return [node];
        });

        return found;
      };

      node.children = node.children.flatMap((node) => {
        return highlightQuery(node) ? [node] : [];
      });

      return [node];
    }),
  };
};

function App() {
  const fetcher = (url: string) => fetch(url).then((r) => r.text());
  const { data, error } = useSWR("./motemen.md", fetcher);

  const [hash, setHash] = useHash();
  console.log(hash);
  const [query, setQuery_] = useState<string | undefined>(
    decodeURIComponent(hash.replace(/^#/, ""))
  );

  const setQuery = (query: string) => {
    setQuery_(query);
    setHash(query);
  };

  let keywords: string[] = [];
  let title: string = "";
  const processor = unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(() => (tree) => {
      if (tree.children.length > 1 && tree.children[0].type === "yaml") {
        try {
          const y = loadYAML(tree.children[0].value) as any;
          keywords = y["keywords"] as string[];
          title = y["title"];
        } catch (e) {
          console.error(e);
        }
      }
    })
    .use(transformHighlightQuery, query)
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
    <ThemeProvider theme={darkTheme}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <nav>
        <Autocomplete
          options={keywords}
          blurOnSelect
          selectOnFocus
          onInputChange={(event, newInputValue) => {
            setQuery(newInputValue);
          }}
          defaultValue={query}
          freeSolo={true}
          renderInput={(params) => (
            <TextField placeholder="Filter…" {...params} variant="standard" />
          )}
        ></Autocomplete>
      </nav>
      <main>
        <div>{content}</div>
      </main>
    </ThemeProvider>
  );
}

export default App;
