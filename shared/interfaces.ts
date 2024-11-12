export interface InitializeGLEIF {
    isCompleted: boolean
    aidXGAR1: string
    aidXGAR2: string
    aidGEDA: string
    aidIGAR1: string
    aidIGAR2: string
}

export interface ResolveGLEIF {
    isCompleted: boolean
    oobiXGAR1: string
    oobiXGAR2: string
    oobiGEDA: string
    oobiIGAR1: string
    oobiIGAR2: string
    oobiGIDA: string
}

export interface InitializeQARs {
    isCompleted: boolean
    oobiQAR1: string
    oobiQAR2: string
    oobiQAR3: string
}

interface ChallengeResponse {
    isCompleted: boolean
    subsubsections: {
        challengeXGAR1toQAR1: boolean
        challengeXGAR1toQAR2: boolean
        challengeXGAR1toQAR3: boolean
        challengeXGAR2toQAR1: boolean
        challengeXGAR2toQAR2: boolean
        challengeXGAR2toQAR3: boolean
        challengeIGAR1toQAR1: boolean
        challengeIGAR1toQAR2: boolean
        challengeIGAR1toQAR3: boolean
        challengeIGAR2toQAR1: boolean
        challengeIGAR2toQAR2: boolean
        challengeIGAR2toQAR3: boolean
        challengeQAR1toXGAR1: boolean
        challengeQAR2toXGAR1: boolean
        challengeQAR3toXGAR1: boolean
        challengeQAR1toXGAR2: boolean
        challengeQAR2toXGAR2: boolean
        challengeQAR3toXGAR2: boolean
        challengeQAR1toIGAR1: boolean
        challengeQAR2toIGAR1: boolean
        challengeQAR3toIGAR1: boolean
        challengeQAR1toIGAR2: boolean
        challengeQAR2toIGAR2: boolean
        challengeQAR3toIGAR2: boolean
    }
}

export interface ApproveQVI { 
    isCompleted: boolean 
    aidQVI: string
}

export interface ResolveQVI { 
    isCompleted: boolean 
    oobiQVI: string
}

export interface IssueQVI { 
    isCompleted: boolean 
    credDigestQVI: string
}

export interface IssueLE { 
    isCompleted: boolean 
    grantMsgDigestLE: string
    credDigestLE: string
    oobiVLEIReporting: string
}

export interface IssueOOR { 
    isCompleted: boolean
    credDigestOORAUTH: string
    grantMsgDigestOOR: string
    credDigestOOR: string
}

export interface IssueECR { 
    isCompleted: boolean
    credDigestECRAUTH: string
    grantMsgDigestECR: string
    credDigestECR: string            
}

export interface RotateQVI { 
    isCompleted: boolean 
    rotationEventDigest: string
    rotationEventSequnceNumber: string
}

export interface RevokeECR { 
    isCompleted: boolean
    revocationDigestECR: string
}

export interface RevokeOOR { 
    isCompleted: boolean 
    revocationDigestOOR: string
}

export interface CurrentStateValue {
    "1_Establishment": {
        "1_1_InitializeGLEIF": InitializeGLEIF
        "1_2_InitializeQARs": { isCompleted: boolean }
        "1_3_ResolveGLEIF": ResolveGLEIF
        "1_4_ResolveQARs": InitializeQARs
        "1_5_ChallengeResponse": ChallengeResponse
        "1_6_CreateQVI": { isCompleted: boolean }
        "1_7_ApproveQVI": ApproveQVI
        "1_8_ResolveQVI": ResolveQVI
    }
    "2_Issuance": {
        "2_1_IssueQVI": IssueQVI
        "2_2_IssueLE": IssueLE
        "2_3_IssueOOR": IssueOOR
        "2_4_IssueECR": IssueECR
    }
    "3_Rotation": {
        "3_1_RotateQVI": RotateQVI

    }
    "4_Revocation": {
        "4_1_RevokeECR": RevokeECR
        "4_2_RevokeOOR": RevokeOOR
        "4_3_RevokeLE": { isCompleted: boolean }
    }
}