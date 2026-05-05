# X-clone

**X-clone** — це клон-додаток соціальної мережі X (колись Twitter). Проект створено для практики розробки мобільного додатку на базі **Expo**, з реалізацією інтерфейсу, навігації та бекенду через **Convex**.

## Команда та внесок
### 30.03.2026
* **Дьомін Семен (Team Leader)** – створив проект, зробив merge всіх гілок, додав redirect на індекс, контролював процес розробки.
* **Васильківський Артур (Auth & UI Developer)** – працював над користувацьким інтерфейсом: додав ілюстрацію, функціонал виходу (Sign Out), трохи попрацював зі стилями, покращив UI.
* **Білоцерковський Дмитро (UI Developer)** – розпочав роботу над інтерфейсом, створював основу, але через від’їзд брав участь частково.
* **Волянський Нікіта (Backend Developer)** – займався бекендом: додав **Convex**, налаштовував логіку роботи з даними.

### 06.04.2026
* **Дьомін Семен (Team Leader)** – створив `providers/ClerkAndConvexProvider.tsx` та зробив рефактеринг `app/_layout.tsx`.
* **Васильківський Артур (UI Developer)** – оновив трохи `app/(tabs)/index.tsx` 
* **Білоцерковський Дмитро (Schema Developer)** – створив `convex/schema.ts` зі всіма таблицями, визначив поля та типи та додав індекси для пошуку
* **Волянський Нікіта (Backend Developer)** – створив `convex/users.ts` з mutation `createUser`, `convex/http.ts` для обробки Clerk Webhooks. Також налаштовує Webhook в Clerk Dashboard та додав `CLERK_WEBHOOK_SECRET` в Convex

### 15.04.2026
* **Дьомін Семен (Team Lead / Backend Developer)** – створив `convex/posts.ts`, реалізував mutations `generateUploadUrl` та `createPost`, додав перевірку автентифікації та оновлення лічильника постів користувача.
* **Волянський Нікіта (Dependencies Developer)** – встановив та налаштував залежності `expo-image-picker`, `expo-file-system`, `expo-image`, перевірив коректність імпортів.
* **Білоцерковський Дмитро (UI Developer)** – реалізував `app/(tabs)/create.tsx`, додав функції `pickImage` та `handleShare`, налаштував логіку створення посту та відображення станів.
* **Васильківський Артур (Styles Developer)** – створив `styles/create.styles.ts`, додав стилі для header, image section, input section та кнопок.

## Технології

* **Expo** та **React Native** – для мобільного додатку.
* **TypeScript** – мова проєкту.
* **Convex** – бекенд та база даних у реальному часі.
* **Clerk** – аутентифікація користувачів.

## Структура проєкту

* `app/` – основний код додатку та екрани.
* `components/` – UI-компоненти.
* `assets/images/` – зображення та ілюстрації.
* `styles/` – стилі додатку.
* `constants/` – константи проєкту.
* `convex/` – бекенд та функції Convex.
* `providers/` - провайдер ClerkAndConvexProvider

## Встановлення та запуск

```bash
# Встановити залежності
npm install

# Запустити проєкт
npx expo start
```
