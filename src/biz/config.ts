export interface BizConfig {
  routes?: Array<string>;
  apps: { [id: string] : any };
  server?: BizServerConfig;
}

export interface BizServerConfig {
  disableServerSideRender: boolean;
}