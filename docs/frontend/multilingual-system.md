# HI Multilingual System

Source Protocol:
https://github.com/tii-mom/Human-Intelligence

Source Specification:
Human-Intelligence/docs/frontend/MULTILINGUAL_SYSTEM_SPEC.md

## Purpose

Define how the HI frontend delivers a culturally adaptive multilingual experience across desktop, mobile, and Telegram.

## UX Goals

The interface should feel locally native, not machine translated. AI messages, agent names, status labels, risk language, and financial copy should remain clear and emotionally appropriate in each supported language.

## Technical Implementation Strategy

Use the existing `react-i18next` setup in `src/i18n.ts` and locale JSON files under `src/locales`. Supported locales are English, Simplified Chinese, Russian, Korean, Japanese, Turkish, Vietnamese, Hindi, Portuguese, and Spanish. New text must be translation-keyed at creation time.

## Component Structure

Language controls should remain shell-level through `LanguageSwitcher`, while feature copy belongs in feature namespaces. AI terminal text should distinguish fixed UI labels from generated AI narrative so localization can handle both predictable and dynamic language.

## State Management Strategy

Persist locale preference through i18next language detection and user selection. Keep locale state independent from wallet, protocol, and market state. Telegram launch language can initialize the app locale, but the user's explicit in-app selection should take priority.

## Animation Behavior

Language changes should avoid dramatic page transitions. Text replacement should preserve layout stability. Long localized strings must wrap cleanly rather than forcing font scaling or horizontal overflow.

## Mobile Behavior

Mobile translations need compact labels and tested wrapping. Controls must remain touch-safe in languages with longer words. Numeric, currency, and date formatting should use locale-aware APIs where possible.

## Telegram Behavior

Telegram locale should be read as an initial signal. Inline AI notifications, deep-link labels, wallet prompts, and companion responses should use the active HI locale, not only Telegram client language.

## Performance Considerations

Load only required locale bundles when the app grows large enough to justify splitting. Keep translation keys stable. Avoid recomputing large localized feed payloads on every render. Use Unicode-safe fonts and avoid icon/text overlap in CJK and Indic scripts.
