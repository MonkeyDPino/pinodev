import type en from "../locales/en.json";
import type es from "../locales/es.json";
import type { svgs } from "./svgs.type";

export type I18nKey = keyof typeof en;

type AssertEqual<A, B> = [A] extends [B] ? ([B] extends [A] ? true : never) : never;
/** Fails `tsc -b` the moment en.json and es.json key sets drift apart. */
export const localeParity: AssertEqual<keyof typeof en, keyof typeof es> = true;

type D = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
export type Year = `19${D}${D}` | `20${D}${D}`;
export type Month =
  | "01"
  | "02"
  | "03"
  | "04"
  | "05"
  | "06"
  | "07"
  | "08"
  | "09"
  | "10"
  | "11"
  | "12";
/** ISO. Display format is locale-dependent, produced at render, never stored. */
export type YearMonth = `${Year}-${Month}`;

export type NonEmpty<T> = readonly [T, ...T[]];
export type Url = `https://${string}`;
export type AssetPath = `/${string}`;
export type Email = `${string}@${string}.${string}`;

export interface CvOutcome {
  readonly figure: string;
  readonly labelKey: I18nKey;
}
export interface CvExperience {
  readonly company: string;
  readonly start: YearMonth;
  readonly end: YearMonth | null; // null => current role => renders the marker
  readonly roleKey: I18nKey;
  readonly descriptionKey: I18nKey;
  readonly outcomes: readonly CvOutcome[];
}
export interface CvCredential {
  readonly issuer: string;
  readonly nameKey: I18nKey;
  readonly awarded: YearMonth;
  readonly verifyUrl: Url | null;
}
export interface CvEducation extends CvCredential {
  readonly statusKey: I18nKey;
}

type ProjectBase = {
  readonly title: string;
  readonly descriptionKey: I18nKey;
  readonly image: AssetPath;
  readonly tech: NonEmpty<svgs>;
};
export type CvProject =
  | (ProjectBase & { readonly kind: "link"; readonly url: Url })
  | (ProjectBase & { readonly kind: "gallery"; readonly images: NonEmpty<AssetPath> });

export interface CvCoreSkillGroup {
  readonly labelKey: I18nKey;
  readonly items: NonEmpty<svgs>;
}
export interface CvExtendedSkillCluster {
  readonly labelKey: I18nKey;
  readonly items: NonEmpty<string>;
}
export type LanguageLevel = "native" | "c1" | "b2" | "b1";
export interface CvLanguage {
  readonly nameKey: I18nKey;
  readonly level: LanguageLevel;
}

export interface CvProfile {
  readonly fullName: string;
  readonly shortName: string;
  readonly location: string;
  /** Hero display lines. Each renders as its own block, which is what makes E1's
      width-axis animation structurally incapable of changing the line count. */
  readonly nameLines: NonEmpty<string>;
  readonly email: Email;
  readonly phone: string;
  readonly portrait: AssetPath;
  readonly socials: NonEmpty<{
    readonly kind: "github" | "linkedin" | "email" | "instagram";
    readonly href: string;
    readonly labelKey: I18nKey;
  }>;
  readonly cvUrls: Readonly<Record<"en" | "es", Url>>;
  readonly experience: NonEmpty<CvExperience>;
  readonly projects: NonEmpty<CvProject>;
  readonly education: NonEmpty<CvEducation>;
  readonly certifications: NonEmpty<CvCredential>;
  readonly coreSkills: NonEmpty<CvCoreSkillGroup>;
  readonly extendedSkills: NonEmpty<CvExtendedSkillCluster>;
  readonly languages: NonEmpty<CvLanguage>;
}
