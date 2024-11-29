import { useStateMachine } from '../store/useStateMachine';

export const isCorrectState = (section: string, subsection: string, subsubsection: string) => {
    console.log(useStateMachine.getCurrentState());
    const { section: currentSection, subsection: currentSubsection, subsubsection: currentSubsubsection } = useStateMachine.getCurrentState();

    return currentSection === section && currentSubsection === subsection && currentSubsubsection === subsubsection;
}