import { ISyncResult } from './iSyncResult';
export interface ICrudCount {
    create?: ISyncResult
    update?: ISyncResult
    disable?: ISyncResult
    delete?: ISyncResult
}