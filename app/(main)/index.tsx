import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FlatList, StyleSheet } from 'react-native';

import { Text, View } from '../../components/Themed';
import { ITodo } from '../../interfaces';
import { RootState } from '../../store/store';
import AddTodo from '../../components/todos/AddTodo';
import TodoItem from '../../components/todos/TodoItem';

/**
 * Screen that shows All the Todos
 *
 * @screen
 * @example
 *
 * return <TODOS />
 *
 * @returns {ReactElement}
 * @author Faizan Ahmad <a-f.a@outlook.com>
 * @version 1.0.0
 */

export default function TODOS() {
  const todos: ITodo[] = useSelector((state: RootState) => state.todos.todos);
  const [filtered, setFiltered] = useState(todos);
  const [isNewTodoModalOpen, setIsNewTodoModalOpen] = useState(false);

  useEffect(() => {
    setFiltered(todos);
  }, [todos]);

  const renderTodoItem = ({ item }: { item: ITodo }) => (
    <TodoItem item={item} />
  );



  return (
    <View style={styles.container}>
      {isNewTodoModalOpen && (
        <AddTodo setIsModalVisible={setIsNewTodoModalOpen} />
      )}
    
      <View style={styles.header}>
        <Text
          style={styles.filters}
          onPress={() => setIsNewTodoModalOpen(true)}>
          Add New TODO
        </Text>
      </View>
      <Text style={styles.title}>TODO's List</Text>
      <View
        style={styles.separator}
        lightColor='#eee'
        darkColor='rgba(255,255,255,0.1)'
      />
      <FlatList
        style={styles.list}
        data={filtered}
        renderItem={renderTodoItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => (
          <Text style={styles.empty}>Empty list , create new task</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '80%',
  },
  filters: {
    marginVertical: 10,
    color: '#007AFF',
    fontWeight: 'bold',
    textAlign: 'right',
    marginRight: 5,
  },
  list: {
    flex: 1,
    marginTop: 10,
    width: '90%',
  },
  empty: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },
});
