import { loadConfig } from 'graphql-config';
import { GraphQLSchema } from 'graphql';

export async function loadSchemaFromConfigDir(configDirPath: string): Promise<GraphQLSchema> {
  const config = await loadConfig({
    rootDir: configDirPath
  });
  const schema = config.getDefault().getSchema();
  return schema;
}
