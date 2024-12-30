export type Section = "1_Establishment" | "2_Issuance" | "3_Rotation" | "4_Revocation";
export type Subsection = 
    "1_1_InitializeGLEIF" | "1_2_InitializeQARs" | "1_3_ResolveGLEIF" | "1_4_ResolveQARs" | 
    "1_5_ChallengeResponse" | "1_6_CreateQVI" | "1_7_ApproveQVI" | "1_8_ResolveQVI" |
    "2_1_IssueQVI" | "2_2_IssueLE" | "2_3_IssueOOR" | "2_4_IssueECR" |
    "3_1_RotateQVI" |
    "4_1_RevokeECR" | "4_2_RevokeOOR" | "4_3_RevokeLE";
export type Subsubsection = 
    "START" | "ISSUE" | "SUBMIT" | "ADMIT" | "CONFIRM" | "APPROVE" | "REVOKE" |
    "XGAR1_QAR1_GENERATE" | "XGAR1_QAR1_APPROVE"  | "XGAR1_QAR2_GENERATE" | 
    "XGAR1_QAR2_APPROVE"  | "XGAR1_QAR3_GENERATE" | "XGAR1_QAR3_APPROVE"  | 
    "XGAR2_QAR1_GENERATE" | "XGAR2_QAR1_APPROVE"  | "XGAR2_QAR2_GENERATE" | 
    "XGAR2_QAR2_APPROVE"  | "XGAR2_QAR3_GENERATE" | "XGAR2_QAR3_APPROVE"  | 
    "IGAR1_QAR1_GENERATE" | "IGAR1_QAR1_APPROVE"  | "IGAR1_QAR2_GENERATE" | 
    "IGAR1_QAR2_APPROVE"  | "IGAR1_QAR3_GENERATE" | "IGAR1_QAR3_APPROVE"  | 
    "IGAR2_QAR1_GENERATE" | "IGAR2_QAR1_APPROVE"  | "IGAR2_QAR2_GENERATE" |
    "IGAR2_QAR2_APPROVE"  | "IGAR2_QAR3_GENERATE" | "IGAR2_QAR3_APPROVE"  | 
    "QAR1_XGAR1_RESPOND"  | "QAR2_XGAR1_RESPOND"  | "QAR3_XGAR1_RESPOND"  | 
    "QAR1_XGAR2_RESPOND"  | "QAR2_XGAR2_RESPOND"  | "QAR3_XGAR2_RESPOND"  | 
    "QAR1_IGAR1_RESPOND"  | "QAR2_IGAR1_RESPOND"  | "QAR3_IGAR1_RESPOND"  | 
    "QAR1_IGAR2_RESPOND"  | "QAR2_IGAR2_RESPOND"  | "QAR3_IGAR2_RESPOND";

const transitionMap : {
    section: Section;
    subsections: {
        subsection: Subsection;
        subsubsections: Subsubsection[];
    }[];
}[] = [
    {
        section: "1_Establishment",
        subsections: [
            {
                subsection: "1_1_InitializeGLEIF",
                subsubsections: ["START"]
            },
            {
                subsection: "1_2_InitializeQARs",
                subsubsections: ["START"]
            },
            {
                subsection: "1_3_ResolveGLEIF",
                subsubsections: ["START"]
            },
            {
                subsection: "1_4_ResolveQARs",
                subsubsections: ["START"]
            },
            {
                subsection: "1_5_ChallengeResponse",
                subsubsections: [
                    "START",
                    "XGAR1_QAR1_GENERATE",
                    "XGAR1_QAR1_APPROVE",
                    "XGAR1_QAR2_GENERATE",
                    "XGAR1_QAR2_APPROVE",
                    "XGAR1_QAR3_GENERATE",
                    "XGAR1_QAR3_APPROVE",
                    "XGAR2_QAR1_GENERATE",
                    "XGAR2_QAR1_APPROVE",
                    "XGAR2_QAR2_GENERATE",
                    "XGAR2_QAR2_APPROVE",
                    "XGAR2_QAR3_GENERATE",
                    "XGAR2_QAR3_APPROVE",
                    "IGAR1_QAR1_GENERATE",
                    "IGAR1_QAR1_APPROVE",
                    "IGAR1_QAR2_GENERATE",
                    "IGAR1_QAR2_APPROVE",
                    "IGAR1_QAR3_GENERATE",
                    "IGAR1_QAR3_APPROVE",
                    "IGAR2_QAR1_GENERATE",
                    "IGAR2_QAR1_APPROVE",
                    "IGAR2_QAR2_GENERATE",
                    "IGAR2_QAR2_APPROVE",
                    "IGAR2_QAR3_GENERATE",
                    "IGAR2_QAR3_APPROVE",
                    "QAR1_XGAR1_RESPOND",
                    "QAR2_XGAR1_RESPOND",
                    "QAR3_XGAR1_RESPOND",
                    "QAR1_XGAR2_RESPOND",
                    "QAR2_XGAR2_RESPOND",
                    "QAR3_XGAR2_RESPOND",
                    "QAR1_IGAR1_RESPOND",
                    "QAR2_IGAR1_RESPOND",
                    "QAR3_IGAR1_RESPOND",
                    "QAR1_IGAR2_RESPOND",
                    "QAR2_IGAR2_RESPOND",
                    "QAR3_IGAR2_RESPOND",
                ]
            },
            {
                subsection: "1_6_CreateQVI",
                subsubsections: ["START"]
            },
            {
                subsection: "1_7_ApproveQVI",
                subsubsections: ["START"]
            },
            {
                subsection: "1_8_ResolveQVI",
                subsubsections: ["START"]
            }
        ]
    },
    {
        section: "2_Issuance",
        subsections: [
            {
                subsection: "2_1_IssueQVI",
                subsubsections: ["START", "ISSUE"]
            },
            {
                subsection: "2_2_IssueLE",
                subsubsections: ["START", "SUBMIT", "ADMIT"]
            },
            {
                subsection: "2_3_IssueOOR",
                subsubsections: ["START", "ISSUE", "CONFIRM", "SUBMIT", "ADMIT"]
            },
            {
                subsection: "2_4_IssueECR",
                subsubsections: ["START", "ISSUE", "CONFIRM", "SUBMIT"]
            }
        ]
    },
    {
        section: "3_Rotation",
        subsections: [
            {
                subsection: "3_1_RotateQVI",
                subsubsections: ["START", "APPROVE"]
            }
        ]
    },
    {
        section: "4_Revocation",
        subsections: [
            {
                subsection: "4_1_RevokeECR",
                subsubsections: ["START", "REVOKE", "CONFIRM"]
            },
            {
                subsection: "4_2_RevokeOOR",
                subsubsections: ["START", "REVOKE", "CONFIRM"]
            },
            {
                subsection: "4_3_RevokeLE",
                subsubsections: ["START"]
            }
        ]
    }
];

export class StateMachine {
    private sectionIndex: number = 0;
    private subsectionIndex: number = 0;
    private subsubsectionIndex: number = 0;
    private section: Section;
    private subsection: Subsection;
    private subsubsection: Subsubsection;

    constructor() {
        this.section = transitionMap[this.sectionIndex].section;
        this.subsection = transitionMap[this.sectionIndex].subsections[this.subsectionIndex].subsection;
        this.subsubsection = transitionMap[this.sectionIndex].subsections[this.subsectionIndex].subsubsections[this.subsubsectionIndex];
    }

    transition() {
        // Get the current section and subsection
        const currentSection = transitionMap[this.sectionIndex];
        const currentSubsection = currentSection.subsections[this.subsectionIndex];

        // Check if there is a next subsubsection in the current subsection
        if (this.subsubsectionIndex + 1 < currentSubsection.subsubsections.length) {
            this.subsubsection = currentSubsection.subsubsections[++this.subsubsectionIndex];
        } else if (this.subsectionIndex + 1 < currentSection.subsections.length) {
            // Move to the next subsection if no more subsubsections in the current one
            this.subsection = currentSection.subsections[++this.subsectionIndex].subsection;
            this.subsubsectionIndex = 0;
            this.subsubsection = currentSection.subsections[this.subsectionIndex].subsubsections[this.subsubsectionIndex];
        } else if (this.sectionIndex + 1 < transitionMap.length) {
            // Move to the next section if no more subsections in the current one
            this.section = transitionMap[++this.sectionIndex].section;
            this.subsectionIndex = 0;
            this.subsubsectionIndex = 0;
            this.subsection = transitionMap[this.sectionIndex].subsections[this.subsectionIndex].subsection;
            this.subsubsection = transitionMap[this.sectionIndex].subsections[this.subsectionIndex].subsubsections[this.subsubsectionIndex];
        } else {
            throw new Error("No more transitions available.");
        }
    }

    // Get the current state as a string
    getCurrentState() {
        return {
            section: this.section,
            sectionNumber: this.sectionIndex + 1,
            subsection: this.subsection,
            subsectionNumber: this.subsectionIndex + 1,
            subsubsection: this.subsubsection,
            subsubsectionNumber: this.subsubsectionIndex + 1 
        }
    }

    isCompleted(): boolean {
        const sectionLength = transitionMap.length;
        const lastSubsectionLength = transitionMap[sectionLength-1].subsections.length;
        const lastSubsubsectionLength = transitionMap[sectionLength-1].subsections[lastSubsectionLength-1].subsubsections.length;

        return (this.sectionIndex + 1 === sectionLength)
            && (this.subsectionIndex + 1 === lastSubsectionLength)
            && (this.subsectionIndex + 1 === lastSubsubsectionLength);
    }
}