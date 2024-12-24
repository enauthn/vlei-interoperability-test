import { useStateMachine } from '../store/useStateMachine';
import { Subsubsection } from '../types/stateMachine';

export const isCorrectState = (section: string, subsection: string, subsubsection: string) => {
    console.log(useStateMachine.getCurrentState());
    const { section: currentSection, subsection: currentSubsection, subsubsection: currentSubsubsection } = useStateMachine.getCurrentState();
    console.log("isCorrectState")
    console.log(currentSubsubsection)
    console.log(subsubsection)
    return currentSection === section && currentSubsection === subsection && currentSubsubsection === subsubsection;
}

// export const validSubsubsections: Subsubsection[]= [
//     "START", "ISSUE", "SUBMIT", "ADMIT", "CONFIRM", "APPROVE", "REVOKE",
//     "XGAR1_QAR1_GENERATE", "XGAR1_QAR1_APPROVE", "XGAR1_QAR2_GENERATE",
//     "XGAR1_QAR2_APPROVE", "XGAR1_QAR3_GENERATE", "XGAR1_QAR3_APPROVE",
//     "XGAR2_QAR1_GENERATE", "XGAR2_QAR1_APPROVE", "XGAR2_QAR2_GENERATE",
//     "XGAR2_QAR2_APPROVE", "XGAR2_QAR3_GENERATE", "XGAR2_QAR3_APPROVE",
//     "IGAR1_QAR1_APPROVE", "IGAR1_QAR1_GENERATE", "IGAR1_QAR2_APPROVE",
//     "IGAR1_QAR2_GENERATE", "IGAR1_QAR3_APPROVE", "IGAR1_QAR3_GENERATE",
//     "IGAR2_QAR1_APPROVE", "IGAR2_QAR1_GENERATE", "IGAR2_QAR2_APPROVE",
//     "IGAR2_QAR2_GENERATE", "IGAR2_QAR3_APPROVE", "IGAR2_QAR3_GENERATE",
//     "QAR1_XGAR1_RESPOND", "QAR2_XGAR1_RESPOND", "QAR3_XGAR1_RESPOND",
//     "QAR1_XGAR2_RESPOND", "QAR2_XGAR2_RESPOND", "QAR3_XGAR2_RESPOND",
//     "QAR1_IGAR1_RESPOND", "QAR2_IGAR1_RESPOND", "QAR3_IGAR1_RESPOND",
//     "QAR1_IGAR2_RESPOND", "QAR2_IGAR2_RESPOND", "QAR3_IGAR2_RESPOND"
// ];

export const validSubsubsectionsParams: string[] = [
    "start",
    "xgar1-qar1-generate",
    "xgar1-qar1-approve",
    "xgar1-qar2-generate",
    "xgar1-qar2-approve",
    "xgar1-qar3-generate",
    "xgar1-qar3-approve",
    "xgar2-qar1-generate",
    "xgar2-qar1-approve",
    "xgar2-qar2-generate",
    "xgar2-qar2-approve",
    "xgar2-qar3-generate",
    "xgar2-qar3-approve",
    "igar1-qar1-generate",
    "igar1-qar1-approve",
    "igar1-qar2-generate",
    "igar1-qar2-approve",
    "igar1-qar3-generate",
    "igar1-qar3-approve",
    "igar2-qar1-generate",
    "igar2-qar1-approve",
    "igar2-qar2-generate",
    "igar2-qar2-approve",
    "igar2-qar3-generate",
    "igar2-qar3-approve",
    "qar1-xgar1-respond",
    "qar2-xgar1-respond",
    "qar3-xgar1-respond",
    "qar1-xgar2-respond",
    "qar2-xgar2-respond",
    "qar3-xgar2-respond",
    "qar1-igar1-respond",
    "qar2-igar1-respond",
    "qar3-igar1-respond",
    "qar1-igar2-respond",
    "qar2-igar2-respond",
    "qar3-igar2-respond"
];

export const challengeResponseMapping: { [key: string]: { challenger: string; recipient: string } } = {
    "XGAR1_QAR1_GENERATE": { challenger: "qar1", recipient: "ex_gar1" },
    "XGAR1_QAR1_APPROVE": { challenger: "qar1", recipient: "ex_gar1" },
    "XGAR1_QAR2_GENERATE": { challenger: "qar2", recipient: "ex_gar1" },
    "XGAR1_QAR2_APPROVE": { challenger: "qar2", recipient: "ex_gar1" },
    "XGAR1_QAR3_GENERATE": { challenger: "qar3", recipient: "ex_gar1" },
    "XGAR1_QAR3_APPROVE": { challenger: "qar3", recipient: "ex_gar1" },
    "XGAR2_QAR1_GENERATE": { challenger: "qar1", recipient: "ex_gar2" },
    "XGAR2_QAR1_APPROVE": { challenger: "qar1", recipient: "ex_gar2" },
    "XGAR2_QAR2_GENERATE": { challenger: "qar2", recipient: "ex_gar2" },
    "XGAR2_QAR2_APPROVE": { challenger: "qar2", recipient: "ex_gar2" },
    "XGAR2_QAR3_GENERATE": { challenger: "qar3", recipient: "ex_gar2" },
    "XGAR2_QAR3_APPROVE": { challenger: "qar3", recipient: "ex_gar2" },
    "IGAR1_QAR1_GENERATE": { challenger: "qar1", recipient: "in_gar1" },
    "IGAR1_QAR1_APPROVE": { challenger: "qar1", recipient: "in_gar1" },
    "IGAR1_QAR2_GENERATE": { challenger: "qar2", recipient: "in_gar1" },
    "IGAR1_QAR2_APPROVE": { challenger: "qar2", recipient: "in_gar1" },
    "IGAR1_QAR3_GENERATE": { challenger: "qar3", recipient: "in_gar1" },
    "IGAR1_QAR3_APPROVE": { challenger: "qar3", recipient: "in_gar1" },
    "IGAR2_QAR1_GENERATE": { challenger: "qar1", recipient: "in_gar2" },
    "IGAR2_QAR1_APPROVE": { challenger: "qar1", recipient: "in_gar2" },
    "IGAR2_QAR2_GENERATE": { challenger: "qar2", recipient: "in_gar2" },
    "IGAR2_QAR2_APPROVE": { challenger: "qar2", recipient: "in_gar2" },
    "IGAR2_QAR3_GENERATE": { challenger: "qar3", recipient: "in_gar2" },
    "IGAR2_QAR3_APPROVE": { challenger: "qar3", recipient: "in_gar2" },
    "QAR1_XGAR1_RESPOND": { challenger: "ex_gar1", recipient: "qar1" },
    "QAR2_XGAR1_RESPOND": { challenger: "ex_gar1", recipient: "qar2" },
    "QAR3_XGAR1_RESPOND": { challenger: "ex_gar1", recipient: "qar3" },
    "QAR1_XGAR2_RESPOND": { challenger: "ex_gar2", recipient: "qar1" },
    "QAR2_XGAR2_RESPOND": { challenger: "ex_gar2", recipient: "qar2" },
    "QAR3_XGAR2_RESPOND": { challenger: "ex_gar2", recipient: "qar3" },
    "QAR1_IGAR1_RESPOND": { challenger: "in_gar1", recipient: "qar1" },
    "QAR2_IGAR1_RESPOND": { challenger: "in_gar1", recipient: "qar2" },
    "QAR3_IGAR1_RESPOND": { challenger: "in_gar1", recipient: "qar3" },
    "QAR1_IGAR2_RESPOND": { challenger: "in_gar2", recipient: "qar1" },
    "QAR2_IGAR2_RESPOND": { challenger: "in_gar2", recipient: "qar2" },
    "QAR3_IGAR2_RESPOND": { challenger: "in_gar2", recipient: "qar3" }
};
