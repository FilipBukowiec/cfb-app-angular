import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  Firestore, collection, collectionData, doc, updateDoc, addDoc, deleteDoc,
} from '@angular/fire/firestore';
import { getDownloadURL, ref, uploadBytes, getStorage } from '@angular/fire/storage';
import { inject } from '@angular/core';
import { Media } from '../../models/media.model';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatIconModule, CommonModule, FormsModule],
})
export class MediaComponent {
  firestore = inject(Firestore);
  storage = getStorage();

  files$: Observable<Media[]> = of([]);
  currentFiles: Media[] = [];
  newFile: Media = { id: '', name: '', url: '', order: 0 };
  selectedFile: File | null = null;

  constructor() {
    this.getFiles();
  }

  // Metoda wywoływana, gdy użytkownik wybiera plik
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  // Pobieranie plików z Firestore i aktualizacja bieżącej listy
  getFiles(): void {
    const filesCollection = collection(this.firestore, 'files');
    collectionData(filesCollection, { idField: 'id' }).subscribe((files: Media[]) => {
      this.currentFiles = files.sort((a, b) => a.order - b.order);
      this.files$ = of(this.currentFiles);
    });
  }

  // Dodawanie nowego pliku
  async addFile(): Promise<void> {
    if (this.selectedFile) {
      // Zwiększ order pozostałych plików o 1
      const updates = this.currentFiles.map((file) =>
        updateDoc(doc(this.firestore, 'files', file.id), { order: file.order + 1 })
      );
      await Promise.all(updates);

      // Ustaw order nowego pliku na 1
      const newFileOrder = 1;

      // Prześlij plik do Firebase Storage
      const storageRef = ref(this.storage, `files/${this.selectedFile.name}`);
      await uploadBytes(storageRef, this.selectedFile);

      // Pobierz URL do przesłanego pliku
      const url = await getDownloadURL(storageRef);

      const fileData: Media = {
        id: '',
        name: this.selectedFile.name,
        url: url,
        order: newFileOrder,
      };

      // Dodaj nowy dokument do Firestore
      const filesCollection = collection(this.firestore, 'files');
      const docRef = await addDoc(filesCollection, {
        name: fileData.name,
        url: fileData.url,
        order: fileData.order,
      });

      // Zaktualizuj nowo dodany dokument z ID
      await updateDoc(docRef, { id: docRef.id });

      // Resetowanie wartości po dodaniu pliku
      this.newFile = { id: '', name: '', url: '', order: 0 };
      this.selectedFile = null;

      // Odśwież listę plików
      this.getFiles();
    }
  }

  // Metoda do przenoszenia pliku w górę
  async moveUp(fileId: string): Promise<void> {
    const fileToMove = this.currentFiles.find((file) => file.id === fileId);
    
    if (fileToMove && fileToMove.order > 1) {
      const previousFile = this.currentFiles.find(
        (file) => file.order === fileToMove.order - 1
      );

      if (previousFile) {
        // Zamień miejscami ordery
        const tempOrder = fileToMove.order;
        fileToMove.order = previousFile.order;
        previousFile.order = tempOrder;

        await Promise.all([
          updateDoc(doc(this.firestore, 'files', fileToMove.id), { order: fileToMove.order }),
          updateDoc(doc(this.firestore, 'files', previousFile.id), { order: previousFile.order }),
        ]);

        // Odśwież listę plików
        this.currentFiles.sort((a, b) => a.order - b.order);
      }
    }
  }

  // Metoda do przenoszenia pliku w dół
  async moveDown(fileId: string): Promise<void> {
    const fileToMove = this.currentFiles.find((file) => file.id === fileId);

    if (fileToMove) {
      const nextFile = this.currentFiles.find(
        (file) => file.order === fileToMove.order + 1
      );

      if (nextFile) {
        // Zamień miejscami ordery
        const tempOrder = fileToMove.order;
        fileToMove.order = nextFile.order;
        nextFile.order = tempOrder;

        await Promise.all([
          updateDoc(doc(this.firestore, 'files', fileToMove.id), { order: fileToMove.order }),
          updateDoc(doc(this.firestore, 'files', nextFile.id), { order: nextFile.order }),
        ]);

        // Odśwież listę plików
        this.currentFiles.sort((a, b) => a.order - b.order);
      }
    }
  }

  // Metoda do usuwania pliku
  async deleteFile(fileId: string): Promise<void> {
    const confirmed = window.confirm('Are you sure you want to delete this file?');
    
    if (confirmed) {
      const fileToDelete = this.currentFiles.find((file) => file.id === fileId);

      if (fileToDelete) {
        const fileOrder = fileToDelete.order; // Zapamiętaj order usuwanego pliku

        // Usunięcie dokumentu
        await deleteDoc(doc(this.firestore, 'files', fileId));

        // Aktualizowanie orderów pozostałych plików
        this.currentFiles = this.currentFiles.filter(file => file.id !== fileId);
        this.currentFiles.forEach(file => {
          if (file.order > fileOrder) {
            file.order -= 1; // Zmniejszamy order pozostałych plików
            updateDoc(doc(this.firestore, 'files', file.id), { order: file.order });
          }
        });

        // Odśwież listę plików
        this.currentFiles.sort((a, b) => a.order - b.order);
      }
    }
  }
}
