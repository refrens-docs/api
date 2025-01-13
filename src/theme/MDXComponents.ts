// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
import Tabs from '@theme-original/Tabs';
import TabItem from '@theme-original/TabItem';
import HttpMethod from '@site/src/components/HttpMethod';

export default {
  // Re-use the default mapping
  ...MDXComponents,
  // Map the "<Highlight>" tag to our Highlight component
  // `Highlight` will receive all props that were passed to `<Highlight>` in MDX
  Tabs,
  TabItem,
  HttpMethod,
};
