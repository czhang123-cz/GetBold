
export interface CarModel {
  id: string;
  name: string;
  baseMsrp: number;
  description: string;
  categories: OptionCategory[];
}

export interface OptionCategory {
  id: string;
  title: string;
  type: 'single' | 'multiple'; // 'single' means radio button (select one), 'multiple' means checkbox
  options: ConfigOption[];
}

export interface ConfigOption {
  id: string;
  code: string;
  name: string;
  price: number;
  description?: string;
  
  // Rules
  incompatibleWith?: string[]; // Array of option codes
  requires?: string[]; // Array of option codes (must have at least one)
  requiredBy?: string[]; // For display purposes mostly
  includedIn?: string[]; // If these packages are selected, this option is included (price becomes 0 or hidden)
}

export interface ConfigurationState {
  [categoryId: string]: string | string[]; // For 'single' it's optionId, for 'multiple' it's array of optionIds
}
