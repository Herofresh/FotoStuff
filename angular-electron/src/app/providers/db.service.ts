import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import uuid from 'uuid/v4';

@Injectable()
export class DBService {
  private _db: typeof PouchDB;

  constructor() {}

  public initDb = () => {
    this._db =  new PouchDB('mydb');
    console.log('DB Init');
  }

  public createItem = async item => {
    try {
      await this._db.put({ _id: uuid(), ...item });
    } catch (error) {
      console.error({ error });
    }
  }

  public getItem = async (id: string) => {
    try {
      const item = await this._db.get(id);
      return item;
    } catch (error) {
      console.error({ error });
    }
  }

  public updateItem = async (updateItem: any) => {
    try {
      await this._db.put(updateItem);
      const item = this._db.get(updateItem._id);
      return item;
    } catch (error) {
      console.error({ error });
    }
  }

  public deleteItem = async (id: string) => {
    try {
      const item = await this._db.get(id);
      this._db.remove(item);
      return item;
    } catch (error) {
      console.error({ error });
    }
  }

  public getAll = async () => {
    try {
      const allItems = await this._db.allDocs({
        include_docs: true,
        attachments: true
      });
      return allItems.rows.map(item => item.doc);
    } catch (error) {
      console.error({ error });
    }
  }

}

