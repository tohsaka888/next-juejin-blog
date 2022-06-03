import { NextPage } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { useRouter } from "next/router";
import React from "react";

const ArticleDetail: NextPage<{
  source: MDXRemoteSerializeResult<Record<string, unknown>>;
}> = ({ source }) => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      {id}
      <MDXRemote {...source} />
    </div>
  );
};

export async function getServerSideProps() {
  const source = `# h1 
   ## h2`;
  const mdxSource = await serialize(source);
  return { props: { source: mdxSource } };
}

export default ArticleDetail;
