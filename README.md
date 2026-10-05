# Showed

Каркас приложения по SPEC.md: Next.js App Router, TypeScript и Tailwind CSS. Только Solana Devnet.

## Локальный запуск

Нужен Node.js 20.18+ и npm (для актуального Solana Kit).

```bash
cd /Users/ye/projects/showed
npm ci
cp .env.example .env.local
npm run dev
```

Откройте http://localhost:3000. Для просмотра заглушек ключи не нужны. Команда `cp` предназначена для первого запуска; не перезаписывайте уже заполненный `.env.local`.

## Проверки и production-запуск

```bash
npm run lint
npm run typecheck
npm run build
npm start
```

`npm start` запускает предварительно собранное приложение на http://localhost:3000.

## Что создано

- `/` — главная страница с кнопкой Create event.
- `/create` — форма-заглушка с полями title, description, date и image URL; место для claim-ссылки и QR-кода.
- `/claim/[eventId]` — карточка-заглушка события, отключённые кнопки email login и Get badge. Например: `/claim/demo`.
- `/u/[address]` — профиль-заглушка, место для статистики и сетки бейджей, кнопка Copy link. Например: `/u/demo`.
- `POST /api/claim` — JSON-ответ `501 NOT_IMPLEMENTED`.
- `src/lib/types.ts` — типы events и claims из спецификации.
- `scripts/generate-keypair.ts` — генерация серверной пары ключей Solana и безопасное сохранение в `.env.local`.
- `scripts/setup-tree.ts` — заглушка, которая завершается с кодом 1 и ничего не меняет.

```bash
curl -i -X POST http://localhost:3000/api/claim
npm run generate-keypair
npm run setup-tree
```

Сохранение событий, QR-коды, авторизация Privy, Supabase, Helius и mint через Bubblegum пока не реализованы. Их SDK не установлены. Перед реализацией нужно проверить актуальную официальную документацию, как требует SPEC.md. Для claims потребуется ограничение `UNIQUE(event_id, wallet)`.

## Генерация серверного ключа

Из корня проекта:

```bash
npm run generate-keypair
```

Скрипт использует официальную библиотеку `@solana/kit`, создаёт пару ключей локально и печатает только публичный адрес. Секрет сохраняется в `.env.local` как `SERVER_KEYPAIR=[…]` — JSON-массив из 64 байт (формат Solana keypair). Сетевых запросов и транзакций нет.

Если `.env.local` отсутствует, скрипт создаст его. Остальные строки существующего файла сохраняются. Запись атомарная, права файла — `600` (чтение и запись только владельцу). Повторный запуск при наличии `SERVER_KEYPAIR` ничего не изменит, даже если значение пустое. Если вы скопировали `.env.example`, перед первой генерацией удалите из `.env.local` только пустую строку `SERVER_KEYPAIR=`. Значение `SERVER_KEYPAIR` в окружении процесса также блокирует генерацию.

Одновременные запуски защищены lock-файлом `.env.local.generate-keypair.lock`. После аварийного завершения удаляйте оставшийся lock-файл только убедившись, что генератор уже не работает.

Документация: [Solana Kit — Key pairs](https://www.solanakit.com/docs/advanced-guides/keypairs).

## Переменные окружения

Все девять переменных из SPEC.md перечислены в `.env.example`: `HELIUS_API_KEY`, `NEXT_PUBLIC_PRIVY_APP_ID`, `PRIVY_APP_SECRET`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SERVER_KEYPAIR`, `MERKLE_TREE_ADDRESS`, `COLLECTION_ADDRESS`, `NEXT_PUBLIC_SITE_URL`.

Секреты храните только в `.env.local`: файл исключён из Git вместе с `node_modules`. `SERVER_KEYPAIR` предназначен только для сервера. Публичные переменные с префиксом `NEXT_PUBLIC_` видны в браузере.

Адреса Devnet и пример транзакции появятся после реализации и запуска setup/mint. Этот каркас не создаёт аккаунтов и не отправляет транзакций.
