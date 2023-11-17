export type NoteItem = {
  title: string;
  content: string;
  client: string;
  category: string;
  noteId: number;
};

export type RootStackParamList = {
  Home: undefined;
  Note: {
    noteItem: NoteItem;
    isEditing: boolean;
  };
};
