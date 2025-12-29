import { WizardBlueprint } from '../types';

const WIZARD_STORAGE_KEY = 'sun_ai_wizard_draft_v1';

/**
 * Persists the current wizard state to LocalStorage.
 * Returns true if successful.
 */
export const saveWizardDraft = (data: WizardBlueprint): boolean => {
  try {
    const serialized = JSON.stringify(data);
    localStorage.setItem(WIZARD_STORAGE_KEY, serialized);
    return true;
  } catch (error) {
    console.error('Sun AI: Failed to save wizard draft', error);
    return false;
  }
};

/**
 * Hydrates the wizard state from LocalStorage.
 * Returns null if no draft exists or if parsing fails.
 */
export const loadWizardDraft = (): WizardBlueprint | null => {
  try {
    const serialized = localStorage.getItem(WIZARD_STORAGE_KEY);
    if (!serialized) return null;
    
    const data = JSON.parse(serialized);
    
    // Basic schema check to ensure validity
    if (!data.identity || !data.intent || !data.constraints) {
      return null;
    }
    
    return data as WizardBlueprint;
  } catch (error) {
    console.error('Sun AI: Failed to load wizard draft', error);
    return null;
  }
};

/**
 * Clears the wizard draft. 
 * Used upon project creation or manual reset.
 */
export const clearWizardDraft = (): void => {
  try {
    localStorage.removeItem(WIZARD_STORAGE_KEY);
  } catch (error) {
    console.error('Sun AI: Failed to clear wizard draft', error);
  }
};
