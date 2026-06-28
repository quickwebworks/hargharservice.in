---
Task ID: 1
Agent: Main Agent
Task: Fix Register / Sign In not working

Work Log:
- Diagnosed root cause: Login page used custom `/api/auth/login` JWT API (stored in localStorage) but session check used NextAuth `useSession()` — two disconnected auth systems
- Registration created users with `status: 'PENDING'` requiring OTP, but no OTP UI or real SMS service existed
- Phone login sent `email: loginPhone` to API which validated as email format — guaranteed failure
- Added `CredentialsProvider` to NextAuth config (`src/lib/auth-config.ts`) supporting both email and phone login
- Created NextAuth type augmentation (`src/types/next-auth.d.ts`) for `role` field on Session and JWT
- Rewrote `src/app/login/page.tsx` to use `signIn('credentials', {...})` from next-auth
- Rewrote `src/app/register/page.tsx` to auto-activate users (no OTP) and auto sign-in after registration
- Updated `src/app/api/auth/register/route.ts` to set `status: 'ACTIVE'` directly
- Cleaned up `src/components/MainNavigation.tsx` to remove `localAuth` localStorage hack, use only NextAuth session
- Added NEXTAUTH_SECRET, NEXTAUTH_URL, JWT_SECRET to .env
- Verified via curl: registration returns ACTIVE user, credentials login sets next-auth.session-token cookie (HTTP 302 redirect)

Stage Summary:
- Auth system unified under NextAuth with CredentialsProvider + GoogleProvider
- Register creates ACTIVE users, auto-signs in, redirects to home
- Login supports both email and phone + password
- Session state works correctly across all components via useSession()