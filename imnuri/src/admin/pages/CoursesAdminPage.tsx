import { GenericAdminPage } from './SimpleAdminPage'

const coursesAdminConfig = {
  title: "Kurslar va yo'nalishlar",
  table: 'courses_info',
  displayKey: 'name',
  columns: [
    { key: 'name', label: 'Kurs nomi' },
    { key: 'tag', label: 'Yorliq (DTM uchun / Tibbiyot uchun)' },
    { key: 'duration', label: 'Davomiyligi (3-12 oy)' },
    { key: 'short_desc', label: 'Qisqa tavsif', type: 'textarea' as const, rows: 2 },
    { key: 'price', label: 'Narxi' },
    { key: 'display_order', label: 'Tartib raqami', type: 'number' as const },
  ],
}

export default function CoursesAdminPage() {
  return (
    <div>
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-2xl text-blue-700 text-sm">
        ℹ️ Bu bo'limda kurslar haqida qo'shimcha ma'lumotlar saqlanadi.
        Asosiy kurslar ro'yxati kod ichida saqlangan — ularni o'zgartirish uchun dasturchi kerak.
      </div>
      <GenericAdminPage config={coursesAdminConfig} />
    </div>
  )
}
