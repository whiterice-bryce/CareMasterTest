import React, {useContext, useState} from 'react';
import {Text, View, TextInput, Pressable} from 'react-native';
import type {RootStackParamList} from '../types';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {categoryData, clientData} from '../data';
import {NoteContext} from '../note-context';

type NoteScreenProps = NativeStackScreenProps<RootStackParamList, 'Note'>;

export const NoteScreen: React.FC<NoteScreenProps> = ({route, navigation}) => {
  const {title, content, client, category, noteId} = route.params.noteItem;

  const [isEditing, setIsEditing] = useState(route.params.isEditing);
  const {deleteNote, editNote} = useContext(NoteContext);

  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(content);
  const [newCategory, setNewCategory] = useState(category);
  const [newClient, setNewClient] = useState(client);

  const handleSaveChanges = () => {
    const newNoteData = {
      title: newTitle,
      content: newContent,
      category: newCategory,
      client: newClient,
      noteId,
    };

    editNote(noteId, newNoteData);
    setIsEditing(false);
    navigation.navigate('Home');
  };

  const handleDeleteNote = () => {
    deleteNote(noteId);
    navigation.navigate('Home');
  };

  return (
    <View className="container h-full bg-gray-50 py-3 px-4">
      <TextInput
        className={`text-2xl font-bold mb-4 rounded-md px-2 py-1 ${
          isEditing ? 'border border-gray-300' : ''
        }`}
        editable={isEditing}
        value={newTitle}
        onChangeText={x => setNewTitle(x)}
      />

      {isEditing ? (
        <View className="flex-row space-x-2 flex-wrap mb-4 border border-gray-300 rounded-md py-1">
          {categoryData.map((item, index) => {
            const isSelected = item === newCategory;
            return (
              <Pressable
                key={index}
                onPress={() => setNewCategory(item)}
                className={`rounded-lg py-1 px-2 bg-white border border-gray-50 ${
                  isSelected ? 'bg-blue-100' : 'bg-white'
                }`}>
                <Text className="text-xs">{item}</Text>
              </Pressable>
            );
          })}
        </View>
      ) : null}

      {isEditing ? (
        <View className="flex-row space-x-2 flex-wrap mb-4 border border-gray-300 rounded-md py-1">
          {clientData.map((item, index) => {
            const isSelected = item === newClient;
            return (
              <Pressable
                key={index}
                onPress={() => setNewClient(item)}
                className={`rounded-lg py-1 px-2 bg-white border border-gray-50 ${
                  isSelected ? 'bg-purple-100' : 'bg-white'
                }`}>
                <Text className="text-xs">{item}</Text>
              </Pressable>
            );
          })}
        </View>
      ) : (
        <View />
      )}

      {!isEditing ? (
        <View className="flex flex-row justify-between">
          <View className="rounded-lg py-1 px-2 bg-blue-100">
            <Text className="text-xs">{newCategory}</Text>
          </View>

          <View className="rounded-lg py-1 px-2 bg-purple-100">
            <Text className="text-xs">{newClient}</Text>
          </View>
        </View>
      ) : null}

      <TextInput
        multiline={true}
        className={`text-lg font-md rounded-md p-2 ${
          isEditing ? 'border border-gray-300' : ''
        }`}
        editable={isEditing}
        onChangeText={x => setNewContent(x)}
        value={newContent}
      />

      {isEditing ? (
        <Pressable
          className="mt-6 rounded-xl p-3 border bg-green-100 border-green-400"
          onPress={handleSaveChanges}>
          <Text className="text-center font-lg font-bold">Save changes</Text>
        </Pressable>
      ) : (
        <>
          <Pressable
            className="mt-6 rounded-xl p-3 border bg-blue-100 border-blue-400"
            onPress={() => setIsEditing(true)}>
            <Text className="text-center font-lg font-bold">Edit note</Text>
          </Pressable>
          <Pressable
            className="mt-3 rounded-xl p-3 border bg-red-100 border-red-400"
            onPress={handleDeleteNote}>
            <Text className="text-center font-lg font-bold">Delete note</Text>
          </Pressable>
        </>
      )}
    </View>
  );
};
