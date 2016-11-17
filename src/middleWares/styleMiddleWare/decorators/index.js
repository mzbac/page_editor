import findLinkEntities from './LinkStrategy';
import Link from './Link';
import InlineKatexStrategy from './InlineKatexStrategy';
import InlineKatex from './InlineKatex';
import EditingInlineKatex from './EditingInlineKatex';

export default [
  {
    strategy: findLinkEntities,
    component: Link,
  },
  {
    strategy: InlineKatexStrategy,
    component: InlineKatex,
  },
];

export const inlineKatexOnEditorDecorator = [
  {
    strategy: findLinkEntities,
    component: Link,
  },
  {
    strategy: InlineKatexStrategy,
    component: EditingInlineKatex,
  },
];