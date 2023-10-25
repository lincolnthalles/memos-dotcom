import fs from "fs";
import Link from "next/link";
import path from "path";
import { getBlogSlugList } from "@/lib/content";
import { markdoc } from "@/markdoc/markdoc";
import { getMetadata } from "@/utils/metadata";

const Page = () => {
  const frontmatters = getBlogFrontmatters();

  return (
    <>
      <div className="w-full max-w-3xl flex flex-col justify-center items-center sm:px-16">
        <h2 className="w-full text-2xl sm:text-4xl font-medium sm:font-bold mt-4">Blogs</h2>
        <h3 className="w-full mt-2 mb-6">Learn more and better about memos.</h3>
        <div className="w-full flex flex-col justify-start items-start">
          {frontmatters.map((frontmatter) => {
            return (
              <Link
                key={frontmatter.slug}
                className="group border-b py-4 w-full flex flex-col justify-start items-start last:border-none"
                href={`/blog/${frontmatter.slug}`}
              >
                {frontmatter.feature_image && (
                  <div className="mb-4">
                    <img className="rounded-lg" src={frontmatter.feature_image} alt="" />
                  </div>
                )}
                <p className="text-lg !leading-tight sm:text-xl line-clamp-2 group-hover:text-blue-600">{frontmatter.title}</p>
                {frontmatter.description && <p className="mt-2 text-sm text-gray-500 line-clamp-2">{frontmatter.description}</p>}
                <div className="mt-2 w-full flex flex-row justify-start items-center">
                  <span className="text-sm text-gray-400">{frontmatter.published_at}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export const metadata = getMetadata({ title: "Blogs - memos", pathname: "/blog" });

const getBlogFrontmatters = () => {
  const blogSlugs = getBlogSlugList();
  const frontmatters = blogSlugs
    .map((slug) => {
      const filePath = path.resolve(`./content/blog/${slug}.md`);
      const content = fs.readFileSync(filePath, "utf8");
      const { frontmatter } = markdoc(content);
      return {
        ...frontmatter,
        slug: slug,
      };
    })
    .sort((a, b) => {
      return new Date(a.published_at) > new Date(b.published_at) ? -1 : 1;
    });
  return frontmatters;
};

export default Page;