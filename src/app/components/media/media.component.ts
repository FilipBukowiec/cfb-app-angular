import { Component } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  getDocs,
} from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';


interface FileData {
  id: string;
  name: string;
  url: string
}


@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
  standalone: true, // Oznacz komponent jako standalone
})
export class MediaComponent {
  files$: Observable<FileData[]>;

  constructor(private firestore: Firestore) {
    this.files$ = this.getFiles();
  }

  async getFiles() {
    const filesCollection = collection(this.firestore, 'files');
    const fileSnapshot = await getDocs(filesCollection);
    return fileSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  async addFile(fileData: any) {
    const filesCollection = collection(this.firestore, 'files');
    await addDoc(filesCollection, fileData);
  }
}
