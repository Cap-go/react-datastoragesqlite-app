import { Plugins } from '@capacitor/core';
import * as PluginsLibrary from '@jeepq/capacitor';
const { CapacitorDataStorageSqlite, Device } = Plugins;

export class StoreService {
    _store = {};
    _isService = false;
    _platform = "";
  /**
   * Plugin Initialization
   */    
    async init() {
        const info = await Device.getInfo();
        this._platform = info.platform;
        if (this._platform === "ios" || this._platform === "android") {
          this._store = CapacitorDataStorageSqlite;
        } else {
          this._store = PluginsLibrary.CapacitorDataStorageSqlite;
        }
        this._isService = true;
        return;
    }
    isService() {
        return this._isService;
    }
    platform() {
        return this._platform;
    }
    /**
     * Open a Database
     * @param database string optional
     * @param table string optional
     * @param encrypted boolean optional 
     * @param mode string optional
     */  
    async openStore(options){      
        if(this._isService) {
            const database = options.database || "storage";
            const table = options.table || "storage_table";
            const encrypted = options.encrypted || false;
            const mode = options.mode || "no-encryption";
            const {result} = await this._store.openStore({database,table,encrypted,mode});
            return result;
        } else {
            return Promise.resolve(false);
        }
    }
    /**
     * Create/Set a Table
     * @param table string
     */  
    async setTable(table) {
        if(this.isService) {
            const {result,message} = await this._store.setTable({table});
            return Promise.resolve([result,message]);
        } else {
            return Promise.resolve({result:false, message:"Service is not initialized"});
        }
    }
    /**
     * Set of Key
     * @param key string 
     * @param value string
     */
    async setItem(key,value) {
        console.log('key ', key)
        console.log('value ', value)
        if(this.isService && key.length > 0) {
            await this._store.set({ key, value });
        }
    }
    /**
     * Get the Value for a given Key
     * @param key string 
     */
    async getItem(key) {
        if(this.isService && key.length > 0) {
            const {value} = await this._store.get({ key });
            console.log("in getItem value ",value)
            return value;
        } else {
            return null;
        }

    }
    async isKey(key) {
        if(this.isService && key.length > 0) {
            const {result} = await this._store.iskey({ key });
            return result;
        } else {
            return null;
        }

    }
    async getAllKeys() {
        if(this.isService ) {
            const {keys} = await this._store.keys();
            return keys;
        } else {
            return null;
        }
    }
    async getAllValues() {
        if(this.isService ) {
            const {values} = await this._store.values();
            return values;
        } else {
            return null;
        }
    }
    async getAllKeysValues() {
        if(this.isService ) {
            const {keysvalues} = await this._store.keysvalues();
            return keysvalues;
        } else {
            return null;
        }
    }
    
    async removeItem(key) {
        if(this.isService && key.length > 0) {
            const {result} = await this._store.remove({ key });
            return result;
        } else {
            return null;
        }
    }
    async clear() {
        if(this.isService ) {
            const {result} = await this._store.clear();
            return result;
        } else {
            return null;
        }
    }
    async deleteStore(options) {
        const database = options.database || "storage";
        await this.init();
        if(this.isService ) {
            const {result} = await this._store.deleteStore({database});
            return result;
        }
        return null;
    }
    
}
