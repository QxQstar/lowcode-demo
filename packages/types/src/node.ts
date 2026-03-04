export interface NodeAPI {
  readonly id: string;
  readonly componentName: string;
  get isContainer(): boolean;
}