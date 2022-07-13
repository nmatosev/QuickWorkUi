import {Message} from "./message";

export interface AdChat {
  adId: number;
  title: string;
  content: string;
  messages: Message[];

}
