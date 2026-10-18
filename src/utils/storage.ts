import { BirthdayGiftConfig } from '../types';
import { defaultGiftConfig } from '../data/defaultConfig';

const STORAGE_KEY = 'birthday_gift_custom_config_v1';

export function loadSavedConfig(): BirthdayGiftConfig {
  // 1. Check URL search params for shared config
  try {
    const params = new URLSearchParams(window.location.search);
    const encodedData = params.get('gift');
    if (encodedData) {
      const decodedJson = decodeURIComponent(escape(atob(encodedData)));
      const parsed = JSON.parse(decodedJson);
      return { ...defaultGiftConfig, ...parsed };
    }
  } catch (e) {
    console.warn('Could not parse gift URL data:', e);
  }

  // 2. Check local storage
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { 
        ...defaultGiftConfig, 
        ...parsed,
        isCustomizationFrozen: parsed.isCustomizationFrozen !== undefined ? parsed.isCustomizationFrozen : true,
      };
    }
  } catch (e) {
    console.warn('Could not read from local storage:', e);
  }

  return defaultGiftConfig;
}

export function saveConfigToStorage(config: BirthdayGiftConfig) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (e) {
    console.warn('Could not save to local storage:', e);
  }
}

export const PUBLIC_CLOUD_APP_URL = 
  (typeof import.meta !== 'undefined' && (import.meta.env?.VITE_DEV_APP_URL || import.meta.env?.VITE_PUBLIC_APP_URL)) ||
  'https://ais-dev-gyzkxkig36bjycsbutanva-849906799536.asia-southeast1.run.app';

export const PUBLIC_SHARED_APP_URL = PUBLIC_CLOUD_APP_URL;
export const PUBLIC_DEV_APP_URL = PUBLIC_CLOUD_APP_URL;

/**
 * Resolves the true public base URL for scannable QR codes so mobile devices worldwide can open it.
 * Never defaults to localhost/127.0.0.1 in QR codes.
 */
export function resolvePublicBaseUrl(preferredSource: 'shared' | 'dev' | 'current' | string = 'current'): string {
  if (typeof preferredSource === 'string' && (preferredSource.startsWith('http://') || preferredSource.startsWith('https://'))) {
    return preferredSource.replace(/\/+$/, '');
  }

  if (typeof window !== 'undefined') {
    const isLocalhost = 
      window.location.hostname === 'localhost' || 
      window.location.hostname === '127.0.0.1' || 
      window.location.hostname.endsWith('.local');

    // If currently accessed via a public cloud domain (not localhost), use that active domain!
    if (!isLocalhost && window.location.origin) {
      return window.location.origin + window.location.pathname;
    }
  }

  // Fallback to verified Cloud Run development app URL
  return PUBLIC_CLOUD_APP_URL;
}

/**
 * Generates a clean, reliable, camera-scannable URL for QR codes.
 * Prevents URL overflow by sanitizing heavy data URLs so any mobile camera scans it instantly.
 */
export function generateShareableUrl(
  config: BirthdayGiftConfig, 
  mode: 'full' | 'clean' = 'clean',
  preferredSource: 'shared' | 'dev' | 'current' | string = 'dev'
): string {
  try {
    const baseUrl = resolvePublicBaseUrl(preferredSource);

    if (mode === 'clean') {
      return baseUrl;
    }

    // Clone config and sanitize heavy base64 strings so QR code doesn't get unreadable
    const sanitized: Partial<BirthdayGiftConfig> = { ...config };

    if (sanitized.galleryPhotos) {
      sanitized.galleryPhotos = sanitized.galleryPhotos.map((p) => ({
        ...p,
        url: p.url.startsWith('data:')
          ? 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80'
          : p.url,
      }));
    }

    if (sanitized.memories) {
      sanitized.memories = sanitized.memories.map((m) => ({
        ...m,
        photoUrl: m.photoUrl.startsWith('data:')
          ? 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80'
          : m.photoUrl,
      }));
    }

    if (sanitized.finalPhotoUrl && sanitized.finalPhotoUrl.startsWith('data:')) {
      delete sanitized.finalPhotoUrl;
    }

    if (sanitized.userTakenPhotoUrl) {
      delete sanitized.userTakenPhotoUrl;
    }

    if (sanitized.customAudioUrl && sanitized.customAudioUrl.startsWith('data:')) {
      delete sanitized.customAudioUrl;
    }

    if (sanitized.generatedMusicUrl) {
      delete sanitized.generatedMusicUrl;
    }

    const jsonStr = JSON.stringify(sanitized);
    const encoded = btoa(unescape(encodeURIComponent(jsonStr)));

    // QR Code density limit: if encoded URL is still long (>1800 chars), fall back to compact essentials
    if (encoded.length > 1800) {
      const compactEssentials = {
        birthdayPersonName: config.birthdayPersonName,
        fromName: config.fromName,
        relationship: config.relationship,
        birthdayDate: config.birthdayDate,
        theme: config.theme,
        secretPasscode: config.secretPasscode,
        passcodeHint: config.passcodeHint,
        firstMessage: config.firstMessage,
        personalMessage: config.personalMessage,
      };
      const compactEncoded = btoa(unescape(encodeURIComponent(JSON.stringify(compactEssentials))));
      const compactUrl = new URL(baseUrl);
      compactUrl.searchParams.set('gift', compactEncoded);
      return compactUrl.toString();
    }

    const url = new URL(baseUrl);
    url.searchParams.set('gift', encoded);
    return url.toString();
  } catch {
    return window.location.href;
  }
}

export function resetToDefaults(): BirthdayGiftConfig {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
  return { ...defaultGiftConfig };
}
