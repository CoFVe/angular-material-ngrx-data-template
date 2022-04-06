export interface FilterField {
  name: string;
  description?: string;
  isDisplayed: boolean;
  filterType?: 'input' | 'select' | 'datepicker' | null | undefined;
  filterValue?: string;
}
