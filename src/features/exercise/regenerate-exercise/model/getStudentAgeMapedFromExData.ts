export const getStudentAgeMappedForPrompt = (
  learnerAge: 'Children 7-12 y.o.' | 'Teenagers 13-20 y.o' | 'Adults 20+ y.o' | string
) => {
  const ageMapping: Record<string, string> = {
    'Children 7-12 y.o.': 'children',
    'Teenagers 13-20 y.o': 'teenagers',
    'Adults 20+ y.o': 'adults',
  };

  return ageMapping[learnerAge] || learnerAge;
};
