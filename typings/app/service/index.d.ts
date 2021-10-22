// This file is created by egg-ts-helper@1.29.1
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportDomain from '../../../app/service/domain';
import ExportUrl from '../../../app/service/url';

declare module 'egg' {
  interface IService {
    domain: AutoInstanceType<typeof ExportDomain>;
    url: AutoInstanceType<typeof ExportUrl>;
  }
}
