import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, TouchableOpacity, Text, Modal, Button } from 'react-native';
import { View } from '../Themed';
import Icon from 'react-native-vector-icons/Entypo';
import { Badge } from 'react-native-elements';

import { closeModal, fetchQuote, removeTodo, toggleTodo } from '../../store/features/todoSlice';
import { ITodoItemProps } from '../../interfaces';
import { RootState } from '../../store/store';
import { useEffect } from 'react';

/**
 * Component that shows single todo item
 *
 * @component
 * @example
 *
 * return <TodoItem item={item} />
 *
 * @returns {ReactElement}
 */

const TodoItem = ({ item }: ITodoItemProps) => {
  const dispatch = useDispatch();
  const { showModal, quote } = useSelector((state: RootState) => state.todos);
  useEffect(() => {
    if (item.isCompleted) {
      dispatch(fetchQuote());
    }
  }, [item.isCompleted, dispatch])
  return (
    <View style={styles.todo}>
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => dispatch(toggleTodo(item.id))}
      >
        {item.isCompleted ? (
          <Text style={styles.checkmark}>✓</Text>
        ) : (
          <Text style={styles.uncheckedBox}> </Text>
        )}
      </TouchableOpacity>

      <View style={styles.todoDetails}>
        <Text
          style={[
            styles.todoText,
            item.isCompleted && styles.completedTodoText,
          ]}
        >
          {item.text}
        </Text>

        {/* Texto que muestra si la tarea está completa o pendiente */}
        <Text style={styles.statusText}>
          {item.isCompleted ? 'Task Complete' : 'Pending'}
        </Text>

        {item.description && (
          <Text style={styles.todoDescription}>{item.description}</Text>
        )}
        
        <View style={styles.badgeContainer}>
          {item.dueDate && (
            <Badge
              value={item.dueDate}
              badgeStyle={styles.dueDateBadge}
              textStyle={styles.dueDateBadgeText}
            />
          )}
        </View>
      </View>

      <TouchableOpacity
        onPress={() => dispatch(removeTodo(item.id))}
        style={styles.deleteButton}
      >
        <Icon name="cross" size={24} color="#FF5722" />
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>

       {/* Modal para mostrar la cita */}
       {showModal && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showModal}
          onRequestClose={() => dispatch(closeModal())}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>{quote?.content || 'Loading quote...'}</Text>
              <Text style={styles.modalTextAuthor}>{quote?.author || 'Loading quote...'}</Text>

              <Button title="Close" onPress={() => dispatch(closeModal())} />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  todo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    borderRadius: 10,
    paddingVertical: 8,
  },
  checkbox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginRight: 10,
    width: 20,
    height: 20,
    padding: 3,
  },
  checkmark: {
    fontSize: 16,
    color: 'green',
    backgroundColor: 'green',
  },
  todoDetails: {
    flex: 1,
  },
  todoText: {
    fontSize: 16,
  },
  completedTodoText: {
    textDecorationLine: 'line-through',
    color: '#ccc',
  },
  uncheckedBox: {
    backgroundColor: 'white',
  },
  todoDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  statusText: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  categoryBadge: {
    backgroundColor: '#007AFF',
    marginRight: 5,
  },
  dueDateBadge: {
    backgroundColor: '#E83151',
  },
  dueDateBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  deleteButton: {
    marginLeft: 10,
    alignItems: 'center',
  },
  deleteText: {
    fontSize: 12,
    color: '#FF5722',
    marginTop: 3,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 15,
  },
  modalTextAuthor: {
    fontSize: 16,
    marginBottom: 15,
    fontStyle: 'italic'
  },
});

export default TodoItem;

