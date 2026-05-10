export type ConsensusVote = 'resonant' | 'dissonant' | 'observing';
export type ConsensusAvatarStyle = 'cosmic-explorer' | 'cyberpunk-chrome' | 'minimalist-ai';
export type ConsensusVoteIcon = 'check' | 'x' | 'activity';

export interface ConsensusCopy {
  key: string;
  fallback: string;
}

export interface ConsensusDialogueItem {
  id: string;
  name: ConsensusCopy;
  status: ConsensusCopy;
  dialogue: ConsensusCopy;
  avatarStyle: ConsensusAvatarStyle;
  statusColorClass: string;
  statusClass: string;
  borderColorClass: string;
  shadowColorClass: string;
  railColorClass: string;
}

export interface ConsensusVoteItem {
  id: string;
  name: ConsensusCopy;
  vote: ConsensusCopy;
  icon: ConsensusVoteIcon;
  colorClass: string;
}

export interface ConsensusGraphNode {
  id: string;
  x: string;
  y: string;
  initialX: string;
  initialY: string;
  initial: string;
  label: ConsensusCopy;
}

export interface ConsensusViewModel {
  header: {
    subtitle: ConsensusCopy;
    synthesisStatus: ConsensusCopy;
  };
  dialogues: ConsensusDialogueItem[];
  consensus: {
    status: ConsensusCopy;
    message: ConsensusCopy;
    action: ConsensusCopy;
  };
  voteMatrix: {
    title: ConsensusCopy;
    votes: ConsensusVoteItem[];
  };
  graph: {
    title: ConsensusCopy;
    status: ConsensusCopy;
    nodes: ConsensusGraphNode[];
  };
}
