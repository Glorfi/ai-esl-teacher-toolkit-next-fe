export const getStudentLevelMapped = (
  studentLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | string
) => {
  const levelMapping: Record<string, string> = {
    A1: 'Beginner A1',
    A2: 'Elementary A2',
    B1: 'Intermediate B1',
    B2: 'Upper-Intermediate B2',
    C1: 'Advanced C1',
  };
  return levelMapping[studentLevel] || studentLevel;
};
