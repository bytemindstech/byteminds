/* eslint-disable */
/**
 * This file was generated by 'vite-plugin-kit-routes'
 *
 *      >> DO NOT EDIT THIS FILE MANUALLY <<
 */

/**
 * PAGES
 */
const PAGES = {
  "/admin": `/admin`,
  "/admin/parents": `/admin/parents`,
  "/admin/students": `/admin/students`,
  "/admin/tutors": `/admin/tutors`,
  "/admin/profile/[id]": (params: { id: (string | number) }) => {
    return `/admin/profile/${params.id}`
  },
  "/email-verification": `/email-verification`,
  "/parent": `/parent`,
  "/parent/courses": `/parent/courses`,
  "/parent/profile": `/parent/profile`,
  "/parent/tutors": `/parent/tutors`,
  "/student": `/student`,
  "/student/courses": `/student/courses`,
  "/student/profile": `/student/profile`,
  "/student/tutors": `/student/tutors`,
  "/tutor": `/tutor`,
  "/tutor/profile": `/tutor/profile`,
  "/user-profile": `/user-profile`,
  "/": `/`,
  "/about": `/about`,
  "/contact-us": `/contact-us`,
  "/courses": `/courses`,
  "/courses/[courseId]": (params: { courseId: (string | number) }) => {
    return `/courses/${params.courseId}`
  },
  "/faqs": `/faqs`,
  "/tutors": `/tutors`,
  "/tutors/[tutorId]": (params: { tutorId: (string | number) }) => {
    return `/tutors/${params.tutorId}`
  },
  "/password-reset": `/password-reset`,
  "/privacy-policy": `/privacy-policy`,
  "/signin-signup": `/signin-signup`,
  "/tos": `/tos`
}

/**
 * SERVERS
 */
const SERVERS = {
  
}

/**
 * ACTIONS
 */
const ACTIONS = {
  "verifyEmail /email-verification": `/email-verification?/verifyEmail`,
  "resendVerificationCode /email-verification": `/email-verification?/resendVerificationCode`,
  "default /user-profile": `/user-profile`,
  "default /contact-us": `/contact-us`,
  "default /logout": `/logout`,
  "resetPassword /password-reset": `/password-reset?/resetPassword`,
  "login /signin-signup": `/signin-signup?/login`,
  "register /signin-signup": `/signin-signup?/register`,
  "sendResetPasswordEmail /signin-signup": `/signin-signup?/sendResetPasswordEmail`
}

/**
 * LINKS
 */
const LINKS = {
  "facebook": `https://facebook.com/byteminds`,
  "youtube": `https://www.youtube.com/@bytemindstech`,
  "linkedin": `https://www.linkedin.com/company/bytemindssocials`,
  "tiktok": `https://tiktok.com/@byteminds.socials`,
  "instagram": `https://www.instagram.com/byteminds.socials`,
  "classroom": `https://classroom.jhenbert.com`,
  "githubAvatar": (params: { avatarId: (string | number) }) => {
    return `https://avatars.githubusercontent.com/u/${params.avatarId}?v=4`
  },
  "blog": `https://blog.bytemindsph.com`,
  "bmlearning": `https://bmlearninghub.site`
}

type ParamValue = string | number | undefined

/**
 * Append search params to a string
 */
export const appendSp = (sp?: Record<string, ParamValue | ParamValue[]>, prefix: '?' | '&' = '?') => {
  if (sp === undefined) return ''

  const params = new URLSearchParams()
  const append = (n: string, v: ParamValue) => {
    if (v !== undefined) {
      params.append(n, String(v))
    }
  }

  for (const [name, val] of Object.entries(sp)) {
    if (Array.isArray(val)) {
      for (const v of val) {
        append(name, v)
      }
    } else {
      append(name, val)
    }
  }

  const formatted = params.toString()
  if (formatted) {
    return `${prefix}${formatted}`
  }
  return ''
}

/**
 * get the current search params
 * 
 * Could be use like this:
 * ```
 * route("/cities", { page: 2 }, { ...currentSP() })
 * ```
 */ 
export const currentSp = () => {
  const params = new URLSearchParams(window.location.search)
  const record: Record<string, string> = {}
  for (const [key, value] of params.entries()) {
    record[key] = value
  }
  return record
}

// route function helpers
type NonFunctionKeys<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T]
type FunctionKeys<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T]
type FunctionParams<T> = T extends (...args: infer P) => any ? P : never

const AllObjs = { ...PAGES, ...ACTIONS, ...SERVERS, ...LINKS }
type AllTypes = typeof AllObjs

export type Routes = keyof AllTypes extends `${string}/${infer Route}` ? `/${Route}` : keyof AllTypes
export const routes = [
	...new Set(Object.keys(AllObjs).map((route) => /^\/.*|[^ ]?\/.*$/.exec(route)?.[0] ?? route)),
] as Routes[]

/**
 * To be used like this: 
 * ```ts
 * import { route } from './ROUTES'
 * 
 * route('site_id', { id: 1 })
 * ```
 */
export function route<T extends FunctionKeys<AllTypes>>(key: T, ...params: FunctionParams<AllTypes[T]>): string
export function route<T extends NonFunctionKeys<AllTypes>>(key: T): string
export function route<T extends keyof AllTypes>(key: T, ...params: any[]): string {
  if (AllObjs[key] as any instanceof Function) {
    const element = (AllObjs as any)[key] as (...args: any[]) => string
    return element(...params)
  } else {
    return AllObjs[key] as string
  }
}

/**
* Add this type as a generic of the vite plugin `kitRoutes<KIT_ROUTES>`.
*
* Full example:
* ```ts
* import type { KIT_ROUTES } from './ROUTES'
* import { kitRoutes } from 'vite-plugin-kit-routes'
*
* kitRoutes<KIT_ROUTES>({
*  PAGES: {
*    // here, key of object will be typed!
*  }
* })
* ```
*/
export type KIT_ROUTES = {
  PAGES: { '/admin': never, '/admin/parents': never, '/admin/students': never, '/admin/tutors': never, '/admin/profile/[id]': 'id', '/email-verification': never, '/parent': never, '/parent/courses': never, '/parent/profile': never, '/parent/tutors': never, '/student': never, '/student/courses': never, '/student/profile': never, '/student/tutors': never, '/tutor': never, '/tutor/profile': never, '/user-profile': never, '/': never, '/about': never, '/contact-us': never, '/courses': never, '/courses/[courseId]': 'courseId', '/faqs': never, '/tutors': never, '/tutors/[tutorId]': 'tutorId', '/password-reset': never, '/privacy-policy': never, '/signin-signup': never, '/tos': never }
  SERVERS: Record<string, never>
  ACTIONS: { 'verifyEmail /email-verification': never, 'resendVerificationCode /email-verification': never, 'default /user-profile': never, 'default /contact-us': never, 'default /logout': never, 'resetPassword /password-reset': never, 'login /signin-signup': never, 'register /signin-signup': never, 'sendResetPasswordEmail /signin-signup': never }
  LINKS: { 'facebook': never, 'youtube': never, 'linkedin': never, 'tiktok': never, 'instagram': never, 'classroom': never, 'githubAvatar': 'avatarId', 'blog': never, 'bmlearning': never }
  Params: { id: never, courseId: never, tutorId: never, avatarId: never }
}
