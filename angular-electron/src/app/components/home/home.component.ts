import { Component, OnInit } from '@angular/core';
import { DBService } from './../../providers/db.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private db: DBService
  ) {}

  async ngOnInit() {}

  // Testshit to see if CRUD works
  async testCrud() {
    // Create
    await this.db.createItem({ name: 'Tuvix', race: 'Vulcan/Talaxian'});
    // Get All
    let items = await this.db.getAll();
    console.log({ items });
    const read = [];
    for (const item of items) {
      // Get one
      const readItem = await this.db.getItem(item._id);
      read.push(readItem);
      readItem.name = 'Tuvok';
      readItem.race = 'Vulcan';
      // Update
      await this.db.updateItem(readItem);
      items = await this.db.getAll();
      console.log({ items, read });
      // Delete
      await this.db.deleteItem(item._id);
    }
    items = await this.db.getAll();
    console.log({ items, read });
  }
}
