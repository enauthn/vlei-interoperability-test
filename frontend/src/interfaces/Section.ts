export interface Button {
  text: string;        
  disabledByDefault: boolean;
  action: string;    
  position?: string;      
}

export interface Input{
  value: string;
  disabledByDefault:boolean;
}

export interface Subitem {
  name: string;         
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
