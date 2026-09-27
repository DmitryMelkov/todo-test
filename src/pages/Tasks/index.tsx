import { Button } from '@/ui/Button'
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
        <Button type="button" className={styles.headerAction} onClick={openCreateModal}>
          Создать задачу
        </Button>
      </header>

      <section className={styles.toolbar}>
        <PriorityFilterSelect value={priorityFilter} onChange={setPriorityFilter} />
      </section>

      {error ? <p className={styles.error}>{error}</p> : null}

      {isLoading ? (
        <div className={styles.status} role="status" aria-live="polite" aria-busy="true">
          <div className={styles.skeletonList} aria-hidden="true">
            <div className={styles.skeletonItem} />
            <div className={styles.skeletonItem} />
            <div className={styles.skeletonItem} />
          </div>
          <p className={styles.statusText}>Загрузка задач…</p>
        </div>
      ) : (
        <TaskList
          tasks={filteredTasks}
          priorityFilter={priorityFilter}
          onCreate={openCreateModal}
        />
      )}

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
