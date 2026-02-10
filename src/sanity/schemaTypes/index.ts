import { type SchemaTypeDefinition } from 'sanity';
import { blockContentType } from './components/blockContentType';
import { blockImageType } from './components/blockImageType';
import { vanType } from './vanType';
import { utilityPageType } from './utilityPageType';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, blockImageType, vanType, utilityPageType],
};
