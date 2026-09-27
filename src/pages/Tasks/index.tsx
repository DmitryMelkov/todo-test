import { Button } from '@/ui/Button'
import { ConfirmModal } from '@/ui/ConfirmModal'
import { ThemeToggle } from '@/ui/ThemeToggle'
import { Toast } from '@/ui/Toast'
import { useTheme } from '@/theme'
import { PriorityFilterSelect } from './components/PriorityFilter'
import { TaskFormModal } from './components/TaskFormModal'
import { TaskList } from './components/TaskList'
import { useTasksPage } from './hooks'
import styles from './Tasks.module.css'

export const TasksPage = () => {
  const { isDark, toggleTheme } = useTheme()
  const {
    filteredTasks,
    priorityFilter,
    isLoading,
    isTaskModalOpen,
    isEditing,
    isSubmitting,
    pendingDeleteTask,
    isDeleting,
    toast,
    form,
    formError,
    setPriorityFilter,
    openCreateModal,
    openEditModal,
    closeTaskModal,
    openDeleteConfirm,
    closeDeleteConfirm,
    setFormTitle,
    setFormPriority,
    saveTask,
    confirmDeleteTask,
    clearToast,
  } = useTasksPage()

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Задачи</h1>
          <p className={styles.subtitle}>Список задач с фильтром по приоритету</p>
        </div>
        <div className={styles.headerActions}>
          <ThemeToggle isDark={isDark} onClick={toggleTheme} />
          <Button type="button" className={styles.headerAction} onClick={openCreateModal}>
            Создать задачу
          </Button>
        </div>
      </header>

      <section className={styles.toolbar}>
        <PriorityFilterSelect value={priorityFilter} onChange={setPriorityFilter} />
      </section>

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
          onEdit={openEditModal}
          onDelete={openDeleteConfirm}
        />
      )}

      <TaskFormModal
        isOpen={isTaskModalOpen}
        isEditing={isEditing}
        isSubmitting={isSubmitting}
        form={form}
        formError={formError}
        onClose={closeTaskModal}
        onTitleChange={setFormTitle}
        onPriorityChange={setFormPriority}
        onSubmit={() => {
          void saveTask()
        }}
      />

      <ConfirmModal
        isOpen={pendingDeleteTask !== null}
        title="Удалить задачу?"
        description={
          pendingDeleteTask
            ? `Задача «${pendingDeleteTask.title}» будет удалена без возможности восстановления.`
            : ''
        }
        confirmLabel="Удалить"
        isConfirming={isDeleting}
        onCancel={closeDeleteConfirm}
        onConfirm={() => {
          void confirmDeleteTask()
        }}
      />

      <Toast toast={toast} onClose={clearToast} />
    </main>
  )
}
