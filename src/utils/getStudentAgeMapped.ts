export const getStudentAgeMapped = (
  learnerAge: 'children' | 'teenagers' | 'adults' | string
) => {
  const ageMapping: Record<string, string> = {
    children: 'Children 7-12 y.o.',
    teenagers: 'Teenagers 13-20 y.o',
    adults: 'Adults 20+ y.o',
  };

  return ageMapping[learnerAge] || learnerAge;
};
