# עמותת תצפיתניות ישראל – Frontend (Vite + React + TypeScript + MUI)

כולל 3 מסכים ראשונים לפי המוקאפים:
- `/` – מסך פתיחה (Intro)
- `/login` – התחברות
- `/register` – הרשמה

## הרצה

```bash
npm install
npm run dev
```

## types gen

```bash
npm install
npx supabase login
npm run supabase:types
```

## הערות
- כרגע זה Frontend בלבד (ללא Backend).
- כפתורי התחברות/הרשמה מבצעים ניווט לדף `/home` הזמני כדי לבדוק Routing.
- RTL מוגדר ב־MUI וגם ברמת ה־HTML.
