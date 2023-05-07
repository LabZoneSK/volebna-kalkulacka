export interface Question {
  question_id: string;
  text: string;
}

export interface UserAnswersProps {
  questions: Question[];
  politicalParties: PoliticalParty[];
}

export interface PoliticalParty {
  party_id: string;
  party_name: string;
  answers: {
    question_id: string;
    answer_value: number;
  }[];
}
