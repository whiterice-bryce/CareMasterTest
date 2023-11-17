import NoteData from './notes.json';
import ClientData from './clients.json';
import CategoryData from './categories.json';
import {NoteItem} from '../types';

export const noteItemData = NoteData as NoteItem[];
export const clientData = ClientData;
export const categoryData = CategoryData;
