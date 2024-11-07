interface Subitem {
  item: string;
  inputValue: string;
  button: string; // "true" or "false" to control the button visibility
}

interface Subsection {
  name: string;
  subitem: Subitem[];
}


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface Section {
  name: string;
  completed: number;
  subsections: Subsection[];
}
