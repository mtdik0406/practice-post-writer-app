import { defineDocumentType, makeSource } from 'contentlayer2/source-files';

export const Post = defineDocumentType(() => {
  return ({
    name: 'Post',
    filePathPattern: `blog/**/*.mdx`,
    contentType: 'mdx',
    fields: {
      title: { type: 'string', required: true },
      description: { type: 'string' },
      date: { type: 'date', required: true },
      published: { type: 'boolean', required: true },
      image: { type: 'string', required: true },
      authors: {
        // Reference types are not embedded.
        // Until this is fixed, we can use a simple list.
        // type: "reference",
        // of: Author,
        type: "list",
        of: { type: "string" },
        required: true,
      },
    },
    computedFields: {
      slug: {
        type: 'string',
        resolve: (doc) => `/${doc._raw.flattenedPath}`,
      },
      slugAsParams: {
        type: 'string',
        resolve: (doc) => doc._raw.flattenedPath.split('/').slice(1)[0],
      },
    },
  });
});

export default makeSource({ contentDirPath: './content', documentTypes: [Post] });
