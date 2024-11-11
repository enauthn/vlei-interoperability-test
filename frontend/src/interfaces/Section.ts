interface Subitem {
  item: string;
  inputValue: string;
  button: string; // "true" or "false" to control the button visibility
}

interface Subsection {
  name: string;
  subitem: Subitem[];
}

export interface Section {
  name: string;
  completed: number;
  subsections: Subsection[];
}
