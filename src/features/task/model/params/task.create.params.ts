export type FrequencyType = 'ONCE' | 'DAILY' | 'WEEKLY' | 'MONTHLY';

export interface CreateTaskParams {
  name: string;
  description?: string;
  startDate?: Date;
}

export interface CreateRecurringParams {
  name: string;
  description?: string;
  startDate: Date;
  frequencyType: FrequencyType;
  monthDay?: number;
}