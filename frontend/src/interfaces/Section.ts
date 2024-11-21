export interface Button {
  text: string;        
  disabled: boolean;
  action: string;    
  position?: string;      
}

export interface Input{
  value: string;
  disabled:boolean;
}

export interface Subitem {
  item: string;         
  input: Input | null;   
  button?: Button[];    
  completed: boolean;   
}

export interface Subsection {
  name: string;
  desc: string;         
  button?: Button[];    
  subitems: Subitem[];   
}

export interface Section {
  name: string;        
  subsections: Subsection[];
}
