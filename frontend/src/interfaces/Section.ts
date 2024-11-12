export interface Button {
  text: string;         
  action?: string;          
}

export interface Subitem {
  item: string;         
  inputValue: string | null;   
  button?: Button[];    
  completed: boolean;   
}

export interface Subsection {
  name: string;
  desc: string;         
  button?: Button[];    
  subitem: Subitem[];   
}

export interface Section {
  name: string;        
  subsections: Subsection[];
}
