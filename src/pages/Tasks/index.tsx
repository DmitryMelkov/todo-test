import { CreateTaskModal } from './components/CreateTaskModal'
import { PriorityFilterSelect } from './components/PriorityFilter'
import { TaskList } from './components/TaskList'
import { useTasksPage } from './hooks'
import styles from './Tasks.module.css'

export const TasksPage = () => {
  const {
    filteredTasks,
    priorityFilter,
    isLoading,
    isCreateModalOpen,
    isSubmitting,
    error,
    form,
    formError,
    setPriorityFilter,
    openCreateModal,
    closeCreateModal,
    setFormTitle,
    setFormPriority,
    createTask,
  } = useTasksPage()

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Задачи</h1>
          <p className={styles.subtitle}>Список задач с фильтром по приоритету</p>
        </div>
        <button type="button" className={styles.button} onClick={openCreateModal}>
          Создать задачу
        </button>
      </header>

      <section className={styles.toolbar}>
        <PriorityFilterSelect value={priorityFilter} onChange={setPriorityFilter} />
      </section>

      {error ? <p className={styles.error}>{error}</p> : null}

      {isLoading ? <p className={styles.empty}>Загрузка…</p> : <TaskList tasks={filteredTasks} />}

      <CreateTaskModal
        isOpen={isCreateModalOpen}
        isSubmitting={isSubmitting}
        form={form}
        formError={formError}
        onClose={closeCreateModal}
        onTitleChange={setFormTitle}
        onPriorityChange={setFormPriority}
        onSubmit={() => {
          void createTask()
        }}
      />
    </main>
  )
}
