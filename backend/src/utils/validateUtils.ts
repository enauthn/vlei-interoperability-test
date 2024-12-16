import { useStateMachine } from '../store/useStateMachine';
import { Subsubsection } from '../types/stateMachine';

export const isCorrectState = (section: string, subsection: string, subsubsection: string) => {
    console.log(useStateMachine.getCurrentState());
    const { section: currentSection, subsection: currentSubsection, subsubsection: currentSubsubsection } = useStateMachine.getCurrentState();

    return currentSection === section && currentSubsection === subsection && currentSubsubsection === subsubsection;
}

export const validSubsubsections: Subsubsection[] = [
    "START", "ISSUE", "SUBMIT", "ADMIT", "CONFIRM", "APPROVE", "REVOKE",
    "XGAR1_QAR1_GENERATE", "XGAR1_QAR1_APPROVE", "XGAR1_QAR2_GENERATE",
    "XGAR1_QAR2_APPROVE", "XGAR1_QAR3_GENERATE", "XGAR1_QAR3_APPROVE",
    "XGAR2_QAR1_GENERATE", "XGAR2_QAR1_APPROVE", "XGAR2_QAR2_GENERATE",
    "XGAR2_QAR2_APPROVE", "XGAR2_QAR3_GENERATE", "XGAR2_QAR3_APPROVE",
    "IGAR1_QAR1_APPROVE", "IGAR1_QAR1_GENERATE", "IGAR1_QAR2_APPROVE",
    "IGAR1_QAR2_GENERATE", "IGAR1_QAR3_APPROVE", "IGAR1_QAR3_GENERATE",
    "IGAR2_QAR1_APPROVE", "IGAR2_QAR1_GENERATE", "IGAR2_QAR2_APPROVE",
    "IGAR2_QAR2_GENERATE", "IGAR2_QAR3_APPROVE", "IGAR2_QAR3_GENERATE",
    "QAR1_XGAR1_RESPOND", "QAR2_XGAR1_RESPOND", "QAR3_XGAR1_RESPOND",
    "QAR1_XGAR2_RESPOND", "QAR2_XGAR2_RESPOND", "QAR3_XGAR2_RESPOND",
    "QAR1_IGAR1_RESPOND", "QAR2_IGAR1_RESPOND", "QAR3_IGAR1_RESPOND",
    "QAR1_IGAR2_RESPOND", "QAR2_IGAR2_RESPOND", "QAR3_IGAR3_RESPOND"
];
