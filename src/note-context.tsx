import React, {useState, createContext, useEffect} from 'react';
import {NoteItem} from './types';
import {noteItemData} from './data';
import AsyncStorage from '@react-native-async-storage/async-storage';

type NoteContextType = {
  noteData: NoteItem[];
  createdNewNote: () => NoteItem;
  editNote: (noteId: number, newNoteItem: NoteItem) => void;
  deleteNote: (noteId: number) => void;
};

const defaultNoteData = {
  title: 'New note',
  content: 'This is a new note.',
  client: 'Lewis Hamilton',
  category: 'Active Duty',
  noteId: 0,
};

export const NoteContext = createContext<NoteContextType>({
  noteData: [],
  createdNewNote: () => defaultNoteData,
  editNote: () => null,
  deleteNote: () => null,
});

export const NoteContextProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [noteData, setNoteData] = useState<NoteItem[]>(noteItemData || []);
  const [totalNotesCreated, setTotalNotesCreated] = useState(0); // used for creating new note ids

  useEffect(() => {
    getSavedTotalNotesCreated();
    getSavedNoteData();
  }, []);

  const createdNewNote = (): NoteItem => {
    const newNoteId = totalNotesCreated + 1;

    const newNoteItem = {
      ...defaultNoteData,
      noteId: newNoteId,
    };

    const newNoteData = [...noteData, newNoteItem];

    updateNoteData(newNoteData);
    updateTotalNotesCreated(newNoteId);

    return newNoteItem;
  };

  const editNote = (noteId: number, newNoteItem: NoteItem) => {
    const newNoteData = noteData.map(x =>
      x.noteId !== noteId ? x : newNoteItem,
    );

    setNoteData(newNoteData);
  };

  const deleteNote = (noteId: number) => {
    const newNoteData = noteData.flatMap(x => (x.noteId !== noteId ? x : []));

    updateNoteData(newNoteData);
  };

  const updateNoteData = (newData: NoteItem[]) => {
    setNoteData(newData);
    AsyncStorage.setItem('note-data', JSON.stringify(newData));
  };

  const updateTotalNotesCreated = (newValue: number) => {
    setTotalNotesCreated(newValue);
    AsyncStorage.setItem('total-notes-created', JSON.stringify(newValue));
  };

  const getSavedNoteData = async () => {
    try {
      const savedData = await AsyncStorage.getItem('note-data');

      if (savedData !== null) {
        setNoteData(JSON.parse(savedData));
      } else {
        setNoteData([]);
      }
    } catch (error) {
      console.log(error);
      setNoteData([]);
    }
  };

  const getSavedTotalNotesCreated = async () => {
    try {
      const savedData = await AsyncStorage.getItem('total-notes-created');

      if (savedData !== null) {
        setTotalNotesCreated(JSON.parse(savedData));
      } else {
        setTotalNotesCreated(0);
      }
    } catch (error) {
      console.log(error);
      setTotalNotesCreated(0);
    }
  };

  return (
    <NoteContext.Provider
      value={{
        noteData,
        createdNewNote,
        editNote,
        deleteNote,
      }}>
      {children}
    </NoteContext.Provider>
  );
};
