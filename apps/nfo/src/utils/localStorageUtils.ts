import { TunerParams, TunerSettingsSchema } from '@/context/OracleSettingsContext';

const STORAGE_KEY = 'oracle-tuner-settings';
const PRESET_STORAGE_KEY = 'oracle-tuner-presets';

export const loadSettings = (): TunerParams | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    const result = TunerSettingsSchema.safeParse(parsed);
    return result.success ? result.data : null;
  } catch {
    return null;
  }
};

export const saveSettings = (settings: TunerParams): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {}
};

export const resetSettings = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
};

export const savePreset = (name: string, settings: TunerParams): void => {
  try {
    const stored = localStorage.getItem(PRESET_STORAGE_KEY);
    const presets = stored ? JSON.parse(stored) : {};
    presets[name] = settings;
    localStorage.setItem(PRESET_STORAGE_KEY, JSON.stringify(presets));
  } catch {}
};

export const loadPreset = (name: string): TunerParams | null => {
  try {
    const stored = localStorage.getItem(PRESET_STORAGE_KEY);
    if (!stored) return null;
    const presets = JSON.parse(stored);
    const preset = presets[name];
    const result = TunerSettingsSchema.safeParse(preset);
    return result.success ? result.data : null;
  } catch {
    return null;
  }
};

export const deletePreset = (name: string): void => {
  try {
    const stored = localStorage.getItem(PRESET_STORAGE_KEY);
    if (!stored) return;
    const presets = JSON.parse(stored);
    delete presets[name];
    localStorage.setItem(PRESET_STORAGE_KEY, JSON.stringify(presets));
  } catch {}
};

export const listPresets = (): string[] => {
  try {
    const stored = localStorage.getItem(PRESET_STORAGE_KEY);
    if (!stored) return [];
    const presets = JSON.parse(stored);
    return Object.keys(presets);
  } catch {
    return [];
  }
};
