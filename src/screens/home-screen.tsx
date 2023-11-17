import React, {useContext} from 'react';
import {View, Text, Pressable, FlatList} from 'react-native';
import type {RootStackParamList} from '../types';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NoteContext} from '../note-context';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const {noteData, createdNewNote} = useContext(NoteContext);

  const handleCreateNewNode = () => {
    const newNoteData = createdNewNote();
    navigation.navigate('Note', {
      noteItem: newNoteData,
      isEditing: true,
    });
  };

  return (
    <View className="container h-full bg-gray-50 py-2 px-3">
      <View className="flex flex-row space-between">
        <Pressable
          className="rounded-xl p-3 mb-6 mt-3 border bg-green-100 border-green-400 w-full"
          onPress={handleCreateNewNode}>
          <Text className="text-md font-bold text-center">New note</Text>
        </Pressable>
      </View>
      {!noteData || !noteData.length ? (
        <View>
          <Text className="text-lg text-center">
            There are no notes. Please create one with the button above.
          </Text>
        </View>
      ) : (
        <FlatList
          className="flexGrow"
          data={noteData}
          renderItem={({item}) => (
            <Pressable
              onPress={() => {
                navigation.navigate('Note', {
                  noteItem: item,
                  isEditing: false,
                });
              }}
              className="mb-4 rounded-xl bg-white p-3">
              <Text className="text-xl font-semibold mb-2">{item.title}</Text>
              <Text className="text-md">{item.content}</Text>

              <View className="flex flex-row justify-between mt-2">
                <View className="rounded-lg py-1 px-2 bg-blue-100">
                  <Text className="text-xs">{item.category}</Text>
                </View>

                <View className="rounded-lg py-1 px-2 bg-purple-100">
                  <Text className="text-xs">{item.client}</Text>
                </View>
              </View>
            </Pressable>
          )}
        />
      )}
    </View>
  );
};
