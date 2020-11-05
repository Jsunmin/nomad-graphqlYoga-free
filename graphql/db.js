export const people = [{
    id: '0',
    name: 'Sunmin',
    age: 28,
    gender: 'male',
}, {
    id: '1',
    name: 'Sunmin1',
    age: 8,
    gender: 'male',
}, {
    id: '2',
    name: 'Sunmin2',
    age: 12,
    gender: 'male',
}, {
    id: '3',
    name: 'Sunmin3',
    age: 18,
    gender: 'male',
}, {
    id: '4',
    name: 'Sunmin4',
    age: 23,
    gender: 'male',
}];
// 이제는 기본적으로 query { people { name } } 으로 들어감

export const getById = id => {
    const filteredPeople = people.filter(p => p.id === String(id));
    return filteredPeople[0];
}