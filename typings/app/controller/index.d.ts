// This file is created by egg-ts-helper@1.29.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportDomain from '../../../app/controller/domain';
import ExportHome from '../../../app/controller/home';

declare module 'egg' {
  interface IController {
    domain: ExportDomain;
    home: ExportHome;
  }
}
