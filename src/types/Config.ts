export default interface IConfig {
  file: {
    useSrcDir?: boolean;
    routes?: string;
    docs?: string;
  };
  docs: {
    enabled?: boolean;
    url?: string;
    exposeApiDocs?: boolean;
  };
}
