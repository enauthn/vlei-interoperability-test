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

export interface SubSubsection {
  name: string;         
  input: Input | null;   
  button?: Button[];    
  completed: boolean | null;   
}

export interface Subsection {
  name: string;
  desc: string;         
  button?: Button[];    
  subsubsections: SubSubsection[];   
}

export interface Section {
  name: string;        
  subsections: Subsection[];
}
