import { LazyExoticComponent } from "react";

export interface IAppRoute {
  path: string;
  protected?: boolean;
  element: LazyExoticComponent<() => JSX.Element> | (() => JSX.Element);
}
