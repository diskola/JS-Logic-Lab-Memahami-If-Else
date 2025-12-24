
export type ScenarioId = 'voting' | 'grading' | 'weather' | 'shopping';

export interface Scenario {
  id: ScenarioId;
  title: string;
  description: string;
  variableName: string;
  inputType: 'number' | 'text';
  defaultValue: string | number;
  placeholder: string;
}

export interface LogicResult {
  conditionMet: string;
  output: string;
  explanation: string;
  highlightLines: number[];
}
