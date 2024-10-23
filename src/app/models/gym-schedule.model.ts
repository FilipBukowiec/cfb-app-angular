export interface Activity {
    id: string;
    name: string; // Nazwa zajęć
    url: string;
  }
  
  export interface Coach {
    id: string; // ID trenera
    name: string; // Imię i nazwisko trenera
    url: string; // URL do zdjęcia trenera
  }
  
  export interface GymScheduleForm {
    room: string;
    day: string;
    startTime: string;
    endTime: string;
    activity: string;
    coach: string;
  }